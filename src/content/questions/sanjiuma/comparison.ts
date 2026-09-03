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
        text: "升經理有意義嗎？他不是說想離職？",
        archetype: "perfect",
        retort: "你！他才沒有！你亂講什麼！",
      },
      {
        id: "sanjiuma-comparison-001-b",
        text: "表哥太強了！舅媽你怎麼教的？改天教教我媽。",
        archetype: "deflect",
        retort: "哎唷，這個要天分啦～",
      },
      {
        id: "sanjiuma-comparison-001-c",
        text: "舅媽消息真靈通，表哥升官要不要包紅包給大家？",
        archetype: "deflect",
        retort: "紅包？你自己不會包喔。",
      },
      {
        id: "sanjiuma-comparison-001-d",
        text: "還沒啦，我們公司升遷比較慢……",
        archetype: "meek",
        retort: "慢就要想辦法啊，年輕人要有企圖心。",
      },
      {
        id: "sanjiuma-comparison-001-e",
        text: "公司比較小，升遷機會本來就少……",
        archetype: "meek",
        retort: "少就要更努力表現啊，知道嗎？",
      },
      {
        id: "sanjiuma-comparison-001-f",
        text: "我走的是低調路線，深藏不露那種。",
        archetype: "backfire",
        retort: "……（沒人接話，舅媽轉頭滑手機）",
      },
      {
        id: "sanjiuma-comparison-001-g",
        text: "頭銜不重要，我心中早就是經理了。",
        archetype: "backfire",
        retort: "……（表哥在旁邊尷尬地笑）",
      },
      {
        id: "sanjiuma-comparison-001-h",
        text: "升經理，還是舅舅公司自己人輪流？",
        archetype: "landmine",
        retort: "你說什麼！我跟你講他很爭氣！",
      },
    ],
  },
] satisfies Question[];
