import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import type { Boss } from "@/engine/types";

interface Props {
  boss: Boss;
  size?: number;
  shake?: boolean;
  /** Remount key so `shake` replays each time a new hit lands (same pattern
   * as DamageFloat's `animKey`). */
  shakeKey?: string | number;
  critFlash?: boolean;
  /** Subtle transform-only idle bob when nothing else is animating —
   * disabled automatically under reduced-motion (global rule). */
  idle?: boolean;
}

export function BossPortrait({ boss, size = 112, shake = false, shakeKey, critFlash = false, idle = false }: Props) {
  const motionClass = shake ? "animate-shake" : idle ? "animate-bob" : undefined;

  return (
    <div className="relative">
      <div
        key={shake ? shakeKey : undefined}
        className={`${motionClass ?? ""} ${critFlash ? "drop-shadow-[0_0_16px_rgba(245,197,66,0.85)]" : ""}`}
      >
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
