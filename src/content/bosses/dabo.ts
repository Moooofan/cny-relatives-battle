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
    intro: "你們年輕人喔，幹，就是欠電視教訓。",
    defeated: "……幹，算你厲害，轉台，看春晚。",
    victory: "去你的，讀書讀那麼多還不是沒路用。",
  },
} satisfies Boss;
