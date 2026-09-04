# 過年大戰三姑六婆

回家過年，嗆爆三姑六婆。回合制文字戰鬥網頁遊戲：面對 8 位親戚關主，用「神回覆」把「什麼時候結婚」打回去。
純靜態 Next.js 站，無後端、無登入，進度存在瀏覽器 localStorage。

## 玩法

- 每回合關主丟一句話，玩家從 8 個回應中選一個。回應分五種：神回覆 / 四兩撥千斤 / 乖乖回答 / 反擊失敗 / 踩雷，各有固定傷害（`src/engine/archetypes.ts`）。
- 雙方都有 HP，先歸零的輸。連續 3 次神回覆觸發暴擊；每場有一次「借尿遁」與「發紅包轉移話題」。
- **30 種人生**：開局選一種人生（或隨機），家庭背景與跟每位長輩的關係會改變不同回應的殺傷力。每種人生有追蹤代碼 `L01`–`L30`，每場結果有結果代碼 `L07-XXXX`。
- 模式：隨機挑戰、每日挑戰（全球同題、一天一次、連勝）、故事模式（除夕→初一→初二，三幕八戰，6 種結局）、闖關模式（8 位依序打到三姑）。

## 內容規模

| 項目 | 數量 | 位置 |
|---|---|---|
| 關主 | 8 | `src/content/bosses/` |
| 題目 | 1000（8 × 110 + 通用 120） | `src/content/questions/<boss|generic>/*.ts` |
| 人生 | 30 | `src/content/lives/` |
| 故事場景 | 18（3 幕） | `src/content/story/scenes.ts` |
| 結局 / 稱號 | 6 / 7 | `src/content/endings.ts` |
| 立繪 | 9 張 SVG | `public/portraits/` |

寫題規則與語氣指南：`docs/CONTENT.md`。遊戲規劃：`docs/PLAN.md`。平衡數據：`docs/BALANCE.md`。

## 後台

`/admin`（通行碼預設 `sangu2026`，可用環境變數 `NEXT_PUBLIC_ADMIN_PASS` 覆蓋）。
可瀏覽所有人生、關主、題目（篩選／搜尋／匯出）、劇情與稱號，以及本機的遊戲結果（匯入其他裝置匯出的 JSON 可合併統計）。

沒有接 Supabase 時，通行碼只是純前端比對，靜態站僅為隱蔽用途，不是真正的權限控制。接上 Supabase 後（見下方「Supabase（選用）」），通行碼會送到 `admin_check` 這個 security-definer function 做伺服器端驗證，才是真正擋得住的權限控制。

### 後台編輯（題庫）

接上 Supabase 後，`/admin` 的「題庫」分頁可以直接編輯題目——這是純靜態站，沒有伺服器能把編輯結果寫回 `src/content/questions/**`，所以編輯內容存成 Supabase 的 **override（覆寫）**，遊戲啟動新的一場時會把它疊加在內建題庫上（`src/lib/contentOverrides.ts`）：

- **編輯**一題內建題目 → 該 id 出現覆寫，遊戲之後抽到這題會用編輯後的版本，後台列表顯示「已修改」徽章。
- **刪除／隱藏** → 軟刪除，這題不會再被抽到（內建或自訂 id 皆可），徽章顯示「已隱藏」。
- **還原內建** → 只在「已修改」或「已隱藏」的內建題目上出現，會刪掉覆寫列，內建版本就恢復原樣。
- **新增題目** → 產生 `custom-<topic>-<時間戳>` 這種 id，跟內建題目一樣會進入題庫（「自訂」徽章），可設定專屬關主或「通用」。
- 自訂題目沒有內建版本可以「還原」，所以按鈕換成：**取消隱藏**（已隱藏時，把同一份資料重新存回去，`deleted` 變回 `false`）與**永久刪除**（不論目前是否隱藏都可按，需二次確認，會直接刪掉這筆覆寫列，等於整題消失），避免自訂題目被隱藏後卡在「只看修改過的」列表裡永遠沒辦法清掉。
- 篩選列有「只看修改過的」，只顯示已修改／自訂／已隱藏的題目；匯出（JSON／CSV）永遠匯出目前生效（疊加覆寫後）的題庫。
- 編輯表單即時檢查配方（神回覆 1、踩雷 1、四兩撥千斤 2、乖乖回答 2、反擊失敗 2）與字數上限（題目 ≤32、選項與回嗆各 ≤30），並附上 `docs/TONE_V2.md` 的酸度規範小抄。
- 一場已經開始的遊戲不會被後台編輯中途影響——新的覆寫只在「開新的一場」時生效。
- 沒有接 Supabase 時，題庫分頁只能瀏覽／匯出內建題庫，看不到編輯／新增按鈕（會顯示提示）。

**變更通行碼**：接上 Supabase 後，去 SQL Editor 執行：

```sql
update public.admin_config set value = '新的通行碼' where key = 'admin_passcode';
```

## 開發

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm test           # 引擎測試 + 內容驗證（配方、字數、id、人生修正範圍）
pnpm lint
pnpm build          # 靜態輸出到 out/
pnpm content:index  # 新增題庫檔後重建 src/content/questions/index.ts
pnpm og             # 本機重新產生 public/og.png（需要系統中文字型）
```

新增題目：在 `src/content/questions/<bossId>/` 放新檔（`export default [...] satisfies Question[]`），每題恰好 8 個選項（神回覆 1、踩雷 1、四兩撥千斤 2、乖乖回答 2、反擊失敗 2），跑 `pnpm content:index && node scripts/normalize-option-ids.mjs && pnpm test`。

## 架構

- `src/engine/`：純函式引擎（`createGame` → `startBoss` → `applyOption`/`applyTimeout`/`applySpecial` → `advance`），seed 決定整場，可離線單測。
- `src/store/`：Zustand + localStorage（`dzsg:game`、`dzsg:life`、`dzsg:daily`、`dzsg:stats`、`dzsg:results`、`dzsg:settings`）。
- `src/components/battle/`：RPG 戰鬥畫面；`src/components/admin/`：後台。
- 設計 tokens：`design-system/過年大戰三姑六婆/MASTER.md` 與 `src/app/globals.css`。

## Supabase（選用）

站台預設純靜態、無後端，戰績只存在自己裝置的 localStorage。接上 Supabase 後，每場結束會**匿名**上傳一筆結果，換來全球排行榜（`/leaderboard/`）；後台也能看到所有人的結果，並且能真正編輯題庫（見上方「後台編輯」）。這是選用功能：不設定環境變數時整個功能自動關閉，`pnpm build` 一樣能成功。

**建立**：
1. 在 [supabase.com](https://supabase.com) 建立新專案。
2. 跑兩支 migration（依檔名順序：先 `20260903000000_results.sql` 再 `20260904000000_question_overrides.sql`）——二選一：
   - `supabase link --project-ref <your-project-ref>` 後 `supabase db push`
   - 或直接用 psql／SQL Editor 依序貼上兩個檔案內容執行
3. 在專案設定 → API 頁面取得 Project URL 與 `anon` public key。
4. 複製 `.env.example` 為 `.env.local`，填入：
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   ```
5. 部署到 Vercel 時，在專案設定 → Environment Variables 加上同樣兩個值，重新 deploy。

**收集的資料**：每場結束會送出結果代碼、模式、分數、稱號、人生代碼（`L01`–`L30`，不含任何個資）、回合數／連擊／HP 等統計，以及本機隨機產生、與任何帳號無關的裝置代碼（`dzsg:client`）。不收集姓名、Email、IP 或裝置指紋等個資。資料表 `public.results` 啟用 RLS，只開放匿名 **新增**；所有讀取（排行榜、人生戰績）都經過唯讀的 SQL function（`leaderboard`／`daily_leaderboard`／`life_stats`／`boss_stats`／`question_stats`／`global_counts`），前端與外部都無法直接查詢原始表。

**停用**：把 `.env.local`（或 Vercel 上的環境變數）兩個 `NEXT_PUBLIC_SUPABASE_*` 值移除即可，`/leaderboard/` 會顯示「排行榜尚未開放」，其餘功能不受影響。

## 部署

正式站：https://cny-relatives-battle.vercel.app （Vercel 專案 `cny-relatives-battle`，靜態輸出）。更新：`vercel deploy --prod --yes`。
