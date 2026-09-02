import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import type { Boss } from "@/engine/types";

interface Props {
  summonedBoss: Boss;
}

/** 三姑's summon gimmick: "來，我們請個人回來。" */
export function SummonNotice({ summonedBoss }: Props) {
  return (
    <div className="rpg-box flex items-center gap-3 p-3">
      <GoldRingPortrait src={`/portraits/${summonedBoss.id}.svg`} alt={summonedBoss.name} size={48} />
      <div>
        <p className="text-sm text-gold">三姑：來，我們請個人回來。</p>
        <p className="text-xs text-text-muted">{summonedBoss.name}出手了！</p>
      </div>
    </div>
  );
}
