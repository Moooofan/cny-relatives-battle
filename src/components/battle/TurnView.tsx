import { DialogueBox } from "@/components/battle/DialogueBox";
import { FollowUpBadge } from "@/components/battle/FollowUpBadge";
import { HpBar } from "@/components/battle/HpBar";
import { OptionList } from "@/components/battle/OptionList";
import { PlayerHud } from "@/components/battle/PlayerHud";
import { SpecialBar } from "@/components/battle/SpecialBar";
import { SummonNotice } from "@/components/battle/SummonNotice";
import { TurnTimer } from "@/components/battle/TurnTimer";
import type { Boss, Option } from "@/engine/types";

interface Props {
  boss: Boss;
  summonedBoss?: Boss;
  questionText: string;
  options: Option[];
  bossHp: number;
  bossMaxHp: number;
  playerHp: number;
  playerMaxHp: number;
  combo: number;
  followUp: boolean;
  specials: { skip: number; heal: number };
  timerEndsAt: number | null;
  onPick: (optionId: string) => void;
  onTimeout: () => void;
  onUseSpecial: (kind: "skip" | "heal") => void;
}

export function TurnView({
  boss,
  summonedBoss,
  questionText,
  options,
  bossHp,
  bossMaxHp,
  playerHp,
  playerMaxHp,
  combo,
  followUp,
  specials,
  timerEndsAt,
  onPick,
  onTimeout,
  onUseSpecial,
}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-3 px-4 py-3">
      <HpBar label={boss.name} hp={bossHp} maxHp={bossMaxHp} variant="boss" />
      {summonedBoss && <SummonNotice summonedBoss={summonedBoss} />}
      {followUp && <FollowUpBadge />}
      <DialogueBox text={questionText} speaker={boss.name} />
      {timerEndsAt && <TurnTimer endsAt={timerEndsAt} onExpire={onTimeout} />}
      <div className="flex-1 overflow-y-auto">
        <OptionList options={options} disabled={false} onPick={onPick} />
      </div>
      <SpecialBar
        skip={specials.skip}
        heal={specials.heal}
        playerHp={playerHp}
        canAct
        onUse={onUseSpecial}
      />
      <PlayerHud hp={playerHp} maxHp={playerMaxHp} combo={combo} />
    </div>
  );
}
