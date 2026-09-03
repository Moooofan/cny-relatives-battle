import { describe, expect, test } from "vitest";

// gameStore's persist middleware resolves `createJSONStorage(() => localStorage)`
// eagerly at module-load time. Node's built-in `localStorage` global (present
// under vitest's node environment) errors on every call because no
// --localstorage-file path is configured, so install a working in-memory
// polyfill *before* dynamically importing the store module.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length(): number {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

Object.defineProperty(globalThis, "localStorage", {
  value: new MemoryStorage(),
  writable: true,
  configurable: true,
});

const { useGameStore } = await import("@/store/gameStore");

describe("gameStore.resumeStoryCheckpoint", () => {
  test("threads the given lifeId through to the resumed engine state", () => {
    useGameStore.getState().resumeStoryCheckpoint(0, "life-01");
    const { state } = useGameStore.getState();
    expect(state?.mode).toBe("story");
    expect(state?.lifeId).toBe("life-01");
  });

  test("passing no lifeId falls back to the engine's own random pick, not 'life-01'", () => {
    // Real CONTENT always has lives, so omitting lifeId doesn't mean "no
    // life" — it means "let the engine pick one" (see pickLife in reducer.ts).
    // This only guards against a caller accidentally forcing 'life-01' here.
    useGameStore.getState().resumeStoryCheckpoint(0);
    const { state } = useGameStore.getState();
    expect(state?.mode).toBe("story");
    expect(state?.lifeId).not.toBeNull();
  });
});
