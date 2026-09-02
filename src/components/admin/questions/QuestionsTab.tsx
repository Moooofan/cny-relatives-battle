"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { CONTENT } from "@/content";
import type { Question } from "@/engine/types";
import { Card, SectionTitle } from "@/components/admin/Section";
import { QuestionFilters, type QuestionFilterState } from "@/components/admin/questions/QuestionFilters";
import { QuestionRow } from "@/components/admin/questions/QuestionRow";
import { downloadCSV, downloadJSON } from "@/lib/adminExport";

const PAGE_SIZE = 50;

function matches(q: Question, filter: QuestionFilterState): boolean {
  if (filter.boss === "generic" && q.bossId !== undefined) return false;
  if (filter.boss !== "all" && filter.boss !== "generic" && q.bossId !== filter.boss) return false;
  if (filter.topic !== "all" && q.topic !== filter.topic) return false;
  if (filter.archetype !== "all" && !q.options.some((o) => o.archetype === filter.archetype)) return false;
  if (filter.search.trim()) {
    const needle = filter.search.trim().toLowerCase();
    const haystack = [q.text, ...q.options.flatMap((o) => [o.text, o.retort])].join(" ").toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

function bossLabel(bossId: string | undefined): string {
  if (bossId === undefined) return "generic";
  return CONTENT.bosses.find((b) => b.id === bossId)?.name ?? bossId;
}

function exportRows(questions: Question[]) {
  const headers = ["id", "bossId", "topic", "text", ...question8Headers()];
  const rows = questions.map((q) => [
    q.id,
    q.bossId ?? "",
    q.topic,
    q.text,
    ...q.options.map((o) => `${o.archetype}:${o.text} → ${o.retort}`),
  ]);
  return { headers, rows };
}

function question8Headers(): string[] {
  return Array.from({ length: 8 }, (_, i) => `option${i + 1}`);
}

export function QuestionsTab() {
  const [filter, setFilter] = useState<QuestionFilterState>({ boss: "all", topic: "all", archetype: "all", search: "" });
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => CONTENT.questions.filter((q) => matches(q, filter)), [filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function handleFilterChange(next: QuestionFilterState) {
    setFilter(next);
    setPage(0);
  }

  return (
    <Card>
      <SectionTitle>題庫（共 {CONTENT.questions.length} 題）</SectionTitle>
      <QuestionFilters bosses={CONTENT.bosses} value={filter} onChange={handleFilterChange} />

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-text-muted tabular">符合條件：{filtered.length} 題</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => downloadJSON("questions.json", filtered)}
            className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
          >
            <Download size={14} /> 匯出 JSON
          </button>
          <button
            type="button"
            onClick={() => {
              const { headers, rows } = exportRows(filtered);
              downloadCSV("questions.csv", headers, rows);
            }}
            className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
          >
            <Download size={14} /> 匯出 CSV
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {pageItems.map((q) => (
          <QuestionRow key={q.id} question={q} bossLabel={bossLabel(q.bossId)} />
        ))}
        {pageItems.length === 0 && <p className="text-sm text-text-muted italic py-4">沒有符合條件的題目。</p>}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-btn border border-border px-3 py-1 text-xs text-text disabled:opacity-40"
          >
            上一頁
          </button>
          <span className="text-xs text-text-muted tabular">
            第 {page + 1} / {pageCount} 頁
          </span>
          <button
            type="button"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="rounded-btn border border-border px-3 py-1 text-xs text-text disabled:opacity-40"
          >
            下一頁
          </button>
        </div>
      )}
    </Card>
  );
}
