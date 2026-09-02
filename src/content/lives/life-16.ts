import type { Life } from "@/content/types";

export default {
  id: "life-16",
  code: "L16",
  slug: "pharmacist-eldest",
  name: "藥師大女兒",
  tagline: "顧藥局也顧娘家，都靠專業扛",
  background: [
    "身為長女，家裡大小事都習慣先問你意見。",
    "在社區藥局值班，鄰居的藥史比病歷還熟。",
    "結婚三年還沒生，逢年過節都被算著日子。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你的藥局有糖果，每次都來要一顆。",
    "neighbor-chen": "陳太太的慢性病藥都跟你拿，比診所還熟。",
    biaojie: "表姊常問你小孩感冒能不能吃什麼藥。",
    dabo: "大伯的血壓藥你比他自己還清楚有沒有吃。",
    guzhang: "姑丈的偏方，你都能用藥理一條一條反駁。",
    sanjiuma: "三舅媽問藥師薪水穩不穩，比表哥的高嗎。",
    ama: "阿嬤最信你，吃藥前都會先問你一句。",
    sangu: "三姑問生小孩的事，一年比一年問得直接。",
  },
  strengths: ["對姑丈神回覆傷害 +40%（專業打偏方）"],
  weaknesses: ["被問生小孩乖乖回答更痛 +40%"],
  modifiers: {
    topic: {
      kids: { meek: { taken: 1.4 } },
    },
    boss: {
      guzhang: { perfect: { dealt: 1.4 } },
    },
  },
  icon: "Pill",
} satisfies Life;
