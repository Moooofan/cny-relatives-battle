import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Mode, StoryEndingId } from "@/engine/types";

export interface ResultEntry {
  resultCode: string;
  lifeId: string | null;
  lifeCode: string | null;
  mode: Mode;
  score: number;
  rankTitle: string;
  endingId?: StoryEndingId;
  bossesDefeated: number;
  turns: number;
  maxCombo: number;
  hpLeft: number;
  seed: string;
  at: string;
}

const MAX_RESULTS = 200;

interface ResultsState {
  results: ResultEntry[];
  addResult: (entry: ResultEntry) => void;
}

export const useResultsStore = create<ResultsState>()(
  persist(
    (set, get) => ({
      results: [],
      addResult: (entry) => {
        if (get().results[0]?.resultCode === entry.resultCode) return; // already recorded
        set((s) => ({ results: [entry, ...s.results].slice(0, MAX_RESULTS) }));
      },
    }),
    {
      name: "dzsg:results",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
