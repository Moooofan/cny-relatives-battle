import type { Question } from "@/content/types";

// situations:
// 001 問還在租房子
// 002 問買房頭期款存了沒
// 003 問是不是該回老家買房比較便宜
// 004 說租金都在幫房東繳貸款
// 005 問要不要跟爸媽一起住存錢
// 006 問房貸壓力大不大
// 007 問要不要現在進場買房
// 008 問是不是該跟伴侶一起買房
// 009 說以前房子便宜現在年輕人不努力
// 010 問買房要不要靠家裡幫忙

export default [
  {
    id: "generic-housing-001",
    text: "都幾歲了還在租房子喔？",
    topic: "housing",
    options: [
      { id: "generic-housing-001-a", text: "租房也好，幹，至少不用年年聽你嫌貸款。", archetype: "perfect", retort: "（語塞）幹你娘咧，臉一沉又鬆開。" },
      { id: "generic-housing-001-b", text: "先問你們，當初買房挑房子的秘訣，靠北。", archetype: "deflect", retort: "那個要看地段跟採光啦。" },
      { id: "generic-housing-001-c", text: "租房先放著，你們房子整理得真漂亮，笑死。", archetype: "deflect", retort: "謝謝誇獎，過年特地打掃的。" },
      { id: "generic-housing-001-d", text: "有在存頭期款，但還差很多，幹……", archetype: "meek", retort: "差多少？要加快腳步存錢。" },
      { id: "generic-housing-001-e", text: "說實話，現在房價真的買不起……", archetype: "meek", retort: "買不起也要想辦法，別放棄。" },
      { id: "generic-housing-001-f", text: "我打算租到房東主動送我一間，幹。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-housing-001-g", text: "我在等房價自己跌下來再買，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-001-h", text: "租不租房是我的事，老東西你他媽的算得比房仲勤。", archetype: "landmine", retort: "長輩面前這樣講話，你他媽的太誇張！" },
    ],
  },
  {
    id: "generic-housing-002",
    text: "頭期款存到多少了？該買房了吧。",
    topic: "housing",
    options: [
      { id: "generic-housing-002-a", text: "存多少是我的事，幹，你要不要先借我頭期款？", archetype: "perfect", retort: "講贏就講贏，幹你娘咧快吃菜。" },
      { id: "generic-housing-002-b", text: "先問你們，當初買房貸了幾年，靠北。", archetype: "deflect", retort: "那時候貸了二十年才還完。" },
      { id: "generic-housing-002-c", text: "頭期款先別提，紅包倒是可以先給，笑死。", archetype: "deflect", retort: "你這孩子，會轉話題。" },
      { id: "generic-housing-002-d", text: "還差一大截，薪水存不太起來，幹……", archetype: "meek", retort: "存不起來要想辦法開源節流。" },
      { id: "generic-housing-002-e", text: "說實話，現在物價高，很難存……", archetype: "meek", retort: "難存也要硬存，不然永遠買不了。" },
      { id: "generic-housing-002-f", text: "我打算存一輩子，反正房子會一直漲，幹。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-housing-002-g", text: "我在研究用信用卡分期買房，機掰。", archetype: "backfire", retort: "（大家聽不懂在講什麼）" },
      { id: "generic-housing-002-h", text: "存多少不用你算，老不死你他媽的算得比銀行細。", archetype: "landmine", retort: "沒大沒小，你他媽的長輩面前這樣講！" },
    ],
  },
  {
    id: "generic-housing-003",
    text: "回老家買比較便宜，怎麼不考慮？",
    topic: "housing",
    options: [
      { id: "generic-housing-003-a", text: "老家便宜，幹，那你要先搬回去示範？", archetype: "perfect", retort: "（語塞）幹你娘咧，硬轉話題。" },
      { id: "generic-housing-003-b", text: "先說老家最近房價漲了沒，靠北。", archetype: "deflect", retort: "有啊，聽說也漲不少呢。" },
      { id: "generic-housing-003-c", text: "買房的事先放一邊，你們家菜真好吃，笑死。", archetype: "deflect", retort: "喜歡就多吃一點啊。" },
      { id: "generic-housing-003-d", text: "有考慮過，但工作機會比較少，幹……", archetype: "meek", retort: "工作機會可以再找看看啊。" },
      { id: "generic-housing-003-e", text: "說實話，離開熟悉的地方會不安……", archetype: "meek", retort: "不安也要學著適應新環境。" },
      { id: "generic-housing-003-f", text: "我打算遠端工作住老家賺外地薪水，幹。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-housing-003-g", text: "我在等老家蓋捷運再搬回去，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-003-h", text: "買哪裡是我的事，老東西你他媽的很雞婆。", archetype: "landmine", retort: "（翻舊帳）你他媽的小時候還不是我顧的！" },
    ],
  },
  {
    id: "generic-housing-004",
    text: "租金都在幫房東繳房貸耶，划算嗎？",
    topic: "housing",
    options: [
      { id: "generic-housing-004-a", text: "划算，幹，至少沒有欠銀行三十年還嫌東嫌西。", archetype: "perfect", retort: "你嘴巴真的，幹你娘咧很利。" },
      { id: "generic-housing-004-b", text: "先問你們，房東是不是也常常漲租金，靠北。", archetype: "deflect", retort: "有啊，每年都在喊漲。" },
      { id: "generic-housing-004-c", text: "划不划算先別提，你們紅包比較划算，笑死。", archetype: "deflect", retort: "你這孩子，很會轉移話題。" },
      { id: "generic-housing-004-d", text: "說實話，想到這個就會有點無奈，幹……", archetype: "meek", retort: "無奈也要想辦法存錢買房。" },
      { id: "generic-housing-004-e", text: "有在看房，但頭期款還差很多……", archetype: "meek", retort: "差多少？家裡能幫忙嗎？" },
      { id: "generic-housing-004-f", text: "沒關係，我把房東當室友，感情很好，幹。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-housing-004-g", text: "我打算跟房東結拜當兄弟省房租，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-004-h", text: "划不划算是我的事，老不死你他媽的算得比會計兇。", archetype: "landmine", retort: "我是為你好，你他媽的這樣對我！" },
    ],
  },
  {
    id: "generic-housing-005",
    text: "要不要搬回來跟爸媽住，比較省？",
    topic: "housing",
    options: [
      { id: "generic-housing-005-a", text: "搬回去可以，幹，你先答應不管我門禁。", archetype: "perfect", retort: "（笑笑帶過）幹你娘咧，不再追問。" },
      { id: "generic-housing-005-b", text: "先問你們，現在家裡房間還空著嗎，靠北。", archetype: "deflect", retort: "空著啊，隨時歡迎你回來。" },
      { id: "generic-housing-005-c", text: "住哪裡先別提，先問問晚餐吃什麼，笑死。", archetype: "deflect", retort: "今天煮你最愛吃的啦。" },
      { id: "generic-housing-005-d", text: "有考慮過，只是想保留一點自己空間，幹……", archetype: "meek", retort: "自己的空間跟省錢要衡量一下。" },
      { id: "generic-housing-005-e", text: "說實話，通勤時間會拉得比較長……", archetype: "meek", retort: "時間長一點也沒關係，省錢重要。" },
      { id: "generic-housing-005-f", text: "搬回去我保證比警察還準時門禁，幹。", archetype: "backfire", retort: "（場面突然安靜下來）" },
      { id: "generic-housing-005-g", text: "我搬回去純粹是想蹭你們家網路，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-005-h", text: "住哪是我的事，老東西你他媽的干涉得比房東兇。", archetype: "landmine", retort: "（語帶威脅）好啊，你他媽的行你上！" },
    ],
  },
  {
    id: "generic-housing-006",
    text: "背了房貸，壓力是不是很大？",
    topic: "housing",
    options: [
      { id: "generic-housing-006-a", text: "壓力大，幹，但沒有你每年問這句大。", archetype: "perfect", retort: "是喔，幹你娘咧，你倒很快嘴。" },
      { id: "generic-housing-006-b", text: "先問你們當年房貸利率是多少，靠北。", archetype: "deflect", retort: "那時候利率也不算低耶。" },
      { id: "generic-housing-006-c", text: "房貸的事先放著，你們今天菜煮得真好，笑死。", archetype: "deflect", retort: "喜歡的話多夾一點。" },
      { id: "generic-housing-006-d", text: "說實話，每個月都要精打細算，幹……", archetype: "meek", retort: "精打細算是對的，撐過去就好。" },
      { id: "generic-housing-006-e", text: "壓力真的不小，有時候會睡不好……", archetype: "meek", retort: "別給自己太大壓力，量力而為。" },
      { id: "generic-housing-006-f", text: "沒事，房貸就當每月的健身課程，幹。", archetype: "backfire", retort: "（沒人聽懂這個比喻）" },
      { id: "generic-housing-006-g", text: "我打算靠中樂透一次還清，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-006-h", text: "壓不壓力是我的事，老不死不用你他媽的年年加壓。", archetype: "landmine", retort: "你他媽的這什麼態度，欠管教！" },
    ],
  },
  {
    id: "generic-housing-007",
    text: "現在房價這麼高，還要進場買嗎？",
    topic: "housing",
    options: [
      { id: "generic-housing-007-a", text: "買不買是我的事，幹，你要不要先分析給我聽？", archetype: "perfect", retort: "（語塞）幹你娘咧，起身倒茶。" },
      { id: "generic-housing-007-b", text: "先問你們，覺得現在哪一區有潛力，靠北。", archetype: "deflect", retort: "這個我也不太清楚耶。" },
      { id: "generic-housing-007-c", text: "買不買先別提，你們家真的很溫馨，笑死。", archetype: "deflect", retort: "謝謝誇獎，隨時歡迎回來。" },
      { id: "generic-housing-007-d", text: "還在觀望，怕買了就套牢，幹……", archetype: "meek", retort: "觀望太久，房價只會更高。" },
      { id: "generic-housing-007-e", text: "說實話，現在真的買不下手……", archetype: "meek", retort: "買不下手也要想辦法籌措。" },
      { id: "generic-housing-007-f", text: "我打算等房價跌到我能接受再買，幹。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-housing-007-g", text: "我在研究元宇宙買房比較划算，機掰。", archetype: "backfire", retort: "（大家聽不懂在講什麼）" },
      { id: "generic-housing-007-h", text: "買不買房干你屁事，老東西你他媽的顧好自己存款。", archetype: "landmine", retort: "（甩手離開）跟你他媽的講不下去！" },
    ],
  },
  {
    id: "generic-housing-008",
    text: "是不是該跟另一半一起買房了？",
    topic: "housing",
    options: [
      { id: "generic-housing-008-a", text: "該不該買，幹，先問你們家誰名字要上斗大。", archetype: "perfect", retort: "你這反應，幹你娘咧跟你媽一個樣。" },
      { id: "generic-housing-008-b", text: "先問你們，買房前最重要看什麼，靠北。", archetype: "deflect", retort: "地段跟格局最重要啦。" },
      { id: "generic-housing-008-c", text: "買房先別提，你們家擺設真漂亮，笑死。", archetype: "deflect", retort: "謝謝，過年特地佈置的。" },
      { id: "generic-housing-008-d", text: "有討論過，只是還沒有共識，幹……", archetype: "meek", retort: "共識要早點談，別拖太久。" },
      { id: "generic-housing-008-e", text: "說實話，我們的財務規劃還沒談攏……", archetype: "meek", retort: "財務要先談好，以後才不會吵架。" },
      { id: "generic-housing-008-f", text: "我們打算用猜拳決定誰付頭期款，幹。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-housing-008-g", text: "我們在等對方先求婚再買房，機掰。", archetype: "backfire", retort: "（場面尷尬地安靜）" },
      { id: "generic-housing-008-h", text: "買不買房是我們的事，老不死你他媽的管得比代書細。", archetype: "landmine", retort: "現在小孩真的都他媽的這樣厚！" },
    ],
  },
  {
    id: "generic-housing-009",
    text: "我們那時候房子便宜，你們不努力啦。",
    topic: "housing",
    options: [
      { id: "generic-housing-009-a", text: "那時候便宜，幹，你當年薪水拿現在比比看。", archetype: "perfect", retort: "（假笑）幹你娘咧，拍拍你肩膀。" },
      { id: "generic-housing-009-b", text: "先問你們，那時候一坪多少錢，靠北。", archetype: "deflect", retort: "才幾萬塊，現在完全不能比。" },
      { id: "generic-housing-009-c", text: "努不努力先別提，你們菜煮得真用心，笑死。", archetype: "deflect", retort: "喜歡的話多吃一點。" },
      { id: "generic-housing-009-d", text: "現在真的比較辛苦，薪水漲得很慢，幹……", archetype: "meek", retort: "辛苦也要想辦法，時代不一樣了。" },
      { id: "generic-housing-009-e", text: "說實話，聽到這句話會有點難過……", archetype: "meek", retort: "難過歸難過，還是要面對現實。" },
      { id: "generic-housing-009-f", text: "我打算穿越回去那個年代買房，幹。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-housing-009-g", text: "我在等時光機技術成熟再說，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-009-h", text: "當年便宜不用你講，老東西你他媽的話才通膨快。", archetype: "landmine", retort: "（臉一沉）你他媽的這什麼意思！" },
    ],
  },
  {
    id: "generic-housing-010",
    text: "買房要不要跟家裡開口幫忙一下？",
    topic: "housing",
    options: [
      { id: "generic-housing-010-a", text: "開口可以，幹，你要先講收幾成利息。", archetype: "perfect", retort: "算了算了，幹你娘咧不跟你計較。" },
      { id: "generic-housing-010-b", text: "先問你們，家裡最近手頭寬裕嗎，靠北。", archetype: "deflect", retort: "哎，也是普普通通啦。" },
      { id: "generic-housing-010-c", text: "開不開口先別提，先問晚餐幾點開飯，笑死。", archetype: "deflect", retort: "快了快了，等一下就開飯。" },
      { id: "generic-housing-010-d", text: "有想過，只是不太好意思開口，幹……", archetype: "meek", retort: "不好意思也要講，家人才能幫忙。" },
      { id: "generic-housing-010-e", text: "說實話，光靠自己真的有點吃力……", archetype: "meek", retort: "吃力就講一聲，別悶著自己扛。" },
      { id: "generic-housing-010-f", text: "我打算跟家裡借錢然後裝作忘記還，幹。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-housing-010-g", text: "我在等中樂透就不用麻煩你們了，機掰。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-housing-010-h", text: "開不開口是我的事，老不死你他媽的催得比銀行急。", archetype: "landmine", retort: "好啊，隨便你，反正你他媽的最大！" },
    ],
  },
] satisfies Question[];
