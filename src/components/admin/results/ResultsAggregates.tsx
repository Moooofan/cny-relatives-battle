import { CONTENT } from "@/content";
import type { ResultEntry } from "@/store/resultsStore";
import type { BossId } from "@/engine/types";
import { Card, SectionTitle, StatTile } from "@/components/admin/Section";
import { computeModeStats, mostDefeatedBoss, topLifeAverages } from "@/components/admin/resultsMath";

const MODE_LABELS = { random: "隨機", daily: "每日", story: "故事", gauntlet: "闖關" } as const;

function lifeName(lifeCode: string): string {
  return CONTENT.lives.find((l) => l.code === lifeCode)?.name ?? lifeCode;
}

function bossName(bossId: BossId): string {
  return CONTENT.bosses.find((b) => b.id === bossId)?.name ?? bossId;
}

export function ResultsAggregates({
  results,
  bossesDefeated,
}: {
  results: ResultEntry[];
  bossesDefeated: Partial<Record<BossId, number>>;
}) {
  const modeStats = computeModeStats(results);
  const topLives = topLifeAverages(results, 10);
  const topBoss = mostDefeatedBoss(bossesDefeated);

  return (
    <Card>
      <SectionTitle>統計</SectionTitle>

      <div className="flex flex-wrap gap-2">
        {modeStats.map((s) => (
          <StatTile
            key={s.mode}
            label={`${MODE_LABELS[s.mode]} · 場次/勝率`}
            value={`${s.runs} / ${Math.round(s.winRate * 100)}%`}
          />
        ))}
        <StatTile
          label="最常被擊敗的關主"
          value={topBoss ? `${bossName(topBoss.bossId)} ×${topBoss.count}` : "尚無資料"}
        />
      </div>

      <div>
        <p className="text-sm text-text-muted mb-1">人生平均分數 Top 10</p>
        {topLives.length === 0 ? (
          <p className="text-sm text-text-muted italic">尚無戰績</p>
        ) : (
          <ol className="text-xs text-text-muted list-decimal pl-5 flex flex-col gap-0.5">
            {topLives.map((l) => (
              <li key={l.lifeCode} className="tabular">
                {lifeName(l.lifeCode)}（{l.lifeCode}）— 均 {l.avgScore} 分，{l.runs} 場，最佳「{l.bestRankTitle}」
              </li>
            ))}
          </ol>
        )}
      </div>
    </Card>
  );
}
