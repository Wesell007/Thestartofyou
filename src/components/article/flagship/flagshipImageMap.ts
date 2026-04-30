// ─── Flagship image mapping ────────────────────────────────────────────────
// Topic-specific & section-specific imagery for the 3 flagship reference
// articles. NO decorative fallback flowers, NO generic lifestyle filler.
// Every image listed below is chosen because it depicts something genuinely
// related to the article or section subject.

export const FLAGSHIP_SLUGS = [
  "tests-and-scans-in-pregnancy",
  "heartburn-in-pregnancy",
  "anterior-placenta",
] as const;

export type FlagshipSlug = (typeof FLAGSHIP_SLUGS)[number];

export const isFlagshipSlug = (slug: string): slug is FlagshipSlug =>
  (FLAGSHIP_SLUGS as readonly string[]).includes(slug);

// Hero image per article. Real photographs already in /src/assets.
export const flagshipHeroMap: Record<
  FlagshipSlug,
  { src: string; alt: string }
> = {
  "tests-and-scans-in-pregnancy": {
    src: "/src/assets/article-hero-tests-scans.jpg",
    alt: "A pregnant person at an antenatal scan, the screen and gel just visible at the edge of the frame.",
  },
  "heartburn-in-pregnancy": {
    src: "/src/assets/article-hero-second-eating.jpg",
    alt: "A small, calm meal laid out on a kitchen counter — the kind of smaller, gentler eating that helps with reflux in pregnancy.",
  },
  "anterior-placenta": {
    src: "/src/assets/journal-couple-ultrasound.jpg",
    alt: "A couple looking at an ultrasound image together, where placental position is first noted.",
  },
};

// Per-section imagery, keyed by `${slug}::${sectionId}`.
// If a section is not listed, the editorial module renders text-only — never
// a generic fallback.
export const flagshipSectionImageMap: Record<string, { src: string; alt: string }> = {
  // ── Tests and scans in pregnancy ──
  "tests-and-scans-in-pregnancy::what-tests-and-scans-are-for": {
    src: "/src/assets/guidance-card-timelines.jpg",
    alt: "An antenatal notes folder open on a clinic table — the scaffolding of pregnancy care.",
  },
  "tests-and-scans-in-pregnancy::first-trimester": {
    src: "/src/assets/guidance-card-practical.jpg",
    alt: "A midwife taking blood pressure at a booking appointment.",
  },
  "tests-and-scans-in-pregnancy::twelve-week-scan": {
    src: "/src/assets/journal-couple-ultrasound.jpg",
    alt: "A 12-week ultrasound image being shown to expectant parents.",
  },
  "tests-and-scans-in-pregnancy::twenty-week-scan": {
    src: "/src/assets/journal-ultrasound.jpg",
    alt: "A 20-week anomaly scan image, the baby in profile.",
  },
  "tests-and-scans-in-pregnancy::blood-tests-and-routine-checks": {
    src: "/src/assets/guidance-card-symptoms.jpg",
    alt: "A blood pressure cuff and urine sample pot at a routine antenatal check.",
  },
  "tests-and-scans-in-pregnancy::glucose-testing": {
    src: "/src/assets/guidance-card-nourish.jpg",
    alt: "A glass of the glucose drink used in the oral glucose tolerance test.",
  },
  "tests-and-scans-in-pregnancy::personalised-additions": {
    src: "/src/assets/guidance-card-milestones.jpg",
    alt: "A consultant-led appointment with extra growth scan imagery on screen.",
  },
  "tests-and-scans-in-pregnancy::asking-questions": {
    src: "/src/assets/guidance-card-quiet.jpg",
    alt: "A person writing questions in a notebook before a midwife appointment.",
  },

  // ── Heartburn in pregnancy ──
  "heartburn-in-pregnancy::why": {
    src: "/src/assets/guidance-card-body.jpg",
    alt: "A pregnant person resting a hand on the upper abdomen, where reflux tends to be felt.",
  },
  "heartburn-in-pregnancy::what-helps": {
    src: "/src/assets/guidance-card-comfort.jpg",
    alt: "A bed propped with extra pillows — one of the most reliable everyday helps for heartburn.",
  },
  "heartburn-in-pregnancy::when-to-raise-it": {
    src: "/src/assets/guidance-card-safety.jpg",
    alt: "A phone and notes by a bed at night — the moment a symptom tips from ordinary to worth raising.",
  },

  // ── Anterior placenta ──
  "anterior-placenta::what-it-is": {
    src: "/src/assets/journal-ultrasound.jpg",
    alt: "An anomaly scan image where placental position is identified.",
  },
  "anterior-placenta::movement": {
    src: "/src/assets/article-hero-second-movement.jpg",
    alt: "A pregnant person resting hands on their bump, paying attention to movement.",
  },
  "anterior-placenta::reduced-movements": {
    src: "/src/assets/guidance-card-safety.jpg",
    alt: "A maternity unit phone number on a fridge — the reminder to ring the same day if movements change.",
  },
};
