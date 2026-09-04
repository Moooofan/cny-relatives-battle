import type { Boss } from "@/content/types";

export default {
  id: "neighbor-chen",
  name: "陳太太",
  title: "行走人生百科",
  description: "不是親戚卻比親戚更了解你，人生百科在她嘴裡。",
  tier: "easy",
  topics: ["salary_job", "marriage", "comparison"],
  order: 2,
  emoji: "👩‍🦱",
  lines: {
    intro: "哎唷，幹，回來啦？糗事我都聽說了！",
    defeated: "好啦好啦，幹，你這張嘴真的賤。",
    victory: "靠北，我就說吧，你跟你媽一個樣！",
  },
} satisfies Boss;
