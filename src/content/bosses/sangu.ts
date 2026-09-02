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
    intro: "聽說今天大家都被你嗆回去？來，三姑陪你聊聊。",
    defeated: "……好，你贏了。明年換你坐我這個位子。",
    victory: "乖，來，紅包拿去。明年三姑再問你一次。",
  },
} satisfies Boss;
