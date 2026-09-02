import { describe, expect, it } from "vitest";
import { validateContent } from "@/engine/validate";
import { CONTENT } from "@/content";

describe("real content", () => {
  it("passes validateContent (warnings allowed while the pool is being filled)", () => {
    const issues = validateContent(CONTENT);
    const errors = issues.filter((m) => !m.startsWith("WARN:"));
    if (issues.length) console.log(issues.join("\n"));
    expect(errors).toEqual([]);
  });
});
