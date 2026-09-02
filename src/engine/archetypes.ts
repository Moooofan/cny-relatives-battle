import type { Archetype } from "@/content/types";

/**
 * Single source of truth for balance numbers. Writers never type numbers;
 * changing a value here rebalances every question at once.
 */
export interface ArchetypeStats {
  /** damage dealt to the boss (before boss dealtMultiplier) */
  dealt: number;
  /** damage taken by the player (before boss power and takenMultiplier) */
  taken: number;
  /** "inc" = combo +1, "hold" = keep combo, "reset" = combo → 0 */
  combo: "inc" | "hold" | "reset";
  /** whether the boss heals (amount = boss.modifiers.healOnLandmine ?? DEFAULT_LANDMINE_HEAL) */
  healsBoss: boolean;
  label: string;
  /** short explanation for the review screen */
  hint: string;
}

export const ARCHETYPE_TABLE: Record<Archetype, ArchetypeStats> = {
  perfect: {
    dealt: 25,
    taken: 0,
    combo: "inc",
    healsBoss: false,
    label: "神回覆",
    hint: "機智又不失禮，話題直接收掉。",
  },
  deflect: {
    dealt: 12,
    taken: 5,
    combo: "hold",
    healsBoss: false,
    label: "四兩撥千斤",
    hint: "笑著帶過，沒人受傷，但也沒真的贏。",
  },
  meek: {
    dealt: 4,
    taken: 15,
    combo: "reset",
    healsBoss: false,
    label: "乖乖回答",
    hint: "誠實沒有錯，只是給了追問的空間。",
  },
  backfire: {
    dealt: 0,
    taken: 22,
    combo: "reset",
    healsBoss: false,
    label: "反擊失敗",
    hint: "想耍嘴皮結果冷場，全桌沉默三秒。",
  },
  landmine: {
    dealt: 0,
    taken: 35,
    combo: "reset",
    healsBoss: true,
    label: "踩雷",
    hint: "戳到痛處，親戚反而更有力氣了。",
  },
};

export const DEFAULT_LANDMINE_HEAL = 10;

/** Consecutive perfects needed to trigger a 暴擊 (×CRIT_MULTIPLIER) */
export const CRIT_COMBO = 3;
export const CRIT_MULTIPLIER = 2;

export const PLAYER_MAX_HP = 100;

/** required archetype counts per question (8 options total) */
export const OPTION_RECIPE: Record<Archetype, number> = {
  perfect: 1,
  deflect: 2,
  meek: 2,
  backfire: 2,
  landmine: 1,
};
export const OPTIONS_PER_QUESTION = 8;

export const TIER_HP = { easy: 60, normal: 90, hard: 130, final: 180 } as const;
/** multiplier applied to damage the player takes */
export const TIER_POWER = { easy: 1.0, normal: 1.2, hard: 1.5, final: 1.8 } as const;

/** seconds per turn; timeout resolves as a synthetic `meek` */
export const TURN_SECONDS = 20;

export const SPECIALS = {
  /** 借尿遁：skip the current question, no damage, combo held */
  skip: { perRun: 1, label: "借尿遁" },
  /** 發紅包轉移話題：heal HEAL_AMOUNT, only while hp < HEAL_THRESHOLD */
  heal: { perRun: 1, label: "發紅包轉移話題", amount: 25, threshold: 60 },
} as const;

export const GAUNTLET = {
  healPerWin: 20,
  restEvery: 3,
  restHeal: 40,
} as const;

/** score = 100*bossesDefeated + damageDealt + 2*hpRemaining + 15*maxCombo - 3*turns */
export const SCORE_WEIGHTS = {
  boss: 100,
  dealt: 1,
  hp: 2,
  combo: 15,
  turn: -3,
} as const;
