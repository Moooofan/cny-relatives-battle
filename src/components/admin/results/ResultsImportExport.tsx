"use client";

import { useRef, useState } from "react";
import { Download, Trash2, Upload } from "lucide-react";
import { useResultsStore, type ResultEntry } from "@/store/resultsStore";
import { downloadCSV, downloadJSON, readFileAsText } from "@/lib/adminExport";

const ADMIN_MAX_RESULTS = 1000;

function isResultEntry(value: unknown): value is ResultEntry {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return typeof r.resultCode === "string" && typeof r.mode === "string" && typeof r.score === "number";
}

function mergeByResultCode(existing: ResultEntry[], incoming: ResultEntry[]) {
  const seen = new Set(existing.map((r) => r.resultCode));
  const added: ResultEntry[] = [];
  let skipped = 0;
  for (const entry of incoming) {
    if (!isResultEntry(entry) || seen.has(entry.resultCode)) {
      skipped++;
      continue;
    }
    seen.add(entry.resultCode);
    added.push(entry);
  }
  const merged = [...added, ...existing]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, ADMIN_MAX_RESULTS);
  return { merged, addedCount: added.length, skipped };
}

export function ResultsImportExport({ filtered }: { filtered: ResultEntry[] }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleImport(file: File) {
    try {
      const text = await readFileAsText(file);
      const parsed: unknown = JSON.parse(text);
      const incoming = Array.isArray(parsed) ? parsed : [];
      const existing = useResultsStore.getState().results;
      const { merged, addedCount, skipped } = mergeByResultCode(existing, incoming);
      useResultsStore.setState({ results: merged });
      setMessage(`匯入完成：新增 ${addedCount} 筆，略過重複／無效 ${skipped} 筆。`);
    } catch {
      setMessage("匯入失敗：檔案不是有效的 JSON。");
    }
  }

  function handleClear() {
    if (!window.confirm("確定要清除本機所有戰績紀錄嗎？此動作無法復原。")) return;
    useResultsStore.setState({ results: [] });
    setMessage("已清除本機戰績。");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => downloadJSON("results.json", filtered)}
          className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
        >
          <Download size={14} /> 匯出 JSON
        </button>
        <button
          type="button"
          onClick={() =>
            downloadCSV(
              "results.csv",
              ["resultCode", "lifeCode", "mode", "score", "rankTitle", "endingId", "bossesDefeated", "turns", "maxCombo", "hpLeft", "at"],
              filtered.map((r) => [
                r.resultCode,
                r.lifeCode ?? "",
                r.mode,
                r.score,
                r.rankTitle,
                r.endingId ?? "",
                r.bossesDefeated,
                r.turns,
                r.maxCombo,
                r.hpLeft,
                r.at,
              ])
            )
          }
          className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
        >
          <Download size={14} /> 匯出 CSV
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
        >
          <Upload size={14} /> 匯入 JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImport(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1 rounded-btn border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs text-primary"
        >
          <Trash2 size={14} /> 清除本機結果
        </button>
      </div>
      {message && <p className="text-xs text-text-muted">{message}</p>}
    </div>
  );
}
