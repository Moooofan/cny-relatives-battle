import type { Life } from "@/content/types";

export default {
  id: "life-10",
  code: "L10",
  slug: "career-soldier",
  name: "志願役軍人",
  tagline: "簽下去了，體能沒問題嘴巴也不軟",
  background: [
    "家裡三代同堂，從小被教要撐住場面。",
    "簽下志願役，駐地離家遠，難得放長假。",
    "結婚了還沒生小孩，餐桌話題總繞著這個。",
  ],
  relations: {
    "xiao-biaodi": "他崇拜你的軍裝照，逢人就說你很man。",
    "neighbor-chen": "陳太太逢人就誇當兵穩定，比公務員還穩。",
    biaojie: "表姊佩服你能吃苦，順便凡爾賽她老公。",
    dabo: "大伯聊到國防議題，難得跟你有話聊。",
    guzhang: "姑丈說當兵的體格最好，該多喝他那杯。",
    sanjiuma: "三舅媽說軍人加給穩定，比表哥的獎金牢靠。",
    ama: "阿嬤最擔心你在外面吃不好、睡不好。",
    sangu: "三姑問生小孩的計畫，說部隊放假也要排。",
  },
  strengths: [
    "對大伯神回覆傷害 +30%（國防話題有底氣）",
    "起始 HP +20（體能好扛得住）",
  ],
  weaknesses: ["被問生小孩乖乖回答更痛 +40%（駐外的虧欠感）"],
  modifiers: {
    topic: {
      kids: { meek: { taken: 1.4 } },
    },
    boss: {
      dabo: { perfect: { dealt: 1.3 } },
    },
    startHp: 120,
  },
  icon: "Shield",
} satisfies Life;
