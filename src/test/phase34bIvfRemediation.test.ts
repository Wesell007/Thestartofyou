import { describe, expect, it } from "vitest";
import { getAllArticles } from "@/data/articleData";
import { ivfTopicConfigs } from "@/data/ivfTopicData";
import stagePageSource from "../pages/StagePage.tsx?raw";
import ivfStagesSource from "../components/ivf/IVFStages.tsx?raw";
import ivfTopicSource from "../data/ivfTopicData.ts?raw";
import articleSourcesSource from "../components/article/ArticleSources.tsx?raw";

const IVF_ARTICLE_SLUGS = ["ivf-timeline-what-to-expect", "emotional-impact-of-ivf"] as const;

const findArticle = (slug: string) => {
  const record = getAllArticles().find((a) => a.slug === slug);
  expect(record, `article ${slug} must exist`).toBeTruthy();
  return record!;
};

describe("phase 34B — IVF source provenance", () => {
  it.each(IVF_ARTICLE_SLUGS)("%s carries structured sources with publisher and URL", (slug) => {
    const article = findArticle(slug) as { sources?: unknown };
    const sources = article.sources as Array<Record<string, string>> | undefined;
    expect(Array.isArray(sources)).toBe(true);
    expect(sources!.length).toBeGreaterThanOrEqual(3);
    for (const source of sources!) {
      expect(typeof source).toBe("object");
      expect(source.label?.length ?? 0).toBeGreaterThan(0);
      expect(source.publisher?.length ?? 0).toBeGreaterThan(0);
      expect(source.url).toMatch(/^https:\/\//);
    }
  });

  it("prioritises HFEA, NHS and NICE as primary evidence", () => {
    for (const slug of IVF_ARTICLE_SLUGS) {
      const sources = (findArticle(slug) as { sources?: Array<{ publisher: string }> }).sources!;
      const primary = sources.filter((s) => ["HFEA", "NHS", "NICE"].includes(s.publisher));
      expect(primary.length).toBeGreaterThanOrEqual(3);
      expect(primary.length).toBeGreaterThan(sources.length - primary.length);
    }
  });

  it("records no invented publication years", () => {
    for (const slug of IVF_ARTICLE_SLUGS) {
      const sources = (findArticle(slug) as { sources?: Array<Record<string, unknown>> }).sources!;
      for (const source of sources) {
        expect(source.year).toBeUndefined();
      }
    }
  });

  it("renders visible citations without a clickable external anchor", () => {
    expect(articleSourcesSource).not.toMatch(/<a\s/);
    expect(articleSourcesSource).not.toMatch(/target="_blank"/);
    expect(articleSourcesSource.toLowerCase()).not.toContain("opens in a new tab");
  });
});

describe("phase 34B — timeline ownership and expansion", () => {
  const timeline = findArticle("ivf-timeline-what-to-expect") as {
    editorialSections?: Array<{ id: string; subsections?: Array<{ subheading: string }> }>;
  };

  it("keeps a single generic IVF sequence owner", () => {
    const owners = getAllArticles().filter(
      (a) => /ivf/i.test(a.slug) && /timeline|process|what to expect/i.test(a.title ?? ""),
    );
    expect(owners.map((a) => a.slug)).toEqual(["ivf-timeline-what-to-expect"]);
  });

  it("covers monitoring, egg collection and sperm preparation", () => {
    const subheadings = (timeline.editorialSections ?? []).flatMap((s) =>
      (s.subsections ?? []).map((sub) => sub.subheading.toLowerCase()),
    );
    expect(subheadings.some((h) => h.includes("monitoring"))).toBe(true);
    expect(subheadings.some((h) => h.includes("egg collection"))).toBe(true);
    expect(subheadings.some((h) => h.includes("sperm collection"))).toBe(true);
    expect(subheadings.some((h) => h.includes("home testing"))).toBe(true);
  });
});

describe("phase 34B — after transfer surface", () => {
  const after = ivfTopicConfigs["after-transfer"];

  it("keeps the existing route unchanged", () => {
    expect(after.slug).toBe("after-transfer");
    expect(Object.keys(ivfTopicConfigs).sort()).toEqual([
      "after-transfer",
      "before-transfer",
      "early-pregnancy",
    ]);
  });

  it("covers medication continuation, rest myths and contacting the clinic", () => {
    const covers = after.whatThisCovers.bullets.join(" ").toLowerCase();
    expect(covers).toContain("medication");
    expect(covers).toContain("rest");
    expect(covers).toContain("contact your clinic");
  });

  it("offers orientation entry points and a shape for the wait", () => {
    expect(after.startHere.length).toBeGreaterThan(0);
    expect(after.protocolWeek?.items.length ?? 0).toBeGreaterThanOrEqual(4);
    const wait = JSON.stringify(after.protocolWeek).toLowerCase();
    expect(wait).toContain("trigger");
    expect(wait).toContain("bed rest");
  });

  it("does not claim symptoms confirm an outcome", () => {
    const text = JSON.stringify(after).toLowerCase();
    expect(text).not.toContain("symptoms mean you are pregnant");
    expect(text).not.toContain("confirms implantation");
  });

  it("carries no duplicate contextual link targets", () => {
    const hrefs = after.groups.flatMap((g) => g.links.map((l) => l.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("phase 34B — stage data and discovery", () => {
  it("no longer registers shadowed IVF stage records", () => {
    expect(stagePageSource).not.toContain("ivfStageData");
    expect(stagePageSource).not.toContain("ivf: ivfStages");
  });

  it("surfaces moving from TTC to IVF exactly once on the hub", () => {
    const hubOccurrences = ivfStagesSource.split("/articles/moving-from-ttc-to-ivf").length - 1;
    expect(hubOccurrences).toBe(1);
    expect(ivfTopicSource).not.toContain("moving-from-ttc-to-ivf");
  });

  it("adds no new IVF stage routes", () => {
    const routes = (ivfStagesSource.match(/\/ivf\/[a-z-]+/g) ?? []).filter(
      (value, index, all) => all.indexOf(value) === index,
    );
    expect(routes.sort()).toEqual(["/ivf/after-transfer", "/ivf/before-transfer", "/ivf/early-pregnancy"]);
  });
});

describe("phase 34B — review governance", () => {
  it("renders no reviewer claim for the IVF articles", async () => {
    const { getReviewClaim, reviewSurfaceKey } = await import("@/lib/reviewClaims");
    for (const slug of IVF_ARTICLE_SLUGS) {
      expect(getReviewClaim(reviewSurfaceKey("article", slug))).toBeNull();
    }
  });
});
