import {
  ARCHETYPE_TABLE,
  CRIT_COMBO,
  CRIT_MULTIPLIER,
  DEFAULT_LANDMINE_HEAL,
  GAUNTLET,
  PLAYER_MAX_HP,
  SCORE_WEIGHTS,
  SPECIALS,
  TIER_HP,
  TIER_POWER,
} from "@/engine/archetypes";
import { hashSeed, pick, shuffle } from "@/engine/rng";
import type {
  Archetype,
  Boss,
  BossId,
  BossModifiers,
  ContentBundle,
  GameResult,
  GameState,
  Life,
  Mode,
  Option,
  Question,
  RankTier,
  StoryEndingId,
  StoryScene,
  Topic,
  TurnLog,
} from "@/engine/types";

/** Content-specific: CONTENT.md §4 ties two story endings to this exact boss. */
const AMA_BOSS_ID = "ama";

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

// ---------------------------------------------------------------------------
// Modifier merging: boss.modifiers ⊗ scene.extraModifiers
// ---------------------------------------------------------------------------

function mergeMultiplierMaps(
  a: Partial<Record<Archetype, number>> | undefined,
  b: Partial<Record<Archetype, number>> | undefined
): Partial<Record<Archetype, number>> | undefined {
  if (!a && !b) return undefined;
  const keys = new Set<Archetype>([
    ...(Object.keys(a ?? {}) as Archetype[]),
    ...(Object.keys(b ?? {}) as Archetype[]),
  ]);
  const result: Partial<Record<Archetype, number>> = {};
  for (const key of keys) {
    result[key] = (a?.[key] ?? 1) * (b?.[key] ?? 1);
  }
  return result;
}

function mergeModifiers(boss?: BossModifiers, scene?: BossModifiers): BossModifiers {
  return {
    dealtMultiplier: mergeMultiplierMaps(boss?.dealtMultiplier, scene?.dealtMultiplier),
    takenMultiplier: mergeMultiplierMaps(boss?.takenMultiplier, scene?.takenMultiplier),
    healOnLandmine: scene?.healOnLandmine ?? boss?.healOnLandmine,
    followUpOnMeek: !!(boss?.followUpOnMeek || scene?.followUpOnMeek),
    summonAtHalf: !!(boss?.summonAtHalf || scene?.summonAtHalf),
    reuseMeekQuestions: !!(boss?.reuseMeekQuestions || scene?.reuseMeekQuestions),
  };
}

// ---------------------------------------------------------------------------
// 人生 (Life) helpers — everything is a no-op when content.lives is empty.
// ---------------------------------------------------------------------------

function resolveLife(content: ContentBundle, lifeId: string | null): Life | undefined {
  if (!lifeId) return undefined;
  return (content.lives ?? []).find((l) => l.id === lifeId);
}

function fullSpecialsAllotment(life: Life | undefined): { skip: number; heal: number } {
  return {
    skip: SPECIALS.skip.perRun + (life?.modifiers.extraSpecials?.skip ?? 0),
    heal: SPECIALS.heal.perRun + (life?.modifiers.extraSpecials?.heal ?? 0),
  };
}

/** Combined life.modifiers.topic × life.modifiers.boss multiplier for one
 * turn's archetype. 1/1 when there is no active life or no matching scale. */
function lifeScale(
  life: Life | undefined,
  topic: Topic,
  bossId: BossId,
  archetype: Archetype
): { dealtMult: number; takenMult: number } {
  const topicScale = life?.modifiers.topic?.[topic]?.[archetype];
  const bossScale = life?.modifiers.boss?.[bossId]?.[archetype];
  return {
    dealtMult: (topicScale?.dealt ?? 1) * (bossScale?.dealt ?? 1),
    takenMult: (topicScale?.taken ?? 1) * (bossScale?.taken ?? 1),
  };
}

// ---------------------------------------------------------------------------
// Small content lookups
// ---------------------------------------------------------------------------

function findBoss(content: ContentBundle, bossId: BossId): Boss {
  const boss = content.bosses.find((b) => b.id === bossId);
  if (!boss) throw new Error(`Unknown boss id: ${bossId}`);
  return boss;
}

function buildQuestionPool(content: ContentBundle, boss: Boss): Question[] {
  return content.questions.filter(
    (q) => q.bossId === boss.id || (q.bossId === undefined && boss.topics.includes(q.topic))
  );
}

function storyFightScenes(content: ContentBundle): Extract<StoryScene, { kind: "fight" }>[] {
  return content.scenes.filter(
    (s): s is Extract<StoryScene, { kind: "fight" }> => s.kind === "fight"
  );
}

function countFightsUpTo(scenes: StoryScene[], sceneIndex: number): number {
  return scenes.slice(0, sceneIndex + 1).filter((s) => s.kind === "fight").length;
}

/**
 * 三姑's 翻舊帳 gimmick (docs/CONTENT.md §4): when `modifiers.reuseMeekQuestions`
 * is set, pull up to 3 questions the player answered meekly earlier in the run
 * — most recent first, deduped, skipping ids this boss already asked or that
 * don't exist in content — and place them at the front of the (already
 * shuffled) deck. Those ids may belong to ANY boss's exclusive pool, not just
 * this one, which is the whole point: the boss "remembers" what you said to
 * someone else.
 */
function buildDeckWithReuseInjection(
  content: ContentBundle,
  modifiers: BossModifiers,
  shuffledPoolIds: string[],
  meekQuestionIds: string[],
  askedByThisBoss: Set<string>
): { deck: string[]; reusedQuestionIds: string[] } {
  if (!modifiers.reuseMeekQuestions) return { deck: shuffledPoolIds, reusedQuestionIds: [] };

  const seen = new Set<string>();
  const reusedQuestionIds: string[] = [];
  for (let i = meekQuestionIds.length - 1; i >= 0 && reusedQuestionIds.length < 3; i--) {
    const id = meekQuestionIds[i];
    if (seen.has(id) || askedByThisBoss.has(id)) continue;
    seen.add(id);
    if (!content.questions.some((q) => q.id === id)) continue;
    reusedQuestionIds.push(id);
  }

  const reusedSet = new Set(reusedQuestionIds);
  const rest = shuffledPoolIds.filter((id) => !reusedSet.has(id));
  return { deck: [...reusedQuestionIds, ...rest], reusedQuestionIds };
}

// ---------------------------------------------------------------------------
// createGame
// ---------------------------------------------------------------------------

interface CreateGameOpts {
  bossId?: BossId;
  lifeId?: string;
}

function buildBossQueue(
  content: ContentBundle,
  mode: Mode,
  rng0: number,
  opts?: CreateGameOpts
): { bossQueue: BossId[]; rng: number } {
  if (mode === "gauntlet") {
    const bossQueue = [...content.bosses].sort((a, b) => a.order - b.order).map((b) => b.id);
    return { bossQueue, rng: rng0 };
  }
  if (mode === "story") {
    const bossQueue = storyFightScenes(content).map((s) => s.bossId);
    return { bossQueue, rng: rng0 };
  }
  if (opts?.bossId && content.bosses.some((b) => b.id === opts.bossId)) {
    return { bossQueue: [opts.bossId], rng: rng0 };
  }
  const [boss, rng] = pick(content.bosses, rng0);
  return { bossQueue: [boss.id], rng };
}

/** `lifeId` = opts.lifeId if it names a real life, else an rng pick from
 * content.lives, else null when there are no lives at all. Because this
 * always derives from the same seeded rng thread, daily mode naturally picks
 * the same life for everyone on a given day unless opts.lifeId overrides it. */
function pickLife(
  content: ContentBundle,
  rng0: number,
  opts?: CreateGameOpts
): { lifeId: string | null; rng: number } {
  const lives = content.lives ?? [];
  if (lives.length === 0) return { lifeId: null, rng: rng0 };
  if (opts?.lifeId && lives.some((l) => l.id === opts.lifeId)) {
    return { lifeId: opts.lifeId, rng: rng0 };
  }
  const [life, rng] = pick(lives, rng0);
  return { lifeId: life.id, rng };
}

export function createGame(
  content: ContentBundle,
  mode: Mode,
  seed: string,
  opts?: CreateGameOpts
): GameState {
  const rng0 = hashSeed(seed);
  const { bossQueue, rng: rngAfterQueue } = buildBossQueue(content, mode, rng0, opts);
  const { lifeId, rng } = pickLife(content, rngAfterQueue, opts);
  const life = resolveLife(content, lifeId);
  const playerMaxHp = life?.modifiers.startHp ?? PLAYER_MAX_HP;

  const base: GameState = {
    mode,
    seed,
    rng,
    phase: "intro",
    bossQueue,
    bossIndex: 0,
    bossHp: 0,
    bossMaxHp: 0,
    playerHp: playerMaxHp,
    playerMaxHp,
    lifeId,
    combo: 0,
    maxCombo: 0,
    deck: [],
    optionOrder: [],
    specials: fullSpecialsAllotment(life),
    log: [],
    bossesDefeated: 0,
    damageDealt: 0,
    turns: 0,
    landmineCount: 0,
    meekQuestionIds: [],
    summonUsed: false,
    followUp: false,
    activeModifiers: {},
    reusedQuestionIds: [],
  };

  if (mode === "story") {
    return enterScene(content, { ...base, sceneIndex: 0 }, 0);
  }
  return base;
}

/** Move to `sceneIndex` of `content.scenes` for story mode: narrative/rest
 * become an 'interlude' screen, fight becomes 'intro' for the next boss,
 * running past the end of the scene list ends the run. */
function enterScene(content: ContentBundle, state: GameState, sceneIndex: number): GameState {
  const scene = content.scenes[sceneIndex];
  if (!scene) return enterResult(content, { ...state, sceneIndex }, false);

  if (scene.kind === "narrative") {
    return { ...state, sceneIndex, act: scene.act, phase: "interlude", interludeText: scene.lines };
  }
  if (scene.kind === "rest") {
    return {
      ...state,
      sceneIndex,
      act: scene.act,
      phase: "interlude",
      interludeText: scene.lines,
      playerHp: state.playerMaxHp,
      specials: fullSpecialsAllotment(resolveLife(content, state.lifeId)),
      storyCheckpoint: sceneIndex + 1,
    };
  }
  const bossIndex = countFightsUpTo(content.scenes, sceneIndex) - 1;
  return { ...state, sceneIndex, act: scene.act, bossIndex, phase: "intro" };
}

// ---------------------------------------------------------------------------
// startBoss / drawQuestion
// ---------------------------------------------------------------------------

export function startBoss(content: ContentBundle, state: GameState): GameState {
  const bossId = state.bossQueue[state.bossIndex];
  const boss = findBoss(content, bossId);
  const fightScene = state.mode === "story" ? storyFightScenes(content)[state.bossIndex] : undefined;

  const bossMaxHp = fightScene?.hpOverride ?? TIER_HP[boss.tier];
  const activeModifiers = mergeModifiers(boss.modifiers, fightScene?.extraModifiers);

  const pool = buildQuestionPool(content, boss);
  const [shuffled, rng1] = shuffle(pool.map((q) => q.id), state.rng);
  const askedByThisBoss = new Set(
    state.log.filter((entry) => entry.bossId === boss.id).map((entry) => entry.questionId)
  );
  const { deck, reusedQuestionIds } = buildDeckWithReuseInjection(
    content,
    activeModifiers,
    shuffled,
    state.meekQuestionIds,
    askedByThisBoss
  );

  const started: GameState = {
    ...state,
    bossHp: bossMaxHp,
    bossMaxHp,
    activeModifiers,
    deck,
    reusedQuestionIds,
    grudge: undefined,
    rng: rng1,
    summonUsed: false,
    // A fresh fight starts a fresh combo — `maxCombo` still tracks the best
    // combo across the whole run and is deliberately left untouched.
    combo: 0,
  };
  return drawQuestion(content, started);
}

function trySummon(content: ContentBundle, state: GameState): GameState | undefined {
  if (!state.activeModifiers.summonAtHalf || state.summonUsed) return undefined;
  if (state.bossHp > state.bossMaxHp / 2) return undefined;
  const defeatedIds = state.bossQueue.slice(0, state.bossIndex);
  if (defeatedIds.length === 0) return undefined;

  const [summonedBossId, rng1] = pick(defeatedIds, state.rng);
  const pool = buildQuestionPool(content, findBoss(content, summonedBossId));
  if (pool.length === 0) return undefined;

  const [question, rng2] = pick(pool, rng1);
  const [optionOrder, rng3] = shuffle(question.options.map((o) => o.id), rng2);
  return {
    ...state,
    currentQuestionId: question.id,
    optionOrder,
    rng: rng3,
    summonUsed: true,
    pendingSummonBossId: summonedBossId,
    phase: "turn",
  };
}

export function drawQuestion(content: ContentBundle, state: GameState): GameState {
  const summoned = trySummon(content, state);
  // A summon draw never carries the 翻舊帳 badge — leave `reuseMeekQuestions`
  // injection out of the summon pool entirely, but still resolve any stale
  // grudge from the previous turn.
  if (summoned) return { ...summoned, grudge: undefined };

  const boss = findBoss(content, state.bossQueue[state.bossIndex]);
  let deck = state.deck;
  let rng = state.rng;
  if (deck.length === 0) {
    // The reuse injection only ever happens once, in `startBoss`; once the
    // initial deck (injected front + shuffled pool) runs dry mid-fight, a
    // reshuffle of the plain pool is enough.
    const pool = buildQuestionPool(content, boss);
    const [shuffled, nextRng] = shuffle(pool.map((q) => q.id), rng);
    deck = shuffled;
    rng = nextRng;
  }

  const [questionId, ...rest] = deck;
  const question = content.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`Unknown question id in deck: ${questionId}`);
  const [optionOrder, rng2] = shuffle(question.options.map((o) => o.id), rng);

  const grudge = (state.reusedQuestionIds ?? []).includes(questionId)
    ? { questionId, originalBossId: question.bossId ?? null }
    : undefined;

  return { ...state, deck: rest, currentQuestionId: questionId, optionOrder, rng: rng2, phase: "turn", grudge };
}

// ---------------------------------------------------------------------------
// applyOption / applyTimeout
// ---------------------------------------------------------------------------

function computeDealtAndCombo(
  archetype: Archetype,
  baseDealt: number,
  bossDealtMult: number,
  lifeDealtMult: number,
  combo: number,
  maxCombo: number
): { dealt: number; crit: boolean; combo: number; maxCombo: number } {
  // Boss/scene and life multipliers compound before a single final rounding.
  const scaled = baseDealt * bossDealtMult * lifeDealtMult;
  const comboRule = ARCHETYPE_TABLE[archetype].combo;

  if (comboRule !== "inc") {
    const nextCombo = comboRule === "reset" ? 0 : combo;
    return { dealt: Math.round(scaled), crit: false, combo: nextCombo, maxCombo: Math.max(maxCombo, nextCombo) };
  }

  const wouldBe = combo + 1;
  const peak = Math.max(maxCombo, wouldBe);
  if (wouldBe === CRIT_COMBO) {
    return { dealt: Math.round(scaled * CRIT_MULTIPLIER), crit: true, combo: 0, maxCombo: peak };
  }
  return { dealt: Math.round(scaled), crit: false, combo: wouldBe, maxCombo: peak };
}

function resolveTurn(
  content: ContentBundle,
  state: GameState,
  question: Question,
  option: Option,
  timeout: boolean
): GameState {
  const boss = findBoss(content, state.bossQueue[state.bossIndex]);
  const base = ARCHETYPE_TABLE[option.archetype];
  const mods = state.activeModifiers;
  const life = resolveLife(content, state.lifeId);
  const { dealtMult: lifeDealtMult, takenMult: lifeTakenMult } = lifeScale(
    life, question.topic, boss.id, option.archetype
  );

  const { dealt, crit, combo, maxCombo } = computeDealtAndCombo(
    option.archetype,
    base.dealt,
    mods.dealtMultiplier?.[option.archetype] ?? 1,
    lifeDealtMult,
    state.combo,
    state.maxCombo
  );
  const taken = Math.round(
    base.taken * TIER_POWER[boss.tier] * (mods.takenMultiplier?.[option.archetype] ?? 1) * lifeTakenMult
  );
  const healed = base.healsBoss ? mods.healOnLandmine ?? DEFAULT_LANDMINE_HEAL : 0;

  const bossHp = clamp(state.bossHp - dealt + healed, 0, state.bossMaxHp);
  const playerHp = clamp(state.playerHp - taken, 0, state.playerMaxHp);
  const meekQuestionIds =
    option.archetype === "meek" && !state.meekQuestionIds.includes(question.id)
      ? [...state.meekQuestionIds, question.id]
      : state.meekQuestionIds;

  const logEntry: TurnLog = {
    questionId: question.id,
    optionId: timeout ? "timeout" : option.id,
    archetype: option.archetype,
    dealt,
    taken,
    crit,
    combo,
    topic: question.topic,
    bossId: boss.id,
    summonedBossId: state.pendingSummonBossId,
    lifeDealtMult,
    lifeTakenMult,
    grudge: state.grudge ? true : undefined,
  };

  return {
    ...state,
    bossHp,
    playerHp,
    combo,
    maxCombo,
    damageDealt: state.damageDealt + dealt,
    turns: state.turns + 1,
    landmineCount: state.landmineCount + (option.archetype === "landmine" ? 1 : 0),
    meekQuestionIds,
    followUp: option.archetype === "meek" && !!mods.followUpOnMeek,
    log: [...state.log, logEntry],
    lastResolve: {
      optionId: option.id, archetype: option.archetype, dealt, taken, healed, crit, timeout,
      lifeDealtMult, lifeTakenMult,
    },
    phase: "retort",
    pendingSummonBossId: undefined,
  };
}

export function applyOption(content: ContentBundle, state: GameState, optionId: string): GameState {
  const question = content.questions.find((q) => q.id === state.currentQuestionId);
  if (!question) throw new Error("applyOption: no current question");
  const option = question.options.find((o) => o.id === optionId);
  if (!option) throw new Error(`applyOption: unknown option id ${optionId}`);
  return resolveTurn(content, state, question, option, false);
}

export function applyTimeout(content: ContentBundle, state: GameState): GameState {
  const question = content.questions.find((q) => q.id === state.currentQuestionId);
  if (!question) throw new Error("applyTimeout: no current question");
  const synthetic: Option = { id: "timeout", text: "", archetype: "meek", retort: "" };
  return resolveTurn(content, state, question, synthetic, true);
}

// ---------------------------------------------------------------------------
// applySpecial
// ---------------------------------------------------------------------------

function applySkip(content: ContentBundle, state: GameState): GameState {
  if (state.phase !== "turn" || state.specials.skip <= 0) return state;
  const question = content.questions.find((q) => q.id === state.currentQuestionId);
  const boss = content.bosses.find((b) => b.id === state.bossQueue[state.bossIndex]);
  if (!question || !boss) return state;

  const logEntry: TurnLog = {
    questionId: question.id,
    optionId: "skip",
    archetype: "deflect",
    dealt: 0,
    taken: 0,
    crit: false,
    combo: state.combo,
    topic: question.topic,
    bossId: boss.id,
    summonedBossId: state.pendingSummonBossId,
    lifeDealtMult: 1,
    lifeTakenMult: 1,
  };

  const next: GameState = {
    ...state,
    specials: { ...state.specials, skip: state.specials.skip - 1 },
    log: [...state.log, logEntry],
    pendingSummonBossId: undefined,
    followUp: false,
  };
  return drawQuestion(content, next);
}

function applyHeal(state: GameState): GameState {
  if (state.phase !== "turn" || state.specials.heal <= 0) return state;
  if (state.playerHp >= SPECIALS.heal.threshold) return state;
  return {
    ...state,
    playerHp: clamp(state.playerHp + SPECIALS.heal.amount, 0, state.playerMaxHp),
    specials: { ...state.specials, heal: state.specials.heal - 1 },
  };
}

export function applySpecial(content: ContentBundle, state: GameState, kind: "skip" | "heal"): GameState {
  return kind === "skip" ? applySkip(content, state) : applyHeal(state);
}

// ---------------------------------------------------------------------------
// advance
// ---------------------------------------------------------------------------

function advanceFromRetort(content: ContentBundle, state: GameState): GameState {
  if (state.playerHp <= 0) return { ...state, phase: "playerDefeated" };
  if (state.bossHp <= 0) {
    return { ...state, phase: "bossDefeated", bossesDefeated: state.bossesDefeated + 1 };
  }
  return drawQuestion(content, state);
}

function advanceGauntlet(content: ContentBundle, state: GameState): GameState {
  const healed = clamp(state.playerHp + GAUNTLET.healPerWin, 0, state.playerMaxHp);
  const hasMoreBosses = state.bossIndex + 1 < state.bossQueue.length;
  const isRestStop = state.bossesDefeated % GAUNTLET.restEvery === 0;

  if (isRestStop && hasMoreBosses) {
    return {
      ...state,
      playerHp: clamp(healed + GAUNTLET.restHeal, 0, state.playerMaxHp),
      specials: fullSpecialsAllotment(resolveLife(content, state.lifeId)),
      phase: "interlude",
      interludeText: ["休息站：偷溜去便利商店"],
    };
  }
  if (!hasMoreBosses) return enterResult(content, { ...state, playerHp: healed }, false);
  return { ...state, playerHp: healed, bossIndex: state.bossIndex + 1, phase: "intro" };
}

function advanceStory(content: ContentBundle, state: GameState): GameState {
  return enterScene(content, state, (state.sceneIndex ?? 0) + 1);
}

function advanceFromBossDefeated(content: ContentBundle, state: GameState): GameState {
  if (state.mode === "gauntlet") return advanceGauntlet(content, state);
  if (state.mode === "story") return advanceStory(content, state);
  return enterResult(content, state, false);
}

function advanceFromInterlude(content: ContentBundle, state: GameState): GameState {
  if (state.mode === "story") return advanceStory(content, state);
  const hasMoreBosses = state.bossIndex + 1 < state.bossQueue.length;
  if (!hasMoreBosses) return enterResult(content, state, false);
  return { ...state, bossIndex: state.bossIndex + 1, phase: "intro" };
}

export function advance(content: ContentBundle, state: GameState): GameState {
  switch (state.phase) {
    case "intro":
      return startBoss(content, state);
    case "retort":
      return advanceFromRetort(content, state);
    case "playerDefeated":
      return enterResult(content, state, true);
    case "bossDefeated":
      return advanceFromBossDefeated(content, state);
    case "interlude":
      return advanceFromInterlude(content, state);
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Scoring / rank / story ending
// ---------------------------------------------------------------------------

export function computeScore(state: GameState): number {
  return (
    SCORE_WEIGHTS.boss * state.bossesDefeated +
    SCORE_WEIGHTS.dealt * state.damageDealt +
    SCORE_WEIGHTS.hp * state.playerHp +
    SCORE_WEIGHTS.combo * state.maxCombo +
    SCORE_WEIGHTS.turn * state.turns
  );
}

export function selectRank(content: ContentBundle, mode: Mode, score: number): RankTier {
  const sorted = [...content.rankTiers].sort((a, b) => a.rank - b.rank);
  let best = sorted[0];
  for (const tier of sorted) {
    if (score >= tier.minScore[mode]) best = tier;
  }
  return best;
}

/** Ending rules, checked in the order docs/CONTENT.md §4 specifies. */
function computeStoryEnding(state: GameState, rank: RankTier, lost: boolean): StoryEndingId {
  if (lost) return "lost";

  const amaLog = state.log.filter((entry) => entry.bossId === AMA_BOSS_ID);
  const amaClean = amaLog.length >= 1 && amaLog.every((e) => e.archetype !== "perfect" && e.archetype !== "landmine");
  if (amaClean) return "grandma-favorite";

  if (state.landmineCount >= 5) return "apprentice";
  if (rank.rank <= 2) return "never-again";

  const amaNoLandmine = amaLog.every((e) => e.archetype !== "landmine");
  if (rank.rank >= 5 && amaNoLandmine) return "harmony";

  return "survived";
}

/** Deterministic share/lookup code: `${lifeCode}-${4 uppercase base36 chars}`. */
export function makeResultCode(lifeCode: string, seed: string, score: number, turns: number): string {
  const hash = hashSeed(`${seed}|${score}|${turns}`);
  const code4 = hash.toString(36).toUpperCase().padStart(4, "0").slice(-4);
  return `${lifeCode}-${code4}`;
}

function enterResult(content: ContentBundle, state: GameState, lost: boolean): GameState {
  const finalState: GameState = { ...state, phase: "result" };
  const score = computeScore(finalState);
  const rank = selectRank(content, state.mode, score);
  const life = resolveLife(content, state.lifeId);
  const resultCode = makeResultCode(life?.code ?? "L00", state.seed, score, state.turns);
  const result: GameResult = { score, rank, resultCode };
  if (state.mode === "story") {
    result.storyEndingId = computeStoryEnding(finalState, rank, lost);
  }
  return { ...finalState, result };
}

// ---------------------------------------------------------------------------
// resumeStory
// ---------------------------------------------------------------------------

export function resumeStory(
  content: ContentBundle,
  seed: string,
  checkpointSceneIndex: number,
  opts?: { lifeId?: string }
): GameState {
  const base = createGame(content, "story", seed, opts);
  const refreshed: GameState = {
    ...base,
    playerHp: base.playerMaxHp,
    specials: fullSpecialsAllotment(resolveLife(content, base.lifeId)),
  };
  return enterScene(content, refreshed, checkpointSceneIndex);
}
