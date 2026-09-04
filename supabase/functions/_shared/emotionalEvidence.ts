/**
 * AIC-5E — deterministic explicit-emotion evidence.
 *
 * This module answers exactly one question:
 *
 *   has the person explicitly told us, in their own words, how they feel?
 *
 * It is a pure function of text. No database, no network, no model call, no
 * logging, no analytics, no storage. Nothing it returns is persisted, exposed
 * to the client or written to memory: the result exists for one request only.
 *
 * Hard boundaries:
 *   - Only USER-authored text is evidence. Assistant wording never is.
 *   - Only an explicit self-report counts. Punctuation, capitals, length,
 *     typing style, page context, journey context, pregnancy week, baby age
 *     and browsing behaviour are never evidence.
 *   - The experiencer must be the user. "I'm worried about my baby" is user
 *     fear; "my baby seems worried" is not.
 *   - An emotion category is a response-behaviour label. It is never a
 *     diagnosis, a severity, a score or a safety state.
 */

export type EmotionCategory =
  | "fear"
  | "overwhelm"
  | "low"
  | "self_blame"
  | "frustration"
  | "positive";

/** At most two categories, in the order the user expressed them. */
export const MAX_EMOTION_CATEGORIES = 2;

/** Emotion history looks at the last two USER turns only. */
export const EMOTION_HISTORY_MAX_USER_TURNS = 2;

export type EmotionalEvidence =
  | { kind: "none" }
  | {
      kind: "explicit";
      categories: EmotionCategory[];
      source: "current" | "recent_user";
      continuity: "new" | "continued" | "changed";
      direction?: "eased" | "increased";
      repeatedFromPrevious: boolean;
    };

export const NO_EMOTIONAL_EVIDENCE: EmotionalEvidence = { kind: "none" };

const normalise = (value: string): string =>
  (value ?? "").toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();

/**
 * Explicit emotional vocabulary, grouped by response behaviour. Deliberately
 * narrow: precision matters far more than recall, because a miss simply leaves
 * today's behaviour untouched.
 */
const CATEGORY_PATTERNS: Array<{ category: EmotionCategory; pattern: RegExp }> = [
  {
    category: "fear",
    pattern:
      /\b(scared|afraid|frightened|terrified|petrified|worried|worrying|worry|nervous|anxious|panicking)\b/g,
  },
  {
    category: "overwhelm",
    pattern:
      /\b(overwhelmed|stressed|burnt out|burned out)\b|\b(don't|do not|cannot|can't) know where to start\b|\bit'?s all too much\b|\bthis is all too much\b/g,
  },
  {
    category: "low",
    pattern: /\b(sad|lonely|grieving|heartbroken|devastated|miserable|tearful|low)\b/g,
  },
  {
    category: "self_blame",
    pattern: /\b(guilty|ashamed)\b|\bblame myself\b|\b(like )?i (have )?failed\b|\bmy fault\b/g,
  },
  {
    category: "frustration",
    pattern: /\b(frustrated|angry|annoyed|furious|irritated|fed up)\b/g,
  },
  {
    category: "positive",
    pattern:
      /\b(excited|relieved|hopeful|proud|happy|delighted|thrilled|grateful|calmer)\b|\bover the moon\b/g,
  },
];

/** The user, as the owner of the emotion. */
const USER_SUBJECT = /\b(i|i'm|im|i've|ive|me|myself|we|we're|were)\b/g;

/**
 * Anyone who is not the user. Presence *before* the emotional word means the
 * emotion belongs to them, not to the person asking.
 */
const THIRD_PARTY_SUBJECT =
  /\b(my|our|the|his|her|their|a)\s+(baby|son|daughter|child|toddler|little one|newborn|partner|husband|wife|boyfriend|girlfriend|friend|mum|mother|dad|father|sister|brother|family|parent|colleague)\b|\b(he|she|they|everyone|people|parents|others|someone|somebody)\b/g;

/** Filler that may surround a standalone self-report. */
const ELLIPSIS_FILLER =
  /^(?:so|really|very|quite|a bit|bit|just|still|honestly|absolutely|totally|completely|feeling|feel|am|and|but)$/;

/** Explicit persistence of the same state. */
const CONTINUED_WORDING = /\b(still|again|as ever|no better|not any better)\b/;

/** Explicit worsening, stated by the user. Never an inferred intensity. */
const INCREASED_WORDING =
  /\b(even more|more (scared|worried|anxious|nervous|overwhelmed|stressed|frustrated|angry|sad|guilty)|worse now|getting worse|got worse|even worse)\b/;

/** Explicit easing, stated by the user. */
const EASED_WORDING =
  /\b(calmer|less (scared|worried|anxious|nervous|overwhelmed|stressed|frustrated|angry|sad|guilty)|feeling better|feel better|better now|not as (scared|worried|anxious|nervous|overwhelmed)|much calmer|reassured)\b/;

/**
 * Narrow, explicitly reviewed continuation wording. Only a turn that plainly
 * depends on the exchange a moment ago may reuse a recent emotional turn.
 * No semantic similarity, no embeddings, no topic inference.
 */
const CONTINUATION_SIGNAL =
  /\b(what do i do next|what should i do next|what do i do now|what should i do now|what should i do about (it|this|that)|what do i do about (it|this|that)|i still don'?t know what to do|i don'?t know what to do next|what about now|does that change anything|it'?s still on my mind|where do i (even )?start|what now)\b/;

export const hasEmotionalContinuationSignal = (query: string): boolean =>
  CONTINUATION_SIGNAL.test(normalise(query));

interface Hit {
  category: EmotionCategory;
  index: number;
  phrase: string;
}

const firstIndexBefore = (pattern: RegExp, text: string, limit: number): boolean => {
  const scan = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
  let match: RegExpExecArray | null;
  while ((match = scan.exec(text)) !== null) {
    if (match.index < limit) return true;
    break;
  }
  return false;
};

/** Split a turn into clauses so each emotional word keeps its own subject. */
const splitClauses = (text: string): string[] =>
  text
    .split(/[.,;!?]+|\bbut\b|\band\b|\bwhile\b|\bbecause\b|\bthough\b|\balthough\b|\bso\b/)
    .map((clause) => clause.trim())
    .filter(Boolean);

const clauseHits = (clause: string): Hit[] => {
  const hits: Hit[] = [];
  for (const { category, pattern } of CATEGORY_PATTERNS) {
    const scan = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = scan.exec(clause)) !== null) {
      hits.push({ category, index: match.index, phrase: match[0] });
      break;
    }
  }
  return hits.sort((a, b) => a.index - b.index);
};

/** A clause that is nothing but a self-report: "terrified", "so relieved". */
const isBareSelfReport = (clause: string, hit: Hit): boolean => {
  const remainder = `${clause.slice(0, hit.index)} ${clause.slice(hit.index + hit.phrase.length)}`;
  return remainder
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean)
    .every((token) => ELLIPSIS_FILLER.test(token));
};

/**
 * Categories explicitly self-reported in one user turn, in the order the
 * person expressed them, capped at two.
 */
export const detectExplicitEmotion = (text: string): EmotionCategory[] => {
  const normalised = normalise(text);
  if (!normalised) return [];
  // A quoted or definitional turn is discussing a word, not reporting a state.
  const quoted = /["'][^"']*["']/.test(text) && /\b(said|means?|meaning|word)\b/.test(normalised);
  if (quoted) return [];

  const clauses = splitClauses(normalised);
  const standaloneEligible = normalised.length <= 60 && !normalised.includes("?");
  const found: EmotionCategory[] = [];
  let userOwnershipEstablished = false;

  for (const clause of clauses) {
    for (const hit of clauseHits(clause)) {
      const thirdPartyOwns = firstIndexBefore(THIRD_PARTY_SUBJECT, clause, hit.index);
      if (thirdPartyOwns) continue;
      const userOwns = firstIndexBefore(USER_SUBJECT, clause, hit.index);
      const bare = isBareSelfReport(clause, hit);
      // A bare clause inherits the user's ownership only from an earlier
      // user-owned clause in the same turn, or when the whole turn is a short
      // standalone self-report.
      const owned = userOwns || (bare && (userOwnershipEstablished || standaloneEligible));
      if (!owned) continue;
      userOwnershipEstablished = true;
      if (!found.includes(hit.category)) found.push(hit.category);
      if (found.length === MAX_EMOTION_CATEGORIES) return found;
    }
  }
  return found;
};

export interface EmotionalEvidenceInput {
  /** The current user turn. */
  query: string;
  /** Prior turns already loaded for this request, oldest first. */
  priorTurns: Array<{ role: "user" | "assistant"; content: string }>;
}

const resolve = ({ query, priorTurns }: EmotionalEvidenceInput): EmotionalEvidence => {
  const current = detectExplicitEmotion(query);
  const normalisedQuery = normalise(query);

  // Only the most recent qualifying USER turn is ever consulted. Categories
  // are never accumulated across turns: this is continuity, not a profile.
  const recentUserTurns = priorTurns
    .filter((turn) => turn.role === "user")
    .slice(-EMOTION_HISTORY_MAX_USER_TURNS);
  let previous: EmotionCategory[] = [];
  for (let i = recentUserTurns.length - 1; i >= 0; i -= 1) {
    const categories = detectExplicitEmotion(recentUserTurns[i].content);
    if (categories.length) {
      previous = categories;
      break;
    }
  }

  if (current.length) {
    const increased = INCREASED_WORDING.test(normalisedQuery);
    const eased = EASED_WORDING.test(normalisedQuery);
    const continued = !increased && !eased && CONTINUED_WORDING.test(normalisedQuery);
    const continuity: "new" | "continued" | "changed" = increased || eased
      ? "changed"
      : continued
        ? "continued"
        : "new";
    return {
      kind: "explicit",
      categories: current,
      source: "current",
      continuity,
      ...(increased ? { direction: "increased" as const } : {}),
      ...(!increased && eased ? { direction: "eased" as const } : {}),
      repeatedFromPrevious: previous.some((category) => current.includes(category)),
    };
  }

  // No new self-report. A recent emotional turn may only be carried forward
  // when the current turn explicitly depends on that exchange.
  if (previous.length && CONTINUATION_SIGNAL.test(normalisedQuery)) {
    return {
      kind: "explicit",
      categories: previous,
      source: "recent_user",
      continuity: "continued",
      repeatedFromPrevious: true,
    };
  }

  return NO_EMOTIONAL_EVIDENCE;
};

/** Fail-open wrapper: any unexpected failure means no emotional evidence. */
export const resolveEmotionalEvidence = (input: EmotionalEvidenceInput): EmotionalEvidence => {
  try {
    return resolve(input);
  } catch {
    return NO_EMOTIONAL_EVIDENCE;
  }
};
