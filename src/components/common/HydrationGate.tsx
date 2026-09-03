"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/content";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useStatsStore } from "@/store/statsStore";
import { useDailyStore } from "@/store/dailyStore";
import { useResultsStore } from "@/store/resultsStore";

/** Phases reached only after `startBoss` has actually run — `bossMaxHp` must
 * be > 0 in every one of them for a real boss. `intro` (not yet advanced),
 * `interlude` (story/gauntlet rest — no active boss fight) and `result`
 * (run already over) are excluded: bossMaxHp 0 is normal there. */
const REQUIRES_RESOLVED_BOSS: ReadonlySet<string> = new Set([
  "turn",
  "retort",
  "bossDefeated",
  "playerDefeated",
]);

/** True when a persisted game is corrupt enough that the app could get stuck
 * on it forever (e.g. an old bad `?boss=` id that bypassed validation before
 * this was fixed, or the boss/scene content shrinking underneath a save) —
 * see the /random/?boss=<invalid> QA fix. */
function isUnusableGame(state: ReturnType<typeof useGameStore.getState>["state"]): boolean {
  if (!state) return false;
  const currentBossId = state.bossQueue[state.bossIndex];
  const bossKnown = CONTENT.bosses.some((b) => b.id === currentBossId);
  if (state.bossQueue.length === 0 || !bossKnown) return true;
  if (REQUIRES_RESOLVED_BOSS.has(state.phase) && state.bossMaxHp <= 0) return true;
  return false;
}

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
        // A corrupt persisted game (unresolvable boss id, empty queue, ...)
        // must never be allowed to stick around — it would otherwise leave
        // the app permanently stuck on it (BattlePhase has nothing to render
        // for an unknown boss) and /random and the home "繼續上一場" banner
        // would keep bouncing straight back into it.
        const gameState = useGameStore.getState();
        if (isUnusableGame(gameState.state)) {
          gameState.resetGame();
          return;
        }

        // `timerEndsAt` is intentionally not persisted (it would be stale by
        // reload time anyway), so a reload mid-battle rehydrates `state` in
        // phase "turn" with no timer. Re-arm a fresh TURN_SECONDS countdown
        // here instead of leaving the timer bar missing until the next turn.
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
