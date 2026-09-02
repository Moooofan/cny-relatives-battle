import { BossPortrait } from "@/components/battle/BossPortrait";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { Boss } from "@/engine/types";

interface Props {
  boss: Boss;
  outcome: "bossDefeated" | "playerDefeated";
  turns: number;
  dealt: number;
  maxCombo: number;
  onContinue: () => void;
}

/** Shared screen for a boss falling or the player losing this fight —
 * full-bleed tinted panel, portrait, the relevant line, fight stats, and one
 * 繼續 CTA into `advance()`. */
export function OutcomeView({ boss, outcome, turns, dealt, maxCombo, onContinue }: Props) {
  const won = outcome === "bossDefeated";
  const line = won ? boss.lines.defeated : boss.lines.victory;
  const heading = won ? `${boss.name}被你問倒了！` : `被${boss.name}問倒了……`;

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center gap-5 px-6 py-10 text-center w-full ${
        won ? "bg-tint-win" : "bg-tint-loss"
      }`}
    >
      <BossPortrait boss={boss} size={128} idle />
      <h2 className="font-display text-xl text-gold">{heading}</h2>
      <p className="rpg-box w-full p-4 text-base leading-relaxed">{line}</p>
      <div className="rpg-box w-full grid grid-cols-3 gap-2 p-3 text-xs">
        <div>
          <p className="text-text-muted">回合</p>
          <p className="tabular text-base text-gold">{turns}</p>
        </div>
        <div>
          <p className="text-text-muted">造成傷害</p>
          <p className="tabular text-base text-gold">{Math.round(dealt)}</p>
        </div>
        <div>
          <p className="text-text-muted">最大連擊</p>
          <p className="tabular text-base text-gold">{maxCombo}</p>
        </div>
      </div>
      <PrimaryButton onClick={onContinue}>繼續</PrimaryButton>
    </div>
  );
}
