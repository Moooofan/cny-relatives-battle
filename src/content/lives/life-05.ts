import type { Life } from "@/content/types";

export default {
  id: "life-05",
  code: "L05",
  slug: "freelance-solo-designer",
  name: "北漂接案設計師",
  tagline: "案子有一搭沒一搭，帳戶也是",
  background: [
    "父母離異，跟著媽媽長大，很早學會看臉色。",
    "接案維生，這個月案子多，下個月可能掛零。",
    "一個人在台北租房，過年才回南部露臉。",
  ],
  relations: {
    "xiao-biaodi": "他問你為什麼不找正職，你只能苦笑。",
    "neighbor-chen": "陳太太覺得接案不算正經工作，很替你媽急。",
    biaojie: "表姊的婆家都很挺她，你早學會自己撐。",
    dabo: "大伯說自由業聽起來就是沒有未來。",
    guzhang: "姑丈問你要不要來他朋友公司上班。",
    sanjiuma: "三舅媽問案子一個月能賺多少，你算給她看。",
    ama: "阿嬤不懂接案是什麼，只叫你別太累。",
    sangu: "三姑說一個人在外面要學會保護自己。",
  },
  strengths: ["對表姊四兩撥千斤傷害 +40%（圓場練很大）"],
  weaknesses: ["被問收入乖乖回答更痛 +40%（案子不穩定的痛）"],
  modifiers: {
    topic: {
      salary_job: { meek: { taken: 1.4 } },
    },
    boss: {
      biaojie: { deflect: { dealt: 1.4 } },
    },
  },
  icon: "Palette",
} satisfies Life;
