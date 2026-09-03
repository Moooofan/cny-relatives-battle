"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabase, isSupabaseEnabled } from "@/lib/supabase";
import { relativeTime, taipeiDateString } from "@/lib/dates";
import { findLife } from "@/content/lives";
import { LifeIcon } from "@/components/common/LifeIcon";
import { useResultsStore } from "@/store/resultsStore";
import type { Mode } from "@/engine/types";

type Tab = Mode | "life";

const TABS: { key: Tab; label: string }[] = [
  { key: "random", label: "隨機" },
  { key: "daily", label: "每日" },
  { key: "story", label: "故事" },
  { key: "gauntlet", label: "闖關" },
  { key: "life", label: "人生戰績" },
];

interface RunRow {
  result_code: string;
  life_code: string;
  life_id: string | null;
  score: number;
  rank_title: string;
  won: boolean;
  bosses_defeated: number;
  turns: number;
  created_at: string;
}

interface LifeRow {
  life_code: string;
  runs: number;
  avg_score: number;
  win_rate: number;
}

type PanelState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; runRows: RunRow[] }
  | { status: "ready-life"; lifeRows: LifeRow[] };

export default function LeaderboardPage() {
  const router = useRouter();
  const enabled = isSupabaseEnabled();
  const [tab, setTab] = useState<Tab>("random");
  const results = useResultsStore((s) => s.results);
  const myCodes = useMemo(() => new Set(results.map((r) => r.resultCode)), [results]);

  return (
    <main className="flex flex-1 flex-col mx-auto w-full max-w-md px-4 py-4 safe-pt safe-pb gap-3">
      <div className="flex items-center gap-2 mb-1">
        <button type="button" onClick={() => router.back()} aria-label="返回">
          <ArrowLeft className="text-text-muted" size={22} />
        </button>
        <h1 className="font-display text-xl text-gold flex items-center gap-2">
          <Trophy size={20} />
          排行榜
        </h1>
      </div>

      {!enabled ? (
        <div className="rpg-box p-4 text-center text-sm text-text-muted">排行榜尚未開放。</div>
      ) : (
        <>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-current={tab === t.key ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-btn px-3 py-2 text-sm font-medium transition ${
                  tab === t.key
                    ? "bg-primary text-on-primary"
                    : "bg-surface-2 text-text-muted border border-border"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <TabPanel key={tab} tab={tab} myCodes={myCodes} />
        </>
      )}
    </main>
  );
}

/** One tab's data + fetch lifecycle, remounted (via the parent's `key={tab}`)
 * on every tab switch so its own `loading` state simply starts fresh instead
 * of needing a synchronous `setState` at the top of the effect. */
function TabPanel({ tab, myCodes }: { tab: Tab; myCodes: Set<string> }) {
  const [state, setState] = useState<PanelState>({ status: "loading" });

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return; // only mounted while enabled, so this shouldn't happen
    let cancelled = false;

    const request =
      tab === "life"
        ? supabase.rpc("life_stats")
        : tab === "daily"
          ? supabase.rpc("daily_leaderboard", { p_date: taipeiDateString(), p_limit: 50 })
          : supabase.rpc("leaderboard", { p_mode: tab, p_limit: 50 });

    void request.then(({ data, error }) => {
      if (cancelled) return;
      if (error || !data) {
        setState({ status: "error" });
        return;
      }
      setState(
        tab === "life" ? { status: "ready-life", lifeRows: data as LifeRow[] } : { status: "ready", runRows: data as RunRow[] }
      );
    });

    return () => {
      cancelled = true;
    };
  }, [tab]);

  if (state.status === "loading") {
    return <p className="text-center text-sm text-text-muted py-6">載入中…</p>;
  }
  if (state.status === "error") {
    return <p className="text-center text-sm text-text-muted py-6">讀取排行榜失敗，稍後再試。</p>;
  }

  if (state.status === "ready-life") {
    if (state.lifeRows.length === 0) {
      return <p className="text-center text-sm text-text-muted py-6">目前還沒有資料。</p>;
    }
    return (
      <div className="flex flex-col gap-2 overflow-y-auto pb-4">
        {state.lifeRows.map((row, i) => {
          const life = findLife(row.life_code);
          return (
            <div key={row.life_code} className="rpg-box flex items-center gap-3 p-3 text-sm">
              <span className="w-5 shrink-0 text-center text-text-muted tabular">{i + 1}</span>
              {life ? (
                <LifeIcon name={life.icon} size={20} className="text-gold shrink-0" />
              ) : (
                <span className="w-5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-text truncate">
                  {life?.name ?? "未知人生"}
                  <span className="text-text-muted text-xs">（{row.life_code}）</span>
                </p>
                <p className="text-text-muted text-xs">
                  {row.runs} 場 · 勝率 {Math.round(row.win_rate * 100)}%
                </p>
              </div>
              <span className="text-gold tabular shrink-0">{row.avg_score}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (state.runRows.length === 0) {
    return <p className="text-center text-sm text-text-muted py-6">目前還沒有紀錄，當第一個上榜的人吧。</p>;
  }
  return (
    <div className="flex flex-col gap-2 overflow-y-auto pb-4">
      {state.runRows.map((row, i) => {
        const life = findLife(row.life_code);
        const isMe = myCodes.has(row.result_code);
        return (
          <div
            key={row.result_code}
            className="rpg-box flex items-center gap-3 p-3 text-sm"
            style={isMe ? { backgroundColor: "var(--color-tint-win)" } : undefined}
          >
            <span className="w-5 shrink-0 text-center text-text-muted tabular">{i + 1}</span>
            {life ? (
              <LifeIcon name={life.icon} size={20} className="text-gold shrink-0" />
            ) : (
              <span className="w-5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-text truncate">
                {life?.name ?? "未知人生"}
                <span className="text-text-muted text-xs">（{row.life_code}）</span>
                {isMe && <span className="ml-1 text-gold text-xs">你</span>}
              </p>
              <p className="text-text-muted text-xs truncate">
                {row.rank_title} · {row.won ? "勝" : "敗"} · {row.turns} 回合 · {relativeTime(row.created_at)}
              </p>
            </div>
            <span className="text-gold tabular shrink-0">{row.score}</span>
          </div>
        );
      })}
    </div>
  );
}
