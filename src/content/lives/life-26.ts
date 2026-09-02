import type { Life } from "@/content/types";

export default {
  id: "life-26",
  code: "L26",
  slug: "tour-guide",
  name: "導遊",
  tagline: "淡季沒團帶，嘴巴閒不下來",
  background: [
    "家裡老么，從小就愛到處跑不喜歡待在家。",
    "當導遊十年，淡季常常連續好幾個月沒團可帶。",
    "留在家鄉生活，出團才離開，過年正好淡季。",
  ],
  relations: {
    "xiao-biaodi": "他吵著要你講國外好玩的事給他聽。",
    "neighbor-chen": "陳太太覺得導遊很好賺，一直問你去哪玩。",
    biaojie: "表姊每次出國都私訊問你行程怎麼排。",
    dabo: "大伯問你國外的政治是不是也一團亂。",
    guzhang: "姑丈拜託你幫忙查國外那個偏方是不是真的。",
    sanjiuma: "三舅媽問淡季沒團的時候靠什麼過活。",
    ama: "阿嬤最怕你在國外出意外，逢人就念叨。",
    sangu: "三姑聽你講解說詞，笑說你比她還會帶場子。",
  },
  strengths: ["對三姑神回覆傷害 +30%（帶團解說化解尷尬）"],
  weaknesses: ["被問薪水乖乖回答更痛 +50%（淡季收入不穩）"],
  modifiers: {
    topic: {
      salary_job: { meek: { taken: 1.5 } },
    },
    boss: {
      sangu: { perfect: { dealt: 1.3 } },
    },
  },
  icon: "Compass",
} satisfies Life;
