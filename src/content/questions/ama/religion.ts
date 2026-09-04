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
        text: "幹，我還要拜託神明，把三姑的嘴封小聲點。",
        archetype: "perfect",
        retort: "哎唷，你這孩子，阿嬤眼睛都要溼了。",
      },
      {
        id: "ama-religion-001-b",
        text: "阿嬤你先幫我跟神明講，靠，祂比較聽妳的。",
        archetype: "deflect",
        retort: "你喔，什麼都要阿嬤出面。",
      },
      {
        id: "ama-religion-001-c",
        text: "拜拜順便求個好天氣，我們拍照好看。",
        archetype: "deflect",
        retort: "拜拜是求平安，不是求天氣啦。",
      },
      {
        id: "ama-religion-001-d",
        text: "我等一下約了朋友，幹，有點趕……",
        archetype: "meek",
        retort: "朋友比神明重要喔？",
      },
      {
        id: "ama-religion-001-e",
        text: "我不太會拜拜，靠，怕拿香拿錯邊……",
        archetype: "meek",
        retort: "跟著阿嬤拜就好，緊張什麼？",
      },
      {
        id: "ama-religion-001-f",
        text: "拜拜這麼靈，去你的我要許願中樂透。",
        archetype: "backfire",
        retort: "（阿嬤白眼，繼續唸經）",
      },
      {
        id: "ama-religion-001-g",
        text: "神明應該也想放假，機掰我們晚點再拜。",
        archetype: "backfire",
        retort: "（阿嬤沒理你，逕自點香去了）",
      },
      {
        id: "ama-religion-001-h",
        text: "機掰，很煩耶，拜拜有用早就中樂透！",
        archetype: "landmine",
        retort: "……（阿嬤安靜下來，收起供品）",
      },
    ],
  },
] satisfies Question[];
