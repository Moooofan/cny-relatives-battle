import type { Life } from "@/content/types";

export default {
  id: "life-17",
  code: "L17",
  slug: "fitness-coach",
  name: "健身教練",
  tagline: "工作室倒了，體態還是很有型",
  background: [
    "家裡老么，從小被寵，最敢跟長輩頂嘴。",
    "合夥的工作室上個月收掉，正在找新東家。",
    "北漂租屋，體脂比銀行存款數字漂亮多了。",
  ],
  relations: {
    "xiao-biaodi": "他很崇拜你的手臂，一直要你教他做伏地挺身。",
    "neighbor-chen": "陳太太覺得健身教練不穩定，替你媽操心。",
    biaojie: "表姊常問你產後恢復菜單，把你當免費教練。",
    dabo: "大伯說運動員腦袋簡單，你懶得反駁。",
    guzhang: "姑丈想找你團練，順便推銷他的保健食品。",
    sanjiuma: "三舅媽問教練費多少，跟表哥的獎金比比看。",
    ama: "阿嬤覺得你太瘦，硬要你多吃兩碗飯。",
    sangu: "三姑說身材保持得好，是不是想選美。",
  },
  strengths: [
    "外表題神回覆傷害 +40%（本業實力）",
    "起始 HP +15（體能底子好）",
  ],
  weaknesses: ["被問薪水乖乖回答更痛 +50%（工作室收掉的焦慮）"],
  modifiers: {
    topic: {
      appearance: { perfect: { dealt: 1.4 } },
      salary_job: { meek: { taken: 1.5 } },
    },
    startHp: 115,
  },
  icon: "Dumbbell",
} satisfies Life;
