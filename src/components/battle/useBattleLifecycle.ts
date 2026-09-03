import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { GameState, Mode } from "@/engine/types";
import { useGameStore } from "@/store/gameStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useStatsStore } from "@/store/statsStore";
import { playSfx, type SfxName } from "@/lib/sfx";

const AUTO_ADVANCE_MS = 1600;

/** Sfx on phase transitions, auto-advance out of the retort screen, and
 * navigating to /result (recording stats exactly once) when the run ends.
 *
 * Every effect below is also gated on `state.mode === mode` (the mode this
 * particular page/BattleScreen instance is for). Without that gate, a stale
 * finished (or mid-retort) game left over from a *different* mode can still
 * be sitting in the store for one render right after navigating to a new
 * mode's page — before useEnsureGame's fresh `startGame` call replaces it —
 * and would otherwise wrongly fire sfx, auto-advance, or (worst) redirect to
 * /result for a game that has nothing to do with the page you just opened. */
export function useBattleLifecycle(state: GameState | null, mode: Mode): void {
  const router = useRouter();
  const advance = useGameStore((s) => s.advance);
  const resultSeen = useGameStore((s) => s.resultSeen);
  const sfxEnabled = useSettingsStore((s) => s.sfx);
  const recordRun = useStatsStore((s) => s.recordRun);
  const recordedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!state || state.mode !== mode) return;
    if (state.phase === "retort" && state.lastResolve) {
      const r = state.lastResolve;
      const name: SfxName = r.crit ? "crit" : r.taken >= 30 ? "landmine" : r.dealt > 0 ? "hit" : "hurt";
      playSfx(name, sfxEnabled);
    } else if (state.phase === "bossDefeated") {
      playSfx("win", sfxEnabled);
    } else if (state.phase === "playerDefeated") {
      playSfx("lose", sfxEnabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.mode, state?.phase, state?.turns, mode]);

  useEffect(() => {
    if (!state || state.mode !== mode || state.phase !== "retort") return;
    const id = setTimeout(() => advance(), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.mode, state?.phase, state?.turns, mode, advance]);

  useEffect(() => {
    // `!resultSeen` excludes a stale, already-viewed result: without it, a
    // fresh mount of this same mode's page with an old finished game sitting
    // in the store (e.g. navigating /random -> /random after already seeing
    // /result for that run) would bounce straight back to /result instead of
    // letting useEnsureGame start the fresh run the user actually asked for.
    if (
      state &&
      state.mode === mode &&
      state.phase === "result" &&
      state.result &&
      !resultSeen &&
      recordedRef.current !== state.result.resultCode
    ) {
      recordedRef.current = state.result.resultCode;
      recordRun(state);
      router.push("/result");
    }
  }, [state, mode, router, recordRun, resultSeen]);
}
