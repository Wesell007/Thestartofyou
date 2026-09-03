/**
 * AIC-5C — deterministic clarification rules, server-owned.
 *
 * These are the exact Phase 29B.2 client rules, moved unchanged into the
 * shared server layer so the panel, `/ask` and any future transport (voice)
 * receive one decision from one owner. No model call, no scoring, no stored
 * state, no clinical logic.
 *
 * Clarification is NOT a safety state. A deterministic RED or CRISIS decision
 * is taken before this module runs and can never be downgraded to a
 * clarifying question.
 */

export type ClarificationTopic =
  | "milestones"
  | "feeding"
  | "sleep"
  | "symptoms"
  | "movement"
  | "testing";

export interface ClarificationMatch {
  topic: ClarificationTopic;
  /** The visible clarifying question. Unchanged UK-English wording. */
  question: string;
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

interface TopicRule {
  topic: ClarificationTopic;
  /** Matches the single remaining core word of a bare topic term. */
  match: RegExp;
  question: string;
  /**
   * Narrow deterministic relevance test used against recent conversation
   * turns. It never guesses meaning: it only recognises that the same subject
   * was genuinely being discussed a moment ago.
   */
  relevance: RegExp;
}

const TOPIC_RULES: TopicRule[] = [
  {
    topic: "milestones",
    match: /^(milestone|milestones|development|developmental)$/,
    question:
      "Do you mean pregnancy milestones, baby milestones, toddler development, or something you have noticed recently?",
    relevance: /\b(milestone|milestones|development|developmental|developing)\b/,
  },
  {
    topic: "feeding",
    match: /^(feed|feeds|feeding|milk)$/,
    question:
      "Would you like guidance on breastfeeding, bottle feeding, how often to feed, or starting solid food?",
    relevance: /\b(feed|feeds|feeding|fed|milk|breastfeed\w*|bottle|formula|solid|solids|weaning)\b/,
  },
  {
    topic: "sleep",
    match: /^(sleep|sleeping|naps?|napping|bedtime)$/,
    question:
      "Are you asking about safer sleep, how much sleep is usual, night waking, or settling at bedtime?",
    relevance: /\b(sleep|sleeps|sleeping|asleep|nap|naps|napping|bedtime|settling|night waking)\b/,
  },
  {
    topic: "symptoms",
    match: /^(symptom|symptoms)$/,
    question:
      "Which symptoms would you like to understand: early pregnancy, later pregnancy, or after birth?",
    relevance: /\b(symptom|symptoms)\b/,
  },
  {
    topic: "movement",
    match: /^(movement|movements|kicks|kicking)$/,
    question:
      "Would you like to know when movements usually start, how they change, or how to keep track of them?",
    relevance: /\b(movement|movements|moving|kick|kicks|kicking)\b/,
  },
  {
    topic: "testing",
    match: /^(test|tests|testing)$/,
    question: "Do you mean pregnancy tests, ovulation tests, or the tests offered during pregnancy?",
    relevance: /\b(test|tests|testing|screening|screenings)\b/,
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
 * to the model exactly as it does today.
 */
export const resolveClarification = (rawQuery: string): ClarificationMatch | null => {
  if (!rawQuery?.trim()) return null;
  const text = normalise(rawQuery);
  if (!text) return null;

  const words = text.split(" ");
  if (words.length > 3) return null;
  if (hasConcernWording(text)) return null;

  const core = words.filter((word) => !FILLERS.has(word));
  if (core.length !== 1) return null;

  const found = TOPIC_RULES.find((rule) => rule.match.test(core[0]));
  if (!found) return null;
  return { topic: found.topic, question: found.question };
};

/** How many of the most recent bounded turns may supply a referent. */
export const REFERENT_LOOKBACK_TURNS = 4;

/**
 * Conservative referent check. A bare topic term continues to the model only
 * when the *same subject* genuinely appears in the most recent bounded turns.
 * An unrelated previous answer never resolves the referent, and an empty or
 * failed history load simply means "no usable referent", so the clarification
 * path is preserved.
 */
export const hasUsableReferent = (
  topic: ClarificationTopic,
  turns: Array<{ role: "user" | "assistant"; content: string }> | undefined,
): boolean => {
  if (!turns || turns.length === 0) return false;
  const rule = TOPIC_RULES.find((entry) => entry.topic === topic);
  if (!rule) return false;
  return turns
    .slice(-REFERENT_LOOKBACK_TURNS)
    .some((turn) => typeof turn?.content === "string" && rule.relevance.test(turn.content.toLowerCase()));
};

/** The supported topics, in declaration order. */
export const CLARIFICATION_TOPICS: ClarificationTopic[] = TOPIC_RULES.map((rule) => rule.topic);
