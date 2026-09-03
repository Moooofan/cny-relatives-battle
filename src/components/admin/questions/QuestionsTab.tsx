"use client";

import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import { CONTENT } from "@/content";
import type { Question } from "@/engine/types";
import { Card, SectionTitle, EmptyNote } from "@/components/admin/Section";
import { QuestionFilters, type QuestionFilterState } from "@/components/admin/questions/QuestionFilters";
import { QuestionRow } from "@/components/admin/questions/QuestionRow";
import { QuestionEditor } from "@/components/admin/questions/QuestionEditor";
import { downloadCSV, downloadJSON } from "@/lib/adminExport";
import { isSupabaseEnabled } from "@/lib/adminSupabase";
import { useContentStore } from "@/store/contentStore";
import { buildAdminQuestionList, type AdminQuestionEntry } from "@/lib/contentOverrides";

const PAGE_SIZE = 50;

function questionMatches(q: Question, filter: QuestionFilterState): boolean {
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

function entryMatches(entry: AdminQuestionEntry, filter: QuestionFilterState): boolean {
  if (filter.onlyModified && !entry.isEdited && !entry.isCustom && !entry.isHidden) return false;
  return questionMatches(entry.question, filter);
}

function bossLabel(bossId: string | undefined): string {
  if (bossId === undefined) return "共用";
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
  const enabled = isSupabaseEnabled();
  const rows = useContentStore((s) => s.rows);
  const effectiveContent = useContentStore((s) => s.effectiveContent);

  const [filter, setFilter] = useState<QuestionFilterState>({
    boss: "all",
    topic: "all",
    archetype: "all",
    search: "",
    onlyModified: false,
  });
  const [page, setPage] = useState(0);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<{ entry: AdminQuestionEntry | null } | null>(null);

  // Admin listing merges the bundled question bank with every override row
  // (including hidden ones, so the owner can find and un-hide them) — see
  // src/lib/contentOverrides.ts. This is deliberately NOT `effectiveContent`,
  // which is what the game itself plays (hidden questions removed).
  const entries = useMemo(() => buildAdminQuestionList(CONTENT, rows), [rows]);
  const filteredEntries = useMemo(() => entries.filter((e) => entryMatches(e, filter)), [entries, filter]);
  const exportQuestions = useMemo(
    () => effectiveContent.questions.filter((q) => questionMatches(q, filter)),
    [effectiveContent, filter]
  );

  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const pageItems = filteredEntries.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function handleFilterChange(next: QuestionFilterState) {
    setFilter(next);
    setPage(0);
  }

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Card>
      {/* Sticky sub-header: stays under the sticky tab bar (~54px) while the
       * page scrolls, so filters/count/export/展開收合 stay reachable across
       * a 1000-row list without scrolling back to the top. */}
      <div className="sticky top-[54px] z-20 -mx-4 -mt-4 bg-surface px-4 pt-4 pb-3 border-b border-border flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <SectionTitle>題庫（共 {effectiveContent.questions.length} 題）</SectionTitle>
          <button
            type="button"
            disabled={!enabled}
            onClick={() => setEditing({ entry: null })}
            className="flex items-center gap-1 rounded-btn border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs text-gold disabled:opacity-40"
          >
            <Plus size={14} /> 新增題目
          </button>
        </div>

        {!enabled && <EmptyNote>尚未設定 Supabase，無法編輯或新增題目，以下僅供瀏覽／匯出。</EmptyNote>}

        <QuestionFilters bosses={CONTENT.bosses} value={filter} onChange={handleFilterChange} />

        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-text-muted tabular">符合條件：{filteredEntries.length} 題</p>
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setOpenIds(new Set(pageItems.map((e) => e.question.id)))}
              className="rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
            >
              展開本頁
            </button>
            <button
              type="button"
              onClick={() => setOpenIds(new Set())}
              className="rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
            >
              收合本頁
            </button>
            <button
              type="button"
              onClick={() => downloadJSON("questions.json", exportQuestions)}
              className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
            >
              <Download size={14} /> 匯出 JSON
            </button>
            <button
              type="button"
              onClick={() => {
                const { headers, rows: csvRows } = exportRows(exportQuestions);
                downloadCSV("questions.csv", headers, csvRows);
              }}
              className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
            >
              <Download size={14} /> 匯出 CSV
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {pageItems.map((entry) => (
          <QuestionRow
            key={entry.question.id}
            entry={entry}
            bossLabel={bossLabel(entry.question.bossId)}
            open={openIds.has(entry.question.id)}
            onToggle={() => toggle(entry.question.id)}
            onEdit={() => setEditing({ entry })}
            editDisabled={!enabled}
          />
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

      {editing && (
        <QuestionEditor entry={editing.entry} bosses={CONTENT.bosses} onClose={() => setEditing(null)} />
      )}
    </Card>
  );
}
