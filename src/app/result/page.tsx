"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CONTENT } from "@/content";
import { findLife } from "@/content/lives";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifeStore";
import { useResultsStore } from "@/store/resultsStore";
import { useDailyStore } from "@/store/dailyStore";
import { deriveWon } from "@/components/admin/resultsMath";
import { CLAMPED_SCORE_CAPTION, clampScoreForDisplay } from "@/lib/displayScore";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { LinkButton } from "@/components/common/LinkButton";
import { TopicBars } from "@/components/result/TopicBars";
import { ShareButton } from "@/components/result/ShareButton";
import { ResultStat } from "@/components/result/ResultStat";

export default function ResultPage() {
  const router = useRouter();
  const state = useGameStore((s) => s.state);
  const resetGame = useGameStore((s) => s.resetGame);
  const markResultSeen = useGameStore((s) => s.markResultSeen);
  const lifeStoreId = useLifeStore((s) => s.lifeId);
  const addResult = useResultsStore((s) => s.addResult);
  const markDailyDone = useDailyStore((s) => s.markDone);
  // The engine's own lifeId is the source of truth for what was actually
  // played (it may have been rng-picked at createGame time even when the
  // life store itself has nothing explicitly chosen) — fall back to the life
  // store only when the engine has none (e.g. content has no lives at all).
  const lifeId = state?.lifeId ?? lifeStoreId;
  const life = lifeId ? findLife(lifeId) : undefined;
  const result = state?.phase === "result" ? state.result : undefined;

  useEffect(() => {
    if (!state || !result) return;
    markResultSeen();
    addResult({
      resultCode: result.resultCode,
      lifeId: state.lifeId,
      lifeCode: life?.code ?? null,
      mode: state.mode,
      score: result.score,
      rankTitle: result.rank.title,
      endingId: result.storyEndingId,
      won: deriveWon(
        { mode: state.mode, bossesDefeated: state.bossesDefeated, endingId: result.storyEndingId },
        state.bossQueue.length
      ),
      bossesDefeated: state.bossesDefeated,
      turns: state.turns,
      maxCombo: state.maxCombo,
      hpLeft: state.playerHp,
      seed: state.seed,
      at: new Date().toISOString(),
    });
    if (state.mode === "daily") markDailyDone(result.score, result.rank.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.resultCode]);

  if (!state || !result) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-text-muted">目前沒有可顯示的結果。</p>
        <LinkButton href="/" className="max-w-xs">
          回首頁
        </LinkButton>
      </div>
    );
  }

  const ending = state.mode === "story" ? CONTENT.storyEndings.find((e) => e.id === result.storyEndingId) : undefined;
  const displayScore = clampScoreForDisplay(result.score);

  function handleRematch(): void {
    const mode = state!.mode;
    resetGame();
    router.push(mode === "daily" ? "/" : `/${mode}`);
  }

  return (
    <main className="flex flex-1 flex-col mx-auto w-full max-w-md px-4 py-6 safe-pt safe-pb gap-4 overflow-y-auto">
      <header className="text-center">
        <h1 className="font-display text-2xl text-gold">{ending ? ending.title : result.rank.title}</h1>
        <p className="text-sm text-text-muted mt-2 leading-relaxed">
          {ending ? ending.lines.join(" ") : result.rank.blurb}
        </p>
        {ending && <p className="text-sm text-gold mt-2">稱號：{result.rank.title}</p>}
      </header>

      <div className="rpg-box grid grid-cols-2 gap-3 p-4 text-sm">
        <ResultStat
          label="分數"
          value={displayScore.value}
          caption={displayScore.clamped ? CLAMPED_SCORE_CAPTION : undefined}
        />
        <ResultStat label="回合數" value={state.turns} />
        <ResultStat label="最大連擊" value={state.maxCombo} />
        <ResultStat label="剩餘 HP" value={state.playerHp} />
        <ResultStat label="擊敗人數" value={state.bossesDefeated} />
        <ResultStat label="人生" value={life ? `${life.name}（${life.code}）` : "—"} />
      </div>

      <button
        type="button"
        onClick={() => void navigator.clipboard?.writeText(result.resultCode)}
        className="rounded-btn border border-border bg-surface-2 px-3 py-2 text-xs text-text-muted tabular text-left"
      >
        結果代碼：{result.resultCode}（點擊複製）
      </button>

      <TopicBars log={state.log} />

      <div className="flex flex-col gap-2 pb-4">
        <PrimaryButton onClick={handleRematch}>再戰</PrimaryButton>
        <LinkButton href="/review" variant="ghost">
          看回顧
        </LinkButton>
        <ShareButton state={state} />
        <LinkButton href="/" variant="ghost">
          回首頁
        </LinkButton>
      </div>
    </main>
  );
}
