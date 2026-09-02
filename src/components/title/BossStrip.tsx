import type { Boss } from "@/engine/types";
import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";

interface Props {
  bosses: Boss[];
}

/** Overlapping 40px portrait strip of every relative, under the tagline. */
export function BossStrip({ bosses }: Props) {
  return (
    <div className="flex flex-col items-center gap-1.5 pt-1">
      <div className="flex items-center">
        {bosses.map((boss, i) => (
          <div key={boss.id} className={i === 0 ? "relative" : "relative -ml-3"} style={{ zIndex: i }}>
            <GoldRingPortrait src={`/portraits/${boss.id}.svg`} alt={boss.name} size={40} />
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted">8 位親戚等你</p>
    </div>
  );
}
