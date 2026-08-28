/**
 * Phase 30K Stage 1 — substantive content digest for grounding evidence.
 *
 * Governance tooling only. This script is never imported by any runtime
 * module, edge function, prompt, mode or AI path. It prints slugs and digests
 * only and never prints article body text.
 *
 * A digest produced here is a *prepared evidence fingerprint*. It is not a
 * human review, not owner authorisation, not a sensitivity confirmation, not
 * candidate status and not approval.
 *
 * Digest specification: docs/ai/grounding-approvals/digest-specification.md
 */

import { createHash } from "node:crypto";
import { familyArticles } from "../src/data/familyArticleData";

/** Pinned specification version. Bumping this invalidates stored digests. */
export const DIGEST_SPEC_VERSION = "30K-content-digest-v1";

/** The exact Phase 30K Stage 1 batch. No other slug is digested here. */
export const PHASE_30K_BATCH = [
  "second-time-parenting",
  "staying-connected-as-parents",
  "calmer-evenings-after-busy-days",
  "planning-family-days-out",
  "simple-family-play-ideas",
] as const;

/**
 * Substantive, user-facing content fields only. Governance and editorial
 * metadata (lastUpdated, status, reviewedBy, owner, reviewer, reviewedDate,
 * approval fields) and presentational fields (seoTitle, seoDescription,
 * readTime, relatedSlugs, imagery) are deliberately excluded, so a
 * metadata-only edit cannot move the fingerprint.
 */
export interface SubstantiveContent {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  keyTakeaways: string[];
}

/** Minimal shape the digest reads. Body text is never returned or logged. */
export interface DigestableArticle {
  slug: string;
  title: string;
  description: string;
  intro?: string;
  sections?: { heading: string; body: string[] }[];
  keyTakeaways?: string[];
}

/**
 * Line-ending normalisation only. Substantive string content is preserved
 * exactly: paragraphs, list formatting and meaningful line breaks are never
 * collapsed, trimmed or rewritten for hashing.
 */
const normaliseLineEndings = (value: string): string =>
  value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

/** Extracts the substantive content of one article, in source order. */
export const extractSubstantiveContent = (
  article: DigestableArticle,
): SubstantiveContent => ({
  slug: article.slug,
  title: normaliseLineEndings(article.title),
  description: normaliseLineEndings(article.description),
  intro: normaliseLineEndings(article.intro ?? ""),
  sections: (article.sections ?? []).map((section) => ({
    heading: normaliseLineEndings(section.heading),
    body: section.body.map(normaliseLineEndings),
  })),
  keyTakeaways: (article.keyTakeaways ?? []).map(normaliseLineEndings),
});

/**
 * Deterministic serialisation: fixed field order, arrays in source order, no
 * presentation-only JSON whitespace. String values are untouched.
 */
export const canonicalise = (content: SubstantiveContent): string =>
  JSON.stringify([
    ["specVersion", DIGEST_SPEC_VERSION],
    ["slug", content.slug],
    ["title", content.title],
    ["description", content.description],
    ["intro", content.intro],
    [
      "sections",
      content.sections.map((section) => [
        ["heading", section.heading],
        ["body", section.body],
      ]),
    ],
    ["keyTakeaways", content.keyTakeaways],
  ]);

/** Full 64-character lowercase SHA-256 hex digest. Never truncated. */
export const computeContentDigest = (content: SubstantiveContent): string =>
  createHash("sha256").update(canonicalise(content), "utf8").digest("hex");

/** Digest for one article record. */
export const digestArticle = (article: DigestableArticle): string =>
  computeContentDigest(extractSubstantiveContent(article));

/** Digest for a slug in the family dataset. Throws when the slug is absent. */
export const digestForSlug = (slug: string): string => {
  const article = familyArticles.find((item) => item.slug === slug);
  if (!article) throw new Error(`article not found in dataset: ${slug}`);
  return digestArticle(article);
};

/** Slug to full digest for the pinned batch. */
export const digestBatch = (): Record<string, string> =>
  Object.fromEntries(PHASE_30K_BATCH.map((slug) => [slug, digestForSlug(slug)]));

const isDirectRun =
  typeof process !== "undefined" &&
  Array.isArray(process.argv) &&
  Boolean(process.argv[1]?.includes("grounding-content-digest"));

if (isDirectRun) {
  // Slug and digest only. No article text is ever printed.
  console.log(`digest spec: ${DIGEST_SPEC_VERSION}`);
  for (const [slug, digest] of Object.entries(digestBatch())) {
    console.log(`${slug}  ${digest}`);
  }
}
