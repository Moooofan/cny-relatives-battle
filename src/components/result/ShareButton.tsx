"use client";

import { useState } from "react";
import { CONTENT } from "@/content";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { buildShareText, share } from "@/lib/share";
import type { GameState } from "@/engine/types";

export function ShareButton({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);

  async function handleShare(): Promise<void> {
    const text = buildShareText(state, CONTENT);
    const result = await share(text);
    if (result === "copied") setToast("已複製分享文字！");
    else if (result === "failed") setToast("分享失敗，請手動複製。");
    if (result !== "shared") setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className="relative">
      <PrimaryButton variant="ghost" onClick={handleShare}>
        分享戰績
      </PrimaryButton>
      {toast && (
        <p role="status" className="absolute -top-8 left-0 right-0 text-center text-xs text-gold">
          {toast}
        </p>
      )}
    </div>
  );
}
