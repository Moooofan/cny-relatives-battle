import { Suspense } from "react";
import { RandomInner } from "./RandomInner";

export default function RandomPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center text-text-muted">載入中…</div>}>
      <RandomInner />
    </Suspense>
  );
}
