"use client";

import { Download } from "lucide-react";
import { CONTENT } from "@/content";
import { fetchQuestionStats, type QuestionStatRow } from "@/lib/adminSupabase";
import { Card, SectionTitle, EmptyNote } from "@/components/admin/Section";
import { useAdminFetch } from "@/components/admin/results/useAdminFetch";
import { downloadCSV, downloadJSON } from "@/lib/adminExport";

function questionText(id: string): string {
  return CONTENT.questions.find((q) => q.id === id)?.text ?? id;
}

function RateTable({ title, rows, rateKey }: { title: string; rows: QuestionStatRow[]; rateKey: "perfectRate" | "landmineRate" }) {
  return (
    <div>
      <p className="text-sm text-text-muted mb-1">{title}</p>
      <div className="overflow-x-auto">
        <table className="text-xs tabular w-full border-collapse min-w-[560px]">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="font-normal py-1 pr-2">題目</th>
              <th className="font-normal py-1 pr-2 text-right">出題次數</th>
              <th className="font-normal py-1 pr-2 text-right">神回覆率</th>
              <th className="font-normal py-1 pr-2 text-right">地雷率</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.questionId} className="border-t border-border">
                <td className="py-1 pr-2 text-text-muted max-w-[360px] truncate" title={questionText(r.questionId)}>
                  {questionText(r.questionId)}
                </td>
                <td className="py-1 pr-2 text-right text-text">{r.asked}</td>
                <td className={`py-1 pr-2 text-right ${rateKey === "perfectRate" ? "text-gold" : "text-text-muted"}`}>
                  {Math.round(r.perfectRate * 100)}%
                </td>
                <td className={`py-1 pr-2 text-right ${rateKey === "landmineRate" ? "text-primary" : "text-text-muted"}`}>
                  {Math.round(r.landmineRate * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** 題目統計 — question_stats(), shown as top-20 most asked and top-20
 * highest landmine_rate, question text looked up from CONTENT.questions. */
export function GlobalQuestionStats() {
  const state = useAdminFetch(() => fetchQuestionStats());

  return (
    <Card>
      <SectionTitle>題目統計</SectionTitle>

      {state.status === "loading" && <EmptyNote>載入中…</EmptyNote>}
      {state.status === "error" && <EmptyNote>讀取失敗：{state.message}</EmptyNote>}
      {state.status === "empty" && <EmptyNote>目前還沒有資料。</EmptyNote>}

      {state.status === "ready" &&
        (() => {
          const mostAsked = [...state.data].sort((a, b) => b.asked - a.asked).slice(0, 20);
          const mostLandmine = [...state.data].sort((a, b) => b.landmineRate - a.landmineRate).slice(0, 20);
          return (
            <>
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => downloadJSON("question-stats.json", state.data)}
                    className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
                  >
                    <Download size={14} /> 匯出 JSON
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadCSV(
                        "question-stats.csv",
                        ["questionId", "text", "asked", "perfectRate", "landmineRate"],
                        state.data.map((r) => [r.questionId, questionText(r.questionId), r.asked, r.perfectRate, r.landmineRate])
                      )
                    }
                    className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
                  >
                    <Download size={14} /> 匯出 CSV
                  </button>
                </div>
              </div>
              <RateTable title="出題次數 Top 20" rows={mostAsked} rateKey="perfectRate" />
              <RateTable title="地雷率 Top 20" rows={mostLandmine} rateKey="landmineRate" />
            </>
          );
        })()}
    </Card>
  );
}
