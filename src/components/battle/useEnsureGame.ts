import { useEffect, useRef } from "react";
import type { Mode } from "@/engine/types";
import { CONTENT } from "@/content";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";

/** Ensures a game exists for this route on mount: resumes an in-progress run
 * of the same mode in place, resumes a story checkpoint, or starts fresh. */
export function useEnsureGame(mode: Mode, bossId?: string): void {
  const state = useGameStore((s) => s.state);
  const resultSeen = useGameStore((s) => s.resultSeen);
  const storyCheckpoint = useGameStore((s) => s.storyCheckpoint);
  const startGame = useGameStore((s) => s.startGame);
  const resumeStoryCheckpoint = useGameStore((s) => s.resumeStoryCheckpoint);
  const lifeId = useLifeStore((s) => s.lifeId);
  const startedRef = useRef(false);

  // Never hand an unknown id to createGame — an invalid `?boss=` should be
  // ignored (falls back to the boss picker / an rng pick), never persisted.
  const knownBossId = bossId && CONTENT.bosses.some((b) => b.id === bossId) ? bossId : undefined;

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    // A stale, already-viewed result (resultSeen) does NOT count as "same
    // mode, still relevant" — otherwise a fresh mount of this page would
    // bounce straight back to /result instead of starting what the user
    // actually asked for. An in-progress run, or a finished-but-unseen one
    // (still on its way to useBattleLifecycle's own redirect), is left alone.
    const stale = !!state && state.phase === "result" && resultSeen;
    if (state && state.mode === mode && !stale) return;
    if (mode === "story" && storyCheckpoint != null) {
      resumeStoryCheckpoint(storyCheckpoint, lifeId);
      return;
    }
    startGame(mode, { bossId: knownBossId, lifeId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
