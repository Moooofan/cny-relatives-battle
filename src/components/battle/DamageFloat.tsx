interface Props {
  value: number;
  kind: "damage" | "heal" | "crit";
  animKey: string | number;
  className?: string;
}

/** Floating number: red for damage, gold+larger for crit, mint for heal.
 * Remount (via `animKey`) to replay the float-up/fade animation. */
export function DamageFloat({ value, kind, animKey, className = "" }: Props) {
  if (value === 0) return null;
  const colorClass = kind === "heal" ? "text-heal" : kind === "crit" ? "text-crit" : "text-damage";
  const sizeClass = kind === "crit" ? "text-3xl" : "text-xl";

  return (
    <span
      key={animKey}
      aria-hidden
      className={`absolute font-bold tabular animate-float-up pointer-events-none ${colorClass} ${sizeClass} ${className}`}
    >
      {kind === "heal" ? "+" : "-"}
      {Math.abs(Math.round(value))}
    </span>
  );
}
