import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { familyArticles } from "@/data/familyArticleData";
import { familyTopics } from "@/data/familyTopicData";
import { getFamilyArticleCardImage } from "@/components/family/article/familyArticleImages";

const source = (path: string) => readFileSync(resolve(path), "utf8");

const locations = [...source("public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const familyLocations = locations.filter((url) => url.includes("thestartofyou.com/family"));

const sectionPosition = (page: string, component: string) => {
  const value = page.indexOf(component);
  expect(value, component).toBeGreaterThan(-1);
  return value;
};

describe("Phase 39A Family UX rebuild", () => {
  it("keeps the canonical Family route and sitemap contract", () => {
    expect(Object.keys(familyTopics)).toHaveLength(6);
    expect(familyArticles.filter((article) => article.status === "ready")).toHaveLength(18);
    expect(familyLocations.filter((url) => url === "https://thestartofyou.com/family")).toHaveLength(1);
    expect(familyLocations.filter((url) => /^https:\/\/thestartofyou\.com\/family\/[^/]+$/.test(url))).toHaveLength(6);
    expect(familyLocations.filter((url) => /^https:\/\/thestartofyou\.com\/family\/[^/]+\/[^/]+$/.test(url))).toHaveLength(18);
    expect(familyLocations).toHaveLength(25);
  });

  it("uses the approved hub hierarchy and one Family-area system", () => {
    const hub = source("src/pages/Family.tsx");
    const ordered = [
      "<FamilyHero />",
      "<FamilyToolsResources />",
      "<FamilyTopicClusters />",
      "<FamilyCommonQuestions />",
      "<FamilyAISupport />",
      "<FamilySupportNote />",
      "<FamilyPathways />",
    ].map((component) => sectionPosition(hub, component));

    expect(ordered).toEqual([...ordered].sort((a, b) => a - b));
    expect(hub).not.toContain("FamilyQuickNav");
    expect(hub.match(/<FamilyTopicClusters \/>/g)).toHaveLength(1);
    expect(hub.match(/<FamilyAISupport \/>/g)).toHaveLength(1);
  });

  it("links all six Family areas from the single editorial navigation", () => {
    const navigation = source("src/components/family/FamilyTopicClusters.tsx");
    Object.keys(familyTopics).forEach((slug) => expect(navigation).toContain(`"${slug}"`));
    expect(navigation).toContain("topic.heroImage.src");
    expect(navigation).toContain("topic.areasInside");
  });

  it("keeps hub questions editorial and uses canonical guide destinations", () => {
    const questions = source("src/components/family/FamilyCommonQuestions.tsx");
    expect(questions).not.toContain("/ask");
    expect(questions).not.toContain("Ask more");
    expect(questions).toContain("/family/family-basics/managing-childcare-costs");
    expect(questions).toContain("/family/relationships/sharing-the-mental-load");
    expect(questions).not.toContain("managing-childcare-costs-without-feeling-overwhelmed");
    expect(questions).not.toContain("sharing-the-mental-load-in-family-life");
  });

  it("renders configured topic fields, deduplicates Start Here and keeps one late Companion", () => {
    const topic = source("src/components/family/topic/FamilyTopicPage.tsx");
    expect(topic).toContain("config.intro");
    expect(topic).toContain("config.startHere");
    expect(topic).toContain("config.areasInside.map");
    expect(topic).toContain("!startHereSlugs.has(article.slug)");
    expect(topic.match(/<HubAISupport/g)).toHaveLength(1);
    expect(sectionPosition(topic, "<HubAISupport")).toBeGreaterThan(sectionPosition(topic, "<Accordion"));
    expect(sectionPosition(topic, "<HubAISupport")).toBeGreaterThan(sectionPosition(topic, "remainingGuidance.map"));
  });

  it("keeps every ready guide discoverable and mapped to an existing image", () => {
    const ready = familyArticles.filter((article) => article.status === "ready");
    const surfaced = new Set<string>();
    Object.values(familyTopics).forEach((config) => {
      ready.filter((article) => article.topic === config.slug).forEach((article) => surfaced.add(article.slug));
    });

    expect(surfaced.size).toBe(18);
    ready.forEach((article) => {
      expect(surfaced.has(article.slug), article.slug).toBe(true);
      expect(getFamilyArticleCardImage(article), article.slug).toBeTruthy();
    });
  });
});