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
    intro: "幹，你就是那個廢物表哥／表姊喔？",
    defeated: "幹，你很兇耶，我不玩了啦。",
    victory: "笑死，媽媽——他被我電到不敢講話——",
  },
} satisfies Boss;
