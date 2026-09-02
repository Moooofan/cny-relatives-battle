/**
 * Content contract for 《過年大戰三姑六婆》.
 * Writers only touch files under src/content/. Numbers (damage, HP) never live
 * on options; they are derived from `archetype` via src/engine/archetypes.ts.
 */

export type Archetype =
  | "perfect" // 神回覆：機智、自信、把話題收掉 → 大傷關主
  | "deflect" // 四兩撥千斤：讚美/反問/轉移到食物紅包 → 中傷關主，自己微傷
  | "meek" // 乖乖回答：誠實無奈，留追問空間 → 自己中傷
  | "backfire" // 反擊失敗：想耍嘴皮但冷場/尷尬 → 自己中大傷
  | "landmine"; // 踩雷：戳痛處/翻隱私/對長輩不耐煩 → 自己大傷，關主回血

export const ARCHETYPES: readonly Archetype[] = [
  "perfect",
  "deflect",
  "meek",
  "backfire",
  "landmine",
] as const;

export type Tier = "easy" | "normal" | "hard" | "final";

export type Topic =
  | "marriage" // 結婚/交往
  | "kids" // 生小孩
  | "salary_job" // 薪水/工作
  | "housing" // 買房
  | "comparison" // 跟別人比較
  | "appearance" // 外表/體重
  | "education" // 學歷
  | "politics" // 政治/時事（不指名真實政黨/人物）
  | "elder_health" // 長輩圖/健康偏方
  | "food_push" // 催吃/催喝
  | "red_envelope" // 紅包
  | "religion"; // 宗教/拜拜

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

export type BossId =
  | "xiao-biaodi"
  | "neighbor-chen"
  | "biaojie"
  | "dabo"
  | "guzhang"
  | "sanjiuma"
  | "ama"
  | "sangu";

export interface Option {
  /** `${questionId}-${a..h}` */
  id: string;
  /** 玩家的回應，≤30 字 */
  text: string;
  archetype: Archetype;
  /** 關主聽完後的反應，≤30 字 */
  retort: string;
}

export interface Question {
  /** `${bossId | "generic"}-${topic}-${nnn}`，全域唯一 */
  id: string;
  /** 關主的攻擊句，≤32 字 */
  text: string;
  topic: Topic;
  /** 專屬關主；省略 = generic，任何 topics 包含此 topic 的關主都可抽到 */
  bossId?: BossId;
  /** 抽題權重，預設 1 */
  weight?: number;
  /**
   * 恰好 8 個選項。配方（由 content 測試強制）：
   * perfect 1、landmine 1、deflect 2、meek 2、backfire 2。
   */
  options: Option[];
}

/** 關主特殊機制，全部由 engine 統一解讀；未設定即預設值。 */
export interface BossModifiers {
  /** 對關主傷害倍率（依 archetype）。例：表姊 perfect 0.8、deflect 1.5；阿嬤 perfect 0.5 */
  dealtMultiplier?: Partial<Record<Archetype, number>>;
  /** 玩家受傷倍率（依 archetype）。例：小表弟 landmine 2 */
  takenMultiplier?: Partial<Record<Archetype, number>>;
  /** 踩雷時關主回血量，預設 10。阿嬤 20 */
  healOnLandmine?: number;
  /** 三舅媽：玩家 meek 時同回合立刻追問一題（不重新計時器重置為 full） */
  followUpOnMeek?: boolean;
  /** 三姑：HP 低於 50% 時召喚一位本場 run 已擊敗的關主攻擊一次 */
  summonAtHalf?: boolean;
  /** 三姑：優先重用玩家本場 run 曾 meek 過的題目 */
  reuseMeekQuestions?: boolean;
}

export interface Boss {
  id: BossId;
  /** 顯示名，例：三舅媽 */
  name: string;
  /** 稱號，例：家族薪資資料庫管理員 */
  title: string;
  /** 一句話個性描述（圖鑑用） */
  description: string;
  tier: Tier;
  /** 主打題型；generic 題依此配對 */
  topics: Topic[];
  /** 闖關順序（小 → 大） */
  order: number;
  modifiers?: BossModifiers;
  /** 立繪：暫用 emoji，之後換成 /public/bosses/<id>.png */
  emoji: string;
  lines: {
    intro: string; // 登場
    defeated: string; // 被玩家打敗
    victory: string; // 打敗玩家
  };
}

export type StoryScene =
  | {
      kind: "narrative";
      id: string;
      act: 1 | 2 | 3;
      /** 場景標題列，例：「除夕 19:30 · 圍爐桌上，阿嬤夾了第三塊雞肉給你」 */
      header?: string;
      /** 旁白，每段 ≤40 字，每景 ≤3 段 */
      lines: string[];
    }
  | {
      kind: "fight";
      id: string;
      act: 1 | 2 | 3;
      bossId: BossId;
      /** 場景層級的額外機制（例：媽媽倒戈 → deflect ×0.5），與 boss.modifiers 相乘 */
      extraModifiers?: BossModifiers;
      /** 教學版：覆蓋關主 HP */
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
  title: string; // 除夕夜圍爐
  header: string;
}

export type Mode = "random" | "daily" | "story" | "gauntlet";

export interface RankTier {
  /** 由低到高 1..7 */
  rank: number;
  title: string;
  blurb: string;
  /** 分數門檻（含），依模式分別設定 */
  minScore: Record<Mode, number>;
}

export interface StoryEnding {
  id: "harmony" | "never-again" | "apprentice" | "grandma-favorite" | "survived" | "lost";
  title: string;
  lines: string[];
}

/* ---------------- 人生（Life）---------------- */

/** 依 archetype 的倍率：dealt 乘在對關主傷害，taken 乘在玩家受傷 */
export type ArchetypeScale = Partial<
  Record<Archetype, { dealt?: number; taken?: number }>
>;

export interface LifeModifiers {
  /** 依題目 topic 的倍率（例：剛失業 → salary_job.meek.taken 1.5） */
  topic?: Partial<Record<Topic, ArchetypeScale>>;
  /** 依關主的倍率（例：阿嬤帶大的 → ama.landmine.taken 2, ama.perfect.dealt 1.3） */
  boss?: Partial<Record<BossId, ArchetypeScale>>;
  /** 起始 HP，預設 PLAYER_MAX_HP */
  startHp?: number;
  /** 額外特殊技次數 */
  extraSpecials?: { skip?: number; heal?: number };
}

export interface Life {
  /** "life-01" … "life-30" */
  id: string;
  /** 追蹤代碼，顯示給玩家與後台："L01" … "L30" */
  code: string;
  /** 英文 slug，供 URL/分享 */
  slug: string;
  /** 人生名稱，例：北漂工程師 */
  name: string;
  /** 一句話 tagline ≤24 字 */
  tagline: string;
  /** 家庭背景，2–3 段，每段 ≤40 字 */
  background: string[];
  /** 與每位長輩的故事，1 句 ≤40 字；影響回覆殺傷力的「理由」要能從這句讀出來 */
  relations: Record<BossId, string>;
  /** 玩家看得到的強項/弱點說明，各 1 句 */
  strengths: string[];
  weaknesses: string[];
  modifiers: LifeModifiers;
  /** Lucide icon 名稱（例："Laptop"），供人生選擇卡片 */
  icon: string;
}
