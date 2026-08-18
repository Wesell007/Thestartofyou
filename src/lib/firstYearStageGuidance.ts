import { getFirstYearAge } from "@/lib/firstYearDates";
import { monthPagePath } from "@/lib/firstYearCopy";
import { getMonthGuide, type MonthSlug } from "@/data/firstYearMonthData";
import { BEYOND_FIRST_YEAR_NOTE } from "@/lib/firstYearStage";

/**
 * Pure age-aware guidance for the signed-in First Year home.
 * Nothing here is stored: everything is derived at read time from a date of
 * birth. No Supabase, no implicit `Date.now()`, no scoring of any kind.
 */

export type StageGuidanceCard = {
  title: string;
  detail: string;
  href: string;
};

/** A short, age-aware read of where things are. Never medical advice. */
export type StageInsight = {
  title: string;
  body: string;
};

export type StageGuidance = {
  kicker: string;
  heading: string;
  /** One short orientation sentence. */
  intro: string;
  cards: StageGuidanceCard[];
  /** Insight tiles, shown before any onward link. */
  insights: StageInsight[];
  /** The one quiet onward read for this stage. */
  readMore: { label: string; href: string; monthSlug: MonthSlug };
  /** Quiet line for the parent, with a single onward link. */
  parentLine: string;
  parentLabel: string;
  parentHref: string;
};


/** Words that must never reach the signed-in home page. */
const BANNED = [
  "milestone",
  "milestones",
  "normal",
  "safe",
  "unsafe",
  "tracker",
  "score",
  "progress",
  "diagnosis",
  "symptom checker",
  "risk",
];

/** True when a candidate string is clean enough to surface here. */
export const isSurfaceableCopy = (value: string | undefined | null): boolean => {
  if (!value) return false;
  const lower = value.toLowerCase();
  return !BANNED.some((word) => new RegExp(`\\b${word}\\b`).test(lower));
};

const clean = (value: string | undefined, fallback: string): string =>
  isSurfaceableCopy(value) ? (value as string) : fallback;

const MONTH_WORDS = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
];

const monthHeading = (monthIndex: number): string =>
  `Around ${MONTH_WORDS[monthIndex]} month${monthIndex === 1 ? "" : "s"}`;

const NEWBORN_INTRO =
  "Feeding, sleeping and healing can take up a lot of the day just now, and that belongs here.";

const INTRO_FALLBACK = "A short look at what often happens for babies around this age.";
const FEEDING_FALLBACK =
  "However you are feeding, here is what often happens around this age.";
const SLEEP_FALLBACK = "Rest rhythms at this age, and why they move about.";

const YOU_FALLBACK =
  "Your own days matter here too, however this stage is going for you.";

const monthSlugFor = (monthIndex: number): MonthSlug =>
  (monthIndex === 0
    ? "newborn"
    : monthIndex === 1
      ? "1-month"
      : `${monthIndex}-months`) as MonthSlug;

const monthLabelFor = (monthIndex: number): string =>
  monthIndex === 0 ? "Read the newborn guide" : `Read the ${MONTH_WORDS[monthIndex]} month guide`;


/**
 * Build the "For this stage" content for a date of birth.
 *
 * @param dateOfBirth `yyyy-MM-dd` calendar date of the first baby.
 * @param babyCount How many babies are on the journey.
 * @param reference Reference date, defaulting to today.
 * @returns Guidance content, or null when the date of birth is unusable.
 */
export const getStageGuidance = (
  dateOfBirth: string | null | undefined,
  babyCount = 1,
  reference: Date = new Date(),
): StageGuidance | null => {
  const age = getFirstYearAge(dateOfBirth, reference);
  if (!age) return null;

  const plural = babyCount > 1;

  const parent = age.isEarlyPostpartum
    ? {
        parentLine: plural
          ? "Your recovery matters here too, alongside your babies."
          : "Your recovery matters here too, alongside your baby.",
        parentLabel: "Recovery after birth",
        parentHref: "/first-year/postpartum-recovery",
      }
    : {
        parentLine: "How you are doing matters here too.",
        parentLabel: "Emotional wellbeing",
        parentHref: "/first-year/emotional-wellbeing",
      };

  if (age.ageInMonths >= 12) {
    return {
      kicker: "For this stage",
      heading: "Past the first year",
      intro: BEYOND_FIRST_YEAR_NOTE,
      cards: [
        {
          title: "The 12 months guide",
          detail: "A look back at where the first year tends to land.",
          href: "/first-year/12-months",
        },
        {
          title: "Check-ups and questions",
          detail: "Routine checks, and what is worth asking about.",
          href: "/first-year/checkups-and-warning-signs",
        },
      ],
      ...parent,
    };
  }

  const isNewborn = age.ageInDays <= 27;
  // Past the newborn window the guide never falls back to month zero: a baby
  // of 28 days reads the one month guide.
  const monthIndex = isNewborn ? 0 : Math.max(1, age.firstYearMonthIndex);
  const short = getMonthGuide(monthSlugFor(monthIndex))?.shortVersion;

  return {
    kicker: "For this stage",
    heading: isNewborn ? "Your first weeks" : monthHeading(monthIndex),
    intro: isNewborn ? NEWBORN_INTRO : clean(short?.baby, INTRO_FALLBACK),
    cards: [
      {
        title: "This month's guide",
        detail: "A calm read on what tends to be going on around now.",
        href: monthPagePath(monthIndex),
      },
      {
        title: "Feeding right now",
        detail: clean(short?.feeding, FEEDING_FALLBACK),
        href: "/first-year/feeding",
      },
      {
        title: "Sleep right now",
        detail: clean(short?.sleep, SLEEP_FALLBACK),
        href: "/first-year/sleep",
      },
    ],
    ...parent,
  };
};
