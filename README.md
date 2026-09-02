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

`/admin`（通行碼預設 `sangu2026`，可用環境變數 `NEXT_PUBLIC_ADMIN_PASS` 覆蓋；靜態站僅為隱蔽用途，不是真正的權限控制）。
可瀏覽所有人生、關主、題目（篩選／搜尋／匯出）、劇情與稱號，以及本機的遊戲結果（匯入其他裝置匯出的 JSON 可合併統計）。

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

## 部署

正式站：https://cny-relatives-battle.vercel.app （Vercel 專案 `cny-relatives-battle`，靜態輸出）。更新：`vercel deploy --prod --yes`。
