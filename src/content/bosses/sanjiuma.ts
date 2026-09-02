import type { Boss } from "@/content/types";

export default {
  id: "sanjiuma",
  name: "三舅媽",
  title: "家族薪資資料庫管理員",
  description: "全家族薪資資料庫管理員，表哥是她的 KPI。",
  tier: "hard",
  topics: ["salary_job", "housing", "comparison"],
  order: 6,
  modifiers: {
    followUpOnMeek: true,
  },
  emoji: "👩‍💼",
  lines: {
    intro: "回來啦？表哥剛好在忙，他今年業績很好，你呢？",
    defeated: "你這孩子，嘴巴怎麼跟你媽年輕時一樣……厲害啦。",
    victory: "沒關係，慢慢來，表哥當年也是……算了，他沒有。",
  },
} satisfies Boss;
