import { ARCHETYPE_TABLE, PLAYER_MAX_HP } from "@/engine/archetypes";
import type { Boss, Life, Topic } from "@/engine/types";

export const TOPIC_LABELS: Record<Topic, string> = {
  marriage: "結婚/交往",
  kids: "生小孩",
  salary_job: "薪水/工作",
  housing: "買房",
  comparison: "比較",
  appearance: "外表/體重",
  education: "學歷",
  politics: "政治/時事",
  elder_health: "長輩圖/健康偏方",
  food_push: "催吃/催喝",
  red_envelope: "紅包",
  religion: "宗教/拜拜",
};

function pct(mult: number): string {
  const sign = mult >= 1 ? "+" : "";
  return `${sign}${Math.round((mult - 1) * 100)}%`;
}

/** Human-readable Traditional-Chinese lines explaining every modifier on a
 * Life, for the life detail panel. */
export function describeLifeModifiers(life: Life, bosses: Boss[]): string[] {
  const lines: string[] = [];
  const m = life.modifiers;

  for (const [topic, scale] of Object.entries(m.topic ?? {})) {
    for (const [archetype, v] of Object.entries(scale ?? {})) {
      const label = ARCHETYPE_TABLE[archetype as keyof typeof ARCHETYPE_TABLE].label;
      const topicLabel = TOPIC_LABELS[topic as Topic];
      if (v?.dealt !== undefined) lines.push(`「${topicLabel}」題目：${label} 傷害 ${pct(v.dealt)}`);
      if (v?.taken !== undefined) lines.push(`「${topicLabel}」題目：${label} 受傷 ${pct(v.taken)}`);
    }
  }

  for (const [bossId, scale] of Object.entries(m.boss ?? {})) {
    const bossName = bosses.find((b) => b.id === bossId)?.name ?? bossId;
    for (const [archetype, v] of Object.entries(scale ?? {})) {
      const label = ARCHETYPE_TABLE[archetype as keyof typeof ARCHETYPE_TABLE].label;
      if (v?.dealt !== undefined) lines.push(`對「${bossName}」：${label} 傷害 ${pct(v.dealt)}`);
      if (v?.taken !== undefined) lines.push(`對「${bossName}」：${label} 受傷 ${pct(v.taken)}`);
    }
  }

  if (m.startHp !== undefined && m.startHp !== PLAYER_MAX_HP) {
    lines.push(`起始 HP：${m.startHp}（一般為 ${PLAYER_MAX_HP}）`);
  }
  if (m.extraSpecials?.skip) lines.push(`額外「借尿遁」次數 +${m.extraSpecials.skip}`);
  if (m.extraSpecials?.heal) lines.push(`額外「發紅包轉移話題」次數 +${m.extraSpecials.heal}`);

  return lines;
}
