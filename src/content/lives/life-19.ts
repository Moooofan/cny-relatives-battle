import type { Life } from "@/content/types";

export default {
  id: "life-19",
  code: "L19",
  slug: "social-worker",
  name: "社工",
  tagline: "顧了一堆案家，自己薪水顧不好",
  background: [
    "阿公阿嬤帶大，爸媽在外地打拼很少見面。",
    "做社工五年，聽過的家庭故事比自己的還多。",
    "單身很久，同理心用光了就剩不出時間談戀愛。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你很會哄小孩，其實那是職業技能。",
    "neighbor-chen": "陳太太問社工是不是要去很危險的地方。",
    biaojie: "表姊佩服你做這行，說換她一定做不來。",
    dabo: "大伯說社會問題都是政府沒做好，你懶得爭辯。",
    guzhang: "姑丈以為社工是志工，一直說你人真好。",
    sanjiuma: "三舅媽問社工薪水，聽完沉默拍拍你的肩。",
    ama: "阿嬤最懂你的溫柔，捨不得你太累。",
    sangu: "三姑聽你講案例，聽到最後反而先心疼你。",
  },
  strengths: ["對阿嬤神回覆傷害 +40%（同理心全開）"],
  weaknesses: ["被問薪水乖乖回答更痛 +50%（社工低薪的無奈）"],
  modifiers: {
    topic: {
      salary_job: { meek: { taken: 1.5 } },
    },
    boss: {
      ama: { perfect: { dealt: 1.4 } },
    },
  },
  icon: "HeartHandshake",
} satisfies Life;
