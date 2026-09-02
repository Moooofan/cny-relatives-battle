"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { LinkButton } from "@/components/common/LinkButton";
import { ReviewTurnRow } from "@/components/result/ReviewTurnRow";

export default function ReviewPage() {
  const router = useRouter();
  const state = useGameStore((s) => s.state);

  if (!state || state.log.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-text-muted">目前沒有可回顧的對戰紀錄。</p>
        <LinkButton href="/" className="max-w-xs">
          回首頁
        </LinkButton>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col mx-auto w-full max-w-md px-4 py-4 safe-pt safe-pb gap-3">
      <div className="flex items-center gap-2 mb-1">
        <button type="button" onClick={() => router.back()} aria-label="返回">
          <ArrowLeft className="text-text-muted" size={22} />
        </button>
        <h1 className="font-display text-xl text-gold">對戰回顧</h1>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pb-4">
        {state.log.map((entry, i) => (
          <ReviewTurnRow key={`${entry.questionId}-${i}`} entry={entry} index={i} />
        ))}
      </div>
    </main>
  );
}
