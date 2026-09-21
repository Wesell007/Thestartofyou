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

describe("Phase 37A.1 intentional First Year image absence", () => {
  it("renders an article hero when an approved image is present", () => {
    renderPage(<FirstYearArticlePage article={article("teething")} tone="baby" />);

    expect(screen.getByRole("img", { name: /parent smiling and holding a baby/i })).toBeInTheDocument();
  });

  it("renders an explicitly image-free article as text-led with no fallback", () => {
    renderPage(
      <FirstYearArticlePage article={article("bottle-and-breastfeeding-questions")} tone="baby" />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Bottle and breastfeeding questions" })).toBeInTheDocument();
    expect(getFirstYearArticleImages("bottle-and-breastfeeding-questions")?.hero).toBeUndefined();
    const mappedSources = Object.values(getFirstYearArticleImages("bottle-and-breastfeeding-questions") ?? {})
      .flatMap((value) => Array.isArray(value) ? value.map((image) => image.src) : value?.src ?? []);
    expect(mappedSources.some((src) => src.includes("firstyear-scene"))).toBe(false);
  });

  it("renders an explicitly image-free discovery card without a fallback or ratio box", () => {
    renderPage(<FirstYearArticleCard article={article("bottle-and-breastfeeding-questions")} />);

    const card = screen.getByRole("link", { name: /Bottle and breastfeeding questions/i });
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

  it("renders an explicitly image-free Start Here card without a blank image slot", () => {
    renderPage(<FirstYearTopicPage config={firstYearTopicConfigs.feeding} />);

    const card = screen.getByRole("link", { name: /How often should my baby feed in the early weeks/i });
    expect(card.querySelector("img")).toBeNull();
    expect(card.querySelector("[class*='aspect-']")).toBeNull();
    expect(card.querySelector('[data-image-treatment="text-led"]')).toBeInTheDocument();
  });

  it("retains the normal topic fallback when no First Year suppression decision exists", () => {
    const unmapped = { ...article("teething"), slug: "unmapped-test-article" };
    renderPage(<FirstYearArticleCard article={unmapped} />);

    expect(screen.getByRole("img", { name: /baby care and safety moment/i })).toBeInTheDocument();
  });

  it("keeps every explicitly suppressed article free of a mapped hero", () => {
    const suppressed = firstYearArticles.filter((item) => item.suppressHeroImage);

    expect(suppressed).toHaveLength(15);
    for (const item of suppressed) {
      expect(getFirstYearArticleImages(item.slug)?.hero, item.slug).toBeUndefined();
    }
  });
});