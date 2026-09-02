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
