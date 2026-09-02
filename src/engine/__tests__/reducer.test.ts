import { describe, expect, test } from "vitest";
import { DEFAULT_LANDMINE_HEAL, GAUNTLET, SPECIALS } from "@/engine/archetypes";
import { advance, applyOption, applyTimeout, createGame, useSpecial } from "@/engine/reducer";
import type { Archetype, GameState, TurnLog } from "@/engine/types";
import { FIXTURE_CONTENT, fightWithArchetypes, findOptionId, progressPastNonTurnPhases } from "./fixtures";

describe("createGame + startBoss (via advance from 'intro')", () => {
  test("random mode with an explicit bossId sets up the right boss", () => {
    const s = createGame(FIXTURE_CONTENT, "random", "seed-1", { bossId: "sanjiuma" });
    expect(s.phase).toBe("intro");
    expect(s.bossQueue).toEqual(["sanjiuma"]);

    const started = advance(FIXTURE_CONTENT, s);
    expect(started.phase).toBe("turn");
    expect(started.bossMaxHp).toBe(130); // hard tier
    expect(started.bossHp).toBe(130);
    expect(started.playerHp).toBe(100);
    expect(started.currentQuestionId).toBeDefined();
    expect(started.optionOrder).toHaveLength(8);
  });

  test("gauntlet mode queues all bosses sorted by order", () => {
    const s = createGame(FIXTURE_CONTENT, "gauntlet", "seed-2");
    expect(s.bossQueue).toEqual(["xiao-biaodi", "sanjiuma", "ama"]);
  });
});

describe("worked example (docs/PLAN.md §1): sanjiuma hard x1.5", () => {
  test("perfect, deflect, perfect, perfect(crit), perfect kills a 130 HP boss in 5 turns, player at 92 HP", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "worked-example", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);

    const sequence: Archetype[] = ["perfect", "deflect", "perfect", "perfect", "perfect"];
    for (let i = 0; i < sequence.length; i++) {
      const optionId = findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, sequence[i]);
      s = applyOption(FIXTURE_CONTENT, s, optionId);
      if (i < sequence.length - 1) s = advance(FIXTURE_CONTENT, s);
    }

    expect(s.turns).toBe(5);
    expect(s.bossHp).toBeLessThanOrEqual(0);
    expect(s.playerHp).toBe(92);
    expect(s.log.some((l) => l.crit)).toBe(true);
    expect(s.log.filter((l) => l.crit)).toHaveLength(1);
  });
});

describe("landmine", () => {
  test("heals the boss and resets combo", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "landmine-combo", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);

    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "perfect"));
    expect(s.combo).toBe(1);
    s = advance(FIXTURE_CONTENT, s);

    const hpBeforeLandmine = s.bossHp;
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "landmine"));

    expect(s.combo).toBe(0);
    expect(s.bossHp).toBe(Math.min(130, hpBeforeLandmine + DEFAULT_LANDMINE_HEAL));
    expect(s.landmineCount).toBe(1);
  });

  test("xiao-biaodi doubles landmine damage taken", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "biaodi-landmine", { bossId: "xiao-biaodi" });
    s = advance(FIXTURE_CONTENT, s);

    const hpBefore = s.playerHp;
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "landmine"));
    // base taken 35 * easy power 1.0 * takenMultiplier.landmine 2 = 70
    expect(hpBefore - s.playerHp).toBe(70);
  });
});

describe("ama modifiers", () => {
  test("halves perfect damage dealt", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "ama-perfect", { bossId: "ama" });
    s = advance(FIXTURE_CONTENT, s);

    const hpBefore = s.bossHp;
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "perfect"));
    // round(25 * 0.5) = 13
    expect(hpBefore - s.bossHp).toBe(13);
  });

  test("heals 20 (not the default 10) on landmine", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "ama-landmine", { bossId: "ama" });
    s = advance(FIXTURE_CONTENT, s);

    const hpBefore = s.bossHp;
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "landmine"));
    expect(s.bossHp).toBe(Math.min(130, hpBefore + 20));
  });
});

describe("followUpOnMeek", () => {
  test("sanjiuma sets followUp on a meek answer", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "followup-yes", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "meek"));
    expect(s.followUp).toBe(true);
  });

  test("a boss without the modifier does not set followUp", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "followup-no", { bossId: "xiao-biaodi" });
    s = advance(FIXTURE_CONTENT, s);
    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "meek"));
    expect(s.followUp).toBe(false);
  });
});

describe("summonAtHalf", () => {
  test("ama draws one question from a previously defeated boss once HP crosses half", () => {
    let s = createGame(FIXTURE_CONTENT, "gauntlet", "summon-test");
    s = advance(FIXTURE_CONTENT, s); // intro -> turn (xiao-biaodi)
    s = fightWithArchetypes(FIXTURE_CONTENT, s, ["perfect"]);
    s = progressPastNonTurnPhases(FIXTURE_CONTENT, s); // -> turn (sanjiuma)
    s = fightWithArchetypes(FIXTURE_CONTENT, s, ["perfect"]);
    s = progressPastNonTurnPhases(FIXTURE_CONTENT, s); // -> turn (ama)

    expect(s.bossQueue[s.bossIndex]).toBe("ama");

    let guard = 0;
    while (s.bossHp > s.bossMaxHp / 2 && s.phase === "turn" && guard++ < 50) {
      s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "deflect"));
      s = advance(FIXTURE_CONTENT, s);
    }

    expect(s.phase).toBe("turn");
    expect(s.summonUsed).toBe(true);
    expect(s.pendingSummonBossId).toBeDefined();
    const summonedFrom = s.pendingSummonBossId;
    expect(["xiao-biaodi", "sanjiuma"]).toContain(summonedFrom);

    s = applyOption(FIXTURE_CONTENT, s, findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "perfect"));
    expect(s.log[s.log.length - 1].summonedBossId).toBe(summonedFrom);
    expect(s.pendingSummonBossId).toBeUndefined(); // consumed
  });

  test("reuseMeekQuestions moves a previously-meek'd question to the front of ama's deck", () => {
    const state: GameState = {
      mode: "random",
      seed: "reuse-meek",
      rng: 0,
      phase: "intro",
      bossQueue: ["ama"],
      bossIndex: 0,
      bossHp: 0,
      bossMaxHp: 0,
      playerHp: 100,
      combo: 0,
      maxCombo: 0,
      deck: [],
      optionOrder: [],
      specials: { skip: 1, heal: 1 },
      log: [],
      bossesDefeated: 0,
      damageDealt: 0,
      turns: 0,
      landmineCount: 0,
      meekQuestionIds: ["generic-food_push-001"], // part of ama's 2-question pool
      summonUsed: false,
      followUp: false,
      activeModifiers: {},
    };
    const started = advance(FIXTURE_CONTENT, state);
    expect(started.currentQuestionId).toBe("generic-food_push-001");
  });
});

describe("gauntlet heal / rest flow", () => {
  function gauntletState(overrides: Partial<GameState>): GameState {
    return {
      mode: "gauntlet",
      seed: "g",
      rng: 0,
      phase: "bossDefeated",
      bossQueue: ["xiao-biaodi", "sanjiuma", "ama"],
      bossIndex: 0,
      bossHp: 0,
      bossMaxHp: 60,
      playerHp: 50,
      combo: 0,
      maxCombo: 0,
      deck: [],
      optionOrder: [],
      specials: { skip: 1, heal: 1 },
      log: [],
      bossesDefeated: 1,
      damageDealt: 0,
      turns: 5,
      landmineCount: 0,
      meekQuestionIds: [],
      summonUsed: false,
      followUp: false,
      activeModifiers: {},
      ...overrides,
    };
  }

  test("a normal win (not a multiple of restEvery) heals and moves to the next boss's intro", () => {
    const state = gauntletState({ bossIndex: 0, bossesDefeated: 1, playerHp: 50 });
    const next = advance(FIXTURE_CONTENT, state);
    expect(next.phase).toBe("intro");
    expect(next.bossIndex).toBe(1);
    expect(next.playerHp).toBe(Math.min(100, 50 + GAUNTLET.healPerWin));
  });

  test("every restEvery-th win, with more bosses left, opens a rest stop with extra heal + 1 heal charge", () => {
    const state = gauntletState({
      bossQueue: ["xiao-biaodi", "sanjiuma", "ama", "xiao-biaodi", "sanjiuma", "ama"],
      bossIndex: 2,
      bossesDefeated: GAUNTLET.restEvery,
      playerHp: 40,
      specials: { skip: 0, heal: 0 },
    });
    const next = advance(FIXTURE_CONTENT, state);
    expect(next.phase).toBe("interlude");
    expect(next.playerHp).toBe(Math.min(100, 40 + GAUNTLET.healPerWin + GAUNTLET.restHeal));
    expect(next.specials.heal).toBe(1);
    expect(next.interludeText).toEqual(["休息站：偷溜去便利商店"]);
  });

  test("defeating the last boss always goes straight to result, even on a rest-multiple", () => {
    const state = gauntletState({
      bossIndex: 2,
      bossesDefeated: GAUNTLET.restEvery,
      playerHp: 50,
    });
    const next = advance(FIXTURE_CONTENT, state);
    expect(next.phase).toBe("result");
    expect(next.result).toBeDefined();
  });

  test("leaving a rest stop moves on to the next boss's intro", () => {
    const state = gauntletState({ phase: "interlude", bossIndex: 0, bossesDefeated: 3 });
    const next = advance(FIXTURE_CONTENT, state);
    expect(next.phase).toBe("intro");
    expect(next.bossIndex).toBe(1);
  });
});

describe("specials", () => {
  test("skip only works in 'turn' with a charge left, costs no HP, and draws the next question", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "skip-ok", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);
    const bossHpBefore = s.bossHp;
    const playerHpBefore = s.playerHp;
    const skipsBefore = s.specials.skip;

    const next = useSpecial(FIXTURE_CONTENT, s, "skip");
    expect(next.specials.skip).toBe(skipsBefore - 1);
    expect(next.bossHp).toBe(bossHpBefore);
    expect(next.playerHp).toBe(playerHpBefore);
    expect(next.phase).toBe("turn");
    expect(next.log[next.log.length - 1]).toMatchObject({ optionId: "skip", dealt: 0, taken: 0 });
  });

  test("skip is a no-op outside 'turn' or with no charges left", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "skip-invalid", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);
    const noCharges: GameState = { ...s, specials: { ...s.specials, skip: 0 } };
    expect(useSpecial(FIXTURE_CONTENT, noCharges, "skip")).toBe(noCharges);

    const wrongPhase: GameState = { ...s, phase: "retort" };
    expect(useSpecial(FIXTURE_CONTENT, wrongPhase, "skip")).toBe(wrongPhase);
  });

  test("heal only works below the HP threshold with a charge left", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "heal-rules", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);

    const full: GameState = { ...s, playerHp: 100 };
    expect(useSpecial(FIXTURE_CONTENT, full, "heal")).toBe(full);

    const low: GameState = { ...s, playerHp: 40 };
    const healed = useSpecial(FIXTURE_CONTENT, low, "heal");
    expect(healed.playerHp).toBe(40 + SPECIALS.heal.amount);
    expect(healed.specials.heal).toBe(low.specials.heal - 1);

    const noCharge: GameState = { ...low, specials: { ...low.specials, heal: 0 } };
    expect(useSpecial(FIXTURE_CONTENT, noCharge, "heal")).toBe(noCharge);
  });
});

describe("timeout", () => {
  test("applyTimeout behaves exactly like choosing a meek option", () => {
    let s = createGame(FIXTURE_CONTENT, "random", "timeout-eq-meek", { bossId: "sanjiuma" });
    s = advance(FIXTURE_CONTENT, s);

    const meekOptionId = findOptionId(FIXTURE_CONTENT, s.currentQuestionId!, "meek");
    const viaMeek = applyOption(FIXTURE_CONTENT, s, meekOptionId);
    const viaTimeout = applyTimeout(FIXTURE_CONTENT, s);

    expect(viaTimeout.bossHp).toBe(viaMeek.bossHp);
    expect(viaTimeout.playerHp).toBe(viaMeek.playerHp);
    expect(viaTimeout.combo).toBe(viaMeek.combo);
    expect(viaTimeout.followUp).toBe(viaMeek.followUp);

    const entry = viaTimeout.log[viaTimeout.log.length - 1];
    expect(entry.archetype).toBe("meek");
    expect(entry.optionId).toBe("timeout");
  });
});

describe("determinism", () => {
  function playOut(seed: string): TurnLog[] {
    let s = createGame(FIXTURE_CONTENT, "gauntlet", seed);
    let guard = 0;
    while (s.phase !== "result" && guard++ < 2000) {
      s = s.phase === "turn" ? applyOption(FIXTURE_CONTENT, s, s.optionOrder[0]) : advance(FIXTURE_CONTENT, s);
    }
    return s.log;
  }

  test("the same seed produces byte-identical turn logs across independent runs", () => {
    const run1 = playOut("same-seed-42");
    const run2 = playOut("same-seed-42");
    expect(run1).toEqual(run2);
    expect(run1.length).toBeGreaterThan(0);
  });

  test("a different seed is very likely to diverge", () => {
    const run1 = playOut("seed-a");
    const run2 = playOut("seed-b");
    expect(run1).not.toEqual(run2);
  });
});
