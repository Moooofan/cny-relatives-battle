"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CONTENT } from "@/content";
import { ArchetypeBadge } from "@/components/common/ArchetypeBadge";
import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import type { TurnLog } from "@/engine/types";

const TIMEOUT_RETORT = "（你猶豫太久，只好乾笑帶過……）";

export function ReviewTurnRow({ entry, index }: { entry: TurnLog; index: number }) {
  const [open, setOpen] = useState(false);
  const boss = CONTENT.bosses.find((b) => b.id === entry.bossId);
  const question = CONTENT.questions.find((q) => q.id === entry.questionId);
  if (!boss || !question) return null;

  const pickedOption = question.options.find((o) => o.id === entry.optionId);
  const isSkip = entry.optionId === "skip";
  const isTimeout = entry.optionId === "timeout";
  const pickedText = isSkip ? "使用了「借尿遁」跳過此題" : isTimeout ? "（時間到，乾笑帶過）" : pickedOption?.text ?? "";
  const retort = pickedOption?.retort ?? (isTimeout ? TIMEOUT_RETORT : "");
  const lifeDealtMult = entry.lifeDealtMult ?? 1;
  const lifeTakenMult = entry.lifeTakenMult ?? 1;
  const otherOptions = question.options.filter((o) => o.id !== entry.optionId);

  return (
    <div className="rpg-box p-3">
      <div className="flex items-center gap-2 mb-2">
        <GoldRingPortrait src={`/portraits/${boss.id}.svg`} alt={boss.name} size={32} />
        <span className="text-xs text-text-muted">
          第 {index + 1} 回合 · {boss.name}
          {entry.summonedBossId && "（召喚）"}
        </span>
      </div>

      <p className="text-sm mb-2 leading-relaxed">{question.text}</p>

      <div className="flex items-center gap-2 mb-1 flex-wrap">
        {!isSkip && <ArchetypeBadge archetype={entry.archetype} />}
        <span className="text-sm">{pickedText}</span>
      </div>
      {retort && <p className="text-xs text-text-muted mb-2">→ {retort}</p>}

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs tabular text-text-muted mb-2">
        <span>對關主：-{entry.dealt}{lifeDealtMult !== 1 && ` (人生加成 ×${lifeDealtMult})`}</span>
        <span>你受到：+{entry.taken}{lifeTakenMult !== 1 && ` (人生加成 ×${lifeTakenMult})`}</span>
        {entry.crit && <span className="text-crit">暴擊！</span>}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs text-gold"
      >
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {open ? "收起其他選項" : "查看其他 7 個選項"}
      </button>

      {open && (
        <ul className="mt-2 flex flex-col gap-2 border-t border-border pt-2">
          {otherOptions.map((o) => (
            <li key={o.id}>
              <div className="flex items-center gap-2 mb-0.5">
                <ArchetypeBadge archetype={o.archetype} />
                <span className="text-xs">{o.text}</span>
              </div>
              <p className="text-xs text-text-muted pl-1">→ {o.retort}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
