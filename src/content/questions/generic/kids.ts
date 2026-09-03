import type { Question } from "@/content/types";

// situations:
// 001 直接問什麼時候生小孩
// 002 說朋友的小孩都生第二胎了
// 003 問頂客族是不是自私
// 004 說小孩是家裡的福氣
// 005 問養小孩會不會太累不敢生
// 006 說想抱孫子
// 007 問養小孩開銷會不會怕
// 008 說生小孩老了才有伴
// 009 問是不是不想生所以在拖
// 010 說趁年輕生小孩正是時候

export default [
  {
    id: "generic-kids-001",
    text: "什麼時候要生一個？家裡等著抱孫。",
    topic: "kids",
    options: [
      { id: "generic-kids-001-a", text: "生小孩不是你的KPI，你想抱孫先去借。", archetype: "perfect", retort: "（語塞，假笑帶過）" },
      { id: "generic-kids-001-b", text: "先說你們想要男生女生？我筆記一下。", archetype: "deflect", retort: "健康就好，健康就好啦！" },
      { id: "generic-kids-001-c", text: "生小孩前，先讓我把紅包存夠當教育費。", archetype: "deflect", retort: "你想得真周到。" },
      { id: "generic-kids-001-d", text: "還在考慮，時機還沒到……", archetype: "meek", retort: "時機不會自己到，要主動。" },
      { id: "generic-kids-001-e", text: "我們也想，但還在準備中……", archetype: "meek", retort: "準備太久，年紀會等不了人。" },
      { id: "generic-kids-001-f", text: "等我先養一隻貓練習當爸媽。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-kids-001-g", text: "我在等機器人保母上市再生。", archetype: "backfire", retort: "（大家一臉問號）" },
      { id: "generic-kids-001-h", text: "生不生是我子宮的事，不是你的業績。", archetype: "landmine", retort: "你這什麼態度，沒大沒小！" },
    ],
  },
  {
    id: "generic-kids-002",
    text: "隔壁的都生老二了，你們還在等？",
    topic: "kids",
    options: [
      { id: "generic-kids-002-a", text: "隔壁生老二，那隔壁老大多久沒回你家了？", archetype: "perfect", retort: "（語塞，轉頭跟別人講）" },
      { id: "generic-kids-002-b", text: "先說隔壁那個小孩最近會走路了嗎？", archetype: "deflect", retort: "會啊，走得很穩呢。" },
      { id: "generic-kids-002-c", text: "生小孩先不急，紅包先包一個意思意思。", archetype: "deflect", retort: "你這孩子，話題轉得快。" },
      { id: "generic-kids-002-d", text: "還在調整生活步調，慢慢來……", archetype: "meek", retort: "慢慢來也不要拖太久。" },
      { id: "generic-kids-002-e", text: "經濟上還在準備，怕不夠……", archetype: "meek", retort: "船到橋頭自然直啦。" },
      { id: "generic-kids-002-f", text: "我們在走精緻小家庭路線，一個就好。", archetype: "backfire", retort: "（沒人接話）" },
      { id: "generic-kids-002-g", text: "生小孩這種事要看星象排列。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-kids-002-h", text: "生不生是我們的事，你比戶政還勤。", archetype: "landmine", retort: "（氣到講台語）你這什麼囡仔講話！" },
    ],
  },
  {
    id: "generic-kids-003",
    text: "不生小孩，是不是太自私了？",
    topic: "kids",
    options: [
      { id: "generic-kids-003-a", text: "自私的定義，是不是包含逼人生小孩？", archetype: "perfect", retort: "（語塞，臉色微妙）" },
      { id: "generic-kids-003-b", text: "先問你們，養小孩最開心的是什麼時候？", archetype: "deflect", retort: "當然是他叫我的時候啊。" },
      { id: "generic-kids-003-c", text: "生不生先放一邊，你們的紅包先發一下。", archetype: "deflect", retort: "你這孩子，會抓重點。" },
      { id: "generic-kids-003-d", text: "我們有在想，只是還沒決定……", archetype: "meek", retort: "決定要趁早，別想太久。" },
      { id: "generic-kids-003-e", text: "說實話，我們還沒準備好……", archetype: "meek", retort: "準備好的定義是什麼啦？" },
      { id: "generic-kids-003-f", text: "我把自由當小孩養，一樣有成就感。", archetype: "backfire", retort: "（沒人接話，場面安靜）" },
      { id: "generic-kids-003-g", text: "我養的多肉植物也算半個小孩。", archetype: "backfire", retort: "（大家不知道怎麼回應）" },
      { id: "generic-kids-003-h", text: "生不生不用你貼標籤，你先管好你自己。", archetype: "landmine", retort: "（翻舊帳）我當年多疼你，你這樣講我！" },
    ],
  },
  {
    id: "generic-kids-004",
    text: "有小孩才是福氣，你們考慮一下。",
    topic: "kids",
    options: [
      { id: "generic-kids-004-a", text: "福氣的定義很多，你的碎念不算一種。", archetype: "perfect", retort: "呵呵…你很會講話喔。" },
      { id: "generic-kids-004-b", text: "先說你當年帶小孩最有成就感的事？", archetype: "deflect", retort: "那可多了，講三天三夜都講不完。" },
      { id: "generic-kids-004-c", text: "福氣先放著，紅包才是眼前的福氣。", archetype: "deflect", retort: "你這孩子，很會講。" },
      { id: "generic-kids-004-d", text: "我們知道，還在考慮時機……", archetype: "meek", retort: "考慮久了，福氣會跑掉喔。" },
      { id: "generic-kids-004-e", text: "會怕自己顧不好，壓力很大……", archetype: "meek", retort: "誰不是邊做邊學的。" },
      { id: "generic-kids-004-f", text: "我把福氣都省下來買股票了。", archetype: "backfire", retort: "（沒人聽懂在講什麼）" },
      { id: "generic-kids-004-g", text: "我覺得養寵物福氣也很夠了啦。", archetype: "backfire", retort: "（場面尷尬）" },
      { id: "generic-kids-004-h", text: "福氣是我們自己定義，不用你們來教。", archetype: "landmine", retort: "你敢這樣講長輩，沒大沒小！" },
    ],
  },
  {
    id: "generic-kids-005",
    text: "是不是怕累，才不敢生小孩？",
    topic: "kids",
    options: [
      { id: "generic-kids-005-a", text: "怕累是真的，怕你這樣問也是真的累。", archetype: "perfect", retort: "你這孩子，反應真快。" },
      { id: "generic-kids-005-b", text: "先說你們當年最累的時候是什麼？", archetype: "deflect", retort: "半夜起來餵奶，累到懷疑人生。" },
      { id: "generic-kids-005-c", text: "累不累先不管，先讓我喘口氣吃飯。", archetype: "deflect", retort: "好啦好啦，快吃快吃。" },
      { id: "generic-kids-005-d", text: "有點怕，怕自己撐不住……", archetype: "meek", retort: "撐不住也是要撐，當爸媽都這樣。" },
      { id: "generic-kids-005-e", text: "說實話，看你們這麼累會猶豫……", archetype: "meek", retort: "累歸累，值得啦。" },
      { id: "generic-kids-005-f", text: "我打算生了就交給長輩顧就好。", archetype: "backfire", retort: "（大家臉色微妙）" },
      { id: "generic-kids-005-g", text: "我在練體力，先去健身房重訓。", archetype: "backfire", retort: "（沒人接話）" },
      { id: "generic-kids-005-h", text: "累不累是我們承擔，你們少插嘴。", archetype: "landmine", retort: "好心關心還被兇，真是的！" },
    ],
  },
  {
    id: "generic-kids-006",
    text: "我什麼時候才能抱到孫子啊？",
    topic: "kids",
    options: [
      { id: "generic-kids-006-a", text: "等時機到，你會是第一個，先練體力。", archetype: "perfect", retort: "（假笑）你這孩子真敢講。" },
      { id: "generic-kids-006-b", text: "先說你最想幫孫子取什麼名字？", archetype: "deflect", retort: "這個我早就想好幾個了！" },
      { id: "generic-kids-006-c", text: "抱孫先等等，你先抱一下紅包袋。", archetype: "deflect", retort: "你這孩子，會轉話題。" },
      { id: "generic-kids-006-d", text: "會盡量的，時機還沒到而已……", archetype: "meek", retort: "時機不等人，要早點準備。" },
      { id: "generic-kids-006-e", text: "我們也想給你這個機會，但還在努力……", archetype: "meek", retort: "努力歸努力，還是要有結果。" },
      { id: "generic-kids-006-f", text: "要不然你先抱鄰居家的小孩練習？", archetype: "backfire", retort: "（沒人覺得這是好主意）" },
      { id: "generic-kids-006-g", text: "我送你一隻娃娃先抱著解解癮。", archetype: "backfire", retort: "（場面尷尬地安靜）" },
      { id: "generic-kids-006-h", text: "抱不抱孫是我們的事，不用你一直催命。", archetype: "landmine", retort: "你這什麼話，明年不用來了！" },
    ],
  },
  {
    id: "generic-kids-007",
    text: "現在養小孩很花錢，你們會怕嗎？",
    topic: "kids",
    options: [
      { id: "generic-kids-007-a", text: "會怕，但沒你逼問這麼可怕。", archetype: "perfect", retort: "是喔，算你厲害。" },
      { id: "generic-kids-007-b", text: "先問你當年養我們花了多少？", archetype: "deflect", retort: "那個數字講出來會嚇到你。" },
      { id: "generic-kids-007-c", text: "錢的事先放一邊，紅包先包厚一點。", archetype: "deflect", retort: "你想得美，先自己存！" },
      { id: "generic-kids-007-d", text: "會擔心，還在存教育基金……", archetype: "meek", retort: "存錢是對的，要提早規劃。" },
      { id: "generic-kids-007-e", text: "說實話，現在薪水真的不太夠……", archetype: "meek", retort: "不夠也要想辦法，大家都這樣過來的。" },
      { id: "generic-kids-007-f", text: "我打算讓小孩自己打工賺學費。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-kids-007-g", text: "我準備買樂透，中了就不怕了。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-kids-007-h", text: "錢的事我們自己會算，不用你們插嘴。", archetype: "landmine", retort: "（臉色一沉）你這什麼口氣！" },
    ],
  },
  {
    id: "generic-kids-008",
    text: "生個小孩，你老了才有伴啊。",
    topic: "kids",
    options: [
      { id: "generic-kids-008-a", text: "有伴很好，但你現在的伴是你自己的嘴。", archetype: "perfect", retort: "（語塞，喝茶掩飾）" },
      { id: "generic-kids-008-b", text: "先說你老了最想要孫子陪你做什麼？", archetype: "deflect", retort: "陪我看電視、聊天就好啦。" },
      { id: "generic-kids-008-c", text: "有伴的事先放一邊，你們才是我的伴啊。", archetype: "deflect", retort: "你這孩子，很會哄人。" },
      { id: "generic-kids-008-d", text: "會考慮，只是還沒準備好……", archetype: "meek", retort: "準備好的那天別拖太久。" },
      { id: "generic-kids-008-e", text: "說實話，我還沒想那麼遠……", archetype: "meek", retort: "早點想清楚，時間過得很快。" },
      { id: "generic-kids-008-f", text: "我打算養機器人當老伴，比較不會頂嘴。", archetype: "backfire", retort: "（大家不知道怎麼接）" },
      { id: "generic-kids-008-g", text: "我以後住安養院，比較不麻煩你們。", archetype: "backfire", retort: "（場面突然安靜）" },
      { id: "generic-kids-008-h", text: "我老了怎樣是我的事，不用你們算計。", archetype: "landmine", retort: "我是關心你，你兇什麼兇！" },
    ],
  },
  {
    id: "generic-kids-009",
    text: "是不是根本不想生，才一直拖？",
    topic: "kids",
    options: [
      { id: "generic-kids-009-a", text: "拖不拖是我的事，你問的頻率倒是很準時。", archetype: "perfect", retort: "你這張嘴，真的不饒人。" },
      { id: "generic-kids-009-b", text: "先說你們當年是怎麼決定要生的？", archetype: "deflect", retort: "那時候比較單純，想生就生了。" },
      { id: "generic-kids-009-c", text: "想不想先不聊，紅包先發一下壓壓驚。", archetype: "deflect", retort: "你這孩子，反應真快。" },
      { id: "generic-kids-009-d", text: "會拖，是因為心裡還沒準備好……", archetype: "meek", retort: "準備好的定義因人而異啦。" },
      { id: "generic-kids-009-e", text: "說實話，有時候真的會猶豫……", archetype: "meek", retort: "猶豫太久，機會會過去。" },
      { id: "generic-kids-009-f", text: "我在等星座運勢說適合生育的那年。", archetype: "backfire", retort: "（沒人接話）" },
      { id: "generic-kids-009-g", text: "我打算等中樂透再說，比較安心。", archetype: "backfire", retort: "（場面尷尬地笑）" },
      { id: "generic-kids-009-h", text: "拖不拖是我的人生，不用你們催。", archetype: "landmine", retort: "（找救兵）你們聽聽看她剛剛講什麼！" },
    ],
  },
  {
    id: "generic-kids-010",
    text: "趁年輕生一個，體力才夠用啦。",
    topic: "kids",
    options: [
      { id: "generic-kids-010-a", text: "體力留著沒問題，你的碎念才真的耗體力。", archetype: "perfect", retort: "（尷尬笑笑，換話題）" },
      { id: "generic-kids-010-b", text: "先說你年輕的時候體力有多好？", archetype: "deflect", retort: "我那時候一打三都沒問題！" },
      { id: "generic-kids-010-c", text: "體力先不聊，你先幫我夾點菜補體力。", archetype: "deflect", retort: "好啦好啦，多吃一點。" },
      { id: "generic-kids-010-d", text: "會考慮，只是現在時機還沒到……", archetype: "meek", retort: "時機是自己抓的，別再等了。" },
      { id: "generic-kids-010-e", text: "說實話，最近工作真的很忙……", archetype: "meek", retort: "忙也要留點時間給自己的人生。" },
      { id: "generic-kids-010-f", text: "我打算先報名鐵人三項練體力。", archetype: "backfire", retort: "（沒人聽懂這跟生小孩的關係）" },
      { id: "generic-kids-010-g", text: "我覺得年紀大生小孩比較有智慧。", archetype: "backfire", retort: "（大家一臉疑惑）" },
      { id: "generic-kids-010-h", text: "生不生我自己決定，年紀不用你算。", archetype: "landmine", retort: "你這什麼口氣，太誇張了！" },
    ],
  },
] satisfies Question[];
