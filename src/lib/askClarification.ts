/**
 * Phase 29B.2 — gentle clarification for broad, ambiguous questions.
 *
 * A person who types a single broad word ("Milestones") should be met with a
 * warm clarifying question, not a medical fallback. Anything that carries a
 * hint of worry, urgency or a safety-sensitive symptom must never be
 * clarified: it goes straight to the AI and its existing safety routing.
 *
 * Pure functions only. No network, no state, no clinical content.
 */

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

/**
 * Wording that suggests concern, urgency, pain, bleeding, reduced movement,
 * breathing trouble, fever or not feeding. Presence of any of these means the
 * question is never treated as ambiguous.
 */
const CONCERN_SIGNALS: RegExp[] = [
  /\b(worried|worry|worrying|scared|frightened|anxious|panic)\b/,
  /\b(urgent|urgently|emergency|999|111|a&e|help now|right now|straight away)\b/,
  /\b(pain|painful|cramp|cramps|cramping|ache|aching)\b/,
  /\b(bleed|bleeds|bleeding|blood|spotting|discharge)\b/,
  /\b(reduced|less|fewer|no|not|stopped|slowed|absent)\b\s+\w*\s*\b(movement|movements|moving|kicks?)\b/,
  /\b(movement|movements|moving|kicks?)\b\s+\w*\s*\b(reduced|less|slowed|stopped|down)\b/,
  /\b(breath|breathing|breathless|wheez\w*|choking|blue)\b/,
  /\b(fever|temperature|hot to touch|feverish|rash)\b/,
  /\b(not|won'?t|will not|refusing|stopped)\b\s+\w*\s*\b(feed|feeds|feeding|eat|eating|drink|drinking)\b/,
  /\b(severe|sudden|intense|constant|unbearable|worse)\b/,
  /\b(headache|dizzy|dizziness|faint|fainting|vision|blurred|swelling|swollen)\b/,
  /\b(sick|ill|unwell|vomit\w*|seizure|fit|floppy|unresponsive)\b/,
];

export const hasConcernWording = (query: string): boolean => {
  const text = query.toLowerCase();
  return CONCERN_SIGNALS.some((pattern) => pattern.test(text));
};

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

const TOPICS: { topic: string; match: RegExp; question: string; chips: AskClarificationChip[] }[] = [
  {
    topic: "milestones",
    match: /^(milestone|milestones|development|developmental)$/,
    question:
      "Do you mean pregnancy milestones, baby milestones, toddler development, or something you have noticed recently?",
    chips: [
      chip("Pregnancy milestones", "What pregnancy milestones should I know about?"),
      chip("Baby milestones", "What baby milestones should I know about?"),
      chip("Toddler development", "What toddler development changes should I know about?"),
      CONCERN_CHIP,
    ],
  },
  {
    topic: "feeding",
    match: /^(feed|feeds|feeding|milk)$/,
    question: "Would you like guidance on breastfeeding, bottle feeding, how often to feed, or starting solid food?",
    chips: [
      chip("Breastfeeding", "What should I know about breastfeeding my baby?"),
      chip("Bottle feeding", "What should I know about bottle feeding my baby?"),
      chip("How often to feed", "How often should my baby be feeding?"),
      chip("Starting solids", "When and how should I start my baby on solid food?"),
      CONCERN_CHIP,
    ],
  },
  {
    topic: "sleep",
    match: /^(sleep|sleeping|naps?|napping|bedtime)$/,
    question: "Are you asking about safer sleep, how much sleep is usual, night waking, or settling at bedtime?",
    chips: [
      chip("Safer sleep", "What are the safer sleep guidelines for my baby?"),
      chip("How much sleep", "How much sleep does my baby need at this age?"),
      chip("Night waking", "Why is my baby waking more often at night?"),
      chip("Settling at bedtime", "How can I help my baby settle at bedtime?"),
      CONCERN_CHIP,
    ],
  },
  {
    topic: "symptoms",
    match: /^(symptom|symptoms)$/,
    question: "Which symptoms would you like to understand: early pregnancy, later pregnancy, or after birth?",
    chips: [
      chip("Early pregnancy", "Which early pregnancy symptoms are common?"),
      chip("Later pregnancy", "Which symptoms are common in later pregnancy?"),
      chip("After birth", "Which symptoms are common in the weeks after birth?"),
      CONCERN_CHIP,
    ],
  },
  {
    topic: "movement",
    match: /^(movement|movements|kicks|kicking)$/,
    question: "Would you like to know when movements usually start, how they change, or how to keep track of them?",
    chips: [
      chip("When movements start", "When will I feel the baby move?"),
      chip("How movements change", "How do baby movements change through pregnancy?"),
      chip("Keeping track", "How should I keep track of my baby's movements?"),
      CONCERN_CHIP,
    ],
  },
  {
    topic: "testing",
    match: /^(test|tests|testing)$/,
    question: "Do you mean pregnancy tests, ovulation tests, or the tests offered during pregnancy?",
    chips: [
      chip("Pregnancy tests", "When should I take a pregnancy test?"),
      chip("Ovulation tests", "How do ovulation tests work?"),
      chip("Tests in pregnancy", "Which tests and screenings are offered during pregnancy?"),
      CONCERN_CHIP,
    ],
  },
];

const normalise = (query: string): string =>
  query
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Filler words that do not make a bare topic term any more specific. */
const FILLERS = new Set(["the", "a", "an", "my", "baby", "babys", "about", "on", "and"]);

/**
 * Returns a clarification when the question is a short, broad topic term with
 * no concern wording. Returns null in every other case, so the question flows
 * to the AI exactly as it does today.
 */
export const resolveAskClarification = (rawQuery: string): AskClarification | null => {
  if (!rawQuery?.trim()) return null;
  const text = normalise(rawQuery);
  if (!text) return null;

  const words = text.split(" ");
  if (words.length > 3) return null;
  if (hasConcernWording(text)) return null;

  const core = words.filter((word) => !FILLERS.has(word));
  if (core.length !== 1) return null;

  const found = TOPICS.find((entry) => entry.match.test(core[0]));
  if (!found) return null;

  return { topic: found.topic, question: found.question, chips: found.chips };
};
