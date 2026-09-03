"use client";

import { useState } from "react";
import { CONTENT } from "@/content";
import { useResultsStore } from "@/store/resultsStore";
import { Card, SectionTitle } from "@/components/admin/Section";
import { LifeRow } from "@/components/admin/lives/LifeRow";
import { groupResultsByLife } from "@/components/admin/resultsMath";

export function LivesTab() {
  const results = useResultsStore((s) => s.results);
  const statsByLife = new Map(groupResultsByLife(results).map((s) => [s.lifeCode, s]));
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <SectionTitle>30 種人生（{CONTENT.lives.length}）</SectionTitle>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpenIds(new Set(CONTENT.lives.map((l) => l.id)))}
            className="rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
          >
            展開全部
          </button>
          <button
            type="button"
            onClick={() => setOpenIds(new Set())}
            className="rounded-btn border border-border bg-surface-2 px-3 py-1.5 text-xs text-text"
          >
            收合全部
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {CONTENT.lives.map((life) => (
          <LifeRow
            key={life.id}
            life={life}
            bosses={CONTENT.bosses}
            stat={statsByLife.get(life.code)}
            open={openIds.has(life.id)}
            onToggle={() => toggle(life.id)}
          />
        ))}
      </div>
    </Card>
  );
}
