import { ChevronDown, ChevronRight } from "lucide-react";
import type { Question } from "@/engine/types";
import { ArchetypeBadge } from "@/components/common/ArchetypeBadge";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";

export function QuestionRow({
  question,
  bossLabel,
  open,
  onToggle,
}: {
  question: Question;
  bossLabel: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-box border border-border bg-surface-2/40">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-2 px-3 py-2 text-left"
      >
        {open ? <ChevronDown size={14} className="mt-1 shrink-0" /> : <ChevronRight size={14} className="mt-1 shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text">{question.text}</p>
          <p className="text-xs text-text-muted mt-0.5">
            <span className="font-mono tabular">{question.id}</span> · {bossLabel} · {TOPIC_LABELS[question.topic]}
          </p>
        </div>
      </button>
      {open && (
        <ul className="flex flex-col gap-1.5 px-3 pb-3">
          {question.options.map((opt) => (
            <li key={opt.id} className="flex items-start gap-2 text-xs">
              <ArchetypeBadge archetype={opt.archetype} />
              <div className="flex-1 min-w-0 text-text-muted">
                <p className="text-text">{opt.text}</p>
                <p>→ {opt.retort}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
