/**
 * Typed read wrappers around the `/admin` back-office's view into the
 * optional Supabase "全站結果" data (see supabase/migrations/20260903000000_results.sql).
 * Mirrors the fetch pattern in src/app/leaderboard/page.tsx but adds the
 * three admin-only aggregate functions (life/boss/question stats) and
 * normalizes every row to camelCase so admin components never touch
 * Postgres column names directly.
 *
 * Every function returns `null` when Supabase isn't configured (see
 * isSupabaseEnabled) and `{ error }` when the request itself fails —
 * callers must handle both in addition to the happy path.
 */
import { getSupabase, isSupabaseEnabled } from "@/lib/supabase";
import { taipeiDateString } from "@/lib/dates";
import { getAdminKey } from "@/lib/adminAuth";
import type { Mode } from "@/engine/types";

export type Fetched<T> = T | { error: string } | null;

export function isFetchError<T>(v: Fetched<T>): v is { error: string } {
  return v !== null && typeof v === "object" && "error" in v;
}

function toErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "未知錯誤";
}

export interface GlobalCounts {
  totalRuns: number;
  runsToday: number;
  distinctClients: number;
}

export interface LeaderboardRow {
  resultCode: string;
  lifeCode: string;
  lifeId: string | null;
  score: number;
  rankTitle: string;
  won: boolean;
  bossesDefeated: number;
  turns: number;
  createdAt: string;
}

export interface LifeStatRow {
  lifeCode: string;
  runs: number;
  avgScore: number;
  winRate: number;
}

export interface BossStatRow {
  bossId: string;
  encounters: number;
}

export interface QuestionStatRow {
  questionId: string;
  asked: number;
  perfectRate: number;
  landmineRate: number;
}

/** `export { isSupabaseEnabled }` so admin components only need one import
 * for both "is the feature on" and every fetch below. */
export { isSupabaseEnabled };

export async function fetchGlobalCounts(): Promise<Fetched<GlobalCounts>> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("global_counts");
    if (error) return { error: error.message };
    const row = Array.isArray(data) ? data[0] : undefined;
    if (!row) return { totalRuns: 0, runsToday: 0, distinctClients: 0 };
    return {
      totalRuns: Number(row.total_runs ?? 0),
      runsToday: Number(row.runs_today ?? 0),
      distinctClients: Number(row.distinct_clients ?? 0),
    };
  } catch (e) {
    return { error: toErrorMessage(e) };
  }
}

/** `mode: "daily"` reads today's (Asia/Taipei) leaderboard via
 * `daily_leaderboard`; every other mode reads the all-time `leaderboard`
 * for that mode. `limit` is clamped server-side to [1, 100]. */
export async function fetchLeaderboard(mode: Mode, limit = 100): Promise<Fetched<LeaderboardRow[]>> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } =
      mode === "daily"
        ? await supabase.rpc("daily_leaderboard", { p_date: taipeiDateString(), p_limit: limit })
        : await supabase.rpc("leaderboard", { p_mode: mode, p_limit: limit });
    if (error) return { error: error.message };
    const rows = (data ?? []) as Record<string, unknown>[];
    return rows.map((r) => ({
      resultCode: String(r.result_code),
      lifeCode: String(r.life_code),
      lifeId: (r.life_id as string | null) ?? null,
      score: Number(r.score),
      rankTitle: String(r.rank_title),
      won: Boolean(r.won),
      bossesDefeated: Number(r.bosses_defeated),
      turns: Number(r.turns),
      createdAt: String(r.created_at),
    }));
  } catch (e) {
    return { error: toErrorMessage(e) };
  }
}

export async function fetchLifeStats(): Promise<Fetched<LifeStatRow[]>> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("life_stats");
    if (error) return { error: error.message };
    const rows = (data ?? []) as Record<string, unknown>[];
    return rows.map((r) => ({
      lifeCode: String(r.life_code),
      runs: Number(r.runs),
      avgScore: Number(r.avg_score),
      winRate: Number(r.win_rate),
    }));
  } catch (e) {
    return { error: toErrorMessage(e) };
  }
}

export async function fetchBossStats(): Promise<Fetched<BossStatRow[]>> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("boss_stats");
    if (error) return { error: error.message };
    const rows = (data ?? []) as Record<string, unknown>[];
    return rows.map((r) => ({
      bossId: String(r.boss_id),
      encounters: Number(r.encounters),
    }));
  } catch (e) {
    return { error: toErrorMessage(e) };
  }
}

export async function fetchQuestionStats(): Promise<Fetched<QuestionStatRow[]>> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("question_stats");
    if (error) return { error: error.message };
    const rows = (data ?? []) as Record<string, unknown>[];
    return rows.map((r) => ({
      questionId: String(r.question_id),
      asked: Number(r.asked),
      perfectRate: Number(r.perfect_rate),
      landmineRate: Number(r.landmine_rate),
    }));
  } catch (e) {
    return { error: toErrorMessage(e) };
  }
}

/* ---------------- 題庫編輯（admin_* mutation RPCs） ----------------
 * See supabase/migrations/20260904000000_question_overrides.sql. Every call
 * sends the passcode last verified by src/lib/adminAuth.ts's checkPasscode —
 * the RPC re-checks it server-side (admin_check), so a stale/missing key
 * just fails the call rather than silently succeeding. Callers should only
 * offer these actions once `isAdminAuthReal()` is true (Supabase configured);
 * without it there is no server to write to. */

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

function missingClientError(): AdminMutationResult {
  return { ok: false, error: "尚未設定 Supabase，無法儲存到雲端。" };
}

function missingKeyError(): AdminMutationResult {
  return { ok: false, error: "尚未通過密語驗證，請重新整理頁面登入後台。" };
}

/** Upserts one question override. `data` must already satisfy the same
 * shape `engine/validate.ts` enforces (8 options, recipe counts, char caps,
 * `${questionId}-a..h` option ids) — the editor validates before calling
 * this; the RPC only re-checks the cheap structural rules server-side. */
export async function adminUpsertQuestion(questionId: string, data: unknown): Promise<AdminMutationResult> {
  const supabase = getSupabase();
  if (!supabase) return missingClientError();
  const key = getAdminKey();
  if (!key) return missingKeyError();
  try {
    const { error } = await supabase.rpc("admin_upsert_question", {
      p_key: key,
      p_question_id: questionId,
      p_data: data,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: toErrorMessage(e) };
  }
}

/** Soft-deletes (hides) a question — bundled or custom. */
export async function adminDeleteQuestion(questionId: string): Promise<AdminMutationResult> {
  const supabase = getSupabase();
  if (!supabase) return missingClientError();
  const key = getAdminKey();
  if (!key) return missingKeyError();
  try {
    const { error } = await supabase.rpc("admin_delete_question", { p_key: key, p_question_id: questionId });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: toErrorMessage(e) };
  }
}

/** Removes the override row entirely — for a bundled id this brings back
 * the shipped version; for a custom id it deletes it for good. */
export async function adminRestoreQuestion(questionId: string): Promise<AdminMutationResult> {
  const supabase = getSupabase();
  if (!supabase) return missingClientError();
  const key = getAdminKey();
  if (!key) return missingKeyError();
  try {
    const { error } = await supabase.rpc("admin_restore_question", { p_key: key, p_question_id: questionId });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: toErrorMessage(e) };
  }
}
