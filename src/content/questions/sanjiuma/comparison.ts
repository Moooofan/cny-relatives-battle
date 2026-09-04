import type { Question } from "@/content/types";

export default [
  {
    id: "sanjiuma-comparison-001",
    text: "你表哥今年升經理了，你呢？還在那間小公司？",
    topic: "comparison",
    bossId: "sanjiuma",
    options: [
      {
        id: "sanjiuma-comparison-001-a",
        text: "機掰，升經理是他升的，關我小公司什麼事？",
        archetype: "perfect",
        retort: "你他媽的講話這麼衝，欠罵是不是！",
      },
      {
        id: "sanjiuma-comparison-001-b",
        text: "靠，表哥升官，舅媽要不要包紅包公告一下？",
        archetype: "deflect",
        retort: "紅包？你自己也可以包啊。",
      },
      {
        id: "sanjiuma-comparison-001-c",
        text: "笑死，小公司好啊，人少事少離家近。",
        archetype: "deflect",
        retort: "近是近，但沒前途啦。",
      },
      {
        id: "sanjiuma-comparison-001-d",
        text: "幹……我們公司真的升遷很慢……",
        archetype: "meek",
        retort: "慢就要想辦法啊，年輕人要有企圖心。",
      },
      {
        id: "sanjiuma-comparison-001-e",
        text: "靠……我還在基層，慢慢熬吧……",
        archetype: "meek",
        retort: "熬到什麼時候？你要有目標。",
      },
      {
        id: "sanjiuma-comparison-001-f",
        text: "幹，我走的是低調路線，深藏不露。",
        archetype: "backfire",
        retort: "……（舅媽轉頭滑手機）",
      },
      {
        id: "sanjiuma-comparison-001-g",
        text: "他媽的，頭銜不重要，我心中早就是經理了。",
        archetype: "backfire",
        retort: "……（表哥在旁邊尷尬地笑）",
      },
      {
        id: "sanjiuma-comparison-001-h",
        text: "去你的，升經理是不是舅舅打通關係，老東西？",
        archetype: "landmine",
        retort: "你他媽的血口噴人，滾出去！",
      },
    ],
  },
] satisfies Question[];
