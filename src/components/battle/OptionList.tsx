import type { Option } from "@/engine/types";

interface Props {
  options: Option[];
  disabled: boolean;
  onPick: (optionId: string) => void;
}

const NUMERALS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

/** 8 full-width option buttons in shuffled order (state.optionOrder decides
 * the order the caller passes them in). Numbered, with a 120ms stagger
 * fade-in per turn (disabled under reduced-motion by the global rule). */
export function OptionList({ options, disabled, onPick }: Props) {
  return (
    <div className="flex flex-col gap-2" role="list" aria-label="選項">
      {options.map((opt, i) => (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(opt.id)}
          style={{ animationDelay: `${i * 120}ms` }}
          className="animate-stagger-in min-h-[48px] w-full rounded-btn border border-border bg-surface-2 px-4 py-3 text-left text-base leading-snug transition active:scale-[0.98] active:border-primary disabled:opacity-60 flex items-start gap-2"
        >
          <span aria-hidden className="tabular shrink-0 text-text-muted/70">
            {NUMERALS[i] ?? i + 1}
          </span>
          <span>{opt.text}</span>
        </button>
      ))}
    </div>
  );
}
