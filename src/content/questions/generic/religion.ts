import type { Question } from "@/content/types";

// situations:
// 001 問要不要一起去拜拜
// 002 問有沒有安太歲/點光明燈
// 003 問生肖沖煞要注意什麼
// 004 問要不要去收驚
// 005 問農民曆挑日子的規矩
// 006 問拜拜順便求姻緣工作
// 007 問要不要去廟裡抽籤問事
// 008 說某個習俗一定要照做
// 009 問是不是根本不信這些習俗
// 010 問過年祭拜祖先禮數夠不夠

export default [
  {
    id: "generic-religion-001",
    text: "等一下要去拜拜，你要不要一起去？",
    topic: "religion",
    options: [
      { id: "generic-religion-001-a", text: "去，我還要順便幫你們求今年身體健康。", archetype: "perfect", retort: "哎唷，這孩子有心了。" },
      { id: "generic-religion-001-b", text: "先問拜拜要準備什麼供品，我來幫忙準備。", archetype: "deflect", retort: "好啊，這個交給你最放心。" },
      { id: "generic-religion-001-c", text: "去之前先吃點東西墊墊胃，等一下比較有精神。", archetype: "deflect", retort: "好啦好啦，先吃再說。" },
      { id: "generic-religion-001-d", text: "好啊，我等一下就跟你們一起去……", archetype: "meek", retort: "好，記得誠心一點喔。" },
      { id: "generic-religion-001-e", text: "說實話，我對拜拜不是很熟悉流程……", archetype: "meek", retort: "不熟沒關係，跟著我做就好。" },
      { id: "generic-religion-001-f", text: "我打算順便求個樂透明牌。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-001-g", text: "我要去拜拜順便許願工作變輕鬆。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-001-h", text: "拜拜又沒用，去年拜了還不是一樣。", archetype: "landmine", retort: "怎麼會沒用，心誠則靈！" },
    ],
  },
  {
    id: "generic-religion-002",
    text: "你今年是不是要安太歲、點光明燈啊？",
    topic: "religion",
    options: [
      { id: "generic-religion-002-a", text: "安排好了，順便幫全家的燈也都點亮一下。", archetype: "perfect", retort: "有心了，這孩子想得周到。" },
      { id: "generic-religion-002-b", text: "先問安太歲要準備什麼資料？我來處理。", archetype: "deflect", retort: "身分證跟生辰八字就好啦。" },
      { id: "generic-religion-002-c", text: "安太歲先放著，先問問這道菜的做法。", archetype: "deflect", retort: "改天教你，先吃吧。" },
      { id: "generic-religion-002-d", text: "有想過，只是還沒去廟裡辦……", archetype: "meek", retort: "要趁早去辦，別拖太久。" },
      { id: "generic-religion-002-e", text: "說實話，我對這個不太懂怎麼判斷……", archetype: "meek", retort: "不懂可以問廟裡的人啊。" },
      { id: "generic-religion-002-f", text: "我打算自己在家畫一盞燈意思意思。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-002-g", text: "我覺得手機的手電筒也算光明燈。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-002-h", text: "這種習俗到底有沒有用啊。", archetype: "landmine", retort: "當然有用，你不要亂講！" },
    ],
  },
  {
    id: "generic-religion-003",
    text: "你今年生肖沖煞，要多注意一點喔。",
    topic: "religion",
    options: [
      { id: "generic-religion-003-a", text: "注意了，我今年會小心翼翼地過得順順利利。", archetype: "perfect", retort: "這樣才對，多留意總是好的。" },
      { id: "generic-religion-003-b", text: "先問我要注意哪些方面，我來筆記一下。", archetype: "deflect", retort: "健康跟工作都要多小心啦。" },
      { id: "generic-religion-003-c", text: "沖煞的事先放著，先吃點東西補補運氣。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-religion-003-d", text: "好啦，我會小心一點……", archetype: "meek", retort: "小心一點，別大意了。" },
      { id: "generic-religion-003-e", text: "說實話，我對這個不太在意……", archetype: "meek", retort: "不在意也要稍微留意一下。" },
      { id: "generic-religion-003-f", text: "我打算戴滿身的平安符防護。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-003-g", text: "我覺得穿紅內褲就萬事都好了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-003-h", text: "沖煞這種說法有沒有根據啊。", archetype: "landmine", retort: "這是老祖宗的智慧，你不要亂講！" },
    ],
  },
  {
    id: "generic-religion-004",
    text: "你最近臉色不太好，要不要去收驚？",
    topic: "religion",
    options: [
      { id: "generic-religion-004-a", text: "好啊，收驚順便收一下今年的好運氣。", archetype: "perfect", retort: "這樣想才對，去收一下也好。" },
      { id: "generic-religion-004-b", text: "先問收驚要準備什麼東西，我來準備。", archetype: "deflect", retort: "帶件衣服去就可以了。" },
      { id: "generic-religion-004-c", text: "收驚的事先放著，先吃點東西壓壓驚。", archetype: "deflect", retort: "好啦好啦，先吃再說。" },
      { id: "generic-religion-004-d", text: "好啊，我最近確實有點沒精神……", archetype: "meek", retort: "沒精神就要趕快去收一下。" },
      { id: "generic-religion-004-e", text: "說實話，我對這個半信半疑……", archetype: "meek", retort: "半信半疑也可以去試試看。" },
      { id: "generic-religion-004-f", text: "我打算靠睡飽代替收驚，比較實際。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-004-g", text: "我覺得被你們念一念就等於收驚了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-004-h", text: "收驚有沒有用根本沒人證實過。", archetype: "landmine", retort: "怎麼會沒用，很多人收完都好了！" },
    ],
  },
  {
    id: "generic-religion-005",
    text: "出門辦事要看農民曆，挑個好日子。",
    topic: "religion",
    options: [
      { id: "generic-religion-005-a", text: "看了，我挑的日子連老天爺都說讚。", archetype: "perfect", retort: "哎唷，這孩子還會挑日子。" },
      { id: "generic-religion-005-b", text: "先問你們最近有沒有推薦的好日子？", archetype: "deflect", retort: "這幾天都不錯，你自己選。" },
      { id: "generic-religion-005-c", text: "日子先放著，先問問這道菜是不是特別挑日子做的。", archetype: "deflect", retort: "沒有啦，隨時都能做。" },
      { id: "generic-religion-005-d", text: "有在看，只是不太確定怎麼判斷……", archetype: "meek", retort: "不確定就問廟裡的人啊。" },
      { id: "generic-religion-005-e", text: "說實話，我平常不太看農民曆……", archetype: "meek", retort: "不看也要學著看一下，有用的。" },
      { id: "generic-religion-005-f", text: "我打算靠丟硬幣決定黃道吉日。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-005-g", text: "我覺得每天對我來說都是吉日。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-005-h", text: "看日子這種事根本沒有科學根據。", archetype: "landmine", retort: "老祖宗傳下來的，你不要亂講！" },
    ],
  },
  {
    id: "generic-religion-006",
    text: "等一下拜拜順便幫你求個姻緣工作。",
    topic: "religion",
    options: [
      { id: "generic-religion-006-a", text: "好，那我還要幫你們求身體健康長長久久。", archetype: "perfect", retort: "哎唷，這孩子真貼心。" },
      { id: "generic-religion-006-b", text: "先問拜什麼神明求姻緣比較準？", archetype: "deflect", retort: "這個廟裡的月老最靈驗啦。" },
      { id: "generic-religion-006-c", text: "求姻緣先放著，先問問今天供桌上有沒有甜的。", archetype: "deflect", retort: "有啊，等一下拜完給你吃。" },
      { id: "generic-religion-006-d", text: "好啊，那就麻煩你幫我求一下……", archetype: "meek", retort: "好，誠心一點才有效喔。" },
      { id: "generic-religion-006-e", text: "說實話，我對這個不抱太大期望……", archetype: "meek", retort: "不抱期望也要試試看嘛。" },
      { id: "generic-religion-006-f", text: "我打算順便求個中樂透比較實際。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-006-g", text: "我要求的是不用再被問感情的自由。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-006-h", text: "求姻緣有沒有用，去年也求了還不是一樣。", archetype: "landmine", retort: "誠心不夠啦，你不要亂講！" },
    ],
  },
  {
    id: "generic-religion-007",
    text: "要不要去廟裡抽個籤，問問今年運勢？",
    topic: "religion",
    options: [
      { id: "generic-religion-007-a", text: "去，抽到上上籤我就請大家吃頓好的。", archetype: "perfect", retort: "好啊，那我等你請客囉。" },
      { id: "generic-religion-007-b", text: "先問抽籤要注意什麼禮數，我照著做。", archetype: "deflect", retort: "誠心拜拜就好，其他不用擔心。" },
      { id: "generic-religion-007-c", text: "抽籤先放著，先問問廟旁邊有沒有好吃的。", archetype: "deflect", retort: "有啊，等一下帶你去吃。" },
      { id: "generic-religion-007-d", text: "好啊，我也想知道今年運勢如何……", archetype: "meek", retort: "好，去了要記得誠心求。" },
      { id: "generic-religion-007-e", text: "說實話，我不太懂籤詩怎麼看……", archetype: "meek", retort: "不懂可以問廟裡的師父啊。" },
      { id: "generic-religion-007-f", text: "我打算連抽十次，抽到滿意為止。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-007-g", text: "我覺得籤詩應該可以線上抽比較快。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-007-h", text: "抽籤這種東西哪有什麼準的。", archetype: "landmine", retort: "很準的，你不要亂講話！" },
    ],
  },
  {
    id: "generic-religion-008",
    text: "這個習俗一定要照做，不能亂改。",
    topic: "religion",
    options: [
      { id: "generic-religion-008-a", text: "照做，傳統就是要好好傳承下去。", archetype: "perfect", retort: "這才對，懂得尊重傳統。" },
      { id: "generic-religion-008-b", text: "先問這個習俗是從什麼時候開始的？", archetype: "deflect", retort: "這個說來話長，我慢慢跟你講。" },
      { id: "generic-religion-008-c", text: "習俗先放著，先問問這道應景菜怎麼做的。", archetype: "deflect", retort: "這個也是傳統做法，慢慢學。" },
      { id: "generic-religion-008-d", text: "好啦，我會照著做，不會亂改……", archetype: "meek", retort: "好，這樣才對，要尊重傳統。" },
      { id: "generic-religion-008-e", text: "說實話，我不太懂為什麼要這樣做……", archetype: "meek", retort: "不懂沒關係，做久就懂了。" },
      { id: "generic-religion-008-f", text: "我打算加點創新元素，讓習俗更潮。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-008-g", text: "我覺得習俗應該出APP提醒比較方便。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-008-h", text: "這種習俗是不是有點迷信啊。", archetype: "landmine", retort: "這是老祖宗傳下來的，你不要亂講！" },
    ],
  },
  {
    id: "generic-religion-009",
    text: "你是不是根本不信這些習俗啊？",
    topic: "religion",
    options: [
      { id: "generic-religion-009-a", text: "信啊，我信的是這些習俗背後你們的心意。", archetype: "perfect", retort: "哎唷，這孩子講話真暖。" },
      { id: "generic-religion-009-b", text: "先問你們最相信的習俗是哪一個？", archetype: "deflect", retort: "當然是拜拜求平安這個啦。" },
      { id: "generic-religion-009-c", text: "信不信先放著，先問問這道菜有什麼典故。", archetype: "deflect", retort: "這個典故可多了，慢慢說。" },
      { id: "generic-religion-009-d", text: "說實話，我不是很了解這些習俗……", archetype: "meek", retort: "不了解可以多學學，很有意思的。" },
      { id: "generic-religion-009-e", text: "有些我會照做，有些不太懂原因……", archetype: "meek", retort: "不懂就問，別自己亂猜。" },
      { id: "generic-religion-009-f", text: "我信的是科學跟氣象預報。", archetype: "backfire", retort: "（場面突然安靜下來）" },
      { id: "generic-religion-009-g", text: "我打算兩邊都信，比較保險。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-religion-009-h", text: "這些習俗根本沒有道理可言。", archetype: "landmine", retort: "怎麼會沒道理，你不要亂講話！" },
    ],
  },
  {
    id: "generic-religion-010",
    text: "祭拜祖先的禮數，你做得夠不夠周到？",
    topic: "religion",
    options: [
      { id: "generic-religion-010-a", text: "夠，而且我會多上一炷香，替你們謝謝祖先。", archetype: "perfect", retort: "哎唷，這孩子真的有心。" },
      { id: "generic-religion-010-b", text: "先問拜拜要準備哪些供品，我來張羅。", archetype: "deflect", retort: "水果跟糕點準備好就行了。" },
      { id: "generic-religion-010-c", text: "禮數先放著，先問問這道供品菜是怎麼做的。", archetype: "deflect", retort: "這個做法很講究，慢慢跟你說。" },
      { id: "generic-religion-010-d", text: "有做，只是可能沒有很周到……", archetype: "meek", retort: "不周到要多學一點，這是誠意。" },
      { id: "generic-religion-010-e", text: "說實話，我對這些禮數不是很熟……", archetype: "meek", retort: "不熟可以多問，跟著長輩學。" },
      { id: "generic-religion-010-f", text: "我打算用視訊拜拜，比較方便。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-religion-010-g", text: "我覺得心誠則靈，形式不用太講究。", archetype: "backfire", retort: "（大家沉默，覺得不太妥）" },
      { id: "generic-religion-010-h", text: "拜這麼多有什麼用，祖先又看不到。", archetype: "landmine", retort: "怎麼會看不到，你不要亂講話！" },
    ],
  },
] satisfies Question[];
