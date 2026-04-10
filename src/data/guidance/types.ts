// ─── Guidance System v3.0 — Data Model ─────────────────────────────────
// Five page families, strict typing, no legacy article overlap.

export type PageFamily =
  | "stage-guidance"
  | "short"
  | "deep"
  | "tool-interpretation"
  | "support";

export type JourneyType =
  | "pregnancy"
  | "ivf"
  | "trying-to-conceive"
  | "postpartum"
  | "first-year"
  | "preparing-for-baby"
  | "support";

export type IntentType =
  | "symptom"
  | "reassurance"
  | "timing"
  | "comparison"
  | "what-is-happening"
  | "what-to-do"
  | "when-to-seek-help"
  | "emotional-support"
  | "tool-interpretation"
  | "stage-progression";

// ─── Shared types ──────────────────────────────────────────────────────

export interface StageLink {
  label: string;
  href: string;
  description?: string;
}

export interface JourneyCTA {
  label: string;
  href: string;
  description: string;
}

export interface AIConfig {
  context: string;
  prompts: [string, string, string]; // exactly 3
}

// ─── Short Guidance ────────────────────────────────────────────────────

export interface ShortGuidanceData {
  family: "short";
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  journey: JourneyType;
  intent: IntentType;
  quickAnswer: string;
  whatIsHappening: string;
  whatThisMeans: string;
  normalItems: string[];
  seekSupport: string[];
  disclaimer: string;
  whatYouCanDo: string[];
  nextBestRoute?: StageLink; // max 1, tightly controlled
  stageLinks: StageLink[]; // max 3
  journeyCTA: JourneyCTA;
  ai: AIConfig;
  cornerstoneSlug?: string; // bridge to deep, if one exists
}

// ─── Tool Interpretation ───────────────────────────────────────────────

export interface ToolInterpretationData {
  family: "tool-interpretation";
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  journey: JourneyType;
  toolName: string;
  whatThisMeans: string;
  keyPoints: { label: string; explanation: string }[];
  whatToExpectNow: string;
  whatNotToWorry: string[];
  stageLinks: StageLink[]; // max 3
  journeyCTA: JourneyCTA;
  ai: AIConfig;
}
