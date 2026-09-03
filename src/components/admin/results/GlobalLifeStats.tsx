"use client";

import { Download } from "lucide-react";
import { CONTENT } from "@/content";
import { fetchLifeStats } from "@/lib/adminSupabase";
import { Card, SectionTitle, EmptyNote } from "@/components/admin/Section";
import { useAdminFetch } from "@/components/admin/results/useAdminFetch";
import { downloadCSV, downloadJSON } from "@/lib/adminExport";

function lifeName(lifeCode: string): string {
  return CONTENT.lives.find((l) => l.code === lifeCode)?.name ?? lifeCode;
}

/** 人生戰績 — life_stats() sorted by runs (the RPC itself orders by
 * avg_score, since it's shared with the public leaderboard page). */
export function GlobalLifeStats() {
  const state = useAdminFetch(() => fetchLifeStats());

  return (
    <Card>
      <SectionTitle>人生戰績</SectionTitle>

      {state.status === "loading" && <EmptyNote>載入中…</EmptyNote>}
      {state.status === "error" && <EmptyNote>讀取失敗：{state.message}</EmptyNote>}
      {state.status === "empty" && <EmptyNote>目前還沒有資料。</EmptyNote>}

      {state.status === "ready" &&
        (() => {
          const rows = [...state.data].sort((a, b) => b.runs - a.runs);
          return (
            <>
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => downloadJSON("life-stats.json", rows)}
                    className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
                  >
                    <Download size={14} /> 匯出 JSON
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadCSV(
                        "life-stats.csv",
                        ["lifeCode", "runs", "avgScore", "winRate"],
                        rows.map((r) => [r.lifeCode, r.runs, r.avgScore, r.winRate])
                      )
                    }
                    className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
                  >
                    <Download size={14} /> 匯出 CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="text-xs tabular w-full border-collapse min-w-[480px]">
                  <thead>
                    <tr className="text-left text-text-muted">
                      <th className="font-normal py-1 pr-2">人生</th>
                      <th className="font-normal py-1 pr-2 text-right">場次</th>
                      <th className="font-normal py-1 pr-2 text-right">平均分</th>
                      <th className="font-normal py-1 pr-2 text-right">勝率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.lifeCode} className="border-t border-border">
                        <td className="py-1 pr-2 text-text-muted">
                          {r.lifeCode} {lifeName(r.lifeCode)}
                        </td>
                        <td className="py-1 pr-2 text-right text-text">{r.runs}</td>
                        <td className="py-1 pr-2 text-right text-gold">{r.avgScore}</td>
                        <td className="py-1 pr-2 text-right text-text-muted">{Math.round(r.winRate * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
    </Card>
  );
}
