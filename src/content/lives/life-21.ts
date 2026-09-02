import type { Life } from "@/content/types";

export default {
  id: "life-21",
  code: "L21",
  slug: "hairstylist",
  name: "髮型設計師",
  tagline: "剛買房，貸款壓力堆得比髮蠟還高",
  background: [
    "家裡老么，從小最會看流行，最敢染頭髮。",
    "去年頭期款砸下去，現在天天算貸款月付多少。",
    "北漂租屋接客戶，過年才回家順便幫全家剪髮。",
  ],
  relations: {
    "xiao-biaodi": "他一直吵著要染跟你一樣的髮色。",
    "neighbor-chen": "陳太太逢人就秀她剛燙好的頭髮是你弄的。",
    biaojie: "表姊每次回娘家前都先來給你整理造型。",
    dabo: "大伯說剪頭髮的算什麼專業，你懶得爭辯。",
    guzhang: "姑丈想染回黑髮，問你有沒有天然的偏方。",
    sanjiuma: "三舅媽問剪一顆頭多少錢，跟表哥的獎金比。",
    ama: "阿嬤最愛你幫她做頭髮，說比美容院細心。",
    sangu: "三姑問你什麼時候要自己開店當老闆。",
  },
  strengths: ["外表題神回覆傷害 +50%（本業手感）"],
  weaknesses: ["被問買房乖乖回答更痛 +40%（房貸壓力大）"],
  modifiers: {
    topic: {
      appearance: { perfect: { dealt: 1.5 } },
      housing: { meek: { taken: 1.4 } },
    },
  },
  icon: "Scissors",
} satisfies Life;
