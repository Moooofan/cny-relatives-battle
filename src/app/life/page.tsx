"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shuffle } from "lucide-react";
import { LIVES } from "@/content/lives";
import { LifeCard } from "@/components/life/LifeCard";
import { LifeDetail } from "@/components/life/LifeDetail";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useLifeStore } from "@/store/lifeStore";

export default function LifePage() {
  const router = useRouter();
  const setLife = useLifeStore((s) => s.setLife);
  const randomLife = useLifeStore((s) => s.randomLife);
  const [openId, setOpenId] = useState<string | null>(null);
  const openLife = LIVES.find((l) => l.id === openId);

  function chooseAndReturn(id: string): void {
    setLife(id);
    router.push("/");
  }

  return (
    <main className="flex flex-1 flex-col mx-auto w-full max-w-md px-4 py-4 safe-pt safe-pb">
      <div className="flex items-center gap-2 mb-4">
        <button type="button" onClick={() => router.push("/")} aria-label="返回">
          <ArrowLeft className="text-text-muted" size={22} />
        </button>
        <h1 className="font-display text-xl text-gold">選擇你的人生</h1>
      </div>

      <PrimaryButton className="mb-4 flex items-center justify-center gap-2" onClick={() => chooseAndReturn(randomLife())}>
        <Shuffle size={18} />
        隨機一種人生
      </PrimaryButton>

      <div className="grid grid-cols-2 gap-3 pb-4">
        {LIVES.map((life) => (
          <LifeCard key={life.id} life={life} onSelect={() => setOpenId(life.id)} />
        ))}
      </div>

      {openLife && (
        <LifeDetail life={openLife} onClose={() => setOpenId(null)} onStart={() => chooseAndReturn(openLife.id)} />
      )}
    </main>
  );
}
