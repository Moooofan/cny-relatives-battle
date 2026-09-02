import { describe, expect, test } from "vitest";
import { advance, createGame, resumeStory } from "@/engine/reducer";
import type { GameState } from "@/engine/types";
import {
  FIXTURE_CONTENT_NO_LIVES,
  FIXTURE_LAST_SCENE_INDEX,
  fakeLogEntry,
  fightWithArchetypes,
  finalRetortState,
  progressPastNonTurnPhases,
} from "./fixtures";

describe("story flow", () => {
  test("a full playthrough walks narrative/rest/fight scenes in order and reaches 'result'", () => {
    let s = createGame(FIXTURE_CONTENT_NO_LIVES, "story", "story-flow-1");
    expect(s.phase).toBe("interlude"); // scene 0 is narrative
    expect(s.sceneIndex).toBe(0);

    s = progressPastNonTurnPhases(FIXTURE_CONTENT_NO_LIVES, s);
    expect(s.phase).toBe("turn");
    expect(s.bossQueue[s.bossIndex]).toBe("xiao-biaodi");

    s = fightWithArchetypes(FIXTURE_CONTENT_NO_LIVES, s, ["perfect"]);
    s = progressPastNonTurnPhases(FIXTURE_CONTENT_NO_LIVES, s); // rest -> full heal -> next intro
    expect(s.bossQueue[s.bossIndex]).toBe("sanjiuma");
    expect(s.playerHp).toBe(100);

    s = fightWithArchetypes(FIXTURE_CONTENT_NO_LIVES, s, ["perfect"]);
    s = progressPastNonTurnPhases(FIXTURE_CONTENT_NO_LIVES, s); // narrative + rest -> next intro
    expect(s.bossQueue[s.bossIndex]).toBe("ama");
    expect(s.playerHp).toBe(100);

    s = fightWithArchetypes(FIXTURE_CONTENT_NO_LIVES, s, ["perfect"]);
    s = progressPastNonTurnPhases(FIXTURE_CONTENT_NO_LIVES, s);

    expect(s.phase).toBe("result");
    expect(s.bossesDefeated).toBe(3);
    expect(s.result).toBeDefined();
    expect(s.result?.storyEndingId).toBeDefined();
  });

  test("resumeStory jumps straight to a checkpoint scene with full HP", () => {
    const s = resumeStory(FIXTURE_CONTENT_NO_LIVES, "resume-test", FIXTURE_LAST_SCENE_INDEX);
    expect(s.phase).toBe("intro");
    expect(s.sceneIndex).toBe(FIXTURE_LAST_SCENE_INDEX);
    expect(s.playerHp).toBe(100);
    expect(s.bossQueue[s.bossIndex]).toBe("ama");
  });
});

// Each ending is exercised by handing `advance()` a directly-constructed
// GameState at "the last boss just died, phase 'retort'" — this is a
// legitimate way to unit-test a pure reducer transition without needing a
// full, HP-balanced simulated playthrough for every branch.
describe("story endings (docs/CONTENT.md §4, checked in that order)", () => {
  function resolveToResult(state: GameState): GameState {
    const afterBossDefeated = advance(FIXTURE_CONTENT_NO_LIVES, state);
    return advance(FIXTURE_CONTENT_NO_LIVES, afterBossDefeated);
  }

  test("lost: any playerDefeated", () => {
    const state: GameState = { ...finalRetortState({}), phase: "playerDefeated", playerHp: 0 };
    const result = advance(FIXTURE_CONTENT_NO_LIVES, state);
    expect(result.phase).toBe("result");
    expect(result.result?.storyEndingId).toBe("lost");
  });

  test("grandma-favorite: the ama fight had >=1 turn and no perfect/landmine", () => {
    const state = finalRetortState({
      log: [fakeLogEntry("ama", "deflect"), fakeLogEntry("ama", "meek")],
      playerHp: 50,
    });
    const result = resolveToResult(state);
    expect(result.result?.storyEndingId).toBe("grandma-favorite");
  });

  test("apprentice: landmineCount >= 5 and the run was won", () => {
    const state = finalRetortState({
      log: [fakeLogEntry("ama", "landmine")], // has a landmine, so NOT grandma-favorite
      landmineCount: 5,
      playerHp: 30,
    });
    const result = resolveToResult(state);
    expect(result.result?.storyEndingId).toBe("apprentice");
  });

  test("never-again: rank <= 2", () => {
    const state = finalRetortState({
      log: [fakeLogEntry("ama", "perfect")], // has a perfect, so NOT grandma-favorite
      landmineCount: 0,
      damageDealt: 0,
      playerHp: 1, // alive (0 would hit the playerDefeated/"lost" branch first)
      maxCombo: 0,
      turns: 10,
    });
    const result = resolveToResult(state);
    expect(result.result?.rank.rank).toBeLessThanOrEqual(2);
    expect(result.result?.storyEndingId).toBe("never-again");
  });

  test("harmony: rank >= 5 and no landmine in the ama fight", () => {
    const state = finalRetortState({
      log: [fakeLogEntry("ama", "perfect")], // perfect disqualifies grandma-favorite but not harmony
      landmineCount: 0,
      damageDealt: 800,
      playerHp: 50,
      maxCombo: 0,
      turns: 10,
    });
    const result = resolveToResult(state);
    expect(result.result?.rank.rank).toBeGreaterThanOrEqual(5);
    expect(result.result?.storyEndingId).toBe("harmony");
  });

  test("survived: none of the above rules match", () => {
    const state = finalRetortState({
      log: [fakeLogEntry("ama", "landmine")], // disqualifies grandma-favorite AND harmony
      landmineCount: 1,
      damageDealt: 300,
      playerHp: 50,
      maxCombo: 0,
      turns: 10,
    });
    const result = resolveToResult(state);
    expect(result.result?.rank.rank).toBeGreaterThan(2);
    expect(result.result?.rank.rank).toBeLessThan(5);
    expect(result.result?.storyEndingId).toBe("survived");
  });
});
