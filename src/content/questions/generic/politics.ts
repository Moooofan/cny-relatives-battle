import type { Question } from "@/content/types";

// situations:
// 001 問支持哪一邊(泛稱)
// 002 說年輕人都被網路帶風向
// 003 說電視上那個講的才對
// 004 說世代對立年輕人不懂事
// 005 問對某個補助政策的看法
// 006 說以前政治比較單純
// 007 說某新聞議題大驚小怪
// 008 問要不要一起看政論節目
// 009 問年輕人不投票不關心政治
// 010 說好過年不聊政治卻還在聊(反諷)

export default [
  {
    id: "generic-politics-001",
    text: "你到底支持哪一邊啊？講清楚。",
    topic: "politics",
    options: [
      { id: "generic-politics-001-a", text: "幹，我支持的是快點吃飯那一邊。", archetype: "perfect", retort: "（語塞，臉一沉又鬆開）" },
      { id: "generic-politics-001-b", text: "靠，你們覺得今年菜色哪一道最讚？", archetype: "deflect", retort: "當然是這道啊，你眼光不錯。" },
      { id: "generic-politics-001-c", text: "立場先放一邊，紅包立場比較重要。", archetype: "deflect", retort: "你這孩子，很會轉話題。" },
      { id: "generic-politics-001-d", text: "我沒有很深入研究，幹……不太敢講。", archetype: "meek", retort: "不研究也要有自己的想法啊。" },
      { id: "generic-politics-001-e", text: "說實話，這個話題我不太想聊……", archetype: "meek", retort: "不聊也要知道一下時事吧。" },
      { id: "generic-politics-001-f", text: "機掰，我是中立派，誰講話都點頭。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-politics-001-g", text: "我支持的是週休三日那一派。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-001-h", text: "我支持誰不用你管，去你的老東西顧血壓。", archetype: "landmine", retort: "你他媽長輩面前這樣講話！" },
    ],
  },
  {
    id: "generic-politics-002",
    text: "你們年輕人都被網路帶風向啦。",
    topic: "politics",
    options: [
      { id: "generic-politics-002-a", text: "網路帶風向，幹，你的長輩圖倒很準時。", archetype: "perfect", retort: "講贏就講贏，快他媽吃菜。" },
      { id: "generic-politics-002-b", text: "笑死，你們平常都看哪個節目的新聞？", archetype: "deflect", retort: "我都看那個下午的政論節目。" },
      { id: "generic-politics-002-c", text: "風向先別提，你們今天菜煮得真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-politics-002-d", text: "可能吧，幹……資訊太多很難分辨。", archetype: "meek", retort: "難分辨也要多方查證啊。" },
      { id: "generic-politics-002-e", text: "說實話，我平常也沒有很認真看新聞……", archetype: "meek", retort: "不看新聞怎麼跟得上時事？" },
      { id: "generic-politics-002-f", text: "他媽的我看的都是迷因，比較有娛樂性。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-politics-002-g", text: "幹，我的資訊來源是隔壁鄰居轉述的。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-002-h", text: "誰帶風向不用你認證，去你的查證再轉發。", archetype: "landmine", retort: "長輩面前這樣講話，他媽的欠教訓！" },
    ],
  },
  {
    id: "generic-politics-003",
    text: "電視上那個講的才對，你們懂什麼。",
    topic: "politics",
    options: [
      { id: "generic-politics-003-a", text: "他講得對，幹，猜中的次數你數過嗎？", archetype: "perfect", retort: "（語塞，硬轉話題）" },
      { id: "generic-politics-003-b", text: "靠北，那個節目今天有講什麼新的？", archetype: "deflect", retort: "有啊，講了半天都在吵。" },
      { id: "generic-politics-003-c", text: "誰對誰錯先別提，先吃菜比較重要。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-politics-003-d", text: "我沒有很認真看，幹……不太清楚細節。", archetype: "meek", retort: "不清楚也要花點時間了解一下。" },
      { id: "generic-politics-003-e", text: "說實話，我對這個議題沒什麼立場……", archetype: "meek", retort: "沒立場也要多聽多想啊。" },
      { id: "generic-politics-003-f", text: "機掰，電視裡的人都在演戲，包括你信的。", archetype: "backfire", retort: "（場面突然安靜下來）" },
      { id: "generic-politics-003-g", text: "我覺得政論節目比八點檔還精彩。", archetype: "backfire", retort: "（大家不知道怎麼接）" },
      { id: "generic-politics-003-h", text: "誰對誰錯不用你認證，幹，老不死關電視吃飯。", archetype: "landmine", retort: "（翻舊帳）你他媽小時候還不是我顧的！" },
    ],
  },
  {
    id: "generic-politics-004",
    text: "你們年輕人就是不懂事，才會這樣想。",
    topic: "politics",
    options: [
      { id: "generic-politics-004-a", text: "不懂事的定義，幹，是不是包含逢年說教。", archetype: "perfect", retort: "你嘴巴真的很利。" },
      { id: "generic-politics-004-b", text: "笑死，你們年輕的時候是不是也叛逆過？", archetype: "deflect", retort: "那當然，我以前也很衝的。" },
      { id: "generic-politics-004-c", text: "懂不懂事先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-politics-004-d", text: "可能想法不太一樣，幹……還在學習。", archetype: "meek", retort: "學習是好事，多聽聽長輩的話。" },
      { id: "generic-politics-004-e", text: "說實話，有些事情我們真的不太懂……", archetype: "meek", retort: "不懂要多問，別自己悶著猜。" },
      { id: "generic-politics-004-f", text: "他媽的我們這代是被科技養大的，比較聰明。", archetype: "backfire", retort: "（場面突然安靜下來）" },
      { id: "generic-politics-004-g", text: "幹，我覺得我們是進化版，你們是初代。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-004-h", text: "懂不懂事不用你評分，去死管好你自己。", archetype: "landmine", retort: "我他媽是為你好，你這樣對我！" },
    ],
  },
  {
    id: "generic-politics-005",
    text: "這個補助政策，你覺得到底好不好？",
    topic: "politics",
    options: [
      { id: "generic-politics-005-a", text: "好不好，幹，你領到補助有分我一點嗎？", archetype: "perfect", retort: "（笑笑帶過，不再追問）" },
      { id: "generic-politics-005-b", text: "靠，你們覺得這個政策對我們家有幫助嗎？", archetype: "deflect", retort: "應該有一點啦，慢慢看。" },
      { id: "generic-politics-005-c", text: "政策先別提，紅包政策比較讓人期待。", archetype: "deflect", retort: "你這孩子，很會轉話題。" },
      { id: "generic-politics-005-d", text: "我沒有很深入研究，幹……不太敢下定論。", archetype: "meek", retort: "不研究也要關心一下時事啊。" },
      { id: "generic-politics-005-e", text: "說實話，這個議題我還在了解……", archetype: "meek", retort: "了解要花點時間，多看看新聞。" },
      { id: "generic-politics-005-f", text: "機掰，政策應該公投決定吃什麼菜。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-politics-005-g", text: "我對政策的意見是，先讓我吃飽再說。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-005-h", text: "政策好壞不用你下結論，去你的老東西讀新聞。", archetype: "landmine", retort: "（語帶威脅）好啊，你他媽行你上！" },
    ],
  },
  {
    id: "generic-politics-006",
    text: "我們那時候政治比較單純，不像現在。",
    topic: "politics",
    options: [
      { id: "generic-politics-006-a", text: "單純是真的，幹，你講的次數倒不單純。", archetype: "perfect", retort: "是喔，你倒是很快嘴。" },
      { id: "generic-politics-006-b", text: "靠北，那時候最印象深刻的事是什麼？", archetype: "deflect", retort: "那個可多了，講三天都講不完。" },
      { id: "generic-politics-006-c", text: "單不單純先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-politics-006-d", text: "現在資訊比較多，幹……確實比較複雜。", archetype: "meek", retort: "複雜也要學著看清楚。" },
      { id: "generic-politics-006-e", text: "說實話，我也覺得現在有點亂……", archetype: "meek", retort: "亂歸亂，還是要保持自己的判斷。" },
      { id: "generic-politics-006-f", text: "他媽的我覺得複雜是因為手機太多台。", archetype: "backfire", retort: "（沒人聽懂在講什麼）" },
      { id: "generic-politics-006-g", text: "幹，我打算穿越回去體驗單純的年代。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-006-h", text: "那時候單純不用你講，去你的講話才複雜。", archetype: "landmine", retort: "你他媽這什麼態度，欠管教！" },
    ],
  },
  {
    id: "generic-politics-007",
    text: "這種新聞有什麼好報的，大驚小怪。",
    topic: "politics",
    options: [
      { id: "generic-politics-007-a", text: "不大驚小怪，幹，你轉發的長輩圖算什麼。", archetype: "perfect", retort: "（語塞，起身倒茶）" },
      { id: "generic-politics-007-b", text: "笑死，今天還看到什麼有趣的新聞？", archetype: "deflect", retort: "有啊，那個藝人的新聞挺有趣的。" },
      { id: "generic-politics-007-c", text: "新聞先別提，你們今天菜煮得真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-politics-007-d", text: "我沒有很關注，幹……不太清楚細節。", archetype: "meek", retort: "不清楚也要多花點時間了解。" },
      { id: "generic-politics-007-e", text: "說實話，這種新聞我看了會有點焦慮……", archetype: "meek", retort: "焦慮就少看一點，多陪陪家人。" },
      { id: "generic-politics-007-f", text: "機掰，我覺得新聞都是演的，比八點檔誇張。", archetype: "backfire", retort: "（場面突然安靜下來）" },
      { id: "generic-politics-007-g", text: "我只看氣象跟樂透開獎。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-007-h", text: "新聞好不好報不用你評，幹，老不死嘴巴閉上。", archetype: "landmine", retort: "（甩手離開）跟你他媽講不下去！" },
    ],
  },
  {
    id: "generic-politics-008",
    text: "來，一起看這個政論節目，很精彩。",
    topic: "politics",
    options: [
      { id: "generic-politics-008-a", text: "精彩，幹，你的血壓應該比節目精彩。", archetype: "perfect", retort: "你這反應，跟你媽一個樣。" },
      { id: "generic-politics-008-b", text: "靠，等一下有沒有其他節目更好看？", archetype: "deflect", retort: "有，等一下有搞笑的節目。" },
      { id: "generic-politics-008-c", text: "節目先別提，這道菜要不要先吃一口？", archetype: "deflect", retort: "好啦好啦，先吃再說。" },
      { id: "generic-politics-008-d", text: "看是可以，幹……只是我對政治沒興趣。", archetype: "meek", retort: "沒興趣也可以學著關心一下。" },
      { id: "generic-politics-008-e", text: "說實話，看這個我會覺得有點煩躁……", archetype: "meek", retort: "煩躁就轉台看點輕鬆的。" },
      { id: "generic-politics-008-f", text: "他媽的我看政論節目是練習抗壓性。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-politics-008-g", text: "幹，我打算邊看邊配這道菜當下酒菜。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-008-h", text: "看不看是我的事，去死，激動先看醫生。", archetype: "landmine", retort: "現在小孩他媽的都這樣厚！" },
    ],
  },
  {
    id: "generic-politics-009",
    text: "你們年輕人是不是都不投票、不關心？",
    topic: "politics",
    options: [
      { id: "generic-politics-009-a", text: "不關心，幹，這句是第幾年重播了？", archetype: "perfect", retort: "（假笑，拍拍你肩膀）" },
      { id: "generic-politics-009-b", text: "靠北，投票的時候都排多久的隊？", archetype: "deflect", retort: "那個可久了，排了快一小時。" },
      { id: "generic-politics-009-c", text: "投不投票先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-politics-009-d", text: "說實話，幹……有時候真的比較懶得研究。", archetype: "meek", retort: "懶也要花點時間了解一下。" },
      { id: "generic-politics-009-e", text: "工作太忙，有時候會錯過一些時事……", archetype: "meek", retort: "忙也要抽空關心國家大事。" },
      { id: "generic-politics-009-f", text: "機掰，我都用擲筊決定要不要去投票。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-politics-009-g", text: "我覺得投票日剛好適合補眠。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-009-h", text: "投不投票是我的事，去你的老東西別查勤。", archetype: "landmine", retort: "（臉一沉）你他媽這什麼意思！" },
    ],
  },
  {
    id: "generic-politics-010",
    text: "說好過年不聊政治的，你怎麼還在聊？",
    topic: "politics",
    options: [
      { id: "generic-politics-010-a", text: "對啊，幹，是誰先破的戒，你先自首。", archetype: "perfect", retort: "算了算了，不跟你計較。" },
      { id: "generic-politics-010-b", text: "笑死，今年紅包行情是不是要調漲？", archetype: "deflect", retort: "喔對，這個比較重要啦！" },
      { id: "generic-politics-010-c", text: "政治的事先放著，這道菜真的很好吃。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-politics-010-d", text: "是你們先提起的，幹……我只是回應一下。", archetype: "meek", retort: "好啦好啦，那我們換話題。" },
      { id: "generic-politics-010-e", text: "說實話，我也不想聊，只是不好意思打斷……", archetype: "meek", retort: "不好意思也要適時提醒一下。" },
      { id: "generic-politics-010-f", text: "他媽的我提政治只是想測家庭和諧指數。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-politics-010-g", text: "幹，我以為今年的禁忌話題升級了，猜錯了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-politics-010-h", text: "聊不聊政治是你先起頭，去死先閉嘴的是你。", archetype: "landmine", retort: "好啊，隨便你，反正你他媽最大！" },
    ],
  },
] satisfies Question[];
