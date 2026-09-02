import type { Life } from "@/content/types";

export default {
  id: "life-08",
  code: "L08",
  slug: "family-restaurant-chef",
  name: "廚房二代",
  tagline: "剛升主廚，家傳的鍋鏟接下了",
  background: [
    "家裡開餐廳三十年，你從小在後場長大。",
    "上個月剛升主廚，招牌菜終於換你掌廚。",
    "留在家鄉顧店，過年反而是最忙的班表。",
  ],
  relations: {
    "xiao-biaodi": "他最愛跟你要「主廚特製」的糖醋排骨。",
    "neighbor-chen": "陳太太逢人就推薦你們家的菜，超好用。",
    biaojie: "表姊訂位總是最大桌，你都幫她留位子。",
    dabo: "大伯每次都嫌鹹，但每次都吃到見底。",
    guzhang: "姑丈的養生偏方常跟你的食譜正面衝突。",
    sanjiuma: "三舅媽問開餐廳賺得比表哥的公司多嗎。",
    ama: "阿嬤最愛你煮的菜，說比外面餐廳好吃。",
    sangu: "三姑說手藝是本事，比嘴巴甜還實在。",
  },
  strengths: ["對阿嬤/餐桌題神回覆傷害 +50%（手藝說話）"],
  weaknesses: ["對姑丈踩雷傷害 +30%（偏方戳到專業自尊）"],
  modifiers: {
    topic: {
      food_push: { perfect: { dealt: 1.5 } },
    },
    boss: {
      guzhang: { landmine: { taken: 1.3 } },
    },
  },
  icon: "ChefHat",
} satisfies Life;
