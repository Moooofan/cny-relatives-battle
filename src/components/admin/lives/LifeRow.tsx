import { ChevronDown, ChevronRight } from "lucide-react";
import type { Boss, Life } from "@/engine/types";
import { LifeIcon } from "@/components/common/LifeIcon";
import { PLAYER_MAX_HP } from "@/engine/archetypes";
import { describeLifeModifiers } from "@/lib/lifeDescribe";
import type { LifeResultStat } from "@/components/admin/resultsMath";

export function LifeRow({
  life,
  bosses,
  stat,
  open,
  onToggle,
}: {
  life: Life;
  bosses: Boss[];
  stat: LifeResultStat | undefined;
  open: boolean;
  onToggle: () => void;
}) {
  const modifierLines = describeLifeModifiers(life, bosses);
  const startHp = life.modifiers.startHp ?? PLAYER_MAX_HP;

  return (
    <div className="rounded-box border border-border bg-surface-2/40">
      <button type="button" onClick={onToggle} className="w-full flex items-start gap-3 px-3 py-2.5 text-left">
        {open ? (
          <ChevronDown size={14} className="mt-1.5 shrink-0 text-text-muted" />
        ) : (
          <ChevronRight size={14} className="mt-1.5 shrink-0 text-text-muted" />
        )}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 border border-border shrink-0">
          <LifeIcon name={life.icon} size={15} className="text-text-muted" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono tabular text-xs text-gold">{life.code}</span>
            <span className="text-sm text-text font-medium">{life.name}</span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">{life.tagline}</p>
          {modifierLines.length > 0 && (
            <p className="text-xs text-text-muted/80 mt-0.5 hidden sm:block truncate">
              {modifierLines[0]}
              {modifierLines.length > 1 ? ` 等 ${modifierLines.length} 項修正` : ""}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 text-right pl-2">
          {startHp !== PLAYER_MAX_HP && (
            <span className="rounded-full bg-gold/20 border border-gold/50 text-gold px-2 py-0.5 text-[11px] tabular">
              起始 HP {startHp}
            </span>
          )}
          <span className="text-xs text-text-muted tabular whitespace-nowrap">
            {stat ? `${stat.runs} 場 · 均 ${stat.avgScore} 分` : <span className="italic">尚無戰績</span>}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-border bg-surface-2/30 p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-muted">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-text font-medium mb-1">家庭背景</p>
                {life.background.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div>
                <p className="text-text font-medium mb-1">與關主的關係</p>
                <ul className="list-disc pl-4">
                  {Object.entries(life.relations).map(([bossId, line]) => {
                    const bossName = bosses.find((b) => b.id === bossId)?.name ?? bossId;
                    return (
                      <li key={bossId}>
                        <span className="text-gold">{bossName}</span>：{line}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <p className="text-text font-medium mb-1">強項</p>
                <ul className="list-disc pl-4">
                  {life.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-text font-medium mb-1">弱點</p>
                <ul className="list-disc pl-4">
                  {life.weaknesses.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-text font-medium mb-1">修正摘要</p>
                {modifierLines.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {modifierLines.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>無特殊修正</p>
                )}
              </div>
            </div>
          </div>

          <details className="mt-3 group">
            <summary className="cursor-pointer text-xs text-text-muted select-none">
              原始 modifiers JSON
            </summary>
            <pre className="mt-2 bg-surface rounded-box border border-border p-2 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] text-text-muted">
              {JSON.stringify(life.modifiers, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
