/**
 * Phase 30C — article grounding eligibility helpers.
 *
 * Default deny. These helpers answer one question: could this article ever be
 * a grounding candidate, given its governance metadata? They are not wired to
 * the AI. Nothing in `supabase/functions/` imports them, no prompt, mode,
 * source-routing rule or answer renderer reads them, and they never touch
 * article body content — the record type has no field for it.
 *
 * Every check is a rejection check. There is no path where a missing field is
 * treated as satisfied.
 */

import {
  getArticleGroundingRecord,
  ARTICLE_GROUNDING_REGISTRY,
} from "./articleGroundingRegistry";
import {
  NEVER_ELIGIBLE_SENSITIVITY,
  REVIEW_REQUIRED_SENSITIVITY,
  type ArticleGroundingRecord,
  type GroundingEligibilityResult,
  type GroundingIneligibilityReason,
} from "./articleGroundingTypes";

const isPresent = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Returns the governance record for a slug, or undefined when uncovered. */
export const getGroundingRecord = (
  slug: string,
): ArticleGroundingRecord | undefined => getArticleGroundingRecord(slug);

/**
 * Evaluates a slug or an explicit record. Returns every failed requirement, so
 * a reviewer can see the full gap rather than the first one.
 */
export const evaluateGroundingEligibility = (
  input: string | ArticleGroundingRecord,
): GroundingEligibilityResult => {
  const record =
    typeof input === "string" ? getGroundingRecord(input) : input;
  const slug = typeof input === "string" ? input : input.slug;

  if (!record) {
    return { slug, eligible: false, reasons: ["not_in_registry"] };
  }

  const reasons: GroundingIneligibilityReason[] = [];

  if (record.editorialStatus === "draft") reasons.push("draft");
  if (record.editorialStatus !== "live") reasons.push("not_live");
  if (record.archived) reasons.push("archived");
  if (record.deprecated) reasons.push("deprecated");

  const { sensitivity } = record;
  if (!sensitivity) {
    reasons.push("sensitivity_missing");
  } else if (NEVER_ELIGIBLE_SENSITIVITY.includes(sensitivity)) {
    reasons.push("sensitivity_not_allowed");
  }

  if (!isPresent(record.contentVersion)) reasons.push("content_version_missing");
  if (!isPresent(record.owner)) reasons.push("owner_missing");
  if (!isPresent(record.reviewedDate)) reasons.push("reviewed_date_missing");

  const reviewRequired =
    !sensitivity || REVIEW_REQUIRED_SENSITIVITY.includes(sensitivity);
  if (reviewRequired) {
    if (!isPresent(record.reviewer)) reasons.push("reviewer_missing");
    if (!record.hasSourceList) reasons.push("source_list_missing");
  }

  if (record.approvalStatus !== "approved") {
    reasons.push("approval_status_not_approved");
  }
  if (!isPresent(record.approvedBy)) reasons.push("approved_by_missing");
  if (!isPresent(record.approvedAt)) reasons.push("approved_at_missing");

  return { slug, eligible: reasons.length === 0, reasons };
};

/** Boolean wrapper. Default deny for unknown slugs. */
export const isGroundingEligible = (
  input: string | ArticleGroundingRecord,
): boolean => evaluateGroundingEligibility(input).eligible;

/** Slugs currently eligible. Expected to be empty for the whole of Phase 30C. */
export const listGroundingEligibleSlugs = (): string[] =>
  ARTICLE_GROUNDING_REGISTRY.filter((record) => isGroundingEligible(record)).map(
    (record) => record.slug,
  );
