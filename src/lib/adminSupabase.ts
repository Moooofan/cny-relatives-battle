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
