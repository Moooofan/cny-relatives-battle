import type { Life } from "@/content/types";

export default {
  id: "life-03",
  code: "L03",
  slug: "laid-off-salesman",
  name: "剛失業業務",
  tagline: "上禮拜資遣，紅包還沒領",
  background: [
    "做業務十年，上個月公司資遣了一半的人。",
    "獨生子女，爸媽的期待都放在你身上。",
    "北漂租屋，房租這個月靠信用卡撐過去。",
  ],
  relations: {
    "xiao-biaodi": "他問你怎麼還沒上班，你只能笑笑帶過。",
    "neighbor-chen": "陳太太的情報網比人力銀行還快更新。",
    biaojie: "表姊安慰你說沒關係，語氣像在說案例。",
    dabo: "大伯說景氣不好，年輕人要能屈能伸。",
    guzhang: "姑丈傳給你的都是創業致富的長輩圖。",
    sanjiuma: "三舅媽問薪水前，先問你現在領多少。",
    ama: "阿嬤只關心你有沒有吃飽，不問工作。",
    sangu: "三姑說失業是轉機，順便問你要不要相親。",
  },
  strengths: ["對薪水題四兩撥千斤傷害 +30%（業務嘴還在）"],
  weaknesses: [
    "被問薪水乖乖回答更痛 +50%（戳到失業焦慮）",
    "被鄰居戳破失業更難堪 +30%",
  ],
  modifiers: {
    topic: {
      salary_job: { meek: { taken: 1.5 }, deflect: { dealt: 1.3 } },
    },
    boss: {
      "neighbor-chen": { landmine: { taken: 1.3 } },
    },
  },
  icon: "Briefcase",
} satisfies Life;
