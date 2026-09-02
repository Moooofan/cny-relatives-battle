import type { Life } from "@/content/types";

export default {
  id: "life-02",
  code: "L02",
  slug: "ama-raised-nurse",
  name: "阿嬤帶大護理師",
  tagline: "阿嬤養大，現在換你顧大家",
  background: [
    "阿公阿嬤帶大，爸媽在外地工作討生活。",
    "在醫院上大夜班，情緒比病人還要穩。",
    "留在老家生活，單身很久，家人比較急。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你很兇，因為你打針從不手軟。",
    "neighbor-chen": "陳太太常來問你，醫院是不是很缺人。",
    biaojie: "表姊很佩服你顧阿嬤，但也叫你多顧自己。",
    dabo: "大伯說醫護辛苦，難得沒轉去政論台。",
    guzhang: "姑丈的偏方你都聽過，但還是笑著點頭。",
    sanjiuma: "三舅媽說護理師薪水穩，比表哥還穩定。",
    ama: "阿嬤養大的孩子，吵架也吵不過那份感情。",
    sangu: "三姑問你怎麼還不嫁，護理師這麼搶手。",
  },
  strengths: ["對阿嬤神回覆傷害 +40%（從小就懂她的哏）"],
  weaknesses: [
    "對阿嬤踩雷傷害 +60%（兇阿嬤會超自責）",
    "被問婚事乖乖回答更痛 +30%",
  ],
  modifiers: {
    topic: {
      marriage: { meek: { taken: 1.3 } },
    },
    boss: {
      ama: { perfect: { dealt: 1.4 }, landmine: { taken: 1.6 } },
    },
    extraSpecials: { heal: 1 },
  },
  icon: "Stethoscope",
} satisfies Life;
