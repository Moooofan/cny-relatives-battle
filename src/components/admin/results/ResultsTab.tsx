"use client";

import { useMemo, useState } from "react";
import { CONTENT } from "@/content";
import { useResultsStore } from "@/store/resultsStore";
import { useStatsStore } from "@/store/statsStore";
import type { Mode } from "@/engine/types";
import { Card, SectionTitle } from "@/components/admin/Section";
import { ResultsTable } from "@/components/admin/results/ResultsTable";
import { ResultsAggregates } from "@/components/admin/results/ResultsAggregates";
import { ResultsImportExport } from "@/components/admin/results/ResultsImportExport";

const MODE_LABELS: Record<Mode, string> = { random: "隨機", daily: "每日", story: "故事", gauntlet: "闖關" };
const selectClass = "h-9 rounded-btn bg-surface-2 border border-border px-2 text-sm text-text";

export function ResultsTab() {
  const results = useResultsStore((s) => s.results);
  const bossesDefeated = useStatsStore((s) => s.bossesDefeated);

  const [modeFilter, setModeFilter] = useState<string>("all");
  const [lifeFilter, setLifeFilter] = useState<string>("all");
  const [codeQuery, setCodeQuery] = useState("");

  const lifeCodes = useMemo(() => [...new Set(results.map((r) => r.lifeCode).filter((c): c is string => !!c))], [results]);

  const filtered = useMemo(() => {
    return results.filter((r) => {
      if (modeFilter !== "all" && r.mode !== modeFilter) return false;
      if (lifeFilter !== "all" && r.lifeCode !== lifeFilter) return false;
      if (codeQuery.trim() && !r.resultCode.toLowerCase().includes(codeQuery.trim().toLowerCase())) return false;
      return true;
    });
  }, [results, modeFilter, lifeFilter, codeQuery]);

  return (
    <div className="flex flex-col gap-4">
      <ResultsAggregates results={results} bossesDefeated={bossesDefeated} />

      <Card>
        <SectionTitle>本機戰績（共 {results.length} 筆）</SectionTitle>

        <div className="flex flex-wrap gap-2 items-center">
          <select className={selectClass} value={modeFilter} onChange={(e) => setModeFilter(e.target.value)}>
            <option value="all">全部模式</option>
            {Object.entries(MODE_LABELS).map(([mode, label]) => (
              <option key={mode} value={mode}>
                {label}
              </option>
            ))}
          </select>
          <select className={selectClass} value={lifeFilter} onChange={(e) => setLifeFilter(e.target.value)}>
            <option value="all">全部人生</option>
            {lifeCodes.map((code) => (
              <option key={code} value={code}>
                {code} {CONTENT.lives.find((l) => l.code === code)?.name ?? ""}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="查代碼…"
            value={codeQuery}
            onChange={(e) => setCodeQuery(e.target.value)}
            className="h-9 flex-1 min-w-[140px] rounded-btn bg-surface-2 border border-border px-3 text-sm text-text placeholder:text-text-muted"
          />
        </div>

        <p className="text-sm text-text-muted tabular">符合條件：{filtered.length} 筆</p>

        <ResultsImportExport filtered={filtered} />

        <ResultsTable results={filtered} />
      </Card>
    </div>
  );
}
