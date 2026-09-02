import { OPTION_RECIPE, OPTIONS_PER_QUESTION } from "@/engine/archetypes";
import { ARCHETYPES, STORY_ENDING_IDS, TOPICS } from "@/engine/types";
import type { ArchetypeScale, Archetype, ContentBundle, Life } from "@/engine/types";

const QUESTION_TEXT_MAX = 32;
const OPTION_TEXT_MAX = 30;
/** Minimum question pool a boss needs to have real variety; a lower count is
 * only reported as a warning so tests can filter it out while content is
 * still being built up. */
const MIN_BOSS_POOL = 12;

const LIFE_NAME_MAX = 8;
const LIFE_TAGLINE_MAX = 24;
const LIFE_LINE_MAX = 40;
const LIFE_MULT_MIN = 0.5;
const LIFE_MULT_MAX = 1.6;

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

function validateLifeMultiplierRange(life: Life, scale: ArchetypeScale, where: string, issues: string[]): void {
  for (const archetype of ARCHETYPES) {
    const entry = scale[archetype];
    if (!entry) continue;
    for (const key of ["dealt", "taken"] as const) {
      const value = entry[key];
      if (value === undefined) continue;
      if (value < LIFE_MULT_MIN || value > LIFE_MULT_MAX) {
        issues.push(
          `life ${life.id}: ${where}.${archetype}.${key} = ${value} is outside [${LIFE_MULT_MIN}, ${LIFE_MULT_MAX}]`
        );
      }
    }
  }
}

function validateLifeShape(content: ContentBundle, life: Life, issues: string[]): void {
  if (codePointLength(life.name) > LIFE_NAME_MAX) {
    issues.push(`life ${life.id}: name exceeds ${LIFE_NAME_MAX} code points`);
  }
  if (codePointLength(life.tagline) > LIFE_TAGLINE_MAX) {
    issues.push(`life ${life.id}: tagline exceeds ${LIFE_TAGLINE_MAX} code points`);
  }
  for (const line of life.background) {
    if (codePointLength(line) > LIFE_LINE_MAX) {
      issues.push(`life ${life.id}: background line exceeds ${LIFE_LINE_MAX} code points`);
    }
  }

  const bossIds = new Set(content.bosses.map((b) => b.id));
  const relationIds = new Set(Object.keys(life.relations));
  for (const bossId of bossIds) {
    if (!relationIds.has(bossId)) {
      issues.push(`life ${life.id}: missing relations entry for boss "${bossId}"`);
    }
  }
  for (const bossId of relationIds) {
    if (!bossIds.has(bossId)) {
      issues.push(`life ${life.id}: relations has unknown boss "${bossId}"`);
    }
  }
  for (const [bossId, line] of Object.entries(life.relations)) {
    if (codePointLength(line) > LIFE_LINE_MAX) {
      issues.push(`life ${life.id}: relations.${bossId} exceeds ${LIFE_LINE_MAX} code points`);
    }
  }

  for (const [topic, scale] of Object.entries(life.modifiers.topic ?? {})) {
    validateLifeMultiplierRange(life, scale as ArchetypeScale, `topic.${topic}`, issues);
  }
  for (const [bossId, scale] of Object.entries(life.modifiers.boss ?? {})) {
    validateLifeMultiplierRange(life, scale as ArchetypeScale, `boss.${bossId}`, issues);
  }
}

function validateLives(content: ContentBundle, issues: string[]): void {
  const lives = content.lives ?? [];
  const seenIds = new Set<string>();
  const seenCodes = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const life of lives) {
    if (seenIds.has(life.id)) issues.push(`duplicate life id: ${life.id}`);
    seenIds.add(life.id);
    if (seenCodes.has(life.code)) issues.push(`duplicate life code: ${life.code}`);
    seenCodes.add(life.code);
    if (seenSlugs.has(life.slug)) issues.push(`duplicate life slug: ${life.slug}`);
    seenSlugs.add(life.slug);

    validateLifeShape(content, life, issues);
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
  validateLives(content, issues);

  return issues;
}
