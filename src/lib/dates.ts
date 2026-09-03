/** Date helpers, always anchored to Asia/Taipei so daily mode agrees for every player. */

export function taipeiDateString(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function dailySeed(d: Date = new Date()): string {
  return `daily-${taipeiDateString(d)}`;
}

/** True when `prevDateStr` (YYYY-MM-DD) is exactly one calendar day before `todayStr`. */
export function isConsecutiveDay(prevDateStr: string | null, todayStr: string): boolean {
  if (!prevDateStr) return false;
  const prev = new Date(`${prevDateStr}T00:00:00Z`);
  const today = new Date(`${todayStr}T00:00:00Z`);
  const diffDays = Math.round((today.getTime() - prev.getTime()) / 86_400_000);
  return diffDays === 1;
}

/** Short "剛剛 / 5 分鐘前 / 3 小時前 / 2 天前" style relative time, falling
 * back to `formatDateTime` past 7 days. Used by the leaderboard, where rows
 * span many devices/timezones and an absolute stamp is less scannable. */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;
  const diffSec = Math.max(0, Math.round((now.getTime() - then) / 1000));
  if (diffSec < 60) return "剛剛";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} 分鐘前`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour} 小時前`;
  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 7) return `${diffDay} 天前`;
  return formatDateTime(iso);
}

export function formatDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
