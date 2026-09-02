import type { Life } from "@/content/types";

export default {
  id: "life-01",
  code: "L01",
  slug: "beipiao-engineer",
  name: "北漂工程師",
  tagline: "房貸三十年，回家先報平安",
  background: [
    "台北租屋五年，去年頭期款砸下去買房自住。",
    "獨生子女，爸媽的退休生活某種程度也靠你。",
    "平常靠寫程式解決問題，過年靠沉默解決親戚。",
  ],
  relations: {
    "xiao-biaodi": "他以為你月薪很高，一直討抱抱要紅包。",
    "neighbor-chen": "陳太太跟你媽說，買房這麼拚，真乖。",
    biaojie: "表姊常酸你買在蛋白區，你懶得回嘴。",
    dabo: "大伯覺得貸三十年就是被銀行綁住一輩子。",
    guzhang: "姑丈傳的低利貸款文章，你比他早看過。",
    sanjiuma: "三舅媽算過你的房貸利率比表哥高一點。",
    ama: "阿嬤怕你太累，偷塞紅包說是幫忙繳貸款。",
    sangu: "三姑最愛問房子登記在誰名下、頭期誰出。",
  },
  strengths: ["對三舅媽神回覆傷害 +30%（房貸算得比她熟）"],
  weaknesses: ["聊到買房乖乖回答會更痛 +40%（戳到貸款焦慮）"],
  modifiers: {
    topic: {
      housing: { meek: { taken: 1.4 } },
    },
    boss: {
      sanjiuma: { perfect: { dealt: 1.3 } },
    },
  },
  icon: "Laptop",
} satisfies Life;
