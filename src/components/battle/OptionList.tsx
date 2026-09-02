import type { Option } from "@/engine/types";

interface Props {
  options: Option[];
  disabled: boolean;
  onPick: (optionId: string) => void;
}

/** 8 full-width option buttons in shuffled order (state.optionOrder decides
 * the order the caller passes them in). */
export function OptionList({ options, disabled, onPick }: Props) {
  return (
    <div className="flex flex-col gap-2" role="list" aria-label="選項">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(opt.id)}
          className="min-h-[48px] w-full rounded-btn border border-border bg-surface-2 px-4 py-3 text-left text-base leading-snug transition active:scale-[0.98] active:border-primary disabled:opacity-60"
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}
