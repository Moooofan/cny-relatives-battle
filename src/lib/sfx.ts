/**
 * Oscillator-based beeps — no audio files. Must be unlocked by a user gesture
 * before any sound plays (browsers block autoplay); call `unlockAudio()` from
 * the first tap/click handler in the app.
 */

export type SfxName = "hit" | "crit" | "hurt" | "landmine" | "heal" | "win" | "lose" | "tick";

interface Tone {
  freq: number;
  duration: number;
  type: OscillatorType;
  gain?: number;
}

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

const PATTERNS: Record<SfxName, Tone[]> = {
  hit: [{ freq: 520, duration: 0.08, type: "square" }],
  crit: [
    { freq: 660, duration: 0.06, type: "square" },
    { freq: 880, duration: 0.14, type: "square" },
  ],
  hurt: [{ freq: 180, duration: 0.12, type: "sawtooth" }],
  landmine: [
    { freq: 130, duration: 0.16, type: "sawtooth" },
    { freq: 90, duration: 0.22, type: "sawtooth" },
  ],
  heal: [
    { freq: 660, duration: 0.1, type: "sine" },
    { freq: 880, duration: 0.16, type: "sine" },
  ],
  win: [
    { freq: 523, duration: 0.1, type: "triangle" },
    { freq: 659, duration: 0.1, type: "triangle" },
    { freq: 784, duration: 0.22, type: "triangle" },
  ],
  lose: [
    { freq: 392, duration: 0.16, type: "sawtooth" },
    { freq: 262, duration: 0.28, type: "sawtooth" },
  ],
  tick: [{ freq: 880, duration: 0.035, type: "square", gain: 0.12 }],
};

let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor = window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

/** Call from inside a user-gesture handler (first tap) so later programmatic
 * sounds are allowed to play. Safe to call repeatedly. */
export function unlockAudio(): void {
  if (unlocked) return;
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  unlocked = true;
}

function playTone(c: AudioContext, tone: Tone, when: number): void {
  const osc = c.createOscillator();
  const gainNode = c.createGain();
  osc.type = tone.type;
  osc.frequency.value = tone.freq;
  const peak = tone.gain ?? 0.2;
  gainNode.gain.setValueAtTime(peak, when);
  gainNode.gain.exponentialRampToValueAtTime(0.001, when + tone.duration);
  osc.connect(gainNode);
  gainNode.connect(c.destination);
  osc.start(when);
  osc.stop(when + tone.duration + 0.02);
}

/** Play a named sfx. No-op when `enabled` is false or audio isn't available. */
export function playSfx(name: SfxName, enabled: boolean): void {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  let t = c.currentTime;
  for (const tone of PATTERNS[name]) {
    playTone(c, tone, t);
    t += tone.duration * 0.85;
  }
}
