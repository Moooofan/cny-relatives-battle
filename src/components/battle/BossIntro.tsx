import { BossPortrait } from "@/components/battle/BossPortrait";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { Boss, Life } from "@/engine/types";

interface Props {
  boss: Boss;
  life?: Life;
  onFight: () => void;
}

export function BossIntro({ boss, life, onFight }: Props) {
  const relation = life?.relations[boss.id];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      <BossPortrait boss={boss} size={128} />
      <div>
        <h2 className="font-display text-2xl text-gold">{boss.name}</h2>
        <p className="text-sm text-text-muted">{boss.title}</p>
      </div>
      <p className="rpg-box w-full p-4 text-base leading-relaxed">{boss.lines.intro}</p>
      {relation && (
        <p className="text-sm text-text-muted italic">
          {life?.name}的記憶：{relation}
        </p>
      )}
      <PrimaryButton onClick={onFight}>開戰</PrimaryButton>
    </div>
  );
}
