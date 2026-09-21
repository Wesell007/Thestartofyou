/**
 * AIC-J4 closure remainder — the two-surface invariant, verified against the
 * repository rather than against a single hook name.
 */

import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = join(process.cwd(), "src");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(ts|tsx)$/.test(full) ? [full] : [];
  });

const APP_FILES = walk(SRC).filter(
  (f) => !f.includes(`${SRC}/test/`) && !/\.(test|spec)\.tsx?$/.test(f),
);

const read = (rel: string) => readFileSync(join(SRC, rel), "utf8");

describe("AI execution paths", () => {
  const executors = APP_FILES.filter((file) => {
    const body = readFileSync(file, "utf8");
    return (
      /\buseAISearch\(\)/.test(body) ||
      /\buseCompanionConversation\(\{/.test(body) ||
      /functions\/v1\/ai-search/.test(body) ||
      /invoke\(\s*["']ai-search["']/.test(body)
    );
  }).map((f) => f.replace(`${SRC}/`, ""));

  it("has exactly two answer surfaces plus the shared runtime primitives", () => {
    expect(executors.sort()).toEqual(
      [
        "components/companion/CompanionProvider.tsx",
        "hooks/useAISearch.ts",
        "lib/companion/conversation/useCompanionConversation.ts",
        "pages/AskPage.tsx",
      ].sort(),
    );
  });

  it("keeps journey cards free of independent AI execution", () => {
    for (const rel of [
      "components/firstyear/today/DaySummaryCard.tsx",
      "components/ttc/journey/TTCAskCompanionCard.tsx",
      "components/firstyear/journey/FirstYearAskCompanion.tsx",
      "components/myweek/SectionAskAI.tsx",
    ]) {
      let body: string;
      try {
        body = read(rel);
      } catch {
        continue;
      }
      expect(body).not.toMatch(/useAISearch/);
      expect(body).not.toMatch(/useCompanionConversation/);
      expect(body).not.toMatch(/functions\/v1\/ai-search/);
    }
  });
});

describe("contextual labels describe the content, not the person", () => {
  it("uses week wording on the pregnancy week surface", () => {
    const body = read("components/week/WeekAISupport.tsx");
    expect(body).toContain('label="Ask about this week"');
    expect(body).not.toMatch(/AISearchBar/);
  });

  it("uses trimester wording on the trimester surface", () => {
    const body = read("components/trimester/TrimesterAISupport.tsx");
    expect(body).toContain('label="Ask about this trimester"');
  });

  it("uses month wording on the first year month surface", () => {
    expect(read("components/firstyear/month/FirstYearMonthPage.tsx")).toContain(
      'label="Ask about this month"',
    );
  });

  it("uses phase wording on the first year phase surface", () => {
    expect(read("components/firstyear/phase/FirstYearPhasePage.tsx")).toContain(
      'label="Ask about this phase"',
    );
  });

  it("uses topic wording on the first year topic surface", () => {
    const body = read("components/firstyear/topic/FirstYearTopicPage.tsx");
    expect(body).toContain('label="Ask about this topic"');
    expect(body).not.toContain("Ask about this month");
    expect(body).not.toMatch(/HubAISupport/);
  });

  it("uses topic wording on TTC topic surfaces", () => {
    for (const rel of [
      "components/ttc/TTCTopicPage.tsx",
      "components/ttc/TTCSubtopicPage.tsx",
    ]) {
      expect(read(rel)).toContain('label="Ask about this topic"');
    }
  });

  it("keeps the stage page ask affordance contextual", () => {
    const body = read("pages/StagePage.tsx");
    expect(body).toContain('label="Ask about this stage"');
    expect(body).not.toContain('to="/ask"');
  });

  it("removes the raw ask link from the TTC support moment card", () => {
    const body = read("components/ttc/journey/TTCSupportMomentCard.tsx");
    expect(body).not.toContain("/ask?stage=ttc");
    expect(body).toContain("AskAboutThis");
  });
});

describe("shared search input naming", () => {
  it("gives the free-text field a programmatic label", () => {
    const body = read("components/shared/AISearchBar.tsx");
    expect(body).toContain("htmlFor={inputId}");
    expect(body).toContain("inputLabel");
  });
});

describe("provider module boundaries", () => {
  it("keeps the optional hook out of the provider component module", () => {
    expect(read("components/companion/CompanionProvider.tsx")).not.toContain(
      "export function useCompanionOptional",
    );
    expect(read("components/companion/useCompanionOptional.ts")).toContain(
      "export function useCompanionOptional",
    );
  });
});
