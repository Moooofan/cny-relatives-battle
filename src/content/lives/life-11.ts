import type { Life } from "@/content/types";

export default {
  id: "life-11",
  code: "L11",
  slug: "flight-attendant",
  name: "空服員",
  tagline: "長班剛落地，時差比長輩問題還難調",
  background: [
    "家裡老么，從小就想飛出去看世界。",
    "長班常駐外站，一年在家吃年夜飯沒幾次。",
    "有對象了，是外國籍，還沒想好怎麼介紹。",
  ],
  relations: {
    "xiao-biaodi": "他每次都要你帶免稅店的巧克力回來。",
    "neighbor-chen": "陳太太覺得空服員很風光，逢人就炫耀。",
    biaojie: "表姊羨慕你到處飛，但也心疼你不定的班表。",
    dabo: "大伯問你天上看到的政治新聞是不是比較準。",
    guzhang: "姑丈拜託你幫忙帶國外的保健食品回來。",
    sanjiuma: "三舅媽問空服員薪水，是不是比表哥的高。",
    ama: "阿嬤最捨不得你，覺得你太少回來吃飯。",
    sangu: "三姑對你的高級應對很滿意，笑著加碼問。",
  },
  strengths: ["對三姑神回覆傷害 +30%（服務業訓練有素）"],
  weaknesses: ["對阿嬤踩雷傷害 +60%（太少回家的愧疚）"],
  modifiers: {
    boss: {
      sangu: { perfect: { dealt: 1.3 } },
      ama: { landmine: { taken: 1.6 } },
    },
  },
  icon: "Plane",
} satisfies Life;
