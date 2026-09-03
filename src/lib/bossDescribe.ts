import { ARCHETYPE_TABLE, DEFAULT_LANDMINE_HEAL } from "@/engine/archetypes";
import type { Boss, BossModifiers, Question, Tier } from "@/engine/types";

export const TIER_LABELS: Record<Tier, string> = {
  easy: "簡單",
  normal: "普通",
  hard: "困難",
  final: "最終魔王",
};

/** Same reachability rule the engine uses to build a boss's question pool:
 * its own questions, plus generic questions whose topic it covers. */
export function reachablePool(questions: Question[], boss: Boss): Question[] {
  return questions.filter((q) => q.bossId === boss.id || (q.bossId === undefined && boss.topics.includes(q.topic)));
}

function pct(mult: number): string {
  const sign = mult >= 1 ? "+" : "";
  return `${sign}${Math.round((mult - 1) * 100)}%`;
}

/** Human-readable Traditional-Chinese lines for a boss's `modifiers`, for the
 * 圖鑑 (bestiary) page. Empty array when the boss has no special gimmick yet. */
export function describeBossModifiers(modifiers: BossModifiers | undefined): string[] {
  if (!modifiers) return [];
  const lines: string[] = [];

  for (const [archetype, mult] of Object.entries(modifiers.dealtMultiplier ?? {})) {
    const label = ARCHETYPE_TABLE[archetype as keyof typeof ARCHETYPE_TABLE].label;
    lines.push(`你的「${label}」對它傷害 ${pct(mult)}`);
  }
  for (const [archetype, mult] of Object.entries(modifiers.takenMultiplier ?? {})) {
    const label = ARCHETYPE_TABLE[archetype as keyof typeof ARCHETYPE_TABLE].label;
    // landmine's "taken" is recoil from your own counterattack, not the
    // boss hitting harder — call it out as 反傷 to avoid confusion.
    const verb = archetype === "landmine" ? "反傷" : "受到的傷害";
    lines.push(`你「${label}」時${verb} ${pct(mult)}`);
  }
  if (modifiers.healOnLandmine !== undefined && modifiers.healOnLandmine !== DEFAULT_LANDMINE_HEAL) {
    lines.push(`你踩雷時它意外回復 ${modifiers.healOnLandmine} HP（多數關主踩雷不會回血）`);
  }
  if (modifiers.followUpOnMeek) lines.push("你乖乖回答時，它會立刻追問一題");
  if (modifiers.summonAtHalf) lines.push("HP 低於一半時，會召喚一位你打過的親戚支援");
  if (modifiers.reuseMeekQuestions) lines.push("會優先重用你曾經乖乖回答過的題目");

  return lines;
}
