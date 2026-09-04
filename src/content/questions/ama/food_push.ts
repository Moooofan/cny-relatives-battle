import type { Question } from "@/content/types";

export default [
  {
    id: "ama-food_push-001",
    text: "來，這塊雞腿給你。怎麼吃這麼少？在外面是不是都沒吃飯？",
    topic: "food_push",
    bossId: "ama",
    options: [
      {
        id: "ama-food_push-001-a",
        text: "幹，三姑夾的我才不吃，阿嬤妳夾的我全吞。",
        archetype: "perfect",
        retort: "哎唷，就你嘴甜，再吃一塊！",
      },
      {
        id: "ama-food_push-001-b",
        text: "靠，我先喝湯，湯先喝才不會胖啦。",
        archetype: "deflect",
        retort: "對啦對啦，湯要先喝。",
      },
      {
        id: "ama-food_push-001-c",
        text: "笑死，阿嬤煮的菜太好吃，我留肚子裝招牌菜。",
        archetype: "deflect",
        retort: "招牌菜？那再給你裝一碗！",
      },
      {
        id: "ama-food_push-001-d",
        text: "幹……我在減肥，晚上不吃澱粉……",
        archetype: "meek",
        retort: "減什麼肥！你已經瘦到剩骨頭了！",
      },
      {
        id: "ama-food_push-001-e",
        text: "唉，中午吃太飽，現在真的吃不下……",
        archetype: "meek",
        retort: "吃不下也要吃一點，不然會餓！",
      },
      {
        id: "ama-food_push-001-f",
        text: "幹，阿嬤妳這樣是想把我養肥了賣掉嗎哈哈。",
        archetype: "backfire",
        retort: "（阿嬤沒聽懂，繼續夾）",
      },
      {
        id: "ama-food_push-001-g",
        text: "他媽的，阿嬤，我這是為了維持男神身材。",
        archetype: "backfire",
        retort: "（阿嬤皺眉，還是夾了一塊）",
      },
      {
        id: "ama-food_push-001-h",
        text: "幹，妳很煩耶，老太婆不要一直夾。",
        archetype: "landmine",
        retort: "……好，阿嬤知道了。（放下筷子）",
      },
    ],
  },
] satisfies Question[];
