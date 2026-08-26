/**
 * Phase 30D — registry drift guard.
 *
 * Article datasets are imported HERE ONLY. The runtime grounding modules must
 * never import them; the boundary assertions below enforce that.
 */
import { describe, expect, it } from "vitest";
import registrySource from "../lib/grounding/articleGroundingRegistry?raw";
import eligibilitySource from "../lib/grounding/articleGroundingEligibility?raw";
import { getAllArticles } from "../data/articleData";
import { familyArticles } from "../data/familyArticleData";
import { firstYearArticles } from "../data/firstYearArticleData";
import { toddlerArticles } from "../data/toddlerArticleData";
import {
  ARTICLE_GROUNDING_REGISTRY,
  listArticleGroundingSlugs,
} from "../lib/grounding/articleGroundingRegistry";
import {
  evaluateGroundingEligibility,
  isGroundingEligible,
  listGroundingEligibleSlugs,
} from "../lib/grounding/articleGroundingEligibility";
import { AI_SOURCE_ROUTING_VERSION } from "../../supabase/functions/_shared/aiVersions";

const datasetSlugs = (): string[] => [
  ...getAllArticles().map((a) => a.slug),
  ...familyArticles.map((a) => a.slug),
  ...firstYearArticles.map((a) => a.slug),
  ...toddlerArticles.map((a) => a.slug),
];

const uniqueDatasetSlugs = () => new Set(datasetSlugs());
const registrySlugs = () => new Set(listArticleGroundingSlugs());

describe("registry drift guard", () => {
  it("has a grounding record for every article slug", () => {
    const registry = registrySlugs();
    const missing = [...uniqueDatasetSlugs()].filter((s) => !registry.has(s));
    expect(
      missing,
      `articles with no grounding registry record: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  it("has no orphan registry records", () => {
    const datasets = uniqueDatasetSlugs();
    const orphans = [...registrySlugs()].filter((s) => !datasets.has(s));
    expect(
      orphans,
      `registry records with no matching article: ${orphans.join(", ")}`,
    ).toEqual([]);
  });

  it("has no duplicate registry slugs", () => {
    const slugs = listArticleGroundingSlugs();
    const seen = new Set<string>();
    const duplicates = slugs.filter((s) => (seen.has(s) ? true : (seen.add(s), false)));
    expect(duplicates, `duplicate slugs: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("covers the full catalogue count", () => {
    expect(registrySlugs().size).toBe(uniqueDatasetSlugs().size);
  });
});

describe("default deny holds after drift check", () => {
  it("has zero approved records", () => {
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "approved"),
    ).toEqual([]);
  });

  it("returns no eligible slugs", () => {
    expect(listGroundingEligibleSlugs()).toEqual([]);
  });

  it("treats unknown slugs as not approved", () => {
    const result = evaluateGroundingEligibility("definitely-not-an-article");
    expect(result.eligible).toBe(false);
    expect(result.reasons).toEqual(["not_in_registry"]);
    expect(isGroundingEligible("definitely-not-an-article")).toBe(false);
  });
});

describe("runtime metadata-only boundary", () => {
  it("runtime grounding modules import no article dataset", () => {
    for (const source of [registrySource, eligibilitySource]) {
      expect(source).not.toMatch(/from\s+["'][^"']*data\/[^"']*Article/);
      expect(source).not.toMatch(/from\s+["'][^"']*data\//);
    }
  });

  it("runtime grounding modules import no AI runtime module", () => {
    for (const source of [registrySource, eligibilitySource]) {
      const imports = source.match(/from\s+["'][^"']+["']/g) ?? [];
      for (const line of imports) {
        expect(line).not.toMatch(/aiSources|aiModes|ai-search|supabase/);
      }
    }
  });

  it("eligibility output exposes no article body content", () => {
    const bodyStrings = getAllArticles()
      .slice(0, 25)
      .map((a) => a.title)
      .filter(Boolean);
    for (const slug of listArticleGroundingSlugs().slice(0, 25)) {
      const result = evaluateGroundingEligibility(slug);
      expect(Object.keys(result).sort()).toEqual(["eligible", "reasons", "slug"]);
      const serialised = JSON.stringify(result);
      for (const text of bodyStrings) {
        expect(serialised).not.toContain(text);
      }
    }
  });
});

describe("AI boundary unchanged", () => {
  it("keeps the source routing version pinned", () => {
    expect(AI_SOURCE_ROUTING_VERSION).toBe("30B-source-routing-v1");
  });
});
