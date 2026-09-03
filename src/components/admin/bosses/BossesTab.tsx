import { useStatsStore } from "@/store/statsStore";
import { useContentStore } from "@/store/contentStore";
import { BossAdminCard } from "@/components/admin/bosses/BossAdminCard";

export function BossesTab() {
  const bossesDefeated = useStatsStore((s) => s.bossesDefeated);
  const effectiveContent = useContentStore((s) => s.effectiveContent);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {effectiveContent.bosses.map((boss) => (
        <BossAdminCard
          key={boss.id}
          boss={boss}
          questions={effectiveContent.questions}
          defeatedCount={bossesDefeated[boss.id] ?? 0}
        />
      ))}
    </div>
  );
}
