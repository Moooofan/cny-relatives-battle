import type { Life } from "@/content/types";

export default {
  id: "life-20",
  code: "L20",
  slug: "firefighter",
  name: "消防員",
  tagline: "排班救火，回家過年靠運氣",
  background: [
    "家裡三代同堂，從小看阿公阿嬤忙進忙出。",
    "當消防員五年，過年常常排到值班沒能回家。",
    "結婚了還沒生小孩，餐桌話題永遠繞著這個。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你是超人，逢人就說你會噴水救火。",
    "neighbor-chen": "陳太太逢人就誇消防員穩定又受人尊敬。",
    biaojie: "表姊佩服你的勇敢，順便問你怕不怕。",
    dabo: "大伯難得誇你這行有保障，聊起來很順。",
    guzhang: "姑丈拜託你檢查一下家裡的滅火器有沒有過期。",
    sanjiuma: "三舅媽問消防員加給多不多，比表哥穩定。",
    ama: "阿嬤最擔心你上班危險，逢人就要你小心。",
    sangu: "三姑問生小孩的事，說輪班也要排出時間。",
  },
  strengths: [
    "對三姑神回覆傷害 +30%（救火訓練超冷靜）",
    "起始 HP +15（體能抗壓）",
  ],
  weaknesses: ["對阿嬤踩雷傷害 +50%（常缺席讓她更心疼）"],
  modifiers: {
    boss: {
      sangu: { perfect: { dealt: 1.3 } },
      ama: { landmine: { taken: 1.5 } },
    },
    startHp: 115,
  },
  icon: "Flame",
} satisfies Life;
