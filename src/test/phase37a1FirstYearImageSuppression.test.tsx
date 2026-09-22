import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import FirstYearArticleCard from "@/components/firstyear/article/FirstYearArticleCard";
import FirstYearArticlePage from "@/components/firstyear/article/FirstYearArticlePage";
import FirstYearTopicPage from "@/components/firstyear/topic/FirstYearTopicPage";
import HubArticleView from "@/components/shared/HubArticleView";
import { getFirstYearArticleImages } from "@/components/firstyear/article/firstYearArticleImages";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { firstYearTopicConfigs } from "@/data/firstYearTopicData";

afterEach(cleanup);

const article = (slug: string) => {
  const found = firstYearArticles.find((item) => item.slug === slug);
  if (!found) throw new Error(`Missing First Year article fixture: ${slug}`);
  return found;
};

const renderPage = (ui: React.ReactNode) =>
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

describe("Phase 37B.1 First Year article image completion", () => {
  it("renders an article hero when an approved image is present", () => {
    renderPage(<FirstYearArticlePage article={article("teething")} tone="baby" />);

    expect(screen.getByRole("img", { name: /parent smiling and holding a baby/i })).toBeInTheDocument();
  });

  it("renders a remediated article with its explicit article hero", () => {
    renderPage(
      <FirstYearArticlePage article={article("bottle-and-breastfeeding-questions")} tone="baby" />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Bottle and breastfeeding questions" })).toBeInTheDocument();
    expect(getFirstYearArticleImages("bottle-and-breastfeeding-questions")?.hero).toBeDefined();
    const mappedSources = Object.values(getFirstYearArticleImages("bottle-and-breastfeeding-questions") ?? {})
      .flatMap((value) => Array.isArray(value) ? value.map((image) => image.src) : value?.src ?? []);
    expect(mappedSources.some((src) => src.includes("firstyear-scene"))).toBe(false);
  });

  it("keeps optional suppression as a text-led treatment for future records", () => {
    const suppressedFixture = { ...article("teething"), slug: "future-suppressed", suppressHeroImage: true as const };
    renderPage(<FirstYearArticleCard article={suppressedFixture} />);

    const card = screen.getByRole("link", { name: /Teething/i });
    expect(card.querySelector("img")).toBeNull();
    expect(card.querySelector("[class*='aspect-']")).toBeNull();
    expect(card.querySelector('[data-image-treatment="text-led"]')).toBeInTheDocument();
  });

  it("keeps normal no-image behaviour unchanged outside First Year", () => {
    const { container } = renderPage(
      <HubArticleView
          article={{
            slug: "family-example",
            topic: "family",
            title: "Family example",
            description: "Existing shared article behaviour",
            readTime: "4 min read",
            status: "ready",
          }}
          tokens={{ base: "--stage-family", soft: "--stage-family-soft", accent: "--stage-family-accent", deep: "--stage-family-deep" }}
          hubLabel="Family"
          hubHref="/family"
          topicLabel="Family"
          topicHref="/family"
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Family example" })).toBeInTheDocument();
    expect(container.querySelector("main > section img")).toBeNull();
  });

  it("renders destination article identity on a topic Start Here card", () => {
    renderPage(<FirstYearTopicPage config={firstYearTopicConfigs.feeding} />);

    const card = screen.getByRole("link", { name: /How often should my baby feed in the early weeks/i });
    const image = card.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image?.getAttribute("src")).toBe(getFirstYearArticleImages("newborn-feeding-rhythms")?.hero?.src);
  });

  it("does not restore a generic topic fallback for an unmapped article", () => {
    const unmapped = { ...article("teething"), slug: "unmapped-test-article" };
    renderPage(<FirstYearArticleCard article={unmapped} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("maps every current article to a distinct explicit hero", () => {
    const heroes = firstYearArticles.map((item) => getFirstYearArticleImages(item.slug)?.hero?.src);
    expect(heroes).toHaveLength(26);
    expect(heroes.every(Boolean)).toBe(true);
    expect(new Set(heroes).size).toBe(26);
    expect(firstYearArticles.filter((item) => item.suppressHeroImage)).toHaveLength(0);
  });
});