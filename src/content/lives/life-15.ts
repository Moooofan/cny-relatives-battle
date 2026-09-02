import type { Life } from "@/content/types";

export default {
  id: "life-15",
  code: "L15",
  slug: "busking-artist",
  name: "街頭藝人",
  tagline: "駐點被取消，這禮拜靠打賞吃飯",
  background: [
    "父母離異，跟著阿姨長大，很早學會自己來。",
    "在夜市駐唱維生，收入全看觀眾心情。",
    "北漂租雅房，樂器比家具還值錢。",
  ],
  relations: {
    "xiao-biaodi": "他最愛你的表演，逢人就說你要紅了。",
    "neighbor-chen": "陳太太問你唱歌能不能養活自己。",
    biaojie: "表姊訂婚宴想找你表演，但沒提到費用。",
    dabo: "大伯說唱歌不是正經工作，勸你考公職。",
    guzhang: "姑丈說他也想學樂器，問你貴不貴教。",
    sanjiuma: "三舅媽問駐唱一個月能賺多少，比表哥差很多。",
    ama: "阿嬤最愛聽你唱歌，錄下來存在手機裡。",
    sangu: "三姑聽完你的即興回答，笑說你比她會演。",
  },
  strengths: ["對三姑四兩撥千斤傷害 +30%（即興是本業）"],
  weaknesses: ["被問薪水乖乖回答更痛 +60%（收入不穩的痛點）"],
  modifiers: {
    topic: {
      salary_job: { meek: { taken: 1.6 } },
    },
    boss: {
      sangu: { deflect: { dealt: 1.3 } },
    },
  },
  icon: "Guitar",
} satisfies Life;
