import type { Question } from "@/content/types";

// situations:
// 001 問學歷是不是不夠高該去讀研究所
// 002 說當年沒好好念書現在才後悔
// 003 問念的科系是不是沒出路
// 004 說隔壁小孩考上好學校
// 005 問是不是該去考證照/進修
// 006 問英文/外語能力好不好
// 007 說讀那麼多書出社會還不是這樣
// 008 問是不是該出國留學鍍金
// 009 問當年成績單/名次
// 010 說學歷不重要能力比較重要(反諷)

export default [
  {
    id: "generic-education-001",
    text: "學歷是不是不夠高？要不要去念研究所？",
    topic: "education",
    options: [
      { id: "generic-education-001-a", text: "在評估中，等我念完換你們喊我博士。", archetype: "perfect", retort: "好啊，那我先預約一頂博士帽。" },
      { id: "generic-education-001-b", text: "先問你們，當年最想念什麼科系？", archetype: "deflect", retort: "我啊，那時候想念醫科呢。" },
      { id: "generic-education-001-c", text: "念不念先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-education-001-d", text: "有考慮過，只是工作太忙沒時間……", archetype: "meek", retort: "忙也要找時間進修啊。" },
      { id: "generic-education-001-e", text: "說實話，我對念書沒有很有興趣……", archetype: "meek", retort: "沒興趣以後會後悔的。" },
      { id: "generic-education-001-f", text: "我在自學量子力學，比較高深。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-001-g", text: "我打算靠人生經驗抵學分。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-001-h", text: "念不念研究所是我的事，不用你們催。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-education-002",
    text: "你以前書沒念好，現在會不會後悔？",
    topic: "education",
    options: [
      { id: "generic-education-002-a", text: "不後悔，我把念書的力氣拿去闖社會了。", archetype: "perfect", retort: "你這孩子，講話真的有一套。" },
      { id: "generic-education-002-b", text: "先問你們，當年最會念書的是誰？", archetype: "deflect", retort: "那當然是我啊，成績最好！" },
      { id: "generic-education-002-c", text: "後不後悔先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-education-002-d", text: "有時候會覺得，如果認真一點會不一樣……", archetype: "meek", retort: "會覺得就要趁現在補回來。" },
      { id: "generic-education-002-e", text: "說實話，多少會有點遺憾……", archetype: "meek", retort: "遺憾就要想辦法彌補啊。" },
      { id: "generic-education-002-f", text: "我把念書的時間拿去研究人生哲學了。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-002-g", text: "我覺得社會大學才是真正的學歷。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-002-h", text: "念書好不好是我的事，不用你們一直提。", archetype: "landmine", retort: "關心一下也要被嗆，真是的。" },
    ],
  },
  {
    id: "generic-education-003",
    text: "你念的科系是不是沒什麼出路？",
    topic: "education",
    options: [
      { id: "generic-education-003-a", text: "出路是自己走出來的，我這條路走得挺穩。", archetype: "perfect", retort: "你這孩子，講話真有志氣。" },
      { id: "generic-education-003-b", text: "先問你們，覺得什麼科系比較有出路？", archetype: "deflect", retort: "當然是穩定的科系比較好啦。" },
      { id: "generic-education-003-c", text: "出路先別提，你們今天菜煮得真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-education-003-d", text: "確實比較冷門，還在努力找方向……", archetype: "meek", retort: "冷門也要多想想轉換跑道。" },
      { id: "generic-education-003-e", text: "說實話，工作機會確實比較少……", archetype: "meek", retort: "少也要多投履歷試試看。" },
      { id: "generic-education-003-f", text: "我打算靠這個科系當開創產業的第一人。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-003-g", text: "我在等這個科系突然爆紅。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-003-h", text: "念什麼科系是我的選擇，不用你們評論。", archetype: "landmine", retort: "評論一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-education-004",
    text: "隔壁的都考上好學校，你當年呢？",
    topic: "education",
    options: [
      { id: "generic-education-004-a", text: "我當年考上的是社會這間最硬的學校。", archetype: "perfect", retort: "你這孩子，講話真有一套。" },
      { id: "generic-education-004-b", text: "先問隔壁的最近在學校過得怎樣？", archetype: "deflect", retort: "聽說過得不錯，很認真呢。" },
      { id: "generic-education-004-c", text: "考不考得上先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-education-004-d", text: "我當年成績普通，沒考上很好的學校……", archetype: "meek", retort: "普通也要繼續努力補回來。" },
      { id: "generic-education-004-e", text: "老實說，這樣比真的會不好受……", archetype: "meek", retort: "難過歸難過，還是要面對現實。" },
      { id: "generic-education-004-f", text: "我當年是故意考差，深藏實力。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-education-004-g", text: "我把讀書的天分留到出社會再用。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-004-h", text: "考得好不好不用你們一直拿來比。", archetype: "landmine", retort: "比較一下也要生氣，真受不了。" },
    ],
  },
  {
    id: "generic-education-005",
    text: "要不要去考個證照，比較有競爭力？",
    topic: "education",
    options: [
      { id: "generic-education-005-a", text: "在準備了，考到那天你們就是第一個知道。", archetype: "perfect", retort: "好，那我等你的好消息。" },
      { id: "generic-education-005-b", text: "先問你們，覺得哪張證照比較實用？", archetype: "deflect", retort: "這個我不太清楚，你查查看。" },
      { id: "generic-education-005-c", text: "考不考先放著，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-education-005-d", text: "有想過，只是工作太忙沒時間準備……", archetype: "meek", retort: "忙也要找時間，別一直拖。" },
      { id: "generic-education-005-e", text: "說實話，我對考試有點抗拒……", archetype: "meek", retort: "抗拒也要克服，這對你有幫助。" },
      { id: "generic-education-005-f", text: "我打算靠面相學讓人相信我很專業。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-005-g", text: "我在等證照自己寄到家裡來。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-005-h", text: "考不考證照是我的事，不用你們催。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-education-006",
    text: "你英文好不好？現在很重要耶。",
    topic: "education",
    options: [
      { id: "generic-education-006-a", text: "夠用，重要場合我可以切換到流利模式。", archetype: "perfect", retort: "喔？那說幾句來聽聽。" },
      { id: "generic-education-006-b", text: "先問你們，最近有沒有想學什麼語言？", archetype: "deflect", retort: "有想學日文，但太老了學不動。" },
      { id: "generic-education-006-c", text: "英文的事先別提，你們今天菜煮得真好。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-education-006-d", text: "普通程度，工作上簡單溝通還可以……", archetype: "meek", retort: "普通也要多加強一下才好。" },
      { id: "generic-education-006-e", text: "說實話，我英文真的不太好……", archetype: "meek", retort: "不好要找時間去補習一下。" },
      { id: "generic-education-006-f", text: "我在自學十種語言，還沒學會第一種。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-006-g", text: "我打算靠比手畫腳環遊世界。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-006-h", text: "英文好不好是我的事，不用你們考我。", archetype: "landmine", retort: "問一下也要被嗆，真受不了。" },
    ],
  },
  {
    id: "generic-education-007",
    text: "書讀那麼多，出社會還不是這樣？",
    topic: "education",
    options: [
      { id: "generic-education-007-a", text: "書讀的不是分數，是讓我現在能反駁得有邏輯。", archetype: "perfect", retort: "……嗯，有點道理。" },
      { id: "generic-education-007-b", text: "先問你們，當年最喜歡的科目是什麼？", archetype: "deflect", retort: "我啊，最喜歡的是下課。" },
      { id: "generic-education-007-c", text: "讀書的事先放著，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-education-007-d", text: "確實學校教的跟現實有點不一樣……", archetype: "meek", retort: "不一樣也要學著適應現實。" },
      { id: "generic-education-007-e", text: "說實話，出社會後很多都要重新學……", archetype: "meek", retort: "重新學是正常的，別氣餒。" },
      { id: "generic-education-007-f", text: "書都讀到腦後去了，現在都靠直覺。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-education-007-g", text: "我在走實踐派，理論都是參考用的。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-007-h", text: "讀書有沒有用不是你們能評論的。", archetype: "landmine", retort: "評論一下都要生氣，真是的。" },
    ],
  },
  {
    id: "generic-education-008",
    text: "要不要出國念個書，鍍個金回來？",
    topic: "education",
    options: [
      { id: "generic-education-008-a", text: "在存錢規劃了，鍍金前先把國內基礎打穩。", archetype: "perfect", retort: "有計畫就好，加油。" },
      { id: "generic-education-008-b", text: "先問你們，最想我去哪個國家念書？", archetype: "deflect", retort: "當然是離家近一點的比較好。" },
      { id: "generic-education-008-c", text: "出不出國先放著，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-education-008-d", text: "有想過，只是預算真的不太夠……", archetype: "meek", retort: "不夠就要提早存錢規劃。" },
      { id: "generic-education-008-e", text: "說實話，我對出國念書有點害怕……", archetype: "meek", retort: "害怕也要試試看，別限制自己。" },
      { id: "generic-education-008-f", text: "我打算靠追劇自學留學經驗。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-008-g", text: "我在等免費留學機會自己找上門。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-008-h", text: "出不出國念書是我的事，不用你們決定。", archetype: "landmine", retort: "建議一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-education-009",
    text: "你以前成績單上都排第幾名啊？",
    topic: "education",
    options: [
      { id: "generic-education-009-a", text: "名次不重要，重要的是我現在排在你們心裡第一。", archetype: "perfect", retort: "哎唷，這孩子嘴巴真甜。" },
      { id: "generic-education-009-b", text: "先說你們當年考第幾名比較快。", archetype: "deflect", retort: "那當然是我啊，年年第一名！" },
      { id: "generic-education-009-c", text: "名次先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-education-009-d", text: "成績普通，都在中間名次而已……", archetype: "meek", retort: "中間也要往前擠一擠啊。" },
      { id: "generic-education-009-e", text: "說實話，我成績不是很好……", archetype: "meek", retort: "不好也不用太在意，重要的是現在。" },
      { id: "generic-education-009-f", text: "我那時候是故意考低，測試老師水準。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-education-009-g", text: "我的成績單被我藝術性地弄丟了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-009-h", text: "名次是很久以前的事，不用你們一直提。", archetype: "landmine", retort: "提一下都要生氣，真是的。" },
    ],
  },
  {
    id: "generic-education-010",
    text: "學歷不重要啦，能力比較重要，是不是？",
    topic: "education",
    options: [
      { id: "generic-education-010-a", text: "沒錯，所以我把能力練得比學歷還漂亮。", archetype: "perfect", retort: "你這孩子，講話真有一套。" },
      { id: "generic-education-010-b", text: "先問你們，覺得什麼能力最重要？", archetype: "deflect", retort: "當然是會做人比較重要啦。" },
      { id: "generic-education-010-c", text: "能力的事先放著，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-education-010-d", text: "希望是這樣，我還在累積能力……", archetype: "meek", retort: "累積能力要趁年輕多努力。" },
      { id: "generic-education-010-e", text: "說實話，我也希望能力比較被看重……", archetype: "meek", retort: "希望歸希望，還是要證明給大家看。" },
      { id: "generic-education-010-f", text: "我的能力已經滿到學歷裝不下了。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-010-g", text: "我打算靠能力直接跳過學歷這關。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-010-h", text: "你們每次都嘴巴上說不重要，其實最在意。", archetype: "landmine", retort: "誰在意了，你這什麼意思！" },
    ],
  },
] satisfies Question[];
