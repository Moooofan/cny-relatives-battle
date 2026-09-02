import { describe, expect, test } from "vitest";
import { PLAYER_MAX_HP, SPECIALS } from "@/engine/archetypes";
import { advance, applyOption, createGame, makeResultCode, applySpecial } from "@/engine/reducer";
import type { GameState } from "@/engine/types";
import {
  FIXTURE_CONTENT,
  FIXTURE_CONTENT_NO_LIVES,
  FIXTURE_LIVES,
  fakeLogEntry,
  finalRetortState,
  findOptionId,
} from "./fixtures";

describe("life: damage multipliers", () => {
  test("a topic scale multiplies dealt damage", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "life-dealt", { bossId: "sanjiuma", lifeId: "life-fixture-a" });
    s = advance(FIXTURE_CONTENT, s);
    const hpBefore = s.bossHp;
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "perfect"));
    // question topic is salary_job -> life-fixture-a's topic.salary_job.perfect.dealt = 1.3
    expect(hpBefore - s.bossHp).toBe(Math.round(25 * 1.3));
    expect(s.log[s.log.length - 1].lifeDealtMult).toBe(1.3);
    expect(s.log[s.log.length - 1].lifeTakenMult).toBe(1);
  });

  test("a boss scale multiplies taken damage", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "life-taken", { bossId: "ama", lifeId: "life-fixture-a" });
    s = advance(FIXTURE_CONTENT, s);
    const hpBefore = s.playerHp;
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "landmine"));
    // base 35 * hard power 1.5 * life-fixture-a's boss.ama.landmine.taken 1.5
    expect(hpBefore - s.playerHp).toBe(Math.round(35 * 1.5 * 1.5));
    expect(s.log[s.log.length - 1].lifeTakenMult).toBe(1.5);
  });

  test("the plain life (no modifiers) applies neutral 1x multipliers", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "life-plain", { bossId: "sanjiuma", lifeId: "life-fixture-b" });
    s = advance(FIXTURE_CONTENT, s);
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "perfect"));
    expect(s.log[s.log.length - 1].lifeDealtMult).toBe(1);
    expect(s.log[s.log.length - 1].lifeTakenMult).toBe(1);
  });
});

describe("life: startHp and specials", () => {
  test("startHp sets playerMaxHp and the starting playerHp", () => {
    const s = createGame(FIXTURE_CONTENT, "random", "life-hp", { bossId: "sanjiuma", lifeId: "life-fixture-a" });
    expect(s.playerMaxHp).toBe(90);
    expect(s.playerHp).toBe(90);
  });

  test("extraSpecials adds to the per-run allotment", () => {
    const withLife = createGame(FIXTURE_CONTENT, "random", "extra-specials", {
      bossId: "sanjiuma",
      lifeId: "life-fixture-a",
    });
    expect(withLife.specials).toEqual({ skip: SPECIALS.skip.perRun, heal: SPECIALS.heal.perRun + 1 });

    const withoutExtra = createGame(FIXTURE_CONTENT, "random", "no-extra-specials", {
      bossId: "sanjiuma",
      lifeId: "life-fixture-b",
    });
    expect(withoutExtra.specials).toEqual({ skip: SPECIALS.skip.perRun, heal: SPECIALS.heal.perRun });
  });

  test("the heal special never pushes playerHp above playerMaxHp", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "heal-cap", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);
    const low: GameState = { ...s, playerHp: 50, playerMaxHp: 60, specials: { ...s.specials, heal: 1 } };
    const healed = applySpecial(FIXTURE_CONTENT, low, "heal");
    expect(healed.playerHp).toBe(60); // 50 + SPECIALS.heal.amount(25) would be 75, capped at 60
  });
});

describe("life selection", () => {
  test("an unknown lifeId falls back to an rng pick from content.lives", () => {
    const s = createGame(FIXTURE_CONTENT, "random", "unknown-life-seed", {
      bossId: "sanjiuma",
      lifeId: "does-not-exist",
    });
    expect(s.lifeId).not.toBeNull();
    expect(FIXTURE_LIVES.some((l) => l.id === s.lifeId)).toBe(true);
  });

  test("an empty lives array means lifeId is null and every life multiplier is a no-op", () => {
    let s = createGame(FIXTURE_CONTENT_NO_LIVES, "random", "no-lives-seed", { bossId: "sanjiuma" });
    expect(s.lifeId).toBeNull();
    expect(s.playerMaxHp).toBe(PLAYER_MAX_HP);

    s = advance(FIXTURE_CONTENT_NO_LIVES, s);
    s = applyOption(FIXTURE_CONTENT_NO_LIVES, s, findOptionId(FIXTURE_CONTENT_NO_LIVES, s.currentQuestionId!, "perfect"));
    expect(s.log[s.log.length - 1].lifeDealtMult).toBe(1);
    expect(s.log[s.log.length - 1].lifeTakenMult).toBe(1);
  });

  test("daily mode deterministically picks the same life for the same date seed", () => {
    const a = createGame(FIXTURE_CONTENT, "daily", "daily-2026-09-03");
    const b = createGame(FIXTURE_CONTENT, "daily", "daily-2026-09-03");
    expect(a.lifeId).toBe(b.lifeId);
    expect(a.bossQueue).toEqual(b.bossQueue);
  });

  test("daily mode still respects an explicit lifeId override", () => {
    const s = createGame(FIXTURE_CONTENT, "daily", "daily-2026-09-03", { lifeId: "life-fixture-b" });
    expect(s.lifeId).toBe("life-fixture-b");
  });
});

describe("makeResultCode", () => {
  test("is deterministic for identical inputs and a 4-char base36 suffix", () => {
    const code1 = makeResultCode("L01", "seed", 100, 5);
    const code2 = makeResultCode("L01", "seed", 100, 5);
    expect(code1).toBe(code2);
    expect(code1).toMatch(/^L01-[0-9A-Z]{4}$/);
  });

  test("differs when score or turns differ", () => {
    expect(makeResultCode("L01", "seed", 100, 5)).not.toBe(makeResultCode("L01", "seed", 100, 6));
    expect(makeResultCode("L01", "seed", 100, 5)).not.toBe(makeResultCode("L01", "seed", 101, 5));
  });

  test("story result.resultCode is prefixed with the run's life code", () => {
    const state = finalRetortState({ log: [fakeLogEntry("ama", "perfect")], lifeId: "life-fixture-a" });
    let s = advance(FIXTURE_CONTENT, state);
    s = advance(FIXTURE_CONTENT, s);
    expect(s.result?.resultCode.startsWith("LFA-")).toBe(true);
  });

  test("no life falls back to the L00 prefix", () => {
    const state = finalRetortState({ log: [fakeLogEntry("ama", "perfect")], lifeId: null });
    let s = advance(FIXTURE_CONTENT, state);
    s = advance(FIXTURE_CONTENT, s);
    expect(s.result?.resultCode.startsWith("L00-")).toBe(true);
  });
});
