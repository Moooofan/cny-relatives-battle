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
      { id: "generic-elder_health-001-a", text: "幹，轉發三年了，你他媽的有變好嗎？", archetype: "perfect", retort: "幹恁娘咧，你這什麼態度！" },
      { id: "generic-elder_health-001-b", text: "靠，先問這誰講的，聽起來很唬爛。", archetype: "deflect", retort: "是朋友傳的啦，很多人說有效。" },
      { id: "generic-elder_health-001-c", text: "靠，偏方先放著，你們今天氣色真好。", archetype: "deflect", retort: "就這些偏方啊，你看多有效！" },
      { id: "generic-elder_health-001-d", text: "好啦，幹……我先看看，有空再試……", archetype: "meek", retort: "要趕快試，別拖太久喔。" },
      { id: "generic-elder_health-001-e", text: "說實話，我對這偏方半信半疑……", archetype: "meek", retort: "半信半疑也要試試看啊。" },
      { id: "generic-elder_health-001-f", text: "幹，我看這偏方效果跟仙丹差不多。", archetype: "backfire", retort: "（沒人理你）……白癡喔。" },
      { id: "generic-elder_health-001-g", text: "他媽的，我要轉發給全公司同事。", archetype: "backfire", retort: "（大家笑不出來）幹，冷。" },
      { id: "generic-elder_health-001-h", text: "幹，能治百病醫院早該關了，死老頭。", archetype: "landmine", retort: "你他媽的給我滾出去！" },
    ],
  },
  {
    id: "generic-elder_health-002",
    text: "有沒有按時吃我買給你的保健食品啊？",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-002-a", text: "他媽的有吃，吃到都能開分店了。", archetype: "perfect", retort: "（語塞）幹，沒大沒小。" },
      { id: "generic-elder_health-002-b", text: "笑死，先問你自己有按時吃嗎？", archetype: "deflect", retort: "有啊，我每天都吃兩顆呢。" },
      { id: "generic-elder_health-002-c", text: "笑死，吃保健品先放著，年菜準備得真豐盛。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-002-d", text: "說實話，忙起來會忘記吃……", archetype: "meek", retort: "忘記不行，要放在看得到的地方。" },
      { id: "generic-elder_health-002-e", text: "靠……吃是有吃，不確定有沒有效……", archetype: "meek", retort: "有吃就是好事，效果慢慢來。" },
      { id: "generic-elder_health-002-f", text: "幹，我把保健食品當糖果一次吃一把。", archetype: "backfire", retort: "（全場安靜）……你有病喔。" },
      { id: "generic-elder_health-002-g", text: "去你的意志力，我靠它代替保健食品。", archetype: "backfire", retort: "（大家笑不出來）機掰。" },
      { id: "generic-elder_health-002-h", text: "吃不吃是我的事，你他媽的很煩，老東西。", archetype: "landmine", retort: "（氣到講台語）幹恁娘囡仔！" },
    ],
  },
  {
    id: "generic-elder_health-003",
    text: "薑黃配黑木耳最補，你要多吃一點。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-003-a", text: "靠北，這麼補怎麼還在念，先補耐心。", archetype: "perfect", retort: "（語塞，臉色微妙）去死。" },
      { id: "generic-elder_health-003-b", text: "先問這配方聽誰講的，很唬爛耶。", archetype: "deflect", retort: "這個大家都在傳，效果很好。" },
      { id: "generic-elder_health-003-c", text: "哭爸，補品先放著，這道菜聞起來就很補了。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-003-d", text: "好啦，幹……我夾一點試試看……", archetype: "meek", retort: "多夾一點，一點點沒用的。" },
      { id: "generic-elder_health-003-e", text: "說實話，我不太確定有沒有效……", archetype: "meek", retort: "有沒有效吃了才知道啊。" },
      { id: "generic-elder_health-003-f", text: "他媽的我要天天吃到變黑木耳色。", archetype: "backfire", retort: "（沒人覺得好笑）白目。" },
      { id: "generic-elder_health-003-g", text: "機掰，這配方應該拿去申請專利。", archetype: "backfire", retort: "（大家笑不出來）夠了。" },
      { id: "generic-elder_health-003-h", text: "幹，補不補是我的事，耐心怎麼還沒到貨，老東西。", archetype: "landmine", retort: "（翻舊帳）我當年多疼你！" },
    ],
  },
  {
    id: "generic-elder_health-004",
    text: "你是不是常常熬夜？對身體不好。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-004-a", text: "幹，會晚睡，但至少沒晚不知分寸。", archetype: "perfect", retort: "呵呵…你他媽的很敢講。" },
      { id: "generic-elder_health-004-b", text: "靠，先問你當年是不是也熬夜工作？", archetype: "deflect", retort: "那時候沒辦法，現在不一樣啦。" },
      { id: "generic-elder_health-004-c", text: "北七，熬夜先別提，你們氣色真好，怎麼保養的？", archetype: "deflect", retort: "早睡早起，你也要學。" },
      { id: "generic-elder_health-004-d", text: "說實話，最近工作忙，常熬夜……", archetype: "meek", retort: "忙也要注意身體，別太拚。" },
      { id: "generic-elder_health-004-e", text: "靠……有在改善，還沒完全調過來……", archetype: "meek", retort: "要趕快調，熬夜對身體不好。" },
      { id: "generic-elder_health-004-f", text: "去你的健康，熬夜是我的人生體驗。", archetype: "backfire", retort: "（沒人覺得好笑）機掰。" },
      { id: "generic-elder_health-004-g", text: "幹，夜貓子基因是天生的懂不懂。", archetype: "backfire", retort: "（大家笑不出來）夠了喔。" },
      { id: "generic-elder_health-004-h", text: "熬不熬夜不用你他媽的管，先管你血壓，老不死。", archetype: "landmine", retort: "你敢這樣講長輩，去死！" },
    ],
  },
  {
    id: "generic-elder_health-005",
    text: "群組傳的這篇健康知識很準，你看看。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-005-a", text: "看了，比你他媽的心得還準的是查證。", archetype: "perfect", retort: "你這孩子，反應真快，機掰。" },
      { id: "generic-elder_health-005-b", text: "笑死，先問這篇哪裡來的，寫得真專業。", archetype: "deflect", retort: "群組裡朋友傳的，大家都在轉。" },
      { id: "generic-elder_health-005-c", text: "靠北，這個先放著，你們煮的湯真的很補。", archetype: "deflect", retort: "喜歡的話多喝一點啊。" },
      { id: "generic-elder_health-005-d", text: "看了，還在觀察是不是真的有效……", archetype: "meek", retort: "觀察什麼，先照著做就對了。" },
      { id: "generic-elder_health-005-e", text: "幹……說實話這種訊息我不太信……", archetype: "meek", retort: "不相信也要試試看，沒壞處。" },
      { id: "generic-elder_health-005-f", text: "他媽的這篇文章寫得比醫生還專業。", archetype: "backfire", retort: "（空氣凝結了一下）" },
      { id: "generic-elder_health-005-g", text: "去你的，我要把這篇印出來貼牆上。", archetype: "backfire", retort: "（大家笑不出來）機掰。" },
      { id: "generic-elder_health-005-h", text: "去你的，準不準干你屁事，管好自己，老東西。", archetype: "landmine", retort: "好心關心還被兇，去死！" },
    ],
  },
  {
    id: "generic-elder_health-006",
    text: "要不要找時間一起去做個健康檢查？",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-006-a", text: "好啊，幹，順便查一下你的血壓跟脾氣。", archetype: "perfect", retort: "（假笑）你這孩子真敢講。" },
      { id: "generic-elder_health-006-b", text: "先問你最近去檢查，報告怎麼樣？", archetype: "deflect", retort: "還可以啦，醫生說要多運動。" },
      { id: "generic-elder_health-006-c", text: "靠，檢查的事先放著，先把這頓飯吃完再說。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-elder_health-006-d", text: "好啊，我最近也覺得該去檢查一下……", archetype: "meek", retort: "早點去，別拖到後面。" },
      { id: "generic-elder_health-006-e", text: "靠……說實話我有點怕檢查結果……", archetype: "meek", retort: "怕也要面對，早知道早安心。" },
      { id: "generic-elder_health-006-f", text: "機掰，我靠自我感覺良好代替檢查。", archetype: "backfire", retort: "（沒人覺得好笑）夠了。" },
      { id: "generic-elder_health-006-g", text: "去死，我在等免費健檢方案再去。", archetype: "backfire", retort: "（大家笑不出來）白目。" },
      { id: "generic-elder_health-006-h", text: "機掰，檢不檢查是我的事，先檢查你的嘴，死老頭。", archetype: "landmine", retort: "你這什麼話，明年不用來了！" },
    ],
  },
  {
    id: "generic-elder_health-007",
    text: "年紀到了，要多運動、多走路知道嗎？",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-007-a", text: "幹，會運動，你的嘴也可以少走幾步。", archetype: "perfect", retort: "是喔，算你他媽的厲害。" },
      { id: "generic-elder_health-007-b", text: "先問你自己最近運動量夠不夠？", archetype: "deflect", retort: "還可以啦，我每天都去散步。" },
      { id: "generic-elder_health-007-c", text: "笑死，運動先放著，這道菜聞起來就很有能量。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-007-d", text: "有在努力，只是工作忙比較少動……", archetype: "meek", retort: "忙也要抽空動一動，別偷懶。" },
      { id: "generic-elder_health-007-e", text: "幹……說實話我不太喜歡運動……", archetype: "meek", retort: "不喜歡也要動，不然身體會出問題。" },
      { id: "generic-elder_health-007-f", text: "他媽的滑手機也算一種手部運動。", archetype: "backfire", retort: "（沒人理你）……北七喔。" },
      { id: "generic-elder_health-007-g", text: "去你的鍛鍊，我靠意志力就好。", archetype: "backfire", retort: "（全場安靜）……白目。" },
      { id: "generic-elder_health-007-h", text: "去死，運不運動不用你管，管你膝蓋，老東西。", archetype: "landmine", retort: "（臉色一沉）你這什麼口氣！" },
    ],
  },
  {
    id: "generic-elder_health-008",
    text: "是不是都喝冰的？要多喝溫水啦。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-008-a", text: "幹，喝冰的，至少心比你的話還熱。", archetype: "perfect", retort: "（語塞，喝茶掩飾）機掰。" },
      { id: "generic-elder_health-008-b", text: "笑死，先問你當年喝溫水還冰水長大的？", archetype: "deflect", retort: "我那時候都喝溫水，比較養生。" },
      { id: "generic-elder_health-008-c", text: "哭爸，喝什麼先放著，這杯茶要不要先喝一口？", archetype: "deflect", retort: "好啊好啦，先喝再說。" },
      { id: "generic-elder_health-008-d", text: "說實話，我比較習慣喝冰的……", archetype: "meek", retort: "習慣要改，冰的對身體不好。" },
      { id: "generic-elder_health-008-e", text: "靠……有在改善，偶爾還是會忍不住……", archetype: "meek", retort: "忍不住也要克制一下。" },
      { id: "generic-elder_health-008-f", text: "去你的溫水，冰的解渴效率比較高。", archetype: "backfire", retort: "（沒人捧場，場面冷掉）" },
      { id: "generic-elder_health-008-g", text: "機掰，我把溫水當偶爾的獎勵就好。", archetype: "backfire", retort: "（冷場）……夠了喔。" },
      { id: "generic-elder_health-008-h", text: "喝冰喝熱是我的事，你他媽的話才透心涼，老太婆。", archetype: "landmine", retort: "我是關心你，你兇什麼兇！" },
    ],
  },
  {
    id: "generic-elder_health-009",
    text: "睡眠不足會影響身體，你要早點睡。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-009-a", text: "幹，會早睡，你的念叨也早點結束吧。", archetype: "perfect", retort: "你這張嘴，他媽的不饒人。" },
      { id: "generic-elder_health-009-b", text: "先問你自己最近睡得好不好？", archetype: "deflect", retort: "還可以啦，年紀大比較淺眠。" },
      { id: "generic-elder_health-009-c", text: "北七，睡眠先放著，這道菜要不要先吃一口再聊？", archetype: "deflect", retort: "好啦好啦，先吃再說。" },
      { id: "generic-elder_health-009-d", text: "說實話，最近確實常常晚睡……", archetype: "meek", retort: "晚睡不行，要早點調整。" },
      { id: "generic-elder_health-009-e", text: "幹……有在改善，工作太忙沒辦法……", archetype: "meek", retort: "忙也要想辦法擠出時間睡覺。" },
      { id: "generic-elder_health-009-f", text: "他媽的睡眠不足可以靠意志力補回來。", archetype: "backfire", retort: "（沒人捧場）機掰。" },
      { id: "generic-elder_health-009-g", text: "去你的睡眠，咖啡因永久替代就好。", archetype: "backfire", retort: "幹，你在講三小。" },
      { id: "generic-elder_health-009-h", text: "去你的，睡不睡足不用你算，老不死。", archetype: "landmine", retort: "（找救兵）你們聽她剛剛講什麼！" },
    ],
  },
  {
    id: "generic-elder_health-010",
    text: "這個排毒秘訣很有效，你要照做喔。",
    topic: "elder_health",
    options: [
      { id: "generic-elder_health-010-a", text: "照做啊，幹，第一步先排掉你的碎念。", archetype: "perfect", retort: "（尷尬笑笑，換話題）機掰。" },
      { id: "generic-elder_health-010-b", text: "靠，先問這秘訣是聽誰講的，很唬爛。", archetype: "deflect", retort: "這個很多人都在傳，效果很好。" },
      { id: "generic-elder_health-010-c", text: "靠北，秘訣先放著，這道菜看起來就很養生。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-elder_health-010-d", text: "好啦，我先試試看再說……", archetype: "meek", retort: "試試看而已？要認真照做。" },
      { id: "generic-elder_health-010-e", text: "靠……說實話我對這秘訣半信半疑……", archetype: "meek", retort: "半信半疑也要試試看啊。" },
      { id: "generic-elder_health-010-f", text: "機掰，我要把這秘訣寫成書出版。", archetype: "backfire", retort: "（沒人接話）……北七。" },
      { id: "generic-elder_health-010-g", text: "去你的健身房，這個超划算又有效。", archetype: "backfire", retort: "（沒人覺得好笑）白目。" },
      { id: "generic-elder_health-010-h", text: "幹，排不排毒是我的事，先排你碎念，老東西。", archetype: "landmine", retort: "你這什麼口氣，太誇張了！" },
    ],
  },
] satisfies Question[];
