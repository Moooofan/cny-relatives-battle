import type { Question } from "@/content/types";

// situations:
// 001 一直夾菜給你
// 002 說吃這麼少是不是在外面亂吃
// 003 逼你喝酒/飲料
// 004 說菜都涼了要多吃一點
// 005 說你太瘦要多補
// 006 逼吃特別費工的菜(有面子的菜)
// 007 說在減肥不健康
// 008 一直勸你再添飯
// 009 說剩菜不吃很浪費
// 010 逼你嘗試不敢吃的東西

export default [
  {
    id: "generic-food_push-001",
    text: "來，這個也夾給你，多吃一點。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-001-a", text: "幹，再夾我就打包，帶回去給晚輩吃。", archetype: "perfect", retort: "好啦好啦，算你他媽的贏。" },
      { id: "generic-food_push-001-b", text: "笑死，先喝湯，喝完才有胃口吃更多。", archetype: "deflect", retort: "對啦對啦，湯要先喝。" },
      { id: "generic-food_push-001-c", text: "靠，這道菜看起來特別費工，我要慢慢品嘗。", archetype: "deflect", retort: "算你識貨，多吃一點！" },
      { id: "generic-food_push-001-d", text: "好啦，幹……我盡量吃，肚子有點撐了……", archetype: "meek", retort: "撐了也要吃，難得回來一次。" },
      { id: "generic-food_push-001-e", text: "說實話，我最近吃比較少……", archetype: "meek", retort: "吃這麼少怎麼有體力！" },
      { id: "generic-food_push-001-f", text: "他媽的，我這叫少食養生法，健康。", archetype: "backfire", retort: "（沒人聽懂在講什麼）白目。" },
      { id: "generic-food_push-001-g", text: "去你的，我把肚子留給第二輪攻勢。", archetype: "backfire", retort: "（大家笑不出來，繼續夾）" },
      { id: "generic-food_push-001-h", text: "幹，吃不吃是我的事，夾這麼勤想胖死我，老東西。", archetype: "landmine", retort: "（翻舊帳）當年是誰把你帶大的！" },
    ],
  },
  {
    id: "generic-food_push-002",
    text: "吃這麼少，是不是在外面都亂吃？",
    topic: "food_push",
    options: [
      { id: "generic-food_push-002-a", text: "吃多吃少是我的事，你嘴上功夫他媽的很飽。", archetype: "perfect", retort: "（語塞）機掰，這先跳過。" },
      { id: "generic-food_push-002-b", text: "有啦，先吃青菜，等一下才有空間吃肉。", archetype: "deflect", retort: "對，青菜也要吃，均衡一點。" },
      { id: "generic-food_push-002-c", text: "笑死，在外面偶爾亂吃，但每次都想念這一桌。", archetype: "deflect", retort: "那就要多回來吃啊！" },
      { id: "generic-food_push-002-d", text: "在外面確實常常隨便吃……", archetype: "meek", retort: "隨便吃怎麼行，要好好照顧自己。" },
      { id: "generic-food_push-002-e", text: "靠……說實話最近食慾不太好……", archetype: "meek", retort: "食慾不好要去看醫生喔。" },
      { id: "generic-food_push-002-f", text: "幹，我在外面吃的都是能量膠囊，很科技。", archetype: "backfire", retort: "（沒人相信這個說法）白目。" },
      { id: "generic-food_push-002-g", text: "去死，我把胃留給回家吃飯用，划算。", archetype: "backfire", retort: "（大家笑不出來）夠了。" },
      { id: "generic-food_push-002-h", text: "吃多吃少不用你他媽的管，管好你那攤，老不死。", archetype: "landmine", retort: "你這孩子講話越來越衝了！" },
    ],
  },
  {
    id: "generic-food_push-003",
    text: "來，喝一杯，過年不喝怎麼行。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-003-a", text: "幹，不喝也行，你的酒量留給你血壓。", archetype: "perfect", retort: "你少貧嘴，去死，快吃飯。" },
      { id: "generic-food_push-003-b", text: "笑死，先問這杯什麼，聞起來很香耶。", archetype: "deflect", retort: "這個是我自己泡的，好喝吧！" },
      { id: "generic-food_push-003-c", text: "哭爸，喝之前先讓我吃點東西墊墊胃。", archetype: "deflect", retort: "好啦好啦，快吃快吃再喝。" },
      { id: "generic-food_push-003-d", text: "喝一點點就好，我酒量不太好……", archetype: "meek", retort: "一點點才不算過年啊。" },
      { id: "generic-food_push-003-e", text: "幹……說實話我開車，不太方便喝……", archetype: "meek", retort: "那喝飲料也行，意思一下。" },
      { id: "generic-food_push-003-f", text: "他媽的這叫策略性微醺，等等變靈魂歌手。", archetype: "backfire", retort: "（大家笑不出來）夠了喔。" },
      { id: "generic-food_push-003-g", text: "去你的酒，我喝湯代替，效果差不多。", archetype: "backfire", retort: "（大家笑不出來）白目。" },
      { id: "generic-food_push-003-h", text: "去你的，喝不喝是我的事，顧好你命，死老頭。", archetype: "landmine", retort: "現在的年輕人真的沒大沒小！" },
    ],
  },
  {
    id: "generic-food_push-004",
    text: "菜都涼了，快趁熱多吃一點。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-004-a", text: "幹，菜涼了沒關係，你的話比菜還涼。", archetype: "perfect", retort: "（轉頭跟旁邊講）你們聽聽。" },
      { id: "generic-food_push-004-b", text: "笑死，先喝口湯暖暖胃，才吃得下更多。", archetype: "deflect", retort: "對啦對啦，湯要先喝。" },
      { id: "generic-food_push-004-c", text: "北七，這道菜聞起來特別香，我要慢慢享受。", archetype: "deflect", retort: "喜歡就多吃一點啊！" },
      { id: "generic-food_push-004-d", text: "好啦，我再吃一點，肚子有點撐了……", archetype: "meek", retort: "撐了也要吃，別浪費。" },
      { id: "generic-food_push-004-e", text: "靠……說實話我吃得差不多了……", archetype: "meek", retort: "差不多是多少，再吃一點！" },
      { id: "generic-food_push-004-f", text: "去你的，我吃飯速度調成慢動作模式。", archetype: "backfire", retort: "（沒人理你）……北七喔。" },
      { id: "generic-food_push-004-g", text: "他媽的我在練用意念消化，比較快。", archetype: "backfire", retort: "（全場安靜）……白目。" },
      { id: "generic-food_push-004-h", text: "吃不吃熱的是我的事，你他媽的很雞婆。", archetype: "landmine", retort: "（氣到甩筷子）欠管教喔你！" },
    ],
  },
  {
    id: "generic-food_push-005",
    text: "你怎麼這麼瘦，要多補一補身體。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-005-a", text: "幹，瘦是我的事，你嘴巴不用補這麼多話。", archetype: "perfect", retort: "講話這麼衝，跟誰學的，機掰。" },
      { id: "generic-food_push-005-b", text: "先問這道補湯怎麼燉的，聞起來就很補。", archetype: "deflect", retort: "這個秘訣可多了，慢慢跟你說。" },
      { id: "generic-food_push-005-c", text: "靠北，補之前先讓我把這碗飯吃完。", archetype: "deflect", retort: "好，吃完再補一碗！" },
      { id: "generic-food_push-005-d", text: "最近確實比較瘦，可能太累了……", archetype: "meek", retort: "太累要多補，別讓自己餓著。" },
      { id: "generic-food_push-005-e", text: "幹……說實話我食量本來就比較小……", archetype: "meek", retort: "食量小也要慢慢練大一點。" },
      { id: "generic-food_push-005-f", text: "他媽的我在練仙風道骨的身材，有氣質。", archetype: "backfire", retort: "（沒人相信這個說法）白目。" },
      { id: "generic-food_push-005-g", text: "去你的體重，過年這幾天集中補回來。", archetype: "backfire", retort: "（冷場）……夠了喔。" },
      { id: "generic-food_push-005-h", text: "機掰，瘦不瘦不用你操心，操心你嘴，老太婆。", archetype: "landmine", retort: "你這什麼態度，明年不用來了！" },
    ],
  },
  {
    id: "generic-food_push-006",
    text: "這道菜特別費工做的，你一定要吃。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-006-a", text: "幹，費工是真的，逼人吃也真的辛苦。", archetype: "perfect", retort: "（笑不出來，硬接話）夠了。" },
      { id: "generic-food_push-006-b", text: "先問這道菜的做法，我想學起來。", archetype: "deflect", retort: "這個秘訣可要傳授給你囉。" },
      { id: "generic-food_push-006-c", text: "靠，費工的菜先吃一口，等等再回來吃第二口。", archetype: "deflect", retort: "第二口記得回來吃喔！" },
      { id: "generic-food_push-006-d", text: "好啦，我吃一點，肚子真的有點撐……", archetype: "meek", retort: "撐了也要吃，這麼費工不能浪費。" },
      { id: "generic-food_push-006-e", text: "靠……說實話我對這個口味不太習慣……", archetype: "meek", retort: "不習慣也要試試看嘛。" },
      { id: "generic-food_push-006-f", text: "去你的，我要拍照發群組炫耀一下。", archetype: "backfire", retort: "（沒人捧場）機掰。" },
      { id: "generic-food_push-006-g", text: "他媽的我要留一口做傳家紀念。", archetype: "backfire", retort: "幹，你在講三小。" },
      { id: "generic-food_push-006-h", text: "去死，吃不吃是我的事，逼人吃比逼供兇，老東西。", archetype: "landmine", retort: "（叫你媽出來）你自己教的小孩！" },
    ],
  },
  {
    id: "generic-food_push-007",
    text: "減什麼肥，不健康啦，多吃點。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-007-a", text: "幹，減肥是我的事，你別幫我加量。", archetype: "perfect", retort: "是喔，隨便你他媽的怎麼講。" },
      { id: "generic-food_push-007-b", text: "先吃青菜，青菜多對身體比較好。", archetype: "deflect", retort: "對啦，青菜也要吃一點。" },
      { id: "generic-food_push-007-c", text: "笑死，減肥先放一邊，這道菜的營養看起來很夠。", archetype: "deflect", retort: "夠不夠不知道，先吃再說。" },
      { id: "generic-food_push-007-d", text: "有在控制飲食，怕吃太多不舒服……", archetype: "meek", retort: "不舒服也要吃一點，別餓肚子。" },
      { id: "generic-food_push-007-e", text: "幹……說實話最近真的在注意身材……", archetype: "meek", retort: "注意身材也不能不吃東西啊。" },
      { id: "generic-food_push-007-f", text: "機掰，這叫科學化飲食，不是減肥。", archetype: "backfire", retort: "（沒人聽懂在講什麼）白目。" },
      { id: "generic-food_push-007-g", text: "去你的，我靠意志力消化雙倍熱量。", archetype: "backfire", retort: "（沒人接話）……北七。" },
      { id: "generic-food_push-007-h", text: "幹，減不減肥不用你管，管好份量，死老頭。", archetype: "landmine", retort: "好，你行，以後別來找我！" },
    ],
  },
  {
    id: "generic-food_push-008",
    text: "飯再添一碗，不夠再去廚房裝。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-008-a", text: "幹，不用添了，你的關心已經夠我吃到飽。", archetype: "perfect", retort: "（語塞，拿筷子夾菜掩飾）機掰。" },
      { id: "generic-food_push-008-b", text: "先讓我把這碗菜配完，飯等一下再添。", archetype: "deflect", retort: "好啦好啦，配完再添。" },
      { id: "generic-food_push-008-c", text: "哭爸，飯先放著，這鍋湯我要先喝一碗。", archetype: "deflect", retort: "湯先喝也好，喝完再添飯。" },
      { id: "generic-food_push-008-d", text: "好啦，再添一點點就好……", archetype: "meek", retort: "一點點不夠，多添一點！" },
      { id: "generic-food_push-008-e", text: "靠……說實話我真的吃不下更多了……", archetype: "meek", retort: "吃不下也要勉強一下嘛。" },
      { id: "generic-food_push-008-f", text: "他媽的我的胃已經戰略性撤退了。", archetype: "backfire", retort: "（沒人覺得好笑）白目。" },
      { id: "generic-food_push-008-g", text: "去你的，我把飯留給明天當紀念品。", archetype: "backfire", retort: "（大家笑不出來）夠了。" },
      { id: "generic-food_push-008-h", text: "去你的，添不添飯是我的事，比服務生兇，老不死。", archetype: "landmine", retort: "（臉色鐵青）你講話太過分了！" },
    ],
  },
  {
    id: "generic-food_push-009",
    text: "剩這麼多菜，不吃很浪費耶。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-009-a", text: "幹，會浪費，你念的這幾句也是浪費力氣。", archetype: "perfect", retort: "你這孩子，越來越會頂嘴，機掰。" },
      { id: "generic-food_push-009-b", text: "先幫忙打包，明天再慢慢消化這些美味。", archetype: "deflect", retort: "對，打包帶回去吃也好。" },
      { id: "generic-food_push-009-c", text: "北七，浪費的事先放著，先問這道菜還有沒有做法。", archetype: "deflect", retort: "有啊，改天教你怎麼做。" },
      { id: "generic-food_push-009-d", text: "好啦，我再吃一點，肚子真的很撐……", archetype: "meek", retort: "撐了也要吃，別浪費。" },
      { id: "generic-food_push-009-e", text: "幹……說實話我真的裝不下了……", archetype: "meek", retort: "裝不下也要打包帶走。" },
      { id: "generic-food_push-009-f", text: "去你的，我建議大家許願讓菜自動消失。", archetype: "backfire", retort: "（大家笑不出來）夠了喔。" },
      { id: "generic-food_push-009-g", text: "他媽的我用眼神吃完剩下的菜。", archetype: "backfire", retort: "（大家笑不出來）白目。" },
      { id: "generic-food_push-009-h", text: "浪不浪費是我的事，你他媽的碎念浪費耳力，老太婆。", archetype: "landmine", retort: "白養你這麼多年，換來這句話！" },
    ],
  },
  {
    id: "generic-food_push-010",
    text: "這個很補，你一定要試試看。",
    topic: "food_push",
    options: [
      { id: "generic-food_push-010-a", text: "幹，補的東西再多，補不了你的耐心。", archetype: "perfect", retort: "（假笑）好，算你他媽有理。" },
      { id: "generic-food_push-010-b", text: "先問這個怎麼做的，聽起來很特別。", archetype: "deflect", retort: "這個做法可講究了，慢慢說給你聽。" },
      { id: "generic-food_push-010-c", text: "靠北，先讓我配點別的菜，等一下再挑戰這個。", archetype: "deflect", retort: "好，等一下一定要吃喔。" },
      { id: "generic-food_push-010-d", text: "好啦，我試一小口看看……", archetype: "meek", retort: "一小口不夠，多吃一點！" },
      { id: "generic-food_push-010-e", text: "靠……說實話我對這個真的有點怕……", archetype: "meek", retort: "怕什麼，試了就知道好吃。" },
      { id: "generic-food_push-010-f", text: "機掰，我閉著眼睛吃比較有儀式感。", archetype: "backfire", retort: "（沒人理你）……北七喔。" },
      { id: "generic-food_push-010-g", text: "去你的，我要拍影片記錄這歷史一口。", archetype: "backfire", retort: "（全場安靜）……白目。" },
      { id: "generic-food_push-010-h", text: "去死，補不補是我的事，先補你分寸，死老頭。", archetype: "landmine", retort: "（氣到講台語）你這是什麼款！" },
    ],
  },
] satisfies Question[];
