"use client";

import Link from "next/link";
import { Dices, CalendarCheck, BookOpen, Swords, LibraryBig, Volume2, VolumeX } from "lucide-react";
import { CONTENT } from "@/content";
import { findLife } from "@/content/lives";
import { LifeIcon } from "@/components/common/LifeIcon";
import { ModeCard } from "@/components/title/ModeCard";
import { Lantern } from "@/components/title/Lantern";
import { BossStrip } from "@/components/title/BossStrip";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";
import { useDailyStore, isDailyDoneToday } from "@/store/dailyStore";
import { useSettingsStore } from "@/store/settingsStore";
import type { Mode } from "@/engine/types";

const MODE_LABELS: Record<Mode, string> = {
  random: "隨機挑戰",
  daily: "每日挑戰",
  story: "故事模式",
  gauntlet: "闖關模式",
};

export default function TitlePage() {
  const gameState = useGameStore((s) => s.state);
  const storyCheckpoint = useGameStore((s) => s.storyCheckpoint);
  const lifeId = useLifeStore((s) => s.lifeId);
  const life = lifeId ? findLife(lifeId) : undefined;
  const daily = useDailyStore();
  const sfx = useSettingsStore((s) => s.sfx);
  const toggleSfx = useSettingsStore((s) => s.toggleSfx);

  const dailyDone = isDailyDoneToday(daily);
  const inProgress = gameState && gameState.phase !== "result";

  const checkpointScene = storyCheckpoint != null ? CONTENT.scenes[storyCheckpoint] : undefined;
  const storyLabel = checkpointScene ? `續玩第 ${checkpointScene.act} 幕` : "開始故事";

  const continueLabel = inProgress
    ? gameState.mode === "story" && gameState.act
      ? `${MODE_LABELS[gameState.mode]} · 第 ${gameState.act} 幕`
      : MODE_LABELS[gameState.mode]
    : undefined;

  return (
    <main className="bg-lattice flex flex-1 flex-col mx-auto w-full max-w-md px-4 py-4 safe-pt safe-pb gap-3">
      <header className="text-center py-2">
        <div className="flex items-start justify-center gap-3">
          <Lantern className="mt-1" />
          <div>
            <h1 className="font-display text-3xl text-gold">過年大戰三姑六婆</h1>
            <p className="text-sm text-text-muted mt-2">回家過年，用神回覆嗆爆三姑六婆。你敢回家嗎？</p>
          </div>
          <Lantern className="mt-1" flip />
        </div>
        <BossStrip bosses={CONTENT.bosses} />
      </header>

      <Link href="/life" className="rpg-box flex items-center gap-3 p-3 active:scale-[0.98] transition">
        {life ? (
          <>
            <LifeIcon name={life.icon} size={26} className="text-gold shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text">
                目前人生：<span className="text-gold">{life.name}</span>
              </p>
              <p className="text-xs text-text-muted">{life.tagline}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-text-muted flex-1">尚未選擇人生，點此挑選（或開戰時隨機）</p>
        )}
      </Link>

      {inProgress && (
        <Link
          href={`/${gameState.mode}`}
          className="rounded-btn border border-gold bg-gold/10 px-4 py-3 text-center text-sm text-gold"
        >
          繼續上一場（{continueLabel}）
        </Link>
      )}

      <div className="flex flex-col gap-3">
        <ModeCard href="/random" icon={Dices} title="隨機挑戰" description="隨機或指定一位關主，單場速戰" />
        <ModeCard
          href="/daily"
          icon={CalendarCheck}
          title="每日挑戰"
          description="全球同題，一天一次"
          badge={dailyDone ? `已完成 · 連續${daily.streak}天` : daily.streak > 0 ? `連續${daily.streak}天` : undefined}
        />
        <ModeCard href="/story" icon={BookOpen} title="故事模式" description="除夕到初二，三幕八戰" badge={checkpointScene ? storyLabel : undefined} />
        <ModeCard href="/gauntlet" icon={Swords} title="闖關模式" description="8 位親戚依序上陣，一路打到三姑" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <Link href="/bosses" className="flex items-center gap-2 text-sm text-text-muted">
          <LibraryBig size={18} />
          親戚圖鑑
        </Link>
        <button type="button" onClick={toggleSfx} className="flex items-center gap-2 text-sm text-text-muted" aria-pressed={sfx}>
          {sfx ? <Volume2 size={18} /> : <VolumeX size={18} />}
          音效{sfx ? "開" : "關"}
        </button>
      </div>
    </main>
  );
}
