import type { LeaderboardRow } from "@/lib/adminSupabase";
import { CONTENT } from "@/content";

function lifeLabel(lifeCode: string): string {
  const name = CONTENT.lives.find((l) => l.code === lifeCode)?.name;
  return name ? `${lifeCode} ${name}` : lifeCode;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("zh-TW", { hour12: false });
}

/** Desktop: table. Mobile: stacked cards — an 8-column table doesn't fit
 * 375px without truncation. Split out of GlobalLeaderboardSection to keep
 * that file under the ≤150-line component budget. */
export function GlobalLeaderboardRows({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="text-xs tabular w-full border-collapse min-w-[720px]">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="font-normal py-1 pr-2">#</th>
              <th className="font-normal py-1 pr-2">人生</th>
              <th className="font-normal py-1 pr-2 text-right">分數</th>
              <th className="font-normal py-1 pr-2">稱號</th>
              <th className="font-normal py-1 pr-2">結果</th>
              <th className="font-normal py-1 pr-2 text-right">擊敗數</th>
              <th className="font-normal py-1 pr-2 text-right">回合</th>
              <th className="font-normal py-1 pr-2">時間</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.resultCode} className="border-t border-border">
                <td className="py-1 pr-2 text-text-muted">{i + 1}</td>
                <td className="py-1 pr-2 text-text-muted">{lifeLabel(r.lifeCode)}</td>
                <td className="py-1 pr-2 text-right text-gold">{r.score}</td>
                <td className="py-1 pr-2 text-text-muted">{r.rankTitle}</td>
                <td className="py-1 pr-2 text-text-muted">{r.won ? "勝" : "敗"}</td>
                <td className="py-1 pr-2 text-right text-text-muted">{r.bossesDefeated}</td>
                <td className="py-1 pr-2 text-right text-text-muted">{r.turns}</td>
                <td className="py-1 pr-2 text-text-muted">{formatDate(r.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1.5 md:hidden">
        {rows.map((r, i) => (
          <div key={r.resultCode} className="rounded-box border border-border bg-surface-2/40 p-3 text-xs">
            <div className="flex items-baseline justify-between">
              <span className="text-text-muted">
                #{i + 1} · {lifeLabel(r.lifeCode)}
              </span>
              <span className="text-gold tabular">{r.score}</span>
            </div>
            <p className="text-text-muted mt-0.5">
              {r.rankTitle} · {r.won ? "勝" : "敗"} · 擊敗 {r.bossesDefeated} · {r.turns} 回合
            </p>
            <p className="text-text-muted/80 mt-0.5">{formatDate(r.createdAt)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
