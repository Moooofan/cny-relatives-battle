import type { Life } from "@/content/types";

export default {
  id: "life-30",
  code: "L30",
  slug: "divorce-lawyer",
  name: "剛離婚律師",
  tagline: "打贏別人的官司，自己的婚姻先輸了",
  background: [
    "獨生子女，從小被期待走上一條「正確的路」。",
    "當律師五年，上個月自己的離婚協議書剛簽完。",
    "北漂租屋，這次回家是離婚後第一次面對全家族。",
  ],
  relations: {
    "xiao-biaodi": "他覺得律師很厲害，吵著要你幫他跟媽媽求情。",
    "neighbor-chen": "陳太太早就知道你離婚了，比你自己說得還詳細。",
    biaojie: "表姊小心翼翼避開婚姻話題，讓氣氛更僵。",
    dabo: "大伯最愛找你辯論政治話題，你邏輯完全不輸。",
    guzhang: "姑丈想找你問，長輩圖轉發違法嗎。",
    sanjiuma: "三舅媽婉轉問你「一個人」是不是輕鬆很多。",
    ama: "阿嬤只說沒關係，一個人也要把自己顧好。",
    sangu: "三姑直接問離婚原因，你反問她想聽真的還假的。",
  },
  strengths: ["對大伯神回覆傷害 +50%（辯論是本業）"],
  weaknesses: ["被問感情乖乖回答更痛 +50%（傷口還沒好）"],
  modifiers: {
    topic: {
      marriage: { meek: { taken: 1.5 } },
    },
    boss: {
      dabo: { perfect: { dealt: 1.5 } },
    },
  },
  icon: "Scale",
} satisfies Life;
