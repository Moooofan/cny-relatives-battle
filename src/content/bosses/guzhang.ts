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
    intro: "幹，我傳的養生文你到底看了沒？",
    defeated: "幹，算你狠，我回去查一下用哪個app。",
    victory: "他媽的，不聽老人言，這杯給我乾了。",
  },
} satisfies Boss;
