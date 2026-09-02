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

  const resumable = !!state && state.mode === "random" && state.phase !== "result";

  if (!resumable && !bossParam) {
    return <BossPicker onPick={(bossId) => startGame("random", { bossId, lifeId })} />;
  }

  return <BattleScreen mode="random" bossId={bossParam} />;
}
