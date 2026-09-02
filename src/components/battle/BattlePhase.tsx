import { CONTENT } from "@/content";
import type { GameState, Life } from "@/engine/types";
import { BossIntro } from "@/components/battle/BossIntro";
import { SceneCard } from "@/components/battle/SceneCard";
import { TurnView } from "@/components/battle/TurnView";
import { RetortView } from "@/components/battle/RetortView";
import { OutcomeView } from "@/components/battle/OutcomeView";

interface Props {
  state: GameState;
  life?: Life;
  timerEndsAt: number | null;
  onFight: () => void;
  onContinue: () => void;
  onPick: (optionId: string) => void;
  onTimeout: () => void;
  onUseSpecial: (kind: "skip" | "heal") => void;
}

const LOADING = <div className="flex flex-1 items-center justify-center text-text-muted">載入中…</div>;

const ACT_CN = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

/** 「第一幕 · 除夕夜圍爐」 caption for story mode only; undefined elsewhere. */
function storyActCaption(state: GameState): string | undefined {
  if (state.mode !== "story" || state.act == null) return undefined;
  const act = CONTENT.acts.find((a) => a.act === state.act);
  if (!act) return undefined;
  const num = ACT_CN[act.act] ?? String(act.act);
  return `第${num}幕 · ${act.title}`;
}

export function BattlePhase({ state, life, timerEndsAt, onFight, onContinue, onPick, onTimeout, onUseSpecial }: Props) {
  const actCaption = storyActCaption(state);

  if (state.phase === "interlude") {
    return <SceneCard lines={state.interludeText ?? []} header={actCaption} onContinue={onContinue} />;
  }

  const boss = CONTENT.bosses.find((b) => b.id === state.bossQueue[state.bossIndex]);
  if (!boss) return LOADING;

  if (state.phase === "intro") {
    return <BossIntro boss={boss} life={life} actCaption={actCaption} onFight={onFight} />;
  }

  if (state.phase === "bossDefeated" || state.phase === "playerDefeated") {
    return (
      <OutcomeView
        boss={boss}
        outcome={state.phase}
        turns={state.turns}
        dealt={state.damageDealt}
        maxCombo={state.maxCombo}
        onContinue={onContinue}
      />
    );
  }

  if (state.phase === "turn" && state.currentQuestionId) {
    const question = CONTENT.questions.find((q) => q.id === state.currentQuestionId);
    if (!question) return LOADING;
    const options = state.optionOrder
      .map((id) => question.options.find((o) => o.id === id))
      .filter((o): o is NonNullable<typeof o> => !!o);
    const summonedBoss = state.pendingSummonBossId
      ? CONTENT.bosses.find((b) => b.id === state.pendingSummonBossId)
      : undefined;

    return (
      <TurnView
        boss={boss}
        life={life}
        actCaption={actCaption}
        summonedBoss={summonedBoss}
        questionText={question.text}
        options={options}
        bossHp={state.bossHp}
        bossMaxHp={state.bossMaxHp}
        playerHp={state.playerHp}
        playerMaxHp={state.playerMaxHp}
        combo={state.combo}
        followUp={state.followUp}
        specials={state.specials}
        timerEndsAt={timerEndsAt}
        lastResolve={state.lastResolve}
        turnKey={state.turns}
        onPick={onPick}
        onTimeout={onTimeout}
        onUseSpecial={onUseSpecial}
      />
    );
  }

  if (state.phase === "retort" && state.lastResolve) {
    const lastLog = state.log[state.log.length - 1];
    const question = CONTENT.questions.find((q) => q.id === lastLog?.questionId);
    const option = question?.options.find((o) => o.id === state.lastResolve!.optionId);
    const retortText = option?.retort ?? "（你猶豫太久，只好乾笑帶過……）";

    return (
      <RetortView
        boss={boss}
        life={life}
        actCaption={actCaption}
        retortText={retortText}
        resolve={state.lastResolve}
        animKey={state.turns}
        bossHp={state.bossHp}
        bossMaxHp={state.bossMaxHp}
        playerHp={state.playerHp}
        playerMaxHp={state.playerMaxHp}
        combo={state.combo}
        onNext={onContinue}
      />
    );
  }

  return null;
}
