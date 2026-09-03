import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";
import { TIER_LABELS, describeBossModifiers } from "@/lib/bossDescribe";
import { TIER_HP, TIER_POWER } from "@/engine/archetypes";
import type { Boss, Question } from "@/engine/types";
import { Card } from "@/components/admin/Section";

function topicCount(questions: Question[], boss: Boss, topic: string): number {
  return questions.filter((q) => (q.bossId === boss.id || q.bossId === undefined) && q.topic === topic).length;
}

export function BossAdminCard({
  boss,
  questions,
  defeatedCount,
}: {
  boss: Boss;
  questions: Question[];
  defeatedCount: number;
}) {
  const modifierLines = describeBossModifiers(boss.modifiers);

  return (
    <Card>
      <div className="flex items-center gap-3">
        <GoldRingPortrait src={`/portraits/${boss.id}.svg`} alt={boss.name} size={72} />
        <div className="flex-1 min-w-0">
          <p className="font-display text-lg text-text">{boss.name}</p>
          <p className="text-xs text-text-muted">{boss.title}</p>
          <p className="text-xs text-gold mt-0.5">
            {TIER_LABELS[boss.tier]} · HP {TIER_HP[boss.tier]} · 倍率 ×{TIER_POWER[boss.tier]}
          </p>
        </div>
        <p className="text-xs text-text-muted tabular text-right shrink-0">
          本機擊敗
          <br />
          <span className="text-text text-base">{defeatedCount}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-1">
        {boss.topics.map((topic) => (
          <span key={topic} className="rounded-full bg-surface-2 border border-border px-2 py-0.5 text-xs text-text-muted">
            {TOPIC_LABELS[topic]}：{topicCount(questions, boss, topic)} 題
          </span>
        ))}
      </div>

      {modifierLines.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {modifierLines.map((line, i) => (
            <span
              key={i}
              className="rounded-full bg-gold/20 border border-gold/50 text-gold px-2 py-0.5 text-xs"
            >
              {line}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-text-muted flex flex-col gap-0.5">
        <p>登場：{boss.lines.intro}</p>
        <p>被擊敗：{boss.lines.defeated}</p>
        <p>擊敗玩家：{boss.lines.victory}</p>
      </div>
    </Card>
  );
}
