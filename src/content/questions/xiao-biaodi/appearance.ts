import type { Question } from "@/content/types";

export default [
  {
    id: "xiao-biaodi-appearance-001",
    text: "你是不是變胖了？姑姑說你的臉圓圓的像包子。",
    topic: "appearance",
    bossId: "xiao-biaodi",
    options: [
      {
        id: "xiao-biaodi-appearance-001-a",
        text: "姑姑的嘴比我的臉還圓，先顧好。",
        archetype: "perfect",
        retort: "……姑姑轉頭裝沒事",
      },
      {
        id: "xiao-biaodi-appearance-001-b",
        text: "包子好吃啊，要不要咬一口？（作勢咬他）",
        archetype: "deflect",
        retort: "不要啦哈哈哈哈！",
      },
      {
        id: "xiao-biaodi-appearance-001-c",
        text: "姑姑最近是不是也豐腴了一點？我們一起減肥。",
        archetype: "deflect",
        retort: "臭小子，竟敢說姑姑！",
      },
      {
        id: "xiao-biaodi-appearance-001-d",
        text: "有一點啦，最近沒運動……",
        archetype: "meek",
        retort: "姑姑！他自己承認了！",
      },
      {
        id: "xiao-biaodi-appearance-001-e",
        text: "最近吃比較多年菜，可能真的胖了……",
        archetype: "meek",
        retort: "胖了就要少吃一點啊！",
      },
      {
        id: "xiao-biaodi-appearance-001-f",
        text: "這是幸福肥，你們沒聽過嗎。",
        archetype: "backfire",
        retort: "……（小表弟歪頭沒聽懂）",
      },
      {
        id: "xiao-biaodi-appearance-001-g",
        text: "這叫做澎湃感，懂流行嗎你。",
        archetype: "backfire",
        retort: "（小表弟已經跑去搶糖果了）",
      },
      {
        id: "xiao-biaodi-appearance-001-h",
        text: "先把成績單拿出來，再說我的臉。",
        archetype: "landmine",
        retort: "嗚——姑姑瞪你一眼",
      },
    ],
  },
] satisfies Question[];
