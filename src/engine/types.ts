/**
 * Pure, React-free engine types for 《過年大戰三姑六婆》.
 *
 * IMPORTANT: this module never imports from `@/content`. The shapes below are
 * kept structurally identical to `src/content/types.ts` (the content
 * contract) so that a real ContentBundle built from `src/content/**` can be
 * passed into any engine function without a cast. Engine functions always
 * take a ContentBundle explicitly — never a module-level import of content —
 * so tests can inject small fixtures instead.
 */

// ---------------------------------------------------------------------------
// Mirrors of src/content/types.ts (duplicated on purpose, see file header).
// ---------------------------------------------------------------------------

export type Archetype = "perfect" | "deflect" | "meek" | "backfire" | "landmine";

export const ARCHETYPES: readonly Archetype[] = [
  "perfect",
  "deflect",
  "meek",
  "backfire",
  "landmine",
] as const;

export type Tier = "easy" | "normal" | "hard" | "final";

export type Topic =
  | "marriage"
  | "kids"
  | "salary_job"
  | "housing"
  | "comparison"
  | "appearance"
  | "education"
  | "politics"
  | "elder_health"
  | "food_push"
  | "red_envelope"
  | "religion";

export const TOPICS: readonly Topic[] = [
  "marriage",
  "kids",
  "salary_job",
  "housing",
  "comparison",
  "appearance",
  "education",
  "politics",
  "elder_health",
  "food_push",
  "red_envelope",
  "religion",
] as const;

/** Real content uses a closed union; the engine only needs `string` so test
 * fixtures can use arbitrary ids. Any real BossId is assignable to this. */
export type BossId = string;

export interface Option {
  id: string;
  text: string;
  archetype: Archetype;
  retort: string;
}

export interface Question {
  id: string;
  text: string;
  topic: Topic;
  bossId?: BossId;
  weight?: number;
  options: Option[];
}

export interface BossModifiers {
  dealtMultiplier?: Partial<Record<Archetype, number>>;
  takenMultiplier?: Partial<Record<Archetype, number>>;
  healOnLandmine?: number;
  followUpOnMeek?: boolean;
  summonAtHalf?: boolean;
  reuseMeekQuestions?: boolean;
}

export interface Boss {
  id: BossId;
  name: string;
  title: string;
  description: string;
  tier: Tier;
  topics: Topic[];
  order: number;
  modifiers?: BossModifiers;
  emoji: string;
  lines: {
    intro: string;
    defeated: string;
    victory: string;
  };
}

export type StoryScene =
  | {
      kind: "narrative";
      id: string;
      act: 1 | 2 | 3;
      header?: string;
      lines: string[];
    }
  | {
      kind: "fight";
      id: string;
      act: 1 | 2 | 3;
      bossId: BossId;
      extraModifiers?: BossModifiers;
      hpOverride?: number;
    }
  | {
      kind: "rest";
      id: string;
      act: 1 | 2 | 3;
      lines: string[];
      healToFull: true;
      refillSpecials: true;
    };

export interface Act {
  act: 1 | 2 | 3;
  title: string;
  header: string;
}

export type Mode = "random" | "daily" | "story" | "gauntlet";

export interface RankTier {
  rank: number;
  title: string;
  blurb: string;
  minScore: Record<Mode, number>;
}

export type StoryEndingId =
  | "harmony"
  | "never-again"
  | "apprentice"
  | "grandma-favorite"
  | "survived"
  | "lost";

export interface StoryEnding {
  id: StoryEndingId;
  title: string;
  lines: string[];
}

export const STORY_ENDING_IDS: readonly StoryEndingId[] = [
  "harmony",
  "never-again",
  "apprentice",
  "grandma-favorite",
  "survived",
  "lost",
] as const;

// ---------------------------------------------------------------------------
// 人生 (Life) — mirrors the bottom of src/content/types.ts.
// ---------------------------------------------------------------------------

export type ArchetypeScale = Partial<Record<Archetype, { dealt?: number; taken?: number }>>;

export interface LifeModifiers {
  topic?: Partial<Record<Topic, ArchetypeScale>>;
  boss?: Partial<Record<BossId, ArchetypeScale>>;
  startHp?: number;
  extraSpecials?: { skip?: number; heal?: number };
}

export interface Life {
  id: string;
  code: string;
  slug: string;
  name: string;
  tagline: string;
  background: string[];
  relations: Record<BossId, string>;
  strengths: string[];
  weaknesses: string[];
  modifiers: LifeModifiers;
  icon: string;
}

/** Everything the engine needs, injected explicitly (never imported).
 * `lives` is optional: a bundle without it (or with an empty array) makes
 * every life-related feature a no-op, so older fixtures/content keep working. */
export interface ContentBundle {
  bosses: Boss[];
  questions: Question[];
  scenes: StoryScene[];
  acts: Act[];
  rankTiers: RankTier[];
  storyEndings: StoryEnding[];
  lives?: Life[];
}

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

export type Phase =
  | "intro"
  | "turn"
  | "retort"
  | "bossDefeated"
  | "interlude"
  | "playerDefeated"
  | "result";

export interface TurnLog {
  questionId: string;
  optionId: string | "timeout" | "skip";
  archetype: Archetype;
  dealt: number;
  taken: number;
  crit: boolean;
  combo: number;
  topic: Topic;
  bossId: BossId;
  summonedBossId?: BossId;
  /** Combined life.modifiers.topic × life.modifiers.boss multiplier actually
   * applied to `dealt`/`taken` this turn. 1 when there is no active life. */
  lifeDealtMult: number;
  lifeTakenMult: number;
  /** true when this turn's question was injected via a boss's
   * `reuseMeekQuestions` modifier — 三姑's 翻舊帳 gimmick (docs/CONTENT.md §4). */
  grudge?: true;
}

export interface LastResolve {
  optionId: string;
  archetype: Archetype;
  dealt: number;
  taken: number;
  healed: number;
  crit: boolean;
  timeout: boolean;
  lifeDealtMult: number;
  lifeTakenMult: number;
}

export interface GameResult {
  score: number;
  rank: RankTier;
  storyEndingId?: StoryEndingId;
  /** `${life?.code ?? "L00"}-${code4}`, deterministic from seed/score/turns. */
  resultCode: string;
}

export interface GameState {
  mode: Mode;
  seed: string;
  /** mulberry32 state, threaded through every rng call. */
  rng: number;
  phase: Phase;
  bossQueue: BossId[];
  bossIndex: number;
  bossHp: number;
  bossMaxHp: number;
  playerHp: number;
  /** cap for playerHp; life.modifiers.startHp ?? PLAYER_MAX_HP, fixed for the run */
  playerMaxHp: number;
  /** id of the 人生 chosen for this run, or null when content.lives is empty */
  lifeId: string | null;
  combo: number;
  maxCombo: number;
  /** question ids not yet asked by the current boss */
  deck: string[];
  currentQuestionId?: string;
  /** shuffled option ids for the current question */
  optionOrder: string[];
  lastResolve?: LastResolve;
  specials: { skip: number; heal: number };
  log: TurnLog[];
  /** story mode only: index into content.scenes */
  sceneIndex?: number;
  act?: 1 | 2 | 3;
  /** story mode only: scene index to resume from after a loss */
  storyCheckpoint?: number;
  bossesDefeated: number;
  damageDealt: number;
  turns: number;
  landmineCount: number;
  meekQuestionIds: string[];
  summonUsed: boolean;
  followUp: boolean;
  activeModifiers: BossModifiers;
  interludeText?: string[];
  result?: GameResult;
  /**
   * Internal bookkeeping (not part of the documented field list): when
   * `activeModifiers.summonAtHalf` draws a question from a previously
   * defeated boss's pool, the summoned boss id is stashed here so the next
   * `applyOption`/`applyTimeout` call can stamp it onto the TurnLog entry as
   * `summonedBossId`. Cleared once consumed. Serialisable (plain string).
   */
  pendingSummonBossId?: BossId;
  /**
   * Internal bookkeeping: question ids injected at the front of the deck by
   * `startBoss` when the current boss has `activeModifiers.reuseMeekQuestions`
   * (up to 3, drawn from `meekQuestionIds`, may belong to ANY boss's pool).
   * Recomputed on every `startBoss` call; empty for bosses without the flag.
   */
  reusedQuestionIds?: string[];
  /**
   * Set by `drawQuestion` for exactly the turn whose drawn question id is in
   * `reusedQuestionIds` — 三姑's 翻舊帳 gimmick (docs/CONTENT.md §4).
   * `originalBossId` is the bossId the question originally belonged to, or
   * `null` for a generic (bossId-less) question. Cleared on every other draw.
   */
  grudge?: { questionId: string; originalBossId: BossId | null };
}
