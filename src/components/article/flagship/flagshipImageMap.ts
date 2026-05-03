// ─── Flagship image mapping ────────────────────────────────────────────────
// Topic-specific & section-specific imagery for the 3 flagship reference
// articles. NO decorative fallback flowers, NO generic lifestyle filler.
// Every image listed below is chosen because it depicts something genuinely
// related to the article or section subject.

import heroTestsScans from "@/assets/article-hero-tests-scans.jpg";
import journalCoupleUltrasound from "@/assets/journal-couple-ultrasound.jpg";
import journalUltrasound from "@/assets/journal-ultrasound.jpg";
import cardTimelines from "@/assets/guidance-card-timelines.jpg";
import cardPractical from "@/assets/guidance-card-practical.jpg";
import cardSymptoms from "@/assets/guidance-card-symptoms.jpg";
import cardNourish from "@/assets/guidance-card-nourish.jpg";
import cardMilestones from "@/assets/guidance-card-milestones.jpg";
import cardQuiet from "@/assets/guidance-card-quiet.jpg";

// Topic-specific flagship imagery (refined pass)
import heartburnHero from "@/assets/flagship-heartburn-hero.jpg";
import heartburnAnatomy from "@/assets/flagship-heartburn-anatomy.jpg";
import heartburnPillows from "@/assets/flagship-heartburn-pillows.jpg";
import heartburnCall from "@/assets/flagship-heartburn-call.jpg";
import anteriorHero from "@/assets/flagship-anterior-hero.jpg";
import anteriorPositions from "@/assets/flagship-anterior-positions.jpg";
import anteriorMovement from "@/assets/flagship-anterior-movement.jpg";
import anteriorCall from "@/assets/flagship-anterior-call.jpg";

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
    src: heartburnHero,
    alt: "A pregnant person at home in soft daylight, one hand resting on the upper chest near the sternum, the other supporting the bump — the felt experience of pregnancy reflux.",
  },
  "anterior-placenta": {
    src: anteriorHero,
    alt: "A pregnant person in soft daylight, hands resting on the bump with an ultrasound printout lightly held — quiet attention to placental position.",
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
    src: heartburnAnatomy,
    alt: "A soft editorial anatomy illustration of the oesophagus, stomach valve, and growing uterus pressing upward — showing why reflux is so common in pregnancy.",
  },
  "heartburn-in-pregnancy::what-helps": {
    src: heartburnPillows,
    alt: "A bed with pillows propped against the headboard and a glass of water on the bedside table — the upright resting setup that genuinely helps with reflux.",
  },
  "heartburn-in-pregnancy::when-to-raise-it": {
    src: heartburnCall,
    alt: "A pregnant person sitting upright on a sofa, on the phone to a midwife with one hand on the bump — the moment a symptom tips from ordinary to worth raising.",
  },

  // Anterior placenta
  "anterior-placenta::what-it-is": {
    src: anteriorPositions,
    alt: "A soft editorial diagram showing four placenta positions — anterior, posterior, fundal and lateral — making clear that anterior simply means the placenta sits at the front of the uterus.",
  },
  "anterior-placenta::movement": {
    src: anteriorMovement,
    alt: "Both hands resting attentively on a pregnant bump in soft knitwear — quietly waiting to notice movement through an anterior placenta.",
  },
  "anterior-placenta::reduced-movements": {
    src: anteriorCall,
    alt: "A hand holding a phone near the bump with pregnancy notes alongside — the rule about calling if movements change does not change with an anterior placenta.",
  },
};
