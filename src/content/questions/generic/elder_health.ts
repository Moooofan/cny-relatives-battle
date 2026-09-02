import type { Question } from "@/content/types";

// situations:
// 001 傳長輩圖說某偏方很有效
// 002 問有沒有按時吃保健食品
// 003 說薑黃黑木耳等偏方能治百病(泛稱)
// 004 問是不是常常熬夜不健康
// 005 說轉發訊息說的健康知識很準
// 006 問要不要一起去做健康檢查
// 007 說年紀大要多運動走路
// 008 問是不是都喝冰的不喝溫水
// 009 說睡眠不足會影響身體(長輩擔憂式)
// 010 分享排毒養生秘訣要求照做

export default [
  {
    id: "generic-elder_health-001",
    text: "這篇長輩圖說的偏方很有效，你要試試。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-001-a", text: "好，我先收藏起來，跟你的健康秘笈放一起。", archetype: "perfect", retort: "哎唷，這孩子有心學習。" },
      { id: "generic-elder_health-001-b", text: "先問這個是聽誰說的，聽起來很厲害。", archetype: "deflect", retort: "是朋友傳給我的，很多人說有效。" },
      { id: "generic-elder_health-001-c", text: "偏方先放著，你們今天氣色真好，秘訣是什麼？", archetype: "deflect", retort: "就這些偏方啊，你看多有效！" },
      { id: "generic-elder_health-001-d", text: "好啦，我先看看，有空再試試……", archetype: "meek", retort: "要趕快試，別拖太久喔。" },
      { id: "generic-elder_health-001-e", text: "說實話，我對這種偏方半信半疑……", archetype: "meek", retort: "半信半疑也要試試看啊。" },
      { id: "generic-elder_health-001-f", text: "我覺得這偏方效果應該跟仙丹差不多。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-001-g", text: "我打算把這篇轉發給全公司同事。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-001-h", text: "這種長輩圖很多都沒有根據啦。", archetype: "landmine", retort: "怎麼會沒根據，很多人都說有效！" },
    ],
  },
  {
    id: "generic-elder_health-002",
    text: "有沒有按時吃我買給你的保健食品啊？",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-002-a", text: "有吃，而且吃到現在整個人都覺得很有精神。", archetype: "perfect", retort: "有吃就好，看你氣色也真的不錯。" },
      { id: "generic-elder_health-002-b", text: "先問你自己最近有沒有按時吃？", archetype: "deflect", retort: "有啊，我每天都吃兩顆呢。" },
      { id: "generic-elder_health-002-c", text: "吃保健品先放著，你們準備的年菜真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-002-d", text: "說實話，有時候忙起來會忘記吃……", archetype: "meek", retort: "忘記不行，要放在看得到的地方。" },
      { id: "generic-elder_health-002-e", text: "吃是有吃，只是不太確定有沒有效……", archetype: "meek", retort: "有吃就是好事，效果慢慢來。" },
      { id: "generic-elder_health-002-f", text: "我把保健食品當糖果吃，一次吃一把。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-002-g", text: "我打算靠意志力代替保健食品。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-002-h", text: "吃不吃是我的事，不用你們一直盯。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-elder_health-003",
    text: "薑黃配黑木耳最補，你要多吃一點。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-003-a", text: "好，那我今天多夾兩碗，補好補滿。", archetype: "perfect", retort: "這才對嘛，多吃才有效。" },
      { id: "generic-elder_health-003-b", text: "先問這個配方是聽誰說的，很厲害耶。", archetype: "deflect", retort: "這個大家都在傳，效果很好。" },
      { id: "generic-elder_health-003-c", text: "補品先放著，這道菜聞起來就很補了。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-003-d", text: "好啦，我夾一點試試看……", archetype: "meek", retort: "多夾一點，一點點沒用的。" },
      { id: "generic-elder_health-003-e", text: "說實話，我不太確定這個有沒有效……", archetype: "meek", retort: "有沒有效吃了才知道啊。" },
      { id: "generic-elder_health-003-f", text: "我打算天天吃，吃到變成黑木耳色。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-003-g", text: "我覺得這個配方應該申請專利。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-003-h", text: "這種偏方吃多了也不一定有用啦。", archetype: "landmine", retort: "怎麼會沒用，我吃了好多年！" },
    ],
  },
  {
    id: "generic-elder_health-004",
    text: "你是不是常常熬夜？對身體不好。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-004-a", text: "有在調整，最近都跟太陽一起起床了。", archetype: "perfect", retort: "這樣才對，早睡早起身體好。" },
      { id: "generic-elder_health-004-b", text: "先問你當年是不是也常常熬夜工作？", archetype: "deflect", retort: "那時候沒辦法，現在不一樣啦。" },
      { id: "generic-elder_health-004-c", text: "熬夜先別提，你們今天氣色真好，怎麼保養的？", archetype: "deflect", retort: "早睡早起，你也要學。" },
      { id: "generic-elder_health-004-d", text: "說實話，最近工作比較忙，常熬夜……", archetype: "meek", retort: "忙也要注意身體，別太拚。" },
      { id: "generic-elder_health-004-e", text: "有在改善，但還沒完全調過來……", archetype: "meek", retort: "要趕快調，熬夜對身體不好。" },
      { id: "generic-elder_health-004-f", text: "我把熬夜當作額外的人生體驗。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-004-g", text: "我覺得夜貓子基因是天生的。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-004-h", text: "熬不熬夜是我的事，不用你們一直念。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-elder_health-005",
    text: "群組傳的這篇健康知識很準，你看看。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-005-a", text: "看了，而且已經照著做，感覺整個人變年輕。", archetype: "perfect", retort: "有效吧，我就說很準！" },
      { id: "generic-elder_health-005-b", text: "先問這篇是哪裡來的，寫得真專業。", archetype: "deflect", retort: "群組裡朋友傳的，大家都在轉。" },
      { id: "generic-elder_health-005-c", text: "這個先放著，你們今天煮的湯真的很補。", archetype: "deflect", retort: "喜歡的話多喝一點啊。" },
      { id: "generic-elder_health-005-d", text: "看了，還在觀察是不是真的有效……", archetype: "meek", retort: "觀察什麼，先照著做就對了。" },
      { id: "generic-elder_health-005-e", text: "說實話，這種訊息我通常不太相信……", archetype: "meek", retort: "不相信也要試試看，沒壞處。" },
      { id: "generic-elder_health-005-f", text: "我覺得這篇文章寫得比醫生還專業。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-elder_health-005-g", text: "我打算把這篇印出來貼在牆上。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-005-h", text: "這種群組訊息很多都是假的啦。", archetype: "landmine", retort: "怎麼會假的，很多人都說有效！" },
    ],
  },
  {
    id: "generic-elder_health-006",
    text: "要不要找時間一起去做個健康檢查？",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-006-a", text: "好啊，順便比賽誰的報告數字比較漂亮。", archetype: "perfect", retort: "哈，那我可要好好準備了。" },
      { id: "generic-elder_health-006-b", text: "先問你最近去檢查，報告怎麼樣？", archetype: "deflect", retort: "還可以啦，醫生說要多運動。" },
      { id: "generic-elder_health-006-c", text: "檢查的事先放著，先把這頓飯吃完再說。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-elder_health-006-d", text: "好啊，我最近也覺得該去檢查一下……", archetype: "meek", retort: "早點去，別拖到後面。" },
      { id: "generic-elder_health-006-e", text: "說實話，我有點怕檢查結果……", archetype: "meek", retort: "怕也要面對，早知道早安心。" },
      { id: "generic-elder_health-006-f", text: "我打算靠自我感覺良好代替檢查。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-006-g", text: "我在等免費健檢方案再去。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-006-h", text: "檢不檢查是我的事，不用你們一直催。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-elder_health-007",
    text: "年紀到了，要多運動、多走路知道嗎？",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-007-a", text: "知道，我現在每天都繞著公園走好幾圈。", archetype: "perfect", retort: "這樣才對，多走對身體好。" },
      { id: "generic-elder_health-007-b", text: "先問你自己最近運動量夠不夠？", archetype: "deflect", retort: "還可以啦，我每天都去散步。" },
      { id: "generic-elder_health-007-c", text: "運動先放著，這道菜聞起來就很有能量。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-007-d", text: "有在努力，只是工作忙比較少動……", archetype: "meek", retort: "忙也要抽空動一動，別偷懶。" },
      { id: "generic-elder_health-007-e", text: "說實話，我不太喜歡運動……", archetype: "meek", retort: "不喜歡也要動，不然身體會出問題。" },
      { id: "generic-elder_health-007-f", text: "我覺得滑手機也算一種手部運動。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-007-g", text: "我打算靠意志力鍛鍊身體。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-007-h", text: "運不運動是我的事，不用你們一直念。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-elder_health-008",
    text: "是不是都喝冰的？要多喝溫水啦。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-008-a", text: "有改了，現在出門包包都帶保溫杯。", archetype: "perfect", retort: "這樣才對，溫水對身體好。" },
      { id: "generic-elder_health-008-b", text: "先問你當年是喝溫水還是喝冰水長大的？", archetype: "deflect", retort: "我那時候都喝溫水，比較養生。" },
      { id: "generic-elder_health-008-c", text: "喝什麼先放著，這杯茶要不要先喝一口？", archetype: "deflect", retort: "好啊好啦，先喝再說。" },
      { id: "generic-elder_health-008-d", text: "說實話，我比較習慣喝冰的……", archetype: "meek", retort: "習慣要改，冰的對身體不好。" },
      { id: "generic-elder_health-008-e", text: "有在改善，但偶爾還是會忍不住……", archetype: "meek", retort: "忍不住也要克制一下。" },
      { id: "generic-elder_health-008-f", text: "我覺得冰的比較解渴，效率比較高。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-elder_health-008-g", text: "我打算把溫水當作偶爾的獎勵。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-008-h", text: "喝什麼是我的自由，不用你們一直管。", archetype: "landmine", retort: "自由歸自由，也要顧健康啊！" },
    ],
  },
  {
    id: "generic-elder_health-009",
    text: "睡眠不足會影響身體，你要早點睡。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-009-a", text: "知道了，我現在都調成跟太陽同步作息。", archetype: "perfect", retort: "這樣才好，早睡早起精神好。" },
      { id: "generic-elder_health-009-b", text: "先問你自己最近睡得好不好？", archetype: "deflect", retort: "還可以啦，年紀大比較淺眠。" },
      { id: "generic-elder_health-009-c", text: "睡眠先放著，這道菜要不要先吃一口再聊？", archetype: "deflect", retort: "好啦好啦，先吃再說。" },
      { id: "generic-elder_health-009-d", text: "說實話，最近確實常常晚睡……", archetype: "meek", retort: "晚睡不行，要早點調整。" },
      { id: "generic-elder_health-009-e", text: "有在改善，只是工作太忙沒辦法……", archetype: "meek", retort: "忙也要想辦法擠出時間睡覺。" },
      { id: "generic-elder_health-009-f", text: "我覺得睡眠不足可以靠意志力補回來。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-009-g", text: "我打算靠咖啡因永久替代睡眠。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-009-h", text: "睡不睡是我的事，不用你們一直念。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-elder_health-010",
    text: "這個排毒秘訣很有效，你要照做喔。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-010-a", text: "好，我照做，做完直接跟你分享心得。", archetype: "perfect", retort: "這才對嘛，做了才知道效果。" },
      { id: "generic-elder_health-010-b", text: "先問這個秘訣是聽誰說的，很厲害耶。", archetype: "deflect", retort: "這個很多人都在傳，效果很好。" },
      { id: "generic-elder_health-010-c", text: "秘訣先放著，這道菜看起來就很養生。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-010-d", text: "好啦，我先試試看再說……", archetype: "meek", retort: "試試看而已？要認真照做。" },
      { id: "generic-elder_health-010-e", text: "說實話，我對這種秘訣半信半疑……", archetype: "meek", retort: "半信半疑也要試試看啊。" },
      { id: "generic-elder_health-010-f", text: "我打算把這個秘訣申請成健康食譜出書。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-elder_health-010-g", text: "我覺得這比健身房還有效，超划算。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-elder_health-010-h", text: "這種秘訣很多都沒有科學根據啦。", archetype: "landmine", retort: "怎麼會沒根據，我照做這麼多年了！" },
    ],
  },
] satisfies Question[];
