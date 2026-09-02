import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import type { Boss } from "@/engine/types";

interface Props {
  boss: Boss;
  size?: number;
  shake?: boolean;
  critFlash?: boolean;
}

export function BossPortrait({ boss, size = 112, shake = false, critFlash = false }: Props) {
  return (
    <div className="relative">
      <div className={shake ? "animate-shake" : undefined}>
        <GoldRingPortrait src={`/portraits/${boss.id}.svg`} alt={boss.name} size={size} />
      </div>
      {critFlash && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full bg-crit animate-flash"
          aria-hidden
        />
      )}
    </div>
  );
}
