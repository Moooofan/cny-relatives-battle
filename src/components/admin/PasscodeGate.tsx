"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { ctaClassName } from "@/components/common/PrimaryButton";

const SESSION_KEY = "dzsg:admin:unlocked";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS ?? "sangu2026";

function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** Obscurity-only gate: this is a static export with no server, so the
 * passcode ships in the client bundle. It only keeps casual visitors out of
 * `/admin`, never a real access control. */
export function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASS) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage unavailable (private mode etc.) — allow this tab only
      }
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-dvh px-4 safe-pt safe-pb">
      <form onSubmit={handleSubmit} className="rpg-box p-6 w-full max-w-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-gold">
          <Lock size={20} />
          <h1 className="font-display text-lg">後台通關密語</h1>
        </div>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          autoFocus
          placeholder="輸入通關密語"
          className="h-11 rounded-btn bg-surface-2 border border-border px-3 text-text placeholder:text-text-muted"
        />
        {error && <p className="text-sm text-primary">密語不對，再試一次。</p>}
        <button type="submit" className={ctaClassName("primary")}>
          進入後台
        </button>
        <p className="text-xs text-text-muted leading-relaxed">
          這是純前端靜態站，密語只是防止隨手誤入，不是真正的權限控管；別把它當成安全機制。
        </p>
      </form>
    </main>
  );
}
