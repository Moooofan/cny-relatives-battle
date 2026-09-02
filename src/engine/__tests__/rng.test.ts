import { describe, expect, test } from "vitest";
import { hashSeed, mulberry32, pick, shuffle } from "@/engine/rng";

describe("rng", () => {
  test("hashSeed is deterministic and sensitive to the whole string", () => {
    expect(hashSeed("daily-2026-09-03")).toBe(hashSeed("daily-2026-09-03"));
    expect(hashSeed("daily-2026-09-03")).not.toBe(hashSeed("daily-2026-09-04"));
  });

  test("mulberry32 is a pure, deterministic step function", () => {
    const [f1, s1] = mulberry32(12345);
    const [f2, s2] = mulberry32(12345);
    expect(f1).toBe(f2);
    expect(s1).toBe(s2);
    expect(f1).toBeGreaterThanOrEqual(0);
    expect(f1).toBeLessThan(1);

    const [f3] = mulberry32(s1);
    expect(f3).not.toBe(f1);
  });

  test("shuffle is deterministic for the same state and returns a permutation", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const [out1, s1] = shuffle(arr, 42);
    const [out2, s2] = shuffle(arr, 42);
    expect(out1).toEqual(out2);
    expect(s1).toBe(s2);
    expect([...out1].sort()).toEqual([...arr].sort());
  });

  test("shuffle does not mutate its input", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr, 1);
    expect(arr).toEqual(copy);
  });

  test("pick is deterministic and only returns elements from the array", () => {
    const arr = ["a", "b", "c"];
    const [v1, s1] = pick(arr, 7);
    const [v2, s2] = pick(arr, 7);
    expect(v1).toBe(v2);
    expect(s1).toBe(s2);
    expect(arr).toContain(v1);
  });
});
