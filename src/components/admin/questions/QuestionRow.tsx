import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { ArchetypeBadge } from "@/components/common/ArchetypeBadge";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";
import type { AdminQuestionEntry } from "@/lib/contentOverrides";

function StatusBadge({ entry }: { entry: AdminQuestionEntry }) {
  if (entry.isHidden) {
    return (
      <span className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 text-primary px-2 py-0.5 text-[11px] shrink-0">
        已隱藏
      </span>
    );
  }
  if (entry.isCustom) {
    return (
      <span className="inline-flex items-center rounded-full border border-gold/50 bg-gold/10 text-gold px-2 py-0.5 text-[11px] shrink-0">
        自訂
      </span>
    );
  }
  if (entry.isEdited) {
    return (
      <span className="inline-flex items-center rounded-full border border-heal/50 bg-heal/10 text-heal px-2 py-0.5 text-[11px] shrink-0">
        已修改
      </span>
    );
  }
  return null;
}

export function QuestionRow({
  entry,
  bossLabel,
  open,
  onToggle,
  onEdit,
  editDisabled,
}: {
  entry: AdminQuestionEntry;
  bossLabel: string;
  open: boolean;
  onToggle: () => void;
  onEdit: () => void;
  editDisabled: boolean;
}) {
  const question = entry.question;
  return (
    <div className="rounded-box border border-border bg-surface-2/40">
      <div className="w-full flex items-start gap-2 px-3 py-2">
        <button type="button" onClick={onToggle} className="flex items-start gap-2 text-left flex-1 min-w-0">
          {open ? <ChevronDown size={14} className="mt-1 shrink-0" /> : <ChevronRight size={14} className="mt-1 shrink-0" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-sm text-text">{question.text}</p>
              <StatusBadge entry={entry} />
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              <span className="font-mono tabular">{question.id}</span> · {bossLabel} · {TOPIC_LABELS[question.topic]}
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={onEdit}
          disabled={editDisabled}
          aria-label="編輯"
          className="flex items-center gap-1 rounded-btn border border-border bg-surface-2 px-2 py-1 text-xs text-text shrink-0 disabled:opacity-40"
        >
          <Pencil size={12} /> 編輯
        </button>
      </div>
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
