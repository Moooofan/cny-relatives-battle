import type { Life } from "@/content/types";

export default {
  id: "life-14",
  code: "L14",
  slug: "family-business-heir",
  name: "家業接班人",
  tagline: "剛升副總，位子是爸給的但活是真的",
  background: [
    "家裡做批發生意，從小在倉庫堆疊長大。",
    "剛升副總，帳本跟人情世故都得自己扛。",
    "留在家鄉工作，親戚都在等你證明自己。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你們家很有錢，一直討更大包紅包。",
    "neighbor-chen": "陳太太逢人就說你們家生意做得多大。",
    biaojie: "表姊生了兩個，聊天總會提要不要投資他家。",
    dabo: "大伯覺得含金湯匙出生的，不懂民間疾苦。",
    guzhang: "姑丈想介紹養生產品進你們家通路賣。",
    sanjiuma: "三舅媽拿你的公司規模跟表哥的比，你完勝。",
    ama: "阿嬤最擔心你太累，生意再大也要顧身體。",
    sangu: "三姑問接班順不順，順便打聽公司股份分配。",
  },
  strengths: ["對三舅媽神回覆傷害 +40%（規模說話）"],
  weaknesses: ["對大伯踩雷傷害 +40%（被說不懂民間疾苦）"],
  modifiers: {
    boss: {
      sanjiuma: { perfect: { dealt: 1.4 } },
      dabo: { landmine: { taken: 1.4 } },
    },
  },
  icon: "Building2",
} satisfies Life;
