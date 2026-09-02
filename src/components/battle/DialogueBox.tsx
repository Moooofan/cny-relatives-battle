"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const MS_PER_CHAR = 18;

interface Props {
  text: string;
  speaker?: string;
  onDone?: () => void;
}

/** RPG dialogue frame with a skippable typewriter reveal (18ms/char). */
export function DialogueBox({ text, speaker, onDone }: Props) {
  const reducedMotion = useReducedMotion();
  const resetKey = `${text}::${reducedMotion}`;
  const [renderedKey, setRenderedKey] = useState(resetKey);
  const [shown, setShown] = useState(() => (reducedMotion ? text.length : 0));
  const doneRef = useRef(reducedMotion);

  // "Adjusting state when a prop changes" (react.dev pattern): reset the
  // reveal synchronously during render instead of in an effect, so the first
  // paint for a new line is never one frame behind. `doneRef` is only ever
  // written inside the effect/handlers below, never here during render.
  if (resetKey !== renderedKey) {
    setRenderedKey(resetKey);
    setShown(reducedMotion ? text.length : 0);
  }

  useEffect(() => {
    doneRef.current = reducedMotion;
    if (reducedMotion) {
      onDone?.();
      return;
    }
    const id = setInterval(() => {
      setShown((n) => {
        const next = Math.min(text.length, n + 1);
        if (next >= text.length && !doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
        return next;
      });
    }, MS_PER_CHAR);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedKey]);

  function handleTap(): void {
    if (shown < text.length) {
      setShown(text.length);
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleTap}
      className="rpg-box w-full p-4 text-left"
      aria-label="對話框，點擊可跳過打字動畫"
    >
      {speaker && <p className="text-xs text-gold mb-1">{speaker}</p>}
      <p className="text-base leading-relaxed whitespace-pre-wrap min-h-[3lh]">{text.slice(0, shown)}</p>
    </button>
  );
}
