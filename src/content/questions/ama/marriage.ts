import type { Question } from "@/content/types";

export default [
  {
    id: "ama-marriage-001",
    text: "什麼時候帶一個回來給阿嬤看？阿嬤等很久了。",
    topic: "marriage",
    bossId: "ama",
    options: [
      {
        id: "ama-marriage-001-a",
        text: "幹，三姑的眼光哪有阿嬤準，先看我就好。",
        archetype: "perfect",
        retort: "帥啦帥啦，就是嘴巴甜死人。",
      },
      {
        id: "ama-marriage-001-b",
        text: "靠，有對象一定先跟阿嬤講，但要幫我保密。",
        archetype: "deflect",
        retort: "好好好，阿嬤嘴巴最緊了。",
      },
      {
        id: "ama-marriage-001-c",
        text: "哭爸，阿嬤你先保重身體，對象我自己會找。",
        archetype: "deflect",
        retort: "臭小子，還會反過來說阿嬤。",
      },
      {
        id: "ama-marriage-001-d",
        text: "幹……還沒有對象啦，工作太忙了……",
        archetype: "meek",
        retort: "忙忙忙，忙到最後剩一個人怎麼辦？",
      },
      {
        id: "ama-marriage-001-e",
        text: "唉，最近都在忙工作，感情的事還沒想……",
        archetype: "meek",
        retort: "不想怎麼行？阿嬤等不了太久了。",
      },
      {
        id: "ama-marriage-001-f",
        text: "幹，阿嬤放心，我已經跟自由戀愛了啦。",
        archetype: "backfire",
        retort: "……（阿嬤聽不懂，繼續夾菜）",
      },
      {
        id: "ama-marriage-001-g",
        text: "他媽的，阿嬤別急，緣分要交給月老加班。",
        archetype: "backfire",
        retort: "（阿嬤沒接話，轉頭問你要不要喝湯）",
      },
      {
        id: "ama-marriage-001-h",
        text: "幹，你很煩耶，老太婆別學三姑一直逼婚。",
        archetype: "landmine",
        retort: "……好，阿嬤不問了。",
      },
    ],
  },
] satisfies Question[];
