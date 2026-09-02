import type { Life } from "@/content/types";

export default {
  id: "life-18",
  code: "L18",
  slug: "reporter-divorced",
  name: "跑線記者",
  tagline: "剛離婚，問問題比回答問題習慣",
  background: [
    "獨生子女，爸媽這幾年比你還關心你的婚姻。",
    "跑社會線三年，什麼場面都見過就是沒見過自己離婚。",
    "北漂租屋，這次過年是離婚後第一次回家。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你上電視很酷，一直問你認不認識明星。",
    "neighbor-chen": "陳太太早就知道你離婚了，比你爸媽先知道。",
    biaojie: "表姊小心翼翼不提婚姻，反而讓氣氛更尷尬。",
    dabo: "大伯轉頭問你最近政治新聞的內幕，你只想閃。",
    guzhang: "姑丈問你能不能幫忙查一下他傳的長輩圖是真是假。",
    sanjiuma: "三舅媽婉轉問你「一個人」是不是比較輕鬆。",
    ama: "阿嬤只說沒關係，一個人也要把自己顧好。",
    sangu: "三姑直球問你離婚的原因，你只能反問回去。",
  },
  strengths: ["對大伯四兩撥千斤傷害 +40%（反問是職業病）"],
  weaknesses: ["被問感情乖乖回答更痛 +50%（傷口還沒好）"],
  modifiers: {
    topic: {
      marriage: { meek: { taken: 1.5 } },
    },
    boss: {
      dabo: { deflect: { dealt: 1.4 } },
    },
  },
  icon: "Newspaper",
} satisfies Life;
