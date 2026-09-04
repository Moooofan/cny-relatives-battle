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
        text: "幹，破十萬是行還是離職前兆？",
        archetype: "perfect",
        retort: "他媽的，你亂講什麼東西！",
      },
      {
        id: "sanjiuma-salary_job-001-b",
        text: "笑死，夠吃夠住還能包鳳梨酥孝敬你。",
        archetype: "deflect",
        retort: "哎唷，嘴巴倒是很甜。",
      },
      {
        id: "sanjiuma-salary_job-001-c",
        text: "靠，舅媽紅包行情怎樣？很期待。",
        archetype: "deflect",
        retort: "紅包紅包，你就只想這個。",
      },
      {
        id: "sanjiuma-salary_job-001-d",
        text: "幹……四萬多啦，扣掉房租就沒了……",
        archetype: "meek",
        retort: "四萬多？那要怎麼存錢買房？",
      },
      {
        id: "sanjiuma-salary_job-001-e",
        text: "沒表哥那麼多啦，我還在存基本款……",
        archetype: "meek",
        retort: "存基本款？是不是不夠努力？",
      },
      {
        id: "sanjiuma-salary_job-001-f",
        text: "我他媽領的是夢想，無價的啦。",
        archetype: "backfire",
        retort: "……（全桌安靜，沒人想理你）",
      },
      {
        id: "sanjiuma-salary_job-001-g",
        text: "我啊？低調領錢，高調放幹話。",
        archetype: "backfire",
        retort: "……（舅媽白眼，懶得理你）",
      },
      {
        id: "sanjiuma-salary_job-001-h",
        text: "幹，破十萬是他行，還是妳老太婆塞的？",
        archetype: "landmine",
        retort: "你他媽的給我滾出去！",
      },
    ],
  },
] satisfies Question[];
