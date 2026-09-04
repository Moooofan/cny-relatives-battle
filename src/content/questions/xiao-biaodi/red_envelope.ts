import type { Question } from "@/content/types";

export default [
  {
    id: "xiao-biaodi-red_envelope-001",
    text: "你紅包包多少？表姊包我一千二耶。",
    topic: "red_envelope",
    bossId: "xiao-biaodi",
    options: [
      {
        id: "xiao-biaodi-red_envelope-001-a",
        text: "靠北，表姊結婚才包多少啊？",
        archetype: "perfect",
        retort: "……媽媽假裝滑手機，嘴角抽一下",
      },
      {
        id: "xiao-biaodi-red_envelope-001-b",
        text: "笑死，Happy New Year 會拼嗎？",
        archetype: "deflect",
        retort: "Happy New Year！我才不會輸咧！",
      },
      {
        id: "xiao-biaodi-red_envelope-001-c",
        text: "紅包不重要啦，拜年才有誠意。",
        archetype: "deflect",
        retort: "少來，你就是想要更多啦。",
      },
      {
        id: "xiao-biaodi-red_envelope-001-d",
        text: "呃……靠，六百啦，別講出來……",
        archetype: "meek",
        retort: "六百！！表姊——他只包六百——",
      },
      {
        id: "xiao-biaodi-red_envelope-001-e",
        text: "紅包袋還沒拆，不知道多少……",
        archetype: "meek",
        retort: "還沒拆？那我幫你拆啦！",
      },
      {
        id: "xiao-biaodi-red_envelope-001-f",
        text: "小朋友，錢不是萬能的，機掰。",
        archetype: "backfire",
        retort: "可是媽媽說沒錢萬萬不能。（大人點頭）",
      },
      {
        id: "xiao-biaodi-red_envelope-001-g",
        text: "紅包是心意，幹嘛計較金額啦。",
        archetype: "backfire",
        retort: "（表姊聽到，明年包更少了）",
      },
      {
        id: "xiao-biaodi-red_envelope-001-h",
        text: "幹你娘，小屁孩問錢很沒禮貌。",
        archetype: "landmine",
        retort: "媽媽衝過來罵：你他媽的兇什麼小孩！",
      },
    ],
  },
] satisfies Question[];
