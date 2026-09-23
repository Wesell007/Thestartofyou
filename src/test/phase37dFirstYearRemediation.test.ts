import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { firstYearArticles } from "@/data/firstYearArticleData";
import { firstYearPathways, getPathwayArticles, getPathwayStartHere } from "@/data/firstYearPathwayData";
import { phaseData } from "@/data/firstYearPhaseData";
import { monthData } from "@/data/firstYearMonthData";
import { getFirstYearArticleImages } from "@/components/firstyear/article/firstYearArticleImages";
import { articleInventory } from "@/data/articleInventory";
import { ARTICLE_GROUNDING_REGISTRY } from "@/lib/grounding/articleGroundingRegistry";

/**
 * Phase 37D — First Year content remediation.
 *
 * Guards the two new articles, the six expansions, the discovery pass, the
 * Toddler and Family handoffs, the legacy milestone canonical decision and the
 * inventory-staleness fix. Grounding must remain default-deny throughout.
 */

const NC1 = "breastfeeding-problems-and-where-to-get-help";
const NC2 = "postpartum-recovery-in-the-later-first-year";
const WEAK = [
  "teething",
  "colic-and-evening-crying",
  "newborn-quirks-and-reflexes",
  "newborn-skin-spots-and-marks",
];

const bySlug = (slug: string) => firstYearArticles.find((article) => article.slug === slug);

const monthHrefs = Object.values(monthData).flatMap((month) => [
  ...month.related.map((item) => item.href),
  ...month.commonQuestions.flatMap((q) => (q.readMore ? [q.readMore.href] : [])),
]);
const phaseHrefs = Object.values(phaseData).flatMap((phase) => [
  ...phase.featuredGuidance.map((item) => item.href),
  ...phase.relatedTopics.map((item) => item.href),
  ...phase.commonQuestions.flatMap((q) => (q.readMore ? [q.readMore.href] : [])),
]);
const articleHrefs = firstYearArticles.flatMap((article) => [
  ...(article.relatedSlugs ?? []),
  ...(article.crossLinks ?? []).map((link) => link.href),
]);
const allDiscovery = [...monthHrefs, ...phaseHrefs, ...articleHrefs];

const inboundFor = (slug: string) =>
  allDiscovery.filter((href) => href === slug || href.endsWith(`/${slug}`)).length;

describe("Phase 37D — First Year remediation", () => {
  it("publishes 28 ready First Year articles, 16 baby and 12 postpartum", () => {
    const ready = firstYearArticles.filter((article) => article.status === "ready");
    expect(ready).toHaveLength(28);
    expect(getPathwayArticles(firstYearPathways.baby)).toHaveLength(16);
    expect(getPathwayArticles(firstYearPathways.postpartum)).toHaveLength(12);
  });

  it("resolves NC-1 and NC-2 as ready records with the expected topic ownership", () => {
    const nc1 = bySlug(NC1);
    const nc2 = bySlug(NC2);
    expect(nc1?.status).toBe("ready");
    expect(nc1?.topic).toBe("feeding");
    expect(nc2?.status).toBe("ready");
    expect(nc2?.topic).toBe("postpartum-recovery");
    expect(nc1?.sources.length).toBeGreaterThan(0);
    expect(nc2?.sources.length).toBeGreaterThan(0);
  });

  it("claims no medical review for the new articles", () => {
    [NC1, NC2].forEach((slug) => {
      const article = bySlug(slug);
      expect(article?.medicallyReviewed ?? false).toBe(false);
      expect(article?.reviewedBy).toBeUndefined();
    });
  });

  it("gives both new articles an explicit, distinct hero and no generic fallback", () => {
    const heroes = firstYearArticles.map((article) => getFirstYearArticleImages(article.slug)?.hero);
    expect(heroes.every((hero) => Boolean(hero?.src && hero.alt))).toBe(true);
    expect(new Set(heroes.map((hero) => hero?.src)).size).toBe(firstYearArticles.length);
    expect(firstYearArticles.filter((article) => article.suppressHeroImage)).toHaveLength(0);
  });

  it("gives NC-1 high-salience discovery and NC-2 later-year discovery", () => {
    expect(getPathwayStartHere(firstYearPathways.baby).map((a) => a.slug)).toContain(NC1);
    expect(inboundFor(NC1)).toBeGreaterThanOrEqual(3);
    expect(inboundFor(NC2)).toBeGreaterThanOrEqual(3);
    expect(phaseHrefs.some((href) => href.endsWith(`/${NC2}`))).toBe(true);
  });

  it("moves the four weak-discovery articles to multiple inbound surfaces", () => {
    WEAK.forEach((slug) => {
      expect(inboundFor(slug), slug).toBeGreaterThanOrEqual(2);
    });
  });

  it("implements the six EXPAND_EXISTING intents", () => {
    const has = (slug: string, needle: RegExp) => {
      const article = bySlug(slug);
      const text = JSON.stringify(article?.sections ?? []);
      expect(text, slug).toMatch(needle);
    };
    has("bottle-and-breastfeeding-questions", /When feeding hurts/i);
    has("baby-development-in-the-first-year", /babble/i);
    has("introducing-solid-foods", /family meals/i);
    has("healing-after-birth", /caesarean/i);
    has("body-changes-after-birth", /continence/i);
    has("when-to-ask-for-help-after-birth", /intrusive thoughts/i);
  });

  it("carries the Toddler content handoff in the 9-12 month phase", () => {
    const phase = phaseData["9-12-months"];
    expect(phase.editorial).toMatch(/toddler/i);
    const toddlerLinks = [
      ...phase.featuredGuidance.map((item) => item.href),
      ...phase.commonQuestions.flatMap((q) => (q.readMore ? [q.readMore.href] : [])),
    ].filter((href) => href.startsWith("/toddler"));
    expect(toddlerLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("carries a contextual Family handoff", () => {
    expect(phaseHrefs.some((href) => href.startsWith("/family"))).toBe(true);
  });

  it("resolves the legacy milestone canonical decision", () => {
    const legacy = articleInventory.find((r) => r.id === "legacy:baby-milestones-first-year");
    const canonical = articleInventory.find(
      (r) => r.id === "first-year:baby-development-in-the-first-year",
    );
    expect(legacy?.canonicalRole).toBe("supporting");
    expect(legacy?.canonicalTarget).toBe("/first-year/development/baby-development-in-the-first-year");
    expect(canonical?.canonicalRole).toBe("primary");

    const legacySource = readFileSync(resolve("src/data/articleData.ts"), "utf8");
    const record = legacySource.slice(
      legacySource.indexOf('slug: "baby-milestones-first-year"'),
      legacySource.indexOf('slug: "baby-milestones-first-year"') + 4000,
    );
    expect(record).toContain("/first-year/development/baby-development-in-the-first-year");
  });

  it("corrects the known inventory staleness and registers both new articles", () => {
    const help = articleInventory.find((r) => r.id === "first-year:when-to-ask-for-help-after-birth");
    expect(help?.currentStatus).toBe("live");
    expect(help?.contentState).toBe("final");
    expect(help?.recommendedAction).toBe("keep");

    [NC1, NC2].forEach((slug) => {
      const record = articleInventory.find((r) => r.id === `first-year:${slug}`);
      expect(record?.currentStatus, slug).toBe("live");
      expect(record?.contentState, slug).toBe("final");
    });
  });

  it("keeps grounding default-deny for the two new slugs", () => {
    [NC1, NC2].forEach((slug) => {
      const record = ARTICLE_GROUNDING_REGISTRY.find((r) => r.slug === slug);
      expect(record, slug).toBeTruthy();
      expect(record?.approvalStatus, slug).not.toBe("approved");
    });
    expect(ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "approved")).toHaveLength(0);
  });

  it("includes both new article URLs in the sitemap exactly once", () => {
    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(new Set(locs).size).toBe(locs.length);
    [
      "https://thestartofyou.com/first-year/feeding/breastfeeding-problems-and-where-to-get-help",
      "https://thestartofyou.com/first-year/postpartum-recovery/postpartum-recovery-in-the-later-first-year",
    ].forEach((url) => {
      expect(locs.filter((loc) => loc === url)).toHaveLength(1);
    });
  });
});
