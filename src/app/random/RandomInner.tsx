"use client";

import { useSearchParams } from "next/navigation";
import { BattleScreen } from "@/components/battle/BattleScreen";
import { BossPicker } from "@/components/battle/BossPicker";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";

export function RandomInner() {
  const searchParams = useSearchParams();
  const bossParam = searchParams.get("boss") ?? undefined;
  const state = useGameStore((s) => s.state);
  const startGame = useGameStore((s) => s.startGame);
  const lifeId = useLifeStore((s) => s.lifeId);

  // Deliberately includes phase "result": once `advance` finishes the run we
  // must keep rendering BattleScreen (not swap back to the picker) so its
  // useBattleLifecycle effect gets a chance to record the run and
  // router.push to /result — see docs/QA fix for the "繼續 goes back to the
  // picker" bug.
  const resumable = !!state && state.mode === "random";

  if (!resumable && !bossParam) {
    return <BossPicker onPick={(bossId) => startGame("random", { bossId, lifeId })} />;
  }

  return <BattleScreen mode="random" bossId={bossParam} />;
}
