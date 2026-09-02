import { OPTION_RECIPE, OPTIONS_PER_QUESTION } from "@/engine/archetypes";
import { ARCHETYPES, STORY_ENDING_IDS, TOPICS } from "@/engine/types";
import type { Archetype, ContentBundle } from "@/engine/types";

const QUESTION_TEXT_MAX = 32;
const OPTION_TEXT_MAX = 30;
/** Minimum question pool a boss needs to have real variety; a lower count is
 * only reported as a warning so tests can filter it out while content is
 * still being built up. */
const MIN_BOSS_POOL = 12;

const codePointLength = (s: string): number => Array.from(s).length;

const letterFor = (index: number): string => String.fromCharCode(97 + index); // a, b, c...

function questionOptionId(questionId: string, index: number): string {
  return `${questionId}-${letterFor(index)}`;
}

function validateQuestionShape(q: ContentBundle["questions"][number], issues: string[]): void {
  if (codePointLength(q.text) > QUESTION_TEXT_MAX) {
    issues.push(`question ${q.id}: text exceeds ${QUESTION_TEXT_MAX} code points`);
  }
  if (!TOPICS.includes(q.topic)) {
    issues.push(`question ${q.id}: topic "${q.topic}" is not a known topic`);
  }
  if (q.options.length !== OPTIONS_PER_QUESTION) {
    issues.push(
      `question ${q.id}: expected ${OPTIONS_PER_QUESTION} options, got ${q.options.length}`
    );
  }

  const counts: Record<Archetype, number> = {
    perfect: 0,
    deflect: 0,
    meek: 0,
    backfire: 0,
    landmine: 0,
  };

  q.options.forEach((opt, index) => {
    counts[opt.archetype] = (counts[opt.archetype] ?? 0) + 1;
    const expectedId = questionOptionId(q.id, index);
    if (opt.id !== expectedId) {
      issues.push(`option ${opt.id}: expected id "${expectedId}" (position ${index})`);
    }
    if (codePointLength(opt.text) > OPTION_TEXT_MAX) {
      issues.push(`option ${opt.id}: text exceeds ${OPTION_TEXT_MAX} code points`);
    }
    if (codePointLength(opt.retort) > OPTION_TEXT_MAX) {
      issues.push(`option ${opt.id}: retort exceeds ${OPTION_TEXT_MAX} code points`);
    }
  });

  for (const archetype of ARCHETYPES) {
    if (counts[archetype] !== OPTION_RECIPE[archetype]) {
      issues.push(
        `question ${q.id}: expected ${OPTION_RECIPE[archetype]}x "${archetype}", got ${counts[archetype]}`
      );
    }
  }
}

function validateUniqueIds(content: ContentBundle, issues: string[]): void {
  const seenQuestionIds = new Set<string>();
  const seenOptionIds = new Set<string>();
  for (const q of content.questions) {
    if (seenQuestionIds.has(q.id)) {
      issues.push(`duplicate question id: ${q.id}`);
    }
    seenQuestionIds.add(q.id);
    for (const opt of q.options) {
      if (seenOptionIds.has(opt.id)) {
        issues.push(`duplicate option id: ${opt.id}`);
      }
      seenOptionIds.add(opt.id);
    }
  }
}

function validateBossReferences(content: ContentBundle, issues: string[]): void {
  const bossIds = new Set(content.bosses.map((b) => b.id));
  for (const q of content.questions) {
    if (q.bossId !== undefined && !bossIds.has(q.bossId)) {
      issues.push(`question ${q.id}: bossId "${q.bossId}" does not exist`);
    }
  }
  for (const scene of content.scenes) {
    if (scene.kind === "fight" && !bossIds.has(scene.bossId)) {
      issues.push(`story scene ${scene.id}: fight bossId "${scene.bossId}" does not exist`);
    }
  }
}

function validateBossPools(content: ContentBundle, issues: string[]): void {
  for (const boss of content.bosses) {
    const poolSize = content.questions.filter(
      (q) => q.bossId === boss.id || (q.bossId === undefined && boss.topics.includes(q.topic))
    ).length;
    if (poolSize < MIN_BOSS_POOL) {
      issues.push(`WARN: boss ${boss.id}: reachable pool has only ${poolSize} questions (want >= ${MIN_BOSS_POOL})`);
    }
  }
}

function validateRankTiers(content: ContentBundle, issues: string[]): void {
  if (content.rankTiers.length !== 7) {
    issues.push(`rankTiers: expected 7 entries, got ${content.rankTiers.length}`);
  }
  const sorted = [...content.rankTiers].sort((a, b) => a.rank - b.rank);
  for (let i = 0; i < content.rankTiers.length; i++) {
    if (content.rankTiers[i].rank !== sorted[i].rank) {
      issues.push("rankTiers: not sorted ascending by rank");
      break;
    }
  }
}

function validateStoryEndings(content: ContentBundle, issues: string[]): void {
  const ids = new Set(content.storyEndings.map((e) => e.id));
  for (const id of STORY_ENDING_IDS) {
    if (!ids.has(id)) {
      issues.push(`storyEndings: missing ending "${id}"`);
    }
  }
}

/** Validate a ContentBundle. Empty array = fully OK. Lines prefixed "WARN:"
 * are non-fatal (e.g. a boss's question pool is still being built up). */
export function validateContent(content: ContentBundle): string[] {
  const issues: string[] = [];

  validateUniqueIds(content, issues);
  for (const q of content.questions) {
    validateQuestionShape(q, issues);
  }
  validateBossReferences(content, issues);
  validateBossPools(content, issues);
  validateRankTiers(content, issues);
  validateStoryEndings(content, issues);

  return issues;
}
