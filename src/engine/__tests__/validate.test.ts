import { describe, expect, test } from "vitest";
import { validateContent } from "@/engine/validate";
import type { ContentBundle } from "@/engine/types";
import { FIXTURE_CONTENT } from "./fixtures";

describe("validateContent", () => {
  test("the fixture bundle has no hard errors (only WARN pool-size notices)", () => {
    const issues = validateContent(FIXTURE_CONTENT);
    const errors = issues.filter((i) => !i.startsWith("WARN:"));
    expect(errors).toEqual([]);
    // the fixture only has 2 questions per boss, well under the >=12 target
    expect(issues.some((i) => i.startsWith("WARN:"))).toBe(true);
  });

  test("catches a bad option recipe (missing the required landmine option)", () => {
    const targetId = FIXTURE_CONTENT.questions[0].id;
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      questions: FIXTURE_CONTENT.questions.map((q) =>
        q.id === targetId ? { ...q, options: q.options.slice(0, 7) } : q
      ),
    };
    const issues = validateContent(bad);
    expect(
      issues.some((i) => i.includes(targetId) && i.toLowerCase().includes("landmine"))
    ).toBe(true);
  });

  test("catches a question text over the 32 code-point cap", () => {
    const targetId = FIXTURE_CONTENT.questions[0].id;
    const longText = "這是一句超級無敵霹靂長的攻擊句子用來測試字數上限有沒有正確被抓出來喔";
    expect(Array.from(longText).length).toBeGreaterThan(32);

    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      questions: FIXTURE_CONTENT.questions.map((q) => (q.id === targetId ? { ...q, text: longText } : q)),
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes(targetId) && i.includes("exceeds 32"))).toBe(true);
  });

  test("catches a duplicate question id", () => {
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      questions: [...FIXTURE_CONTENT.questions, { ...FIXTURE_CONTENT.questions[0] }],
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes("duplicate question id"))).toBe(true);
  });

  test("catches a story fight scene pointing at a nonexistent boss", () => {
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      scenes: FIXTURE_CONTENT.scenes.map((s) =>
        s.kind === "fight" ? { ...s, bossId: "no-such-boss" } : s
      ),
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes("no-such-boss"))).toBe(true);
  });

  test("catches storyEndings missing a required id", () => {
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      storyEndings: FIXTURE_CONTENT.storyEndings.filter((e) => e.id !== "harmony"),
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes("harmony"))).toBe(true);
  });
});

describe("validateContent: lives", () => {
  test("catches a life multiplier outside [0.5, 1.6]", () => {
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      lives: FIXTURE_CONTENT.lives!.map((l) =>
        l.id === "life-fixture-a"
          ? { ...l, modifiers: { ...l.modifiers, boss: { ama: { landmine: { taken: 2.5 } } } } }
          : l
      ),
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes("life-fixture-a") && i.includes("outside"))).toBe(true);
  });

  test("catches a life missing a relations entry for a boss", () => {
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      lives: FIXTURE_CONTENT.lives!.map((l) => {
        if (l.id !== "life-fixture-b") return l;
        const rest = Object.fromEntries(
          Object.entries(l.relations).filter(([k]) => k !== "ama"),
        ) as typeof l.relations;
        return { ...l, relations: rest };
      }),
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes("life-fixture-b") && i.includes("missing relations"))).toBe(true);
  });

  test("catches a duplicate life id/code/slug", () => {
    const bad: ContentBundle = {
      ...FIXTURE_CONTENT,
      lives: [...FIXTURE_CONTENT.lives!, { ...FIXTURE_CONTENT.lives![0] }],
    };
    const issues = validateContent(bad);
    expect(issues.some((i) => i.includes("duplicate life id"))).toBe(true);
    expect(issues.some((i) => i.includes("duplicate life code"))).toBe(true);
    expect(issues.some((i) => i.includes("duplicate life slug"))).toBe(true);
  });
});
