/**
 * AIC-3 — permissioned companion memory: pure product policy.
 *
 * No Supabase, no React, no AI call lives here. Everything in this module is
 * deterministic and testable: normalisation, category mapping, length rules,
 * prohibited content and duplicate handling.
 *
 * Category classification is deliberately rule-based. The model never
 * classifies a memory, and there is no second AI call anywhere in this layer.
 */

export const MEMORY_CATEGORIES = [
  "preference",
  "personal_detail",
  "plan",
  "relationship",
  "support_preference",
  "other",
] as const;
export type MemoryCategory = (typeof MEMORY_CATEGORIES)[number];

export const MEMORY_SOURCES = ["explicit_command", "settings"] as const;
export type MemorySource = (typeof MEMORY_SOURCES)[number];

/** Hard caps. The database mirrors the length rule. */
export const MEMORY_VALUE_MAX_LENGTH = 240;
export const MEMORY_VALUE_MIN_LENGTH = 2;
/** Persistent rows per person. Enforced by a database trigger as well. */
export const MEMORY_ROW_CAP = 50;

export interface CompanionMemory {
  id: string;
  value: string;
  category: MemoryCategory;
  source: MemorySource;
  updatedAt: string;
}

/**
 * Server-side normalisation is authoritative: the database derives
 * `normalised_value` from `value` in a generated column, and the unique index
 * uses that. This mirror exists only so the interface can spot a duplicate
 * before a write and show warm wording instead of a database error.
 */
export const normaliseMemoryValue = (value: string): string =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

/** Obvious credentials and secrets. Never stored, never sent to the model. */
const PROHIBITED_SECRET_PATTERNS: RegExp[] = [
  /\bpass(?:word|phrase|code)\b/i,
  /\bpin\b(?:\s*(?:code|number|is))?/i,
  /\bapi[ _-]?key\b/i,
  /\bsecret key\b/i,
  /\b(?:access|auth|bearer|refresh)\s*token\b/i,
  /\bprivate key\b/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bsecurity (?:question|answer)\b/i,
  /\b(?:one[ -]?time|2fa|otp)\s*(?:code|password)?\b/i,
  /\bsort code\b/i,
  /\b(?:card|cvv|cvc)\s*(?:number|code)?\b/i,
  /\b(?:\d[ -]?){13,19}\b/,
  /\blog\s?in details\b/i,
  /\bcredentials?\b/i,
];

/**
 * Clinical and diagnostic content. Uncertain wording is never turned into a
 * stored fact, and health history is out of scope for this MVP. This is a
 * conservative product policy, not a complete clinical classifier.
 */
const PROHIBITED_CLINICAL_PATTERNS: RegExp[] = [
  /\b(?:diagnos(?:is|ed|e)|condition|disorder|syndrome|illness|disease)\b/i,
  /\b(?:anxiety|depression|ptsd|ocd|bipolar|psychosis|eating disorder)\b/i,
  /\b(?:pcos|endometriosis|pre[- ]?eclampsia|gestational diabetes|diabetes|epilepsy|thyroid)\b/i,
  /\b(?:miscarriage|stillbirth|termination|pregnancy loss|ectopic)\b/i,
  /\b(?:medication|medicine|tablets?|dose|dosage|mg\b|prescription|prescribed)\b/i,
  /\b(?:blood pressure|blood test|hcg|amh|fsh|sperm count|test results?)\b/i,
  /\b(?:ivf|iui|icsi|embryo transfer|fertility treatment)\b/i,
  /\b(?:self[- ]?harm|suicidal|suicide|abuse)\b/i,
  /\b(?:symptom|bleeding|cramping|spotting)\b/i,
];

export type MemoryRejectionReason = "empty" | "too_long" | "secret" | "clinical";

export type MemoryPolicyResult =
  | { ok: true; value: string; category: MemoryCategory }
  | { ok: false; reason: MemoryRejectionReason; message: string };

const REJECTION_MESSAGES: Record<MemoryRejectionReason, string> = {
  empty: "There is nothing to remember yet.",
  too_long: `Please keep this under ${MEMORY_VALUE_MAX_LENGTH} characters.`,
  secret:
    "Your companion will not keep passwords, codes or anything else that unlocks an account. Nothing was saved.",
  clinical:
    "Your companion does not keep health or medical details as long-term memory. You can still talk about it here whenever you want to.",
};

const CATEGORY_RULES: { category: MemoryCategory; pattern: RegExp }[] = [
  {
    category: "support_preference",
    pattern:
      /\b(?:remind|reminder|check in|checking in|encourage|reassur\w*|support me|gentle|pep talk|nudge)\b/i,
  },
  {
    category: "preference",
    pattern:
      /\b(?:prefer|prefers|preferred|like|likes|dislike|dislikes|rather|shorter|concise|brief|detailed|plain|call me|hate|love)\b/i,
  },
  {
    category: "relationship",
    pattern:
      /\b(?:partner|husband|wife|mum|mother|dad|father|sister|brother|friend|family|in[- ]?laws?|grandma|grandad|granny)\b/i,
  },
  {
    category: "plan",
    pattern:
      /\b(?:plan|planning|going to|hoping to|want to|plan to|next month|next week|booked|saving for|aim(?:ing)? to)\b/i,
  },
  {
    category: "personal_detail",
    pattern:
      /\b(?:i am|i'm|i work|my name|i live|i have|we live|we have|my job|vegetarian|vegan|teacher|nurse)\b/i,
  },
];

/**
 * Deterministic category mapping. Rules are checked in a fixed order and the
 * first match wins. Anything that does not match confidently is `other`.
 */
export const classifyMemoryCategory = (value: string): MemoryCategory => {
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(value)) return rule.category;
  }
  return "other";
};

/** True when a value contains an obvious credential or secret. */
export const containsProhibitedSecret = (value: string): boolean =>
  PROHIBITED_SECRET_PATTERNS.some((pattern) => pattern.test(value));

/** True when a value looks clinical, diagnostic or medical. */
export const containsProhibitedClinical = (value: string): boolean =>
  PROHIBITED_CLINICAL_PATTERNS.some((pattern) => pattern.test(value));

/**
 * The single gate every candidate passes, whether it came from an explicit
 * command or from the account settings form.
 */
export const evaluateMemoryCandidate = (raw: string): MemoryPolicyResult => {
  const value = raw.trim().replace(/\s+/g, " ");
  if (value.length < MEMORY_VALUE_MIN_LENGTH) {
    return { ok: false, reason: "empty", message: REJECTION_MESSAGES.empty };
  }
  if (value.length > MEMORY_VALUE_MAX_LENGTH) {
    return { ok: false, reason: "too_long", message: REJECTION_MESSAGES.too_long };
  }
  if (containsProhibitedSecret(value)) {
    return { ok: false, reason: "secret", message: REJECTION_MESSAGES.secret };
  }
  if (containsProhibitedClinical(value)) {
    return { ok: false, reason: "clinical", message: REJECTION_MESSAGES.clinical };
  }
  return { ok: true, value, category: classifyMemoryCategory(value) };
};

/** Find an existing memory whose normalised value is exactly the candidate. */
export const findExactMemory = (
  memories: CompanionMemory[],
  value: string,
): CompanionMemory | null => {
  const target = normaliseMemoryValue(value);
  return memories.find((memory) => normaliseMemoryValue(memory.value) === target) ?? null;
};

/** True when saving this candidate would repeat something already kept. */
export const isDuplicateMemory = (memories: CompanionMemory[], value: string): boolean =>
  findExactMemory(memories, value) !== null;

/**
 * Deterministic replacement only. A replacement is allowed when the old value
 * is quoted or written out and matches exactly one existing memory. Nothing is
 * ever guessed from meaning: "prefers detailed answers" and "prefers concise
 * answers" are two different memories unless the person names the old one.
 */
export const resolveReplacementTarget = (
  memories: CompanionMemory[],
  oldValue: string | null,
): { ok: true; target: CompanionMemory | null } | { ok: false; reason: "ambiguous" } => {
  if (!oldValue) return { ok: true, target: null };
  const target = normaliseMemoryValue(oldValue);
  const matches = memories.filter(
    (memory) => normaliseMemoryValue(memory.value) === target,
  );
  if (matches.length === 1) return { ok: true, target: matches[0] };
  return { ok: false, reason: "ambiguous" };
};

/**
 * Forget resolution. Exact match only, plus an optional single unambiguous
 * target carried by the current interaction (the memory just saved). There is
 * no conversation history to resolve against — AIC-4 does not exist yet — so
 * anything else asks rather than guesses.
 */
export const resolveForgetTarget = (
  memories: CompanionMemory[],
  reference: string | null,
  lastSaved: CompanionMemory | null,
):
  | { ok: true; target: CompanionMemory }
  | { ok: false; reason: "ambiguous" | "not_found" } => {
  if (!reference) {
    if (lastSaved) return { ok: true, target: lastSaved };
    return { ok: false, reason: "ambiguous" };
  }
  const target = normaliseMemoryValue(reference);
  const exact = memories.filter((memory) => normaliseMemoryValue(memory.value) === target);
  if (exact.length === 1) return { ok: true, target: exact[0] };
  if (exact.length > 1) return { ok: false, reason: "ambiguous" };

  const partial = memories.filter((memory) =>
    normaliseMemoryValue(memory.value).includes(target),
  );
  if (partial.length === 1) return { ok: true, target: partial[0] };
  if (partial.length > 1) return { ok: false, reason: "ambiguous" };
  return { ok: false, reason: "not_found" };
};
