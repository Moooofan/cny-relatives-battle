import type { Question } from "@/content/types";

export default [
  {
    id: "sanjiuma-salary_job-001",
    text: "現在一個月領多少啊？你表哥去年就破十萬了喔。",
    topic: "salary_job",
    bossId: "sanjiuma",
    options: [
      {
        id: "sanjiuma-salary_job-001-a",
        text: "破十萬喔？那今年表哥的紅包包大一點，我來幫忙領。",
        archetype: "perfect",
        retort: "你這孩子……嘴巴怎麼跟你媽一樣厲害。",
      },
      {
        id: "sanjiuma-salary_job-001-b",
        text: "還可以啦，夠吃夠住，還夠買一盒鳳梨酥孝敬舅媽。",
        archetype: "deflect",
        retort: "哎唷，就會講好聽的。",
      },
      {
        id: "sanjiuma-salary_job-001-c",
        text: "舅媽今年紅包行情怎樣？我很期待喔！",
        archetype: "deflect",
        retort: "紅包紅包，你就只想到這個。",
      },
      {
        id: "sanjiuma-salary_job-001-d",
        text: "大概四萬多……扣掉房租跟勞健保就……",
        archetype: "meek",
        retort: "四萬多？那你要怎麼存錢買房？",
      },
      {
        id: "sanjiuma-salary_job-001-e",
        text: "沒有表哥那麼多啦，我還在存基本款……",
        archetype: "meek",
        retort: "存基本款？你是不是不夠努力？",
      },
      {
        id: "sanjiuma-salary_job-001-f",
        text: "我領的是夢想，夢想無價。",
        archetype: "backfire",
        retort: "……（三舅媽看向表哥，表哥低頭滑手機）",
      },
      {
        id: "sanjiuma-salary_job-001-g",
        text: "我啊？低調領錢，高調花錢。",
        archetype: "backfire",
        retort: "……（舅媽愣住，轉頭問別人要不要加菜）",
      },
      {
        id: "sanjiuma-salary_job-001-h",
        text: "表哥領十萬，是因為在舅舅公司上班吧？",
        archetype: "landmine",
        retort: "你這什麼意思！他是憑實力的！",
      },
    ],
  },
] satisfies Question[];
