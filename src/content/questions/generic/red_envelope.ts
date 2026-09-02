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
      { id: "generic-red_envelope-001-a", text: "包多少不重要，重點是包出去的都是誠意。", archetype: "perfect", retort: "說得好，誠意最重要。" },
      { id: "generic-red_envelope-001-b", text: "先問你們今年紅包行情大概是多少？", archetype: "deflect", retort: "這個要看關係啦，看你囉。" },
      { id: "generic-red_envelope-001-c", text: "包多少先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近保養有效。" },
      { id: "generic-red_envelope-001-d", text: "看預算吧，可能沒辦法包太多……", archetype: "meek", retort: "沒關係，意思到就好。" },
      { id: "generic-red_envelope-001-e", text: "說實話，今年手頭比較緊……", archetype: "meek", retort: "緊一點也要包個吉利數字。" },
      { id: "generic-red_envelope-001-f", text: "我打算用愛心代替金額，比較有創意。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-001-g", text: "我準備包一張手寫祝福卡加一元硬幣。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-001-h", text: "包多少是我的事，不用你們一直問。", archetype: "landmine", retort: "問一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-red_envelope-002",
    text: "你今年收了多少紅包啊，說來聽聽。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-002-a", text: "收到的不只是錢，還有你們滿滿的心意。", archetype: "perfect", retort: "哎唷，這孩子嘴巴真甜。" },
      { id: "generic-red_envelope-002-b", text: "先問你們今年包的心意是不是比較特別？", archetype: "deflect", retort: "特別啊，每年都特地挑的。" },
      { id: "generic-red_envelope-002-c", text: "紅包先別提，這道菜真的很好吃。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-red_envelope-002-d", text: "還沒算清楚，等一下再跟你們報告……", archetype: "meek", retort: "算清楚要跟我們說一聲喔。" },
      { id: "generic-red_envelope-002-e", text: "說實話，收到的沒有很多啦……", archetype: "meek", retort: "沒關係，重點是有心。" },
      { id: "generic-red_envelope-002-f", text: "我把紅包都拿去買樂透了，賭一把。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-red_envelope-002-g", text: "我收到的紅包已經精神上花光了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-002-h", text: "收多少是我的隱私，不用你們問。", archetype: "landmine", retort: "問一下也要生氣，真受不了。" },
    ],
  },
  {
    id: "generic-red_envelope-003",
    text: "紅包行情都漲了，你要跟上時代喔。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-003-a", text: "跟上，我今年包的絕對讓你們有面子。", archetype: "perfect", retort: "這才對嘛，有心就好。" },
      { id: "generic-red_envelope-003-b", text: "先問你們，今年行情大概漲到多少？", archetype: "deflect", retort: "聽說現在都要六百起跳了。" },
      { id: "generic-red_envelope-003-c", text: "行情先別提，你們今天的年菜真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-red_envelope-003-d", text: "會盡量跟上，只是今年手頭比較緊……", archetype: "meek", retort: "緊也要量力而為，不用勉強。" },
      { id: "generic-red_envelope-003-e", text: "說實話，我覺得行情有點跟不上了……", archetype: "meek", retort: "跟不上也沒關係，心意最重要。" },
      { id: "generic-red_envelope-003-f", text: "我打算發行限量版紅包，物以稀為貴。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-003-g", text: "我在等紅包行情自己降回來。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-003-h", text: "行情高低不用你們一直比較。", archetype: "landmine", retort: "比較一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-red_envelope-004",
    text: "你的紅包是不是要繳回去給爸媽？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-004-a", text: "有繳，我們家的紅包循環比銀行利率還高。", archetype: "perfect", retort: "你這孩子，講話真的一套。" },
      { id: "generic-red_envelope-004-b", text: "先問你們小時候紅包都是自己留著嗎？", archetype: "deflect", retort: "哪有，都被收走存起來啦。" },
      { id: "generic-red_envelope-004-c", text: "繳不繳先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-red_envelope-004-d", text: "有繳一部分，剩下的自己留著……", archetype: "meek", retort: "留著要好好規劃使用喔。" },
      { id: "generic-red_envelope-004-e", text: "說實話，這是我自己賺的，有點不想繳……", archetype: "meek", retort: "不想繳也要體諒爸媽的用心。" },
      { id: "generic-red_envelope-004-f", text: "我打算把紅包投資變成傳家寶。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-red_envelope-004-g", text: "我把紅包放銀行當作定存做紀念。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-004-h", text: "紅包是我自己的，不用你們一直問。", archetype: "landmine", retort: "問一下也要生氣，真受不了。" },
    ],
  },
  {
    id: "generic-red_envelope-005",
    text: "你小時候紅包不都是被收走的嗎？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-005-a", text: "對啊，所以現在收到的每一塊都特別珍惜。", archetype: "perfect", retort: "哎唷，這孩子懂得感恩。" },
      { id: "generic-red_envelope-005-b", text: "先問你們，那時候收走的錢都用來做什麼？", archetype: "deflect", retort: "當然是存起來當教育費啊。" },
      { id: "generic-red_envelope-005-c", text: "被收的事先別提，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-red_envelope-005-d", text: "是啊，那時候都乖乖交出去……", archetype: "meek", retort: "乖乖交出去才是懂事的孩子。" },
      { id: "generic-red_envelope-005-e", text: "說實話，那時候有點捨不得……", archetype: "meek", retort: "捨不得也是為你好啊。" },
      { id: "generic-red_envelope-005-f", text: "我那時候藏了一個私房小金庫。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-red_envelope-005-g", text: "我把小時候的紅包記憶當創傷來療癒。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-005-h", text: "現在想想那些錢根本沒還給我。", archetype: "landmine", retort: "什麼沒還，那都是為你花的！" },
    ],
  },
  {
    id: "generic-red_envelope-006",
    text: "那個晚輩你要不要也包一個紅包？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-006-a", text: "包，而且要包得讓他今年最有面子。", archetype: "perfect", retort: "有心就好，這孩子真大方。" },
      { id: "generic-red_envelope-006-b", text: "先問他今年表現怎麼樣，值不值得包大一點？", archetype: "deflect", retort: "表現不錯啊，你包大方一點！" },
      { id: "generic-red_envelope-006-c", text: "包不包先放著，先問問今天有沒有他愛吃的菜。", archetype: "deflect", retort: "有啊，特地為他準備的。" },
      { id: "generic-red_envelope-006-d", text: "會包，只是今年可能包少一點……", archetype: "meek", retort: "少一點也沒關係，有心就好。" },
      { id: "generic-red_envelope-006-e", text: "說實話，我沒想到還要包給他……", archetype: "meek", retort: "沒想到也要趕快準備一下。" },
      { id: "generic-red_envelope-006-f", text: "我打算包給他一張加油打氣的紙條。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-006-g", text: "我準備了一個空紅包袋當作驚喜。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-006-h", text: "包不包是我的事，不用你們一直問。", archetype: "landmine", retort: "問一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-red_envelope-007",
    text: "用轉帳包紅包，太沒誠意了吧？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-007-a", text: "轉帳快又準，誠意我用紅包袋裝現金補回來。", archetype: "perfect", retort: "有想到這點，算你有心。" },
      { id: "generic-red_envelope-007-b", text: "先問你們，喜歡收紅包袋還是收現金？", archetype: "deflect", retort: "當然是紅包袋比較有感覺啦。" },
      { id: "generic-red_envelope-007-c", text: "誠不誠意先別提，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-red_envelope-007-d", text: "說實話，我覺得轉帳比較方便……", archetype: "meek", retort: "方便歸方便，還是要有點儀式感。" },
      { id: "generic-red_envelope-007-e", text: "現金不太夠帶，只好用轉帳補……", archetype: "meek", retort: "下次記得先準備現金喔。" },
      { id: "generic-red_envelope-007-f", text: "我打算用虛擬貨幣包紅包，比較潮。", archetype: "backfire", retort: "（沒人聽懂在講什麼）" },
      { id: "generic-red_envelope-007-g", text: "我把轉帳截圖印出來當紅包袋。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-007-h", text: "轉帳金額一樣，不用你們挑剔形式。", archetype: "landmine", retort: "挑剔一下也要生氣，真無奈。" },
    ],
  },
  {
    id: "generic-red_envelope-008",
    text: "紅包袋要挑新的，數字也要吉利喔。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-008-a", text: "挑好了，金額吉利到你們看了都會笑。", archetype: "perfect", retort: "這才對，吉利數字最重要。" },
      { id: "generic-red_envelope-008-b", text: "先問你們最喜歡什麼吉利數字？", archetype: "deflect", retort: "當然是八跟六比較吉利啦。" },
      { id: "generic-red_envelope-008-c", text: "數字先別提，你們今天的紅包袋真好看。", archetype: "deflect", retort: "喜歡的話送你幾個。" },
      { id: "generic-red_envelope-008-d", text: "有在準備，還在想要包什麼數字……", archetype: "meek", retort: "快點決定，別拖到最後一刻。" },
      { id: "generic-red_envelope-008-e", text: "說實話，我對數字沒有很講究……", archetype: "meek", retort: "講究一下嘛，這是傳統。" },
      { id: "generic-red_envelope-008-f", text: "我打算包一個誰都看不懂的質數。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-008-g", text: "我準備了會發光的紅包袋，比較潮。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-008-h", text: "數字吉不吉利不用你們一直規定。", archetype: "landmine", retort: "規定一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-red_envelope-009",
    text: "壓歲錢不要亂花，要拿去投資理財。",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-009-a", text: "早就規劃好了，投資報酬率比你想的高。", archetype: "perfect", retort: "有計畫就好，這孩子成熟了。" },
      { id: "generic-red_envelope-009-b", text: "先問你們有沒有推薦的理財方式？", archetype: "deflect", retort: "這個要問懂理財的朋友比較準。" },
      { id: "generic-red_envelope-009-c", text: "投資的事先放著，你們今天氣色真好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-red_envelope-009-d", text: "有想過，只是不太懂投資規則……", archetype: "meek", retort: "不懂要學，別亂花掉。" },
      { id: "generic-red_envelope-009-e", text: "說實話，我可能會拿去花掉一部分……", archetype: "meek", retort: "花掉太可惜，要學會存錢。" },
      { id: "generic-red_envelope-009-f", text: "我打算全部拿去買樂透翻身。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-009-g", text: "我的投資策略是放在枕頭底下。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-009-h", text: "怎麼花是我的事，不用你們管。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-red_envelope-010",
    text: "現在物價漲這麼多，紅包是不是也要跟著漲？",
    topic: "red_envelope",
    options: [
      { id: "generic-red_envelope-010-a", text: "漲，我這個紅包絕對跟得上通膨速度。", archetype: "perfect", retort: "有跟上時代，這孩子不錯。" },
      { id: "generic-red_envelope-010-b", text: "先問你們，物價漲最多的是哪一項？", archetype: "deflect", retort: "當然是外食費啊，漲得誇張。" },
      { id: "generic-red_envelope-010-c", text: "漲不漲先別提，你們今天的年菜真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-red_envelope-010-d", text: "會盡量調整，只是今年手頭比較緊……", archetype: "meek", retort: "緊也要量力調整一下。" },
      { id: "generic-red_envelope-010-e", text: "說實話，我覺得跟不太上物價漲幅……", archetype: "meek", retort: "跟不上也沒關係，心意最重要。" },
      { id: "generic-red_envelope-010-f", text: "我打算發行客製化通膨紅包，與時俱進。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-red_envelope-010-g", text: "我在等薪水先漲，紅包才敢漲。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-red_envelope-010-h", text: "漲不漲是我的事，不用你們一直算。", archetype: "landmine", retort: "算一下也要生氣，真是的。" },
    ],
  },
] satisfies Question[];
