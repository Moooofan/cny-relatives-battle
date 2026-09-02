import { BossPortrait } from "@/components/battle/BossPortrait";
import { DamageFloat } from "@/components/battle/DamageFloat";
import { DialogueBox } from "@/components/battle/DialogueBox";
import { HpBar } from "@/components/battle/HpBar";
import { PlayerHud } from "@/components/battle/PlayerHud";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { Boss, LastResolve, Life } from "@/engine/types";

interface Props {
  boss: Boss;
  life?: Life;
  retortText: string;
  resolve: LastResolve;
  animKey: number;
  bossHp: number;
  bossMaxHp: number;
  playerHp: number;
  playerMaxHp: number;
  combo: number;
  onNext: () => void;
}

export function RetortView({
  boss,
  life,
  retortText,
  resolve,
  animKey,
  bossHp,
  bossMaxHp,
  playerHp,
  playerMaxHp,
  combo,
  onNext,
}: Props) {
  const heavyHit = resolve.taken >= 20;

  return (
    <div className="relative flex flex-1 flex-col gap-4 px-4 py-3">
      {heavyHit && (
        <div
          key={`vignette-${animKey}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 animate-flash"
          style={{ background: "radial-gradient(circle, transparent 45%, rgba(230,57,70,0.5) 100%)" }}
        />
      )}
      {resolve.healed > 0 && (
        <div
          key={`heal-flash-${animKey}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 animate-flash bg-heal/20"
        />
      )}
      <HpBar label={boss.name} hp={bossHp} maxHp={bossMaxHp} variant="boss" />
      <div className="relative flex flex-1 flex-col items-center justify-center gap-3">
        <BossPortrait boss={boss} size={96} shake={resolve.dealt > 0} shakeKey={animKey} critFlash={resolve.crit} />
        <div className="relative flex gap-6">
          <DamageFloat value={resolve.dealt} kind={resolve.crit ? "crit" : "damage"} animKey={`d-${animKey}`} />
          {resolve.healed > 0 && (
            <DamageFloat value={resolve.healed} kind="heal" animKey={`h-${animKey}`} />
          )}
          {resolve.taken > 0 && (
            <DamageFloat value={resolve.taken} kind="damage" animKey={`t-${animKey}`} className="text-lg" />
          )}
        </div>
        <div aria-live="polite" className="sr-only">
          {boss.name}受到{resolve.dealt}點傷害{resolve.crit ? "，暴擊！" : ""}
          {resolve.taken > 0 ? `，你受到${resolve.taken}點傷害` : ""}
          {resolve.healed > 0 ? `，${boss.name}回復${resolve.healed}點` : ""}
        </div>
      </div>
      <DialogueBox text={retortText} speaker={boss.name} />
      <PlayerHud
        hp={playerHp}
        maxHp={playerMaxHp}
        combo={combo}
        hurt={resolve.taken > 0}
        life={life}
        crit={resolve.crit}
        critKey={animKey}
      />
      <PrimaryButton onClick={onNext}>下一題</PrimaryButton>
    </div>
  );
}
