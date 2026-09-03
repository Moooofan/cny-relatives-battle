export function ResultStat({
  label,
  value,
  caption,
}: {
  label: string;
  value: string | number;
  /** Small muted note under the value, e.g. when the raw score was clamped for display. */
  caption?: string;
}) {
  return (
    <div>
      <p className="text-text-muted text-xs">{label}</p>
      <p className="text-text text-base tabular">{value}</p>
      {caption && <p className="text-text-muted text-[10px]">{caption}</p>}
    </div>
  );
}
