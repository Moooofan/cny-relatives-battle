"use client";

import { useSearchParams } from "next/navigation";
import { BattleScreen } from "@/components/battle/BattleScreen";
import { BossPicker } from "@/components/battle/BossPicker";
import { CONTENT } from "@/content";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";

export function RandomInner() {
  const searchParams = useSearchParams();
  const bossParamRaw = searchParams.get("boss") ?? undefined;
  // An unknown/typo'd id (e.g. an old link, or a hand-edited URL) must never
  // reach createGame — treat it like no `?boss=` was given at all.
  const bossParam =
    bossParamRaw && CONTENT.bosses.some((b) => b.id === bossParamRaw) ? bossParamRaw : undefined;
  const state = useGameStore((s) => s.state);
  const resultSeen = useGameStore((s) => s.resultSeen);
  const startGame = useGameStore((s) => s.startGame);
  const lifeId = useLifeStore((s) => s.lifeId);

  // Deliberately includes phase "result" when it hasn't been seen yet: once
  // `advance` finishes the run we must keep rendering BattleScreen (not swap
  // back to the picker) so its useBattleLifecycle effect gets a chance to
  // record the run and router.push to /result — see docs/QA fix for the
  // "繼續 goes back to the picker" bug. But a *stale*, already-viewed result
  // (resultSeen) must not count as resumable, or re-visiting /random after
  // seeing /result would keep bouncing back to that old result instead of
  // showing the picker (or honoring a fresh `?boss=`).
  const stale = !!state && state.phase === "result" && resultSeen;
  const resumable = !!state && state.mode === "random" && !stale;

  if (!resumable && !bossParam) {
    return <BossPicker onPick={(bossId) => startGame("random", { bossId, lifeId })} />;
  }

  return <BattleScreen mode="random" bossId={bossParam} />;
}
