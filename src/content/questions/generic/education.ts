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
      { id: "generic-education-001-a", text: "要念研究所可以，幹，你先幫我繳學費。", archetype: "perfect", retort: "（語塞，臉一沉又鬆開）" },
      { id: "generic-education-001-b", text: "靠，你們當年最想念什麼科系？", archetype: "deflect", retort: "我啊，那時候想念醫科呢。" },
      { id: "generic-education-001-c", text: "念不念先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-education-001-d", text: "有考慮過，幹……只是工作太忙沒時間。", archetype: "meek", retort: "忙也要找時間進修啊。" },
      { id: "generic-education-001-e", text: "說實話，我對念書沒有很有興趣……", archetype: "meek", retort: "沒興趣以後會後悔的。" },
      { id: "generic-education-001-f", text: "機掰，我在自學量子力學，比較高深。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-001-g", text: "我打算靠人生經驗抵學分。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-001-h", text: "我學歷高不高不用你操心，幹，老東西操心自己。", archetype: "landmine", retort: "你他媽長輩面前這樣講話！" },
    ],
  },
  {
    id: "generic-education-002",
    text: "你以前書沒念好，現在會不會後悔？",
    topic: "education",
    options: [
      { id: "generic-education-002-a", text: "後不後悔是我的事，幹，你後悔生這張嘴？", archetype: "perfect", retort: "講贏就講贏，快他媽吃菜。" },
      { id: "generic-education-002-b", text: "笑死，你們當年最會念書的是誰？", archetype: "deflect", retort: "那當然是我啊，成績最好！" },
      { id: "generic-education-002-c", text: "後不後悔先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-education-002-d", text: "有時候會覺得，靠……認真一點會不一樣。", archetype: "meek", retort: "會覺得就要趁現在補回來。" },
      { id: "generic-education-002-e", text: "說實話，多少會有點遺憾……", archetype: "meek", retort: "遺憾就要想辦法彌補啊。" },
      { id: "generic-education-002-f", text: "幹，我把念書時間拿去研究人生哲學。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-002-g", text: "他媽的社會大學才是真正的學歷。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-002-h", text: "後不後悔不用你操心，去你的過好自己。", archetype: "landmine", retort: "你他媽沒大沒小，長輩面前！" },
    ],
  },
  {
    id: "generic-education-003",
    text: "你念的科系是不是沒什麼出路？",
    topic: "education",
    options: [
      { id: "generic-education-003-a", text: "有沒有出路，幹，看我出社會不看你嘴。", archetype: "perfect", retort: "（語塞，硬轉話題）" },
      { id: "generic-education-003-b", text: "靠北，你們覺得什麼科系比較有出路？", archetype: "deflect", retort: "當然是穩定的科系比較好啦。" },
      { id: "generic-education-003-c", text: "出路先別提，你們今天菜煮得真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-education-003-d", text: "確實比較冷門，幹……還在努力找方向。", archetype: "meek", retort: "冷門也要多想想轉換跑道。" },
      { id: "generic-education-003-e", text: "說實話，工作機會確實比較少……", archetype: "meek", retort: "少也要多投履歷試試看。" },
      { id: "generic-education-003-f", text: "機掰，我打算當這科系開創產業第一人。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-003-g", text: "我在等這個科系突然爆紅。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-003-h", text: "科系好不好不用你評，去你的老不死讀禮貌系。", archetype: "landmine", retort: "（翻舊帳）你他媽小時候還不是我顧的！" },
    ],
  },
  {
    id: "generic-education-004",
    text: "隔壁的都考上好學校，你當年呢？",
    topic: "education",
    options: [
      { id: "generic-education-004-a", text: "隔壁考上好學校，他媽的現在回家看你嗎？", archetype: "perfect", retort: "你嘴巴真的很利。" },
      { id: "generic-education-004-b", text: "笑死，隔壁的最近在學校過得怎樣？", archetype: "deflect", retort: "聽說過得不錯，很認真呢。" },
      { id: "generic-education-004-c", text: "考不考得上先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-education-004-d", text: "我當年成績普通，幹……沒考上很好的學校。", archetype: "meek", retort: "普通也要繼續努力補回來。" },
      { id: "generic-education-004-e", text: "老實說，這樣比真的會不好受……", archetype: "meek", retort: "難過歸難過，還是要面對現實。" },
      { id: "generic-education-004-f", text: "幹，我當年是故意考差，深藏實力。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-education-004-g", text: "他媽的我把讀書天分留到出社會再用。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-004-h", text: "我當年考得好不好，去你的年年拿出來鞭。", archetype: "landmine", retort: "我他媽是為你好，你這樣對我！" },
    ],
  },
  {
    id: "generic-education-005",
    text: "要不要去考個證照，比較有競爭力？",
    topic: "education",
    options: [
      { id: "generic-education-005-a", text: "要考證照可以，幹，你先去考張閉嘴證。", archetype: "perfect", retort: "（笑笑帶過，不再追問）" },
      { id: "generic-education-005-b", text: "靠，你們覺得哪張證照比較實用？", archetype: "deflect", retort: "這個我不太清楚，你查查看。" },
      { id: "generic-education-005-c", text: "考不考先放著，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-education-005-d", text: "有想過，靠……只是工作太忙沒時間準備。", archetype: "meek", retort: "忙也要找時間，別一直拖。" },
      { id: "generic-education-005-e", text: "說實話，我對考試有點抗拒……", archetype: "meek", retort: "抗拒也要克服，這對你有幫助。" },
      { id: "generic-education-005-f", text: "機掰，我打算靠面相學讓人相信我專業。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-005-g", text: "我在等證照自己寄到家裡來。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-005-h", text: "考不考證照是我的事，去你的老東西很閒。", archetype: "landmine", retort: "（語帶威脅）好啊，你他媽行你上！" },
    ],
  },
  {
    id: "generic-education-006",
    text: "你英文好不好？現在很重要耶。",
    topic: "education",
    options: [
      { id: "generic-education-006-a", text: "英文好不好，幹，你要先跟我對話一句？", archetype: "perfect", retort: "是喔，你倒是很快嘴。" },
      { id: "generic-education-006-b", text: "靠北，你們最近有沒有想學什麼語言？", archetype: "deflect", retort: "有想學日文，但太老了學不動。" },
      { id: "generic-education-006-c", text: "英文的事先別提，你們今天菜煮得真好。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-education-006-d", text: "普通程度，幹……工作上簡單溝通還可以。", archetype: "meek", retort: "普通也要多加強一下才好。" },
      { id: "generic-education-006-e", text: "說實話，我英文真的不太好……", archetype: "meek", retort: "不好要找時間去補習一下。" },
      { id: "generic-education-006-f", text: "他媽的我在自學十種語言，還沒學會第一種。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-006-g", text: "幹，我打算靠比手畫腳環遊世界。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-006-h", text: "英文好不好不用你評分，去你的講句台語試試。", archetype: "landmine", retort: "你他媽這什麼態度，欠管教！" },
    ],
  },
  {
    id: "generic-education-007",
    text: "書讀那麼多，出社會還不是這樣？",
    topic: "education",
    options: [
      { id: "generic-education-007-a", text: "這樣挺好的，幹，至少不用聽你這種道理。", archetype: "perfect", retort: "（語塞，起身倒茶）" },
      { id: "generic-education-007-b", text: "笑死，你們當年最喜歡的科目是什麼？", archetype: "deflect", retort: "我啊，最喜歡的是下課。" },
      { id: "generic-education-007-c", text: "讀書的事先放著，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-education-007-d", text: "確實學校教的，幹……跟現實有點不一樣。", archetype: "meek", retort: "不一樣也要學著適應現實。" },
      { id: "generic-education-007-e", text: "說實話，出社會後很多都要重新學……", archetype: "meek", retort: "重新學是正常的，別氣餒。" },
      { id: "generic-education-007-f", text: "機掰，書都讀到腦後去了，現在靠直覺。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-education-007-g", text: "我在走實踐派，理論都是參考用的。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-007-h", text: "書讀多讀少是我的事，幹，老不死你才沒讀書。", archetype: "landmine", retort: "（甩手離開）跟你他媽講不下去！" },
    ],
  },
  {
    id: "generic-education-008",
    text: "要不要出國念個書，鍍個金回來？",
    topic: "education",
    options: [
      { id: "generic-education-008-a", text: "要出國可以，幹，你先幫我辦簽證機票。", archetype: "perfect", retort: "你這反應，跟你媽一個樣。" },
      { id: "generic-education-008-b", text: "靠，你們最想我去哪個國家念書？", archetype: "deflect", retort: "當然是離家近一點的比較好。" },
      { id: "generic-education-008-c", text: "出不出國先放著，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-education-008-d", text: "有想過，幹……只是預算真的不太夠。", archetype: "meek", retort: "不夠就要提早存錢規劃。" },
      { id: "generic-education-008-e", text: "說實話，我對出國念書有點害怕……", archetype: "meek", retort: "害怕也要試試看，別限制自己。" },
      { id: "generic-education-008-f", text: "他媽的我打算靠追劇自學留學經驗。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-008-g", text: "幹，我在等免費留學機會自己找上門。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-008-h", text: "出不出國不用你操心，去死，操心你自己。", archetype: "landmine", retort: "現在小孩他媽的都這樣厚！" },
    ],
  },
  {
    id: "generic-education-009",
    text: "你以前成績單上都排第幾名啊？",
    topic: "education",
    options: [
      { id: "generic-education-009-a", text: "成績單早燒了，幹，你的記性倒燒不掉。", archetype: "perfect", retort: "（假笑，拍拍你肩膀）" },
      { id: "generic-education-009-b", text: "靠北，你們當年考第幾名比較快。", archetype: "deflect", retort: "那當然是我啊，年年第一名！" },
      { id: "generic-education-009-c", text: "名次先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-education-009-d", text: "成績普通，幹……都在中間名次而已。", archetype: "meek", retort: "中間也要往前擠一擠啊。" },
      { id: "generic-education-009-e", text: "說實話，我成績不是很好……", archetype: "meek", retort: "不好也不用太在意，重要的是現在。" },
      { id: "generic-education-009-f", text: "機掰，我那時候故意考低，測試老師水準。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-education-009-g", text: "我的成績單被我藝術性地弄丟了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-009-h", text: "我排第幾名不用你記，去你的老東西記不清帳。", archetype: "landmine", retort: "（臉一沉）你他媽這什麼意思！" },
    ],
  },
  {
    id: "generic-education-010",
    text: "學歷不重要啦，能力比較重要，是不是？",
    topic: "education",
    options: [
      { id: "generic-education-010-a", text: "對，幹，所以能力好的人不會拿學歷酸人。", archetype: "perfect", retort: "算了算了，不跟你計較。" },
      { id: "generic-education-010-b", text: "笑死，你們覺得什麼能力最重要？", archetype: "deflect", retort: "當然是會做人比較重要啦。" },
      { id: "generic-education-010-c", text: "能力的事先放著，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-education-010-d", text: "希望是這樣，靠……我還在累積能力。", archetype: "meek", retort: "累積能力要趁年輕多努力。" },
      { id: "generic-education-010-e", text: "說實話，我也希望能力比較被看重……", archetype: "meek", retort: "希望歸希望，還是要證明給大家看。" },
      { id: "generic-education-010-f", text: "他媽的我的能力已經滿到學歷裝不下。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-education-010-g", text: "幹，我打算靠能力直接跳過學歷這關。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-education-010-h", text: "學歷重不重要不用你下結論，去死閉嘴吃飯。", archetype: "landmine", retort: "好啊，隨便你，反正你他媽最大！" },
    ],
  },
] satisfies Question[];
