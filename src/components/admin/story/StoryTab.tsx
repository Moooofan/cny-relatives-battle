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
            {/* Header caption styled like the in-game SceneCard's header line
             * (text-xs text-gold above the rpg-box narration frame). */}
            <p className="text-xs text-gold">{act.header}</p>
            <p className="text-xs text-text-muted tabular">{scenes.length} 個場景</p>
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
              <p className="text-sm text-gold">
                <span className="font-mono tabular">{ending.id}</span> · {ending.title}
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

        {/* Desktop: aligned table. Mobile: one card per rank — a 4-mode row
         * doesn't fit 375px without either truncation or horizontal scroll,
         * so it's restructured into a label/value grid instead. */}
        <div className="hidden md:block overflow-x-auto">
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

        <div className="flex flex-col gap-2 md:hidden">
          {CONTENT.rankTiers.map((tier) => (
            <div key={tier.rank} className="rounded-box border border-border bg-surface-2/40 p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-gold tabular text-sm">Rank {tier.rank}</span>
                <span className="text-text text-sm">{tier.title}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                {Object.entries(MODE_LABELS).map(([mode, label]) => (
                  <div key={mode} className="flex items-center justify-between tabular">
                    <span className="text-text-muted">{label}</span>
                    <span className="text-text">{tier.minScore[mode as keyof typeof MODE_LABELS]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
