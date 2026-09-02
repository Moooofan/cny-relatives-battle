import { BossPortrait } from "@/components/battle/BossPortrait";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { Boss } from "@/engine/types";

interface Props {
  boss: Boss;
  outcome: "bossDefeated" | "playerDefeated";
  onContinue: () => void;
}

/** Shared screen for a boss falling or the player losing this fight —
 * portrait, the relevant line, and one 繼續 CTA into `advance()`. */
export function OutcomeView({ boss, outcome, onContinue }: Props) {
  const won = outcome === "bossDefeated";
  const line = won ? boss.lines.defeated : boss.lines.victory;
  const heading = won ? `${boss.name}被你問倒了！` : `被${boss.name}問倒了……`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      <BossPortrait boss={boss} size={128} />
      <h2 className="font-display text-xl text-gold">{heading}</h2>
      <p className="rpg-box w-full p-4 text-base leading-relaxed">{line}</p>
      <PrimaryButton onClick={onContinue}>繼續</PrimaryButton>
    </div>
  );
}
