import type { Life } from "@/content/types";

export default {
  id: "life-13",
  code: "L13",
  slug: "returning-farm-heir",
  name: "返鄉農二代",
  tagline: "辭掉城市工作，回來種爸媽的田",
  background: [
    "家裡務農三代，你是唯一願意回來接手的。",
    "剛辭掉城市的工作，回鄉重新學怎麼種田。",
    "薪水從穩定月薪變成看天吃飯，心裡有點虛。",
  ],
  relations: {
    "xiao-biaodi": "他覺得你種田很酷，吵著要跟你去抓蟲。",
    "neighbor-chen": "陳太太逢人就說你放棄好工作很可惜。",
    biaojie: "表姊佩服你的決定，但也擔心你收入不穩。",
    dabo: "大伯說農業沒前途，勸你趕快回城市上班。",
    guzhang: "姑丈的養生偏方，你田裡種的都能實際驗證。",
    sanjiuma: "三舅媽問種田一個月賺多少，比表哥少很多吧。",
    ama: "阿嬤最開心你回來，天天陪她巡田水。",
    sangu: "三姑說能捨得放下城市生活，也是一種本事。",
  },
  strengths: ["對阿嬤神回覆傷害 +30%（陪她種菜練出的默契）"],
  weaknesses: ["被問薪水乖乖回答更痛 +50%（看天吃飯的心虛）"],
  modifiers: {
    topic: {
      salary_job: { meek: { taken: 1.5 } },
    },
    boss: {
      ama: { perfect: { dealt: 1.3 } },
    },
  },
  icon: "Tractor",
} satisfies Life;
