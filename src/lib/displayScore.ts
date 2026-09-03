/** Raw score can go negative (rank thresholds and computeScore rely on the
 * unclamped value — rank 1's minScore is -100000, so this never changes rank
 * selection). Never show a negative number to the player though: clamp at 0
 * for display, with a small caption only when the clamp actually kicked in. */
export function clampScoreForDisplay(score: number): { value: number; clamped: boolean } {
  return score < 0 ? { value: 0, clamped: true } : { value: score, clamped: false };
}

export const CLAMPED_SCORE_CAPTION = "（最低 0 分）";
