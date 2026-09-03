import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CONTENT } from "@/content";
import type { ContentBundle } from "@/engine/types";
import { applyOverrides, fetchOverrides, isFetchError, type QuestionOverrideRow } from "@/lib/contentOverrides";

/** Don't refetch overrides more than this often — `refresh()` is called
 * every time HydrationGate mounts (i.e. every page load), and the question
 * bank changes rarely enough that a 10-minute cache is plenty fresh for
 * players while still keeping the admin editor's own save flow snappy
 * (its RPCs write straight to Supabase and refresh again with `force`). */
const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

interface ContentState {
  rows: QuestionOverrideRow[];
  fetchedAt: number | null;
  /** `applyOverrides(CONTENT, rows)`, recomputed only when `rows` changes —
   * i.e. memoized, never recomputed per-render. Starts as the bundled
   * CONTENT so the game is playable before the first fetch resolves (or
   * forever, if Supabase isn't configured). */
  effectiveContent: ContentBundle;
  /** Fetches overrides at most once per REFRESH_INTERVAL_MS unless `force`.
   * A no-op when Supabase isn't configured. Never touches any in-progress
   * game — see src/store/gameStore.ts, which reads `effectiveContent` only
   * when starting a new run, not on every turn of an existing one. */
  refresh: (force?: boolean) => Promise<void>;
}

function computeEffectiveContent(rows: QuestionOverrideRow[]): ContentBundle {
  return applyOverrides(CONTENT, rows);
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      rows: [],
      fetchedAt: null,
      effectiveContent: CONTENT,

      refresh: async (force = false) => {
        const { fetchedAt } = get();
        if (!force && fetchedAt !== null && Date.now() - fetchedAt < REFRESH_INTERVAL_MS) return;
        const result = await fetchOverrides();
        if (result === null || isFetchError(result)) return; // disabled or failed — keep last-known rows
        set({ rows: result, fetchedAt: Date.now(), effectiveContent: computeEffectiveContent(result) });
      },
    }),
    {
      name: "dzsg:overrides",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ rows: s.rows, fetchedAt: s.fetchedAt }),
      onRehydrateStorage: () => (state) => {
        if (state) state.effectiveContent = computeEffectiveContent(state.rows);
      },
    }
  )
);
