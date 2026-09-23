import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { toddlerArticles } from "@/data/toddlerArticleData";
import { toddlerAgeConfigs } from "@/data/toddlerAgeData";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";
import { articleInventory } from "@/data/articleInventory";

const source = (path: string) => readFileSync(resolve(path), "utf8");

const locations = [...source("public/sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const toddlerLocations = locations.filter((url) => url.includes("thestartofyou.com/toddler"));

const sectionPosition = (page: string, component: string) => {
  const value = page.indexOf(component);
  expect(value, component).toBeGreaterThan(-1);
  return value;
};

describe("Phase 38A Toddler UX rebuild", () => {
  it("keeps the measured canonical route and sitemap contract", () => {
    expect(Object.keys(toddlerAgeConfigs)).toHaveLength(5);
    expect(Object.keys(toddlerTopicConfigs)).toHaveLength(8);
    expect(toddlerArticles.filter((article) => article.status === "ready")).toHaveLength(16);
    expect(toddlerLocations.filter((url) => url === "https://thestartofyou.com/toddler")).toHaveLength(1);
    expect(toddlerLocations.filter((url) => /^https:\/\/thestartofyou\.com\/toddler\/[^/]+$/.test(url))).toHaveLength(13);
    expect(toddlerLocations.filter((url) => /^https:\/\/thestartofyou\.com\/toddler\/[^/]+\/[^/]+$/.test(url))).toHaveLength(16);
    expect(toddlerLocations).toHaveLength(30);
  });

  it("keeps all canonical articles visible while leaving stale inventory untouched", () => {
    const stale = articleInventory.filter(
      (record) => record.id.startsWith("toddler:") && record.currentStatus === "draft" && record.contentState === "placeholder",
    );
    expect(stale).toHaveLength(16);
    expect(toddlerArticles.filter((article) => article.status === "ready")).toHaveLength(16);
    Object.keys(toddlerTopicConfigs).forEach((topic) => {
      expect(toddlerArticles.filter((article) => article.topic === topic && article.status === "ready"), topic).toHaveLength(2);
    });
  });

  it("uses the approved hub hierarchy and one canonical topic system", () => {
    const hub = source("src/pages/Toddler.tsx");
    const ordered = [
      "<ToddlerHero />",
      "<ToddlerAgeNav />",
      "<ToddlerTopicClusters />",
      "<ToddlerToolsResources />",
      "<ToddlerCommonQuestions />",
      "<ToddlerAISupport />",
      "<ToddlerPathways />",
    ].map((component) => sectionPosition(hub, component));
    expect(ordered).toEqual([...ordered].sort((a, b) => a - b));
    expect(hub).not.toContain("ToddlerWhatThisCovers");
    expect(hub.match(/<ToddlerTopicClusters \/>/g)).toHaveLength(1);
    expect(hub.match(/<ToddlerAISupport \/>/g)).toHaveLength(1);
  });

  it("links every hub age chapter and every canonical topic", () => {
    const ageNav = source("src/components/toddler/ToddlerAgeNav.tsx");
    const topics = source("src/components/toddler/ToddlerTopicClusters.tsx");
    Object.keys(toddlerAgeConfigs).forEach((slug) => expect(ageNav).toContain(`"${slug}"`));
    Object.keys(toddlerTopicConfigs).forEach((slug) => expect(topics).toContain(`"${slug}"`));
  });

  it("keeps one late Companion after editorial questions on age and topic templates", () => {
    const age = source("src/components/toddler/age/ToddlerAgePage.tsx");
    const topic = source("src/components/toddler/topic/ToddlerTopicPage.tsx");
    [age, topic].forEach((page) => {
      expect(page.match(/<HubAISupport/g)).toHaveLength(1);
      expect(sectionPosition(page, "<HubAISupport")).toBeGreaterThan(sectionPosition(page, "<Accordion"));
    });
    expect(sectionPosition(topic, "<HubAISupport")).toBeGreaterThan(sectionPosition(topic, "<ToddlerArticleCard"));
  });

  it("keeps hub questions editorial and adds age navigation to every topic page", () => {
    const questions = source("src/components/toddler/ToddlerCommonQuestions.tsx");
    const topic = source("src/components/toddler/topic/ToddlerTopicPage.tsx");
    expect(questions).not.toContain("/ask");
    expect(questions).not.toContain("Ask about this");
    expect(topic.match(/<ToddlerAgePathwayStrip \/>/g)).toHaveLength(1);
  });
});
