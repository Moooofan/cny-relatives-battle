import type { Life } from "@/content/types";

export default {
  id: "life-04",
  code: "L04",
  slug: "civil-servant-eldest",
  name: "鐵飯碗長女",
  tagline: "捧鐵飯碗，扛全家期待",
  background: [
    "考了三年才上岸，現在是家裡最穩的收入。",
    "身為長女，弟妹的學費常常是你在張羅。",
    "結婚三年還沒生，餐桌上永遠被算日子。",
  ],
  relations: {
    "xiao-biaodi": "他覺得公務員很閒，天天問你幾點下班。",
    "neighbor-chen": "陳太太說鐵飯碗最好，適合當媳婦人選。",
    biaojie: "表姊生兩個了，聊天話題永遠繞回小孩。",
    dabo: "大伯說公務員最穩，難得誇你一句。",
    guzhang: "姑丈覺得你端鐵飯碗，該多喝點養生湯。",
    sanjiuma: "三舅媽拿你跟表哥比穩定度，你完勝。",
    ama: "阿嬤最放心你，但也最想抱曾孫。",
    sangu: "三姑問生小孩的事，一年比一年直接。",
  },
  strengths: ["對大伯神回覆傷害 +40%（鐵飯碗說服力max）"],
  weaknesses: ["被問生小孩乖乖回答更痛 +40%"],
  modifiers: {
    topic: {
      kids: { meek: { taken: 1.4 } },
    },
    boss: {
      dabo: { perfect: { dealt: 1.4 } },
    },
  },
  icon: "Landmark",
} satisfies Life;
