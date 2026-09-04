import type { Question } from "@/content/types";

export default [
  {
    id: "sanjiuma-housing-001",
    text: "都幾歲了還在租房子喔？租金都在幫房東繳房貸耶。",
    topic: "housing",
    bossId: "sanjiuma",
    options: [
      {
        id: "sanjiuma-housing-001-a",
        text: "幹，至少沒有一間房還管我三十年。",
        archetype: "perfect",
        retort: "他媽的沒大沒小，欠罵是不是。",
      },
      {
        id: "sanjiuma-housing-001-b",
        text: "笑死，舅媽是不是有便宜房要介紹？",
        archetype: "deflect",
        retort: "我哪有啊，房子貴到爆炸。",
      },
      {
        id: "sanjiuma-housing-001-c",
        text: "靠，舅媽消息真靈通，一起看房？",
        archetype: "deflect",
        retort: "看房喔？問你舅舅去啦。",
      },
      {
        id: "sanjiuma-housing-001-d",
        text: "幹……有在看啦，頭期款還差很多……",
        archetype: "meek",
        retort: "差多少？你爸媽要幫忙嗎？",
      },
      {
        id: "sanjiuma-housing-001-e",
        text: "薪水存不了多少，房價又直漲……",
        archetype: "meek",
        retort: "那要不要考慮先跟家裡借？",
      },
      {
        id: "sanjiuma-housing-001-f",
        text: "幹，沒關係，房子我種在心裡。",
        archetype: "backfire",
        retort: "……（全桌安靜，沒人想理你）",
      },
      {
        id: "sanjiuma-housing-001-g",
        text: "他媽的，沒房但心中有豪宅。",
        archetype: "backfire",
        retort: "……（沒人笑，表哥低頭滑手機）",
      },
      {
        id: "sanjiuma-housing-001-h",
        text: "幹，妳這老東西的房，現在買得起？",
        archetype: "landmine",
        retort: "妳他媽的講什麼態度！滾！",
      },
    ],
  },
] satisfies Question[];
