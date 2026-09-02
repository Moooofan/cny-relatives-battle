import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BossId, GameState, Mode, Topic } from "@/engine/types";

interface TopicStat {
  perfect: number;
  total: number;
}

interface StatsState {
  bestScore: Partial<Record<Mode, number>>;
  runs: number;
  bossesDefeated: Partial<Record<BossId, number>>;
  perfectRate: Partial<Record<Topic, TopicStat>>;
  recordRun: (state: GameState) => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      bestScore: {},
      runs: 0,
      bossesDefeated: {},
      perfectRate: {},
      recordRun: (state) => {
        const score = state.result?.score ?? 0;
        const cur = get();

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

        set({ bestScore, runs: cur.runs + 1, bossesDefeated, perfectRate });
      },
    }),
    {
      name: "dzsg:stats",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
