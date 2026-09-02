import type { Life } from "@/content/types";

export default {
  id: "life-06",
  code: "L06",
  slug: "returnee-vlogger",
  name: "海歸小網紅",
  tagline: "剛回國，粉絲數比戶籍地址熟",
  background: [
    "家裡老么，從小最被放養也最敢闖。",
    "在國外唸書順便經營頻道，上個月剛回台。",
    "鏡頭前很敢講，鏡頭後其實會怕被起底。",
  ],
  relations: {
    "xiao-biaodi": "他是你頻道的頭號粉絲，見面反而害羞。",
    "neighbor-chen": "陳太太把你在國外的事都跟全社區報告了。",
    biaojie: "表姊常轉發你的影片，順便凡爾賽她的小孩。",
    dabo: "大伯不懂網紅是工作，一直問你正職是什麼。",
    guzhang: "姑丈以為你會拍片，就懂怎麼用手機修圖。",
    sanjiuma: "三舅媽問流量能不能換錢，比表哥薪水高嗎。",
    ama: "阿嬤只知道你在國外，回來就想多看兩眼。",
    sangu: "三姑說網路上什麼都藏不住，要你小心點。",
  },
  strengths: ["比較題神回覆傷害 +40%（鏡頭前反應快）"],
  weaknesses: ["對陳太太踩雷傷害 +50%（情報網起底更痛）"],
  modifiers: {
    topic: {
      comparison: { perfect: { dealt: 1.4 } },
    },
    boss: {
      "neighbor-chen": { landmine: { taken: 1.5 } },
    },
    extraSpecials: { skip: 1 },
  },
  icon: "Camera",
} satisfies Life;
