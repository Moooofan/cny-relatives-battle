import type { Life } from "@/content/types";

export default {
  id: "life-25",
  code: "L25",
  slug: "veterinarian",
  name: "獸醫",
  tagline: "顧毛小孩顧到沒空生自己的小孩",
  background: [
    "獨生子女，爸媽這幾年都很期待你成家。",
    "在動物醫院值班，急診常常一忙就是一整夜。",
    "結婚多年沒生小孩，餐桌上被算得比病歷還細。",
  ],
  relations: {
    "xiao-biaodi": "他吵著要你幫他養的倉鼠看病。",
    "neighbor-chen": "陳太太的貓狗健康檢查全都指定找你。",
    biaojie: "表姊常問她家的貓能不能吃她小孩的副食品。",
    dabo: "大伯覺得看動物的不算真正的醫生，你懶得糾正。",
    guzhang: "姑丈的養生偏方，你都能用動物實驗反駁。",
    sanjiuma: "三舅媽問獸醫薪水，跟表哥的醫材業務比比看。",
    ama: "阿嬤只希望你早點抱孫子，別顧著別人家毛小孩。",
    sangu: "三姑問生小孩的事，一年比一年問得直白。",
  },
  strengths: ["對姑丈神回覆傷害 +40%（動物實驗打偏方）"],
  weaknesses: ["被問生小孩乖乖回答更痛 +40%"],
  modifiers: {
    topic: {
      kids: { meek: { taken: 1.4 } },
    },
    boss: {
      guzhang: { perfect: { dealt: 1.4 } },
    },
  },
  icon: "PawPrint",
} satisfies Life;
