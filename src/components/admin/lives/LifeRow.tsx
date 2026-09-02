"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Boss, Life } from "@/engine/types";
import { LifeIcon } from "@/components/common/LifeIcon";
import { PLAYER_MAX_HP } from "@/engine/archetypes";
import { describeLifeModifiers } from "@/lib/lifeDescribe";
import type { LifeResultStat } from "@/components/admin/resultsMath";

export function LifeRow({ life, bosses, stat }: { life: Life; bosses: Boss[]; stat: LifeResultStat | undefined }) {
  const [open, setOpen] = useState(false);
  const modifierLines = describeLifeModifiers(life, bosses);
  const startHp = life.modifiers.startHp ?? PLAYER_MAX_HP;

  return (
    <>
      <tr className="border-t border-border align-top">
        <td className="py-2 pr-2">
          <button type="button" onClick={() => setOpen((v) => !v)} className="flex items-center gap-1 text-text">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span className="tabular text-gold">{life.code}</span>
          </button>
        </td>
        <td className="py-2 pr-2">
          <LifeIcon name={life.icon} size={18} className="text-text-muted" />
        </td>
        <td className="py-2 pr-2 text-text">{life.name}</td>
        <td className="py-2 pr-2 text-text-muted">{life.tagline}</td>
        <td className="py-2 pr-2 tabular text-text-muted">{startHp}</td>
        <td className="py-2 pr-2 text-text-muted max-w-[260px]">
          {modifierLines.length > 0 ? modifierLines.slice(0, 2).join("；") : "無"}
          {modifierLines.length > 2 ? "…" : ""}
        </td>
        <td className="py-2 pr-2 tabular text-text-muted">
          {stat ? `${stat.runs} 場 / 均 ${stat.avgScore} 分 / 最佳 ${stat.bestRankTitle}` : "尚無戰績"}
        </td>
      </tr>
      {open && (
        <tr className="border-t border-border bg-surface-2/40">
          <td colSpan={7} className="p-3">
            <div className="flex flex-col gap-2 text-xs text-text-muted">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              </div>
              <div>
                <p className="text-text font-medium mb-1">原始 modifiers JSON</p>
                <pre className="bg-surface rounded-box border border-border p-2 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(life.modifiers, null, 2)}
                </pre>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
