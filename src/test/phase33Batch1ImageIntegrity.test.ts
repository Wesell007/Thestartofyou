import { describe, expect, it } from "vitest";
import { firstYearArticleImageMap } from "@/components/firstyear/article/firstYearArticleImages";
import { getArticle } from "@/data/articleData";
import { firstYearArticles } from "@/data/firstYearArticleData";

const SLEEP_SLUG = "when-sleep-suddenly-changes";
const HAIR_DYE_SLUG = "hair-dye-and-beauty-treatments-in-pregnancy";

describe("Phase 33 Batch 1 image integrity", () => {
  it("keeps sleep imagery attached to the intended section titles", () => {
    const article = firstYearArticles.find((item) => item.slug === SLEEP_SLUG);
    const images = firstYearArticleImageMap[SLEEP_SLUG];

    expect(article).toBeDefined();
    expect(images).toBeDefined();
    expect(images?.body).toHaveLength(2);

    const placements = images?.body.map((image) => ({
      heading: article?.sections[image.afterSectionIndex]?.heading,
      src: image.src,
      alt: image.alt,
    }));

    expect(placements?.map(({ heading }) => heading)).toEqual([
      "Things that commonly disturb a settled pattern",
      "What tends to help",
    ]);
    expect(placements?.every(({ src, alt }) => Boolean(src && alt))).toBe(true);
    expect(new Set([images?.hero.src, ...images?.body.map(({ src }) => src)])).toHaveProperty(
      "size",
      3,
    );
  });

  it("keeps hair-dye imagery on two distinct editorial sections", () => {
    const article = getArticle(HAIR_DYE_SLUG);
    const imagedSections = article?.editorialSections?.filter((section) => section.image) ?? [];

    expect(article?.hero?.src).toBeTruthy();
    expect(imagedSections.map(({ heading }) => heading)).toEqual([
      "Ways to feel more comfortable about it",
      "Nails, lashes and brows",
    ]);
    expect(imagedSections.every(({ image }) => Boolean(image?.src && image.alt))).toBe(true);
    expect(
      new Set([article?.hero?.src, ...imagedSections.map(({ image }) => image?.src)]),
    ).toHaveProperty("size", 3);
  });
});