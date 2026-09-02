import type { Life } from "@/content/types";

export default {
  id: "life-23",
  code: "L23",
  slug: "logistics-driver",
  name: "物流司機",
  tagline: "剛離婚，全台跑透透送貨也送自己回家",
  background: [
    "獨生子女，開貨車全台跑透透送包裹維生。",
    "上個月剛離婚，這次回家有點不知道怎麼開口。",
    "留在家鄉生活，車上的導航比誰都熟這條路。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你的貨車很酷，吵著要坐副駕。",
    "neighbor-chen": "陳太太問你送貨會不會很危險很辛苦。",
    biaojie: "表姊小心翼翼不提婚姻，反而讓你更不自在。",
    dabo: "大伯跟你聊起哪條路又塞車，難得聊得順。",
    guzhang: "姑丈的網購包裹常常是你親自送到的。",
    sanjiuma: "三舅媽問跑物流一個月賺多少，比表哥少吧。",
    ama: "阿嬤只說沒關係，一個人也要照顧好自己。",
    sangu: "三姑直接問離婚原因，你只想轉頭看路況。",
  },
  strengths: ["比較題神回覆傷害 +30%（跑遍全台見多識廣）"],
  weaknesses: ["被問感情乖乖回答更痛 +50%（傷口還新）"],
  modifiers: {
    topic: {
      comparison: { perfect: { dealt: 1.3 } },
      marriage: { meek: { taken: 1.5 } },
    },
  },
  icon: "Truck",
} satisfies Life;
