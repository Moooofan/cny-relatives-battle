import { useEffect, useRef } from "react";
import type { Mode } from "@/engine/types";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";

/** Ensures a game exists for this route on mount: resumes an in-progress run
 * of the same mode in place, resumes a story checkpoint, or starts fresh. */
export function useEnsureGame(mode: Mode, bossId?: string): void {
  const state = useGameStore((s) => s.state);
  const storyCheckpoint = useGameStore((s) => s.storyCheckpoint);
  const startGame = useGameStore((s) => s.startGame);
  const resumeStoryCheckpoint = useGameStore((s) => s.resumeStoryCheckpoint);
  const lifeId = useLifeStore((s) => s.lifeId);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (state && state.mode === mode && state.phase !== "result") return;
    if (mode === "story" && (!state || state.mode !== "story") && storyCheckpoint != null) {
      resumeStoryCheckpoint(storyCheckpoint);
      return;
    }
    startGame(mode, { bossId, lifeId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
