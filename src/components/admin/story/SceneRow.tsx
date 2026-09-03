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
        <span className="text-xs text-text-muted font-mono tabular">{scene.id}</span>
      </div>

      {scene.kind === "narrative" && (
        <div>
          {scene.header && <p className="text-xs text-gold mb-1.5">{scene.header}</p>}
          {/* Mirrors the in-game SceneCard: narration lines inside the
           * double-rule rpg-box dialogue frame. */}
          <div className="rpg-box p-3 flex flex-col gap-1.5">
            {scene.lines.map((line, i) => (
              <p key={i} className="text-sm text-text">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {scene.kind === "fight" && <FightSceneBody scene={scene} />}

      {scene.kind === "rest" && (
        <div>
          <div className="rpg-box p-3 flex flex-col gap-1.5">
            {scene.lines.map((line, i) => (
              <p key={i} className="text-sm text-text">
                {line}
              </p>
            ))}
          </div>
          <p className="text-xs text-heal mt-1.5">全回血 + 特殊技補滿</p>
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
      <GoldRingPortrait src={`/portraits/${scene.bossId}.svg`} alt={boss?.name ?? scene.bossId} size={48} />
      <div className="text-sm text-text-muted flex-1 min-w-0">
        <p className="text-text font-medium">{boss?.name ?? scene.bossId}</p>
        {(scene.hpOverride !== undefined || extraLines.length > 0) && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {scene.hpOverride !== undefined && (
              <span className="rounded-full bg-hp-boss/20 border border-hp-boss/50 text-hp-boss px-2 py-0.5 text-xs tabular">
                HP 覆蓋：{scene.hpOverride}
              </span>
            )}
            {extraLines.map((line, i) => (
              <span
                key={i}
                className="rounded-full bg-gold/20 border border-gold/50 text-gold px-2 py-0.5 text-xs"
              >
                {line}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
