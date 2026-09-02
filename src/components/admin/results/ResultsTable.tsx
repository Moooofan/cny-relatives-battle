import type { ResultEntry } from "@/store/resultsStore";
import { CONTENT } from "@/content";
import { resolveWon } from "@/components/admin/resultsMath";

const MODE_LABELS = { random: "隨機", daily: "每日", story: "故事", gauntlet: "闖關" } as const;

function lifeLabel(entry: ResultEntry): string {
  if (!entry.lifeCode) return "（無人生）";
  const name = CONTENT.lives.find((l) => l.code === entry.lifeCode)?.name;
  return name ? `${entry.lifeCode} ${name}` : entry.lifeCode;
}

/** Story shows its narrative ending title; every other mode shows a plain
 * win/loss verdict derived from `won` (migrated for older rows without it). */
function outcomeLabel(entry: ResultEntry): string {
  if (entry.mode === "story") {
    if (!entry.endingId) return "–";
    return CONTENT.storyEndings.find((e) => e.id === entry.endingId)?.title ?? entry.endingId;
  }
  return resolveWon(entry) ? "勝" : "敗";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("zh-TW", { hour12: false });
}

export function ResultsTable({ results }: { results: ResultEntry[] }) {
  if (results.length === 0) {
    return <p className="text-sm text-text-muted italic py-4">沒有符合條件的戰績。</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="text-xs tabular w-full border-collapse min-w-[920px]">
        <thead>
          <tr className="text-left text-text-muted">
            <th className="font-normal py-1 pr-2">結果代碼</th>
            <th className="font-normal py-1 pr-2">人生</th>
            <th className="font-normal py-1 pr-2">模式</th>
            <th className="font-normal py-1 pr-2 text-right">分數</th>
            <th className="font-normal py-1 pr-2">稱號</th>
            <th className="font-normal py-1 pr-2">結局</th>
            <th className="font-normal py-1 pr-2 text-right">擊敗數</th>
            <th className="font-normal py-1 pr-2 text-right">回合</th>
            <th className="font-normal py-1 pr-2 text-right">最大連擊</th>
            <th className="font-normal py-1 pr-2 text-right">剩餘 HP</th>
            <th className="font-normal py-1 pr-2">時間</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.resultCode} className="border-t border-border">
              <td className="py-1 pr-2 text-gold">{r.resultCode}</td>
              <td className="py-1 pr-2 text-text-muted">{lifeLabel(r)}</td>
              <td className="py-1 pr-2 text-text-muted">{MODE_LABELS[r.mode]}</td>
              <td className="py-1 pr-2 text-right text-text">{r.score}</td>
              <td className="py-1 pr-2 text-text-muted">{r.rankTitle}</td>
              <td className="py-1 pr-2 text-text-muted">{outcomeLabel(r)}</td>
              <td className="py-1 pr-2 text-right text-text-muted">{r.bossesDefeated}</td>
              <td className="py-1 pr-2 text-right text-text-muted">{r.turns}</td>
              <td className="py-1 pr-2 text-right text-text-muted">{r.maxCombo}</td>
              <td className="py-1 pr-2 text-right text-text-muted">{r.hpLeft}</td>
              <td className="py-1 pr-2 text-text-muted">{formatDate(r.at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
