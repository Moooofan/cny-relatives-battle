import type { Boss } from "@/content/types";

export default {
  id: "xiao-biaodi",
  name: "小表弟",
  title: "音量兩倍複讀機",
  description: "大人講什麼他就複誦，音量兩倍。",
  tier: "easy",
  topics: ["comparison", "red_envelope", "appearance"],
  order: 1,
  modifiers: {
    takenMultiplier: { landmine: 2 },
  },
  emoji: "🧒",
  lines: {
    intro: "你就是那個媽媽說『三十歲了還怎樣怎樣』的表哥／表姊嗎？",
    defeated: "我要去玩 Switch 了，你們大人好無聊。",
    victory: "媽媽——他被我問到不講話了——",
  },
} satisfies Boss;
