"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Mode } from "@/engine/types";
import { fetchLeaderboard, type LeaderboardRow } from "@/lib/adminSupabase";
import { Card, SectionTitle, EmptyNote } from "@/components/admin/Section";
import { useAdminFetch } from "@/components/admin/results/useAdminFetch";
import { GlobalLeaderboardRows } from "@/components/admin/results/GlobalLeaderboardRows";
import { downloadCSV, downloadJSON } from "@/lib/adminExport";

const MODE_TABS: { key: Mode; label: string }[] = [
  { key: "random", label: "隨機" },
  { key: "daily", label: "每日" },
  { key: "story", label: "故事" },
  { key: "gauntlet", label: "闖關" },
];

function exportRows(rows: LeaderboardRow[]) {
  const headers = ["resultCode", "lifeCode", "score", "rankTitle", "won", "bossesDefeated", "turns", "createdAt"];
  return { headers, rows: rows.map((r) => [r.resultCode, r.lifeCode, r.score, r.rankTitle, r.won ? "勝" : "敗", r.bossesDefeated, r.turns, r.createdAt]) };
}

/** 全站排行榜（Top 100）— mode-tabbed, backed by the `leaderboard` /
 * `daily_leaderboard` security-definer functions via fetchLeaderboard. */
export function GlobalLeaderboardSection() {
  const [mode, setMode] = useState<Mode>("random");

  return (
    <Card>
      <SectionTitle>全站排行榜（Top 100）</SectionTitle>

      <nav className="flex gap-1 overflow-x-auto">
        {MODE_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setMode(t.key)}
            aria-current={mode === t.key ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-btn px-3 py-1.5 text-sm font-medium transition ${
              mode === t.key ? "bg-primary text-on-primary" : "bg-surface-2 text-text-muted border border-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Remounted per mode (key={mode}) so useAdminFetch's "loading" state
       * resets naturally on tab switch instead of needing a synchronous
       * setState in its effect. */}
      <LeaderboardBody key={mode} mode={mode} />
    </Card>
  );
}

function LeaderboardBody({ mode }: { mode: Mode }) {
  const state = useAdminFetch(() => fetchLeaderboard(mode, 100));

  return (
    <>
      {state.status === "loading" && <EmptyNote>載入中…</EmptyNote>}
      {state.status === "error" && <EmptyNote>讀取失敗：{state.message}</EmptyNote>}
      {state.status === "empty" && <EmptyNote>目前還沒有資料。</EmptyNote>}

      {state.status === "ready" && (
        <>
          <div className="flex justify-end">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => downloadJSON(`leaderboard-${mode}.json`, state.data)}
                className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
              >
                <Download size={14} /> 匯出 JSON
              </button>
              <button
                type="button"
                onClick={() => {
                  const { headers, rows } = exportRows(state.data);
                  downloadCSV(`leaderboard-${mode}.csv`, headers, rows);
                }}
                className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
              >
                <Download size={14} /> 匯出 CSV
              </button>
            </div>
          </div>

          <GlobalLeaderboardRows rows={state.data} />
        </>
      )}
    </>
  );
}
