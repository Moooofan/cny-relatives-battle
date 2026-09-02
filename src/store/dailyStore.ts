import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isConsecutiveDay, taipeiDateString } from "@/lib/dates";

interface DailyState {
  date: string | null;
  done: boolean;
  streak: number;
  best: number;
  rankTitle: string | null;
  markDone: (score: number, rankTitle: string) => void;
}

export const useDailyStore = create<DailyState>()(
  persist(
    (set, get) => ({
      date: null,
      done: false,
      streak: 0,
      best: 0,
      rankTitle: null,
      markDone: (score, rankTitle) => {
        const today = taipeiDateString();
        const cur = get();
        if (cur.date === today && cur.done) return; // already recorded today
        const streak = isConsecutiveDay(cur.date, today) ? cur.streak + 1 : 1;
        set({ date: today, done: true, streak, best: Math.max(score, cur.best), rankTitle });
      },
    }),
    {
      name: "dzsg:daily",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

/** Whether today's daily challenge is already finished (recompute against
 * "today" every call — `date` alone can be stale across midnight). */
export function isDailyDoneToday(state: Pick<DailyState, "date" | "done">): boolean {
  return state.date === taipeiDateString() && state.done;
}
