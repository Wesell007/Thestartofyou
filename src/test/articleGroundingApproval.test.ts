/**
 * Phase 30K Stage 1 — evidence preparation guards.
 *
 * Proves the digest specification is deterministic and metadata-blind, that the
 * stored manifest matches recomputation from the dataset, that the registry is
 * unchanged (zero candidates, zero approvals, zero eligible slugs), and that no
 * real human decision or source-validation event exists.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { familyArticles } from "../data/familyArticleData";
import {
  ARTICLE_GROUNDING_REGISTRY,
  getArticleGroundingRecord,
} from "../lib/grounding/articleGroundingRegistry";
import { listGroundingEligibleSlugs } from "../lib/grounding/articleGroundingEligibility";
import {
  DIGEST_SPEC_VERSION,
  PHASE_30K_BATCH,
  digestArticle,
  digestForSlug,
} from "../../scripts/grounding-content-digest";

const repoFile = (relative: string) =>
  readFileSync(resolve(process.cwd(), relative), "utf8");

const registrySource = repoFile("src/lib/grounding/articleGroundingRegistry.ts");
const eligibilitySource = repoFile(
  "src/lib/grounding/articleGroundingEligibility.ts",
);
const aiVersionsSource = repoFile("supabase/functions/_shared/aiVersions.ts");


const manifest = JSON.parse(
  repoFile("docs/ai/grounding-approvals/content-digests.json"),
) as {
  digestSpecVersion: string;
  digests: { slug: string; contentDigest: string; contentVersion: null }[];
};

/** Slugs held for human safety review; never eligible, never in the batch. */
const SAFETY_HOLD_SLUGS = [
  "emotional-impact-of-ivf",
  "the-first-trimester-emotionally",
  "postpartum-recovery-timeline",
  "your-body-after-birth",
  "preparing-for-baby-complete-guide",
  "what-to-buy-for-a-new-baby",
  "the-space-your-baby-will-come-home-to",
] as const;

const batchArticle = (slug: string) => {
  const article = familyArticles.find((item) => item.slug === slug);
  expect(article, `dataset article missing: ${slug}`).toBeDefined();
  return article!;
};

describe("Phase 30K batch scope", () => {
  it("contains exactly the five authorised slugs", () => {
    expect([...PHASE_30K_BATCH]).toEqual([
      "second-time-parenting",
      "staying-connected-as-parents",
      "calmer-evenings-after-busy-days",
      "planning-family-days-out",
      "simple-family-play-ideas",
    ]);
  });

  it("includes no safety-hold slug", () => {
    for (const slug of SAFETY_HOLD_SLUGS) {
      expect([...PHASE_30K_BATCH]).not.toContain(slug);
    }
  });

  it("keeps every batch record live and blocked with no governance metadata", () => {
    for (const slug of PHASE_30K_BATCH) {
      const record = getArticleGroundingRecord(slug);
      expect(record, `missing registry record: ${slug}`).toBeDefined();
      expect(record!.editorialStatus).toBe("live");
      expect(record!.archived).toBe(false);
      expect(record!.deprecated).toBe(false);
      expect(record!.approvalStatus).toBe("blocked_missing_metadata");
      expect(record!.sensitivity).toBeUndefined();
      expect(record!.contentVersion).toBeUndefined();
      expect(record!.owner).toBeUndefined();
      expect(record!.reviewer).toBeUndefined();
      expect(record!.reviewedDate).toBeUndefined();
      expect(record!.approvedBy).toBeUndefined();
      expect(record!.approvedAt).toBeUndefined();
      expect(record!.approvalNotes).toBeUndefined();
      expect(record!.rollbackRef).toBeUndefined();
    }
  });
});

describe("content digest specification", () => {
  it("pins the specification version used by the manifest", () => {
    expect(DIGEST_SPEC_VERSION).toBe("30K-content-digest-v1");
    expect(manifest.digestSpecVersion).toBe(DIGEST_SPEC_VERSION);
  });

  it("produces a full 64-character lowercase hex digest", () => {
    for (const slug of PHASE_30K_BATCH) {
      expect(digestForSlug(slug)).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  it("is deterministic across repeated computation", () => {
    for (const slug of PHASE_30K_BATCH) {
      expect(digestForSlug(slug)).toBe(digestForSlug(slug));
    }
  });

  it("matches the stored manifest when recomputed from the dataset", () => {
    expect(manifest.digests.map((entry) => entry.slug)).toEqual([
      ...PHASE_30K_BATCH,
    ]);
    for (const entry of manifest.digests) {
      expect(entry.contentDigest, entry.slug).toBe(digestForSlug(entry.slug));
      expect(entry.contentVersion).toBeNull();
    }
  });

  it("ignores editorial and governance metadata changes", () => {
    const article = batchArticle("second-time-parenting");
    const base = digestArticle(article);
    expect(
      digestArticle({
        ...article,
        lastUpdated: "January 2099",
        status: "draft",
        reviewedBy: "Someone Else",
        seoTitle: "different",
        seoDescription: "different",
        readTime: "99 min read",
        relatedSlugs: ["nothing"],
      } as typeof article),
    ).toBe(base);
  });

  it("changes when substantive content changes", () => {
    const article = batchArticle("simple-family-play-ideas");
    const base = digestArticle(article);
    expect(digestArticle({ ...article, title: `${article.title} ` })).not.toBe(base);
    expect(
      digestArticle({ ...article, description: `${article.description}.` }),
    ).not.toBe(base);
    expect(
      digestArticle({
        ...article,
        keyTakeaways: [...(article.keyTakeaways ?? []), "extra"],
      }),
    ).not.toBe(base);
    expect(
      digestArticle({
        ...article,
        sections: (article.sections ?? []).slice(0, -1),
      }),
    ).not.toBe(base);
  });

  it("preserves substantive whitespace rather than collapsing it", () => {
    const article = batchArticle("planning-family-days-out");
    const spaced = {
      ...article,
      intro: "one\n\ntwo   three",
    };
    const collapsed = { ...article, intro: "one two three" };
    expect(digestArticle(spaced)).not.toBe(digestArticle(collapsed));
  });

  it("treats CRLF and LF line endings as identical", () => {
    const article = batchArticle("calmer-evenings-after-busy-days");
    expect(digestArticle({ ...article, intro: "a\r\nb" })).toBe(
      digestArticle({ ...article, intro: "a\nb" }),
    );
  });
});

describe("registry unchanged at Stage 1", () => {
  it("keeps the registry totals from Phase 30J", () => {
    expect(ARTICLE_GROUNDING_REGISTRY.length).toBe(206);
    const counts = ARTICLE_GROUNDING_REGISTRY.reduce<Record<string, number>>(
      (acc, record) => {
        acc[record.editorialStatus] = (acc[record.editorialStatus] ?? 0) + 1;
        return acc;
      },
      {},
    );
    expect(counts).toEqual({ live: 117, draft: 44, unknown: 45 });
  });

  it("has zero candidates and zero approvals", () => {
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "candidate"),
    ).toEqual([]);
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "approved"),
    ).toEqual([]);
  });

  it("has no sensitivity, approvedBy or approvedAt anywhere", () => {
    for (const record of ARTICLE_GROUNDING_REGISTRY) {
      expect(record.sensitivity).toBeUndefined();
      expect(record.approvedBy).toBeUndefined();
      expect(record.approvedAt).toBeUndefined();
    }
  });

  it("returns no grounding eligible slugs", () => {
    expect(listGroundingEligibleSlugs()).toEqual([]);
  });

  it("keeps every safety-hold record blocked and ineligible", () => {
    for (const slug of SAFETY_HOLD_SLUGS) {
      const record = getArticleGroundingRecord(slug);
      expect(record, `missing registry record: ${slug}`).toBeDefined();
      expect(record!.approvalStatus).toBe("blocked_missing_metadata");
      expect(listGroundingEligibleSlugs()).not.toContain(slug);
    }
  });
});

describe("evidence store integrity", () => {
  it("records zero real source-evidence states", () => {
    const sourceEvidence = JSON.parse(
      repoFile("docs/ai/grounding-approvals/source-evidence.json"),
    ) as { states: unknown[]; realStateCount: number };
    expect(sourceEvidence.states).toEqual([]);
    expect(sourceEvidence.realStateCount).toBe(0);
  });

  it("records zero real human decisions and zero validation events", () => {
    const decisions = repoFile("docs/ai/grounding-approvals/human-decisions.md");
    expect(decisions).toContain("Real human decisions recorded: 0");
    expect(decisions).not.toMatch(/hd-\d{4}\s*\|/);
    const validation = repoFile("docs/ai/grounding-approvals/source-validation.md");
    expect(validation).toContain("Real source-validation events recorded: 0");
    expect(validation).not.toMatch(/sv-\d{4}\s*\|/);
  });

  it("keeps an evidence package per batch slug", () => {
    for (const slug of PHASE_30K_BATCH) {
      const doc = repoFile(`docs/ai/grounding-approvals/evidence-${slug}.md`);
      expect(doc).toContain(digestForSlug(slug));
      expect(doc).toContain("blocked_missing_metadata");
    }
  });

  it("records the external-evidence eligibility gate as a blocker", () => {
    expect(repoFile("docs/ai/grounding-approvals/README.md")).toContain(
      "eligibility invalidation mechanism must be resolved before Stage 4 approval",
    );
  });

  it("documents all seven held records", () => {
    const hold = repoFile("docs/ai/article-grounding-safety-hold.md");
    for (const slug of SAFETY_HOLD_SLUGS) {
      expect(hold).toContain(slug);
    }
  });
});

describe("runtime boundary unchanged", () => {
  it("runtime grounding modules import no dataset, AI module or digest script", () => {
    for (const source of [registrySource, eligibilitySource]) {
      expect(source).not.toMatch(/from\s+["'][^"']*data\//);
      expect(source).not.toMatch(/grounding-content-digest/);
      const imports = source.match(/from\s+["'][^"']+["']/g) ?? [];
      for (const line of imports) {
        expect(line).not.toMatch(/aiSources|aiModes|ai-search|supabase/);
      }
    }
  });

  it("keeps the source routing version pinned", () => {
    expect(aiVersionsSource).toContain('"30B-source-routing-v1"');
  });

});
