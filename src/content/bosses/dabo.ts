import type { Boss } from "@/content/types";

export default {
  id: "dabo",
  name: "大伯",
  title: "政論台常駐觀眾",
  description: "電視轉政論台的男人，覺得年輕人書都白讀。",
  tier: "normal",
  topics: ["politics", "education", "salary_job"],
  order: 4,
  emoji: "👨‍🦳",
  lines: {
    intro: "你們年輕人喔，讀那麼多書，出社會還不是……來，坐。",
    defeated: "……嗯，有點道理。轉台轉台，看春晚。",
    victory: "我就說，書讀那麼多，講話還是沒重點。",
  },
} satisfies Boss;
