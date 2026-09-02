import type { Act, StoryScene } from "@/content/types";

export const ACTS: Act[] = [
  {
    act: 1,
    title: "除夕夜圍爐",
    header: "除夕 19:30 · 圍爐桌上，阿嬤夾了第三塊雞肉給你",
  },
  {
    act: 2,
    title: "初一拜年",
    header: "初一 10:00 · 客廳，糖果盒被打開第七次",
  },
  {
    act: 3,
    title: "初二家族聚餐",
    header: "初二 12:30 · 餐廳圓桌，轉盤上只剩你沒被問的那道菜",
  },
];

export const STORY_SCENES: StoryScene[] = [
  // 第一幕 · 除夕夜圍爐
  {
    kind: "narrative",
    id: "a1-s01",
    act: 1,
    header: "除夕 19:30 · 圍爐桌上，阿嬤夾了第三塊雞肉給你",
    lines: ["火鍋滾了，電視播著你沒看過的節目。", "你坐下的瞬間，小表弟盯著你，眼神像是剛拿到新台詞。"],
  },
  {
    kind: "fight",
    id: "a1-s02",
    act: 1,
    bossId: "xiao-biaodi",
  },
  {
    kind: "narrative",
    id: "a1-s03",
    act: 1,
    lines: [
      "姑丈把手機轉過來：『你看這篇，薑黃配黑胡椒，我朋友的朋友腫瘤都不見了。』",
      "他還沒開始，就已經倒了第二杯。",
    ],
  },
  {
    kind: "fight",
    id: "a1-s04",
    act: 1,
    bossId: "guzhang",
  },
  {
    kind: "narrative",
    id: "a1-s05",
    act: 1,
    lines: ["阿嬤沒有問你問題，她只是把碗推過來。", "你突然發現，這一關不能用嗆的。"],
  },
  {
    kind: "fight",
    id: "a1-s06",
    act: 1,
    bossId: "ama",
    hpOverride: 80,
  },
  {
    kind: "rest",
    id: "a1-s07",
    act: 1,
    lines: ["阿嬤收碗時小聲說：『明天三姑會來。』", "全桌安靜了兩秒。", "你回房間充電，手機 3%，你也是。"],
    healToFull: true,
    refillSpecials: true,
  },

  // 第二幕 · 初一拜年
  {
    kind: "narrative",
    id: "a2-s01",
    act: 2,
    header: "初一 10:00 · 客廳，糖果盒被打開第七次",
    lines: ["門一開，陳太太先進來，手上提著一盒她自己也不會吃的禮盒。", "『我剛剛才跟你媽聊到你～』"],
  },
  {
    kind: "fight",
    id: "a2-s02",
    act: 2,
    bossId: "neighbor-chen",
  },
  {
    kind: "narrative",
    id: "a2-s03",
    act: 2,
    lines: ["表姊抱著小的走進來，客廳的音量瞬間高兩倍。", "她笑著問你最近好不好，你知道這不是問句。"],
  },
  {
    kind: "fight",
    id: "a2-s04",
    act: 2,
    bossId: "biaojie",
  },
  {
    kind: "narrative",
    id: "a2-s05",
    act: 2,
    lines: ["大伯講到一半，媽媽端茶出來補一句：『對啊我也一直跟他講。』", "媽媽站到對面了。你不好意思太油。"],
  },
  {
    kind: "fight",
    id: "a2-s06",
    act: 2,
    bossId: "dabo",
    extraModifiers: {
      dealtMultiplier: { deflect: 0.5 },
    },
  },
  {
    kind: "rest",
    id: "a2-s07",
    act: 2,
    lines: ["媽媽在廚房小聲說：『我是幫你緩頰耶。』你決定相信她。", "初二要去餐廳。三姑會坐主位。"],
    healToFull: true,
    refillSpecials: true,
  },

  // 第三幕 · 初二家族聚餐
  {
    kind: "narrative",
    id: "a3-s01",
    act: 3,
    header: "初二 12:30 · 餐廳圓桌，轉盤上只剩你沒被問的那道菜",
    lines: ["圓桌坐滿十二個人，三舅媽的手機桌布是表哥的升遷公告。", "她轉過來，笑容標準。"],
  },
  {
    kind: "fight",
    id: "a3-s02",
    act: 3,
    bossId: "sanjiuma",
  },
  {
    kind: "narrative",
    id: "a3-s03",
    act: 3,
    lines: ["三姑放下筷子，把椅子轉向你。", "『聽說這兩天大家都被你嗆回去？』", "她沒有生氣。她在期待。"],
  },
  {
    kind: "fight",
    id: "a3-s04",
    act: 3,
    bossId: "sangu",
  },
];
