import type { Question } from "@/content/types";

// situations:
// 001 說變胖了
// 002 說變老/白頭髮變多
// 003 說黑眼圈很重看起來很累
// 004 說今天氣色不好
// 005 說髮型/穿著跟以前不一樣
// 006 說瘦了是不是沒吃飯
// 007 說皮膚變差
// 008 說站姿駝背沒精神
// 009 說過年穿著太隨便
// 010 說臉看起來腫腫的

export default [
  {
    id: "generic-appearance-001",
    text: "是不是變胖了？臉圓了一圈。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-001-a", text: "圓的是我的臉，幹，尖酸的是你這張嘴。", archetype: "perfect", retort: "（語塞，假笑帶過）" },
      { id: "generic-appearance-001-b", text: "靠，你們今天的菜是不是特別下飯？", archetype: "deflect", retort: "當然，多吃一點啊！" },
      { id: "generic-appearance-001-c", text: "胖不胖先別提，你們今天氣色特別好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-appearance-001-d", text: "有一點啦，幹……最近比較沒運動。", archetype: "meek", retort: "沒運動要注意一下健康喔。" },
      { id: "generic-appearance-001-e", text: "說實話，最近壓力大吃比較多……", archetype: "meek", retort: "壓力大也要照顧好自己。" },
      { id: "generic-appearance-001-f", text: "機掰，這是為了過年多存脂肪過冬。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-appearance-001-g", text: "我這叫充電模式，等等就消耗掉。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-001-h", text: "嘴巴那麼利，去你的老東西先照照自己。", archetype: "landmine", retort: "你他媽這什麼態度，沒大沒小！" },
    ],
  },
  {
    id: "generic-appearance-002",
    text: "怎麼白頭髮這麼多，是不是壓力大？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-002-a", text: "白的是髮，他媽的管太多是你這張嘴。", archetype: "perfect", retort: "（語塞，轉頭跟別人講）" },
      { id: "generic-appearance-002-b", text: "靠北，你們最近有沒有去染頭髮？", archetype: "deflect", retort: "有啊，最近才去弄過呢。" },
      { id: "generic-appearance-002-c", text: "白頭髮先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-appearance-002-d", text: "最近工作壓力真的比較大，幹……", archetype: "meek", retort: "壓力大要注意身體，別太拚。" },
      { id: "generic-appearance-002-e", text: "說實話，可能真的是老了……", archetype: "meek", retort: "老了也要保養一下啊。" },
      { id: "generic-appearance-002-f", text: "幹，這是我特地挑染的復古風。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-002-g", text: "他媽的我打算留著當智慧的證明。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-002-h", text: "壓力大不大不用你操心，去你的。", archetype: "landmine", retort: "（氣到講台語）幹恁娘你這什麼囡仔！" },
    ],
  },
  {
    id: "generic-appearance-003",
    text: "黑眼圈這麼重，是不是沒睡好？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-003-a", text: "黑眼圈能遮，幹，你嘴賤遮不住。", archetype: "perfect", retort: "（語塞，臉色微妙）" },
      { id: "generic-appearance-003-b", text: "笑死，你們最近睡得好不好？", archetype: "deflect", retort: "還可以啦，年紀大比較淺眠。" },
      { id: "generic-appearance-003-c", text: "黑眼圈先別提，你們今天穿得真好看。", archetype: "deflect", retort: "謝謝誇獎，特地挑的。" },
      { id: "generic-appearance-003-d", text: "最近工作比較忙，靠……沒睡好。", archetype: "meek", retort: "沒睡好要注意，別太累壞身體。" },
      { id: "generic-appearance-003-e", text: "說實話，最近有點失眠……", archetype: "meek", retort: "失眠要放輕鬆，別想太多。" },
      { id: "generic-appearance-003-f", text: "機掰，這叫煙燻妝，最近很流行。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-003-g", text: "我打算靠這個嚇跑討厭的人。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-003-h", text: "睡不睡好干你屁事，幹，老不死閉嘴吃飯。", archetype: "landmine", retort: "（翻舊帳）你他媽這樣講我！" },
    ],
  },
  {
    id: "generic-appearance-004",
    text: "你今天氣色怎麼看起來怪怪的？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-004-a", text: "氣色是我的事，他媽的嘴賤是你的事。", archetype: "perfect", retort: "呵呵…你很會講話喔。" },
      { id: "generic-appearance-004-b", text: "靠，你們今天特地打扮了嗎？氣色真好。", archetype: "deflect", retort: "有啊，過年當然要打扮一下。" },
      { id: "generic-appearance-004-c", text: "氣色先別提，這道菜聞起來好香喔。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-appearance-004-d", text: "最近比較累，幹……可能沒睡飽。", archetype: "meek", retort: "沒睡飽要早點休息喔。" },
      { id: "generic-appearance-004-e", text: "說實話，最近心情有點低落……", archetype: "meek", retort: "低落也要跟家人講講啊。" },
      { id: "generic-appearance-004-f", text: "幹，我這是特地調的蒼白妝，很潮。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-004-g", text: "他媽的我在練習吸血鬼的角色扮演。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-004-h", text: "氣色好不好，輪不到你這張嘴評分，去死。", archetype: "landmine", retort: "你他媽敢這樣講長輩，沒大沒小！" },
    ],
  },
  {
    id: "generic-appearance-005",
    text: "你這個髮型是怎麼回事？跟以前差好多。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-005-a", text: "髮型換了，幹，你嫌人的台詞倒沒換。", archetype: "perfect", retort: "你這孩子，反應真快。" },
      { id: "generic-appearance-005-b", text: "靠北，你們過年打算穿新衣服嗎？", archetype: "deflect", retort: "有啊，特地買了一件呢。" },
      { id: "generic-appearance-005-c", text: "髮型先別提，你們今天的穿搭真好看。", archetype: "deflect", retort: "謝謝誇獎，特地挑的呢。" },
      { id: "generic-appearance-005-d", text: "最近想換個造型，靠……還在適應。", archetype: "meek", retort: "適應一下就好，多嘗試也不錯。" },
      { id: "generic-appearance-005-e", text: "說實話，是設計師手滑弄的……", archetype: "meek", retort: "手滑也太誇張了吧。" },
      { id: "generic-appearance-005-f", text: "機掰，這是我自創的新風格。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-appearance-005-g", text: "我打算靠這個造型出道當網紅。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-005-h", text: "我的頭是我的，去你的老東西管好嘴。", archetype: "landmine", retort: "好心關心還被兇，他媽的真是的！" },
    ],
  },
  {
    id: "generic-appearance-006",
    text: "怎麼瘦這麼多？是不是沒好好吃飯？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-006-a", text: "瘦不是病，他媽的你這張嘴才難養。", archetype: "perfect", retort: "（假笑）你這孩子真敢講。" },
      { id: "generic-appearance-006-b", text: "笑死，你們今天有煮什麼好料嗎？", archetype: "deflect", retort: "有啊，等一下都給你補回來。" },
      { id: "generic-appearance-006-c", text: "瘦不瘦先別提，這道菜看起來好香。", archetype: "deflect", retort: "喜歡就多吃一點啊。" },
      { id: "generic-appearance-006-d", text: "最近比較忙，幹……三餐不太正常。", archetype: "meek", retort: "不正常要調整，身體要顧好。" },
      { id: "generic-appearance-006-e", text: "說實話，最近胃口不太好……", archetype: "meek", retort: "胃口不好要看醫生喔。" },
      { id: "generic-appearance-006-f", text: "幹，我在練成仙的體態，快飛升了。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-appearance-006-g", text: "他媽的我打算靠喝水維生，比較環保。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-006-h", text: "吃不吃是我的事，去你的，嘴閉一下會死？", archetype: "landmine", retort: "你他媽這什麼話，明年不用來了！" },
    ],
  },
  {
    id: "generic-appearance-007",
    text: "皮膚怎麼變差了，是不是熬夜？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-007-a", text: "皮膚差會好，幹，你嘴巴壞是天生的。", archetype: "perfect", retort: "是喔，算你厲害。" },
      { id: "generic-appearance-007-b", text: "靠，你們最近用什麼保養品？效果真好。", archetype: "deflect", retort: "喔，這個我可以跟你分享。" },
      { id: "generic-appearance-007-c", text: "皮膚先別提，你們今天氣色特別好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-appearance-007-d", text: "最近熬夜比較多，靠……沒好好保養。", archetype: "meek", retort: "熬夜不好，要早點睡。" },
      { id: "generic-appearance-007-e", text: "說實話，工作壓力大冒了不少痘……", archetype: "meek", retort: "壓力大要放鬆，別累壞自己。" },
      { id: "generic-appearance-007-f", text: "機掰，這叫自然系，走原生態路線。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-007-g", text: "我打算靠敷面膜逆天改命。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-007-h", text: "熬不熬夜不用你負責，幹，老不死閉嘴。", archetype: "landmine", retort: "（臉色一沉）你他媽這什麼口氣！" },
    ],
  },
  {
    id: "generic-appearance-008",
    text: "你是不是駝背了？站有點沒精神。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-008-a", text: "駝背能矯正，幹，你嘴歪矯正不了。", archetype: "perfect", retort: "（語塞，喝茶掩飾）" },
      { id: "generic-appearance-008-b", text: "靠北，你們最近有沒有去給人按摩？", archetype: "deflect", retort: "有啊，最近才去放鬆過呢。" },
      { id: "generic-appearance-008-c", text: "站姿先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-appearance-008-d", text: "最近坐辦公室久了，幹……姿勢不好。", archetype: "meek", retort: "姿勢不好要多起來動一動。" },
      { id: "generic-appearance-008-e", text: "說實話，最近肩頸真的很痠……", archetype: "meek", retort: "痠要去給人看一下，別拖。" },
      { id: "generic-appearance-008-f", text: "他媽的我這是模仿駱駝，比較有耐力。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-appearance-008-g", text: "幹，我在練隨時可以鞠躬的姿勢。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-008-h", text: "站不站直干你屁事，去你的站直良心。", archetype: "landmine", retort: "我他媽是關心你，你兇什麼兇！" },
    ],
  },
  {
    id: "generic-appearance-009",
    text: "過年怎麼穿這麼隨便？也不換一下。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-009-a", text: "隨便的是我衣服，幹，隨便嫌人是你嘴。", archetype: "perfect", retort: "你這張嘴，真的不饒人。" },
      { id: "generic-appearance-009-b", text: "笑死，你們今天穿的這件是新買的嗎？", archetype: "deflect", retort: "是啊，特地為過年買的。" },
      { id: "generic-appearance-009-c", text: "穿著先別提，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-appearance-009-d", text: "最近比較累，靠……就隨便穿一下。", archetype: "meek", retort: "隨便也要注意一下場合啦。" },
      { id: "generic-appearance-009-e", text: "說實話，好看的衣服都還沒洗……", archetype: "meek", retort: "沒洗就要早點準備啊。" },
      { id: "generic-appearance-009-f", text: "機掰，這是走極簡風，比較有質感。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-009-g", text: "我在測試家居服能不能撐過整個年假。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-009-h", text: "我穿什麼我決定，去你的老東西嘴該換季。", archetype: "landmine", retort: "（找救兵）你們聽聽她剛剛講什麼！" },
    ],
  },
  {
    id: "generic-appearance-010",
    text: "你的臉今天怎麼腫腫的？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-010-a", text: "臉腫會消，幹，你嘴巴的毒消不了。", archetype: "perfect", retort: "（尷尬笑笑，換話題）" },
      { id: "generic-appearance-010-b", text: "靠，你們今天的年菜是不是特別鹹？", archetype: "deflect", retort: "還好啦，你怎麼會這樣問。" },
      { id: "generic-appearance-010-c", text: "腫不腫先別提，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-appearance-010-d", text: "昨天可能吃太鹹，幹……有點水腫。", archetype: "meek", retort: "水腫要少吃點鹹的東西。" },
      { id: "generic-appearance-010-e", text: "說實話，可能是哭過，眼睛比較腫……", archetype: "meek", retort: "怎麼哭了？有什麼事跟我們說。" },
      { id: "generic-appearance-010-f", text: "他媽的這是我特地練的包子臉。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-010-g", text: "幹，我打算靠這張臉去拍年菜廣告。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-010-h", text: "腫不腫是我的事，去死，你嘴巴才真的腫。", archetype: "landmine", retort: "你他媽這什麼口氣，太誇張了！" },
    ],
  },
] satisfies Question[];
