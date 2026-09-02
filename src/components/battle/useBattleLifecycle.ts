import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { GameState } from "@/engine/types";
import { useGameStore } from "@/store/gameStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useStatsStore } from "@/store/statsStore";
import { playSfx, type SfxName } from "@/lib/sfx";

const AUTO_ADVANCE_MS = 1600;

/** Sfx on phase transitions, auto-advance out of the retort screen, and
 * navigating to /result (recording stats exactly once) when the run ends. */
export function useBattleLifecycle(state: GameState | null): void {
  const router = useRouter();
  const advance = useGameStore((s) => s.advance);
  const sfxEnabled = useSettingsStore((s) => s.sfx);
  const recordRun = useStatsStore((s) => s.recordRun);
  const recordedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!state) return;
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
  }, [state?.phase, state?.turns]);

  useEffect(() => {
    if (state?.phase !== "retort") return;
    const id = setTimeout(() => advance(), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [state?.phase, state?.turns, advance]);

  useEffect(() => {
    if (state?.phase === "result" && state.result && recordedRef.current !== state.result.resultCode) {
      recordedRef.current = state.result.resultCode;
      recordRun(state);
      router.push("/result");
    }
  }, [state, router, recordRun]);
}
