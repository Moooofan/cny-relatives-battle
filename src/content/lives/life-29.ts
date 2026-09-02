import type { Life } from "@/content/types";

export default {
  id: "life-29",
  code: "L29",
  slug: "esports-player",
  name: "電競選手",
  tagline: "休學打職業，還在等一場翻身戰",
  background: [
    "家裡老么，從小打電動被念到大現在打出成績。",
    "為了打職業辦了休學，家人到現在還沒完全接受。",
    "北漂跟隊友住訓練基地，比賽日程比課表還滿。",
  ],
  relations: {
    "xiao-biaodi": "他是你頭號小粉絲，看轉播比看卡通還認真。",
    "neighbor-chen": "陳太太不懂電競，只覺得你整天在打電動。",
    biaojie: "表姊擔心你的眼睛，順便問比賽獎金多不多。",
    dabo: "大伯說打電動不算工作，你懶得跟他吵。",
    guzhang: "姑丈以為你很會修電腦，一直拿手機來問你。",
    sanjiuma: "三舅媽問比賽獎金跟表哥的年薪比比看。",
    ama: "阿嬤不懂比賽規則，但每次都會幫你加油。",
    sangu: "三姑問休學值不值得，你的回答讓她笑了。",
  },
  strengths: ["對小表弟神回覆傷害 +40%（同溫層碾壓）"],
  weaknesses: ["被問學歷乖乖回答更痛 +50%（休學是心裡的坎）"],
  modifiers: {
    topic: {
      education: { meek: { taken: 1.5 } },
    },
    boss: {
      "xiao-biaodi": { perfect: { dealt: 1.4 } },
    },
    extraSpecials: { skip: 1 },
  },
  icon: "Gamepad2",
} satisfies Life;
