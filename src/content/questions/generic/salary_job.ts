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
      { id: "generic-salary_job-001-a", text: "你問這個，幹，是想炫耀還想跟我借錢？", archetype: "perfect", retort: "（語塞）幹你娘咧，臉一沉又鬆開。" },
      { id: "generic-salary_job-001-b", text: "先說你們當年起薪多少，靠北好奇。", archetype: "deflect", retort: "我那時候起薪才幾千塊呢。" },
      { id: "generic-salary_job-001-c", text: "薪水先不說，紅包行情先講，笑死。", archetype: "deflect", retort: "你這孩子，反問得很快。" },
      { id: "generic-salary_job-001-d", text: "大概四萬多，扣一扣沒多少，幹……", archetype: "meek", retort: "扣一扣剩多少？要學會存錢。" },
      { id: "generic-salary_job-001-e", text: "說實話，沒有很多，夠用而已……", archetype: "meek", retort: "夠用就好，但也要存一點。" },
      { id: "generic-salary_job-001-f", text: "薪水都變成經驗值了啦，幹，哈哈。", archetype: "backfire", retort: "（空氣凝結了一下）" },
      { id: "generic-salary_job-001-g", text: "我的薪水是機密，機掰，國安層級。", archetype: "backfire", retort: "（尷尬到有人低頭吃飯）" },
      { id: "generic-salary_job-001-h", text: "領多少是我的事，老東西干你他媽的屁事。", archetype: "landmine", retort: "長輩面前這樣講話，你他媽的太誇張！" },
    ],
  },
  {
    id: "generic-salary_job-002",
    text: "年終領多少？夠包紅包了嗎？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-002-a", text: "夠不夠包，幹，先看你今年包多少給我。", archetype: "perfect", retort: "講贏就講贏，幹你娘咧快吃菜。" },
      { id: "generic-salary_job-002-b", text: "先說今年年菜是不是特別豐盛，靠北。", archetype: "deflect", retort: "當然，過年就是要豐盛！" },
      { id: "generic-salary_job-002-c", text: "年終先別提，紅包包大點就好，笑死。", archetype: "deflect", retort: "你想得美，先講你的！" },
      { id: "generic-salary_job-002-d", text: "沒有很多，公司今年也不景氣，幹……", archetype: "meek", retort: "不景氣也要想辦法多賺一點。" },
      { id: "generic-salary_job-002-e", text: "還沒發，可能要等年後了……", archetype: "meek", retort: "拖那麼晚，公司是不是有問題？" },
      { id: "generic-salary_job-002-f", text: "我把年終拿去買樂透了，幹，賭一把。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-salary_job-002-g", text: "年終我都直接捐給信用卡了，機掰。", archetype: "backfire", retort: "（全場尷尬，沒人接話）" },
      { id: "generic-salary_job-002-h", text: "領多少是我的事，老不死你他媽的查得比國稅局兇。", archetype: "landmine", retort: "長輩面前敢這樣講，你他媽的不想要紅包？" },
    ],
  },
  {
    id: "generic-salary_job-003",
    text: "是不是該換一個更好的工作了？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-003-a", text: "要換可以，幹，先幫我介紹一個更好的。", archetype: "perfect", retort: "（語塞）幹你娘咧，硬轉話題。" },
      { id: "generic-salary_job-003-b", text: "先問你們，當年換工作怎麼決定的，靠北。", archetype: "deflect", retort: "看緣分啊，緣分到了就換。" },
      { id: "generic-salary_job-003-c", text: "換工作先放著，最近有推薦的嗎，笑死。", archetype: "deflect", retort: "有啊，我朋友那邊在缺人。" },
      { id: "generic-salary_job-003-d", text: "有在考慮，只是還沒找到合適的，幹……", archetype: "meek", retort: "合適的要自己去找，別等機會。" },
      { id: "generic-salary_job-003-e", text: "說實話，現在市場不太好找……", archetype: "meek", retort: "不好找也要多投履歷試試看。" },
      { id: "generic-salary_job-003-f", text: "我在等星探發現我的才華，幹。", archetype: "backfire", retort: "（沒人捧場，場面冷掉）" },
      { id: "generic-salary_job-003-g", text: "我打算辭職去環遊世界找自己，機掰。", archetype: "backfire", retort: "（大家不知道怎麼回應）" },
      { id: "generic-salary_job-003-h", text: "換不換工作是我的事，老東西不用你他媽的下指導棋。", archetype: "landmine", retort: "（翻舊帳）你他媽的小時候還不是我顧的！" },
    ],
  },
  {
    id: "generic-salary_job-004",
    text: "你們公司穩嗎？會不會被裁員啊？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-004-a", text: "穩不穩不知道，幹，你問的頻率倒是很穩。", archetype: "perfect", retort: "你嘴巴真的，幹你娘咧很利。" },
      { id: "generic-salary_job-004-b", text: "先說你們那年代工作是不是比較穩，靠北。", archetype: "deflect", retort: "那當然，做一份做到退休。" },
      { id: "generic-salary_job-004-c", text: "公司的事先別擔心，先吃飯，笑死。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-salary_job-004-d", text: "說實話，最近確實聽到一些風聲，幹……", archetype: "meek", retort: "有風聲就要早點做準備啊。" },
      { id: "generic-salary_job-004-e", text: "應該還好吧，我也不太確定……", archetype: "meek", retort: "不確定就要多留意，別太安逸。" },
      { id: "generic-salary_job-004-f", text: "如果被裁，我就轉行去擺攤啦，幹。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-salary_job-004-g", text: "我已經默默存了一筆逃難基金，機掰。", archetype: "backfire", retort: "（空氣凝結，沒人笑）" },
      { id: "generic-salary_job-004-h", text: "穩不穩干你屁事，老不死你他媽的先顧好自己工作。", archetype: "landmine", retort: "我是為你好，你他媽的這樣對我！" },
    ],
  },
  {
    id: "generic-salary_job-005",
    text: "做這麼久了，怎麼還沒升官？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-005-a", text: "升不升官是我的事，幹，你升官話術倒是很快。", archetype: "perfect", retort: "（笑笑帶過）幹你娘咧，不再追問。" },
      { id: "generic-salary_job-005-b", text: "先說你們當年升遷等了幾年，靠北。", archetype: "deflect", retort: "我那時候也是等了好幾年才升。" },
      { id: "generic-salary_job-005-c", text: "升不升先別提，紅包先包起來，笑死。", archetype: "deflect", retort: "你這孩子，話題轉得真快。" },
      { id: "generic-salary_job-005-d", text: "公司升遷比較慢，還在等機會，幹……", archetype: "meek", retort: "機會要自己爭取，別光等。" },
      { id: "generic-salary_job-005-e", text: "說實話，我對升官沒有很積極……", archetype: "meek", retort: "沒企圖心以後會後悔的。" },
      { id: "generic-salary_job-005-f", text: "我在走低調路線，幹，深藏不露。", archetype: "backfire", retort: "（尷尬三秒，沒人接話）" },
      { id: "generic-salary_job-005-g", text: "我覺得基層比較自由，機掰，故意不升。", archetype: "backfire", retort: "（大家面面相覷）" },
      { id: "generic-salary_job-005-h", text: "升不升官是我的事，老東西不用你他媽的評鑑。", archetype: "landmine", retort: "（語帶威脅）好啊，你他媽的行你上！" },
    ],
  },
  {
    id: "generic-salary_job-006",
    text: "要不要去考公務員？比較穩定啦。",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-006-a", text: "考公職可以，幹，先幫我背考古題。", archetype: "perfect", retort: "是喔，幹你娘咧，你倒很快嘴。" },
      { id: "generic-salary_job-006-b", text: "先問考公務員要準備哪些科目，靠北。", archetype: "deflect", retort: "這個我不清楚，你自己查啦。" },
      { id: "generic-salary_job-006-c", text: "考試的事先放著，先問問紅包基金，笑死。", archetype: "deflect", retort: "你這孩子，很會抓重點。" },
      { id: "generic-salary_job-006-d", text: "有考慮過，只是覺得競爭很激烈，幹……", archetype: "meek", retort: "激烈也要拚一下，穩定最重要。" },
      { id: "generic-salary_job-006-e", text: "說實話，我沒有很想考試了……", archetype: "meek", retort: "不考試以後會後悔的喔。" },
      { id: "generic-salary_job-006-f", text: "我打算去考公職順便交朋友，幹。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-salary_job-006-g", text: "我在等公務員職缺自己找上門，機掰。", archetype: "backfire", retort: "（沒人捧場，安靜三秒）" },
      { id: "generic-salary_job-006-h", text: "考不考是我的事，老不死不用你他媽的來報名。", archetype: "landmine", retort: "你他媽的這什麼態度，欠管教！" },
    ],
  },
  {
    id: "generic-salary_job-007",
    text: "接案這麼不穩定，你不會怕嗎？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-007-a", text: "會怕，幹，但沒你這句話這麼固定出現。", archetype: "perfect", retort: "（語塞）幹你娘咧，起身倒茶。" },
      { id: "generic-salary_job-007-b", text: "先問你們，覺得我最近做的怎麼樣，靠北。", archetype: "deflect", retort: "喔還不錯啊，看起來很專業。" },
      { id: "generic-salary_job-007-c", text: "穩不穩先別提，先吃飯菜要涼了，笑死。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-salary_job-007-d", text: "有時候真的會擔心收入不穩，幹……", archetype: "meek", retort: "不穩就要多存一點應急金。" },
      { id: "generic-salary_job-007-e", text: "說實話，這個月案子比較少……", archetype: "meek", retort: "案子少要多接觸人脈啊。" },
      { id: "generic-salary_job-007-f", text: "我打算靠信用卡分期撐過淡季，幹。", archetype: "backfire", retort: "（空氣凝結了一下）" },
      { id: "generic-salary_job-007-g", text: "我在等中樂透補貼收入落差，機掰。", archetype: "backfire", retort: "（尷尬到有人低頭吃飯）" },
      { id: "generic-salary_job-007-h", text: "穩不穩干你屁事，老東西你他媽的顧好自己飯碗。", archetype: "landmine", retort: "（甩手離開）跟你他媽的講不下去！" },
    ],
  },
  {
    id: "generic-salary_job-008",
    text: "現在這行沒前途，要不要轉行？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-008-a", text: "沒前途的話，幹，你的建議倒是年年準時。", archetype: "perfect", retort: "你這反應，幹你娘咧跟你媽一個樣。" },
      { id: "generic-salary_job-008-b", text: "先問你們，覺得哪一行比較適合我，靠北。", archetype: "deflect", retort: "這個我也不知道耶，你自己想。" },
      { id: "generic-salary_job-008-c", text: "轉不轉先放著，今年年菜真豐盛，笑死。", archetype: "deflect", retort: "當然，過年就是要豐盛！" },
      { id: "generic-salary_job-008-d", text: "有想過，只是還沒想清楚要轉去哪，幹……", archetype: "meek", retort: "想清楚要趁早，別拖太久。" },
      { id: "generic-salary_job-008-e", text: "說實話，最近這行確實比較辛苦……", archetype: "meek", retort: "辛苦就是該考慮換的時候了。" },
      { id: "generic-salary_job-008-f", text: "我打算轉行去當網紅賺大錢，幹。", archetype: "backfire", retort: "（沒人捧場，場面冷掉）" },
      { id: "generic-salary_job-008-g", text: "我在研究算命轉行的可行性，機掰。", archetype: "backfire", retort: "（全場尷尬，沒人接話）" },
      { id: "generic-salary_job-008-h", text: "轉不轉行是我的事，老不死不用你他媽的決定。", archetype: "landmine", retort: "現在小孩真的都他媽的這樣厚！" },
    ],
  },
  {
    id: "generic-salary_job-009",
    text: "工作是不是很閒，才能常請假？",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-009-a", text: "閒不閒是我的事，幹，你查勤比主管還兇。", archetype: "perfect", retort: "（假笑）幹你娘咧，拍拍你肩膀。" },
      { id: "generic-salary_job-009-b", text: "先說你們過年打算排什麼行程，靠北。", archetype: "deflect", retort: "喔，還沒想，你有推薦嗎？" },
      { id: "generic-salary_job-009-c", text: "工作忙不忙先別提，先吃菜，笑死。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-salary_job-009-d", text: "其實蠻忙的，這次是特別排休，幹……", archetype: "meek", retort: "特別排休就要好好珍惜啊。" },
      { id: "generic-salary_job-009-e", text: "說實話，工作量不算輕鬆……", archetype: "meek", retort: "不輕鬆也要注意身體喔。" },
      { id: "generic-salary_job-009-f", text: "我請假的秘訣是裝病，幹，親測有效。", archetype: "backfire", retort: "（全桌安靜，沒人捧場）" },
      { id: "generic-salary_job-009-g", text: "我把特休都拿來練習躺平，機掰。", archetype: "backfire", retort: "（場面尷尬地安靜）" },
      { id: "generic-salary_job-009-h", text: "請不請假是我的事，老東西不用你他媽的簽核。", archetype: "landmine", retort: "（臉一沉）你他媽的這什麼意思！" },
    ],
  },
  {
    id: "generic-salary_job-010",
    text: "同年紀的人薪水都比你高耶。",
    topic: "salary_job",
    options: [
      { id: "generic-salary_job-010-a", text: "薪水高低，幹，先比比誰比較常回來看你。", archetype: "perfect", retort: "算了算了，幹你娘咧不跟你計較。" },
      { id: "generic-salary_job-010-b", text: "先說你們那時候薪水都花在哪，靠北。", archetype: "deflect", retort: "那時候薪水少，都存起來啦。" },
      { id: "generic-salary_job-010-c", text: "薪水先不比，紅包倒是可以比一下，笑死。", archetype: "deflect", retort: "你這孩子，反應真快。" },
      { id: "generic-salary_job-010-d", text: "可能吧，我這行薪水本來就比較低，幹……", archetype: "meek", retort: "低就要想辦法多學一點技能。" },
      { id: "generic-salary_job-010-e", text: "說實話，聽到這種話會有點難過……", archetype: "meek", retort: "難過歸難過，還是要面對現實。" },
      { id: "generic-salary_job-010-f", text: "我領的是無形資產，幹，比錢珍貴。", archetype: "backfire", retort: "（尷尬三秒，沒人接話）" },
      { id: "generic-salary_job-010-g", text: "我在等公司股票上市翻身，機掰。", archetype: "backfire", retort: "（空氣凝結，沒人笑）" },
      { id: "generic-salary_job-010-h", text: "薪水高低是我的事，老不死干你他媽的屁事。", archetype: "landmine", retort: "好啊，隨便你，反正你他媽的最大！" },
    ],
  },
] satisfies Question[];
