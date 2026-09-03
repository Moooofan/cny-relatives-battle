import { getSupabase, isSupabaseEnabled } from "@/lib/supabase";
import type { GameResult, GameState, TurnLog } from "@/engine/types";

/**
 * Uploads finished runs to the optional Supabase backend (README §Supabase
 * （選用）). Every function here is a no-op when Supabase isn't configured,
 * and every localStorage access is guarded so this stays safe to import from
 * the static export (no `window` at build time).
 */

const CLIENT_ID_KEY = "dzsg:client";
const QUEUE_KEY = "dzsg:sync-queue";
const MAX_QUEUE = 50;
const MAX_LOG_ENTRIES = 200;
const APP_VERSION = "1.0.0";

interface TrimmedLogEntry {
  question_id: string;
  option_id: string;
  archetype: string;
  dealt: number;
  taken: number;
  topic: string;
  boss_id: string;
}

export interface PendingResultRow {
  result_code: string;
  client_id: string;
  life_id: string | null;
  life_code: string;
  mode: GameState["mode"];
  score: number;
  rank: number;
  rank_title: string;
  ending_id: string | null;
  won: boolean;
  bosses_defeated: number;
  turns: number;
  max_combo: number;
  hp_left: number;
  seed: string;
  boss_ids: string[];
  daily_date: string | null;
  log: TrimmedLogEntry[];
  app_version: string;
}

function safeStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Creates (once) and persists an anonymous per-device id used only to group
 * a single device's uploaded runs — never tied to any real identity. */
export function getClientId(): string {
  const storage = safeStorage();
  if (!storage) return "anonymous";
  try {
    const existing = storage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    storage.setItem(CLIENT_ID_KEY, id);
    return id;
  } catch {
    return "anonymous";
  }
}

function readQueue(): PendingResultRow[] {
  const storage = safeStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PendingResultRow[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(rows: PendingResultRow[]): void {
  const storage = safeStorage();
  if (!storage) return;
  try {
    storage.setItem(QUEUE_KEY, JSON.stringify(rows.slice(0, MAX_QUEUE)));
  } catch {
    // Best-effort only (e.g. storage quota/private mode) — dropping the
    // queue update just means this run gets picked up again next flush.
  }
}

function trimLog(log: TurnLog[]): TrimmedLogEntry[] {
  return log.slice(0, MAX_LOG_ENTRIES).map((entry) => ({
    question_id: entry.questionId,
    option_id: String(entry.optionId),
    archetype: entry.archetype,
    dealt: entry.dealt,
    taken: entry.taken,
    topic: entry.topic,
    boss_id: entry.bossId,
  }));
}

/** Extracts "YYYY-MM-DD" from a daily-mode seed (`dailySeed()` in
 * `src/lib/dates.ts` produces `daily-YYYY-MM-DD`). */
function dailyDateFromSeed(seed: string): string | null {
  const match = /^daily-(\d{4}-\d{2}-\d{2})$/.exec(seed);
  return match ? match[1] : null;
}

/** Builds the upload row for a just-finished run and appends it to the
 * localStorage sync queue, deduped by result_code. No-op when Supabase is
 * disabled. Callers must only invoke this once per resultCode (the result
 * page reuses its own resultsStore-based "already recorded" guard). */
export function enqueueResult(params: {
  state: GameState;
  result: GameResult;
  lifeCode: string | null;
  won: boolean;
}): void {
  if (!isSupabaseEnabled()) return;
  const { state, result, lifeCode, won } = params;
  const queue = readQueue();
  if (queue.some((row) => row.result_code === result.resultCode)) return;

  const row: PendingResultRow = {
    result_code: result.resultCode,
    client_id: getClientId(),
    life_id: state.lifeId,
    life_code: lifeCode ?? "L00",
    mode: state.mode,
    score: result.score,
    rank: result.rank.rank,
    rank_title: result.rank.title,
    ending_id: result.storyEndingId ?? null,
    won,
    bosses_defeated: state.bossesDefeated,
    turns: state.turns,
    max_combo: state.maxCombo,
    hp_left: state.playerHp,
    seed: state.seed,
    boss_ids: state.bossQueue,
    daily_date: state.mode === "daily" ? dailyDateFromSeed(state.seed) : null,
    log: trimLog(state.log),
    app_version: APP_VERSION,
  };
  writeQueue([row, ...queue]);
}

/** Uploads every queued row, removing only the ones that succeed. Uses a
 * plain INSERT: the table's RLS only grants INSERT, and `ON CONFLICT`
 * (upsert) would additionally require SELECT/UPDATE policies and be
 * rejected with 42501. A duplicate primary key (23505) means the row already
 * landed on an earlier flush, so it counts as success. No-op when Supabase
 * is disabled or the queue is empty. */
export async function flushQueue(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const queue = readQueue();
  if (queue.length === 0) return;

  const remaining: PendingResultRow[] = [];
  for (const row of queue) {
    const { error } = await supabase.from("results").insert(row);
    if (error && error.code !== "23505") remaining.push(row);
  }
  writeQueue(remaining);
}
