import { Card, EmptyNote } from "@/components/admin/Section";
import { isSupabaseEnabled } from "@/lib/adminSupabase";
import { GlobalLeaderboardSection } from "@/components/admin/results/GlobalLeaderboardSection";
import { GlobalLifeStats } from "@/components/admin/results/GlobalLifeStats";
import { GlobalBossStats } from "@/components/admin/results/GlobalBossStats";
import { GlobalQuestionStats } from "@/components/admin/results/GlobalQuestionStats";

/** 全站 results view: Supabase-backed leaderboard + aggregate sections.
 * Each section fetches independently so one failing RPC never blocks the
 * rest of the page. */
export function GlobalResultsView() {
  if (!isSupabaseEnabled()) {
    return (
      <Card>
        <EmptyNote>尚未設定 Supabase，無法顯示全站資料。</EmptyNote>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <GlobalLeaderboardSection />
      <GlobalLifeStats />
      <GlobalBossStats />
      <GlobalQuestionStats />
    </div>
  );
}
