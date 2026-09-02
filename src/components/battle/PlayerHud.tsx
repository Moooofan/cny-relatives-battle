import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import { HpBar } from "@/components/battle/HpBar";

interface Props {
  hp: number;
  maxHp: number;
  combo: number;
  hurt?: boolean;
}

export function PlayerHud({ hp, maxHp, combo, hurt = false }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className={hurt ? "animate-shake" : undefined}>
        <GoldRingPortrait src="/portraits/player.svg" alt="你" size={56} />
      </div>
      <div className="flex-1">
        <HpBar label="你" hp={hp} maxHp={maxHp} variant="player" />
      </div>
      {combo > 0 && (
        <span className="tabular shrink-0 rounded-full bg-surface-2 border border-gold/50 px-2 py-1 text-xs text-gold">
          連擊 ×{combo}
        </span>
      )}
    </div>
  );
}
