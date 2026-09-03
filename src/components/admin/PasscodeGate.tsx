"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { ctaClassName } from "@/components/common/PrimaryButton";
import { checkPasscode, isAdminAuthReal } from "@/lib/adminAuth";

const SESSION_KEY = "dzsg:admin:unlocked";

function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** Gate in front of `/admin`. With Supabase configured, the passcode is
 * checked server-side (`admin_check` RPC — see
 * supabase/migrations/20260904000000_question_overrides.sql) and that same
 * key is later sent on every question-bank edit. Without Supabase this
 * falls back to the old client-only comparison: this is a static export
 * with no server, so the fallback passcode ships in the client bundle and
 * only keeps casual visitors out of `/admin`, never a real access control. */
export function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const real = isAdminAuthReal();

  if (unlocked) return <>{children}</>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    const ok = await checkPasscode(input);
    setChecking(false);
    if (ok) {
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
        <button type="submit" disabled={checking} className={ctaClassName("primary")}>
          {checking ? "驗證中…" : "進入後台"}
        </button>
        <p className="text-xs text-text-muted leading-relaxed">
          {real
            ? "已接上 Supabase：密語會送到伺服器端驗證，題庫編輯的每一次儲存也會再次確認。"
            : "這是純前端靜態站，密語只是防止隨手誤入，不是真正的權限控管；別把它當成安全機制。"}
        </p>
      </form>
    </main>
  );
}
