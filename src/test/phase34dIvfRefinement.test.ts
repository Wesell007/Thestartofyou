import { describe, expect, it } from "vitest";
import { getAllArticles, type ArticleData } from "@/data/articleData";
import { articleInventory } from "@/data/articleInventory";
import { ARTICLE_GROUNDING_REGISTRY } from "@/lib/grounding/articleGroundingRegistry";
import { listGroundingEligibleSlugs } from "@/lib/grounding/articleGroundingEligibility";
import { REVIEW_PROVENANCE_REGISTRY } from "@/lib/reviewClaims";
import { ivfTopicConfigs } from "@/data/ivfTopicData";
import ivfGuidesSource from "../components/ivf/IVFGuides.tsx?raw";
import ivfPageSource from "../pages/IVF.tsx?raw";
import articleSourcesSource from "../components/article/ArticleSources.tsx?raw";

const NEW_SLUGS = ["ivf-vs-icsi", "fresh-vs-frozen-embryo-transfer"] as const;

const EXPECTED_IVF_ARTICLES = [
  "emotional-impact-of-ivf",
  "ivf-timeline-what-to-expect",
  "what-ivf-is-uk-guide",
  "nhs-ivf-funding-and-eligibility",
  "ohss-and-ivf-side-effects",
  "when-an-ivf-cycle-does-not-work",
  ...NEW_SLUGS,
];

const articles = getAllArticles();
const findArticle = (slug: string): ArticleData => {
  const record = articles.find((a) => a.slug === slug);
  expect(record, `article ${slug} must exist`).toBeTruthy();
  return record!;
};

describe("phase 34D — exactly two new IVF guides", () => {
  it("creates both records", () => {
    for (const slug of NEW_SLUGS) expect(findArticle(slug).slug).toBe(slug);
  });

  it("creates no slug collisions", () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("creates no route collisions in the inventory", () => {
    const routes = articleInventory.map((row) => row.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("adds no other IVF articles", () => {
    const ivfArticles = articles.filter((a) => a.journey?.includes("ivf")).map((a) => a.slug);
    expect(ivfArticles.sort()).toEqual(EXPECTED_IVF_ARTICLES.sort());
  });

  it("does not create a standalone embryo-development article", () => {
    const banned = articles.filter((a) => /embryo-development|embryo-grading|blastocyst/.test(a.slug));
    expect(banned).toHaveLength(0);
  });

  it("does not create a clinic-questions checklist article", () => {
    const banned = articles.filter((a) => /clinic-questions|questions-checklist/.test(a.slug));
    expect(banned).toHaveLength(0);
  });
});

describe("phase 34D — ownership boundaries", () => {
  it("ivf-vs-icsi owns comparison, not definition or chronology", () => {
    const record = findArticle("ivf-vs-icsi");
    expect(record.title.toLowerCase()).toContain("icsi");
    const headings = (record.editorialSections ?? []).map((s) => s.heading.toLowerCase());
    expect(headings.some((h) => h.includes("icsi"))).toBe(true);
    expect(headings.some((h) => h.includes("timeline"))).toBe(false);
  });

  it("fresh-vs-frozen owns the transfer-route comparison and covers freezing briefly", () => {
    const record = findArticle("fresh-vs-frozen-embryo-transfer");
    const headings = (record.editorialSections ?? []).map((s) => s.heading.toLowerCase());
    expect(headings.some((h) => h.includes("fresh"))).toBe(true);
    expect(headings.some((h) => h.includes("frozen"))).toBe(true);
    expect(headings.some((h) => h.includes("freezing") || h.includes("storage"))).toBe(true);
  });

  it("makes no success-rate comparison claim", () => {
    for (const slug of NEW_SLUGS) {
      const body = JSON.stringify(findArticle(slug));
      expect(/\d+\s?% success/i.test(body)).toBe(false);
      expect(/more likely to succeed than/i.test(body)).toBe(false);
    }
  });
});

describe("phase 34D — before-transfer expansion", () => {
  const before = ivfTopicConfigs["before-transfer"];

  it("keeps the existing stage route and adds no new stage", () => {
    expect(Object.keys(ivfTopicConfigs).sort()).toEqual(
      ["after-transfer", "before-transfer", "early-pregnancy"],
    );
  });

  it("covers embryo development at orientation depth", () => {
    const coverage = before.whatThisCovers.bullets.join(" ");
    expect(coverage).toMatch(/fertilis/i);
    expect(coverage).toMatch(/blastocyst/i);
    expect(coverage).toMatch(/grading/i);
  });

  it("links out to the fresh versus frozen guide from the stage", () => {
    const hrefs = before.guides.map((guide) => guide.href);
    expect(hrefs).toContain("/articles/fresh-vs-frozen-embryo-transfer");
    expect(hrefs).toContain("/articles/ivf-vs-icsi");
  });

  it("names embryo development in what this covers", () => {
    expect(before.whatThisCovers.bullets.join(" ")).toMatch(/embryos develop/i);
  });
});

describe("phase 34D — provenance and citation rendering", () => {
  it.each(NEW_SLUGS)("%s carries structured UK sources with stored URLs", (slug) => {
    const sources = findArticle(slug).sources as unknown as Array<Record<string, string>> | undefined;
    expect(Array.isArray(sources)).toBe(true);
    expect(sources!.length).toBeGreaterThanOrEqual(4);
    for (const source of sources!) {
      expect(source.label?.length ?? 0).toBeGreaterThan(0);
      expect(source.publisher?.length ?? 0).toBeGreaterThan(0);
      expect(source.url).toMatch(/^https:\/\//);
    }
    const primary = sources!.filter((s) => ["HFEA", "NHS", "NICE"].includes(s.publisher));
    expect(primary.length).toBe(sources!.length);
  });

  it("renders citations as plain text with no anchors", () => {
    expect(articleSourcesSource).not.toMatch(/<a\s/);
    expect(articleSourcesSource).not.toMatch(/target="_blank"/);
    expect(articleSourcesSource).not.toMatch(/opens in a new tab/i);
  });

  it.each(NEW_SLUGS)("%s claims no reviewer", (slug) => {
    const record = findArticle(slug) as unknown as Record<string, unknown>;
    expect(record.reviewedBy).toBeUndefined();
    expect(record.medicallyReviewed).toBeUndefined();
  });

  it("keeps the review provenance registry empty", () => {
    expect(REVIEW_PROVENANCE_REGISTRY).toHaveLength(0);
  });
});

describe("phase 34D — imagery", () => {
  it.each(NEW_SLUGS)("%s has a hero and at least two body images, all with alt text", (slug) => {
    const record = findArticle(slug);
    expect(record.hero?.src).toBeTruthy();
    expect((record.hero?.alt ?? "").length).toBeGreaterThan(10);
    const bodyImages = (record.editorialSections ?? []).filter((s) => s.image);
    expect(bodyImages.length).toBeGreaterThanOrEqual(2);
    for (const section of bodyImages) {
      expect(section.image!.src).toBeTruthy();
      expect(section.image!.alt.length).toBeGreaterThan(10);
    }
  });
});

describe("phase 34D — discovery", () => {
  it("renders the single hub guides section exactly once", () => {
    expect(ivfPageSource.match(/<IVFGuides\s*\/>/g) ?? []).toHaveLength(1);
  });

  it.each(NEW_SLUGS)("%s appears exactly once in normal hub discovery", (slug) => {
    const matches = ivfGuidesSource.match(new RegExp(`/articles/${slug}"`, "g")) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("adds no second hub discovery section", () => {
    expect(ivfPageSource.match(/<IVFGuides/g) ?? []).toHaveLength(1);
  });
});

describe("phase 34D — contextual links resolve", () => {
  const knownArticleSlugs = new Set(articles.map((a) => a.slug));
  const stageRoutes = new Set(["/ivf", "/ivf/before-transfer", "/ivf/after-transfer", "/ivf/early-pregnancy"]);

  it.each(NEW_SLUGS)("%s cross-links resolve to real destinations", (slug) => {
    const links = findArticle(slug).crossLinks ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      if (link.href.startsWith("/articles/")) {
        expect(knownArticleSlugs.has(link.href.replace("/articles/", ""))).toBe(true);
      } else {
        expect(stageRoutes.has(link.href)).toBe(true);
      }
    }
  });

  it("links the two source articles into ivf-vs-icsi", () => {
    for (const source of ["what-ivf-is-uk-guide", "ivf-timeline-what-to-expect"]) {
      const links = findArticle(source).crossLinks ?? [];
      expect(links.filter((l) => l.href === "/articles/ivf-vs-icsi")).toHaveLength(1);
    }
  });
});

describe("phase 34D — governance and grounding", () => {
  it("registers the registry at 233 records", () => {
    expect(ARTICLE_GROUNDING_REGISTRY).toHaveLength(233);
  });

  it.each(NEW_SLUGS)("%s has exactly one default-deny grounding row", (slug) => {
    const rows = ARTICLE_GROUNDING_REGISTRY.filter((r) => r.slug === slug);
    expect(rows).toHaveLength(1);
    expect(rows[0].editorialStatus).toBe("draft");
    expect(rows[0].approvalStatus).toBe("blocked_draft");
    expect(rows[0].archived).toBe(false);
    expect(rows[0].deprecated).toBe(false);
  });

  it.each(NEW_SLUGS)("%s has exactly one inventory row marked draft", (slug) => {
    const rows = articleInventory.filter((r) => r.slug === slug);
    expect(rows).toHaveLength(1);
    expect(rows[0].currentStatus).toBe("draft");
    expect(rows[0].hub).toBe("ivf");
  });

  it("keeps grounding approvals, candidates and eligibility empty", () => {
    expect(listGroundingEligibleSlugs()).toEqual([]);
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "approved"),
    ).toHaveLength(0);
    expect(
      ARTICLE_GROUNDING_REGISTRY.filter((r) => r.approvalStatus === "candidate"),
    ).toHaveLength(0);
  });
});
