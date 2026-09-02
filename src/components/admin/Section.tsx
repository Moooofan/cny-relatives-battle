export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rpg-box p-4 flex flex-col gap-2 ${className}`}>{children}</div>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-lg text-gold">{children}</h2>;
}

export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-box bg-surface-2 border border-border px-3 py-2 flex flex-col gap-0.5 min-w-[112px]">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="font-display text-xl text-text tabular">{value}</p>
    </div>
  );
}

export function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-text-muted italic">{children}</p>;
}
