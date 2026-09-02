/**
 * Pure aggregation helpers shared by the 人生 and 結果 admin tabs. Reads
 * ResultEntry[] from resultsStore / bossesDefeated from statsStore — never
 * mutates either store's shape.
 */
import { CONTENT } from "@/content";
import type { ResultEntry } from "@/store/resultsStore";
import type { BossId, Mode } from "@/engine/types";

const RANK_BY_TITLE = new Map(CONTENT.rankTiers.map((t) => [t.title, t.rank]));

/** Higher is better (rank 7 = 三姑六婆終結者). 0 for an unrecognized title. */
export function rankNumberFromTitle(title: string): number {
  return RANK_BY_TITLE.get(title) ?? 0;
}

export interface LifeResultStat {
  lifeCode: string;
  runs: number;
  avgScore: number;
  bestRank: number;
  bestRankTitle: string;
}

export function groupResultsByLife(results: ResultEntry[]): LifeResultStat[] {
  const byLife = new Map<string, ResultEntry[]>();
  for (const r of results) {
    if (!r.lifeCode) continue;
    const list = byLife.get(r.lifeCode) ?? [];
    list.push(r);
    byLife.set(r.lifeCode, list);
  }
  return [...byLife.entries()].map(([lifeCode, list]) => {
    const avgScore = Math.round(list.reduce((sum, r) => sum + r.score, 0) / list.length);
    const best = list.reduce((a, b) => (rankNumberFromTitle(b.rankTitle) > rankNumberFromTitle(a.rankTitle) ? b : a));
    return {
      lifeCode,
      runs: list.length,
      avgScore,
      bestRank: rankNumberFromTitle(best.rankTitle),
      bestRankTitle: best.rankTitle,
    };
  });
}

export function topLifeAverages(results: ResultEntry[], take = 10): LifeResultStat[] {
  return groupResultsByLife(results)
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, take);
}

export interface ModeStat {
  mode: Mode;
  runs: number;
  winRate: number;
}

const MODES: Mode[] = ["random", "daily", "story", "gauntlet"];

/** "Win" = reached rank >= 2 (anything above the bottom tier). */
export function computeModeStats(results: ResultEntry[]): ModeStat[] {
  return MODES.map((mode) => {
    const list = results.filter((r) => r.mode === mode);
    const wins = list.filter((r) => rankNumberFromTitle(r.rankTitle) >= 2).length;
    return { mode, runs: list.length, winRate: list.length ? wins / list.length : 0 };
  });
}

export function mostDefeatedBoss(
  bossesDefeated: Partial<Record<BossId, number>>
): { bossId: BossId; count: number } | undefined {
  let best: { bossId: BossId; count: number } | undefined;
  for (const [bossId, count] of Object.entries(bossesDefeated)) {
    if (count === undefined) continue;
    if (!best || count > best.count) best = { bossId, count };
  }
  return best;
}
