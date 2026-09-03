import type { Boss } from "@/content/types";

export default {
  id: "ama",
  name: "阿嬤",
  title: "心疼式緊迫盯人",
  description: "眼裡只有你太瘦、太晚婚、太少回來；她不會罵你，她會難過。",
  tier: "normal",
  topics: ["food_push", "marriage", "religion"],
  order: 7,
  modifiers: {
    // 對阿嬤踩雷幾乎沒用，她只會更擔心你：傷害打折、反傷加重，
    // 而且她會心疼到回血——「溫柔地贏」才是對付阿嬤的正解。
    dealtMultiplier: { perfect: 0.5, landmine: 0.2 },
    takenMultiplier: { landmine: 1.5 },
    healOnLandmine: 20,
  },
  emoji: "👵",
  lines: {
    intro: "回來就好、回來就好……來，坐阿嬤旁邊，怎麼又瘦了？",
    defeated: "好啦，阿嬤不問了，你開心阿嬤就開心。（偷偷再夾一塊）",
    victory: "……阿嬤只是關心你而已。",
  },
} satisfies Boss;
