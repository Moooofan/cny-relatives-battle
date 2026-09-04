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
        text: "幹，媽媽自己幾歲結婚，敢問？",
        archetype: "perfect",
        retort: "……媽媽臉紅，低聲罵幹",
      },
      {
        id: "xiao-biaodi-comparison-001-b",
        text: "笑死，你數學小考考幾分啊？",
        archetype: "deflect",
        retort: "……才不要講，關你屁事啦。",
      },
      {
        id: "xiao-biaodi-comparison-001-c",
        text: "你們班誰跟誰在一起，先講來聽。",
        archetype: "deflect",
        retort: "才不要，這是秘密啦！",
      },
      {
        id: "xiao-biaodi-comparison-001-d",
        text: "還沒有啦……靠，話題正好而已……",
        archetype: "meek",
        retort: "沒人要喔？媽媽——他說沒人要——",
      },
      {
        id: "xiao-biaodi-comparison-001-e",
        text: "可能還沒遇到吧，緣分還沒到而已……",
        archetype: "meek",
        retort: "什麼時候才會有啦？",
      },
      {
        id: "xiao-biaodi-comparison-001-f",
        text: "哥哥是稀有物種，機掰的那種稀有。",
        archetype: "backfire",
        retort: "……（小表弟一臉問號）",
      },
      {
        id: "xiao-biaodi-comparison-001-g",
        text: "哥哥走高冷路線，你不懂啦幹嘛。",
        archetype: "backfire",
        retort: "（小表弟已經跑去玩手機了）",
      },
      {
        id: "xiao-biaodi-comparison-001-h",
        text: "幹，死小孩很吵，滾去寫作業。",
        archetype: "landmine",
        retort: "媽媽衝過來罵：你他媽的兇小孩！",
      },
    ],
  },
] satisfies Question[];
