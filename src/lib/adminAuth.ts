/**
 * `/admin` passcode check. When Supabase is configured this is a real
 * server-side check (the `admin_check` RPC reads `public.admin_config`,
 * which has RLS enabled and no policies — unreadable by anon directly, see
 * supabase/migrations/20260904000000_question_overrides.sql). Without
 * Supabase it falls back to the old client-only comparison, which was never
 * real access control (the passcode ships in the bundle either way) — only
 * good enough to keep casual visitors out.
 */
import { getSupabase, isSupabaseEnabled } from "@/lib/supabase";

const ADMIN_KEY_STORAGE_KEY = "dzsg:admin-key";
const LOCAL_FALLBACK_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS ?? "sangu2026";

function safeSessionStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** The passcode last verified via `admin_check`, if any — sent as `p_key` on
 * every admin_upsert_question/admin_delete_question/admin_restore_question
 * call so those RPCs can re-check it server-side. `null` when unset (no
 * Supabase, or the tab hasn't unlocked yet). */
export function getAdminKey(): string | null {
  return safeSessionStorage()?.getItem(ADMIN_KEY_STORAGE_KEY) ?? null;
}

function storeAdminKey(key: string): void {
  try {
    safeSessionStorage()?.setItem(ADMIN_KEY_STORAGE_KEY, key);
  } catch {
    // sessionStorage unavailable (private mode etc.) — admin RPCs will fail
    // with "invalid admin key" until the tab unlocks again with storage back.
  }
}

/** True when the passcode is checked server-side via Supabase — PasscodeGate
 * and the questions editor use this to explain which mode they're in. */
export function isAdminAuthReal(): boolean {
  return isSupabaseEnabled();
}

/**
 * Verifies `key`. With Supabase configured, calls the `admin_check` RPC and
 * stores the key on success (so later admin_* mutation RPCs can reuse it).
 * Without Supabase, compares against `NEXT_PUBLIC_ADMIN_PASS`/`sangu2026`
 * client-side — the pre-existing obscurity-only behaviour.
 */
export async function checkPasscode(key: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) {
    return key === LOCAL_FALLBACK_PASS;
  }
  try {
    const { data, error } = await supabase.rpc("admin_check", { p_key: key });
    if (error || data !== true) return false;
    storeAdminKey(key);
    return true;
  } catch {
    return false;
  }
}
