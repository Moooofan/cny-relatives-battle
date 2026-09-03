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
        text: "先讓表姊解釋，她結婚沒包更多。",
        archetype: "perfect",
        retort: "……媽媽假裝滑手機",
      },
      {
        id: "xiao-biaodi-red_envelope-001-b",
        text: "考你英文，Happy New Year 怎麼說？",
        archetype: "deflect",
        retort: "Happy New Year！我早就會了！",
      },
      {
        id: "xiao-biaodi-red_envelope-001-c",
        text: "紅包不重要，重點是要跟長輩拜年才有誠意喔。",
        archetype: "deflect",
        retort: "少來，你就是想要更多。",
      },
      {
        id: "xiao-biaodi-red_envelope-001-d",
        text: "呃……六百……",
        archetype: "meek",
        retort: "六百！！表姊——他只包六百——",
      },
      {
        id: "xiao-biaodi-red_envelope-001-e",
        text: "我不知道耶，紅包袋還沒拆……",
        archetype: "meek",
        retort: "還沒拆？那我幫你拆！",
      },
      {
        id: "xiao-biaodi-red_envelope-001-f",
        text: "小朋友，錢不是萬能的喔～",
        archetype: "backfire",
        retort: "可是媽媽說沒錢萬萬不能。（大人點頭）",
      },
      {
        id: "xiao-biaodi-red_envelope-001-g",
        text: "紅包是心意，金額不重要啦哈哈。",
        archetype: "backfire",
        retort: "（表姊聽到，包更少了）",
      },
      {
        id: "xiao-biaodi-red_envelope-001-h",
        text: "小孩子一直問錢，先把成績單拿出來。",
        archetype: "landmine",
        retort: "媽媽狠狠瞪了你一眼",
      },
    ],
  },
] satisfies Question[];
