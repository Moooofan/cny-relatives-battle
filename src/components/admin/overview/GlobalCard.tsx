"use client";

import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import { fetchGlobalCounts, isFetchError, isSupabaseEnabled, type GlobalCounts } from "@/lib/adminSupabase";
import { Card, SectionTitle, StatTile, EmptyNote } from "@/components/admin/Section";

type State = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; counts: GlobalCounts };

/** Overview's 全站 card: total/today/device counts from the optional
 * Supabase backend. Renders a muted note instead of the card body when
 * Supabase isn't configured — see src/lib/adminSupabase.ts. */
export function GlobalCard() {
  const enabled = isSupabaseEnabled();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    void fetchGlobalCounts().then((result) => {
      if (cancelled) return;
      if (isFetchError(result)) setState({ status: "error", message: result.error });
      else if (result) setState({ status: "ready", counts: result });
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Globe2 size={16} className="text-gold" />
        <SectionTitle>全站</SectionTitle>
      </div>

      {!enabled && <EmptyNote>尚未設定 Supabase</EmptyNote>}

      {enabled && state.status === "loading" && <EmptyNote>載入中…</EmptyNote>}
      {enabled && state.status === "error" && <EmptyNote>讀取失敗：{state.message}</EmptyNote>}
      {enabled && state.status === "ready" && (
        <div className="flex flex-wrap gap-2">
          <StatTile label="總場次" value={state.counts.totalRuns} />
          <StatTile label="今日場次" value={state.counts.runsToday} />
          <StatTile label="不同裝置數" value={state.counts.distinctClients} />
        </div>
      )}
    </Card>
  );
}
