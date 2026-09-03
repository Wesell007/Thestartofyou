/**
 * AIC-5C — clarification DISPLAY only.
 *
 * The decision to clarify is taken by the server (`_shared/clarification.ts`
 * via `_shared/companionBoundaryRouter.ts`) and reaches the browser as
 * explicit structured metadata. Nothing here decides anything: this module
 * maps a server-provided topic to the existing card question and chips, so
 * the established clarification experience is preserved without parsing a
 * single character of assistant prose.
 */

import type { ClarificationTopic } from "../../../supabase/functions/_shared/clarification";

export interface AskClarificationChip {
  /** Short chip label shown to the reader. */
  label: string;
  /** The full question submitted when the chip is chosen. */
  question: string;
  /**
   * When true the chip should focus the input with the question as a starting
   * point rather than submitting a broad term on the person's behalf.
   */
  focusInput?: boolean;
}

export interface AskClarification {
  topic: string;
  question: string;
  chips: AskClarificationChip[];
}

const chip = (label: string, question: string, focusInput = false): AskClarificationChip => ({
  label,
  question,
  focusInput,
});

/** Chip offered on every clarification so a concern is never boxed in. */
const CONCERN_CHIP = chip(
  "Something I am worried about",
  "I would like to describe something I have noticed. ",
  true,
);

const DISPLAY: Record<ClarificationTopic, { question: string; chips: AskClarificationChip[] }> = {
  milestones: {
    question:
      "Do you mean pregnancy milestones, baby milestones, toddler development, or something you have noticed recently?",
    chips: [
      chip("Pregnancy milestones", "What pregnancy milestones should I know about?"),
      chip("Baby milestones", "What baby milestones should I know about?"),
      chip("Toddler development", "What toddler development changes should I know about?"),
      CONCERN_CHIP,
    ],
  },
  feeding: {
    question:
      "Would you like guidance on breastfeeding, bottle feeding, how often to feed, or starting solid food?",
    chips: [
      chip("Breastfeeding", "What should I know about breastfeeding my baby?"),
      chip("Bottle feeding", "What should I know about bottle feeding my baby?"),
      chip("How often to feed", "How often should my baby be feeding?"),
      chip("Starting solids", "When and how should I start my baby on solid food?"),
      CONCERN_CHIP,
    ],
  },
  sleep: {
    question:
      "Are you asking about safer sleep, how much sleep is usual, night waking, or settling at bedtime?",
    chips: [
      chip("Safer sleep", "What are the safer sleep guidelines for my baby?"),
      chip("How much sleep", "How much sleep does my baby need at this age?"),
      chip("Night waking", "Why is my baby waking more often at night?"),
      chip("Settling at bedtime", "How can I help my baby settle at bedtime?"),
      CONCERN_CHIP,
    ],
  },
  symptoms: {
    question:
      "Which symptoms would you like to understand: early pregnancy, later pregnancy, or after birth?",
    chips: [
      chip("Early pregnancy", "Which early pregnancy symptoms are common?"),
      chip("Later pregnancy", "Which symptoms are common in later pregnancy?"),
      chip("After birth", "Which symptoms are common in the weeks after birth?"),
      CONCERN_CHIP,
    ],
  },
  movement: {
    question:
      "Would you like to know when movements usually start, how they change, or how to keep track of them?",
    chips: [
      chip("When movements start", "When will I feel the baby move?"),
      chip("How movements change", "How do baby movements change through pregnancy?"),
      chip("Keeping track", "How should I keep track of my baby's movements?"),
      CONCERN_CHIP,
    ],
  },
  testing: {
    question: "Do you mean pregnancy tests, ovulation tests, or the tests offered during pregnancy?",
    chips: [
      chip("Pregnancy tests", "When should I take a pregnancy test?"),
      chip("Ovulation tests", "How do ovulation tests work?"),
      chip("Tests in pregnancy", "Which tests and screenings are offered during pregnancy?"),
      CONCERN_CHIP,
    ],
  },
};

/**
 * Display mapping for a topic the server has already decided on. An unknown
 * or malformed topic returns null, so the answer simply renders as ordinary
 * assistant text.
 */
export const clarificationDisplay = (topic: string | null | undefined): AskClarification | null => {
  if (!topic) return null;
  const entry = DISPLAY[topic as ClarificationTopic];
  if (!entry) return null;
  return { topic, question: entry.question, chips: entry.chips };
};
