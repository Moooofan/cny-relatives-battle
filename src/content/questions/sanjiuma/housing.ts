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
        text: "對啊，我房東說我是他最孝順的孩子。",
        archetype: "perfect",
        retort: "……你這樣講我都不知道要怎麼接。",
      },
      {
        id: "sanjiuma-housing-001-b",
        text: "舅媽這麼關心，是不是有便宜的房子要介紹？我認真的。",
        archetype: "deflect",
        retort: "我哪有啊……現在房子貴得要死。",
      },
      {
        id: "sanjiuma-housing-001-c",
        text: "舅媽消息這麼靈通，要不要跟我一起看房？",
        archetype: "deflect",
        retort: "看房喔？那要問你舅舅啦。",
      },
      {
        id: "sanjiuma-housing-001-d",
        text: "有在看啦，但頭期款還差很多……",
        archetype: "meek",
        retort: "差多少？你爸媽沒有要幫忙嗎？",
      },
      {
        id: "sanjiuma-housing-001-e",
        text: "薪水存不了多少，房價又一直漲……",
        archetype: "meek",
        retort: "那你要不要考慮先跟家裡借？",
      },
      {
        id: "sanjiuma-housing-001-f",
        text: "沒關係，我把房子種在心裡就好了。",
        archetype: "backfire",
        retort: "……（舅媽轉頭跟阿姨聊別的了）",
      },
      {
        id: "sanjiuma-housing-001-g",
        text: "沒房沒關係，我心中自有一片豪宅。",
        archetype: "backfire",
        retort: "……（沒人笑，表哥假裝滑手機）",
      },
      {
        id: "sanjiuma-housing-001-h",
        text: "舅媽你那間是三十年前兩百萬買的吧，換你現在買買看。",
        archetype: "landmine",
        retort: "我們那時候多辛苦你知道嗎！",
      },
    ],
  },
] satisfies Question[];
