import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import FirstYearPathwayPage from "@/components/firstyear/pathway/FirstYearPathwayPage";
import FYTwoTrackEntry from "@/components/firstyear/new/FYTwoTrackEntry";
import { phaseData } from "@/data/firstYearPhaseData";
import {
  firstYearPathways,
  getPathwayArticles,
  getPathwayGroupedArticles,
  getPathwayStartHere,
} from "@/data/firstYearPathwayData";
import { firstYearArticles } from "@/data/firstYearArticleData";

vi.mock("@/components/layout/Navbar", () => ({ default: () => <nav aria-label="Site" /> }));
vi.mock("@/components/layout/Footer", () => ({ default: () => <footer /> }));
vi.mock("@/components/firstyear/new/FYMonthMap", () => ({ default: () => <section data-first-year-month-map /> }));
vi.mock("@/components/companion/AskAboutThis", () => ({
  default: ({ label }: { label: string }) => <button type="button">{label}</button>,
}));

afterEach(cleanup);

const renderPathway = (pathway: "baby" | "postpartum") => render(
  <HelmetProvider>
    <MemoryRouter>
      <FirstYearPathwayPage pathway={pathway} />
    </MemoryRouter>
  </HelmetProvider>,
);

describe("Phase 37B First Year pathways", () => {
  it("repairs all four hub pathway actions", () => {
    render(
      <MemoryRouter>
        <FYTwoTrackEntry />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /Explore baby's first year/i })).toHaveAttribute("href", "/first-year/baby");
    expect(screen.getByRole("link", { name: /Explore postpartum recovery/i })).toHaveAttribute("href", "/first-year/postpartum");
  });

  it.each([
    ["baby", 15, 4, 11],
    ["postpartum", 11, 4, 7],
  ] as const)("accounts for every %s article exactly once", (pathway, total, startCount, groupedCount) => {
    const config = firstYearPathways[pathway];
    const owned = getPathwayArticles(config);
    const start = getPathwayStartHere(config);
    const grouped = getPathwayGroupedArticles(config).flatMap((group) => group.articles);
    const presented = [...start, ...grouped];
    expect(owned).toHaveLength(total);
    expect(start).toHaveLength(startCount);
    expect(grouped).toHaveLength(groupedCount);
    expect(new Set(presented.map((article) => article.slug)).size).toBe(total);
    expect(new Set(presented.map((article) => article.slug))).toEqual(new Set(owned.map((article) => article.slug)));
  });

  it("keeps the source inventory at 26 ready articles with no current hero suppressions", () => {
    expect(firstYearArticles.filter((article) => article.status === "ready")).toHaveLength(26);
    expect(firstYearArticles.filter((article) => article.suppressHeroImage)).toHaveLength(0);
  });

  it("provides one contextual image break for every phase", () => {
    const breaks = Object.values(phaseData).map((phase) => phase.imageBreak);
    expect(breaks).toHaveLength(4);
    breaks.forEach((image) => {
      expect(image?.image).toMatch(/\.jpg$/);
      expect(image?.alt).toBeTruthy();
    });
  });

  it.each(["baby", "postpartum"] as const)("places one %s Companion after editorial discovery", async (pathway) => {
    const { container } = renderPathway(pathway);
    expect(container.querySelectorAll("[data-pathway-companion]")).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: firstYearPathways[pathway].companionTitle })).toHaveLength(1);
    const discovery = container.querySelector("[data-primary-editorial-discovery]");
    const companion = container.querySelector("[data-pathway-companion]");
    expect(discovery?.compareDocumentPosition(companion as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    if (pathway === "baby") expect(container.querySelector("[data-first-year-month-map]")).toBeInTheDocument();
    else expect(container.querySelector("[data-first-year-month-map]")).toBeNull();
    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://thestartofyou.com/first-year/${pathway}`,
      );
      const breadcrumb = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map((script) => script.textContent ?? "")
        .find((content) => content.includes('"BreadcrumbList"'));
      expect(breadcrumb).toContain(`https://thestartofyou.com/first-year/${pathway}`);
    });
  });

  it("registers exactly two pathway routes before generic article matching", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const routeMatches = app.match(/<Route path="\/first-year\/(baby|postpartum)"/g) ?? [];
    expect(routeMatches).toHaveLength(2);
    expect(app.indexOf('path="/first-year/baby"')).toBeLessThan(app.indexOf('path="/first-year/:topic/:slug"'));
    expect(app.indexOf('path="/first-year/postpartum"')).toBeLessThan(app.indexOf('path="/first-year/:topic/:slug"'));
  });

  it("keeps pathway presentation outside AI runtime, prompt, context-builder and grounding code", () => {
    const pathwaySource = readFileSync("src/components/firstyear/pathway/FirstYearPathwayPage.tsx", "utf8");
    expect(pathwaySource).not.toMatch(/ai-search|promptRegistry|contextBuilder|grounding/);
  });
});