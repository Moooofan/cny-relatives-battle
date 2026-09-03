import type { Question } from "@/content/types";

export default [
  {
    id: "xiao-biaodi-comparison-001",
    text: "媽媽說你三十歲了還沒有對象，是不是沒人要？",
    topic: "comparison",
    bossId: "xiao-biaodi",
    options: [
      {
        id: "xiao-biaodi-comparison-001-a",
        text: "這問題該問媽媽，她結婚時幾歲？",
        archetype: "perfect",
        retort: "……媽媽尷尬笑了兩聲",
      },
      {
        id: "xiao-biaodi-comparison-001-b",
        text: "那你媽媽有沒有說，你上次月考數學幾分？",
        archetype: "deflect",
        retort: "……我不記得了。",
      },
      {
        id: "xiao-biaodi-comparison-001-c",
        text: "你先跟我說你們班誰跟誰在一起，我再回答你。",
        archetype: "deflect",
        retort: "才不要，這是秘密！",
      },
      {
        id: "xiao-biaodi-comparison-001-d",
        text: "還沒有啦，有的話再跟你說。",
        archetype: "meek",
        retort: "那媽媽說的是真的耶！（跑走）",
      },
      {
        id: "xiao-biaodi-comparison-001-e",
        text: "可能還沒遇到適合的人吧……",
        archetype: "meek",
        retort: "適合的人？那什麼時候才會有？",
      },
      {
        id: "xiao-biaodi-comparison-001-f",
        text: "哥哥是稀有動物，物以稀為貴懂嗎。",
        archetype: "backfire",
        retort: "……（小表弟一臉問號）",
      },
      {
        id: "xiao-biaodi-comparison-001-g",
        text: "哥哥是走高冷路線，你不懂啦。",
        archetype: "backfire",
        retort: "（小表弟已經跑去玩手機了）",
      },
      {
        id: "xiao-biaodi-comparison-001-h",
        text: "小孩子不要學大人亂講話，先寫作業。",
        archetype: "landmine",
        retort: "嗚——媽媽他兇我——",
      },
    ],
  },
] satisfies Question[];
