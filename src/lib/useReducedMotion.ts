"use client";

import { useSyncExternalStore } from "react";
import { useSettingsStore } from "@/store/settingsStore";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return typeof window === "undefined" ? false : window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/** True when animations (typewriter, shake, flash) should be skipped: either
 * the OS-level `prefers-reduced-motion` is set, or the user forced it on in
 * settings. Numbers/HP still update instantly either way. */
export function useReducedMotion(): boolean {
  const forced = useSettingsStore((s) => s.reducedMotion === "on");
  const osReduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return forced || osReduced;
}
