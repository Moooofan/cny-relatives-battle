/** 三姑's 翻舊帳 gimmick (docs/CONTENT.md §4): badge shown when the current
 * question was injected because the player once answered it (or an
 * equivalent question) meekly earlier in the run. Same shape as
 * `FollowUpBadge`, styled with the gold accent instead of the primary one. */
export function GrudgeBadge() {
  return (
    <div className="self-center rounded-full bg-gold/20 border border-gold px-3 py-1 text-xs text-gold">
      翻舊帳！
    </div>
  );
}
