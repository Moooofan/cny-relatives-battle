import { Dices } from "lucide-react";
import { CONTENT } from "@/content";
import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface Props {
  onPick: (bossId?: string) => void;
}

/** Boss picker for /random when no `?boss=` is given: random, or one of 8. */
export function BossPicker({ onPick }: Props) {
  return (
    <div className="flex flex-1 flex-col px-4 py-4 gap-4">
      <h1 className="font-display text-xl text-gold text-center">挑一位對手</h1>
      <PrimaryButton className="flex items-center justify-center gap-2" onClick={() => onPick(undefined)}>
        <Dices size={18} />
        隨機一位
      </PrimaryButton>
      <div className="grid grid-cols-2 gap-3 pb-4 overflow-y-auto">
        {CONTENT.bosses.map((boss) => (
          <button
            key={boss.id}
            type="button"
            onClick={() => onPick(boss.id)}
            className="rpg-box flex flex-col items-center gap-2 p-3 active:scale-[0.98] transition"
          >
            <GoldRingPortrait src={`/portraits/${boss.id}.svg`} alt={boss.name} size={72} />
            <p className="text-sm text-text">{boss.name}</p>
            <p className="text-xs text-text-muted text-center leading-snug">{boss.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
