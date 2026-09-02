import { BOSSES } from "@/content/bosses";
import { QUESTIONS } from "@/content/questions";
import { ACTS, STORY_SCENES } from "@/content/story/scenes";
import { RANK_TIERS, STORY_ENDINGS } from "@/content/endings";
import { LIVES } from "@/content/lives";

export const CONTENT = {
  bosses: BOSSES,
  questions: QUESTIONS,
  scenes: STORY_SCENES,
  acts: ACTS,
  rankTiers: RANK_TIERS,
  storyEndings: STORY_ENDINGS,
  lives: LIVES,
};

export { BOSSES } from "@/content/bosses";
export { QUESTIONS } from "@/content/questions";
export { ACTS, STORY_SCENES } from "@/content/story/scenes";
export { RANK_TIERS, STORY_ENDINGS } from "@/content/endings";
export { LIVES, findLife } from "@/content/lives";
export * from "./types";
