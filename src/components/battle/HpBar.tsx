interface Props {
  label: string;
  /** Optional chip appended after the label, e.g. a life name+code. */
  sublabel?: string;
  hp: number;
  maxHp: number;
  variant: "player" | "boss";
}

/** 12px track, segmented ticks every 10%, tabular `名字 · hp/max` label. */
export function HpBar({ label, sublabel, hp, maxHp, variant }: Props) {
  const pct = maxHp > 0 ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
  const fillColor = variant === "player" ? "bg-hp-player" : "bg-hp-boss";

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between text-xs text-text-muted mb-1">
        <span className="truncate">
          {label}
          {sublabel && <span className="text-gold/80"> · {sublabel}</span>}
        </span>
        <span className="tabular shrink-0">
          {Math.max(0, Math.round(hp))}/{maxHp}
        </span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-surface-2 overflow-hidden">
        <div
          className={`h-full ${fillColor} transition-transform duration-300 ease-out origin-left`}
          style={{ transform: `scaleX(${pct / 100})`, width: "100%" }}
        />
        <div className="absolute inset-0 flex">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="flex-1 border-r border-bg/40 last:border-r-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
