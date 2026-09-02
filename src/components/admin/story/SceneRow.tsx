import type { StoryScene } from "@/engine/types";
import { CONTENT } from "@/content";
import { GoldRingPortrait } from "@/components/common/GoldRingPortrait";
import { describeBossModifiers } from "@/lib/bossDescribe";

const KIND_LABEL: Record<StoryScene["kind"], string> = {
  narrative: "旁白",
  fight: "戰鬥",
  rest: "休息",
};

const KIND_CLASS: Record<StoryScene["kind"], string> = {
  narrative: "bg-surface-2 text-text-muted border-border",
  fight: "bg-primary/20 text-primary border-primary/50",
  rest: "bg-heal/20 text-heal border-heal/50",
};

export function SceneRow({ scene }: { scene: StoryScene }) {
  return (
    <div className="rounded-box border border-border bg-surface-2/40 p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${KIND_CLASS[scene.kind]}`}>
          {KIND_LABEL[scene.kind]}
        </span>
        <span className="text-xs text-text-muted tabular">{scene.id}</span>
      </div>

      {scene.kind === "narrative" && (
        <div>
          {scene.header && <p className="text-sm text-gold mb-1">{scene.header}</p>}
          {scene.lines.map((line, i) => (
            <p key={i} className="text-sm text-text-muted">
              {line}
            </p>
          ))}
        </div>
      )}

      {scene.kind === "fight" && (
        <FightSceneBody scene={scene} />
      )}

      {scene.kind === "rest" && (
        <div>
          {scene.lines.map((line, i) => (
            <p key={i} className="text-sm text-text-muted">
              {line}
            </p>
          ))}
          <p className="text-xs text-heal mt-1">全回血 + 特殊技補滿</p>
        </div>
      )}
    </div>
  );
}

function FightSceneBody({ scene }: { scene: Extract<StoryScene, { kind: "fight" }> }) {
  const boss = CONTENT.bosses.find((b) => b.id === scene.bossId);
  const extraLines = describeBossModifiers(scene.extraModifiers);

  return (
    <div className="flex items-start gap-3">
      <GoldRingPortrait src={`/portraits/${scene.bossId}.svg`} alt={boss?.name ?? scene.bossId} size={40} />
      <div className="text-sm text-text-muted flex-1">
        <p className="text-text">{boss?.name ?? scene.bossId}</p>
        {scene.hpOverride !== undefined && <p className="text-xs tabular">HP 覆蓋：{scene.hpOverride}</p>}
        {extraLines.length > 0 && (
          <ul className="text-xs list-disc pl-4">
            {extraLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
