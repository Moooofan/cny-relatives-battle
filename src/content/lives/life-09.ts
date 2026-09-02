import type { Life } from "@/content/types";

export default {
  id: "life-09",
  code: "L09",
  slug: "secretly-dating-teacher",
  name: "神秘戀愛老師",
  tagline: "有對象了，還沒跟長輩報備",
  background: [
    "身為長女，弟妹的事總是先問過你意見。",
    "在家鄉國小教書，全村小孩都認得你。",
    "談了一年戀愛，還沒膽子帶回家介紹。",
  ],
  relations: {
    "xiao-biaodi": "他是你班上學生的表弟，什麼都會回報。",
    "neighbor-chen": "陳太太堅信你單身，一直要幫你介紹對象。",
    biaojie: "表姊看穿你有事瞞著，但沒有戳破。",
    dabo: "大伯問你怎麼還不結婚，是不是要求太高。",
    guzhang: "姑丈說當老師穩定，條件這麼好怎麼沒對象。",
    sanjiuma: "三舅媽的消息網還沒挖到你的對象是誰。",
    ama: "阿嬤只希望你幸福，沒逼你交代細節。",
    sangu: "三姑一句話就快問出你在跟誰約會。",
  },
  strengths: ["對小表弟神回覆傷害 +30%（治小孩是本業）"],
  weaknesses: ["被問感情乖乖回答更痛 +50%（一開口就破功）"],
  modifiers: {
    topic: {
      marriage: { meek: { taken: 1.5 }, deflect: { dealt: 1.3 } },
    },
    boss: {
      "xiao-biaodi": { perfect: { dealt: 1.3 } },
    },
  },
  icon: "BookOpen",
} satisfies Life;
