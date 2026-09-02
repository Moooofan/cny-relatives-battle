import type { ContentBundle, GameState } from "@/engine/types";

/** Share sentence templates — docs/CONTENT.md §5. */
export function buildShareText(state: GameState, content: ContentBundle): string {
  const tierTitle = state.result?.rank.title ?? "";

  if (state.mode === "story") {
    const ending = content.storyEndings.find((e) => e.id === state.result?.storyEndingId);
    return `我在《過年大戰三姑六婆》活著撐完三天，結局：${ending?.title ?? "平安過年"}，稱號：${tierTitle}。`;
  }
  if (state.mode === "gauntlet") {
    return `我在《過年大戰三姑六婆》闖關擊敗了 ${state.bossesDefeated} 位親戚，稱號：${tierTitle}。你敢回家嗎？`;
  }
  const lastBossId = state.bossQueue[Math.min(state.bossIndex, state.bossQueue.length - 1)];
  const boss = content.bosses.find((b) => b.id === lastBossId);
  return `我在《過年大戰三姑六婆》用 ${state.turns} 回合擊敗了${boss?.name ?? "親戚"}，稱號：${tierTitle}。你敢回家嗎？`;
}

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

/** Web Share API when available, otherwise copy to clipboard. */
export async function share(text: string, url?: string): Promise<ShareResult> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(url ? { text, url } : { text });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
      // fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(url ? `${text}\n${url}` : text);
    return "copied";
  } catch {
    return "failed";
  }
}
