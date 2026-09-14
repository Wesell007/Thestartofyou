/**
 * Phase 33.4 — article trust and structure consistency.
 *
 * Sources stay visible as plain citations: no anchors, no external-link icons,
 * no "opens in a new tab" disclaimer. Source URLs stay in the data. Article
 * navigation renders at most once per article.
 */

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";


import ArticleSources from "@/components/article/ArticleSources";
import WeekSources from "@/components/week/WeekSources";
import HubArticleView from "@/components/shared/HubArticleView";
import ArticleFlagshipTemplate from "@/components/article/flagship/ArticleFlagshipTemplate";
import ArticleDeepTemplate from "@/components/article/ArticleDeepTemplate";
import { getAllArticles, type ArticleData } from "@/data/articleData";

const articles = getAllArticles();
import { familyArticles } from "@/data/familyArticleData";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { toddlerArticles } from "@/data/toddlerArticleData";

const withRouter = (ui: React.ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>
  );

const DISCLAIMER = /external links open in a new tab|not controlled by us/i;

const sourceBlock = (container: HTMLElement) => {
  const heading = Array.from(container.querySelectorAll("p, span")).find((el) =>
    /sources and references|references and guidance/i.test(el.textContent ?? "")
  );
  return heading?.closest("section") ?? null;
};

describe("source presentation — plain citations", () => {
  it("legacy article sources render as text, not links", () => {
    const data = {
      slug: "x",
      sources: [
        { label: "Pelvic pain in pregnancy", publisher: "NHS", url: "https://nhs.uk/a" },
        {
          label: "Pelvic girdle pain",
          publisher: "RCOG",
          year: "2015",
          url: "https://rcog.org.uk/b",
        },
      ],
      reviewedBy: undefined,
    } as unknown as ArticleData;

    const { container } = withRouter(<ArticleSources data={data} />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.querySelectorAll('[target="_blank"]')).toHaveLength(0);
    expect(container.querySelectorAll("svg")).toHaveLength(0);
    expect(screen.getByText(/Pelvic pain in pregnancy/)).toBeTruthy();
    expect(container.textContent).toContain("NHS");
    expect(container.textContent).toContain("RCOG");
    expect(container.textContent).toContain("(2015)");
    expect(container.textContent).not.toMatch(DISCLAIMER);
  });

  it("week page references render as text, not links", () => {
    const { container } = withRouter(
      <WeekSources
        week={12}
        sources={[
          { label: "Your 12 week scan", publisher: "NHS", url: "https://nhs.uk/scan" },
        ]}
      />
    );
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.textContent).toContain("Your 12 week scan");
    expect(container.textContent).toContain("NHS");
    expect(container.textContent).not.toMatch(DISCLAIMER);
  });

  it("hub article sources render as text, not links", () => {
    const article = {
      slug: "s",
      topic: "t",
      title: "Title",
      description: "Desc",
      readTime: "5 min",
      status: "ready" as const,
      sections: [
        { heading: "One", body: ["a"] },
        { heading: "Two", body: ["b"] },
      ],
      sources: [
        { label: "Teething", publisher: "NHS", url: "https://nhs.uk/teething" },
      ],
    };

    const { container } = withRouter(
      <HubArticleView
        article={article}
        tokens={{
          base: "--stage-family",
          soft: "--stage-family-soft",
          accent: "--stage-family-accent",
          deep: "--stage-family-deep",
        }}
        hubLabel="Family"
        hubHref="/family"
        topicLabel="Topic"
        topicHref="/family/t"
      />
    );

    const block = sourceBlock(container);
    expect(block).not.toBeNull();
    expect(block!.querySelectorAll("a")).toHaveLength(0);
    expect(block!.querySelectorAll("svg")).toHaveLength(0);
    expect(block!.textContent).toContain("Teething");
    expect(block!.textContent).toContain("NHS");
    expect(container.textContent).not.toMatch(DISCLAIMER);
  });

  it("keeps source URLs in the underlying data", () => {
    const all = [
      ...articles.flatMap((a) => a.sources ?? []),
      ...familyArticles.flatMap((a) => a.sources ?? []),
      ...firstYearArticles.flatMap((a) => a.sources ?? []),
      ...toddlerArticles.flatMap((a) => a.sources ?? []),
    ].filter((s) => typeof s === "object") as { url?: string }[];

    expect(all.length).toBeGreaterThan(0);
    expect(all.filter((s) => !s.url)).toHaveLength(0);
  });
});

describe("Family source provenance", () => {
  it("has 18 records, and only records with real sources render a block", () => {
    // Repository truth: 18 Family records, 4 carrying source provenance.
    expect(familyArticles).toHaveLength(18);
    const withSources = familyArticles.filter((a) => (a.sources?.length ?? 0) > 0);
    expect(withSources.length).toBe(4);

    // A record without provenance renders no empty source container.
    const bare = familyArticles.find((a) => (a.sources?.length ?? 0) === 0)!;
    const { container } = withRouter(
      <HubArticleView
        article={bare}
        tokens={{
          base: "--stage-family",
          soft: "--stage-family-soft",
          accent: "--stage-family-accent",
          deep: "--stage-family-deep",
        }}
        hubLabel="Family"
        hubHref="/family"
        topicLabel="Topic"
        topicHref={`/family/${bare.topic}`}
      />
    );
    expect(sourceBlock(container)).toBeNull();
  });
});

const countContents = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("p, span")).filter((el) =>
    /^in this article$/i.test((el.textContent ?? "").trim())
  ).length;

describe("article navigation is never duplicated", () => {
  const flagship = articles.find(
    (a) => a.slug === "preconception-gp-appointment"
  )!;

  it("flagship articles render exactly one In this article block", () => {
    const { container } = withRouter(<ArticleFlagshipTemplate data={flagship} />);
    expect(countContents(container)).toBe(1);

    // TOC anchors still point at real sections.
    const ids = (flagship.editorialSections ?? []).map((s) => s.id);
    const tocLabel = Array.from(container.querySelectorAll("p")).find((el) =>
      /^in this article$/i.test((el.textContent ?? "").trim())
    )!;
    const toc = tocLabel.closest("article")!;
    const hrefs = Array.from(toc.querySelectorAll('a[href^="#"]')).map(
      (a) => a.getAttribute("href")!.slice(1)
    );
    expect(hrefs.length).toBeGreaterThan(0);
    hrefs.forEach((h) => expect(ids).toContain(h));
  });

  it("deep articles render at most one In this article block", () => {
    const deep = articles.find(
      (a) => (a.editorialSections?.length ?? 0) >= 3 && a.slug !== flagship.slug
    )!;
    const { container } = withRouter(<ArticleDeepTemplate data={deep} />);
    expect(countContents(container)).toBeLessThanOrEqual(1);
  });

  it("hub articles render at most one In this article block", () => {
    const article = firstYearArticles.find((a) => (a.sections?.length ?? 0) >= 2)!;
    const { container } = withRouter(
      <HubArticleView
        article={article}
        tokens={{
          base: "--stage-firstyear",
          soft: "--stage-firstyear-soft",
          accent: "--stage-firstyear-accent",
          deep: "--stage-firstyear-deep",
        }}
        hubLabel="First Year"
        hubHref="/first-year"
        topicLabel="Topic"
        topicHref={`/first-year/${article.topic}`}
      />
    );
    expect(countContents(container)).toBeLessThanOrEqual(1);

    // Key takeaways survive the structural pass.
    if ((article.keyTakeaways?.length ?? 0) > 0) {
      expect(container.textContent).toMatch(/The essentials, at a glance/i);
    }
  });

  it("flagship keeps one opening At a glance summary", () => {
    const { container } = withRouter(<ArticleFlagshipTemplate data={flagship} />);
    const atAGlance = Array.from(container.querySelectorAll("p, span, h2")).filter(
      (el) => /^at a glance$/i.test((el.textContent ?? "").trim())
    );
    expect(atAGlance).toHaveLength(1);
  });
});
