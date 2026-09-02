export function ResultStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-text-muted text-xs">{label}</p>
      <p className="text-text text-base tabular">{value}</p>
    </div>
  );
}
