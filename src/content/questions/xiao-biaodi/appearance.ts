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
        text: "幹，姑姑的嘴比我的臉還圓，先顧好。",
        archetype: "perfect",
        retort: "……姑姑臉一黑轉頭裝沒事",
      },
      {
        id: "xiao-biaodi-appearance-001-b",
        text: "靠，包子好吃啊，要不要咬一口？",
        archetype: "deflect",
        retort: "不要啦哈哈哈哈！",
      },
      {
        id: "xiao-biaodi-appearance-001-c",
        text: "笑死，姑姑最近是不是也豐腴了？一起減肥。",
        archetype: "deflect",
        retort: "臭小子，竟敢說姑姑！",
      },
      {
        id: "xiao-biaodi-appearance-001-d",
        text: "有一點啦，幹……最近沒運動……",
        archetype: "meek",
        retort: "姑姑！他自己承認了！",
      },
      {
        id: "xiao-biaodi-appearance-001-e",
        text: "靠……最近吃比較多年菜，可能真的胖了……",
        archetype: "meek",
        retort: "胖了就要少吃一點啊！",
      },
      {
        id: "xiao-biaodi-appearance-001-f",
        text: "他媽的，這是幸福肥，你們沒聽過嗎。",
        archetype: "backfire",
        retort: "……（小表弟歪頭沒聽懂）",
      },
      {
        id: "xiao-biaodi-appearance-001-g",
        text: "機掰，這叫澎湃感，懂流行嗎你。",
        archetype: "backfire",
        retort: "（小表弟已經跑去搶糖果了）",
      },
      {
        id: "xiao-biaodi-appearance-001-h",
        text: "去你的，先把成績單拿出來，再說我的臉。",
        archetype: "landmine",
        retort: "嗚——姑姑瞪你，罵你三小",
      },
    ],
  },
] satisfies Question[];
