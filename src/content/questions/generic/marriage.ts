import type { Question } from "@/content/types";

// situations:
// 001 圍爐夜直接問有沒有對象
// 002 電話裡追問結婚時間表
// 003 家族群組推薦相親對象
// 004 問交友軟體有沒有進度
// 005 說遠距離戀愛撐不久
// 006 催年紀到了該定下來
// 007 說你太挑才單身
// 008 問結婚要辦幾桌
// 009 問什麼時候帶對象回家
// 010 質疑不婚是不是想太多

export default [
  {
    id: "generic-marriage-001",
    text: "有對象了嗎？今年要帶回來給大家看看？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-001-a", text: "幹，你要看幸福，先脫單給我看看啊。", archetype: "perfect", retort: "幹你娘咧，你這什麼態度！" },
      { id: "generic-marriage-001-b", text: "先不說了，你今天氣色好到靠北。", archetype: "deflect", retort: "真的嗎？我最近有保養啦。" },
      { id: "generic-marriage-001-c", text: "還沒啦，紅包我倒是很會挑，笑死。", archetype: "deflect", retort: "你這孩子，重點抓得很準。" },
      { id: "generic-marriage-001-d", text: "還沒有耶，工作比較忙，幹……", archetype: "meek", retort: "忙歸忙，感情也要顧一下。" },
      { id: "generic-marriage-001-e", text: "有在認識，但還不確定……", archetype: "meek", retort: "不確定就要多花點時間。" },
      { id: "generic-marriage-001-f", text: "我在等神明安排，幹，隨緣就好啦。", archetype: "backfire", retort: "（幹你在供三小，全場安靜）" },
      { id: "generic-marriage-001-g", text: "我對象是工作，機掰，穩定到爆。", archetype: "backfire", retort: "（大家假笑，尷尬到爆）" },
      { id: "generic-marriage-001-h", text: "有沒有對象干你屁事，老東西你他媽的太閒。", archetype: "landmine", retort: "你他媽的翅膀硬了是不是！" },
    ],
  },
  {
    id: "generic-marriage-002",
    text: "什麼時候要結婚？日子都訂了沒？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-002-a", text: "訂日子前，幹，先訂你這句話退休。", archetype: "perfect", retort: "幹你娘咧，這個先跳過啦！" },
      { id: "generic-marriage-002-b", text: "先問你，你們家最近是不是有喜事，靠。", archetype: "deflect", retort: "喔對，我們家最近也有一件事。" },
      { id: "generic-marriage-002-c", text: "日子還沒，菜單我倒想好了，笑死。", archetype: "deflect", retort: "先講重點，哈哈。" },
      { id: "generic-marriage-002-d", text: "還在規劃，可能明年吧，幹……", archetype: "meek", retort: "明年是什麼時候？講清楚一點。" },
      { id: "generic-marriage-002-e", text: "對方家裡意見還沒統一……", archetype: "meek", retort: "那要快點溝通，別拖太久。" },
      { id: "generic-marriage-002-f", text: "我在等黃道吉日，幹，還在算啦。", archetype: "backfire", retort: "（沒人接話，白癡喔）" },
      { id: "generic-marriage-002-g", text: "婚禮這種事，機掰，隨緣就好啦。", archetype: "backfire", retort: "（大家互看一眼，沒人回）" },
      { id: "generic-marriage-002-h", text: "結不結婚不用你催，老不死你他媽的顧好自己。", archetype: "landmine", retort: "你他媽的講話越來越衝了！" },
    ],
  },
  {
    id: "generic-marriage-003",
    text: "群組傳了不錯的對象，加個好友吧？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-003-a", text: "加好友可以，幹，先審核你自己。", archetype: "perfect", retort: "幹你娘咧，你少貧嘴快吃飯！" },
      { id: "generic-marriage-003-b", text: "先說這位誰介紹的，聽起來靠北厲害。", archetype: "deflect", retort: "喔對啊，人真的不錯！" },
      { id: "generic-marriage-003-c", text: "先幫我看八字合不合啦，笑死。", archetype: "deflect", retort: "這個要問廟裡才準啦。" },
      { id: "generic-marriage-003-d", text: "好啦，我先加起來看看，幹……", archetype: "meek", retort: "看看而已？要主動一點啊。" },
      { id: "generic-marriage-003-e", text: "最近比較沒心力認識人……", archetype: "meek", retort: "沒心力也要撥時間啊。" },
      { id: "generic-marriage-003-f", text: "我自己找比較新鮮啦，幹，哈哈。", archetype: "backfire", retort: "（群組沒人回覆，尷尬）" },
      { id: "generic-marriage-003-g", text: "緣分到了自然會出現，機掰。", archetype: "backfire", retort: "（已讀不回，冷場）" },
      { id: "generic-marriage-003-h", text: "交不交朋友是我的事，老東西你他媽的比婚友社勤。", archetype: "landmine", retort: "現在年輕人講話真他媽的衝！" },
    ],
  },
  {
    id: "generic-marriage-004",
    text: "交友軟體滑得怎樣？有配對嗎？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-004-a", text: "滑得很好，幹，比你關心的還精準。", archetype: "perfect", retort: "（轉頭）幹你娘咧，你們聽聽看。" },
      { id: "generic-marriage-004-b", text: "先說你當年怎麼認識的，靠北好奇。", archetype: "deflect", retort: "我當年喔，那故事可長了。" },
      { id: "generic-marriage-004-c", text: "有滑到附近的店，笑死，改天帶你去。", archetype: "deflect", retort: "好啊好啦，記得約我。" },
      { id: "generic-marriage-004-d", text: "有配對，但聊一聊就沒下文，幹……", archetype: "meek", retort: "那要主動約出來見面啊。" },
      { id: "generic-marriage-004-e", text: "偶爾滑滑，還沒認真投入……", archetype: "meek", retort: "要認真一點，別浪費時間。" },
      { id: "generic-marriage-004-f", text: "我條件設很高啦，幹，寧缺勿濫。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-marriage-004-g", text: "我在練聊天技巧，機掰，還在練。", archetype: "backfire", retort: "（大家不知道怎麼回應）" },
      { id: "generic-marriage-004-h", text: "滑不滑是我的事，老不死你他媽的查得比警察細。", archetype: "landmine", retort: "（甩筷子）欠你他媽的管教喔！" },
    ],
  },
  {
    id: "generic-marriage-005",
    text: "遠距離戀愛，那個真的可以撐久嗎？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-005-a", text: "撐不撐久，幹，先看你婚姻撐多久。", archetype: "perfect", retort: "幹你娘咧，講話這麼衝跟誰學的！" },
      { id: "generic-marriage-005-b", text: "先說你們那年代怎麼談的，靠北。", archetype: "deflect", retort: "我們那時候只能寫信啦。" },
      { id: "generic-marriage-005-c", text: "距離遠沒關係，紅包寄的就好，笑死。", archetype: "deflect", retort: "你想得美，紅包要親手拿。" },
      { id: "generic-marriage-005-d", text: "會擔心，但我們有努力溝通，幹……", archetype: "meek", retort: "溝通歸溝通，還是要常見面。" },
      { id: "generic-marriage-005-e", text: "說實話，有時候真的很累……", archetype: "meek", retort: "累就要好好想清楚啊。" },
      { id: "generic-marriage-005-f", text: "科技這麼發達，機掰，視訊等於同居。", archetype: "backfire", retort: "（沒人覺得好笑，白癡喔）" },
      { id: "generic-marriage-005-g", text: "說我們不穩，你們夫妻…幹，算了。", archetype: "backfire", retort: "（場面安靜三秒）" },
      { id: "generic-marriage-005-h", text: "撐不撐是我們的事，老東西你他媽的先撐好自己婚姻。", archetype: "landmine", retort: "你他媽的什麼態度，明年別來了！" },
    ],
  },
  {
    id: "generic-marriage-006",
    text: "年紀不小了，該定下來了吧？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-006-a", text: "定下來前，幹，先問你幾歲定下來的。", archetype: "perfect", retort: "（笑不出來）幹你娘咧，硬接話。" },
      { id: "generic-marriage-006-b", text: "先不說了，你今天氣色特別靠北好。", archetype: "deflect", retort: "是嗎？我最近有睡飽。" },
      { id: "generic-marriage-006-c", text: "定下來前，先讓我把年終花完，笑死。", archetype: "deflect", retort: "你這孩子，會過生活。" },
      { id: "generic-marriage-006-d", text: "會的，只是還在找對的時機，幹……", archetype: "meek", retort: "時機是自己創造的，別拖。" },
      { id: "generic-marriage-006-e", text: "其實我也有點著急……", archetype: "meek", retort: "著急就要行動，別光想。" },
      { id: "generic-marriage-006-f", text: "我心態早就退休了，幹，佛系看待。", archetype: "backfire", retort: "（沒人接話，冷場）" },
      { id: "generic-marriage-006-g", text: "定不定關你…幹，長輩不能這樣講。", archetype: "backfire", retort: "（場面陷入沉默）" },
      { id: "generic-marriage-006-h", text: "定不定下來是我的事，老不死你他媽的別年年煩。", archetype: "landmine", retort: "（叫你媽出來）你他媽的自己教的小孩！" },
    ],
  },
  {
    id: "generic-marriage-007",
    text: "是不是太挑了，才一直沒對象？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-007-a", text: "挑一點，幹，總比嫁錯人常回娘家好。", archetype: "perfect", retort: "是喔，幹你娘咧，隨便你講。" },
      { id: "generic-marriage-007-b", text: "先說你當年怎麼看上另一半的，靠北。", archetype: "deflect", retort: "我當年喔，看的是個性。" },
      { id: "generic-marriage-007-c", text: "挑的事晚點聊，笑死，先吃菜啦。", archetype: "deflect", retort: "好啦好啦，快夾快夾。" },
      { id: "generic-marriage-007-d", text: "可能吧，我對個性比較要求，幹……", archetype: "meek", retort: "要求太高就容易錯過好對象。" },
      { id: "generic-marriage-007-e", text: "沒有很挑，只是還沒遇到而已……", archetype: "meek", retort: "沒遇到也要多出去走走啊。" },
      { id: "generic-marriage-007-f", text: "我在等對的人自己排隊，機掰。", archetype: "backfire", retort: "（沒人笑，場面冷掉）" },
      { id: "generic-marriage-007-g", text: "我標準不高啦，幹，只求會呼吸。", archetype: "backfire", retort: "（大家面面相覷）" },
      { id: "generic-marriage-007-h", text: "挑不挑是我的事，老屁股你他媽的管好自己眼光。", archetype: "landmine", retort: "好，你行，你他媽的別來找我！" },
    ],
  },
  {
    id: "generic-marriage-008",
    text: "以後結婚打算辦幾桌啊？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-008-a", text: "辦幾桌，幹，先看你紅包包多少。", archetype: "perfect", retort: "（語塞）幹你娘咧，夾菜掩飾。" },
      { id: "generic-marriage-008-b", text: "先問你們喜歡合菜還自助餐，靠北。", archetype: "deflect", retort: "合菜啦，比較有過年的感覺。" },
      { id: "generic-marriage-008-c", text: "辦桌前，先幫我存紅包基金，笑死。", archetype: "deflect", retort: "你想得美，自己存！" },
      { id: "generic-marriage-008-d", text: "還沒想那麼遠，先找到對象再說，幹……", archetype: "meek", retort: "先想一下也好，提早準備。" },
      { id: "generic-marriage-008-e", text: "看預算吧，可能沒辦法辦太多桌……", archetype: "meek", retort: "沒關係，量力而為就好。" },
      { id: "generic-marriage-008-f", text: "我想辦流水席，幹，一直吃到天亮。", archetype: "backfire", retort: "（沒人接話，冷場）" },
      { id: "generic-marriage-008-g", text: "我打算辦線上婚禮，機掰，比較潮。", archetype: "backfire", retort: "（大家聽不懂，繼續吃菜）" },
      { id: "generic-marriage-008-h", text: "辦幾桌是我的事，老東西你他媽的算得比總鋪師細。", archetype: "landmine", retort: "（臉色鐵青）你他媽的太過分了！" },
    ],
  },
  {
    id: "generic-marriage-009",
    text: "什麼時候可以帶人回來給大家看？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-009-a", text: "帶人回來前，幹，先讓你看你自己臉色。", archetype: "perfect", retort: "你這孩子，幹你娘咧越來越會頂嘴。" },
      { id: "generic-marriage-009-b", text: "先說想看什麼款的，我筆記，靠北。", archetype: "deflect", retort: "老實的、會做事的就好啦。" },
      { id: "generic-marriage-009-c", text: "等帶回來，紅包記得包大點，笑死。", archetype: "deflect", retort: "你想得美，先帶人再說！" },
      { id: "generic-marriage-009-d", text: "還在觀察對方適不適合，幹……", archetype: "meek", retort: "觀察太久，人家會等不及。" },
      { id: "generic-marriage-009-e", text: "有點緊張，怕你們給太多意見……", archetype: "meek", retort: "我們意見多也是為你好啊。" },
      { id: "generic-marriage-009-f", text: "等我先把家裡打掃乾淨，幹，再說。", archetype: "backfire", retort: "（沒人知道這跟帶人有什麼關係）" },
      { id: "generic-marriage-009-g", text: "我想先辦相親大會讓你們選，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-marriage-009-h", text: "帶不帶人是我的事，老不死你他媽的別排隊審核。", archetype: "landmine", retort: "白養你這麼多年換這句話幹！" },
    ],
  },
  {
    id: "generic-marriage-010",
    text: "一直不結婚，是不是自己想太多？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-010-a", text: "想太多，幹，總比嫁錯人想太少好。", archetype: "perfect", retort: "（假笑）幹你娘咧，算你有理。" },
      { id: "generic-marriage-010-b", text: "先不說了，你們當年怎麼決定結婚的，靠。", archetype: "deflect", retort: "緣分到了，自然就決定了。" },
      { id: "generic-marriage-010-c", text: "想不想先放一邊，紅包先拿來，笑死。", archetype: "deflect", retort: "你這孩子，話題轉得真快。" },
      { id: "generic-marriage-010-d", text: "可能吧，我還在想清楚自己要什麼，幹……", archetype: "meek", retort: "想太久會錯過緣分喔。" },
      { id: "generic-marriage-010-e", text: "說實話，我沒有很想結婚……", archetype: "meek", retort: "不想結婚以後會後悔的。" },
      { id: "generic-marriage-010-f", text: "結婚是舊時代產物啦，機掰，我很潮。", archetype: "backfire", retort: "（沒人接話，尷尬）" },
      { id: "generic-marriage-010-g", text: "我在等元宇宙婚禮技術成熟，幹。", archetype: "backfire", retort: "（大家聽不懂，繼續吃飯）" },
      { id: "generic-marriage-010-h", text: "結不結婚是我的人生，老東西你他媽的別下結論。", archetype: "landmine", retort: "（氣到講台語）幹恁娘你這是什麼款！" },
    ],
  },
] satisfies Question[];
