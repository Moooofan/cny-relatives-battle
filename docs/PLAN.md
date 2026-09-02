# 《過年大戰三姑六婆》遊戲規劃

## Context

全新專案（目錄 `/Users/moooofan/過年大戰三姑六婆` 目前為空）。要做一款繁中文字回合制戰鬥網頁遊戲：玩家回家過年，逐一「嗆爆」三姑六婆。參考 sleep-on-the-couch.lol 的設計（實測：純選項題、無 AI、192 題手寫劇本、每個選項有固定分數與對方回嗆、賽後檢討頁、分享圖卡、Next.js 靜態站），但本作差異是 **雙方都有 HP、多位關主、三種模式**，更像 RPG。

使用者已決定：
- **選項制**（每回合 4 個預寫嗆聲），不接 LLM。
- **RPG 戰鬥畫面**（關主立繪 + 雙 HP 條 + 對話框 + 傷害數字）。
- **純前端靜態站**（Next.js static export，localStorage 存進度，無後端）。
- 實作時要主動套用好的 UI 技能：`ui-ux-pro-max`（風格/配色/字型決策）、`ui-styling`（Tailwind/shadcn）、`design-system`（tokens）、`dataviz`（結算頁圖表）、後期 `seo-geo-implement`（SEO/OG）。

---

## 1. 戰鬥機制（核心數值）

**HP**：玩家 100。關主依 tier：easy 60 / normal 90 / hard 130 / final 180。
**power 倍率**（放大玩家受到的傷害）：easy ×1.0 / normal ×1.2 / hard ×1.5 / final ×1.8。同一題可跨關主重用仍有難度差。
**傷害只由玩家選的選項決定**，關主不會被動削血 —— 關主的「攻擊」就是那句問題，選錯才會中招。結算檢討頁每個數字都能解釋。

| archetype | 繁中 | 對關主 | 玩家受傷（×power 前） | 連擊 |
|---|---|---|---|---|
| `perfect` | 神回覆 | 25 | 0 | +1 |
| `deflect` | 四兩撥千斤 | 12 | 5 | 保持 |
| `meek` | 乖乖回答 | 4 | 15 | 歸零 |
| `landmine` | 踩雷 | 0 | 35，且關主回血 10 | 歸零 |

- 作者只標 archetype，數字集中在 `ARCHETYPE_TABLE`，方便平衡。
- 每題固定 4 選項、每種 archetype 各一，執行時洗牌順序。
- **計時**：每回合 10 秒，逾時視為 `meek`（「嗯……呵呵……（乾笑）」）。
- **連擊/暴擊**：連續 3 次 `perfect` → 第 3 下 ×2（50），連擊歸零可重複觸發。
- **特殊技**（每場 run 各 1 次）：「借尿遁」跳過本題不扣血；「發紅包轉移話題」回血 25（HP<60 才可用）。
- **關主 gimmick**（Boss 上以 `modifiers` 旗標實作，engine 內統一處理）：
  - 小表弟：HP 很低，但踩雷傷害 ×2（全場轉頭）。
  - 表姊（凡爾賽）：perfect ×0.8、deflect ×1.5，吃軟不吃硬。
  - 阿嬤（心疼值）：perfect ×0.5、踩雷時玩家大傷 + 阿嬤回血 20。考驗「溫柔地贏」。
  - 三舅媽（連環問）：玩家選 `meek` 時同回合再追問一題。
  - 三姑（final）：HP < 50% 召喚一位打過的親戚攻擊一次；重用玩家先前 `meek` 過的題目當武器。
  - v2 再做：陳太太情報網、大伯母補刀、姑丈長輩圖。
- **分數**：`100*bossesDefeated + damageDealt + 2*hpRemaining + 15*maxCombo - 3*turns`。

**範例**：隨機挑戰 vs 三舅媽（hard 130, ×1.5）：神回覆 25 → 普通 12（玩家 -8）→ 神 25 → 神 暴擊 50 → 神 25 = 137 ≥ 130，5 回合勝、剩 92 HP。中途踩一次雷則 -53、關主 +10，就要靠紅包撐。

---

## 2. 關主陣容（8 位，闖關順序 = 表格順序，最終魔王三姑）

| id | 名稱 | 個性 | 主題 | tier |
|---|---|---|---|---|
| `xiao-biaodi` | 讀國小的小表弟 | 大人講什麼他就複誦、音量兩倍 | 比較/紅包/外表 | easy |
| `neighbor-chen` | 隔壁鄰居陳太太 | 非親戚卻比親戚更了解你 | 薪水/結婚/比較 | easy |
| `biaojie` | 表姊 | 人生勝利組，溫柔凡爾賽 | 生小孩/買房/比較 | normal |
| `dabo` | 大伯 | 政論台男人，覺得年輕人書白讀 | 政治/學歷/薪水 | normal |
| `guzhang` | 剛退休的姑丈 | 五點傳長輩圖，薑黃治百病 | 長輩圖/催吃/政治 | hard |
| `sanjiuma` | 三舅媽 | 家族薪資資料庫，表哥是她的 KPI | 薪水/買房/比較 | hard |
| `ama` | 阿嬤 | 不會罵你，她會難過 | 催吃/結婚/拜拜 | hard(特殊) |
| `sangu` | 三姑 | 三姑六婆總教頭 | 全部 | final |

每位有 intro / defeated / wins 三句台詞（內容組已寫好，實作時直接搬入）。

**題庫**：12 個 topic tag（`marriage, kids, salary_job, housing, comparison, appearance, education, politics, elder_health, food_push, red_envelope, religion`）。目標每位關主 15 題 + 20 題 generic = **140 題**。內容組已完成 9 題成品樣板（三舅媽/阿嬤/小表弟各 3）＋ 11 條寫作 tone guide，將存為 `docs/TONE_GUIDE.md` 供後續擴寫。

---

## 3. 三種模式

**隨機挑戰 `/random`**：隨機或從圖鑑挑一位關主，單場，4–11 回合，約 1–2 分鐘。
**每日挑戰 `/daily`**（便宜加料）：seed = `daily-YYYY-MM-DD`（Asia/Taipei），全球同關主同題序，一天一次，本機 streak。完全重用 `/random` UI。
**故事模式 `/story`**：3 幕 8 戰約 8 分鐘。幕內 HP 延續，幕間全回血 + 特殊技補滿；輸了存幕 checkpoint。
- 第一幕 除夕夜圍爐：小表弟 → 姑丈 → 阿嬤（教學版，教玩家對阿嬤要溫柔）。
- 第二幕 初一拜年：陳太太 → 表姊 → 大伯。**Twist：媽媽倒戈**（大伯戰中 deflect 傷害減半）。
- 第三幕 初二家族聚餐：三舅媽 → 三姑（召喚 + 翻舊帳）。
- 4 種結局：全家和樂 / 明年不回來了 / 反被三姑收為徒弟 / 隱藏「阿嬤的乖孫」。場景與旁白都是資料（`StoryScene[]`）。
**闖關模式 `/gauntlet`**：8 位依序，HP 延續；每勝 +20，每 3 關「偷溜去便利商店」+40 並補一次紅包。輸了以擊敗數 + 分數結算，約 12 分鐘。

**結算稱號**（7 級，通用）：被罵到懷疑人生 → 紅包拿了就跑 → 尷尬微笑專家 → 勉強撐到初三 → 四兩撥千斤達人 → 家族群組流量密碼 → 三姑六婆終結者。
分享句：「我在《過年大戰三姑六婆》用 {rounds} 回合擊敗了{bossName}，稱號：{tierTitle}。你敢回家嗎？」

---

## 4. 技術架構

- **Stack**：Next.js 15 App Router + `output: 'export'`、TypeScript、Tailwind、Zustand（persist）、Vitest、pnpm（未裝則 npm）。部署 Vercel（或 Cloudflare Pages）。手機優先、直向。
- **Routes**：`/` 標題+模式選單、`/random` `/daily` `/story` `/gauntlet`（同一 `<BattleScreen>` 帶 mode）、`/result`、`/review`、`/bosses` 圖鑑（也是 SEO 落地頁）。靜態站不能動態 OG → 每路由靜態 `opengraph-image.png`，分享圖卡用 `<canvas>` 前端產生 1080×1350。
- **目錄**：
  ```
  src/engine/   rng.ts (mulberry32, seed 決定整場) · reducer.ts (純函式) · archetypes.ts · types.ts
  src/content/  types.ts · bosses/*.ts · questions/<topic>.ts · story/scenes.ts · endings.ts
  src/store/    gameStore.ts (Zustand，只 dispatch，不算傷害)
  src/components/battle/  BattleScreen HpBar BossPortrait DialogueBox(打字機) OptionList TurnTimer DamageFloat SpecialBar SceneCard
  src/components/result/  ResultCard ShareButton TopicBars ReviewTurnRow
  src/lib/      sfx.ts (Web Audio, 6 音效+靜音) · share.ts (canvas + Web Share)
  docs/TONE_GUIDE.md
  ```
- **Engine API**（可獨立單元測試）：`createGame(mode, seed)`, `startNextBoss`, `drawQuestion`, `applyOption(state, optionId)`, `applyTimeout`, `useSpecial`, `advance`, `computeEnding`。
- **狀態機**：`title → modeSelect → intro → turn → resolving → retort → (turn | bossDefeated → interlude → intro | playerDefeated) → result → review`。
- **localStorage keys**：`dzsg:game`（進行中，重整可續）、`dzsg:story`（幕 checkpoint）、`dzsg:stats`、`dzsg:daily`、`dzsg:settings`。
- **內容驗證測試**：id 唯一、每題 4 選項且 archetype 各一、每位關主可用題 ≥ 12、字數上限（攻擊 ≤32、選項/回嗆 ≤30）。

---

## 5. 實作里程碑

0. 開工前讀 `~/.claude/playbooks/delegation.md` 與 `templates.md`；`git init`；先叫 `ui-ux-pro-max` 決定風格（方向：新年紅金 × 復古 RPG 對話框，Huninn/LXGW 類中文字型）並產出 tokens。
1. **M1 引擎 + 內容骨架**：types、rng、reducer、archetype 表、三舅媽 + 阿嬤 + 小表弟 各 3 題（現成 9 題）、Vitest 跑範例戰鬥與內容驗證。
2. **M2 戰鬥 UI**：Next 骨架、store、`/random` 端到端可玩（HP 條、計時、傷害飄字、回嗆、特殊技）。
3. **M3 模式**：故事場景 + checkpoint、闖關回血規則、每日 seed + streak、重整續玩。
4. **M4 結算/分享/檢討**：稱號、canvas 圖卡、Web Share、`/review`、統計。
5. **M5 內容填滿**：8 位關主 ×15 題 + 20 generic（委派 subagent 依 tone guide 分批寫，每批跑內容驗證測試）。
6. **M6 打磨**：音效、動畫/reduced-motion、圖鑑頁、metadata/OG、sitemap、Lighthouse、部署。

---

## 6. 驗證方式

- `pnpm test`：引擎範例戰鬥（三舅媽 5 回合勝）、每日 seed 同 seed 同結果 snapshot、內容驗證全過。
- 瀏覽器實測（Browser pane，mobile 375 寬）：三種模式各完整跑一場到結算 → 分享 → 檢討；重整頁面能續玩；每日模式當天第二次進入顯示已完成。
- `pnpm build` 靜態輸出無錯，`out/` 可直接部署。

---

## 修訂（2026-09-03，使用者追加需求）

- **題庫規模 1000 題**：每位關主 110 題 + generic 120 題。內容分批委派產出（每批 10–20 題一檔），每批跑內容驗證測試。
- **每題 8 個選項**，新增第 5 種回應類型 `backfire`（反擊失敗：想耍嘴皮但冷場，dealt 0 / taken 22）。
  配方固定：perfect 1、landmine 1、deflect 2、meek 2、backfire 2（`OPTION_RECIPE`）。
- **計時 20 秒**（8 個選項需要更多閱讀時間）。
- 題庫檔案：`src/content/questions/<bossId|generic>/<topic>.ts`，`pnpm content:index` 自動重建索引。
- 內容聖經：`docs/CONTENT.md`；設計 tokens：`design-system/過年大戰三姑六婆/MASTER.md`。
- 故事結局新增 `survived`（平安過年）作為預設。
