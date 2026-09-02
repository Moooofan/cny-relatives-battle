import type { Life } from "@/content/types";

export default {
  id: "life-07",
  code: "L07",
  slug: "dropout-phd",
  name: "休學博士生",
  tagline: "論文卡關，人生也卡關",
  background: [
    "阿公阿嬤帶大，爸媽長年在外地打拼。",
    "念到博士班第五年，論文寫不出來休學了。",
    "留在老家，白天打工，晚上還是想著論文。",
  ],
  relations: {
    "xiao-biaodi": "他問你為什麼念這麼久還沒畢業。",
    "neighbor-chen": "陳太太逢人就說你在讀「很厲害的書」。",
    biaojie: "表姊說你想太多，其實只是還沒想通。",
    dabo: "大伯說書讀那麼多有什麼用，你懶得反駁。",
    guzhang: "姑丈覺得你太聰明，該去發明什麼賺錢。",
    sanjiuma: "三舅媽問你休學是不是要轉行去考公職。",
    ama: "阿嬤不懂博士班，只覺得你太瘦太累。",
    sangu: "三姑說沒關係，人生本來就不是一條線。",
  },
  strengths: ["對阿嬤神回覆傷害 +30%（阿公阿嬤帶大的默契）"],
  weaknesses: ["被問學歷乖乖回答更痛 +50%（休學是心裡的洞）"],
  modifiers: {
    topic: {
      education: { meek: { taken: 1.5 } },
    },
    boss: {
      ama: { perfect: { dealt: 1.3 } },
    },
  },
  icon: "GraduationCap",
} satisfies Life;
