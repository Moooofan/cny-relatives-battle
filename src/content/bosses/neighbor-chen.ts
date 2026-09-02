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
    intro: "哎唷回來啦！我上禮拜才跟你媽聊到你的事喔～",
    defeated: "好啦好啦，你們年輕人有自己的想法，我去隔壁看看。",
    victory: "我就說嘛，這孩子跟他媽講的一模一樣。",
  },
} satisfies Boss;
