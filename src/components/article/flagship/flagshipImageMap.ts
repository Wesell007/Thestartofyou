// ─── Flagship image mapping ────────────────────────────────────────────────
// Topic-specific & section-specific imagery for the 3 flagship reference
// articles. NO decorative fallback flowers, NO generic lifestyle filler.
// Every image listed below is chosen because it depicts something genuinely
// related to the article or section subject.

import heroTestsScans from "@/assets/article-hero-tests-scans.jpg";
import heroEating from "@/assets/article-hero-second-eating.jpg";
import journalCoupleUltrasound from "@/assets/journal-couple-ultrasound.jpg";
import journalUltrasound from "@/assets/journal-ultrasound.jpg";
import cardTimelines from "@/assets/guidance-card-timelines.jpg";
import cardPractical from "@/assets/guidance-card-practical.jpg";
import cardSymptoms from "@/assets/guidance-card-symptoms.jpg";
import cardNourish from "@/assets/guidance-card-nourish.jpg";
import cardMilestones from "@/assets/guidance-card-milestones.jpg";
import cardQuiet from "@/assets/guidance-card-quiet.jpg";
import cardBody from "@/assets/guidance-card-body.jpg";
import cardComfort from "@/assets/guidance-card-comfort.jpg";
import cardSafety from "@/assets/guidance-card-safety.jpg";
import secondMovement from "@/assets/article-hero-second-movement.jpg";

export const FLAGSHIP_SLUGS = [
  "tests-and-scans-in-pregnancy",
  "heartburn-in-pregnancy",
  "anterior-placenta",
] as const;

export type FlagshipSlug = (typeof FLAGSHIP_SLUGS)[number];

export const isFlagshipSlug = (slug: string): slug is FlagshipSlug =>
  (FLAGSHIP_SLUGS as readonly string[]).includes(slug);

export const flagshipHeroMap: Record<
  FlagshipSlug,
  { src: string; alt: string }
> = {
  "tests-and-scans-in-pregnancy": {
    src: heroTestsScans,
    alt: "A pregnant person at an antenatal scan, the screen and gel just visible at the edge of the frame.",
  },
  "heartburn-in-pregnancy": {
    src: heroEating,
    alt: "A small, calm meal laid out on a kitchen counter — the kind of smaller, gentler eating that helps with reflux in pregnancy.",
  },
  "anterior-placenta": {
    src: journalCoupleUltrasound,
    alt: "A couple looking at an ultrasound image together, where placental position is first noted.",
  },
};

export const flagshipSectionImageMap: Record<string, { src: string; alt: string }> = {
  // Tests and scans
  "tests-and-scans-in-pregnancy::what-tests-and-scans-are-for": {
    src: cardTimelines,
    alt: "An antenatal notes folder open on a clinic table — the scaffolding of pregnancy care.",
  },
  "tests-and-scans-in-pregnancy::first-trimester": {
    src: cardPractical,
    alt: "A midwife taking blood pressure at a booking appointment.",
  },
  "tests-and-scans-in-pregnancy::twelve-week-scan": {
    src: journalCoupleUltrasound,
    alt: "A 12-week ultrasound image being shown to expectant parents.",
  },
  "tests-and-scans-in-pregnancy::twenty-week-scan": {
    src: journalUltrasound,
    alt: "A 20-week anomaly scan image, the baby in profile.",
  },
  "tests-and-scans-in-pregnancy::blood-tests-and-routine-checks": {
    src: cardSymptoms,
    alt: "A blood pressure cuff and urine sample pot at a routine antenatal check.",
  },
  "tests-and-scans-in-pregnancy::glucose-testing": {
    src: cardNourish,
    alt: "A glass of the glucose drink used in the oral glucose tolerance test.",
  },
  "tests-and-scans-in-pregnancy::personalised-additions": {
    src: cardMilestones,
    alt: "A consultant-led appointment with extra growth scan imagery on screen.",
  },
  "tests-and-scans-in-pregnancy::asking-questions": {
    src: cardQuiet,
    alt: "A person writing questions in a notebook before a midwife appointment.",
  },

  // Heartburn
  "heartburn-in-pregnancy::why": {
    src: cardBody,
    alt: "A pregnant person resting a hand on the upper abdomen, where reflux tends to be felt.",
  },
  "heartburn-in-pregnancy::what-helps": {
    src: cardComfort,
    alt: "A bed propped with extra pillows — one of the most reliable everyday helps for heartburn.",
  },
  "heartburn-in-pregnancy::when-to-raise-it": {
    src: cardSafety,
    alt: "A phone and notes by a bed at night — the moment a symptom tips from ordinary to worth raising.",
  },

  // Anterior placenta
  "anterior-placenta::what-it-is": {
    src: journalUltrasound,
    alt: "An anomaly scan image where placental position is identified.",
  },
  "anterior-placenta::movement": {
    src: secondMovement,
    alt: "A pregnant person resting hands on their bump, paying attention to movement.",
  },
  "anterior-placenta::reduced-movements": {
    src: cardSafety,
    alt: "A maternity unit phone number on a fridge — the reminder to ring the same day if movements change.",
  },
};
