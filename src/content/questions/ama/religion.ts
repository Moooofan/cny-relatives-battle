import type { Question } from "@/content/types";

export default [
  {
    id: "ama-religion-001",
    text: "等一下跟阿嬤去拜拜，跟神明說你今年要順利一點。",
    topic: "religion",
    bossId: "ama",
    options: [
      {
        id: "ama-religion-001-a",
        text: "好，我還要跟神明說阿嬤要健康到一百二，這個比較重要。",
        archetype: "perfect",
        retort: "哎唷，你這孩子，阿嬤眼睛都要溼了。",
      },
      {
        id: "ama-religion-001-b",
        text: "好啊，阿嬤你先幫我跟神明講一下，祂比較聽你的。",
        archetype: "deflect",
        retort: "你喔，什麼都要阿嬤出面。",
      },
      {
        id: "ama-religion-001-c",
        text: "阿嬤你拜拜的時候順便求個好天氣，我們拍照才好看。",
        archetype: "deflect",
        retort: "拜拜是求平安，不是求天氣啦。",
      },
      {
        id: "ama-religion-001-d",
        text: "我等一下約了朋友耶……",
        archetype: "meek",
        retort: "朋友比神明重要喔？",
      },
      {
        id: "ama-religion-001-e",
        text: "我不太會拜拜，怕拿香拿錯邊……",
        archetype: "meek",
        retort: "跟著阿嬤拜就好，緊張什麼？",
      },
      {
        id: "ama-religion-001-f",
        text: "拜拜這麼靈，我要許願中樂透就好。",
        archetype: "backfire",
        retort: "（阿嬤白眼，繼續唸經）",
      },
      {
        id: "ama-religion-001-g",
        text: "神明應該也想放假，我們晚點再拜。",
        archetype: "backfire",
        retort: "（阿嬤沒理你，逕自點香去了）",
      },
      {
        id: "ama-religion-001-h",
        text: "拜拜又沒用，去年也拜了還不是一樣。",
        archetype: "landmine",
        retort: "你這樣講，神明會聽到的！",
      },
    ],
  },
] satisfies Question[];
