"use client";

import { CalendarCheck } from "lucide-react";
import { BattleScreen } from "@/components/battle/BattleScreen";
import { LinkButton } from "@/components/common/LinkButton";
import { useDailyStore, isDailyDoneToday } from "@/store/dailyStore";
import { useGameStore } from "@/store/gameStore";

export default function DailyPage() {
  const daily = useDailyStore();
  const state = useGameStore((s) => s.state);
  const done = isDailyDoneToday(daily);
  const canReviewToday = done && state?.mode === "daily" && state.phase === "result";

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <CalendarCheck className="text-gold" size={48} />
        <h1 className="font-display text-xl text-gold">今天的每日挑戰已完成</h1>
        <p className="text-sm text-text-muted">
          稱號：{daily.rankTitle ?? "—"} · 分數 {daily.best} · 連續 {daily.streak} 天
        </p>
        <p className="text-xs text-text-muted">明天 00:00（台北時間）再來一次。</p>
        {canReviewToday ? (
          <LinkButton href="/result">查看今天的結果</LinkButton>
        ) : (
          <LinkButton href="/" variant="ghost">
            回首頁
          </LinkButton>
        )}
      </div>
    );
  }

  return <BattleScreen mode="daily" />;
}
