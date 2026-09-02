/**
 * Pure, deterministic RNG. No global state, no classes — the rng state is
 * always a single `number` threaded explicitly through GameState so that the
 * same seed always produces the exact same run.
 */

/**
 * Turn an arbitrary string seed (e.g. "daily-2026-09-03") into a 32-bit
 * unsigned integer usable as mulberry32 state. Based on the common
 * "xmur3"-style string hash.
 */
export function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  h ^= h >>> 16;
  return h >>> 0;
}

/**
 * One mulberry32 step. Pure: takes the current state, returns
 * `[float in [0,1), nextState]`. Calling it again with `nextState` continues
 * the exact same sequence a stateful mulberry32(seed)() generator would
 * produce.
 */
export function mulberry32(state: number): [number, number] {
  const nextState = (state + 0x6d2b79f5) >>> 0;
  let t = nextState;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const float = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return [float, nextState];
}

/** Fisher-Yates shuffle, pure, threading rng state through. */
export function shuffle<T>(arr: readonly T[], state: number): [T[], number] {
  const result = arr.slice();
  let s = state;
  for (let i = result.length - 1; i > 0; i--) {
    const [f, next] = mulberry32(s);
    s = next;
    const j = Math.floor(f * (i + 1));
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return [result, s];
}

/** Pick one random element, pure, threading rng state through. */
export function pick<T>(arr: readonly T[], state: number): [T, number] {
  if (arr.length === 0) {
    throw new Error("pick: cannot pick from an empty array");
  }
  const [f, next] = mulberry32(state);
  const idx = Math.floor(f * arr.length);
  return [arr[idx], next];
}
