import { describe, expect, it } from "vitest";
import { CONTENT } from "@/content";
import { makeSeeds, simulateMany, simulateRun, type PolicyName } from "@/engine/sim";
import type { Mode } from "@/engine/types";

/**
 * Balance smoke test — NOT the full tuning sweep (see docs/BALANCE.md for
 * that: 300 seeds × 4 policies × 4 modes). This just guards against
 * regressions: the reducer must always terminate, scores must stay finite,
 * and none of the 7 rank tiers may become unreachable after a future
 * content/threshold edit. Kept small so it runs in well under 5s.
 */

const MODES: Mode[] = ["random", "daily", "story", "gauntlet"];
const POLICIES: PolicyName[] = ["random", "casual", "good", "expert"];

describe("balance smoke test", () => {
  it("every mode terminates cleanly under the casual policy (20 seeds each)", () => {
    for (const mode of MODES) {
      const seeds = makeSeeds(`balance-smoke-${mode}`, 20);
      for (const seed of seeds) {
        // simulateRun only returns once state.phase === "result" (it throws
        // if the reducer loop doesn't reach 'result' within its guard), so a
        // successful return here already proves termination in 'result'.
        const run = simulateRun(CONTENT, mode, seed, "casual");
        expect(Number.isFinite(run.score)).toBe(true);
        expect(run.rank).toBeGreaterThanOrEqual(1);
        expect(run.rank).toBeLessThanOrEqual(7);
        expect(Number.isFinite(run.turns)).toBe(true);
        expect(run.turns).toBeGreaterThan(0);
      }
    }
  });

  it("every rank 1..7 is attainable by some policy within 60 seeds in random mode", () => {
    const seeds = makeSeeds("balance-smoke-rank-reach", 60);
    const reached = new Set<number>();
    for (const policy of POLICIES) {
      const runs = simulateMany(CONTENT, "random", policy, seeds);
      for (const run of runs) reached.add(run.rank);
    }
    for (let rank = 1; rank <= 7; rank++) {
      expect(reached.has(rank)).toBe(true);
    }
  });
});
