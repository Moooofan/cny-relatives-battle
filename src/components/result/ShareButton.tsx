"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/content";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { buildShareText } from "@/lib/share";
import { renderResultCard } from "@/lib/resultCard";
import type { GameState } from "@/engine/types";

type CardState = "idle" | "rendering" | "ready" | "failed";

export function ShareButton({ state }: { state: GameState }) {
  const [toast, setToast] = useState<string | null>(null);
  const [cardState, setCardState] = useState<CardState>("idle");
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const objectUrlRef = useRef<string | null>(null);
  const blobRef = useRef<Blob | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  function flashToast(message: string): void {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }

  async function ensureCard(): Promise<Blob | null> {
    if (blobRef.current) return blobRef.current;
    setCardState("rendering");
    try {
      const blob = await renderResultCard({ state, content: CONTENT });
      blobRef.current = blob;
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      setCardUrl(url);
      setCardState("ready");
      return blob;
    } catch (err) {
      console.error("renderResultCard failed", err);
      setCardState("failed");
      return null;
    }
  }

  async function handleShare(): Promise<void> {
    const text = buildShareText(state, CONTENT);
    const blob = await ensureCard();

    if (blob && typeof navigator !== "undefined" && typeof navigator.share === "function") {
      const file = new File([blob], "過年大戰三姑六婆.png", { type: "image/png" });
      const canShareFiles =
        typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
      if (canShareFiles) {
        try {
          await navigator.share({ files: [file], text });
          return;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return;
          // fall through to inline preview below
        }
      }
    }
    // No Web Share (or navigator.share/canShare unsupported, or it failed):
    // fall back to the inline preview + copy-text + download flow.
    setShowPreview(true);
  }

  async function handleCopyText(): Promise<void> {
    const text = buildShareText(state, CONTENT);
    try {
      await navigator.clipboard.writeText(text);
      flashToast("已複製分享文字！");
    } catch {
      flashToast("複製失敗，請手動複製。");
    }
  }

  async function handleCopyCode(): Promise<void> {
    const code = state.result?.resultCode ?? "";
    try {
      await navigator.clipboard.writeText(code);
      flashToast("已複製結果代碼！");
    } catch {
      flashToast("複製失敗，請手動複製。");
    }
  }

  return (
    <div className="relative flex flex-col gap-2">
      {toast && (
        <p role="status" className="absolute -top-8 left-0 right-0 text-center text-xs text-gold">
          {toast}
        </p>
      )}

      <PrimaryButton onClick={handleShare} disabled={cardState === "rendering"}>
        {cardState === "rendering" ? "產生圖卡中…" : "分享戰績"}
      </PrimaryButton>

      {showPreview && cardState === "ready" && cardUrl && (
        <div className="rpg-box flex flex-col items-center gap-2 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, plain object-URL blob preview, next/image adds no value here */}
          <img
            src={cardUrl}
            alt="戰績分享圖卡"
            className="w-full max-w-[280px] rounded-btn border border-border"
          />
          <p className="text-xs text-text-muted">長按儲存圖片</p>
          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex-1 rounded-btn border border-border bg-surface-2 px-3 py-2 text-xs text-text"
            >
              複製文字
            </button>
            <a
              href={cardUrl}
              download="過年大戰三姑六婆.png"
              className="flex-1 rounded-btn border border-border bg-surface-2 px-3 py-2 text-center text-xs text-text"
            >
              下載圖片
            </a>
          </div>
        </div>
      )}

      {showPreview && cardState === "failed" && (
        <p className="text-xs text-text-muted text-center">圖卡產生失敗，仍可分享文字。</p>
      )}

      <button
        type="button"
        onClick={handleCopyCode}
        className="rounded-btn border border-border bg-surface-2 px-3 py-2 text-xs text-text-muted"
      >
        複製結果代碼
      </button>
    </div>
  );
}
