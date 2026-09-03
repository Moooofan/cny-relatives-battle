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
        text: "阿嬤夾的我全吃，三姑夾的我拿去餵狗。",
        archetype: "perfect",
        retort: "哎唷，狗都嫌三姑，再吃一塊！",
      },
      {
        id: "ama-food_push-001-b",
        text: "有啦，我先喝湯，湯先喝才不會胖，阿嬤你教我的。",
        archetype: "deflect",
        retort: "對啦對啦，湯要先喝。",
      },
      {
        id: "ama-food_push-001-c",
        text: "阿嬤煮的菜太好吃，我都留肚子裝阿嬤的招牌菜。",
        archetype: "deflect",
        retort: "招牌菜？那再給你裝一碗！",
      },
      {
        id: "ama-food_push-001-d",
        text: "我在減肥，晚上不吃澱粉……",
        archetype: "meek",
        retort: "減什麼肥！你已經瘦到剩骨頭了！",
      },
      {
        id: "ama-food_push-001-e",
        text: "中午吃太飽，現在真的吃不下……",
        archetype: "meek",
        retort: "吃不下也要吃一點，不然會餓！",
      },
      {
        id: "ama-food_push-001-f",
        text: "阿嬤你這樣是想把我養肥了賣掉嗎哈哈。",
        archetype: "backfire",
        retort: "（阿嬤沒聽懂，繼續夾）",
      },
      {
        id: "ama-food_push-001-g",
        text: "阿嬤，我這是為了維持男神／女神身材。",
        archetype: "backfire",
        retort: "（阿嬤皺眉，還是夾了一塊）",
      },
      {
        id: "ama-food_push-001-h",
        text: "你很煩耶，一直夾是要撐死我嗎。",
        archetype: "landmine",
        retort: "……好，阿嬤不夾了。（放下筷子）",
      },
    ],
  },
] satisfies Question[];
