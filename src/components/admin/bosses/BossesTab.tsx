import { CONTENT } from "@/content";
import { useStatsStore } from "@/store/statsStore";
import { BossAdminCard } from "@/components/admin/bosses/BossAdminCard";

export function BossesTab() {
  const bossesDefeated = useStatsStore((s) => s.bossesDefeated);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CONTENT.bosses.map((boss) => (
        <BossAdminCard
          key={boss.id}
          boss={boss}
          questions={CONTENT.questions}
          defeatedCount={bossesDefeated[boss.id] ?? 0}
        />
      ))}
    </div>
  );
}
