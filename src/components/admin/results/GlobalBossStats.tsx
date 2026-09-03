"use client";

import { Download } from "lucide-react";
import { CONTENT } from "@/content";
import { fetchBossStats } from "@/lib/adminSupabase";
import { Card, SectionTitle, EmptyNote } from "@/components/admin/Section";
import { useAdminFetch } from "@/components/admin/results/useAdminFetch";
import { downloadCSV, downloadJSON } from "@/lib/adminExport";

function bossName(bossId: string): string {
  return CONTENT.bosses.find((b) => b.id === bossId)?.name ?? bossId;
}

/** 關主遭遇 — boss_stats() (already ordered by encounters desc). */
export function GlobalBossStats() {
  const state = useAdminFetch(() => fetchBossStats());

  return (
    <Card>
      <SectionTitle>關主遭遇</SectionTitle>

      {state.status === "loading" && <EmptyNote>載入中…</EmptyNote>}
      {state.status === "error" && <EmptyNote>讀取失敗：{state.message}</EmptyNote>}
      {state.status === "empty" && <EmptyNote>目前還沒有資料。</EmptyNote>}

      {state.status === "ready" && (
        <>
          <div className="flex justify-end">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => downloadJSON("boss-stats.json", state.data)}
                className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
              >
                <Download size={14} /> 匯出 JSON
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadCSV(
                    "boss-stats.csv",
                    ["bossId", "encounters"],
                    state.data.map((r) => [r.bossId, r.encounters])
                  )
                }
                className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
              >
                <Download size={14} /> 匯出 CSV
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.data.map((r) => (
              <div
                key={r.bossId}
                className="rounded-box border border-border bg-surface-2/40 px-3 py-2 flex flex-col gap-0.5 min-w-[112px]"
              >
                <p className="text-xs text-text-muted">{bossName(r.bossId)}</p>
                <p className="font-display text-xl text-text tabular">{r.encounters}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
