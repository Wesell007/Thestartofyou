import { describe, expect, it } from "vitest";
import { firstYearArticleImageMap } from "@/components/firstyear/article/firstYearArticleImages";
import { getArticle } from "@/data/articleData";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";
import { resolveArticleHeroBySlug } from "@/lib/articleHeroImage";
import { resolveRowThumb } from "@/lib/pregnancyRowThumbnails";

const SLEEP_SLUG = "when-sleep-suddenly-changes";
const HAIR_DYE_SLUG = "hair-dye-and-beauty-treatments-in-pregnancy";
const HAIR_DYE_HREF = `/articles/${HAIR_DYE_SLUG}`;

describe("Phase 33 Batch 1 image integrity", () => {
  it("keeps sleep imagery attached to the intended section titles", () => {
    const article = firstYearArticles.find((item) => item.slug === SLEEP_SLUG);
    const images = firstYearArticleImageMap[SLEEP_SLUG];
    const bodyImages = images?.body ?? [];

    expect(article).toBeDefined();
    expect(images).toBeDefined();
    expect(images?.body).toHaveLength(2);

    const placements = bodyImages.map((image) => ({
      heading: article?.sections[image.afterSectionIndex]?.heading,
      src: image.src,
      alt: image.alt,
    }));

    expect(placements?.map(({ heading }) => heading)).toEqual([
      "Things that commonly disturb a settled pattern",
      "What tends to help",
    ]);
    expect(placements?.every(({ src, alt }) => Boolean(src && alt))).toBe(true);
    expect(images?.hero.src).toContain("firstyear-hero-sleep-changes-safe");
    expect(images?.hero.alt).toBe(
      "Baby lying on their back in a fitted sleep bag, in a clear wooden cot with a fitted sheet",
    );
    expect(images?.hero.alt).not.toMatch(/safe sleep|should|risk|always|never/i);
    expect(new Set([images?.hero.src, ...bodyImages.map(({ src }) => src)])).toHaveProperty(
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

  it("exposes exactly one hair-dye discovery entry on Pregnancy health and safety", () => {
    const config = pregnancyTopicConfigs["health-and-safety"]!;
    const matches = config.groups.flatMap((group) =>
      group.links
        .filter((link) => link.href === HAIR_DYE_HREF)
        .map((link) => ({ group: group.label, label: link.label })),
    );

    expect(matches).toHaveLength(1);
    expect(matches[0].group).toBe("Staying well day to day");
    expect(matches[0].label).toBe("Hair dye and beauty treatments in pregnancy");
    expect(getArticle(HAIR_DYE_SLUG)?.slug).toBe(HAIR_DYE_SLUG);
    expect(resolveRowThumb(resolveArticleHeroBySlug(HAIR_DYE_SLUG)!.src)).toBeTruthy();
  });
});