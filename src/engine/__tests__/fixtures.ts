/**
 * Tiny fake ContentBundle for engine tests. Not real game content — just
 * enough shape (3 bosses covering every BossModifiers flag, 6 questions each
 * with the full 8-option OPTION_RECIPE, a 3-act story, rank tiers, endings)
 * to exercise every reducer rule deterministically.
 */
import { advance, applyOption } from "@/engine/reducer";
import type {
  Act,
  Archetype,
  Boss,
  ContentBundle,
  GameState,
  Life,
  Option,
  Question,
  RankTier,
  StoryEnding,
  StoryScene,
  TurnLog,
} from "@/engine/types";

const RECIPE_ORDER: Archetype[] = [
  "perfect",
  "deflect",
  "deflect",
  "meek",
  "meek",
  "backfire",
  "backfire",
  "landmine",
];

/** Deterministic, short, recipe-compliant 8 options for a question id. */
function buildOptions(questionId: string): Option[] {
  return RECIPE_ORDER.map((archetype, i) => ({
    id: `${questionId}-${String.fromCharCode(97 + i)}`,
    text: `選項${i + 1}：${archetype}`,
    archetype,
    retort: `回嗆${i + 1}：${archetype}`,
  }));
}

function question(id: string, text: string, topic: Question["topic"], bossId?: string): Question {
  return { id, text, topic, bossId, options: buildOptions(id) };
}

// ---------------------------------------------------------------------------
// Bosses — 3 total, together covering every BossModifiers flag.
// ---------------------------------------------------------------------------

export const FIXTURE_XIAO_BIAODI: Boss = {
  id: "xiao-biaodi",
  name: "小表弟",
  title: "音量兩倍機",
  description: "大人講什麼他就複誦",
  tier: "easy",
  topics: ["comparison"],
  order: 1,
  modifiers: { takenMultiplier: { landmine: 2 } },
  emoji: "🧒",
  lines: { intro: "你就是表哥嗎？", defeated: "我要去玩了。", victory: "媽媽——他不講話了——" },
};

export const FIXTURE_SANJIUMA: Boss = {
  id: "sanjiuma",
  name: "三舅媽",
  title: "家族薪資資料庫",
  description: "表哥是她的 KPI",
  tier: "hard",
  topics: ["salary_job"],
  order: 2,
  modifiers: { followUpOnMeek: true },
  emoji: "👩‍💼",
  lines: { intro: "表哥今年業績很好喔。", defeated: "厲害啦。", victory: "慢慢來，表哥當年也是……" },
};

export const FIXTURE_AMA: Boss = {
  id: "ama",
  name: "阿嬤",
  title: "心疼值管理員",
  description: "她不會罵你，她會難過",
  tier: "hard",
  topics: ["food_push"],
  order: 3,
  modifiers: {
    dealtMultiplier: { perfect: 0.5 },
    healOnLandmine: 20,
    summonAtHalf: true,
    reuseMeekQuestions: true,
  },
  emoji: "👵",
  lines: { intro: "怎麼又瘦了？", defeated: "阿嬤不問了。", victory: "阿嬤只是關心你而已。" },
};

export const FIXTURE_BOSSES: Boss[] = [FIXTURE_XIAO_BIAODI, FIXTURE_SANJIUMA, FIXTURE_AMA];

// ---------------------------------------------------------------------------
// Questions — 6 total: one boss-specific + one generic per topic.
// ---------------------------------------------------------------------------

export const FIXTURE_QUESTIONS: Question[] = [
  question("xiao-biaodi-comparison-001", "你三十歲了還沒對象嗎？", "comparison", "xiao-biaodi"),
  question("generic-comparison-001", "你表哥比你強多了。", "comparison"),
  question("sanjiuma-salary_job-001", "現在一個月領多少啊？", "salary_job", "sanjiuma"),
  question("generic-salary_job-001", "隔壁小孩年薪破百了。", "salary_job"),
  question("ama-food_push-001", "怎麼吃這麼少？在外面沒吃飯？", "food_push", "ama"),
  question("generic-food_push-001", "再吃一點，別客氣。", "food_push"),
];

// ---------------------------------------------------------------------------
// Story: 3 acts, bossQueue = [xiao-biaodi, sanjiuma, ama]
// ---------------------------------------------------------------------------

export const FIXTURE_ACTS: Act[] = [
  { act: 1, title: "除夕夜圍爐", header: "除夕 19:30 · 圍爐桌上" },
  { act: 2, title: "初一拜年", header: "初一 10:00 · 客廳" },
  { act: 3, title: "初二家族聚餐", header: "初二 12:30 · 餐廳圓桌" },
];

export const FIXTURE_SCENES: StoryScene[] = [
  { kind: "narrative", id: "s-open", act: 1, lines: ["火鍋滾了。", "小表弟盯著你。"] },
  { kind: "fight", id: "s-fight-1", act: 1, bossId: "xiao-biaodi" },
  { kind: "rest", id: "s-rest-1", act: 1, lines: ["你回房間充電。"], healToFull: true, refillSpecials: true },
  {
    kind: "fight",
    id: "s-fight-2",
    act: 2,
    bossId: "sanjiuma",
    extraModifiers: { dealtMultiplier: { deflect: 0.5 } },
  },
  { kind: "narrative", id: "s-mid", act: 3, lines: ["圓桌坐滿十二個人。"] },
  { kind: "rest", id: "s-rest-2", act: 3, lines: ["最後一口氣。"], healToFull: true, refillSpecials: true },
  { kind: "fight", id: "s-fight-3", act: 3, bossId: "ama" },
];

// ---------------------------------------------------------------------------
// Rank tiers — 7, thresholds per docs/CONTENT.md §5.
// ---------------------------------------------------------------------------

function rankTier(rank: number, title: string, roundScore: number, storyScore: number): RankTier {
  return {
    rank,
    title,
    blurb: title,
    minScore: { random: roundScore, daily: roundScore, story: storyScore, gauntlet: storyScore },
  };
}

export const FIXTURE_RANK_TIERS: RankTier[] = [
  rankTier(1, "被罵到懷疑人生", -1_000_000, -1_000_000),
  rankTier(2, "紅包拿了就跑", 60, 300),
  rankTier(3, "尷尬微笑專家", 120, 600),
  rankTier(4, "勉強撐到初三", 180, 900),
  rankTier(5, "四兩撥千斤達人", 240, 1150),
  rankTier(6, "家族群組流量密碼", 300, 1350),
  rankTier(7, "三姑六婆終結者", 360, 1500),
];

// ---------------------------------------------------------------------------
// Story endings — all 6 ids.
// ---------------------------------------------------------------------------

export const FIXTURE_STORY_ENDINGS: StoryEnding[] = [
  { id: "lost", title: "明年不回來了", lines: ["你把手機關掉。"] },
  { id: "grandma-favorite", title: "阿嬤的乖孫", lines: ["阿嬤今晚睡得很好。"] },
  { id: "apprentice", title: "反被三姑收為徒弟", lines: ["你成為了你最討厭的人。"] },
  { id: "never-again", title: "明年不回來了", lines: ["你訂了明年的機票。"] },
  { id: "harmony", title: "全家和樂", lines: ["這孩子，可以。"] },
  { id: "survived", title: "平安過年", lines: ["沒有人受傷。"] },
];

// ---------------------------------------------------------------------------
// Lives — 2 total: one with topic+boss scales/startHp/extraSpecials, one bare.
// ---------------------------------------------------------------------------

export const FIXTURE_LIFE_WITH_MODIFIERS: Life = {
  id: "life-fixture-a",
  code: "LFA",
  slug: "fixture-life-a",
  name: "測試人生甲",
  tagline: "專門用來測試倍率的人生",
  background: ["這是測試用的背景第一段。", "這是測試用的背景第二段。"],
  relations: {
    "xiao-biaodi": "小表弟覺得你很好欺負。",
    sanjiuma: "三舅媽對你的薪水瞭若指掌。",
    ama: "阿嬤踩到你的雷會特別傷心。",
  },
  strengths: ["對三舅媽薪水題神回覆傷害 +30%"],
  weaknesses: ["阿嬤踩雷時受傷 +50%"],
  modifiers: {
    topic: { salary_job: { perfect: { dealt: 1.3 } } },
    boss: { ama: { landmine: { taken: 1.5 } } },
    startHp: 90,
    extraSpecials: { heal: 1 },
  },
  icon: "Laptop",
};

export const FIXTURE_LIFE_PLAIN: Life = {
  id: "life-fixture-b",
  code: "LFB",
  slug: "fixture-life-b",
  name: "測試人生乙",
  tagline: "沒有任何特殊倍率的對照組",
  background: ["這是對照組的背景第一段。", "這是對照組的背景第二段。"],
  relations: {
    "xiao-biaodi": "小表弟對你沒什麼特別印象。",
    sanjiuma: "三舅媽跟你不熟，隨口問問。",
    ama: "阿嬤對你跟對誰都一樣好。",
  },
  strengths: ["沒有加成，也沒有懲罰"],
  weaknesses: ["沒有加成，也沒有懲罰"],
  modifiers: {},
  icon: "User",
};

export const FIXTURE_LIVES: Life[] = [FIXTURE_LIFE_WITH_MODIFIERS, FIXTURE_LIFE_PLAIN];

export const FIXTURE_CONTENT: ContentBundle = {
  bosses: FIXTURE_BOSSES,
  questions: FIXTURE_QUESTIONS,
  scenes: FIXTURE_SCENES,
  acts: FIXTURE_ACTS,
  rankTiers: FIXTURE_RANK_TIERS,
  storyEndings: FIXTURE_STORY_ENDINGS,
  lives: FIXTURE_LIVES,
};

/** A ContentBundle with no lives at all, for "life features are a no-op". */
export const FIXTURE_CONTENT_NO_LIVES: ContentBundle = {
  ...FIXTURE_CONTENT,
  lives: [],
};

// ---------------------------------------------------------------------------
// Shared test helpers
// ---------------------------------------------------------------------------

/** Find the option id for a given archetype on the currently active question. */
export function findOptionId(content: ContentBundle, questionId: string, archetype: Archetype): string {
  const q = content.questions.find((q) => q.id === questionId);
  if (!q) throw new Error(`findOptionId: unknown question ${questionId}`);
  const opt = q.options.find((o) => o.archetype === archetype);
  if (!opt) throw new Error(`findOptionId: no ${archetype} option on ${questionId}`);
  return opt.id;
}

/** Repeatedly pick `archetype` (cycling a pattern if given several) until the
 * boss dies, the player dies, or something else ends the 'turn' phase. */
export function fightWithArchetypes(
  content: ContentBundle,
  state: GameState,
  pattern: Archetype[]
): GameState {
  let s = state;
  let i = 0;
  while (s.phase === "turn") {
    const archetype = pattern[i % pattern.length];
    const optionId = findOptionId(content, s.currentQuestionId!, archetype);
    s = applyOption(content, s, optionId);
    s = advance(content, s);
    i++;
  }
  return s;
}

/** Drive `advance()` through every non-turn, non-result phase (intro,
 * bossDefeated, interlude, playerDefeated) until a turn starts or the run
 * ends, e.g. to walk through story narrative/rest screens. */
export function progressPastNonTurnPhases(content: ContentBundle, state: GameState): GameState {
  let s = state;
  let guard = 0;
  while (s.phase !== "turn" && s.phase !== "result" && guard++ < 200) {
    s = advance(content, s);
  }
  return s;
}

/** A minimal but well-formed TurnLog entry, for tests that construct a
 * GameState by hand to drive one specific reducer transition. */
export function fakeLogEntry(bossId: string, archetype: Archetype): TurnLog {
  return {
    questionId: `${bossId}-fake-001`,
    optionId: `${bossId}-fake-001-a`,
    archetype,
    dealt: 0,
    taken: 0,
    crit: false,
    combo: 0,
    topic: "comparison",
    bossId,
    lifeDealtMult: 1,
    lifeTakenMult: 1,
  };
}

/** Scene index of the final fight in the fixture story (ama). */
export const FIXTURE_LAST_SCENE_INDEX = FIXTURE_SCENES.length - 1;

/**
 * A fully-formed GameState representing "the last boss (ama) just died, in
 * phase 'retort'", ready to feed into `advance()` twice (retort ->
 * bossDefeated -> result) to exercise `enterResult`/ending rules directly,
 * without needing to simulate an entire realistic playthrough.
 */
export function finalRetortState(overrides: Partial<GameState>): GameState {
  const base: GameState = {
    mode: "story",
    seed: "ending-test",
    rng: 0,
    phase: "retort",
    bossQueue: ["xiao-biaodi", "sanjiuma", "ama"],
    bossIndex: 2,
    bossHp: 0,
    bossMaxHp: 130,
    playerHp: 50,
    playerMaxHp: 100,
    lifeId: null,
    salt: null,
    combo: 0,
    maxCombo: 0,
    deck: [],
    optionOrder: [],
    specials: { skip: 1, heal: 1 },
    log: [],
    sceneIndex: FIXTURE_LAST_SCENE_INDEX,
    bossesDefeated: 2,
    damageDealt: 0,
    turns: 10,
    landmineCount: 0,
    meekQuestionIds: [],
    summonUsed: false,
    followUp: false,
    activeModifiers: {},
  };
  return { ...base, ...overrides };
}
