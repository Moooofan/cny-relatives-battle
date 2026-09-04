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
    intro: "表哥業績超好，你呢？幹，講一下嘛。",
    defeated: "幹，你這張嘴跟你媽一樣賤，厲害。",
    victory: "去你的，慢慢來啦，表哥當年也是……才怪。",
  },
} satisfies Boss;
