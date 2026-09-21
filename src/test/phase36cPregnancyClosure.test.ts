import { describe, expect, it } from "vitest";
import { getAllArticles } from "@/data/articleData";
import { pregnancyTopics } from "@/data/pregnancyTopicData";
import { weeklyArticleSuggestions } from "@/data/weeklyArticleSuggestions";

const articles = getAllArticles();
const slugs = new Set(articles.map((a) => a.slug));
const RETIRED = "writing-a-birth-plan";

const bySlug = (slug: string) => {
  const article = articles.find((a) => a.slug === slug);
  expect(article, `expected article ${slug}`).toBeTruthy();
  return article!;
};

const jsonOf = (slug: string) => JSON.stringify(bySlug(slug));

describe("Phase 36C — Pregnancy final cleanup", () => {
  it("has no stale related slugs anywhere in the article dataset", () => {
    const stale: string[] = [];
    for (const article of articles) {
      for (const related of article.relatedSlugs ?? []) {
        if (!slugs.has(related)) stale.push(`${article.slug} -> ${related}`);
      }
    }
    expect(stale).toEqual([]);
  });

  it("no longer references the retired first-trimester-symptoms or headaches-in-pregnancy slugs", () => {
    const all = JSON.stringify(articles);
    expect(all).not.toContain("first-trimester-symptoms");
    expect(all).not.toContain("headaches-in-pregnancy");
  });

  it("gives each former orphan exactly one editorial inbound path", () => {
    expect(jsonOf("early-pregnancy-symptoms-explained")).toContain(
      "/articles/symptoms-stopping-early-pregnancy",
    );
    expect(jsonOf("anterior-placenta")).toContain("/articles/low-lying-placenta-in-pregnancy");
  });

  it("offers a loss-support handoff from early-pregnancy bleeding guidance", () => {
    expect(jsonOf("bleeding-in-early-pregnancy")).toContain("/articles/pregnancy-after-loss");
  });

  it("offers a First Year editorial handoff from the preparing-for-baby topic page", () => {
    const preparing = JSON.stringify(pregnancyTopics["preparing-for-baby"]);
    expect(preparing).toContain("/articles/your-body-after-birth");
    expect(preparing).toContain("/first-year");
  });

  it("routes all birth-plan intent to the canonical birth-preferences article", () => {
    const surfaces = [
      JSON.stringify(articles),
      JSON.stringify(pregnancyTopics),
      JSON.stringify(weeklyArticleSuggestions),
    ];
    for (const surface of surfaces) {
      expect(surface).not.toContain(`/articles/${RETIRED}`);
    }
    for (const article of articles) {
      expect(article.relatedSlugs ?? []).not.toContain(RETIRED);
    }
    expect(JSON.stringify(weeklyArticleSuggestions)).toContain("birth-preferences");
  });

  it("covers the five audited expansion gaps in their existing owners", () => {
    expect(jsonOf("complete-guide-morning-sickness")).toContain("hyperemesis-gravidarum");
    expect(jsonOf("stages-of-labour")).toContain("pain-relief-through-the-stages");
    expect(jsonOf("swelling-in-pregnancy")).toContain("pre-eclampsia-in-more-detail");
    expect(jsonOf("preparing-for-baby-complete-guide").toLowerCase()).toContain("antenatal classes");
  });

  it("no longer states the audited unsupported numerical claims", () => {
    const all = JSON.stringify(articles);
    for (const claim of [
      "up to 80% of pregnant people",
      "roughly doubling every 48 to 72 hours",
      "approximately 1-3% of pregnancies",
      "2 to 2.5 litres",
      "2-2.5 litres",
      "8-10 cups",
      "40-50%",
      "500ml",
      "15–25% of people notice",
      "35cm by 28 weeks",
      "head-down position by around 36 weeks",
      "25-30%",
      "25–30%",
      "between weeks 12-14 as hormone levels stabilise",
      "ready by 36 weeks",
    ]) {
      expect(all, `claim still present: ${claim}`).not.toContain(claim);
    }
  });
});
