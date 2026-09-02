import { LifeIcon } from "@/components/common/LifeIcon";
import type { Life } from "@/engine/types";

interface Props {
  life: Life;
  onSelect: () => void;
}

export function LifeCard({ life, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rpg-box flex flex-col gap-2 p-3 text-left transition active:scale-[0.98]"
    >
      <div className="flex items-center gap-2">
        <LifeIcon name={life.icon} size={22} className="text-gold shrink-0" />
        <span className="tabular text-xs text-text-muted">{life.code}</span>
      </div>
      <p className="font-display text-base text-text">{life.name}</p>
      <p className="text-xs text-text-muted leading-snug">{life.tagline}</p>
    </button>
  );
}
