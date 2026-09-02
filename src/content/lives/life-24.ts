import type { Life } from "@/content/types";

export default {
  id: "life-24",
  code: "L24",
  slug: "convenience-store-manager",
  name: "超商店長",
  tagline: "剛升店長，奧客訓練出神回覆體質",
  background: [
    "家裡開雜貨店起家，你從小顧店顧到大。",
    "上個月升上店長，排班表比你的行事曆還滿。",
    "留在家鄉生活，過年期間店裡照樣二十四小時開。",
  ],
  relations: {
    "xiao-biaodi": "他最愛去你店裡拿過期特價的零食。",
    "neighbor-chen": "陳太太逢人就說你們店多好逛，超挺你。",
    biaojie: "表姊訂關東煮外送常常指定要你顧班那天。",
    dabo: "大伯說開店最累，難得對你露出同情表情。",
    guzhang: "姑丈每天早上五點都來買報紙順便聊兩句。",
    sanjiuma: "三舅媽問店長薪水，跟表哥的比穩定嗎。",
    ama: "阿嬤覺得你太少回來吃飯，怪店裡太忙了。",
    sangu: "三姑問你什麼時候要自己開一間店。",
  },
  strengths: ["對小表弟神回覆傷害 +30%（奧客訓練有素）"],
  weaknesses: ["對阿嬤踩雷傷害 +40%（輪班少陪她的愧疚）"],
  modifiers: {
    boss: {
      "xiao-biaodi": { perfect: { dealt: 1.3 } },
      ama: { landmine: { taken: 1.4 } },
    },
  },
  icon: "Store",
} satisfies Life;
