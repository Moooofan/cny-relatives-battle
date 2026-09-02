import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import { HpBar } from "@/components/battle/HpBar";
import type { Life } from "@/engine/types";

interface Props {
  hp: number;
  maxHp: number;
  combo: number;
  hurt?: boolean;
  life?: Life;
  /** True the turn a crit just landed — floats a gold "暴擊！" near the combo badge. */
  crit?: boolean;
  /** Remount key so the crit float replays each time (mirrors DamageFloat's animKey). */
  critKey?: string | number;
}

export function PlayerHud({ hp, maxHp, combo, hurt = false, life, crit = false, critKey }: Props) {
  const sublabel = life ? `${life.name} · ${life.code}` : undefined;

  return (
    <div className="flex items-center gap-3">
      <div className={hurt ? "animate-shake" : undefined}>
        <GoldRingPortrait src="/portraits/player.svg" alt="你" size={56} />
      </div>
      <div className="flex-1 min-w-0">
        <HpBar label="你" sublabel={sublabel} hp={hp} maxHp={maxHp} variant="player" />
      </div>
      {combo > 0 && (
        <div className="relative shrink-0">
          <span
            key={combo}
            className="tabular animate-pop inline-flex rounded-full bg-surface-2 border border-gold/50 px-2 py-1 text-xs text-gold"
          >
            連擊 ×{combo}
          </span>
          {crit && (
            <span
              key={`crit-${critKey}`}
              aria-hidden
              className="animate-crit-float pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-crit"
            >
              暴擊！
            </span>
          )}
        </div>
      )}
    </div>
  );
}
