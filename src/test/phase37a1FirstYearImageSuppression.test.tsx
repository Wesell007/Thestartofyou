import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

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

describe("Phase 37A.1 intentional First Year image absence", () => {
  it("renders an article hero when an approved image is present", () => {
    render(
      <MemoryRouter>
        <FirstYearArticlePage article={article("teething")} tone="baby" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img", { name: /parent smiling and holding a baby/i })).toBeInTheDocument();
  });

  it("renders an explicitly image-free article as text-led with no fallback", () => {
    render(
      <MemoryRouter>
        <FirstYearArticlePage article={article("bottle-and-breastfeeding-questions")} tone="baby" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Bottle and breastfeeding questions" })).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(getFirstYearArticleImages("bottle-and-breastfeeding-questions")?.hero).toBeUndefined();
  });

  it("renders an explicitly image-free discovery card without a fallback or ratio box", () => {
    render(
      <MemoryRouter>
        <FirstYearArticleCard article={article("bottle-and-breastfeeding-questions")} />
      </MemoryRouter>,
    );

    const card = screen.getByRole("link", { name: /Bottle and breastfeeding questions/i });
    expect(card.querySelector("img")).toBeNull();
    expect(card.querySelector("[class*='aspect-']")).toBeNull();
    expect(card.querySelector('[data-image-treatment="text-led"]')).toBeInTheDocument();
  });

  it("keeps normal no-image behaviour unchanged outside First Year", () => {
    render(
      <MemoryRouter>
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
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Family example" })).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders an explicitly image-free Start Here card without a blank image slot", () => {
    render(
      <MemoryRouter>
        <FirstYearTopicPage config={firstYearTopicConfigs.feeding} />
      </MemoryRouter>,
    );

    const card = screen.getByRole("link", { name: /How often should my baby feed in the early weeks/i });
    expect(card.querySelector("img")).toBeNull();
    expect(card.querySelector("[class*='aspect-']")).toBeNull();
    expect(card.querySelector('[data-image-treatment="text-led"]')).toBeInTheDocument();
  });
});