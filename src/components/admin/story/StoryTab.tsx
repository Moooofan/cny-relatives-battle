import { CONTENT } from "@/content";
import { Card, SectionTitle } from "@/components/admin/Section";
import { SceneRow } from "@/components/admin/story/SceneRow";

const MODE_LABELS = { random: "隨機", daily: "每日", story: "故事", gauntlet: "闖關" } as const;

export function StoryTab() {
  return (
    <div className="flex flex-col gap-4">
      {CONTENT.acts.map((act) => {
        const scenes = CONTENT.scenes.filter((s) => s.act === act.act);
        return (
          <Card key={act.act}>
            <SectionTitle>
              第{act.act}幕 · {act.title}
            </SectionTitle>
            <p className="text-xs text-text-muted">{act.header}</p>
            <div className="flex flex-col gap-2">
              {scenes.map((scene) => (
                <SceneRow key={scene.id} scene={scene} />
              ))}
            </div>
          </Card>
        );
      })}

      <Card>
        <SectionTitle>故事結局（{CONTENT.storyEndings.length}）</SectionTitle>
        <div className="flex flex-col gap-2">
          {CONTENT.storyEndings.map((ending) => (
            <div key={ending.id} className="rounded-box border border-border bg-surface-2/40 p-3">
              <p className="text-sm text-gold tabular">
                {ending.id} · {ending.title}
              </p>
              {ending.lines.map((line, i) => (
                <p key={i} className="text-xs text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>稱號等級（分數門檻）</SectionTitle>
        <div className="overflow-x-auto">
          <table className="text-xs tabular w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="text-left text-text-muted">
                <th className="font-normal py-1 pr-2">Rank</th>
                <th className="font-normal py-1 pr-2">稱號</th>
                {Object.entries(MODE_LABELS).map(([mode, label]) => (
                  <th key={mode} className="font-normal py-1 px-2 text-right">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONTENT.rankTiers.map((tier) => (
                <tr key={tier.rank} className="border-t border-border">
                  <td className="py-1 pr-2 text-gold">{tier.rank}</td>
                  <td className="py-1 pr-2 text-text">{tier.title}</td>
                  {Object.keys(MODE_LABELS).map((mode) => (
                    <td key={mode} className="py-1 px-2 text-right text-text-muted">
                      {tier.minScore[mode as keyof typeof MODE_LABELS]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
