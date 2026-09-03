import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Optional Supabase backend for global result collection / leaderboards
 * (README §Supabase（選用）). Both env vars are read at build time
 * (`NEXT_PUBLIC_*` so they're inlined into the static export) — when either
 * is missing the whole feature becomes a no-op, which is what lets `pnpm
 * build` succeed on a checkout with no Supabase project configured.
 */

let cachedClient: SupabaseClient | null | undefined;

function readEnv(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/** True when both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 * were set at build time. Gate any Supabase-backed UI on this. */
export function isSupabaseEnabled(): boolean {
  return readEnv() !== null;
}

/** Lazily creates (and memoizes) the anon Supabase client. Returns `null`
 * when the env vars are absent — callers must handle that instead of
 * assuming a client. Session persistence is disabled since this app never
 * authenticates users; every write is anonymous. */
export function getSupabase(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;
  const env = readEnv();
  cachedClient = env
    ? createClient(env.url, env.anonKey, { auth: { persistSession: false } })
    : null;
  return cachedClient;
}
