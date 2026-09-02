// Reassigns option ids to `${questionId}-a..h` by position inside each question.
// Usage: node scripts/normalize-option-ids.mjs [subdir]   (default: all of src/content/questions)
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = join(process.cwd(), "src/content/questions", process.argv[2] ?? "");
const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n.endsWith(".ts") && n !== "index.ts" && !n.endsWith(".test.ts")) files.push(p);
  }
})(base);

let changed = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  let qid = null, letter = 0;
  const out = src.replace(/^(\s*)id: "([^"]+)",\s*$/gm, (line, indent, id) => {
    if (indent.length <= 4) { qid = id; letter = 0; return line; }        // question-level id (2 or 4 spaces)
    if (!qid) return line;
    const next = `${qid}-${String.fromCharCode(97 + letter++)}`;
    return next === id ? line : `${indent}id: "${next}",`;
  });
  if (out !== src) { writeFileSync(f, out); changed++; }
}
console.log(`normalized ${files.length} files, changed ${changed}`);
