import { BossPortrait } from "@/components/battle/BossPortrait";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { Boss, Life, Tier } from "@/engine/types";

interface Props {
  boss: Boss;
  life?: Life;
  actCaption?: string;
  onFight: () => void;
}

const TIER_LABEL: Record<Tier, string> = {
  easy: "小咖",
  normal: "中堅",
  hard: "大魔王",
  final: "最終魔王",
};

export function BossIntro({ boss, life, actCaption, onFight }: Props) {
  const relation = life?.relations[boss.id];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      {actCaption && <p className="text-xs text-gold">{actCaption}</p>}
      <BossPortrait boss={boss} size={128} idle />
      <div>
        <h2 className="font-display text-2xl text-gold">{boss.name}</h2>
        <p className="text-sm text-text-muted">{boss.title}</p>
        <span className="mt-2 inline-flex rounded-full border border-gold/50 bg-gold/10 px-2 py-0.5 text-xs text-gold">
          {TIER_LABEL[boss.tier]}
        </span>
      </div>
      <p className="rpg-box w-full p-4 text-base leading-relaxed">{boss.lines.intro}</p>
      <p className="text-xs text-text-muted leading-relaxed">{boss.description}</p>
      {relation && (
        <p className="text-sm text-text-muted italic">
          {life?.name}的記憶：{relation}
        </p>
      )}
      <PrimaryButton onClick={onFight}>開戰</PrimaryButton>
    </div>
  );
}
