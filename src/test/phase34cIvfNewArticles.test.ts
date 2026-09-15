import { describe, expect, it } from "vitest";
import { getAllArticles, type ArticleData } from "@/data/articleData";
import { articleInventory } from "@/data/articleInventory";
import { ARTICLE_GROUNDING_REGISTRY } from "@/lib/grounding/articleGroundingRegistry";
import { evaluateGroundingEligibility } from "@/lib/grounding/articleGroundingEligibility";
import { REVIEW_PROVENANCE_REGISTRY } from "@/lib/reviewClaims";
import ivfGuidesSource from "../components/ivf/IVFGuides.tsx?raw";
import ivfPageSource from "../pages/IVF.tsx?raw";
import ivfStagesSource from "../components/ivf/IVFStages.tsx?raw";
import articleSourcesSource from "../components/article/ArticleSources.tsx?raw";

const NEW_SLUGS = [
  "what-ivf-is-uk-guide",
  "nhs-ivf-funding-and-eligibility",
  "ohss-and-ivf-side-effects",
  "when-an-ivf-cycle-does-not-work",
] as const;

const articles = getAllArticles();
const findArticle = (slug: string): ArticleData => {
  const record = articles.find((a) => a.slug === slug);
  expect(record, `article ${slug} must exist`).toBeTruthy();
  return record!;
};

describe("phase 34C — exactly four new IVF guides exist", () => {
  it("creates all four records", () => {
    for (const slug of NEW_SLUGS) expect(findArticle(slug).slug).toBe(slug);
  });

  it("creates no slug collisions anywhere in the article database", () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("adds no additional IVF articles beyond the approved batch", () => {
    const ivfArticles = articles.filter((a) => a.journey?.includes("ivf")).map((a) => a.slug);
    expect(ivfArticles.sort()).toEqual(
      [
        "emotional-impact-of-ivf",
        "ivf-timeline-what-to-expect",
        ...NEW_SLUGS,
      ].sort(),
    );
  });
});

describe("phase 34C — provenance and citation rendering", () => {
  it.each(NEW_SLUGS)("%s carries structured UK sources", (slug) => {
    const sources = findArticle(slug).sources as Array<Record<string, string>> | undefined;
    expect(Array.isArray(sources)).toBe(true);
    expect(sources!.length).toBeGreaterThanOrEqual(4);
    for (const source of sources!) {
      expect(typeof source).toBe("object");
      expect(source.label?.length ?? 0).toBeGreaterThan(0);
      expect(source.publisher?.length ?? 0).toBeGreaterThan(0);
      expect(source.url).toMatch(/^https:\/\//);
    }
    const primary = sources!.filter((s) => ["HFEA", "NHS", "NICE", "RCOG"].includes(s.publisher));
    expect(primary.length).toBeGreaterThan(sources!.length - primary.length);
  });

  it("renders citations as plain text, never as clickable external links", () => {
    expect(articleSourcesSource).not.toMatch(/<a\s/);
    expect(articleSourcesSource).not.toMatch(/target="_blank"/);
    expect(articleSourcesSource.toLowerCase()).not.toContain("opens in a new tab");
  });
});

describe("phase 34C — reviewer claim governance", () => {
  it("claims no medical review on any new guide", () => {
    for (const slug of NEW_SLUGS) {
      expect((findArticle(slug) as { reviewedBy?: string }).reviewedBy).toBeUndefined();
    }
  });

  it("keeps the review provenance registry empty, so no claim can render", () => {
    expect(REVIEW_PROVENANCE_REGISTRY).toHaveLength(0);
  });
});

describe("phase 34C — imagery", () => {
  it.each(NEW_SLUGS)("%s has a hero and at least two body images, all with alt text", (slug) => {
    const article = findArticle(slug);
    expect(article.hero?.src).toBeTruthy();
    expect((article.hero?.alt ?? "").length).toBeGreaterThan(20);
    const bodyImages = (article.editorialSections ?? []).flatMap((s) => (s.image ? [s.image] : []));
    expect(bodyImages.length).toBeGreaterThanOrEqual(2);
    for (const image of bodyImages) {
      expect(image.src).toBeTruthy();
      expect(image.alt.length).toBeGreaterThan(20);
    }
  });
});

describe("phase 34C — discovery", () => {
  it("renders the IVF guides section on the IVF hub exactly once", () => {
    expect(ivfPageSource.match(/<IVFGuides \/>/g)).toHaveLength(1);
  });

  it.each(NEW_SLUGS)("surfaces %s on the hub exactly once", (slug) => {
    const hubOccurrences = (ivfGuidesSource.match(new RegExp(`/articles/${slug}`, "g")) ?? []).length;
    expect(hubOccurrences).toBe(1);
    expect(ivfStagesSource).not.toContain(slug);
  });

  it("keeps the public IVF stage routes at three", () => {
    const stageRoutes = ivfStagesSource.match(/href: "\/ivf\/[a-z-]+"/g) ?? [];
    expect(stageRoutes).toHaveLength(3);
  });
});

describe("phase 34C — internal links resolve to real surfaces", () => {
  const knownArticleSlugs = new Set(articles.map((a) => a.slug));
  const staticRoutes = new Set([
    "/ivf",
    "/ivf/before-transfer",
    "/ivf/after-transfer",
    "/ivf/early-pregnancy",
    "/support",
    "/pregnancy",
    "/ask",
    "/ivf-timeline",
  ]);

  it.each(NEW_SLUGS)("%s links only to surfaces that exist", (slug) => {
    const article = findArticle(slug);
    const hrefs = [
      ...article.relatedStage.links.map((l) => l.href),
      ...(article.crossLinks ?? []).map((l) => l.href),
    ];
    for (const href of hrefs) {
      if (href.startsWith("/articles/")) {
        expect(knownArticleSlugs.has(href.replace("/articles/", ""))).toBe(true);
      } else {
        expect(staticRoutes.has(href)).toBe(true);
      }
    }
    for (const related of article.relatedSlugs ?? []) {
      expect(knownArticleSlugs.has(related)).toBe(true);
    }
  });

  it("signposts OHSS from the timeline guide", () => {
    const timeline = findArticle("ivf-timeline-what-to-expect");
    expect((timeline.crossLinks ?? []).some((l) => l.href === "/articles/ohss-and-ivf-side-effects")).toBe(true);
  });
});

describe("phase 34C — inventory and grounding governance", () => {
  it.each(NEW_SLUGS)("%s has exactly one inventory row on the IVF hub", (slug) => {
    const rows = articleInventory.filter((item) => item.slug === slug);
    expect(rows).toHaveLength(1);
    expect(rows[0].hub).toBe("ivf");
    expect(rows[0].route).toBe(`/articles/${slug}`);
  });

  it.each(NEW_SLUGS)("%s has one default-deny grounding row", (slug) => {
    const rows = ARTICLE_GROUNDING_REGISTRY.filter((r) => r.slug === slug);
    expect(rows).toHaveLength(1);
    expect(rows[0].editorialStatus).toBe("draft");
    expect(rows[0].approvalStatus).toBe("blocked_draft");
    expect(rows[0].archived).toBe(false);
    expect(rows[0].deprecated).toBe(false);
  });

  it.each(NEW_SLUGS)("%s is not eligible for grounding", (slug) => {
    const result = evaluateGroundingEligibility(slug);
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain("draft");
  });

  it("approves nothing in the grounding registry", () => {
    expect(ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "approved")).toHaveLength(0);
  });
});
