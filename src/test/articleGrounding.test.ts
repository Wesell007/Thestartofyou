import { describe, expect, it } from "vitest";
import registrySource from "../lib/grounding/articleGroundingRegistry?raw";
import eligibilitySource from "../lib/grounding/articleGroundingEligibility?raw";
import {
  ARTICLE_GROUNDING_REGISTRY,
  getArticleGroundingRecord,
  listArticleGroundingSlugs,
} from "../lib/grounding/articleGroundingRegistry";
import {
  evaluateGroundingEligibility,
  isGroundingEligible,
  listGroundingEligibleSlugs,
} from "../lib/grounding/articleGroundingEligibility";
import {
  ALLOWED_GROUNDING_FIELDS,
  type ArticleGroundingRecord,
} from "../lib/grounding/articleGroundingTypes";
import { AI_SOURCE_ROUTING_VERSION } from "../../supabase/functions/_shared/aiVersions";

/** A hypothetical fully approved record, used only to prove the gates work. */
const approvedFixture = (): ArticleGroundingRecord => ({
  slug: "fixture-article",
  journey: ["pregnancy"],
  topics: ["body"],
  editorialStatus: "live",
  archived: false,
  deprecated: false,
  hasSourceList: true,
  sensitivity: "health_reviewed",
  contentVersion: "1.0.0",
  owner: "editorial",
  reviewer: "Jenny Joines",
  reviewedDate: "2026-08-01",
  approvalStatus: "approved",
  approvedBy: "governance",
  approvedAt: "2026-08-01T00:00:00.000Z",
});

describe("default deny", () => {
  it("approves no article in the registry", () => {
    expect(listGroundingEligibleSlugs()).toEqual([]);
  });

  it("has zero entries with approvalStatus approved", () => {
    const approved = ARTICLE_GROUNDING_REGISTRY.filter(
      (record) => record.approvalStatus === "approved",
    );
    expect(approved).toEqual([]);
  });

  it("has no approvedBy or approvedAt anywhere", () => {
    for (const record of ARTICLE_GROUNDING_REGISTRY) {
      expect(record.approvedBy).toBeUndefined();
      expect(record.approvedAt).toBeUndefined();
    }
  });

  it("returns not approved for an unknown slug", () => {
    const result = evaluateGroundingEligibility("no-such-article");
    expect(result.eligible).toBe(false);
    expect(result.reasons).toEqual(["not_in_registry"]);
  });

  it("returns not approved for every registered slug", () => {
    for (const slug of listArticleGroundingSlugs()) {
      expect(isGroundingEligible(slug)).toBe(false);
    }
  });

  it("covers the article catalogue explicitly", () => {
    expect(ARTICLE_GROUNDING_REGISTRY.length).toBeGreaterThan(200);
    const slugs = listArticleGroundingSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("eligibility gates", () => {
  it("only the synthetic complete fixture can pass", () => {
    expect(isGroundingEligible(approvedFixture())).toBe(true);
  });

  const removals: Array<[keyof ArticleGroundingRecord, string]> = [
    ["contentVersion", "content_version_missing"],
    ["owner", "owner_missing"],
    ["reviewer", "reviewer_missing"],
    ["reviewedDate", "reviewed_date_missing"],
    ["approvedBy", "approved_by_missing"],
    ["approvedAt", "approved_at_missing"],
    ["sensitivity", "sensitivity_missing"],
  ];

  for (const [field, reason] of removals) {
    it(`rejects when ${String(field)} is missing`, () => {
      const record = approvedFixture();
      delete (record as unknown as Record<string, unknown>)[field as string];
      const result = evaluateGroundingEligibility(record);
      expect(result.eligible).toBe(false);
      expect(result.reasons).toContain(reason);
    });
  }

  it("rejects when the source list is missing for reviewed content", () => {
    const result = evaluateGroundingEligibility({
      ...approvedFixture(),
      hasSourceList: false,
    });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("source_list_missing");
  });

  it("rejects drafts", () => {
    const result = evaluateGroundingEligibility({
      ...approvedFixture(),
      editorialStatus: "draft",
    });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("draft");
  });

  it("rejects archived records", () => {
    expect(
      isGroundingEligible({ ...approvedFixture(), archived: true }),
    ).toBe(false);
  });

  it("rejects deprecated records", () => {
    expect(
      isGroundingEligible({ ...approvedFixture(), deprecated: true }),
    ).toBe(false);
  });

  it("rejects not_allowed sensitivity", () => {
    const result = evaluateGroundingEligibility({
      ...approvedFixture(),
      sensitivity: "not_allowed",
    });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("sensitivity_not_allowed");
  });

  it("rejects a record whose approval status is not approved", () => {
    const result = evaluateGroundingEligibility({
      ...approvedFixture(),
      approvalStatus: "candidate",
    });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("approval_status_not_approved");
  });
});

describe("metadata-only guard", () => {
  it("registry records carry allowed metadata fields only", () => {
    for (const record of ARTICLE_GROUNDING_REGISTRY) {
      for (const key of Object.keys(record)) {
        expect(ALLOWED_GROUNDING_FIELDS).toContain(key);
      }
    }
  });

  it("registry imports no body-bearing article dataset", () => {
    expect(registrySource).not.toMatch(/from\s+["']@?\/?.*data\//);
    expect(eligibilitySource).not.toMatch(/from\s+["']@?\/?.*data\//);
  });

  it("no record holds long prose in any string field", () => {
    for (const record of ARTICLE_GROUNDING_REGISTRY) {
      for (const value of Object.values(record)) {
        if (typeof value === "string") {
          expect(value.length).toBeLessThan(120);
        }
      }
    }
  });

  it("helper output contains slug and reason codes only", () => {
    const record = getArticleGroundingRecord(listArticleGroundingSlugs()[0]);
    expect(record).toBeDefined();
    const result = evaluateGroundingEligibility(record!);
    expect(Object.keys(result).sort()).toEqual(["eligible", "reasons", "slug"]);
    for (const reason of result.reasons) {
      expect(reason).toMatch(/^[a-z_]+$/);
    }
  });
});

describe("AI boundary", () => {
  it("leaves source routing version unchanged", () => {
    expect(AI_SOURCE_ROUTING_VERSION).toBe("30B-source-routing-v1");
  });

  it("grounding modules import no AI runtime module", () => {
    for (const source of [registrySource, eligibilitySource]) {
      const imports = source.match(/from\s+["'][^"']+["']/g) ?? [];
      for (const line of imports) {
        expect(line).not.toMatch(/aiSources|aiModes|ai-search|supabase/);
      }
    }
  });
});

/**
 * Phase 30F — editorial status resolution pins.
 *
 * Seven records moved from `unknown` to `live` on explicit repository status
 * evidence only. Nothing else about them changed and nothing became eligible.
 */
const PHASE_30F_RESOLVED_TO_LIVE = [
  "calmer-evenings-after-busy-days",
  "family-sick-days-at-home",
  "planning-family-days-out",
  "second-time-parenting",
  "simple-family-play-ideas",
  "staying-connected-as-parents",
  "two-week-wait",
] as const;

describe("Phase 30F editorial status resolution", () => {
  it("keeps the total registry count at 206", () => {
    expect(ARTICLE_GROUNDING_REGISTRY.length).toBe(206);
  });

  it("pins the post-30F editorial status counts", () => {
    const counts = ARTICLE_GROUNDING_REGISTRY.reduce<Record<string, number>>(
      (acc, record) => {
        acc[record.editorialStatus] = (acc[record.editorialStatus] ?? 0) + 1;
        return acc;
      },
      {},
    );
    expect(counts).toEqual({ live: 117, draft: 44, unknown: 45 });
  });

  it("resolved exactly the seven evidence-backed records from unknown to live", () => {
    for (const slug of PHASE_30F_RESOLVED_TO_LIVE) {
      const record = getArticleGroundingRecord(slug);
      expect(record, `missing registry record: ${slug}`).toBeDefined();
      // old: "unknown" -> new: "live"
      expect(record!.editorialStatus).toBe("live");
    }
  });

  it("leaves the resolved records blocked on missing governance metadata", () => {
    for (const slug of PHASE_30F_RESOLVED_TO_LIVE) {
      const record = getArticleGroundingRecord(slug)!;
      expect(record.approvalStatus).toBe("blocked_missing_metadata");
      expect(record.owner).toBeUndefined();
      expect(record.contentVersion).toBeUndefined();
      expect(record.reviewer).toBeUndefined();
      expect(record.reviewedDate).toBeUndefined();
      expect(record.sensitivity).toBeUndefined();
      expect(record.approvedBy).toBeUndefined();
      expect(record.approvedAt).toBeUndefined();
      expect(isGroundingEligible(record)).toBe(false);
    }
  });

  it("has zero candidate and zero approved records after Phase 30F", () => {
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "candidate"),
    ).toEqual([]);
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "approved"),
    ).toEqual([]);
  });

  it("returns no grounding eligible slugs", () => {
    expect(listGroundingEligibleSlugs()).toEqual([]);
  });
});
