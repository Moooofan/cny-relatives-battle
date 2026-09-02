import type { Life } from "@/content/types";

export default {
  id: "life-22",
  code: "L22",
  slug: "ecommerce-copywriter",
  name: "電商小編",
  tagline: "有對象但沒公開，文案先讓大家看",
  background: [
    "父母離異，跟爸爸長大，很早學會自己找話題。",
    "做電商社群小編，一天到晚在想哏和標題。",
    "北漂租屋，談了戀愛但還沒準備好帶回家。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你做的迷因很好笑，纏著你教他。",
    "neighbor-chen": "陳太太問小編是不是就是在滑手機而已。",
    biaojie: "表姊常請你幫她的代購文案下標題。",
    dabo: "大伯說網路工作靠不住，勸你找正經頭路。",
    guzhang: "姑丈的長輩圖，你私下都在研究怎麼改標題。",
    sanjiuma: "三舅媽拿你的業績獎金跟表哥的比。",
    ama: "阿嬤不懂什麼是小編，只希望你別太晚睡。",
    sangu: "三姑一句話就快問出你到底有沒有對象。",
  },
  strengths: ["對三舅媽四兩撥千斤傷害 +40%（下標題是本業）"],
  weaknesses: ["被問感情乖乖回答更痛 +40%（還沒準備好公開）"],
  modifiers: {
    topic: {
      marriage: { meek: { taken: 1.4 } },
    },
    boss: {
      sanjiuma: { deflect: { dealt: 1.4 } },
    },
  },
  icon: "Smartphone",
} satisfies Life;
