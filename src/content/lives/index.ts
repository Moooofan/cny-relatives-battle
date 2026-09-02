import type { Life } from "@/content/types";

import life01 from "./life-01";
import life02 from "./life-02";
import life03 from "./life-03";
import life04 from "./life-04";
import life05 from "./life-05";
import life06 from "./life-06";
import life07 from "./life-07";
import life08 from "./life-08";
import life09 from "./life-09";
import life10 from "./life-10";
import life11 from "./life-11";
import life12 from "./life-12";
import life13 from "./life-13";
import life14 from "./life-14";
import life15 from "./life-15";
import life16 from "./life-16";
import life17 from "./life-17";
import life18 from "./life-18";
import life19 from "./life-19";
import life20 from "./life-20";
import life21 from "./life-21";
import life22 from "./life-22";
import life23 from "./life-23";
import life24 from "./life-24";
import life25 from "./life-25";
import life26 from "./life-26";
import life27 from "./life-27";
import life28 from "./life-28";
import life29 from "./life-29";
import life30 from "./life-30";

/**
 * 30 種人生一覽（code 順序）。職業 × 家庭結構 × 人生階段 × 居住地已分散，
 * 每個 (職業, 階段) 組合在全表中僅出現一次。
 *
 * | code | 名稱             | 一句話 hook                         |
 * |------|------------------|--------------------------------------|
 * | L01  | 北漂工程師       | 貸款三十年，回家先報平安              |
 * | L02  | 阿嬤帶大護理師   | 阿嬤養大，現在換你顧大家              |
 * | L03  | 剛失業業務       | 上禮拜資遣，紅包還沒領                |
 * | L04  | 鐵飯碗長女       | 捧鐵飯碗，扛全家期待                  |
 * | L05  | 北漂接案設計師   | 案子有一搭沒一搭，帳戶也是            |
 * | L06  | 海歸小網紅       | 剛回國，粉絲數比戶籍地址熟            |
 * | L07  | 休學博士生       | 論文卡關，人生也卡關                  |
 * | L08  | 廚房二代         | 剛升主廚，家傳的鍋鏟接下了            |
 * | L09  | 神秘戀愛老師     | 有對象了，還沒跟長輩報備              |
 * | L10  | 志願役軍人       | 簽下去了，體能沒問題嘴巴也不軟        |
 * | L11  | 空服員           | 長班剛落地，時差比長輩問題還難調      |
 * | L12  | 北漂房仲         | 剛升組長，話術用在客戶也用在長輩      |
 * | L13  | 返鄉農二代       | 辭掉城市工作，回來種爸媽的田          |
 * | L14  | 家業接班人       | 剛升副總，位子是爸給的但活是真的      |
 * | L15  | 街頭藝人         | 駐點被取消，這禮拜靠打賞吃飯          |
 * | L16  | 藥師大女兒       | 顧藥局也顧娘家，都靠專業扛            |
 * | L17  | 健身教練         | 工作室倒了，體態還是很有型            |
 * | L18  | 跑線記者         | 剛離婚，問問題比回答問題習慣          |
 * | L19  | 社工             | 顧了一堆案家，自己薪水顧不好          |
 * | L20  | 消防員           | 排班救火，回家過年靠運氣              |
 * | L21  | 髮型設計師       | 剛買房，貸款壓力堆得比髮蠟還高        |
 * | L22  | 電商小編         | 有對象但沒公開，文案先讓大家看        |
 * | L23  | 物流司機         | 剛離婚，全台跑透透送貨也送自己回家    |
 * | L24  | 超商店長         | 剛升店長，奧客訓練出神回覆體質        |
 * | L25  | 獸醫             | 顧毛小孩顧到沒空生自己的小孩          |
 * | L26  | 導遊             | 淡季沒團帶，嘴巴閒不下來              |
 * | L27  | 咖啡店老闆       | 頂讓店面貸款下去，夢想現在在還債      |
 * | L28  | 會計師大女兒     | 剛升專案經理，數字比誰都算得清        |
 * | L29  | 電競選手         | 休學打職業，還在等一場翻身戰          |
 * | L30  | 剛離婚律師       | 打贏別人的官司，自己的婚姻先輸了      |
 */
export const LIVES: Life[] = [
  life01,
  life02,
  life03,
  life04,
  life05,
  life06,
  life07,
  life08,
  life09,
  life10,
  life11,
  life12,
  life13,
  life14,
  life15,
  life16,
  life17,
  life18,
  life19,
  life20,
  life21,
  life22,
  life23,
  life24,
  life25,
  life26,
  life27,
  life28,
  life29,
  life30,
];

/** 依 id（"life-01"）或 code（"L01"，不分大小寫）查找人生。 */
export function findLife(idOrCode: string): Life | undefined {
  const key = idOrCode.trim().toLowerCase();
  return LIVES.find(
    (life) => life.id.toLowerCase() === key || life.code.toLowerCase() === key,
  );
}
