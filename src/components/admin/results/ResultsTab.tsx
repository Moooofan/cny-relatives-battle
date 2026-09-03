"use client";

import { useState } from "react";
import { LocalResultsView } from "@/components/admin/results/LocalResultsView";
import { GlobalResultsView } from "@/components/admin/results/GlobalResultsView";

type Scope = "local" | "global";

const SCOPE_TABS: { key: Scope; label: string }[] = [
  { key: "local", label: "本機" },
  { key: "global", label: "全站" },
];

export function ResultsTab() {
  const [scope, setScope] = useState<Scope>("local");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        {SCOPE_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setScope(t.key)}
            aria-current={scope === t.key ? "page" : undefined}
            className={`rounded-btn px-4 py-1.5 text-sm font-medium transition ${
              scope === t.key ? "bg-primary text-on-primary" : "bg-surface-2 text-text-muted border border-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {scope === "local" ? <LocalResultsView /> : <GlobalResultsView />}
    </div>
  );
}
