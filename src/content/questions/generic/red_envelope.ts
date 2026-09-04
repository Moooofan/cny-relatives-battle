import type { Question } from "@/content/types";

// situations:
// 001 問你今年紅包打算包多少給小朋友
// 002 問你收到多少紅包
// 003 說紅包行情要跟上時代
// 004 問紅包是不是要繳回去給父母
// 005 說小時候紅包都被沒收
// 006 問要不要包紅包給某晚輩
// 007 說電子紅包轉帳沒誠意
// 008 問紅包袋要不要挑吉利數字
// 009 說壓歲錢要拿去投資理財
// 010 問紅包金額是不是要隨物價調漲

export default [
  {
    id: "generic-red_envelope-001",
    text: "你今年紅包打算包多少給小朋友？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-001-a", text: "包多少是心意，不是你查稅的項目。", archetype: "perfect", retort: "（語塞，假笑帶過）" },
      { id: "generic-red_envelope-001-b", text: "先問你們今年紅包行情大概是多少？", archetype: "deflect", retort: "這個要看關係啦，看你囉。" },
      { id: "generic-red_envelope-001-c", text: "包多少先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-red_envelope-001-d", text: "看預算吧，可能沒辦法包太多……", archetype: "meek", retort: "沒關係，意思到就好。" },
      { id: "generic-red_envelope-001-e", text: "說實話，今年手頭比較緊……", archetype: "meek", retort: "緊一點也要包個吉利數字。" },
      { id: "generic-red_envelope-001-f", text: "我打算用愛心代替金額，比較有創意。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-001-g", text: "我準備包一張手寫祝福卡加一元硬幣。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-001-h", text: "包多少是我的事，你算得比會計還細。", archetype: "landmine", retort: "你這什麼態度，欠人說教！" },
    ],
  },
  {
    id: "generic-red_envelope-002",
    text: "你今年收了多少紅包啊，說來聽聽。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-002-a", text: "收多少是我的事，你比國稅局還關心。", archetype: "perfect", retort: "（語塞，轉頭跟別人講）" },
      { id: "generic-red_envelope-002-b", text: "先問你們今年包的心意是不是比較特別？", archetype: "deflect", retort: "特別啊，每年都特地挑的。" },
      { id: "generic-red_envelope-002-c", text: "紅包先別提，這道菜真的很好吃。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-red_envelope-002-d", text: "還沒算清楚，等一下再跟你們報告……", archetype: "meek", retort: "算清楚要跟我們說一聲喔。" },
      { id: "generic-red_envelope-002-e", text: "說實話，收到的沒有很多啦……", archetype: "meek", retort: "沒關係，重點是有心。" },
      { id: "generic-red_envelope-002-f", text: "我把紅包都拿去買樂透了，賭一把。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-red_envelope-002-g", text: "我收到的紅包已經精神上花光了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-002-h", text: "收多少不用你查，你查得比警察還兇。", archetype: "landmine", retort: "（氣到講台語）你這什麼囡仔講話！" },
    ],
  },
  {
    id: "generic-red_envelope-003",
    text: "紅包行情都漲了，你要跟上時代喔。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-003-a", text: "行情漲了，那你的薪水漲了沒，先講。", archetype: "perfect", retort: "（語塞，臉色微妙）" },
      { id: "generic-red_envelope-003-b", text: "先問你們，今年行情大概漲到多少？", archetype: "deflect", retort: "聽說現在都要六百起跳了。" },
      { id: "generic-red_envelope-003-c", text: "行情先別提，你們今天的年菜真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-red_envelope-003-d", text: "會盡量跟上，只是今年手頭比較緊……", archetype: "meek", retort: "緊也要量力而為，不用勉強。" },
      { id: "generic-red_envelope-003-e", text: "說實話，我覺得行情有點跟不上了……", archetype: "meek", retort: "跟不上也沒關係，心意最重要。" },
      { id: "generic-red_envelope-003-f", text: "我打算發行限量版紅包，物以稀為貴。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-003-g", text: "我在等紅包行情自己降回來。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-003-h", text: "漲不漲是我的事，你算得比通膨還精。", archetype: "landmine", retort: "（翻舊帳）我當年多疼你，你這樣講我！" },
    ],
  },
  {
    id: "generic-red_envelope-004",
    text: "你的紅包是不是要繳回去給爸媽？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-004-a", text: "繳不繳是我家的事，你比國稅局還積極。", archetype: "perfect", retort: "呵呵…你很會講話喔。" },
      { id: "generic-red_envelope-004-b", text: "先問你們小時候紅包都是自己留著嗎？", archetype: "deflect", retort: "哪有，都被收走存起來啦。" },
      { id: "generic-red_envelope-004-c", text: "繳不繳先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-red_envelope-004-d", text: "有繳一部分，剩下的自己留著……", archetype: "meek", retort: "留著要好好規劃使用喔。" },
      { id: "generic-red_envelope-004-e", text: "說實話，這是我自己賺的，有點不想繳……", archetype: "meek", retort: "不想繳也要體諒爸媽的用心。" },
      { id: "generic-red_envelope-004-f", text: "我打算把紅包投資變成傳家寶。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-red_envelope-004-g", text: "我把紅包放銀行當作定存做紀念。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-004-h", text: "繳不繳是我家的事，不用你來過問。", archetype: "landmine", retort: "你敢這樣講長輩，是想被唸嗎！" },
    ],
  },
  {
    id: "generic-red_envelope-005",
    text: "你小時候紅包不都是被收走的嗎？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-005-a", text: "被收走的，你當年是不是也貪了一些？", archetype: "perfect", retort: "你這孩子，反應真快。" },
      { id: "generic-red_envelope-005-b", text: "先問你們，那時候收走的錢都用來做什麼？", archetype: "deflect", retort: "當然是存起來當教育費啊。" },
      { id: "generic-red_envelope-005-c", text: "被收的事先別提，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-red_envelope-005-d", text: "是啊，那時候都乖乖交出去……", archetype: "meek", retort: "乖乖交出去才是懂事的孩子。" },
      { id: "generic-red_envelope-005-e", text: "說實話，那時候有點捨不得……", archetype: "meek", retort: "捨不得也是為你好啊。" },
      { id: "generic-red_envelope-005-f", text: "我那時候藏了一個私房小金庫。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-red_envelope-005-g", text: "我把小時候的紅包記憶當創傷來療癒。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-005-h", text: "當年的事你少提，你自己心裡有數。", archetype: "landmine", retort: "好心關心還被兇，真是的！" },
    ],
  },
  {
    id: "generic-red_envelope-006",
    text: "那個晚輩你要不要也包一個紅包？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-006-a", text: "包可以，你要不要先示範一下行情？", archetype: "perfect", retort: "（假笑）你這孩子真敢講。" },
      { id: "generic-red_envelope-006-b", text: "先問他今年表現怎麼樣，值不值得包大一點？", archetype: "deflect", retort: "表現不錯啊，你包大方一點！" },
      { id: "generic-red_envelope-006-c", text: "包不包先放著，先問問今天有沒有他愛吃的菜。", archetype: "deflect", retort: "有啊，特地為他準備的。" },
      { id: "generic-red_envelope-006-d", text: "會包，只是今年可能包少一點……", archetype: "meek", retort: "少一點也沒關係，有心就好。" },
      { id: "generic-red_envelope-006-e", text: "說實話，我沒想到還要包給他……", archetype: "meek", retort: "沒想到也要趕快準備一下。" },
      { id: "generic-red_envelope-006-f", text: "我打算包給他一張加油打氣的紙條。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-006-g", text: "我準備了一個空紅包袋當作驚喜。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-006-h", text: "包不包干你屁事，你先把自己紅包包好。", archetype: "landmine", retort: "你這什麼話，明年不用來了！" },
    ],
  },
  {
    id: "generic-red_envelope-007",
    text: "用轉帳包紅包，太沒誠意了吧？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-007-a", text: "誠意是心意，不是你在意的那張紙。", archetype: "perfect", retort: "是喔，算你厲害。" },
      { id: "generic-red_envelope-007-b", text: "先問你們，喜歡收紅包袋還是收現金？", archetype: "deflect", retort: "當然是紅包袋比較有感覺啦。" },
      { id: "generic-red_envelope-007-c", text: "誠不誠意先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-red_envelope-007-d", text: "說實話，我覺得轉帳比較方便……", archetype: "meek", retort: "方便歸方便，還是要有點儀式感。" },
      { id: "generic-red_envelope-007-e", text: "現金不太夠帶，只好用轉帳補……", archetype: "meek", retort: "下次記得先準備現金喔。" },
      { id: "generic-red_envelope-007-f", text: "我打算用虛擬貨幣包紅包，比較潮。", archetype: "backfire", retort: "（沒人聽懂在講什麼）" },
      { id: "generic-red_envelope-007-g", text: "我把轉帳截圖印出來當紅包袋。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-007-h", text: "誠不誠意是我的事，不用你來打分數。", archetype: "landmine", retort: "（臉色一沉）你這什麼口氣！" },
    ],
  },
  {
    id: "generic-red_envelope-008",
    text: "紅包袋要挑新的，數字也要吉利喔。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-008-a", text: "吉利的話，你講話也可以挑一下再出口。", archetype: "perfect", retort: "（語塞，喝茶掩飾）" },
      { id: "generic-red_envelope-008-b", text: "先問你們最喜歡什麼吉利數字？", archetype: "deflect", retort: "當然是八跟六比較吉利啦。" },
      { id: "generic-red_envelope-008-c", text: "數字先別提，你們今天的紅包袋真好看。", archetype: "deflect", retort: "喜歡的話送你幾個。" },
      { id: "generic-red_envelope-008-d", text: "有在準備，還在想要包什麼數字……", archetype: "meek", retort: "快點決定，別拖到最後一刻。" },
      { id: "generic-red_envelope-008-e", text: "說實話，我對數字沒有很講究……", archetype: "meek", retort: "講究一下嘛，這是傳統。" },
      { id: "generic-red_envelope-008-f", text: "我打算包一個誰都看不懂的質數。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-008-g", text: "我準備了會發光的紅包袋，比較潮。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-008-h", text: "挑不挑是我的事，你講究得比命理師還兇。", archetype: "landmine", retort: "我是關心你，你兇什麼兇！" },
    ],
  },
  {
    id: "generic-red_envelope-009",
    text: "壓歲錢不要亂花，要拿去投資理財。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-009-a", text: "投資理財好，第一支先賣掉你的碎念。", archetype: "perfect", retort: "你這張嘴，真的不饒人。" },
      { id: "generic-red_envelope-009-b", text: "先問你們有沒有推薦的理財方式？", archetype: "deflect", retort: "這個要問懂理財的朋友比較準。" },
      { id: "generic-red_envelope-009-c", text: "投資的事先放著，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-red_envelope-009-d", text: "有想過，只是不太懂投資規則……", archetype: "meek", retort: "不懂要學，別亂花掉。" },
      { id: "generic-red_envelope-009-e", text: "說實話，我可能會拿去花掉一部分……", archetype: "meek", retort: "花掉太可惜，要學會存錢。" },
      { id: "generic-red_envelope-009-f", text: "我打算全部拿去買樂透翻身。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-009-g", text: "我的投資策略是放在枕頭底下。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-009-h", text: "花不花干你屁事，你先管好你自己的錢包。", archetype: "landmine", retort: "（找救兵）你們聽聽看她剛剛講什麼！" },
    ],
  },
  {
    id: "generic-red_envelope-010",
    text: "現在物價漲這麼多，紅包是不是也要跟著漲？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-010-a", text: "要漲可以，你的紅包先漲給我看。", archetype: "perfect", retort: "（尷尬笑笑，換話題）" },
      { id: "generic-red_envelope-010-b", text: "先問你們，物價漲最多的是哪一項？", archetype: "deflect", retort: "當然是外食費啊，漲得誇張。" },
      { id: "generic-red_envelope-010-c", text: "漲不漲先別提，你們今天的年菜真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-red_envelope-010-d", text: "會盡量調整，只是今年手頭比較緊……", archetype: "meek", retort: "緊也要量力調整一下。" },
      { id: "generic-red_envelope-010-e", text: "說實話，我覺得跟不太上物價漲幅……", archetype: "meek", retort: "跟不上也沒關係，心意最重要。" },
      { id: "generic-red_envelope-010-f", text: "我打算發行客製化通膨紅包，與時俱進。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-010-g", text: "我在等薪水先漲，紅包才敢漲。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-010-h", text: "漲不漲是我的事，你算得比主計處還細。", archetype: "landmine", retort: "你這什麼口氣，太誇張了！" },
    ],
  },
] satisfies Question[];
