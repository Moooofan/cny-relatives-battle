"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useStatsStore } from "@/store/statsStore";
import { useDailyStore } from "@/store/dailyStore";
import { useResultsStore } from "@/store/resultsStore";

/**
 * Every persisted store uses `skipHydration: true` so a static export never
 * flashes server-rendered defaults over real localStorage data. This gate
 * rehydrates them all once on mount and shows a plain placeholder until done.
 */
export function HydrationGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      useGameStore.persist.rehydrate(),
      useLifeStore.persist.rehydrate(),
      useSettingsStore.persist.rehydrate(),
      useStatsStore.persist.rehydrate(),
      useDailyStore.persist.rehydrate(),
      useResultsStore.persist.rehydrate(),
    ])
      .then(() => {
        // `timerEndsAt` is intentionally not persisted (it would be stale by
        // reload time anyway), so a reload mid-battle rehydrates `state` in
        // phase "turn" with no timer. Re-arm a fresh TURN_SECONDS countdown
        // here instead of leaving the timer bar missing until the next turn.
        const gameState = useGameStore.getState();
        if (gameState.state?.phase === "turn") {
          gameState.startTimer();
        }
      })
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-dvh bg-bg">
        <p className="text-text-muted text-sm">載入中…</p>
      </div>
    );
  }

  return <>{children}</>;
}
