"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContentStore } from "@/store/contentStore";
import { BossCard } from "@/components/bosses/BossCard";

export default function BossesPage() {
  const router = useRouter();
  const effectiveContent = useContentStore((s) => s.effectiveContent);

  return (
    <main className="flex flex-1 flex-col mx-auto w-full max-w-md px-4 py-4 safe-pt safe-pb gap-3">
      <div className="flex items-center gap-2 mb-1">
        <button type="button" onClick={() => router.back()} aria-label="返回">
          <ArrowLeft className="text-text-muted" size={22} />
        </button>
        <h1 className="font-display text-xl text-gold">親戚圖鑑</h1>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pb-4">
        {effectiveContent.bosses.map((boss) => (
          <BossCard key={boss.id} boss={boss} questions={effectiveContent.questions} />
        ))}
      </div>
    </main>
  );
}
