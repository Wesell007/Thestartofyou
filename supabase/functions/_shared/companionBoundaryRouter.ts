/**
 * AIC-5C — the shared companion boundary router.
 *
 * One server-side owner decides, for a GREEN request only, whether the
 * companion should:
 *
 *   continue    — carry on to the ordinary grounding/context/model path
 *   clarify     — ask the existing deterministic clarifying question
 *   unsupported — state an explicit product capability boundary
 *
 * Deliberate separations:
 *   - This is NOT safety severity. AIC-5A's `decideSafety` has already run and
 *     a deterministic RED/CRISIS decision never reaches this module.
 *   - UNSUPPORTED is NOT "a health question", "the model does not know" or
 *     "grounding failed". It is only an explicit request for a capability the
 *     product cannot safely or technically provide.
 *   - No model call, no structured-output classifier, no AMBER, no clinical
 *     thresholds, no persisted or logged decision state.
 */

import {
  hasUsableReferent,
  resolveClarification,
  type ClarificationTopic,
} from "./clarification.ts";

export type UnsupportedKind =
  | "diagnosis"
  | "prescribing"
  | "contact_clinician"
  | "booking"
  | "send_message"
  | "medical_records";

export type BoundaryDecision =
  | { kind: "continue" }
  | { kind: "clarify"; topic: ClarificationTopic; answer: string }
  | { kind: "unsupported"; unsupportedKind: UnsupportedKind; answer: string };

const normalise = (query: string): string =>
  query.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();

/**
 * Ordinary guidance questions. Someone asking *whether*, *how*, *who* or
 * *what to say* is asking for information, not asking the companion to act,
 * so these can never become an unsupported capability response.
 */
const GUIDANCE_QUESTION = [
  /^(should|how|who|what|where|when|why|which|do|does|did|is|are|was|were|if)\b/,
  /\b(can|could|should|may|must|do)\s+i\b/,
  /\bhelp me\b/,
  /\bhow (do|can|should|would)\b/,
];

const isGuidanceQuestion = (text: string): boolean =>
  GUIDANCE_QUESTION.some((pattern) => pattern.test(text));

/**
 * Explicit agentic intent: the person is asking the companion itself to carry
 * out the action. Either the sentence is an imperative addressed to the
 * companion, or it delegates the action ("for me", "on my behalf"), or it asks
 * the companion directly ("can you book…", "I need you to call…").
 */
const ACTION_VERBS = [
  "call",
  "ring",
  "phone",
  "contact",
  "email",
  "text",
  "message",
  "send",
  "write",
  "book",
  "schedule",
  "arrange",
  "access",
  "open",
  "retrieve",
  "download",
  "get",
  "read",
  "check",
  "diagnose",
  "prescribe",
];

const DELEGATION = [
  /\bfor me\b/,
  /\bon my behalf\b/,
  /\b(can|could|will|would|please)\s+you\b/,
  /\bi (want|need|would like) you to\b/,
  /\byou (should|must) (call|contact|book|send|message|access)\b/,
];

const isImperativeToCompanion = (text: string): boolean => {
  const withoutPolite = text.replace(/^(please|hey|hi|ok|okay|companion)[,\s]+/, "");
  const first = withoutPolite.split(" ")[0]?.replace(/[^a-z]/g, "") ?? "";
  return ACTION_VERBS.includes(first);
};

const hasAgenticIntent = (text: string): boolean =>
  isImperativeToCompanion(text) || DELEGATION.some((pattern) => pattern.test(text));

/**
 * A. Professional act requested of the companion. These phrasings are
 * inherently agentic ("diagnose me", "prescribe me…"), so they are matched
 * directly — never on the vocabulary "diagnosis", "diagnosed", "prescribed",
 * "prescription" or "medication" alone.
 */
const DIAGNOSIS_REQUEST: RegExp[] = [
  /\bdiagnose\s+(me|my|us|this|it|him|her|them)\b/,
  /\b(can|could|will|would|please)\s+you\s+diagnose\b/,
  /\b(give|tell|provide|make)\s+me\s+(a|an|my)\s+diagnosis\b/,
  /\bi (want|need) (a|an|my) diagnosis from you\b/,
];

const PRESCRIBING_REQUEST: RegExp[] = [
  /\bprescribe\s+(me|us|my|something|a|an|medication|medicine|antibiotics|tablets)\b/,
  /\b(can|could|will|would|please)\s+you\s+prescribe\b/,
  /\b(write|give|get)\s+me\s+(a|an|the)\s+prescription\b/,
];

/** B. External actions the product genuinely cannot perform. */
interface ActionRule {
  kind: UnsupportedKind;
  verb: RegExp;
  object: RegExp;
}

const ACTION_RULES: ActionRule[] = [
  {
    kind: "contact_clinician",
    verb: /\b(call|ring|phone|contact|email)\b/,
    object:
      /\b(my|the|our)\s+(midwife|gp|doctor|clinician|nurse|health visitor|consultant|hospital|surgery|practice|maternity unit|maternity triage)\b|\b(call|ring|phone)\s+(999|111)\b/,
  },
  {
    kind: "booking",
    verb: /\b(book|schedule|arrange|make)\b/,
    object: /\b(appointment|appointments|scan|booking|clinic visit)\b/,
  },
  {
    kind: "send_message",
    verb: /\b(send|write|text|message)\b/,
    object: /\b(message|email|note|letter|text)\b/,
  },
  {
    kind: "medical_records",
    verb: /\b(access|open|retrieve|download|read|check|get|look at|pull up)\b/,
    object:
      /\b(medical|health|maternity|hospital|gp|clinical)\s+(record|records|notes|file|files|history)\b|\bmy notes\b/,
  },
];

/** Boundary answers. Brief, honest, and always offering a real next step. */
export const UNSUPPORTED_ANSWERS: Record<UnsupportedKind, string> = {
  diagnosis:
    "I am not able to diagnose you or tell you what is causing something. That needs a midwife, GP or health visitor who can assess you properly.\n\nWhat I can do is explain what is common at this stage, talk through what you have noticed, and help you decide who to contact and what to mention when you do. Tell me what has been happening and we can go through it together.",
  prescribing:
    "I am not able to prescribe or recommend medication, and I cannot write a prescription. Medicines in pregnancy and after birth need a GP, midwife or pharmacist who knows your history.\n\nI can help you understand what you are experiencing, and help you prepare what to ask your GP, midwife or pharmacist about treatment options.",
  contact_clinician:
    "I am not able to make calls or contact anyone for you. Nothing has been sent or dialled.\n\nIf this feels urgent, please contact your midwife, GP or maternity unit yourself, or call NHS 111 for advice. If you would like, I can help you put into words what to say when you get through.",
  booking:
    "I am not able to book or change appointments for you. Nothing has been booked.\n\nAppointments are arranged through your GP surgery, midwife team or maternity unit. I can help you work out what to ask for and what to mention when you contact them.",
  send_message:
    "I am not able to send messages or emails on your behalf. Nothing has been sent.\n\nIf it would help, I can help you draft what you want to say, so you can send it yourself.",
  medical_records:
    "I am not able to open or look at your medical records, notes or test results. I have no access to them.\n\nYou can ask your GP surgery or maternity team for access to your record. If you tell me what you are trying to find out, I can explain what those details usually mean in general terms.",
};

const matchUnsupported = (text: string): UnsupportedKind | null => {
  if (isGuidanceQuestion(text)) return null;

  if (DIAGNOSIS_REQUEST.some((pattern) => pattern.test(text))) return "diagnosis";
  if (PRESCRIBING_REQUEST.some((pattern) => pattern.test(text))) return "prescribing";

  if (!hasAgenticIntent(text)) return null;
  for (const rule of ACTION_RULES) {
    if (rule.verb.test(text) && rule.object.test(text)) return rule.kind;
  }
  return null;
};

export interface BoundaryInput {
  query: string;
  /**
   * The bounded AIC-4 conversation turns already available to this request.
   * Undefined or empty simply means "no usable referent" — nothing is ever
   * fabricated, and a failed history load behaves the same way.
   */
  priorTurns?: Array<{ role: "user" | "assistant"; content: string }>;
}

/**
 * The single deterministic boundary decision. Safe by construction: anything
 * not matched precisely continues down the ordinary path.
 */
export const decideBoundary = ({ query, priorTurns }: BoundaryInput): BoundaryDecision => {
  const text = normalise(query ?? "");
  if (!text) return { kind: "continue" };

  const unsupportedKind = matchUnsupported(text);
  if (unsupportedKind) {
    return { kind: "unsupported", unsupportedKind, answer: UNSUPPORTED_ANSWERS[unsupportedKind] };
  }

  const clarification = resolveClarification(query);
  if (clarification && !hasUsableReferent(clarification.topic, priorTurns)) {
    return { kind: "clarify", topic: clarification.topic, answer: clarification.question };
  }

  return { kind: "continue" };
};

export type { ClarificationTopic } from "./clarification.ts";
