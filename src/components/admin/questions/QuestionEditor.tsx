"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Archetype, Boss, BossId, Question, Topic } from "@/engine/types";
import { ARCHETYPES, TOPICS } from "@/engine/types";
import { ARCHETYPE_TABLE, OPTION_RECIPE, OPTIONS_PER_QUESTION } from "@/engine/archetypes";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";
import { ctaClassName } from "@/components/common/PrimaryButton";
import { isSupabaseEnabled, adminUpsertQuestion, adminDeleteQuestion, adminRestoreQuestion } from "@/lib/adminSupabase";
import { useContentStore } from "@/store/contentStore";
import type { AdminQuestionEntry } from "@/lib/contentOverrides";

const QUESTION_TEXT_MAX = 32;
const OPTION_TEXT_MAX = 30;
const letterFor = (i: number) => String.fromCharCode(97 + i);
const codePointLength = (s: string): number => Array.from(s).length;

function makeCustomId(topic: Topic): string {
  return `custom-${topic}-${Date.now().toString(36)}`;
}

interface EditableOption {
  text: string;
  archetype: Archetype;
  retort: string;
}

function emptyOptions(): EditableOption[] {
  return Array.from({ length: OPTIONS_PER_QUESTION }, () => ({ text: "", archetype: "deflect" as Archetype, retort: "" }));
}

function countByArchetype(options: EditableOption[]): Record<Archetype, number> {
  const counts: Record<Archetype, number> = { perfect: 0, deflect: 0, meek: 0, backfire: 0, landmine: 0 };
  for (const o of options) counts[o.archetype] += 1;
  return counts;
}

function validateForm(text: string, options: EditableOption[]): string[] {
  const issues: string[] = [];
  if (!text.trim()) issues.push("題目攻擊句不能空白");
  else if (codePointLength(text) > QUESTION_TEXT_MAX) issues.push(`題目攻擊句超過 ${QUESTION_TEXT_MAX} 字`);

  options.forEach((o, i) => {
    if (!o.text.trim()) issues.push(`選項 ${i + 1}：內容不能空白`);
    else if (codePointLength(o.text) > OPTION_TEXT_MAX) issues.push(`選項 ${i + 1}：內容超過 ${OPTION_TEXT_MAX} 字`);
    if (!o.retort.trim()) issues.push(`選項 ${i + 1}：回嗆不能空白`);
    else if (codePointLength(o.retort) > OPTION_TEXT_MAX) issues.push(`選項 ${i + 1}：回嗆超過 ${OPTION_TEXT_MAX} 字`);
  });

  const counts = countByArchetype(options);
  for (const a of ARCHETYPES) {
    if (counts[a] !== OPTION_RECIPE[a]) {
      issues.push(`配方不符：「${ARCHETYPE_TABLE[a].label}」應為 ${OPTION_RECIPE[a]} 個，目前 ${counts[a]} 個`);
    }
  }
  return issues;
}

function ToneCheatSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-box border border-border bg-surface-2/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gold"
      >
        酸度規範小抄（docs/TONE_V2.md）
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-2 text-xs text-text-muted leading-relaxed">
          <p>
            <span className="text-arch-perfect">神回覆</span>：Lv.3–4，機智反問／精準數字／點破動機，讀完會讓人想截圖。
          </p>
          <p>
            <span className="text-arch-landmine">踩雷</span>：Lv.4–5，真的難聽，直接戳對方痛處（她的小孩／婚姻／薪水／年紀），可以叫她閉嘴。
          </p>
          <p>
            <span className="text-arch-backfire">反擊失敗</span>：想酸但酸失敗——梗太老、講錯對象、自己先尷尬。
          </p>
          <p>回嗆也要跟著變：神回覆後對方吃癟、踩雷後對方真的被打到、反擊失敗後冷場。</p>
          <p>
            放行：靠北／白目／北七／閉嘴／關你屁事／你兒子呢；仍禁止：生殖器詞、種族／性向／身障／真實疾病、家暴、外遇、指名真實政治人物。
          </p>
          <p>字數上限：題目 ≤32、選項與回嗆各 ≤30。同一關主同一句梗全池最多出現 4 次。</p>
        </div>
      )}
    </div>
  );
}

const selectClass = "h-9 rounded-btn bg-surface-2 border border-border px-2 text-sm text-text";
const inputClass = "rounded-btn bg-surface-2 border border-border px-2 py-1.5 text-sm text-text placeholder:text-text-muted";

export function QuestionEditor({
  entry,
  bosses,
  onClose,
}: {
  /** `null` when creating a brand-new question. */
  entry: AdminQuestionEntry | null;
  bosses: Boss[];
  onClose: () => void;
}) {
  const enabled = isSupabaseEnabled();
  const isCreate = entry === null;
  const base: Question | null = entry?.question ?? null;

  const [topic, setTopic] = useState<Topic>(base?.topic ?? TOPICS[0]);
  const [bossId, setBossId] = useState<string>(base?.bossId ?? "generic");
  const [text, setText] = useState(base?.text ?? "");
  const [options, setOptions] = useState<EditableOption[]>(
    () => base?.options.map((o) => ({ text: o.text, archetype: o.archetype, retort: o.retort })) ?? emptyOptions()
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Only a brand-new question's id follows the topic (nothing references it
  // yet); an existing question's id is fixed once created. Derived (not
  // stored) so changing the topic before the first save just recomputes it.
  const questionId = useMemo(() => (isCreate ? makeCustomId(topic) : (base as Question).id), [isCreate, topic, base]);

  const canRestore = !isCreate && !!entry && !entry.isCustom && (entry.isEdited || entry.isHidden);
  const issues = validateForm(text, options);

  function updateOption(index: number, patch: Partial<EditableOption>) {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  }

  async function handleSave() {
    if (issues.length > 0) {
      setError(issues.join("；"));
      return;
    }
    setSaving(true);
    setError(null);
    const payload: Question = {
      id: questionId,
      text: text.trim(),
      topic,
      ...(bossId !== "generic" ? { bossId: bossId as BossId } : {}),
      options: options.map((o, i) => ({
        id: `${questionId}-${letterFor(i)}`,
        text: o.text.trim(),
        archetype: o.archetype,
        retort: o.retort.trim(),
      })),
    };
    const result = await adminUpsertQuestion(questionId, payload);
    if (!result.ok) {
      setSaving(false);
      setError(result.error);
      return;
    }
    await useContentStore.getState().refresh(true);
    setSaving(false);
    onClose();
  }

  async function handleDelete() {
    setSaving(true);
    setError(null);
    const result = await adminDeleteQuestion(questionId);
    if (!result.ok) {
      setSaving(false);
      setError(result.error);
      return;
    }
    await useContentStore.getState().refresh(true);
    setSaving(false);
    onClose();
  }

  async function handleRestore() {
    setSaving(true);
    setError(null);
    const result = await adminRestoreQuestion(questionId);
    if (!result.ok) {
      setSaving(false);
      setError(result.error);
      return;
    }
    await useContentStore.getState().refresh(true);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-bg">
      <div className="flex items-center justify-between px-4 pt-4 pb-2 safe-pt border-b border-border">
        <h2 className="font-display text-lg text-gold">{isCreate ? "新增題目" : "編輯題目"}</h2>
        <button type="button" onClick={onClose} className="text-sm text-text-muted" aria-label="關閉">
          關閉 ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {!enabled && (
          <p className="rounded-box border border-gold/40 bg-gold/10 px-3 py-2 text-xs text-gold">
            尚未設定 Supabase，這裡的變更無法儲存到雲端；表單仍可用來預覽格式。
          </p>
        )}

        <p className="text-xs text-text-muted font-mono tabular">id：{questionId}</p>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-text-muted">攻擊句</label>
            <span className={`text-xs tabular ${codePointLength(text) > QUESTION_TEXT_MAX ? "text-primary" : "text-text-muted"}`}>
              {codePointLength(text)}/{QUESTION_TEXT_MAX}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">主題</label>
            <select className={selectClass} value={topic} onChange={(e) => setTopic(e.target.value as Topic)}>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {TOPIC_LABELS[t]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">關主</label>
            <select className={selectClass} value={bossId} onChange={(e) => setBossId(e.target.value)}>
              <option value="generic">通用</option>
              {bosses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ToneCheatSheet />

        <div className="flex flex-col gap-2">
          <p className="text-xs text-text-muted">
            8 個選項（神回覆 1、踩雷 1、四兩撥千斤 2、乖乖回答 2、反擊失敗 2）
          </p>
          {options.map((o, i) => (
            <div key={i} className="rounded-box border border-border bg-surface-2/40 p-2 flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-text-muted font-mono tabular">
                  {questionId}-{letterFor(i)}
                </span>
                <select
                  className={selectClass}
                  value={o.archetype}
                  onChange={(e) => updateOption(i, { archetype: e.target.value as Archetype })}
                >
                  {ARCHETYPES.map((a) => (
                    <option key={a} value={a}>
                      {ARCHETYPE_TABLE[a].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-text-muted">玩家回應</label>
                  <span className={`text-xs tabular ${codePointLength(o.text) > OPTION_TEXT_MAX ? "text-primary" : "text-text-muted"}`}>
                    {codePointLength(o.text)}/{OPTION_TEXT_MAX}
                  </span>
                </div>
                <input className={inputClass} value={o.text} onChange={(e) => updateOption(i, { text: e.target.value })} />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-text-muted">關主反應（回嗆）</label>
                  <span className={`text-xs tabular ${codePointLength(o.retort) > OPTION_TEXT_MAX ? "text-primary" : "text-text-muted"}`}>
                    {codePointLength(o.retort)}/{OPTION_TEXT_MAX}
                  </span>
                </div>
                <input className={inputClass} value={o.retort} onChange={(e) => updateOption(i, { retort: e.target.value })} />
              </div>
            </div>
          ))}
        </div>

        {issues.length > 0 && (
          <ul className="text-xs text-primary list-disc pl-5">
            {issues.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
        {error && <p className="text-xs text-primary">{error}</p>}
      </div>

      <div className="px-4 py-3 border-t border-border safe-pb flex flex-col gap-2">
        {confirmDelete ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-text">確定要隱藏這題嗎？隱藏後玩家不會再抽到它。</p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={saving || !enabled}
                onClick={handleDelete}
                className={ctaClassName("primary", "flex-1")}
              >
                確定隱藏
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className={ctaClassName("ghost", "flex-1")}>
                取消
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              disabled={saving || !enabled || issues.length > 0}
              onClick={handleSave}
              className={ctaClassName("primary", "flex-1 min-w-[96px]")}
            >
              {saving ? "處理中…" : "儲存"}
            </button>
            {!isCreate && (
              <button
                type="button"
                disabled={saving || !enabled}
                onClick={() => setConfirmDelete(true)}
                className={ctaClassName("ghost", "flex-1 min-w-[96px]")}
              >
                刪除／隱藏
              </button>
            )}
            {canRestore && (
              <button
                type="button"
                disabled={saving || !enabled}
                onClick={handleRestore}
                className={ctaClassName("ghost", "flex-1 min-w-[96px]")}
              >
                還原內建
              </button>
            )}
            <button type="button" onClick={onClose} className={ctaClassName("ghost", "flex-1 min-w-[96px]")}>
              取消
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
