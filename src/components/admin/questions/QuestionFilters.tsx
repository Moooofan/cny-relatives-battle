import type { Archetype, Boss, Topic } from "@/engine/types";
import { ARCHETYPES, TOPICS } from "@/engine/types";
import { ARCHETYPE_TABLE } from "@/engine/archetypes";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";

export interface QuestionFilterState {
  boss: string; // "all" | "generic" | BossId
  topic: string; // "all" | Topic
  archetype: string; // "all" | Archetype
  search: string;
}

const selectClass = "h-9 rounded-btn bg-surface-2 border border-border px-2 text-sm text-text";

export function QuestionFilters({
  bosses,
  value,
  onChange,
}: {
  bosses: Boss[];
  value: QuestionFilterState;
  onChange: (next: QuestionFilterState) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        className={selectClass}
        value={value.boss}
        onChange={(e) => onChange({ ...value, boss: e.target.value })}
      >
        <option value="all">全部關主</option>
        <option value="generic">generic（共用）</option>
        {bosses.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={value.topic}
        onChange={(e) => onChange({ ...value, topic: e.target.value })}
      >
        <option value="all">全部主題</option>
        {TOPICS.map((t: Topic) => (
          <option key={t} value={t}>
            {TOPIC_LABELS[t]}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={value.archetype}
        onChange={(e) => onChange({ ...value, archetype: e.target.value })}
      >
        <option value="all">全部 archetype</option>
        {ARCHETYPES.map((a: Archetype) => (
          <option key={a} value={a}>
            {ARCHETYPE_TABLE[a].label}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="搜尋攻擊句／選項／回嗆…"
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
        className="h-9 flex-1 min-w-[160px] rounded-btn bg-surface-2 border border-border px-3 text-sm text-text placeholder:text-text-muted"
      />
    </div>
  );
}
