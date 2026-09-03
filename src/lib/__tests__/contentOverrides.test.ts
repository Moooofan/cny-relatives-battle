import { describe, expect, test } from "vitest";
import { applyOverrides, type QuestionOverrideRow } from "@/lib/contentOverrides";
import type { ContentBundle, Option, Question } from "@/engine/types";

const RECIPE: Question["options"][number]["archetype"][] = [
  "perfect",
  "deflect",
  "deflect",
  "meek",
  "meek",
  "backfire",
  "backfire",
  "landmine",
];

function options(questionId: string, textPrefix = "選項"): Option[] {
  return RECIPE.map((archetype, i) => ({
    id: `${questionId}-${String.fromCharCode(97 + i)}`,
    text: `${textPrefix}${i + 1}`,
    archetype,
    retort: `回嗆${i + 1}`,
  }));
}

function question(id: string, text: string): Question {
  return { id, text, topic: "marriage", options: options(id) };
}

function bundle(questions: Question[]): ContentBundle {
  return {
    bosses: [],
    questions,
    scenes: [],
    acts: [],
    rankTiers: [],
    storyEndings: [],
    lives: [],
  };
}

function row(partial: Partial<QuestionOverrideRow> & { questionId: string }): QuestionOverrideRow {
  return { data: {}, deleted: false, updatedAt: "2026-09-04T00:00:00.000Z", ...partial };
}

describe("applyOverrides", () => {
  test("replaces a bundled question whose id matches an override", () => {
    const base = bundle([question("q1", "原始題目"), question("q2", "另一題")]);
    const edited = question("q1", "編輯後的題目");
    const result = applyOverrides(base, [row({ questionId: "q1", data: edited })]);

    expect(result.questions).toHaveLength(2);
    const q1 = result.questions.find((q) => q.id === "q1");
    expect(q1?.text).toBe("編輯後的題目");
    // Order is preserved — replacement happens in place.
    expect(result.questions.map((q) => q.id)).toEqual(["q1", "q2"]);
    // Untouched question is unaffected.
    expect(result.questions.find((q) => q.id === "q2")?.text).toBe("另一題");
  });

  test("removes a question marked deleted", () => {
    const base = bundle([question("q1", "原始題目"), question("q2", "另一題")]);
    const result = applyOverrides(base, [row({ questionId: "q1", deleted: true })]);

    expect(result.questions.map((q) => q.id)).toEqual(["q2"]);
  });

  test("appends an override whose id isn't in the bundle (custom question)", () => {
    const base = bundle([question("q1", "原始題目")]);
    const custom = question("custom-marriage-abc123", "自訂題目");
    const result = applyOverrides(base, [row({ questionId: custom.id, data: custom })]);

    expect(result.questions.map((q) => q.id)).toEqual(["q1", custom.id]);
    expect(result.questions[1].text).toBe("自訂題目");
  });

  test("a deleted custom question does not appear at all", () => {
    const base = bundle([question("q1", "原始題目")]);
    const result = applyOverrides(base, [row({ questionId: "custom-x", deleted: true })]);

    expect(result.questions.map((q) => q.id)).toEqual(["q1"]);
  });

  test("ignores a malformed override row (missing options) and keeps the bundled question", () => {
    const base = bundle([question("q1", "原始題目")]);
    const malformed = { id: "q1", text: "壞資料", topic: "marriage" }; // no `options`
    const result = applyOverrides(base, [row({ questionId: "q1", data: malformed })]);

    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].text).toBe("原始題目");
  });

  test("ignores a malformed override row (wrong option count) for a custom id — it never appears", () => {
    const base = bundle([question("q1", "原始題目")]);
    const malformed = { id: "custom-y", text: "壞資料", topic: "marriage", options: [] };
    const result = applyOverrides(base, [row({ questionId: "custom-y", data: malformed })]);

    expect(result.questions.map((q) => q.id)).toEqual(["q1"]);
  });

  test("ignores a row whose data.id doesn't match its questionId key", () => {
    const base = bundle([question("q1", "原始題目")]);
    const mismatched = question("q-other", "掛錯 id 的題目");
    const result = applyOverrides(base, [row({ questionId: "q1", data: mismatched })]);

    // q1 is untouched (the override was rejected)...
    expect(result.questions.find((q) => q.id === "q1")?.text).toBe("原始題目");
    // ...and the mismatched id is not appended either.
    expect(result.questions.some((q) => q.id === "q-other")).toBe(false);
  });

  test("multiple overrides combine: replace + delete + append in one pass", () => {
    const base = bundle([question("q1", "原始1"), question("q2", "原始2"), question("q3", "原始3")]);
    const edited2 = question("q2", "編輯2");
    const custom = question("custom-z", "新題目");
    const result = applyOverrides(base, [
      row({ questionId: "q1", deleted: true }),
      row({ questionId: "q2", data: edited2 }),
      row({ questionId: "custom-z", data: custom }),
    ]);

    expect(result.questions.map((q) => q.id)).toEqual(["q2", "q3", "custom-z"]);
    expect(result.questions.find((q) => q.id === "q2")?.text).toBe("編輯2");
  });

  test("does not mutate the input bundle", () => {
    const base = bundle([question("q1", "原始題目")]);
    const originalQuestions = base.questions;
    applyOverrides(base, [row({ questionId: "q1", deleted: true })]);

    expect(base.questions).toBe(originalQuestions);
    expect(base.questions).toHaveLength(1);
  });
});
