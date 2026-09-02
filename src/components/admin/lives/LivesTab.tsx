import { CONTENT } from "@/content";
import { useResultsStore } from "@/store/resultsStore";
import { Card, SectionTitle } from "@/components/admin/Section";
import { LifeRow } from "@/components/admin/lives/LifeRow";
import { groupResultsByLife } from "@/components/admin/resultsMath";

export function LivesTab() {
  const results = useResultsStore((s) => s.results);
  const statsByLife = new Map(groupResultsByLife(results).map((s) => [s.lifeCode, s]));

  return (
    <Card>
      <SectionTitle>30 種人生（{CONTENT.lives.length}）</SectionTitle>
      <div className="overflow-x-auto">
        <table className="text-sm w-full border-collapse min-w-[860px]">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="font-normal py-1 pr-2">代碼</th>
              <th className="font-normal py-1 pr-2">圖示</th>
              <th className="font-normal py-1 pr-2">名稱</th>
              <th className="font-normal py-1 pr-2">Tagline</th>
              <th className="font-normal py-1 pr-2">起始 HP</th>
              <th className="font-normal py-1 pr-2">修正摘要</th>
              <th className="font-normal py-1 pr-2">本機戰績</th>
            </tr>
          </thead>
          <tbody>
            {CONTENT.lives.map((life) => (
              <LifeRow key={life.id} life={life} bosses={CONTENT.bosses} stat={statsByLife.get(life.code)} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
