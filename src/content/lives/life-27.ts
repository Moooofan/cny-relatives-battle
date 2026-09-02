import type { Life } from "@/content/types";

export default {
  id: "life-27",
  code: "L27",
  slug: "cafe-owner",
  name: "咖啡店老闆",
  tagline: "頂讓店面貸款下去，夢想現在在還債",
  background: [
    "家裡開早餐店，你把老鋪頂讓改成了咖啡店。",
    "去年貸款裝潢開店，現在每月都在算損益。",
    "留在家鄉開店，過年期間反而生意最好。",
  ],
  relations: {
    "xiao-biaodi": "他最愛喝你調的不加咖啡因的假奶茶。",
    "neighbor-chen": "陳太太逢人就推薦你的店，等於免費業配。",
    biaojie: "表姊訂了包場慶生，帳單還沒跟你算清。",
    dabo: "大伯說開咖啡店都是年輕人的浪漫幻想。",
    guzhang: "姑丈想在你店裡辦養生講座，順便賣產品。",
    sanjiuma: "三舅媽問開店賺得比表哥上班多嗎。",
    ama: "阿嬤最愛去你店裡坐，說有你在的地方最香。",
    sangu: "三姑問貸款還完了沒，笑著說要來投資你。",
  },
  strengths: ["對表姊四兩撥千斤傷害 +30%（顧客關係管理）"],
  weaknesses: ["被問買房乖乖回答更痛 +50%（貸款壓力寫在臉上）"],
  modifiers: {
    topic: {
      housing: { meek: { taken: 1.5 } },
    },
    boss: {
      biaojie: { deflect: { dealt: 1.3 } },
    },
  },
  icon: "Coffee",
} satisfies Life;
