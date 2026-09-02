import type { RankTier, StoryEnding } from "@/content/types";

/**
 * minScore uses -100000 in place of -Infinity for rank 1 (JSON-safe, and far
 * below any achievable score) per docs/CONTENT.md §5.
 */
/**
 * Tuned from `simulateMany()` (src/engine/sim.ts) against the real content
 * bundle: 300 seeds × {random, casual, good, expert} policies × 4 modes.
 * See docs/BALANCE.md for the full before/after tables and rationale.
 * random and daily intentionally share thresholds (docs/CONTENT.md §5); story
 * and gauntlet are tuned independently since their score scales differ.
 */
export const RANK_TIERS: RankTier[] = [
  {
    rank: 1,
    title: "被罵到懷疑人生",
    blurb: "你只是想吃個火鍋，結果被問到重新思考人生規劃。",
    minScore: { random: -100000, daily: -100000, story: -100000, gauntlet: -100000 },
  },
  {
    rank: 2,
    title: "紅包拿了就跑",
    blurb: "戰績不重要，錢有拿到就好，明年再戰。",
    minScore: { random: 20, daily: 20, story: 25, gauntlet: 10 },
  },
  {
    rank: 3,
    title: "尷尬微笑專家",
    blurb: "你的嘴角撐了三天沒垮，這也是一種實力。",
    minScore: { random: 60, daily: 60, story: 100, gauntlet: 60 },
  },
  {
    rank: 4,
    title: "勉強撐到初三",
    blurb: "有輸有贏，家族群組裡沒有人提到你，這就是勝利。",
    minScore: { random: 120, daily: 120, story: 200, gauntlet: 320 },
  },
  {
    rank: 5,
    title: "四兩撥千斤達人",
    blurb: "每一題都被你笑著帶過，親戚們回家還在想到底被回了什麼。",
    minScore: { random: 300, daily: 300, story: 260, gauntlet: 440 },
  },
  {
    rank: 6,
    title: "家族群組流量密碼",
    blurb: "你的回答被截圖傳遍三個群組，表姊偷偷存起來。",
    minScore: { random: 350, daily: 350, story: 420, gauntlet: 725 },
  },
  {
    rank: 7,
    title: "三姑六婆終結者",
    blurb: "三姑親自幫你倒茶。明年，換你問。",
    minScore: { random: 400, daily: 400, story: 460, gauntlet: 825 },
  },
];

export const STORY_ENDINGS: StoryEnding[] = [
  {
    id: "lost",
    title: "提早搭車回台北",
    lines: ["你在高鐵上打開手機，媽媽傳來：『三姑說你很有進步。』", "你把手機關掉。明年再說。"],
  },
  {
    id: "grandma-favorite",
    title: "阿嬤的乖孫",
    lines: ["你輸了很多回合，但阿嬤今晚睡得很好。", "她說明年會再等你。"],
  },
  {
    id: "apprentice",
    title: "反被三姑收為徒弟",
    lines: ["三姑拍拍你的肩：『嘴巴很利，但沒有分寸。明年跟我一起坐這桌。』", "你成為了你最討厭的人，而且有點開心。"],
  },
  {
    id: "never-again",
    title: "明年不回來了",
    lines: ["你在高鐵上訂了明年的機票。目的地：不是家。"],
  },
  {
    id: "harmony",
    title: "全家和樂",
    lines: ["三姑舉杯：『這孩子，可以。』", "阿嬤把最後一塊雞腿放進你碗裡。你沒有拒絕。"],
  },
  {
    id: "survived",
    title: "平安過年",
    lines: ["三天過去了。沒有人受傷，家族群組裡沒有人提到你。", "這就是勝利。"],
  },
];
