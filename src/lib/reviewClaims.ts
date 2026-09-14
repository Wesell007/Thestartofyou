/**
 * Phase 33.5 — reviewer claim governance.
 *
 * Single source of truth for whether a medical-review claim may be shown for a
 * given content surface.
 *
 * Binding rule: a visitor-facing or machine-facing medical-review claim may
 * render ONLY when genuine provenance exists for the exact surface being
 * claimed as reviewed. Dataset fields such as `reviewedBy`, `medicallyReviewed`
 * and `lastUpdated` are HISTORICAL / UNSUPPORTED REVIEW METADATA: they are kept
 * for governance remediation, and they never satisfy this gate.
 *
 * The production registry is intentionally empty — the repository audit proved
 * provenance-backed reviews = 0. Never populate it with inferred, historical or
 * default reviewer values.
 */

/** Content surfaces a review can be attached to. */
export type ReviewSurfaceKind =
  | "article"
  | "week"
  | "topic"
  | "stage"
  | "tool"
  | "support";

/**
 * Evidence that one specific content surface was genuinely reviewed.
 * Every field is required: identity, exact surface, completed state, and a
 * date or a traceable completed-review record reference.
 */
export interface ReviewProvenance {
  /** Exact surface key, e.g. `article:hair-dye-and-beauty-treatments-in-pregnancy`. */
  contentKey: string;
  /** Reviewer identity as it should be displayed. */
  reviewer: string;
  /** Only a completed review can be claimed. */
  reviewState: "completed";
  /** ISO date of review completion. Optional only when `reviewRecord` exists. */
  reviewedOn?: string;
  /** Traceable completed-review record reference. Optional only when `reviewedOn` exists. */
  reviewRecord?: string;
}

/**
 * PRODUCTION REGISTRY — EMPTY BY GOVERNANCE.
 * Provenance-backed reviews in this repository: 0.
 * Human reviews completed: 0.
 */
export const REVIEW_PROVENANCE_REGISTRY: readonly ReviewProvenance[] = [];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Build the exact surface key used by the gate. */
export const reviewSurfaceKey = (
  kind: ReviewSurfaceKind,
  identifier: string | number
): string => `${kind}:${identifier}`;

/** A record only counts when it is complete and traceable. */
export const isValidReviewProvenance = (
  record: ReviewProvenance | undefined | null
): record is ReviewProvenance => {
  if (!record) return false;
  if (record.reviewState !== "completed") return false;
  if (!record.contentKey.trim()) return false;
  if (!record.reviewer.trim()) return false;
  const hasDate = !!record.reviewedOn && ISO_DATE.test(record.reviewedOn);
  const hasRecord = !!record.reviewRecord && record.reviewRecord.trim().length > 0;
  return hasDate || hasRecord;
};

/**
 * Look up a claim for one exact surface. Returns the provenance record, or
 * `null` when nothing genuine exists — in which case no claim may render.
 * The registry argument exists for isolated tests only; production callers
 * must use the default.
 */
export const getReviewClaim = (
  contentKey: string | undefined | null,
  registry: readonly ReviewProvenance[] = REVIEW_PROVENANCE_REGISTRY
): ReviewProvenance | null => {
  if (!contentKey) return null;
  const match = registry.find((record) => record.contentKey === contentKey);
  return isValidReviewProvenance(match) ? match : null;
};

export const hasReviewClaim = (
  contentKey: string | undefined | null,
  registry: readonly ReviewProvenance[] = REVIEW_PROVENANCE_REGISTRY
): boolean => getReviewClaim(contentKey, registry) !== null;
