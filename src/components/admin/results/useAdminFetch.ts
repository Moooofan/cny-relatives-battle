import { useEffect, useState } from "react";
import { isFetchError, type Fetched } from "@/lib/adminSupabase";

export type FetchState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "ready"; data: T[] };

/** Shared loading/empty/error/ready lifecycle for the 全站 sections — each
 * one calls one of the src/lib/adminSupabase.ts fetchers, which already
 * return `null` (disabled) / `{ error }` / the row array. Callers only
 * mount this hook once `isSupabaseEnabled()` is true, so a `null` result is
 * treated the same as an empty list rather than surfaced separately.
 *
 * Fetches exactly once per mount — a caller whose query depends on some
 * input (e.g. the leaderboard's mode tabs) should remount this hook's
 * component with `key={input}` (see GlobalLeaderboardSection) instead of
 * passing deps here, so state naturally resets to "loading" without a
 * synchronous setState in the effect body. */
export function useAdminFetch<T>(fetchFn: () => Promise<Fetched<T[]>>): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    void fetchFn().then((result) => {
      if (cancelled) return;
      if (isFetchError(result)) {
        setState({ status: "error", message: result.error });
        return;
      }
      const rows = result ?? [];
      setState(rows.length === 0 ? { status: "empty" } : { status: "ready", data: rows });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
