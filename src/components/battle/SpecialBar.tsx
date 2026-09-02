import { SPECIALS } from "@/engine/archetypes";

interface Props {
  skip: number;
  heal: number;
  playerHp: number;
  canAct: boolean;
  onUse: (kind: "skip" | "heal") => void;
}

/** 借尿遁 (skip this question, no damage) and 發紅包轉移話題 (heal, only under
 * the HP threshold). Each usable once per run. */
export function SpecialBar({ skip, heal, playerHp, canAct, onUse }: Props) {
  const healAllowed = playerHp < SPECIALS.heal.threshold;

  return (
    <div className="flex gap-2" role="group" aria-label="特殊技">
      <button
        type="button"
        disabled={!canAct || skip <= 0}
        onClick={() => onUse("skip")}
        className="flex-1 rounded-btn border border-border bg-surface px-2 py-2 text-xs text-text-muted disabled:opacity-40"
      >
        {SPECIALS.skip.label}
        <span className="tabular ml-1">×{skip}</span>
      </button>
      <button
        type="button"
        disabled={!canAct || heal <= 0 || !healAllowed}
        onClick={() => onUse("heal")}
        className="flex-1 rounded-btn border border-border bg-surface px-2 py-2 text-xs text-text-muted disabled:opacity-40"
      >
        {SPECIALS.heal.label}
        <span className="tabular ml-1">×{heal}</span>
      </button>
    </div>
  );
}
