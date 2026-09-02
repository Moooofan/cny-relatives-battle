import type { Boss } from "@/content/types";

export default {
  id: "biaojie",
  name: "表姊",
  title: "溫柔凡爾賽大師",
  description: "人生勝利組，已婚兩寶，每句都是溫柔的凡爾賽。",
  tier: "normal",
  topics: ["kids", "housing", "comparison"],
  order: 3,
  modifiers: {
    dealtMultiplier: { perfect: 0.8, deflect: 1.5 },
  },
  emoji: "🤱",
  lines: {
    intro: "好久不見～我們家老二會叫人了，你呢？最近怎樣？",
    defeated: "講不過你耶，來，抱一下小的，他很喜歡你。",
    victory: "沒關係啦，每個人的時區不一樣（笑）。",
  },
} satisfies Boss;
