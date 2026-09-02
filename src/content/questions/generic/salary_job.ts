import type { Question } from "@/content/types";

// situations:
// 001 問現在月薪多少
// 002 問有沒有年終、多少
// 003 問是不是該換更好的工作
// 004 問公司穩不穩定會不會被裁員
// 005 問怎麼還在做這份工作沒升遷
// 006 問要不要去考公務員比較穩定
// 007 問接案自由工作是不是不穩定
// 008 問是不是該轉行
// 009 問工作是不是很閒才能常請假
// 010 問薪水是不是比同輩低

export default [
  {
    id: "generic-salary_job-001",
    text: "現在一個月領多少啊？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-001-a", text: "領得不多，但夠養活我這條命還有剩。", archetype: "perfect", retort: "有存到錢最重要，說得好。" },
      { id: "generic-salary_job-001-b", text: "先說你們當年起薪多少？我很好奇。", archetype: "deflect", retort: "我那時候起薪才幾千塊呢。" },
      { id: "generic-salary_job-001-c", text: "薪水先不說，紅包行情你們倒是可以先講。", archetype: "deflect", retort: "你這孩子，反問得很快。" },
      { id: "generic-salary_job-001-d", text: "大概四萬多，扣一扣剩沒多少……", archetype: "meek", retort: "扣一扣剩多少？要學會存錢。" },
      { id: "generic-salary_job-001-e", text: "說實話，沒有很多，夠用而已……", archetype: "meek", retort: "夠用就好，但也要存一點。" },
      { id: "generic-salary_job-001-f", text: "薪水都變成經驗值了啦，哈哈。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-salary_job-001-g", text: "我的薪水是機密，跟國安層級一樣。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-001-h", text: "領多少是我的隱私，不要一直問。", archetype: "landmine", retort: "問一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-salary_job-002",
    text: "年終領多少？夠包紅包了嗎？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-002-a", text: "夠包，而且今年包的比去年大方。", archetype: "perfect", retort: "喔？那我要拭目以待囉。" },
      { id: "generic-salary_job-002-b", text: "先說你們今年的年菜是不是特別豐盛？", archetype: "deflect", retort: "當然，過年就是要豐盛！" },
      { id: "generic-salary_job-002-c", text: "年終先別提，紅包記得包大一點就好。", archetype: "deflect", retort: "你想得美，先講你的！" },
      { id: "generic-salary_job-002-d", text: "沒有很多，公司今年也不景氣……", archetype: "meek", retort: "不景氣也要想辦法多賺一點。" },
      { id: "generic-salary_job-002-e", text: "還沒發，可能要等年後了……", archetype: "meek", retort: "拖那麼晚，公司是不是有問題？" },
      { id: "generic-salary_job-002-f", text: "我把年終拿去買樂透了，賭一把。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-salary_job-002-g", text: "年終我都直接捐給信用卡了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-002-h", text: "年終多少不用跟你們報備吧。", archetype: "landmine", retort: "問一下而已，兇什麼兇！" },
    ],
  },
  {
    id: "generic-salary_job-003",
    text: "是不是該換一個更好的工作了？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-003-a", text: "在找了，等找到更好的第一個跟你們報告。", archetype: "perfect", retort: "好，那我等你的好消息。" },
      { id: "generic-salary_job-003-b", text: "先問你們，當年換工作是怎麼決定的？", archetype: "deflect", retort: "看緣分啊，緣分到了就換。" },
      { id: "generic-salary_job-003-c", text: "換工作的事先放著，你們最近有推薦的嗎？", archetype: "deflect", retort: "有啊，我朋友那邊在缺人。" },
      { id: "generic-salary_job-003-d", text: "有在考慮，只是還沒找到合適的……", archetype: "meek", retort: "合適的要自己去找，別等機會。" },
      { id: "generic-salary_job-003-e", text: "說實話，現在市場不太好找……", archetype: "meek", retort: "不好找也要多投履歷試試看。" },
      { id: "generic-salary_job-003-f", text: "我在等星探發現我的才華。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-salary_job-003-g", text: "我打算辭職去環遊世界找自己。", archetype: "backfire", retort: "（大家不知道怎麼回應）" },
      { id: "generic-salary_job-003-h", text: "換不換工作是我的事，不用你們操心。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-salary_job-004",
    text: "你們公司穩嗎？會不會被裁員啊？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-004-a", text: "穩不穩不知道，但我這個人到哪都吃得開。", archetype: "perfect", retort: "有這個自信，很好。" },
      { id: "generic-salary_job-004-b", text: "先說你們那個年代工作是不是比較穩？", archetype: "deflect", retort: "那當然，做一份做到退休。" },
      { id: "generic-salary_job-004-c", text: "公司的事先別擔心，先吃飯比較重要。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-salary_job-004-d", text: "說實話，最近確實聽到一些風聲……", archetype: "meek", retort: "有風聲就要早點做準備啊。" },
      { id: "generic-salary_job-004-e", text: "應該還好吧，我也不太確定……", archetype: "meek", retort: "不確定就要多留意，別太安逸。" },
      { id: "generic-salary_job-004-f", text: "如果被裁，我就轉行去擺攤啦。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-salary_job-004-g", text: "我已經默默存了一筆逃難基金。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-004-h", text: "公司的事不用你們瞎操心。", archetype: "landmine", retort: "關心一下都不行，真是的。" },
    ],
  },
  {
    id: "generic-salary_job-005",
    text: "做這麼久了，怎麼還沒升官？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-005-a", text: "升官要慢慢來，我在打穩地基。", archetype: "perfect", retort: "地基打穩了，以後蓋得高。" },
      { id: "generic-salary_job-005-b", text: "先說你們當年升遷等了幾年？", archetype: "deflect", retort: "我那時候也是等了好幾年才升。" },
      { id: "generic-salary_job-005-c", text: "升不升先別提，你們的紅包先包起來。", archetype: "deflect", retort: "你這孩子，話題轉得真快。" },
      { id: "generic-salary_job-005-d", text: "公司升遷比較慢，還在等機會……", archetype: "meek", retort: "機會要自己爭取，別光等。" },
      { id: "generic-salary_job-005-e", text: "說實話，我對升官沒有很積極……", archetype: "meek", retort: "沒企圖心以後會後悔的。" },
      { id: "generic-salary_job-005-f", text: "我在走低調路線，深藏不露。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-salary_job-005-g", text: "我覺得基層比較自由，故意不升。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-005-h", text: "升不升是公司的事，不用你們評論。", archetype: "landmine", retort: "評論一下也要生氣，真受不了。" },
    ],
  },
  {
    id: "generic-salary_job-006",
    text: "要不要去考公務員？比較穩定啦。",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-006-a", text: "穩定很好，但我現在這條路也走得穩。", archetype: "perfect", retort: "有想法，那就照你的路走。" },
      { id: "generic-salary_job-006-b", text: "先問你們，考公務員要準備哪些科目？", archetype: "deflect", retort: "這個我不清楚，你自己查啦。" },
      { id: "generic-salary_job-006-c", text: "考試的事先放著，先問問看有沒有紅包基金。", archetype: "deflect", retort: "你這孩子，很會抓重點。" },
      { id: "generic-salary_job-006-d", text: "有考慮過，只是覺得競爭很激烈……", archetype: "meek", retort: "激烈也要拚一下，穩定最重要。" },
      { id: "generic-salary_job-006-e", text: "說實話，我沒有很想考試了……", archetype: "meek", retort: "不考試以後會後悔的喔。" },
      { id: "generic-salary_job-006-f", text: "我打算去考公職順便交朋友。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-salary_job-006-g", text: "我在等公務員職缺自己找上門。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-006-h", text: "考不考是我的選擇，不用你們安排。", archetype: "landmine", retort: "好心建議還被嗆，真是的。" },
    ],
  },
  {
    id: "generic-salary_job-007",
    text: "接案這麼不穩定，你不會怕嗎？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-007-a", text: "案子接得穩，比上班還準時領錢。", archetype: "perfect", retort: "喔？那倒是我沒想到的。" },
      { id: "generic-salary_job-007-b", text: "先問你們，覺得我最近做的東西怎麼樣？", archetype: "deflect", retort: "喔還不錯啊，看起來很專業。" },
      { id: "generic-salary_job-007-c", text: "穩不穩先別提，先吃飯，菜要涼了。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-salary_job-007-d", text: "有時候真的會擔心收入不穩……", archetype: "meek", retort: "不穩就要多存一點應急金。" },
      { id: "generic-salary_job-007-e", text: "說實話，這個月案子比較少……", archetype: "meek", retort: "案子少要多接觸人脈啊。" },
      { id: "generic-salary_job-007-f", text: "我打算靠信用卡分期撐過淡季。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-salary_job-007-g", text: "我在等中樂透補貼收入落差。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-007-h", text: "穩不穩是我自己承擔，不用你們操心。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-salary_job-008",
    text: "現在這行沒前途，要不要轉行？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-008-a", text: "每行都有前途，看的人不一樣而已。", archetype: "perfect", retort: "這句話講得挺有智慧的。" },
      { id: "generic-salary_job-008-b", text: "先問你們，覺得哪一行比較適合我？", archetype: "deflect", retort: "這個我也不知道耶，你自己想。" },
      { id: "generic-salary_job-008-c", text: "轉不轉先放著，你們今年年菜真豐盛。", archetype: "deflect", retort: "當然，過年就是要豐盛！" },
      { id: "generic-salary_job-008-d", text: "有想過，只是還沒想清楚要轉去哪……", archetype: "meek", retort: "想清楚要趁早，別拖太久。" },
      { id: "generic-salary_job-008-e", text: "說實話，最近這行確實比較辛苦……", archetype: "meek", retort: "辛苦就是該考慮換的時候了。" },
      { id: "generic-salary_job-008-f", text: "我打算轉行去當網紅賺大錢。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-salary_job-008-g", text: "我在研究算命轉行的可行性。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-008-h", text: "轉不轉行是我的事，你們少插嘴。", archetype: "landmine", retort: "關心一下也要被嗆，真受不了。" },
    ],
  },
  {
    id: "generic-salary_job-009",
    text: "工作是不是很閒，才能常請假？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-009-a", text: "閒不閒不重要，會安排時間才是本事。", archetype: "perfect", retort: "有道理，你這孩子很會過生活。" },
      { id: "generic-salary_job-009-b", text: "先說你們過年打算排什麼行程？", archetype: "deflect", retort: "喔，還沒想，你有推薦嗎？" },
      { id: "generic-salary_job-009-c", text: "工作忙不忙先別提，先吃菜比較重要。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-salary_job-009-d", text: "其實蠻忙的，這次是特別排休……", archetype: "meek", retort: "特別排休就要好好珍惜啊。" },
      { id: "generic-salary_job-009-e", text: "說實話，工作量不算輕鬆……", archetype: "meek", retort: "不輕鬆也要注意身體喔。" },
      { id: "generic-salary_job-009-f", text: "我請假的秘訣是裝病，親測有效。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-salary_job-009-g", text: "我把特休都拿來練習躺平。", archetype: "backfire", retort: "（場面尷尬地安靜）" },
      { id: "generic-salary_job-009-h", text: "我請不請假不用你們管吧。", archetype: "landmine", retort: "問一下都不行，真是的。" },
    ],
  },
  {
    id: "generic-salary_job-010",
    text: "同年紀的人薪水都比你高耶。",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-010-a", text: "他們領得高，但我下班時間比較值錢。", archetype: "perfect", retort: "這樣想也是一種聰明。" },
      { id: "generic-salary_job-010-b", text: "先說你們那時候薪水都花在哪？", archetype: "deflect", retort: "那時候薪水少，都存起來啦。" },
      { id: "generic-salary_job-010-c", text: "薪水先不比，你們紅包倒是可以比一下。", archetype: "deflect", retort: "你這孩子，反應真快。" },
      { id: "generic-salary_job-010-d", text: "可能吧，我這行薪水本來就比較低……", archetype: "meek", retort: "低就要想辦法多學一點技能。" },
      { id: "generic-salary_job-010-e", text: "說實話，聽到這種話會有點難過……", archetype: "meek", retort: "難過歸難過，還是要面對現實。" },
      { id: "generic-salary_job-010-f", text: "我領的是無形資產，比錢珍貴。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-salary_job-010-g", text: "我在等公司股票上市翻身。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-salary_job-010-h", text: "薪水多少是我的事，不用拿來比較。", archetype: "landmine", retort: "比較一下也要生氣，真受不了。" },
    ],
  },
] satisfies Question[];
