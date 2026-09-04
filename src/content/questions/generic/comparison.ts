import type { Question } from "@/content/types";

// situations:
// 001 跟朋友比工作成就(升主管)
// 002 跟鄰居小孩比小時候到現在成就
// 003 跟同學比誰先買車
// 004 跟兄弟姊妹比孝順程度
// 005 跟朋友的小孩比才藝
// 006 跟同輩比誰先結婚
// 007 跟朋友比誰先出國旅遊
// 008 比誰比較有出息
// 009 比誰比較會做人情世故(紅包大方)
// 010 比誰過得比較好(整體人生)

export default [
  {
    id: "generic-comparison-001",
    text: "你朋友都當主管了，你呢？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-001-a", text: "幹，他兒子靠關係升的，你倒不提。", archetype: "perfect", retort: "幹，你這什麼嘴，沒大沒小！" },
      { id: "generic-comparison-001-b", text: "靠，你們最近身體還好嗎？", archetype: "deflect", retort: "好啦好啦，你這麼問真貼心。" },
      { id: "generic-comparison-001-c", text: "先別比較，你們菜煮得真好吃。", archetype: "deflect", retort: "喜歡就多吃一點啊。" },
      { id: "generic-comparison-001-d", text: "他比較優秀啦，幹……我還在努力。", archetype: "meek", retort: "要努力，別讓人一直超前。" },
      { id: "generic-comparison-001-e", text: "每個人步調不一樣啦……", archetype: "meek", retort: "步調不一樣也要有進度啊。" },
      { id: "generic-comparison-001-f", text: "幹，我在走大器晚成路線。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-comparison-001-g", text: "他媽的潛力還沒被發現而已。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-001-h", text: "幹你娘，別拿別人小孩壓我，老東西。", archetype: "landmine", retort: "你他媽敢這樣說話，欠管教！" },
    ],
  },
  {
    id: "generic-comparison-002",
    text: "隔壁小孩以前功課沒你好，現在買房了。",
    topic: "comparison",
    options: [
      { id: "generic-comparison-002-a", text: "他媽的，功課換不了房子，你先賣一間。", archetype: "perfect", retort: "幹，你這什麼態度，欠揍！" },
      { id: "generic-comparison-002-b", text: "靠，隔壁是不是又蓋新房子？", archetype: "deflect", retort: "有啊，聽說裝潢得很漂亮。" },
      { id: "generic-comparison-002-c", text: "買房先別比，你們家過年很溫馨。", archetype: "deflect", retort: "謝謝誇獎，年年都這樣。" },
      { id: "generic-comparison-002-d", text: "他運氣比較好啦，靠……我還在存。", archetype: "meek", retort: "運氣也是要靠努力累積的。" },
      { id: "generic-comparison-002-e", text: "說實話，聽到這種比較會難過……", archetype: "meek", retort: "難過歸難過，還是要加油。" },
      { id: "generic-comparison-002-f", text: "機掰，我在等我的伯樂出現。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-comparison-002-g", text: "風水輪流轉，我快轉到了啦。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-002-h", text: "去你的，隔壁的事你比戶政還清楚。", archetype: "landmine", retort: "你他媽越來越沒大沒小！" },
    ],
  },
  {
    id: "generic-comparison-003",
    text: "你同學都換新車了，你還騎機車？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-003-a", text: "幹，省油環保，你同學車貸要幫繳？", archetype: "perfect", retort: "你少貧嘴，快他媽吃飯。" },
      { id: "generic-comparison-003-b", text: "笑死，你們覺得哪個顏色好看？", archetype: "deflect", retort: "當然是紅色，喜氣啦！" },
      { id: "generic-comparison-003-c", text: "車子先放著，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-comparison-003-d", text: "還在存錢啦，幹……車子真的貴。", archetype: "meek", retort: "存夠了再買，別急著跟風。" },
      { id: "generic-comparison-003-e", text: "說實話，我沒有很想買車……", archetype: "meek", retort: "沒車以後不方便怎麼辦？" },
      { id: "generic-comparison-003-f", text: "幹，我飆機車假裝在開跑車。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-comparison-003-g", text: "他媽的等無人車技術成熟再說。", archetype: "backfire", retort: "（大家聽不懂在講什麼）" },
      { id: "generic-comparison-003-h", text: "幹你娘，老不死管別人換車幹嘛。", archetype: "landmine", retort: "現在年輕人他媽的沒大沒小！" },
    ],
  },
  {
    id: "generic-comparison-004",
    text: "你哥每個禮拜都有回來，你呢？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-004-a", text: "他常回來，那他媽的常聽你念吧？", archetype: "perfect", retort: "（轉頭跟旁邊講）你們聽聽看。" },
      { id: "generic-comparison-004-b", text: "靠北，你們最近身體有不舒服嗎？", archetype: "deflect", retort: "還好啦，你這麼問真貼心。" },
      { id: "generic-comparison-004-c", text: "回不回來先別提，我今天多留一晚。", archetype: "deflect", retort: "好啊好啦，留久一點！" },
      { id: "generic-comparison-004-d", text: "工作真的比較忙，幹……沒辦法常回來。", archetype: "meek", retort: "忙也要抽空回來看看啊。" },
      { id: "generic-comparison-004-e", text: "說真的，聽你這樣講有點小失落……", archetype: "meek", retort: "難過歸難過，還是要多回來。" },
      { id: "generic-comparison-004-f", text: "機掰，我用視訊孝順，效果一樣。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-comparison-004-g", text: "我請假的頻率跟他媽的成反比。", archetype: "backfire", retort: "（大家聽不太懂）" },
      { id: "generic-comparison-004-h", text: "他回不回來干你屁事，去你的。", archetype: "landmine", retort: "（氣到甩筷子）欠管教喔你！" },
    ],
  },
  {
    id: "generic-comparison-005",
    text: "朋友家小孩會彈鋼琴，你以前怎麼沒學？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-005-a", text: "沒學鋼琴，但他媽的至少沒學嫌東嫌西。", archetype: "perfect", retort: "講話這麼衝，跟誰學的。" },
      { id: "generic-comparison-005-b", text: "靠，那小孩是跟誰學的？聽起來厲害。", archetype: "deflect", retort: "聽說是跟名師學的呢。" },
      { id: "generic-comparison-005-c", text: "才藝先放著，你們菜煮得真有水準。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-comparison-005-d", text: "小時候家裡沒資源學，幹……沒辦法。", archetype: "meek", retort: "沒資源也是可惜，現在想學也不遲。" },
      { id: "generic-comparison-005-e", text: "說實話，我對樂器沒什麼興趣……", archetype: "meek", retort: "沒興趣也可以培養一下嘛。" },
      { id: "generic-comparison-005-f", text: "幹，我會用嘴巴哼歌，效果差不多。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-comparison-005-g", text: "我打算現在才開始學，還不遲。", archetype: "backfire", retort: "（大家客氣地沒接話）" },
      { id: "generic-comparison-005-h", text: "誰會彈鋼琴不用你管，去你的老東西閉嘴。", archetype: "landmine", retort: "你這什麼態度，明年不用來了！" },
    ],
  },
  {
    id: "generic-comparison-006",
    text: "你朋友都結婚了，你怎麼還沒動靜？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-006-a", text: "他結婚了，他媽的幸不幸福你先問問。", archetype: "perfect", retort: "（笑不出來，硬接話）" },
      { id: "generic-comparison-006-b", text: "笑死，他們婚禮辦得盛大嗎？", archetype: "deflect", retort: "很盛大啊，聽說辦了二十桌。" },
      { id: "generic-comparison-006-c", text: "結不結婚先別提，紅包倒是可以先包。", archetype: "deflect", retort: "你這孩子，很會轉話題。" },
      { id: "generic-comparison-006-d", text: "還沒有對象啦，靠……順其自然。", archetype: "meek", retort: "順其自然也要主動一點啊。" },
      { id: "generic-comparison-006-e", text: "說實話，這種比較讓我壓力很大……", archetype: "meek", retort: "壓力大也是要面對啦。" },
      { id: "generic-comparison-006-f", text: "幹，我在等良辰吉時自己出現。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-comparison-006-g", text: "他媽的單身也是一種才華。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-006-h", text: "我結不結婚不用你管，去你的。", archetype: "landmine", retort: "（叫你媽出來）你自己教的小孩！" },
    ],
  },
  {
    id: "generic-comparison-007",
    text: "你朋友都出國好幾趟了，你呢？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-007-a", text: "他出國幾趟，年假是你他媽幫他請的？", archetype: "perfect", retort: "是喔，隨便你怎麼講。" },
      { id: "generic-comparison-007-b", text: "靠北，你們最想去哪裡玩？我幫查機票。", archetype: "deflect", retort: "喔，那你幫我查查日本好了。" },
      { id: "generic-comparison-007-c", text: "出不出國先放著，過年菜色真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-comparison-007-d", text: "最近經濟比較緊，幹……沒辦法出國。", archetype: "meek", retort: "緊一點也要適度放鬆一下。" },
      { id: "generic-comparison-007-e", text: "說實話，工作太忙沒時間排假……", archetype: "meek", retort: "忙也要留點時間給自己。" },
      { id: "generic-comparison-007-f", text: "機掰，我在家看地圖神遊，一樣開心。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-comparison-007-g", text: "我打算等退休一次玩個夠。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-007-h", text: "出不出國是我的錢，幹，老不死算得比會計細。", archetype: "landmine", retort: "好，你行，以後別他媽的來找我！" },
    ],
  },
  {
    id: "generic-comparison-008",
    text: "你朋友那麼有出息，你要加油了。",
    topic: "comparison",
    options: [
      { id: "generic-comparison-008-a", text: "他有出息，他媽的紅包包多少你先講。", archetype: "perfect", retort: "（語塞，拿筷子夾菜掩飾）" },
      { id: "generic-comparison-008-b", text: "靠，你們覺得什麼樣算是有出息？", archetype: "deflect", retort: "當然是穩定又孝順啊。" },
      { id: "generic-comparison-008-c", text: "有沒有出息先別提，菜煮得真有水準。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-comparison-008-d", text: "他確實比較有成就，幹……我還在努力。", archetype: "meek", retort: "努力歸努力，還是要看得到成果。" },
      { id: "generic-comparison-008-e", text: "說實話，這種話聽多了會有點累……", archetype: "meek", retort: "累歸累，還是要繼續加油。" },
      { id: "generic-comparison-008-f", text: "幹，我打算低調到嚇你們一跳。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-comparison-008-g", text: "他媽的我的出息還在運送途中。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-008-h", text: "拿別人出息壓我，你去死，滾。", archetype: "landmine", retort: "（臉色鐵青）你講話太過分了！" },
    ],
  },
  {
    id: "generic-comparison-009",
    text: "你朋友包的紅包都比你大方耶。",
    topic: "comparison",
    options: [
      { id: "generic-comparison-009-a", text: "他包得多，幹，他薪水單要不要給你看？", archetype: "perfect", retort: "你這孩子，越來越會頂嘴。" },
      { id: "generic-comparison-009-b", text: "笑死，你們今年最想收到什麼禮物？", archetype: "deflect", retort: "有心就好，什麼都好啦。" },
      { id: "generic-comparison-009-c", text: "紅包先別比，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-comparison-009-d", text: "最近手頭比較緊，靠……包得少一點。", archetype: "meek", retort: "緊一點也是要包個意思。" },
      { id: "generic-comparison-009-e", text: "說實話，我對紅包行情不太清楚……", archetype: "meek", retort: "不清楚就要多打聽一下啊。" },
      { id: "generic-comparison-009-f", text: "機掰，我包的是精神紅包，價值連城。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-comparison-009-g", text: "我打算包一張手寫的祝福卡代替。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-009-h", text: "紅包包多少是我的事，去你的老東西很閒。", archetype: "landmine", retort: "白養你這麼多年，換來這句話！" },
    ],
  },
  {
    id: "generic-comparison-010",
    text: "你朋友過得比你好太多了吧？",
    topic: "comparison",
    options: [
      { id: "generic-comparison-010-a", text: "他過得好，他媽的多久沒回來看你了？", archetype: "perfect", retort: "（假笑）好，算你有理。" },
      { id: "generic-comparison-010-b", text: "靠北，你們覺得什麼樣的人生算過得好？", archetype: "deflect", retort: "當然是平安健康最重要啦。" },
      { id: "generic-comparison-010-c", text: "過得好不好先別比，你們特別有精神。", archetype: "deflect", retort: "是嗎？多虧你這麼一問。" },
      { id: "generic-comparison-010-d", text: "可能吧，幹……他運氣比較好一點。", archetype: "meek", retort: "運氣好也是要靠努力累積的。" },
      { id: "generic-comparison-010-e", text: "說實話，聽到這種比較會有點洩氣……", archetype: "meek", retort: "洩氣歸洩氣，還是要往前走。" },
      { id: "generic-comparison-010-f", text: "幹，我在走厚積薄發路線，還在厚積。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-comparison-010-g", text: "他媽的我的人生是限定版，比較稀有。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-comparison-010-h", text: "我過得好不好不用你管，去死啦。", archetype: "landmine", retort: "（氣到講台語）你這是什麼款！" },
    ],
  },
] satisfies Question[];
