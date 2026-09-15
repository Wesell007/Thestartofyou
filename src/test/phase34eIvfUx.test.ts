import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ivfTopicConfigs, type IVFDestination, type IVFDestinationKind } from "@/data/ivfTopicData";

const hubSource = readFileSync("src/pages/IVF.tsx", "utf8");
const guidesSource = readFileSync("src/components/ivf/IVFGuides.tsx", "utf8");
const stageSource = readFileSync("src/components/ivf/IVFTopicPage.tsx", "utf8");
const hubGuideHrefs = [...guidesSource.matchAll(/href: "(\/articles\/[^"]+)"/g)].map((match) => match[1]);

const allDestinations = Object.values(ivfTopicConfigs).flatMap((config) => [
  ...config.guides,
  ...config.aiPrompts,
  config.tool,
  config.supportAction,
  config.journalNote.destination,
  config.handoverNote?.destination,
  config.prevTopic,
  config.nextTopic,
].filter((item): item is IVFDestination => Boolean(item)));

describe("phase 34E IVF destination behaviour", () => {
  it("uses exactly the seven approved destination kinds", () => {
    const kinds = new Set<IVFDestinationKind>(allDestinations.map((item) => item.kind));
    expect([...kinds].sort()).toEqual(["ai", "article", "hub", "journey", "stage", "support", "tool"]);
  });

  it("keeps kind and destination behaviour aligned", () => {
    for (const item of allDestinations) {
      if (item.kind === "article") expect(item.href).toMatch(/^\/articles\//);
      if (item.kind === "ai") expect(item.href).toMatch(/^ask:/);
      if (item.kind !== "ai") expect(item.href).not.toMatch(/^ask:/);
    }
  });

  it("keeps every stage guide section article only and deduplicated", () => {
    for (const config of Object.values(ivfTopicConfigs)) {
      expect(config.guides.every((guide) => guide.kind === "article" && guide.href.startsWith("/articles/"))).toBe(true);
      expect(new Set(config.guides.map((guide) => guide.href)).size).toBe(config.guides.length);
    }
  });
});

describe("phase 34E hub discovery and AI separation", () => {
  it("accounts for eight unique IVF guides including all six phase 34C and 34D guides", () => {
    const hrefs = hubGuideHrefs;
    expect(hrefs).toHaveLength(8);
    expect(new Set(hrefs).size).toBe(8);
    expect(hrefs).toEqual(expect.arrayContaining([
      "/articles/what-ivf-is-uk-guide",
      "/articles/nhs-ivf-funding-and-eligibility",
      "/articles/ohss-and-ivf-side-effects",
      "/articles/when-an-ivf-cycle-does-not-work",
      "/articles/ivf-vs-icsi",
      "/articles/fresh-vs-frozen-embryo-transfer",
    ]));
  });

  it("mounts one Companion and removes the standalone Common Questions area", () => {
    expect((hubSource.match(/<IVFAISupport/g) ?? []).length).toBe(1);
    expect(hubSource).not.toContain("IVFCommonQuestions");
    expect((stageSource.match(/<IVFCompanion/g) ?? []).length).toBe(1);
  });

  it("keeps one timeline tool and a separate timeline article", () => {
    expect(hubSource).toContain("<IVFHero />");
    expect(hubGuideHrefs.filter((href) => href === "/articles/ivf-timeline-what-to-expect")).toHaveLength(1);
  });
});