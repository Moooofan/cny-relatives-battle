import type { Boss } from "@/content/types";

export default {
  id: "sangu",
  name: "三姑",
  title: "三姑六婆總教頭",
  description: "三姑六婆總教頭，所有題型精通，笑著把你問到懷疑人生。",
  tier: "final",
  topics: ["marriage", "salary_job", "housing", "kids", "comparison"],
  order: 8,
  modifiers: {
    summonAtHalf: true,
    reuseMeekQuestions: true,
  },
  emoji: "💃",
  lines: {
    intro: "幹，聽說大家都被你嗆爆？來聊聊。",
    defeated: "……幹，你贏了，明年換你坐這位子。",
    victory: "乖，紅包拿去，他媽的明年再問你。",
  },
} satisfies Boss;
