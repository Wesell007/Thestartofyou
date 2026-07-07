import heroNewbornSleep from "@/assets/firstyear-stage-0-3.jpg";
import heroSettle from "@/assets/firstyear-scene.jpg";
import heroSafeSleep from "@/assets/guidance-card-nursery.jpg";
import heroBabyCare from "@/assets/firstyear-journey.jpg";

import bodySleepCot from "@/assets/article-hero-third-sleep.jpg";
import bodyComfort from "@/assets/guidance-card-comfort.jpg";
import bodySafety from "@/assets/guidance-card-safety.jpg";
import bodyBonding from "@/assets/guidance-card-bonding.jpg";

export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface FirstYearArticleImages {
  hero: { src: string; alt: string };
  body: HubBodyImage[];
}

export const firstYearArticleImageMap: Record<string, FirstYearArticleImages> = {
  // bespoke future: newborn asleep in a soft, warm-lit family bedroom
  "newborn-sleep-expectations": {
    hero: {
      src: heroNewbornSleep,
      alt: "A newborn resting calmly in a soft first-year home setting",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodySleepCot,
        alt: "A quiet nursery cot in soft, warm light",
        caption: "Newborn sleep rarely follows a schedule, and that is normal.",
      },
    ],
  },
  // bespoke future: parent settling baby in warm evening light
  "helping-your-baby-settle": {
    hero: {
      src: heroSettle,
      alt: "A parent gently holding and settling a baby at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyComfort,
        alt: "A soothing evening moment with a baby",
        caption: "Settling is a slow rhythm you build together, not a single technique.",
      },
    ],
  },
  // bespoke future: safe cot detail with breathable bedding
  "safe-sleep-and-home-safety": {
    hero: {
      src: heroSafeSleep,
      alt: "A calm, safe nursery prepared for a baby",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodySafety,
        alt: "A gentle home safety detail in a warm baby room",
        caption: "Small, consistent habits protect a baby more than any single product.",
      },
    ],
  },
  // bespoke future: parent bathing or changing baby in soft daylight
  "baby-care-basics": {
    hero: {
      src: heroBabyCare,
      alt: "An everyday first-year moment of a parent caring for a baby",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyBonding,
        alt: "A parent tending to a baby in a soft, unhurried moment",
        caption: "The basics become intuitive faster than most new parents expect.",
      },
    ],
  },
};

export const getFirstYearArticleImages = (
  slug: string,
): FirstYearArticleImages | undefined => firstYearArticleImageMap[slug];
