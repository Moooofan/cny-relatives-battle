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
import { CONTENT } from "@/content";
import { dailySeed } from "@/lib/dates";

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

  startGame: (mode: Mode, opts?: StartOpts) => void;
  pickOption: (optionId: string) => void;
  timeout: () => void;
  applySpecial: (kind: "skip" | "heal") => void;
  advance: () => void;
  resumeStoryCheckpoint: (sceneIndex: number) => void;
  startTimer: () => void;
  resetGame: () => void;
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

        set({ state: next, timerEndsAt, storyCheckpoint });
      }

      return {
        state: null,
        timerEndsAt: null,
        storyCheckpoint: null,

        startGame: (mode, opts) => {
          const seed = seedFor(mode);
          const next = createGame(CONTENT, mode, seed, {
            bossId: opts?.bossId,
            lifeId: opts?.lifeId ?? undefined,
          });
          commit(next);
        },

        pickOption: (optionId) => {
          const cur = get().state;
          if (!cur || cur.phase !== "turn") return;
          commit(engineApplyOption(CONTENT, cur, optionId));
        },

        timeout: () => {
          const cur = get().state;
          if (!cur || cur.phase !== "turn") return;
          commit(engineApplyTimeout(CONTENT, cur));
        },

        applySpecial: (kind) => {
          const cur = get().state;
          if (!cur) return;
          commit(engineApplySpecial(CONTENT, cur, kind));
        },

        advance: () => {
          const cur = get().state;
          if (!cur) return;
          commit(engineAdvance(CONTENT, cur));
        },

        resumeStoryCheckpoint: (sceneIndex) => {
          const seed = seedFor("story");
          commit(resumeStory(CONTENT, seed, sceneIndex));
        },

        startTimer: () => set({ timerEndsAt: Date.now() + TURN_MS }),

        resetGame: () => set({ state: null, timerEndsAt: null }),
      };
    },
    {
      name: "dzsg:game",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ state: s.state, storyCheckpoint: s.storyCheckpoint }),
    }
  )
);
