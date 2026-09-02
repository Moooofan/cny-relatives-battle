import type { Boss } from "@/content/types";

export default {
  id: "guzhang",
  name: "姑丈",
  title: "長輩圖清晨快遞員",
  description: "早上五點傳長輩圖，堅信薑黃治百病。",
  tier: "hard",
  topics: ["elder_health", "food_push", "politics"],
  order: 5,
  emoji: "🧓",
  lines: {
    intro: "你有沒有看我傳的那篇？那個真的有效，我朋友的朋友試過。",
    defeated: "好，你講的那個我回去查一下……用哪個 app 查？",
    victory: "不聽老人言，來，這杯喝掉，再跟你講一次。",
  },
} satisfies Boss;
