"use client";

import { useEffect, useRef, useState } from "react";
import { TURN_SECONDS } from "@/engine/archetypes";
import { playSfx } from "@/lib/sfx";
import { useSettingsStore } from "@/store/settingsStore";

interface Props {
  endsAt: number;
  onExpire: () => void;
}

const TOTAL_MS = TURN_SECONDS * 1000;

/** Thin bar under the dialogue box, shrinking left→right; turns `primary`
 * under 5s. Plays a tick sfx for the last 3 whole seconds. */
export function TurnTimer({ endsAt, onExpire }: Props) {
  const sfxEnabled = useSettingsStore((s) => s.sfx);
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, endsAt - Date.now()));
  const expiredRef = useRef(false);
  const lastTickSecondRef = useRef<number | null>(null);

  useEffect(() => {
    expiredRef.current = false;
    lastTickSecondRef.current = null;
    const id = setInterval(() => {
      const left = Math.max(0, endsAt - Date.now());
      setRemainingMs(left);

      const secondsLeft = Math.ceil(left / 1000);
      if (secondsLeft <= 3 && secondsLeft >= 1 && lastTickSecondRef.current !== secondsLeft) {
        lastTickSecondRef.current = secondsLeft;
        playSfx("tick", sfxEnabled);
      }

      if (left <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire();
      }
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  const pct = Math.max(0, Math.min(100, (remainingMs / TOTAL_MS) * 100));
  const urgent = remainingMs <= 5000;

  return (
    <div className="h-[3px] w-full bg-surface-2 overflow-hidden" role="presentation">
      <div
        className={`h-full transition-[width] duration-100 linear ${urgent ? "bg-primary" : "bg-gold"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
