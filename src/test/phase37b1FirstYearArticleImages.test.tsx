import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { getFirstYearArticleImages } from "@/components/firstyear/article/firstYearArticleImages";
import FirstYearPhasePage from "@/components/firstyear/phase/FirstYearPhasePage";
import FirstYearTopicPage from "@/components/firstyear/topic/FirstYearTopicPage";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { phaseData } from "@/data/firstYearPhaseData";
import { firstYearTopicConfigs } from "@/data/firstYearTopicData";

vi.mock("@/components/layout/Navbar", () => ({ default: () => <nav aria-label="Site" /> }));
vi.mock("@/components/layout/Footer", () => ({ default: () => <footer /> }));
vi.mock("@/components/companion/AskAboutThis", () => ({
  default: ({ label }: { label: string }) => <button type="button">{label}</button>,
}));

afterEach(cleanup);

const renderPage = (ui: React.ReactNode) => render(
  <HelmetProvider>
    <MemoryRouter>{ui}</MemoryRouter>
  </HelmetProvider>,
);

const articleSlugFromHref = (href: string) => href.split("/").filter(Boolean).at(-1);

describe("Phase 37B.1 First Year hero identity", () => {
  it("gives all 26 current articles one valid and distinct explicit hero", () => {
    const ready = firstYearArticles.filter((article) => article.status === "ready");
    const heroes = ready.map((article) => getFirstYearArticleImages(article.slug)?.hero);

    expect(ready).toHaveLength(26);
    expect(ready.filter((article) => article.suppressHeroImage)).toHaveLength(0);
    expect(heroes.every((hero) => Boolean(hero?.src && hero.alt))).toBe(true);
    expect(new Set(heroes.map((hero) => hero?.src)).size).toBe(26);
  });

  it("keeps the Phase 37A.1 body image inventory unchanged", () => {
    const mappings = firstYearArticles.map((article) => getFirstYearArticleImages(article.slug));
    const bodyImages = mappings.flatMap((mapping) => mapping?.body ?? []);

    expect(bodyImages).toHaveLength(21);
    expect(bodyImages.some((image) => image.src.includes("firstyear-hero-"))).toBe(false);
  });

  it("keeps topic featured data free of independent card imagery", () => {
    const featured = Object.values(firstYearTopicConfigs).flatMap((config) => config.featured);
    expect(featured).toHaveLength(21);
    expect(featured.every((item) => item.image === undefined)).toBe(true);

    featured.forEach((item) => {
      const slug = articleSlugFromHref(item.href);
      expect(slug, item.href).toBeTruthy();
      expect(getFirstYearArticleImages(slug ?? "")?.hero, item.href).toBeDefined();
    });
  });

  it.each(Object.keys(firstYearTopicConfigs) as Array<keyof typeof firstYearTopicConfigs>)(
    "renders destination hero identity across the %s topic featured cards",
    (topic) => {
      const config = firstYearTopicConfigs[topic];
      const { container } = renderPage(<FirstYearTopicPage config={config} />);

      config.featured.forEach((item) => {
        const link = container.querySelector(`a[href="${item.href}"]`);
        const slug = articleSlugFromHref(item.href);
        expect(link, item.href).toBeInTheDocument();
        expect(link?.querySelector("img")?.getAttribute("src"), item.href).toBe(
          getFirstYearArticleImages(slug ?? "")?.hero?.src,
        );
      });
    },
  );

  it.each(Object.keys(phaseData) as Array<keyof typeof phaseData>)(
    "renders article heroes in the %s phase useful reads",
    (phase) => {
      const config = phaseData[phase];
      const { container } = renderPage(<FirstYearPhasePage config={config} />);

      config.featuredGuidance
        .filter((item) => item.href.startsWith("/first-year/") && item.href.split("/").length > 3)
        .forEach((item) => {
          const link = container.querySelector(`a[href="${item.href}"]`);
          const slug = articleSlugFromHref(item.href);
          expect(link, item.href).toBeInTheDocument();
          expect(link?.querySelector("img")?.getAttribute("src"), item.href).toBe(
            getFirstYearArticleImages(slug ?? "")?.hero?.src,
          );
        });
    },
  );

  it("keeps generic First Year fallback imagery out of the shared card", () => {
    const source = readFileSync("src/components/firstyear/article/FirstYearArticleCard.tsx", "utf8");
    expect(source).not.toMatch(/TOPIC_FALLBACK|firstyear-scene|fallbackFeeding/);
  });

  it("keeps image completion outside AI, grounding and lifecycle runtime", () => {
    const sources = [
      "src/components/firstyear/article/firstYearArticleImages.ts",
      "src/components/firstyear/article/FirstYearArticleCard.tsx",
      "src/components/firstyear/topic/FirstYearTopicPage.tsx",
      "src/components/firstyear/phase/FirstYearPhasePage.tsx",
    ].map((path) => readFileSync(path, "utf8")).join("\n");

    expect(sources).not.toMatch(/ai-search|promptRegistry|contextBuilder|grounding|supabase\.from/);
  });
});