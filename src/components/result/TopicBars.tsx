import { TOPIC_LABELS } from "@/lib/lifeDescribe";
import type { TurnLog } from "@/engine/types";

interface Props {
  log: TurnLog[];
}

/** Perfect-rate per topic, derived from this run's turn log. */
export function TopicBars({ log }: Props) {
  const byTopic = new Map<string, { perfect: number; total: number }>();
  for (const entry of log) {
    const cur = byTopic.get(entry.topic) ?? { perfect: 0, total: 0 };
    cur.total += 1;
    if (entry.archetype === "perfect") cur.perfect += 1;
    byTopic.set(entry.topic, cur);
  }
  const rows = [...byTopic.entries()].sort((a, b) => b[1].total - a[1].total);

  if (rows.length === 0) return null;

  return (
    <section className="rpg-box p-4">
      <h2 className="text-xs text-gold mb-3">主題神回覆率</h2>
      <div className="flex flex-col gap-2">
        {rows.map(([topic, { perfect, total }]) => {
          const pct = total > 0 ? Math.round((perfect / total) * 100) : 0;
          return (
            <div key={topic}>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>{TOPIC_LABELS[topic as keyof typeof TOPIC_LABELS] ?? topic}</span>
                <span className="tabular">
                  {perfect}/{total}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-arch-perfect" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
