/**
 * Applies the owner's `/admin` question-bank edits (see
 * supabase/migrations/20260904000000_question_overrides.sql) on top of the
 * bundled content at runtime. The site is a static export — there is no
 * server to bake edits into `src/content/**` — so every edit lives as a row
 * in Supabase's `question_overrides` table and gets merged in here:
 *
 * - a row for an id that exists in the bundle REPLACES that question.
 * - a row for an id that doesn't exist in the bundle is a custom,
 *   owner-authored question and gets APPENDED.
 * - a row with `deleted: true` REMOVES that id (bundled or custom) from the
 *   effective list.
 *
 * `fetchOverrides()` mirrors the fetch pattern in src/lib/adminSupabase.ts:
 * `null` = Supabase isn't configured, `{ error }` = the RPC itself failed,
 * otherwise the row array (possibly empty).
 */
import { getSupabase, isSupabaseEnabled } from "@/lib/supabase";
import { ARCHETYPES } from "@/engine/types";
import { OPTIONS_PER_QUESTION } from "@/engine/archetypes";
import type { Archetype, ContentBundle, Question } from "@/engine/types";

export { isSupabaseEnabled };

export type Fetched<T> = T | { error: string } | null;

export function isFetchError<T>(v: Fetched<T>): v is { error: string } {
  return v !== null && typeof v === "object" && "error" in v;
}

function toErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "未知錯誤";
}

export interface QuestionOverrideRow {
  questionId: string;
  /** Question-shaped JSON when `deleted` is false; may be malformed if the
   * row was written outside the admin UI — always run through
   * `isValidQuestionData` before trusting it. */
  data: unknown;
  deleted: boolean;
  updatedAt: string;
}

export async function fetchOverrides(): Promise<Fetched<QuestionOverrideRow[]>> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("question_overrides_all");
    if (error) return { error: error.message };
    const rows = (data ?? []) as Record<string, unknown>[];
    return rows.map((r) => ({
      questionId: String(r.question_id),
      data: r.data,
      deleted: Boolean(r.deleted),
      updatedAt: String(r.updated_at),
    }));
  } catch (e) {
    return { error: toErrorMessage(e) };
  }
}

/** Structural check only — mirrors the shape `engine/validate.ts` expects,
 * not its balance rules (archetype recipe counts, char caps), since a
 * malformed row should be silently dropped here rather than crash the game;
 * the admin editor is what enforces the full rule set before a save. */
export function isValidQuestionData(value: unknown): value is Question {
  if (!value || typeof value !== "object") return false;
  const q = value as Record<string, unknown>;
  if (typeof q.id !== "string" || q.id.length === 0) return false;
  if (typeof q.text !== "string" || q.text.length === 0) return false;
  if (typeof q.topic !== "string") return false;
  if (q.bossId !== undefined && typeof q.bossId !== "string") return false;
  if (!Array.isArray(q.options) || q.options.length !== OPTIONS_PER_QUESTION) return false;
  return q.options.every((opt) => {
    if (!opt || typeof opt !== "object") return false;
    const o = opt as Record<string, unknown>;
    return (
      typeof o.id === "string" &&
      typeof o.text === "string" &&
      typeof o.retort === "string" &&
      typeof o.archetype === "string" &&
      ARCHETYPES.includes(o.archetype as Archetype)
    );
  });
}

/**
 * Merges `overrides` onto `bundle`, returning a new ContentBundle (only
 * `questions` differs from `bundle`). Malformed rows (bad shape, or
 * `data.id` not matching the row's key) are ignored so a single bad row
 * never breaks the whole game.
 */
export function applyOverrides(bundle: ContentBundle, overrides: QuestionOverrideRow[]): ContentBundle {
  const bundledIds = new Set(bundle.questions.map((q) => q.id));
  const deletedIds = new Set<string>();
  const replacements = new Map<string, Question>();
  const additions: Question[] = [];

  for (const row of overrides) {
    if (row.deleted) {
      deletedIds.add(row.questionId);
      continue;
    }
    if (!isValidQuestionData(row.data) || row.data.id !== row.questionId) continue;
    if (bundledIds.has(row.questionId)) {
      replacements.set(row.questionId, row.data);
    } else {
      additions.push(row.data);
    }
  }

  const questions = bundle.questions
    .filter((q) => !deletedIds.has(q.id))
    .map((q) => replacements.get(q.id) ?? q)
    .concat(additions);

  return { ...bundle, questions };
}

/* ---------------- Admin editor listing ----------------
 * Separate from `applyOverrides`: the game only ever needs the *effective*
 * (post-delete) list, but the `/admin` 題庫 tab needs to show hidden
 * questions too — with a badge and a way to un-hide them — so it merges
 * `bundle.questions` (never mutated) with every override row, hidden ones
 * included. */

export interface AdminQuestionEntry {
  /** Best-known content to display/edit: the override's data when valid, the
   * bundled question otherwise (including for a hidden bundled question,
   * whose override row usually carries no full copy of the text). */
  question: Question;
  /** No bundled counterpart — an owner-authored question. */
  isCustom: boolean;
  /** A valid, non-deleted override replaces the bundled version. */
  isEdited: boolean;
  /** Soft-deleted — excluded from `applyOverrides`'s result but still
   * listed here so the owner can find and un-hide it. */
  isHidden: boolean;
}

export function buildAdminQuestionList(bundle: ContentBundle, overrides: QuestionOverrideRow[]): AdminQuestionEntry[] {
  const bundledIds = new Set(bundle.questions.map((q) => q.id));
  const rowById = new Map(overrides.map((r) => [r.questionId, r]));
  const entries: AdminQuestionEntry[] = [];

  for (const q of bundle.questions) {
    const row = rowById.get(q.id);
    if (!row) {
      entries.push({ question: q, isCustom: false, isEdited: false, isHidden: false });
    } else if (row.deleted) {
      entries.push({ question: q, isCustom: false, isEdited: false, isHidden: true });
    } else if (isValidQuestionData(row.data) && row.data.id === q.id) {
      entries.push({ question: row.data, isCustom: false, isEdited: true, isHidden: false });
    } else {
      entries.push({ question: q, isCustom: false, isEdited: false, isHidden: false }); // malformed override, ignore
    }
  }

  for (const row of overrides) {
    if (bundledIds.has(row.questionId)) continue; // handled above
    if (!isValidQuestionData(row.data) || row.data.id !== row.questionId) continue; // malformed, drop
    entries.push({ question: row.data, isCustom: true, isEdited: false, isHidden: row.deleted });
  }

  return entries;
}
