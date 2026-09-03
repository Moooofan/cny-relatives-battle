import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BossId, GameState, Mode, Topic } from "@/engine/types";

interface TopicStat {
  perfect: number;
  total: number;
}

/** How many recently-recorded resultCodes to remember for dedupe. */
const MAX_RECORDED_CODES = 200;

interface StatsState {
  bestScore: Partial<Record<Mode, number>>;
  runs: number;
  bossesDefeated: Partial<Record<BossId, number>>;
  perfectRate: Partial<Record<Topic, TopicStat>>;
  /** resultCodes already folded into these stats, most recent first — guards
   * recordRun against double-counting the same run (e.g. a remount racing
   * with useBattleLifecycle's own in-memory guard). */
  recordedCodes: string[];
  recordRun: (state: GameState) => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      bestScore: {},
      runs: 0,
      bossesDefeated: {},
      perfectRate: {},
      recordedCodes: [],
      recordRun: (state) => {
        const resultCode = state.result?.resultCode;
        const cur = get();
        if (resultCode && cur.recordedCodes.includes(resultCode)) return; // already recorded

        const score = state.result?.score ?? 0;

        const bestScore = { ...cur.bestScore };
        bestScore[state.mode] = Math.max(bestScore[state.mode] ?? 0, score);

        const bossesDefeated = { ...cur.bossesDefeated };
        for (const bossId of state.bossQueue.slice(0, state.bossesDefeated)) {
          bossesDefeated[bossId] = (bossesDefeated[bossId] ?? 0) + 1;
        }

        const perfectRate = { ...cur.perfectRate };
        for (const entry of state.log) {
          const prev = perfectRate[entry.topic] ?? { perfect: 0, total: 0 };
          perfectRate[entry.topic] = {
            perfect: prev.perfect + (entry.archetype === "perfect" ? 1 : 0),
            total: prev.total + 1,
          };
        }

        const recordedCodes = resultCode
          ? [resultCode, ...cur.recordedCodes].slice(0, MAX_RECORDED_CODES)
          : cur.recordedCodes;

        set({ bestScore, runs: cur.runs + 1, bossesDefeated, perfectRate, recordedCodes });
      },
    }),
    {
      name: "dzsg:stats",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
