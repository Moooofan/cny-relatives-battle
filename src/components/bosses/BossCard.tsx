import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import { LinkButton } from "@/components/common/LinkButton";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";
import { TIER_LABELS, describeBossModifiers, reachablePool } from "@/lib/bossDescribe";
import type { Boss, Question } from "@/engine/types";

export function BossCard({ boss, questions }: { boss: Boss; questions: Question[] }) {
  const poolSize = reachablePool(questions, boss).length;
  const modifierLines = describeBossModifiers(boss.modifiers);

  return (
    <div className="rpg-box p-4 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <GoldRingPortrait src={`/portraits/${boss.id}.svg`} alt={boss.name} size={64} />
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg text-text">{boss.name}</p>
          <p className="text-xs text-text-muted">{boss.title}</p>
          <p className="text-xs text-gold mt-0.5">{TIER_LABELS[boss.tier]}</p>
        </div>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">{boss.description}</p>

      <div className="flex flex-wrap gap-1">
        {boss.topics.map((t) => (
          <span key={t} className="rounded-full bg-surface-2 border border-border px-2 py-0.5 text-xs text-text-muted">
            {TOPIC_LABELS[t]}
          </span>
        ))}
      </div>

      {modifierLines.length > 0 && (
        <ul className="text-xs text-text-muted list-disc pl-4">
          {modifierLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}

      <p className="text-xs text-text-muted tabular">題庫可用題數：{poolSize}</p>

      <LinkButton href={`/random?boss=${boss.id}`} className="mt-1">
        挑戰
      </LinkButton>
    </div>
  );
}
