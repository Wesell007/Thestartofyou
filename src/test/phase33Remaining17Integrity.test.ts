import { describe, expect, it } from "vitest";
import { firstYearArticleImageMap } from "@/components/firstyear/article/firstYearArticleImages";
import { getArticle } from "@/data/articleData";
import type { FirstYearArticleTopic } from "@/data/firstYearArticleData";
import { firstYearArticles, getFirstYearArticlesByTopic } from "@/data/firstYearArticleData";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

/**
 * Phase 33 authoritative runtime inventory.
 * Legacy = 9 (8 from Phase 33.3 + 1 Batch 1), First Year = 10 (9 + 1 Batch 1).
 */
const LEGACY_SLUGS = [
  "itching-in-pregnancy",
  "caesarean-birth",
  "gestational-diabetes",
  "diarrhoea-and-tummy-bugs-in-pregnancy",
  "leg-cramps-in-pregnancy",
  "hcg-levels-explained",
  "sex-during-pregnancy",
  "dizziness-and-feeling-faint-in-pregnancy",
  "hair-dye-and-beauty-treatments-in-pregnancy",
] as const;

const FIRST_YEAR_SLUGS: Record<string, FirstYearArticleTopic> = {
  teething: "care-and-safety",
  "colic-and-evening-crying": "care-and-safety",
  "introducing-solid-foods": "feeding",
  "stitches-tears-and-perineal-healing": "postpartum-recovery",
  "separated-tummy-muscles": "body-and-hormones",
  "sex-and-intimacy-after-birth": "body-and-hormones",
  "newborn-quirks-and-reflexes": "care-and-safety",
  "newborn-skin-spots-and-marks": "care-and-safety",
  "common-illnesses-in-the-first-year": "checkups-and-warning-signs",
  "when-sleep-suddenly-changes": "sleep",
};

/** Phase 33.3 records only: the two Batch 1 records are covered by their own suite. */
const REMAINING_LEGACY = LEGACY_SLUGS.filter(
  (slug) => slug !== "hair-dye-and-beauty-treatments-in-pregnancy",
);
const REMAINING_FIRST_YEAR = Object.keys(FIRST_YEAR_SLUGS).filter(
  (slug) => slug !== "when-sleep-suddenly-changes",
);

/** The five approved Phase 32F ownership migration intents. */
const MIGRATION_INTENTS = [
  {
    intent: "caesarean-birth",
    source: { system: "legacy", slug: "signs-of-labour" },
    href: "/articles/caesarean-birth",
  },
  {
    intent: "teething",
    source: { system: "first-year", slug: "when-sleep-suddenly-changes" },
    href: "/first-year/care-and-safety/teething",
  },
  {
    intent: "introducing-solid-foods",
    source: { system: "legacy", slug: "feeding-your-baby-complete-guide" },
    href: "/first-year/feeding/introducing-solid-foods",
  },
  {
    intent: "stitches-tears-and-perineal-healing",
    source: { system: "first-year", slug: "healing-after-birth" },
    href: "/first-year/postpartum-recovery/stitches-tears-and-perineal-healing",
  },
  {
    intent: "separated-tummy-muscles",
    source: { system: "legacy", slug: "your-body-after-birth" },
    href: "/first-year/body-and-hormones/separated-tummy-muscles",
  },
];

const CLAIM_LIKE_ALT =
  /\b(safe|unsafe|risky?|should|must|always|never|cures?|treats?|diagnos\w*)\b/i;

const legacyDiscoveryMatches = (slug: string) =>
  Object.entries(pregnancyTopicConfigs).flatMap(([topic, config]) =>
    (config?.groups ?? []).flatMap((group) =>
      group.links
        .filter((link) => link.href === `/articles/${slug}`)
        .map((link) => ({ topic, group: group.label, label: link.label })),
    ),
  );

describe("Phase 33 article inventory", () => {
  it("has all 19 runtime records in the correct system with unique slugs", () => {
    expect(LEGACY_SLUGS).toHaveLength(9);
    expect(Object.keys(FIRST_YEAR_SLUGS)).toHaveLength(10);

    for (const slug of LEGACY_SLUGS) {
      expect(getArticle(slug)?.slug, slug).toBe(slug);
      expect(firstYearArticles.some((item) => item.slug === slug), slug).toBe(false);
    }

    for (const [slug, topic] of Object.entries(FIRST_YEAR_SLUGS)) {
      const matches = firstYearArticles.filter((item) => item.slug === slug);
      expect(matches, slug).toHaveLength(1);
      expect(matches[0].topic, slug).toBe(topic);
      expect(getArticle(slug), slug).toBeNull();
    }
  });
});

describe("Phase 33.3 imagery", () => {
  it("gives every legacy record one hero and two body images on named sections", () => {
    for (const slug of REMAINING_LEGACY) {
      const article = getArticle(slug);
      const imaged = (article?.editorialSections ?? []).filter((section) => section.image);

      expect(article?.hero?.src, slug).toBeTruthy();
      expect(imaged, slug).toHaveLength(2);
      expect(imaged.every(({ heading }) => Boolean(heading)), slug).toBe(true);
      expect(imaged.every(({ image }) => Boolean(image?.src && image.alt)), slug).toBe(true);
      expect(
        new Set([article?.hero?.src, ...imaged.map(({ image }) => image?.src)]).size,
        slug,
      ).toBe(3);
      expect(article?.hero?.alt ?? "", slug).not.toMatch(CLAIM_LIKE_ALT);
      for (const section of imaged) {
        expect(section.image?.alt ?? "", `${slug} / ${section.heading}`).not.toMatch(CLAIM_LIKE_ALT);
      }
    }
  });

  it("gives every First Year record one hero and two body images on named sections", () => {
    for (const slug of REMAINING_FIRST_YEAR) {
      const article = firstYearArticles.find((item) => item.slug === slug);
      const images = firstYearArticleImageMap[slug];
      const body = images?.body ?? [];

      expect(images?.hero?.src, slug).toBeTruthy();
      expect(body, slug).toHaveLength(2);
      expect(new Set([images?.hero?.src, ...body.map(({ src }) => src)]).size, slug).toBe(3);

      for (const image of body) {
        const heading = article?.sections[image.afterSectionIndex]?.heading;
        expect(heading, `${slug} @ ${image.afterSectionIndex}`).toBeTruthy();
        expect(image.alt, slug).toBeTruthy();
        expect(image.alt, `${slug} / ${heading}`).not.toMatch(CLAIM_LIKE_ALT);
      }
      expect(images?.hero?.alt ?? "", slug).not.toMatch(CLAIM_LIKE_ALT);
    }
  });
});

describe("Phase 33 normal category discovery", () => {
  it("lists every legacy record exactly once across Pregnancy topic groups", () => {
    for (const slug of LEGACY_SLUGS) {
      const matches = legacyDiscoveryMatches(slug);
      expect(matches, slug).toHaveLength(1);
      expect(matches[0].label, slug).toBeTruthy();
    }
  });

  it("surfaces every First Year record exactly once on its topic listing", () => {
    for (const [slug, topic] of Object.entries(FIRST_YEAR_SLUGS)) {
      const listed = getFirstYearArticlesByTopic(topic).filter((item) => item.slug === slug);
      expect(listed, slug).toHaveLength(1);
      expect(legacyDiscoveryMatches(slug), slug).toHaveLength(0);
    }
  });
});

describe("Phase 32F approved migration intents", () => {
  it("satisfies all five approved intents and introduces no others", () => {
    const satisfied = MIGRATION_INTENTS.filter(({ source, href }) => {
      const crossLinks =
        source.system === "legacy"
          ? (getArticle(source.slug)?.crossLinks ?? [])
          : (firstYearArticles.find((item) => item.slug === source.slug)?.crossLinks ?? []);
      return crossLinks.some((link) => link.href === href);
    });

    expect(MIGRATION_INTENTS).toHaveLength(5);
    expect(satisfied).toHaveLength(5);

    const approvedTargets = new Set<string>(MIGRATION_INTENTS.map(({ href }) => href));
    const phase33Targets = new Set<string>([
      ...LEGACY_SLUGS.map((slug) => `/articles/${slug}`),
      ...Object.entries(FIRST_YEAR_SLUGS).map(([slug, topic]) => `/first-year/${topic}/${slug}`),
    ]);

    const sourceSlugs = new Set<string>(MIGRATION_INTENTS.map(({ source }) => source.slug));
    const unapproved: string[] = [];
    for (const article of firstYearArticles) {
      if (sourceSlugs.has(article.slug) || FIRST_YEAR_SLUGS[article.slug]) continue;
      for (const link of article.crossLinks ?? []) {
        if (phase33Targets.has(link.href) && !approvedTargets.has(link.href)) {
          unapproved.push(`${article.slug} -> ${link.href}`);
        }
      }
    }
    expect(unapproved).toEqual([]);
  });
});

describe("Phase 33 review metadata", () => {
  it("makes no unsupported review claim on any Phase 33.3 record", () => {
    for (const slug of REMAINING_FIRST_YEAR) {
      const article = firstYearArticles.find((item) => item.slug === slug);
      expect(article?.medicallyReviewed ?? false, slug).toBe(false);
      expect(article?.reviewedBy ?? null, slug).toBeNull();
      expect(article?.status, slug).toBe("ready");
    }

    for (const slug of REMAINING_LEGACY) {
      const article = getArticle(slug);
      expect(article?.reviewedBy ?? null, slug).toBeNull();
    }
  });
});
