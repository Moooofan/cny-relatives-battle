import type { Metadata } from "next";
import { Suspense } from "react";
import { RandomInner } from "./RandomInner";

export const metadata: Metadata = {
  title: "隨機挑戰",
  description: "任選一位關主，單場戰鬥，1–2 分鐘一局，最適合想快速嗆一場的你。",
};

export default function RandomPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center text-text-muted">載入中…</div>}>
      <RandomInner />
    </Suspense>
  );
}
