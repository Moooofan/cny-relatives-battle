/**
 * Pure balance simulator. No React, no I/O — given a ContentBundle it plays
 * whole games against the real reducer using a scripted "policy" instead of
 * a human, so `docs/BALANCE.md` and `__tests__/balance.test.ts` can reason
 * about score distributions and rank reachability without a browser.
 *
 * Determinism: the game's own RNG (shuffling, boss/life pick, summons) is
 * untouched — only driven via the public reducer API. Policy *decisions*
 * (which archetype to pick each turn) use a second, independently seeded
 * mulberry32 stream so a policy never perturbs the game's own randomness.
 */
import { applyOption, applySpecial, advance, createGame } from "@/engine/reducer";
import { hashSeed, pick } from "@/engine/rng";
import type { Archetype, BossId, ContentBundle, GameState, Mode, StoryEndingId, Tier } from "@/engine/types";

// ---------------------------------------------------------------------------
// Policies (docs/CONTENT.md §5 tuning spec)
// ---------------------------------------------------------------------------

export type PolicyName = "random" | "casual" | "good" | "expert";

/** Percentage weights per archetype, must sum to 100. `random` is handled
 * separately (uniform over the 8 raw options, not over archetypes). */
const POLICY_WEIGHTS: Record<Exclude<PolicyName, "random">, Partial<Record<Archetype, number>>> = {
  casual: { perfect: 25, deflect: 35, meek: 20, backfire: 12, landmine: 8 },
  good: { perfect: 55, deflect: 30, meek: 10, backfire: 5 },
  expert: { perfect: 85, deflect: 15 },
};

/** hp threshold below which a policy reaches for 紅包 (heal special) when available. */
const POLICY_HEAL_HP_THRESHOLD = 40;

interface RngBox {
  value: number;
}

function weightedArchetypeTable(policy: Exclude<PolicyName, "random">): Archetype[] {
  const weights = POLICY_WEIGHTS[policy];
  const table: Archetype[] = [];
  for (const [archetype, weight] of Object.entries(weights) as [Archetype, number][]) {
    for (let i = 0; i < weight; i++) table.push(archetype);
  }
  return table;
}

// Built once per module load; weight tables never change at runtime.
const ARCHETYPE_TABLES: Record<Exclude<PolicyName, "random">, Archetype[]> = {
  casual: weightedArchetypeTable("casual"),
  good: weightedArchetypeTable("good"),
  expert: weightedArchetypeTable("expert"),
};

function chooseOptionId(
  content: ContentBundle,
  state: GameState,
  policy: PolicyName,
  rngBox: RngBox
): string {
  const question = content.questions.find((q) => q.id === state.currentQuestionId);
  if (!question) throw new Error(`sim: no question for id ${state.currentQuestionId}`);

  if (policy === "random") {
    const [option, next] = pick(question.options, rngBox.value);
    rngBox.value = next;
    return option.id;
  }

  const [archetype, next1] = pick(ARCHETYPE_TABLES[policy], rngBox.value);
  rngBox.value = next1;
  const matches = question.options.filter((o) => o.archetype === archetype);
  const [option, next2] = pick(matches, rngBox.value);
  rngBox.value = next2;
  return option.id;
}

// ---------------------------------------------------------------------------
// Single run
// ---------------------------------------------------------------------------

export interface BossFightResult {
  bossId: BossId;
  tier: Tier;
  turns: number;
  won: boolean;
}

export interface RunResult {
  seed: string;
  mode: Mode;
  policy: PolicyName;
  score: number;
  rank: number;
  won: boolean;
  turns: number;
  bossesDefeated: number;
  storyEndingId?: StoryEndingId;
  fights: BossFightResult[];
}

/** Group a finished run's log into per-boss-fight segments (consecutive log
 * entries sharing the "current fight" bossId — note: this is the fight's
 * boss, not `summonedBossId`, which only tags where a summoned question came
 * from). Only the last segment can end in a loss, since a player death ends
 * the run immediately in every mode (see reducer.ts `advance`'s
 * `playerDefeated` case). */
function segmentFights(state: GameState, lost: boolean): BossFightResult[] {
  const segments: BossFightResult[] = [];
  for (const entry of state.log) {
    const last = segments[segments.length - 1];
    if (last && last.bossId === entry.bossId) {
      last.turns += 1;
    } else {
      segments.push({ bossId: entry.bossId, tier: "easy", turns: 1, won: true });
    }
  }
  if (lost && segments.length > 0) segments[segments.length - 1].won = false;
  return segments;
}

function tierOf(content: ContentBundle, bossId: BossId): Tier {
  return content.bosses.find((b) => b.id === bossId)?.tier ?? "easy";
}

export function simulateRun(
  content: ContentBundle,
  mode: Mode,
  seed: string,
  policy: PolicyName
): RunResult {
  let state = createGame(content, mode, seed);
  const rngBox: RngBox = { value: hashSeed(`${seed}|policy|${mode}|${policy}`) };
  let lost = false;
  let guard = 0;
  const GUARD_MAX = 5000;

  while (state.phase !== "result" && guard++ < GUARD_MAX) {
    if (state.phase === "turn") {
      if (state.playerHp < POLICY_HEAL_HP_THRESHOLD && state.specials.heal > 0) {
        state = applySpecial(content, state, "heal");
      }
      const optionId = chooseOptionId(content, state, policy, rngBox);
      state = applyOption(content, state, optionId);
    } else if (state.phase === "playerDefeated") {
      lost = true;
      state = advance(content, state);
    } else {
      state = advance(content, state);
    }
  }
  if (guard >= GUARD_MAX) {
    throw new Error(`sim: run did not terminate (mode=${mode} seed=${seed} policy=${policy})`);
  }

  const fights = segmentFights(state, lost).map((f) => ({ ...f, tier: tierOf(content, f.bossId) }));
  const result = state.result;
  if (!result) throw new Error("sim: run ended without a result");

  return {
    seed,
    mode,
    policy,
    score: result.score,
    rank: result.rank.rank,
    won: !lost,
    turns: state.turns,
    bossesDefeated: state.bossesDefeated,
    storyEndingId: result.storyEndingId,
    fights,
  };
}

// ---------------------------------------------------------------------------
// Batch runs + aggregate stats
// ---------------------------------------------------------------------------

export function simulateMany(
  content: ContentBundle,
  mode: Mode,
  policy: PolicyName,
  seeds: string[]
): RunResult[] {
  return seeds.map((seed) => simulateRun(content, mode, seed, policy));
}

/** `seedCount` seeds named `${seedPrefix}-${i}`. */
export function makeSeeds(seedPrefix: string, seedCount: number): string[] {
  return Array.from({ length: seedCount }, (_, i) => `${seedPrefix}-${i}`);
}

export interface BossAggregate {
  n: number;
  winRate: number;
  meanTurns: number;
}

export interface AggregateStats {
  count: number;
  winRate: number;
  meanScore: number;
  medianScore: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  meanTurns: number;
  /** rank (1-7) -> fraction of runs landing on that rank under the content's current thresholds */
  rankDistributionPct: Record<number, number>;
  storyEndingDistributionPct?: Record<string, number>;
  bossStats: Record<BossId, BossAggregate>;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = clampIndex((p / 100) * (sorted.length - 1), sorted.length);
  return sorted[idx];
}

function clampIndex(i: number, len: number): number {
  return Math.min(len - 1, Math.max(0, Math.round(i)));
}

export function aggregate(runs: RunResult[]): AggregateStats {
  const scores = runs.map((r) => r.score).sort((a, b) => a - b);
  const count = runs.length;
  const winRate = count === 0 ? 0 : runs.filter((r) => r.won).length / count;
  const meanScore = count === 0 ? 0 : scores.reduce((a, b) => a + b, 0) / count;
  const meanTurns = count === 0 ? 0 : runs.reduce((a, r) => a + r.turns, 0) / count;

  const rankCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  for (const r of runs) rankCounts[r.rank] = (rankCounts[r.rank] ?? 0) + 1;
  const rankDistributionPct: Record<number, number> = {};
  for (const rank of Object.keys(rankCounts).map(Number)) {
    rankDistributionPct[rank] = count === 0 ? 0 : rankCounts[rank] / count;
  }

  const storyRuns = runs.filter((r) => r.storyEndingId);
  let storyEndingDistributionPct: Record<string, number> | undefined;
  if (storyRuns.length > 0) {
    const endingCounts: Record<string, number> = {};
    for (const r of storyRuns) {
      const id = r.storyEndingId!;
      endingCounts[id] = (endingCounts[id] ?? 0) + 1;
    }
    storyEndingDistributionPct = {};
    for (const [id, n] of Object.entries(endingCounts)) {
      storyEndingDistributionPct[id] = n / storyRuns.length;
    }
  }

  const bossBuckets: Record<BossId, { wins: number; n: number; turns: number }> = {};
  for (const run of runs) {
    for (const fight of run.fights) {
      const bucket = (bossBuckets[fight.bossId] ??= { wins: 0, n: 0, turns: 0 });
      bucket.n += 1;
      bucket.turns += fight.turns;
      if (fight.won) bucket.wins += 1;
    }
  }
  const bossStats: Record<BossId, BossAggregate> = {};
  for (const [bossId, b] of Object.entries(bossBuckets)) {
    bossStats[bossId] = { n: b.n, winRate: b.wins / b.n, meanTurns: b.turns / b.n };
  }

  return {
    count,
    winRate,
    meanScore,
    medianScore: percentile(scores, 50),
    p10: percentile(scores, 10),
    p25: percentile(scores, 25),
    p50: percentile(scores, 50),
    p75: percentile(scores, 75),
    p90: percentile(scores, 90),
    meanTurns,
    rankDistributionPct,
    storyEndingDistributionPct,
    bossStats,
  };
}
