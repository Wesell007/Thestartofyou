/**
 * Phase 30C — article grounding metadata model (types only).
 *
 * This module describes governance metadata about Start of You articles. It is
 * deliberately not connected to the AI: no prompt, mode, source-routing rule,
 * endpoint or answer renderer imports it. It exists so that a future,
 * separately gated phase can reason about whether an article could ever be a
 * grounding candidate.
 *
 * Hard boundary: this model has no field for article body, sections, prose,
 * takeaways, long descriptions, images or media, and no field for any
 * user-authored content (journal, notes, reflections, logs, media). Those are
 * never grounding material and are not representable here.
 */

/**
 * How sensitive the content is, which decides how strong the review has to be
 * before the article could ever be a grounding candidate.
 *
 * - `low` — practical, non-clinical guidance
 * - `wellbeing` — emotional and experiential content, no clinical claims
 * - `health_reviewed` — health content requiring a named medical reviewer
 * - `safety_sensitive` — safety, urgency or risk content, strongest review
 * - `not_allowed` — never eligible for grounding at any review level
 */
export type GroundingSensitivity =
  | "low"
  | "wellbeing"
  | "health_reviewed"
  | "safety_sensitive"
  | "not_allowed";

/** Editorial lifecycle state, mirrored from the editorial inventory. */
export type ArticleEditorialStatus =
  | "live"
  | "draft"
  | "placeholder"
  | "unknown";

/**
 * Grounding approval state. Only `approved` can ever make an article eligible,
 * and only alongside a complete metadata record.
 */
export type GroundingApprovalStatus =
  | "not_approved"
  | "blocked_missing_metadata"
  | "blocked_draft"
  | "blocked_review_required"
  | "candidate"
  | "approved"
  | "deprecated"
  | "archived";

/** Sensitivity levels that can never be grounding material, at any review. */
export const NEVER_ELIGIBLE_SENSITIVITY: readonly GroundingSensitivity[] = [
  "not_allowed",
];

/** Sensitivity levels that require a named reviewer and a source list. */
export const REVIEW_REQUIRED_SENSITIVITY: readonly GroundingSensitivity[] = [
  "health_reviewed",
  "safety_sensitive",
];

/**
 * One article's grounding governance record. Metadata only.
 *
 * Every review and approval field is optional so that "missing" is
 * representable and must be rejected explicitly at runtime, rather than being
 * assumed present by the type system.
 */
export interface ArticleGroundingRecord {
  /** Article slug. The only identifier stored. */
  slug: string;
  /** Journey tags, from the existing journey vocabulary. */
  journey: string[];
  /** Topic tags, from the existing topic vocabulary. */
  topics: string[];
  /** Editorial lifecycle state. */
  editorialStatus: ArticleEditorialStatus;
  /** Archived content is structurally excluded. */
  archived: boolean;
  /** Deprecated content is structurally excluded. */
  deprecated: boolean;
  /** Whether a structured source list exists. Presence only, never contents. */
  hasSourceList: boolean;
  /** Assessed sensitivity level. Absent means unassessed, which blocks. */
  sensitivity?: GroundingSensitivity;
  /** Content version string. Absent blocks. */
  contentVersion?: string;
  /** Accountable content owner. Absent blocks. */
  owner?: string;
  /** Named reviewer. Required for review-required sensitivity levels. */
  reviewer?: string;
  /** ISO date the content was last reviewed. Absent blocks. */
  reviewedDate?: string;
  /** Grounding approval state. Blocked by default in the registry. */
  approvalStatus: GroundingApprovalStatus;
  /** Who granted grounding approval. Absent blocks. */
  approvedBy?: string;
  /** ISO timestamp of grounding approval. Absent blocks. */
  approvedAt?: string;
  /** Short governance note. Never article content. */
  approvalNotes?: string;
  /** Slug that supersedes this record, when deprecated. */
  replacementSlug?: string;
  /** Reference used to roll an approval back without a migration. */
  rollbackRef?: string;
}

/** Every field name a grounding record is allowed to carry. */
export const ALLOWED_GROUNDING_FIELDS: readonly string[] = [
  "slug",
  "journey",
  "topics",
  "sensitivity",
  "contentVersion",
  "owner",
  "reviewer",
  "reviewedDate",
  "hasSourceList",
  "editorialStatus",
  "archived",
  "deprecated",
  "approvalStatus",
  "approvedBy",
  "approvedAt",
  "approvalNotes",
  "replacementSlug",
  "rollbackRef",
];

/** Reason codes explaining why an article is not eligible for grounding. */
export type GroundingIneligibilityReason =
  | "not_in_registry"
  | "not_live"
  | "draft"
  | "archived"
  | "deprecated"
  | "sensitivity_missing"
  | "sensitivity_not_allowed"
  | "content_version_missing"
  | "owner_missing"
  | "reviewer_missing"
  | "reviewed_date_missing"
  | "source_list_missing"
  | "approval_status_not_approved"
  | "approved_by_missing"
  | "approved_at_missing";

/** Result of an eligibility check. Reason codes only, never content. */
export interface GroundingEligibilityResult {
  slug: string;
  eligible: boolean;
  reasons: GroundingIneligibilityReason[];
}
