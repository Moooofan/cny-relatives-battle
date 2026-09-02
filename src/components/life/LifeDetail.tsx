import { CONTENT } from "@/content";
import { LifeIcon } from "@/components/common/LifeIcon";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { describeLifeModifiers } from "@/lib/lifeDescribe";
import type { Life } from "@/engine/types";

interface Props {
  life: Life;
  onStart: () => void;
  onClose: () => void;
}

export function LifeDetail({ life, onStart, onClose }: Props) {
  const modifierLines = describeLifeModifiers(life, CONTENT.bosses);

  return (
    <div className="fixed inset-0 z-20 flex flex-col bg-bg">
      <div className="flex items-center justify-between px-4 pt-4 safe-pt">
        <span className="tabular text-xs text-text-muted">{life.code}</span>
        <button type="button" onClick={onClose} className="text-sm text-text-muted" aria-label="關閉">
          關閉 ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex items-center gap-3 py-3">
          <LifeIcon name={life.icon} size={32} className="text-gold" />
          <div>
            <h1 className="font-display text-xl text-gold">{life.name}</h1>
            <p className="text-sm text-text-muted">{life.tagline}</p>
          </div>
        </div>

        <section className="rpg-box p-4 mb-3">
          <h2 className="text-xs text-gold mb-2">背景</h2>
          {life.background.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {line}
            </p>
          ))}
        </section>

        <section className="rpg-box p-4 mb-3">
          <h2 className="text-xs text-gold mb-2">與長輩的故事</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {CONTENT.bosses.map((boss) => (
              <li key={boss.id}>
                <span className="text-text-muted">{boss.name}：</span>
                {life.relations[boss.id]}
              </li>
            ))}
          </ul>
        </section>

        <section className="rpg-box p-4 mb-3">
          <h2 className="text-xs text-gold mb-2">強項</h2>
          <ul className="text-sm text-heal list-disc pl-4">
            {life.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <h2 className="text-xs text-gold mt-3 mb-2">弱點</h2>
          <ul className="text-sm text-damage list-disc pl-4">
            {life.weaknesses.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        {modifierLines.length > 0 && (
          <section className="rpg-box p-4 mb-3">
            <h2 className="text-xs text-gold mb-2">數值修正</h2>
            <ul className="text-sm text-text-muted flex flex-col gap-1">
              {modifierLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="px-4 pb-4 safe-pb">
        <PrimaryButton onClick={onStart}>用這個人生開戰</PrimaryButton>
      </div>
    </div>
  );
}
