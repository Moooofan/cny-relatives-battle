import type { Life } from "@/content/types";

export default {
  id: "life-12",
  code: "L12",
  slug: "realtor-uptown",
  name: "北漂房仲",
  tagline: "剛升組長，話術用在客戶也用在長輩",
  background: [
    "獨生子女，爸媽的房子還在付你名下的貸款。",
    "上個月升組長，業績壓力換成帶新人的壓力。",
    "北漂租屋，自己賣房卻買不起自己的房。",
  ],
  relations: {
    "xiao-biaodi": "他問你為什麼賣房子卻自己租房子住。",
    "neighbor-chen": "陳太太一直問你有沒有便宜的社區可以介紹。",
    biaojie: "表姊已經買房了，聊天總不忘提一句總價。",
    dabo: "大伯說房仲都嘴巴甜，叫你講重點。",
    guzhang: "姑丈傳的「抄底買房」文章你每篇都反駁過。",
    sanjiuma: "三舅媽問你經手過最貴的案子是多少錢。",
    ama: "阿嬤不懂房價，只希望你早點成家。",
    sangu: "三姑問你什麼時候才要幫自己買一間。",
  },
  strengths: ["房價題神回覆傷害 +50%（話術本業）"],
  weaknesses: ["被問感情乖乖回答更痛 +30%（業務腦轉不過來）"],
  modifiers: {
    topic: {
      housing: { perfect: { dealt: 1.5 } },
      marriage: { meek: { taken: 1.3 } },
    },
  },
  icon: "Home",
} satisfies Life;
