"use client";

import { findLife } from "@/content/lives";
import type { Mode } from "@/engine/types";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";
import { unlockAudio } from "@/lib/sfx";
import { useEnsureGame } from "@/components/battle/useEnsureGame";
import { useBattleLifecycle } from "@/components/battle/useBattleLifecycle";
import { BattlePhase } from "@/components/battle/BattlePhase";

interface Props {
  mode: Mode;
  bossId?: string;
}

export function BattleScreen({ mode, bossId }: Props) {
  const state = useGameStore((s) => s.state);
  const timerEndsAt = useGameStore((s) => s.timerEndsAt);
  const pickOption = useGameStore((s) => s.pickOption);
  const timeout = useGameStore((s) => s.timeout);
  const applySpecial = useGameStore((s) => s.applySpecial);
  const advance = useGameStore((s) => s.advance);
  const lifeId = useLifeStore((s) => s.lifeId);

  useEnsureGame(mode, bossId);
  useBattleLifecycle(state);

  if (!state) {
    return <div className="flex flex-1 items-center justify-center text-text-muted">載入中…</div>;
  }

  function withUnlock<T extends unknown[]>(fn: (...a: T) => void) {
    return (...a: T) => {
      unlockAudio();
      fn(...a);
    };
  }

  return (
    <BattlePhase
      state={state}
      life={lifeId ? findLife(lifeId) : undefined}
      timerEndsAt={timerEndsAt}
      onFight={withUnlock(advance)}
      onContinue={withUnlock(advance)}
      onPick={withUnlock(pickOption)}
      onTimeout={timeout}
      onUseSpecial={withUnlock(applySpecial)}
    />
  );
}
