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
      { id: "generic-marriage-001-a", text: "等我先把自己過好，好對象才留得住。", archetype: "perfect", retort: "這句有道理，我要記起來。" },
      { id: "generic-marriage-001-b", text: "先不說這個，你今年氣色比較好耶。", archetype: "deflect", retort: "真的嗎？我最近有保養啦。" },
      { id: "generic-marriage-001-c", text: "還沒，不過我很會挑紅包，先看那個。", archetype: "deflect", retort: "你這孩子，重點抓得很準。" },
      { id: "generic-marriage-001-d", text: "還沒有耶，工作比較忙……", archetype: "meek", retort: "忙歸忙，感情也要顧一下。" },
      { id: "generic-marriage-001-e", text: "有在認識，但還不確定……", archetype: "meek", retort: "不確定就要多花點時間。" },
      { id: "generic-marriage-001-f", text: "我在等神明安排啦，順其自然。", archetype: "backfire", retort: "（沒人接話，尷尬喝口茶）" },
      { id: "generic-marriage-001-g", text: "我對象是我的工作，我們很穩定。", archetype: "backfire", retort: "（大家笑但沒人再問）" },
      { id: "generic-marriage-001-h", text: "你們是不是很想我趕快嫁掉？", archetype: "landmine", retort: "誰想這個！我們是關心你！" },
    ],
  },
  {
    id: "generic-marriage-002",
    text: "什麼時候要結婚？日子都訂了沒？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-002-a", text: "等訂了，你會是第一個收到帖子的人。", archetype: "perfect", retort: "那我要包大一點意思意思。" },
      { id: "generic-marriage-002-b", text: "先問你，你們家最近有喜事嗎？", archetype: "deflect", retort: "喔對，我們家最近也有一件事。" },
      { id: "generic-marriage-002-c", text: "日子還沒有，不過菜單我已經想好了。", archetype: "deflect", retort: "先講重點，哈哈。" },
      { id: "generic-marriage-002-d", text: "還在規劃，可能明年吧……", archetype: "meek", retort: "明年是什麼時候？講清楚一點。" },
      { id: "generic-marriage-002-e", text: "對方家裡意見還沒統一……", archetype: "meek", retort: "那要快點溝通，別拖太久。" },
      { id: "generic-marriage-002-f", text: "我在等黃道吉日，還在算。", archetype: "backfire", retort: "（沒人知道要不要接話）" },
      { id: "generic-marriage-002-g", text: "婚禮這種事，隨緣就好啦。", archetype: "backfire", retort: "（大家互看一眼，沒人回）" },
      { id: "generic-marriage-002-h", text: "你們是不是比我還急？", archetype: "landmine", retort: "當然急啊，我們是為你好！" },
    ],
  },
  {
    id: "generic-marriage-003",
    text: "群組傳了不錯的對象，加個好友吧？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-003-a", text: "先加你們當朋友，好對象不怕等。", archetype: "perfect", retort: "有道理，你這孩子想得清楚。" },
      { id: "generic-marriage-003-b", text: "先說這位是誰介紹的，聽起來很厲害。", archetype: "deflect", retort: "喔對啊，人真的不錯！" },
      { id: "generic-marriage-003-c", text: "先幫我看一下八字合不合啦。", archetype: "deflect", retort: "這個要問廟裡才準啦。" },
      { id: "generic-marriage-003-d", text: "好啦，我先加起來看看……", archetype: "meek", retort: "看看而已？要主動一點啊。" },
      { id: "generic-marriage-003-e", text: "最近比較沒心力認識人……", archetype: "meek", retort: "沒心力也要撥時間啊。" },
      { id: "generic-marriage-003-f", text: "我自己找的比較新鮮啦，哈哈。", archetype: "backfire", retort: "（群組沒人回覆）" },
      { id: "generic-marriage-003-g", text: "緣分到了自然就會出現啦。", archetype: "backfire", retort: "（訊息已讀不回）" },
      { id: "generic-marriage-003-h", text: "不用你們安排，我自己會找。", archetype: "landmine", retort: "我們是好意，你這什麼態度！" },
    ],
  },
  {
    id: "generic-marriage-004",
    text: "交友軟體滑得怎樣？有配對嗎？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-004-a", text: "配對是有，但我在等最合的。", archetype: "perfect", retort: "很好，不將就才對。" },
      { id: "generic-marriage-004-b", text: "先說你當年怎麼認識對象的？想學一下。", archetype: "deflect", retort: "我當年喔，那故事可長了。" },
      { id: "generic-marriage-004-c", text: "有滑到你們家附近的店，改天帶你去。", archetype: "deflect", retort: "好啊好啊，記得約我。" },
      { id: "generic-marriage-004-d", text: "有配對，但聊一聊就沒下文……", archetype: "meek", retort: "那要主動約出來見面啊。" },
      { id: "generic-marriage-004-e", text: "偶爾滑滑，還沒認真投入……", archetype: "meek", retort: "要認真一點，別浪費時間。" },
      { id: "generic-marriage-004-f", text: "我都設定條件很高啦，寧缺勿濫。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-marriage-004-g", text: "我在練習聊天技巧，還在練。", archetype: "backfire", retort: "（大家不知道怎麼回應）" },
      { id: "generic-marriage-004-h", text: "滑手機關你們什麼事啊。", archetype: "landmine", retort: "我們關心你才問，兇什麼！" },
    ],
  },
  {
    id: "generic-marriage-005",
    text: "遠距離戀愛，那個真的可以撐久嗎？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-005-a", text: "撐得住的才是真愛，你們也撐了很久啊。", archetype: "perfect", retort: "哎，你這樣講也是啦。" },
      { id: "generic-marriage-005-b", text: "先說你們那個年代怎麼談遠距的？", archetype: "deflect", retort: "我們那時候只能寫信啦。" },
      { id: "generic-marriage-005-c", text: "距離遠沒關係，紅包用寄的就好。", archetype: "deflect", retort: "你想得美，紅包要親手拿。" },
      { id: "generic-marriage-005-d", text: "會擔心，但我們有在努力溝通……", archetype: "meek", retort: "溝通歸溝通，還是要常見面。" },
      { id: "generic-marriage-005-e", text: "說實話，有時候真的很累……", archetype: "meek", retort: "累就要好好想清楚啊。" },
      { id: "generic-marriage-005-f", text: "科技這麼發達，視訊等於同居啦。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-marriage-005-g", text: "距離產生美感，我們很浪漫。", archetype: "backfire", retort: "（場面安靜三秒）" },
      { id: "generic-marriage-005-h", text: "撐不撐得住是我的事，不用你操心。", archetype: "landmine", retort: "好心關心還被嗆，真是的！" },
    ],
  },
  {
    id: "generic-marriage-006",
    text: "年紀不小了，該定下來了吧？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-006-a", text: "定下來之前，先把自己過穩才重要。", archetype: "perfect", retort: "這話講得很成熟喔。" },
      { id: "generic-marriage-006-b", text: "先不說這個，你今天氣色特別好。", archetype: "deflect", retort: "是嗎？我最近有睡飽。" },
      { id: "generic-marriage-006-c", text: "定下來前，先讓我把年終花完再說。", archetype: "deflect", retort: "你這孩子，會過生活。" },
      { id: "generic-marriage-006-d", text: "會的，只是還在找對的時機……", archetype: "meek", retort: "時機是自己創造的，別拖。" },
      { id: "generic-marriage-006-e", text: "其實我也有點著急……", archetype: "meek", retort: "著急就要行動，別光想。" },
      { id: "generic-marriage-006-f", text: "我心態上早就退休了，佛系看待。", archetype: "backfire", retort: "（沒人接話）" },
      { id: "generic-marriage-006-g", text: "感情這種事順其自然最浪漫。", archetype: "backfire", retort: "（場面陷入沉默）" },
      { id: "generic-marriage-006-h", text: "定不定是我的人生，你們少管。", archetype: "landmine", retort: "我們是關心，你這什麼口氣！" },
    ],
  },
  {
    id: "generic-marriage-007",
    text: "是不是太挑了，才一直沒對象？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-007-a", text: "挑一點才對，將來才不會後悔。", archetype: "perfect", retort: "也是啦，寧缺勿濫沒有錯。" },
      { id: "generic-marriage-007-b", text: "先說你當年是怎麼看上另一半的？", archetype: "deflect", retort: "我當年喔，看的是個性。" },
      { id: "generic-marriage-007-c", text: "挑的事晚點聊，先吃菜啦，快涼了。", archetype: "deflect", retort: "好啦好啦，快夾快夾。" },
      { id: "generic-marriage-007-d", text: "可能吧，我對個性比較要求……", archetype: "meek", retort: "要求太高就容易錯過好對象。" },
      { id: "generic-marriage-007-e", text: "沒有很挑，只是還沒遇到而已……", archetype: "meek", retort: "沒遇到也要多出去走走啊。" },
      { id: "generic-marriage-007-f", text: "我是在等對的人自己出現排隊。", archetype: "backfire", retort: "（沒人笑，場面冷掉）" },
      { id: "generic-marriage-007-g", text: "我標準不高啦，只求會呼吸。", archetype: "backfire", retort: "（大家面面相覷）" },
      { id: "generic-marriage-007-h", text: "挑不挑是我自己的事，輪不到你評論。", archetype: "landmine", retort: "好心關心還被嗆，真受不了。" },
    ],
  },
  {
    id: "generic-marriage-008",
    text: "以後結婚打算辦幾桌啊？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-008-a", text: "先讓我找到人，桌數再讓你們決定。", archetype: "perfect", retort: "好，那到時候我來安排！" },
      { id: "generic-marriage-008-b", text: "先問你們喜歡合菜還是自助餐？", archetype: "deflect", retort: "合菜啦，比較有過年的感覺。" },
      { id: "generic-marriage-008-c", text: "辦桌前，先幫我存紅包基金啦。", archetype: "deflect", retort: "你想得美，自己存！" },
      { id: "generic-marriage-008-d", text: "還沒想那麼遠，先找到對象再說……", archetype: "meek", retort: "先想一下也好，提早準備。" },
      { id: "generic-marriage-008-e", text: "看預算吧，可能沒辦法辦太多桌……", archetype: "meek", retort: "沒關係，量力而為就好。" },
      { id: "generic-marriage-008-f", text: "我想辦流水席，一直吃到天亮。", archetype: "backfire", retort: "（沒人接話）" },
      { id: "generic-marriage-008-g", text: "我打算辦線上婚禮，比較潮。", archetype: "backfire", retort: "（大家聽不懂，繼續吃菜）" },
      { id: "generic-marriage-008-h", text: "辦幾桌是我的事，不用你們出錢就好。", archetype: "landmine", retort: "誰說不出錢，你這什麼話！" },
    ],
  },
  {
    id: "generic-marriage-009",
    text: "什麼時候可以帶人回來給大家看？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-009-a", text: "等感情穩了，第一個就帶回來給你們把關。", archetype: "perfect", retort: "這樣才對，我們幫你看看。" },
      { id: "generic-marriage-009-b", text: "先說你們想看什麼款的，我筆記一下。", archetype: "deflect", retort: "老實的、會做事的就好啦。" },
      { id: "generic-marriage-009-c", text: "等帶回來那天，紅包記得包大一點。", archetype: "deflect", retort: "你想得美，先帶人再說！" },
      { id: "generic-marriage-009-d", text: "還在觀察對方適不適合……", archetype: "meek", retort: "觀察太久，人家會等不及。" },
      { id: "generic-marriage-009-e", text: "有點緊張，怕你們給太多意見……", archetype: "meek", retort: "我們意見多也是為你好啊。" },
      { id: "generic-marriage-009-f", text: "等我先把家裡打掃乾淨再說。", archetype: "backfire", retort: "（沒人知道這跟帶人有什麼關係）" },
      { id: "generic-marriage-009-g", text: "我想先辦個相親大會讓你們選。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-marriage-009-h", text: "帶不帶是我決定，你們不要一直催。", archetype: "landmine", retort: "我們是關心，你態度差什麼！" },
    ],
  },
  {
    id: "generic-marriage-010",
    text: "一直不結婚，是不是自己想太多？",
    topic: "marriage",
    options: [
      { id: "generic-marriage-010-a", text: "不是想太多，是想清楚才不將就。", archetype: "perfect", retort: "你這樣說，我也沒話反駁。" },
      { id: "generic-marriage-010-b", text: "先不說這個，你們當年怎麼決定結婚的？", archetype: "deflect", retort: "緣分到了，自然就決定了。" },
      { id: "generic-marriage-010-c", text: "想不想結婚先放一邊，紅包先拿來。", archetype: "deflect", retort: "你這孩子，話題轉得真快。" },
      { id: "generic-marriage-010-d", text: "可能吧，我還在想清楚自己要什麼……", archetype: "meek", retort: "想太久會錯過緣分喔。" },
      { id: "generic-marriage-010-e", text: "說實話，我沒有很想結婚……", archetype: "meek", retort: "不想結婚以後會後悔的。" },
      { id: "generic-marriage-010-f", text: "結婚是舊時代的產物啦，我很潮。", archetype: "backfire", retort: "（沒人接話，尷尬）" },
      { id: "generic-marriage-010-g", text: "我在等元宇宙婚禮技術成熟。", archetype: "backfire", retort: "（大家聽不懂，繼續吃飯）" },
      { id: "generic-marriage-010-h", text: "我的人生不用你們幫我想。", archetype: "landmine", retort: "我們是關心才問，你兇什麼！" },
    ],
  },
] satisfies Question[];
