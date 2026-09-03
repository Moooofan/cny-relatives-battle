import { CONTENT } from "@/content";
import { useResultsStore } from "@/store/resultsStore";
import { useContentStore } from "@/store/contentStore";
import { Card, SectionTitle, StatTile } from "@/components/admin/Section";
import { ContentHealth } from "@/components/admin/overview/ContentHealth";
import { QuestionMatrix } from "@/components/admin/overview/QuestionMatrix";
import { GlobalCard } from "@/components/admin/overview/GlobalCard";

export function OverviewTab() {
  const resultsCount = useResultsStore((s) => s.results.length);
  const effectiveContent = useContentStore((s) => s.effectiveContent);
  const genericCount = effectiveContent.questions.filter((q) => q.bossId === undefined).length;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <SectionTitle>數量總覽</SectionTitle>
        <div className="flex flex-wrap gap-2">
          <StatTile label="關主數" value={effectiveContent.bosses.length} />
          <StatTile label="題目總數" value={effectiveContent.questions.length} />
          <StatTile label="共用（generic）題數" value={genericCount} />
          <StatTile label="人生種數" value={CONTENT.lives.length} />
          <StatTile label="劇情場景數" value={CONTENT.scenes.length} />
          <StatTile label="故事結局數" value={CONTENT.storyEndings.length} />
          <StatTile label="稱號等級數" value={CONTENT.rankTiers.length} />
          <StatTile label="本機戰績筆數" value={resultsCount} />
        </div>
      </Card>

      <GlobalCard />
      <QuestionMatrix bosses={effectiveContent.bosses} questions={effectiveContent.questions} />
      <ContentHealth />
    </div>
  );
}
