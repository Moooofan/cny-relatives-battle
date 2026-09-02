import type { Life } from "@/content/types";

export default {
  id: "life-28",
  code: "L28",
  slug: "accountant-eldest",
  name: "會計師大女兒",
  tagline: "剛升專案經理，數字比誰都算得清",
  background: [
    "身為長女，家裡的紅包錢分配常常你在算。",
    "在會計師事務所剛升專案經理，帳目零誤差。",
    "北漂租屋，年終獎金比表哥少但存款比他多。",
  ],
  relations: {
    "xiao-biaodi": "他很好奇會計師是不是每天都在數鈔票。",
    "neighbor-chen": "陳太太逢人就說你很會理財，一直問你意見。",
    biaojie: "表姊常請你幫她算孩子的教育基金該存多少。",
    dabo: "大伯說做帳的最懂政府怎麼花錢，找你聊稅。",
    guzhang: "姑丈問你的保健食品能不能報稅扣抵。",
    sanjiuma: "三舅媽拿你的獎金跟表哥的比，你算得清清楚楚。",
    ama: "阿嬤把私房錢都交給你管，說最放心你。",
    sangu: "三姑問紅包包多少才不失禮，你算得比誰都精。",
  },
  strengths: ["對三舅媽神回覆傷害 +50%（數字碾壓）"],
  weaknesses: ["紅包題乖乖回答更痛 +30%（長女要扛開銷的壓力）"],
  modifiers: {
    topic: {
      red_envelope: { meek: { taken: 1.3 } },
    },
    boss: {
      sanjiuma: { perfect: { dealt: 1.5 } },
    },
  },
  icon: "Calculator",
} satisfies Life;
