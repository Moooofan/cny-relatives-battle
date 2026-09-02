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
      { id: "generic-appearance-001-a", text: "過年就是要圓圓滿滿，這叫福氣臉。", archetype: "perfect", retort: "有道理，圓一點才有福氣。" },
      { id: "generic-appearance-001-b", text: "先說你們今天的菜是不是特別下飯？", archetype: "deflect", retort: "當然，多吃一點啊！" },
      { id: "generic-appearance-001-c", text: "胖不胖先別提，你們今天氣色特別好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-appearance-001-d", text: "有一點啦，最近比較沒運動……", archetype: "meek", retort: "沒運動要注意一下健康喔。" },
      { id: "generic-appearance-001-e", text: "說實話，最近壓力大吃比較多……", archetype: "meek", retort: "壓力大也要照顧好自己。" },
      { id: "generic-appearance-001-f", text: "這是為了過年多存點脂肪過冬。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-appearance-001-g", text: "我這叫充電模式，等等就消耗掉。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-001-h", text: "胖不胖是我的事，不用你們一直說。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-appearance-002",
    text: "怎麼白頭髮這麼多，是不是壓力大？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-002-a", text: "這是智慧的顏色，我現在比較睿智了。", archetype: "perfect", retort: "哎唷，這孩子講話真有智慧。" },
      { id: "generic-appearance-002-b", text: "先說你們最近有沒有去染頭髮？", archetype: "deflect", retort: "有啊，最近才去弄過呢。" },
      { id: "generic-appearance-002-c", text: "白頭髮先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？睡得比較飽啦。" },
      { id: "generic-appearance-002-d", text: "最近工作壓力是真的比較大……", archetype: "meek", retort: "壓力大要注意身體，別太拚。" },
      { id: "generic-appearance-002-e", text: "說實話，可能真的是老了……", archetype: "meek", retort: "老了也要保養一下啊。" },
      { id: "generic-appearance-002-f", text: "這是我特地挑染的復古風。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-002-g", text: "我打算留著當作智慧的證明。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-002-h", text: "白頭髮是我的事，不用你們一直提。", archetype: "landmine", retort: "關心一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-appearance-003",
    text: "黑眼圈這麼重，是不是沒睡好？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-003-a", text: "這是我認真生活留下的勳章。", archetype: "perfect", retort: "你這孩子，講話真有一套。" },
      { id: "generic-appearance-003-b", text: "先問你們，最近睡得好不好？", archetype: "deflect", retort: "還可以啦，年紀大比較淺眠。" },
      { id: "generic-appearance-003-c", text: "黑眼圈先別提，你們今天穿得真好看。", archetype: "deflect", retort: "謝謝誇獎，特地挑的。" },
      { id: "generic-appearance-003-d", text: "最近工作比較忙，沒睡好……", archetype: "meek", retort: "沒睡好要注意，別太累壞身體。" },
      { id: "generic-appearance-003-e", text: "說實話，最近有點失眠……", archetype: "meek", retort: "失眠要放輕鬆，別想太多。" },
      { id: "generic-appearance-003-f", text: "這叫煙燻妝，最近很流行。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-003-g", text: "我打算靠這個嚇跑討厭的人。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-003-h", text: "黑眼圈是我的事，不用你們一直問。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-appearance-004",
    text: "你今天氣色怎麼看起來怪怪的？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-004-a", text: "在調整生理時鐘，等等吃飽就會發光。", archetype: "perfect", retort: "那快吃快吃，發光給我們看。" },
      { id: "generic-appearance-004-b", text: "先說你們今天特地打扮了嗎？氣色真好。", archetype: "deflect", retort: "有啊，過年當然要打扮一下。" },
      { id: "generic-appearance-004-c", text: "氣色先別提，這道菜聞起來好香喔。", archetype: "deflect", retort: "喜歡的話多吃一點啊。" },
      { id: "generic-appearance-004-d", text: "最近比較累，可能沒睡飽……", archetype: "meek", retort: "沒睡飽要早點休息喔。" },
      { id: "generic-appearance-004-e", text: "說實話，最近心情有點低落……", archetype: "meek", retort: "低落也要跟家人講講啊。" },
      { id: "generic-appearance-004-f", text: "我這是特地調的蒼白妝，很潮。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-004-g", text: "我在練習吸血鬼的角色扮演。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-004-h", text: "氣色好不好不用你們一直盯著看。", archetype: "landmine", retort: "關心一下也要被嗆，真是的。" },
    ],
  },
  {
    id: "generic-appearance-005",
    text: "你這個髮型是怎麼回事？跟以前差好多。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-005-a", text: "這叫新年新氣象，你們要不要也換一個？", archetype: "perfect", retort: "哎唷，說得我都想換了。" },
      { id: "generic-appearance-005-b", text: "先說你們過年打算穿新衣服嗎？", archetype: "deflect", retort: "有啊，特地買了一件呢。" },
      { id: "generic-appearance-005-c", text: "髮型先別提，你們今天的穿搭真好看。", archetype: "deflect", retort: "謝謝誇獎，特地挑的呢。" },
      { id: "generic-appearance-005-d", text: "最近想換個造型，還在適應……", archetype: "meek", retort: "適應一下就好，多嘗試也不錯。" },
      { id: "generic-appearance-005-e", text: "說實話，是設計師手滑弄的……", archetype: "meek", retort: "手滑也太誇張了吧。" },
      { id: "generic-appearance-005-f", text: "這是我自創的新風格，走在潮流前面。", archetype: "backfire", retort: "（沒人接話，場面尷尬）" },
      { id: "generic-appearance-005-g", text: "我打算靠這個造型出道當網紅。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-005-h", text: "我的髮型不用你們一直評論。", archetype: "landmine", retort: "評論一下也要生氣，真是的。" },
    ],
  },
  {
    id: "generic-appearance-006",
    text: "怎麼瘦這麼多？是不是沒好好吃飯？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-006-a", text: "有吃啦，只是把肉都練成線條了。", archetype: "perfect", retort: "喔？那要展示一下給大家看看。" },
      { id: "generic-appearance-006-b", text: "先問你們，今天有煮什麼好料嗎？", archetype: "deflect", retort: "有啊，等一下都給你補回來。" },
      { id: "generic-appearance-006-c", text: "瘦不瘦先別提，這道菜看起來好香。", archetype: "deflect", retort: "喜歡就多吃一點啊。" },
      { id: "generic-appearance-006-d", text: "最近比較忙，三餐不太正常……", archetype: "meek", retort: "不正常要調整，身體要顧好。" },
      { id: "generic-appearance-006-e", text: "說實話，最近胃口不太好……", archetype: "meek", retort: "胃口不好要看醫生喔。" },
      { id: "generic-appearance-006-f", text: "我在練成仙的體態，快要飛升了。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-appearance-006-g", text: "我打算靠喝水維生，比較環保。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-006-h", text: "瘦不瘦是我的事，不用你們一直問。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-appearance-007",
    text: "皮膚怎麼變差了，是不是熬夜？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-007-a", text: "這是歷經風霜的證明，比較有故事感。", archetype: "perfect", retort: "你這孩子，講話真有意思。" },
      { id: "generic-appearance-007-b", text: "先問你們最近用什麼保養品？效果真好。", archetype: "deflect", retort: "喔，這個我可以跟你分享。" },
      { id: "generic-appearance-007-c", text: "皮膚先別提，你們今天氣色特別好。", archetype: "deflect", retort: "是嗎？我最近有保養啦。" },
      { id: "generic-appearance-007-d", text: "最近熬夜比較多，沒好好保養……", archetype: "meek", retort: "熬夜不好，要早點睡。" },
      { id: "generic-appearance-007-e", text: "說實話，工作壓力大冒了不少痘……", archetype: "meek", retort: "壓力大要放鬆，別累壞自己。" },
      { id: "generic-appearance-007-f", text: "這叫自然系，走的是原生態路線。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-007-g", text: "我打算靠敷面膜逆天改命。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-007-h", text: "皮膚好不好是我的事，不用你們說。", archetype: "landmine", retort: "關心一下也要被嗆，真是的。" },
    ],
  },
  {
    id: "generic-appearance-008",
    text: "你是不是駝背了？站有點沒精神。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-008-a", text: "這是思考的姿勢，等等挺直給你們看。", archetype: "perfect", retort: "好啊，快挺直讓我們瞧瞧。" },
      { id: "generic-appearance-008-b", text: "先問你們最近有沒有去給人按摩？", archetype: "deflect", retort: "有啊，最近才去放鬆過呢。" },
      { id: "generic-appearance-008-c", text: "站姿先別提，你們今天精神真好。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-appearance-008-d", text: "最近坐辦公室久了，姿勢比較不好……", archetype: "meek", retort: "姿勢不好要多起來動一動。" },
      { id: "generic-appearance-008-e", text: "說實話，最近肩頸真的很痠……", archetype: "meek", retort: "痠要去給人看一下，別拖。" },
      { id: "generic-appearance-008-f", text: "我這是模仿駱駝，比較有耐力。", archetype: "backfire", retort: "（沒人覺得好笑）" },
      { id: "generic-appearance-008-g", text: "我在練習隨時可以鞠躬的姿勢。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-008-h", text: "站姿是我的事，不用你們一直說。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
  {
    id: "generic-appearance-009",
    text: "過年怎麼穿這麼隨便？也不換一下。",
    topic: "appearance",
    options: [
      { id: "generic-appearance-009-a", text: "舒服最重要，這樣才有力氣陪你們聊到深夜。", archetype: "perfect", retort: "哎唷，這孩子嘴巴真甜。" },
      { id: "generic-appearance-009-b", text: "先說你們今天穿的這件是新買的嗎？", archetype: "deflect", retort: "是啊，特地為過年買的。" },
      { id: "generic-appearance-009-c", text: "穿著先別提，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-appearance-009-d", text: "最近比較累，就隨便穿一下……", archetype: "meek", retort: "隨便也要注意一下場合啦。" },
      { id: "generic-appearance-009-e", text: "說實話，好看的衣服都還沒洗……", archetype: "meek", retort: "沒洗就要早點準備啊。" },
      { id: "generic-appearance-009-f", text: "這是走極簡風，比較有質感。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-009-g", text: "我在測試家居服能不能撐過整個年假。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-009-h", text: "穿什麼是我的自由，不用你們管。", archetype: "landmine", retort: "關心一下也要被嗆，真是的。" },
    ],
  },
  {
    id: "generic-appearance-010",
    text: "你的臉今天怎麼腫腫的？",
    topic: "appearance",
    options: [
      { id: "generic-appearance-010-a", text: "這是元氣飽滿的證明，吃得好睡得飽。", archetype: "perfect", retort: "有道理，飽滿才有福氣。" },
      { id: "generic-appearance-010-b", text: "先說你們今天的年菜是不是特別鹹？", archetype: "deflect", retort: "還好啦，你怎麼會這樣問。" },
      { id: "generic-appearance-010-c", text: "腫不腫先別提，你們今天真的很有精神。", archetype: "deflect", retort: "是嗎？多虧睡得飽啦。" },
      { id: "generic-appearance-010-d", text: "昨天可能吃太鹹，有點水腫……", archetype: "meek", retort: "水腫要少吃點鹹的東西。" },
      { id: "generic-appearance-010-e", text: "說實話，可能是哭過，眼睛比較腫……", archetype: "meek", retort: "怎麼哭了？有什麼事跟我們說。" },
      { id: "generic-appearance-010-f", text: "這是我特地練的包子臉，比較討喜。", archetype: "backfire", retort: "（沒人相信這個說法）" },
      { id: "generic-appearance-010-g", text: "我打算靠這張臉去拍年菜廣告。", archetype: "backfire", retort: "（大家笑不出來）" },
      { id: "generic-appearance-010-h", text: "臉腫不腫是我的事，不用你們一直說。", archetype: "landmine", retort: "關心一下也要被嗆，真無奈。" },
    ],
  },
] satisfies Question[];
