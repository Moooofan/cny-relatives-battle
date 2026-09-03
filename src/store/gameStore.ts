import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TURN_SECONDS } from "@/engine/archetypes";
import {
  advance as engineAdvance,
  applyOption as engineApplyOption,
  applyTimeout as engineApplyTimeout,
  createGame,
  resumeStory,
  applySpecial as engineApplySpecial,
} from "@/engine/reducer";
import type { GameState, Mode } from "@/engine/types";
import { useContentStore } from "@/store/contentStore";
import { dailySeed } from "@/lib/dates";
import { getClientId } from "@/lib/clientId";

/**
 * The owner's `/admin` question-bank edits (src/lib/contentOverrides.ts) are
 * applied on top of the bundled content and cached in contentStore. Reading
 * it fresh here — rather than importing `CONTENT` from "@/content" directly
 * — means a newly started run always sees the latest edits, while an
 * already-running game keeps whatever content produced its (already
 * persisted) `state`: nothing here ever re-derives an in-progress game's
 * deck from a different content snapshot.
 */
function content() {
  return useContentStore.getState().effectiveContent;
}

const TURN_MS = TURN_SECONDS * 1000;

interface StartOpts {
  bossId?: string;
  lifeId?: string | null;
}

interface GameStore {
  state: GameState | null;
  timerEndsAt: number | null;
  /** Story mode only: scene index to resume at after a loss, persisted even
   * once `state` itself moves on to another mode. */
  storyCheckpoint: number | null;
  /** True once `/result/` has rendered for the current `state.result`. Reset
   * to false by every `commit()` (i.e. any new action/game), so it only ever
   * describes "has *this* finished run been shown yet". Mode pages use it to
   * tell a just-finished (not yet redirected) run — which should still be
   * allowed to redirect to /result — apart from a stale, already-viewed one
   * that a fresh page mount should start over instead of bouncing back to. */
  resultSeen: boolean;

  startGame: (mode: Mode, opts?: StartOpts) => void;
  pickOption: (optionId: string) => void;
  timeout: () => void;
  applySpecial: (kind: "skip" | "heal") => void;
  advance: () => void;
  resumeStoryCheckpoint: (sceneIndex: number, lifeId?: string | null) => void;
  startTimer: () => void;
  resetGame: () => void;
  markResultSeen: () => void;
}

function seedFor(mode: Mode): string {
  if (mode === "daily") return dailySeed();
  return `${mode}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => {
      /** Every action funnels its resulting GameState through here so the
       * turn timer and the story checkpoint stay in sync automatically. */
      function commit(next: GameState): void {
        const timerEndsAt = next.phase === "turn" ? Date.now() + TURN_MS : null;

        let storyCheckpoint = get().storyCheckpoint;
        if (next.mode === "story") {
          if (next.phase === "result") {
            storyCheckpoint = next.result?.storyEndingId === "lost" ? (next.storyCheckpoint ?? storyCheckpoint) : null;
          } else if (typeof next.storyCheckpoint === "number") {
            storyCheckpoint = next.storyCheckpoint;
          }
        }

        set({ state: next, timerEndsAt, storyCheckpoint, resultSeen: false });
      }

      return {
        state: null,
        timerEndsAt: null,
        storyCheckpoint: null,
        resultSeen: false,

        startGame: (mode, opts) => {
          const seed = seedFor(mode);
          const next = createGame(content(), mode, seed, {
            bossId: opts?.bossId,
            lifeId: opts?.lifeId ?? undefined,
            salt: getClientId(),
          });
          commit(next);
        },

        pickOption: (optionId) => {
          const cur = get().state;
          if (!cur || cur.phase !== "turn") return;
          commit(engineApplyOption(content(), cur, optionId));
        },

        timeout: () => {
          const cur = get().state;
          if (!cur || cur.phase !== "turn") return;
          commit(engineApplyTimeout(content(), cur));
        },

        applySpecial: (kind) => {
          const cur = get().state;
          if (!cur) return;
          commit(engineApplySpecial(content(), cur, kind));
        },

        advance: () => {
          const cur = get().state;
          if (!cur) return;
          commit(engineAdvance(content(), cur));
        },

        resumeStoryCheckpoint: (sceneIndex, lifeId) => {
          const seed = seedFor("story");
          commit(resumeStory(content(), seed, sceneIndex, { lifeId: lifeId ?? undefined, salt: getClientId() }));
        },

        startTimer: () => set({ timerEndsAt: Date.now() + TURN_MS }),

        resetGame: () => set({ state: null, timerEndsAt: null, resultSeen: false }),

        markResultSeen: () => set({ resultSeen: true }),
      };
    },
    {
      name: "dzsg:game",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ state: s.state, storyCheckpoint: s.storyCheckpoint, resultSeen: s.resultSeen }),
    }
  )
);
