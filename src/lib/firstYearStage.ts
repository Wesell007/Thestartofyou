import { getFirstYearAge } from "@/lib/firstYearDates";

/**
 * Pure stage derivation from a date of birth. Nothing here is stored: the
 * stage is always recalculated from `babies.date_of_birth` at read time.
 */

export type FirstYearStage = "newborn" | "baby" | "older_baby" | "toddler";

export type FirstYearStageInfo = {
  stage: FirstYearStage;
  /** Short label used in headings and the review summary. */
  label: string;
  /** One calm sentence about what this stage means here. */
  description: string;
  /** True once the child is twelve completed months or older. */
  beyondFirstYear: boolean;
};

/** Shown when the child is already past the first twelve months. */
export const BEYOND_FIRST_YEAR_NOTE =
  "First Year is built around the first twelve months, so some guidance may be less relevant now. You are welcome to carry on.";

/**
 * The same message during setup, where it helps to name the next step too.
 * Setup only: the signed-in home guidance section keeps the shorter note.
 */
export const BEYOND_FIRST_YEAR_SETUP_NOTE =
  "First Year is built around the first twelve months, so some guidance may be less relevant now. You are welcome to carry on. If your child is older, toddler guidance may be a better fit.";

const STAGE_COPY: Record<FirstYearStage, { label: string; description: string }> = {
  newborn: {
    label: "Newborn",
    description:
      "The first few weeks. Guidance stays close to feeding, sleep, nappies and your own recovery.",
  },
  baby: {
    label: "Baby",
    description:
      "The months that follow. Guidance moves with your baby's age as the weeks go on.",
  },
  older_baby: {
    label: "Older baby",
    description: "Past the first year. You can still keep daily notes and memories here.",
  },
  toddler: {
    label: "Toddler",
    description:
      "Well past the first year. Daily notes and memories still work exactly the same way.",
  },
};

/**
 * Derive the stage for a date of birth.
 *
 * @param dateOfBirth `yyyy-MM-dd` calendar date.
 * @param reference Reference date, defaulting to today.
 * @returns Stage information, or null when the date of birth is unusable.
 */
export const resolveFirstYearStage = (
  dateOfBirth: string | null | undefined,
  reference: Date = new Date(),
): FirstYearStageInfo | null => {
  const age = getFirstYearAge(dateOfBirth, reference);
  if (!age) return null;

  let stage: FirstYearStage;
  if (age.ageInDays <= 27) stage = "newborn";
  else if (age.ageInMonths < 12) stage = "baby";
  else if (age.ageInMonths < 24) stage = "older_baby";
  else stage = "toddler";

  return {
    stage,
    label: STAGE_COPY[stage].label,
    description: STAGE_COPY[stage].description,
    beyondFirstYear: age.ageInMonths >= 12,
  };
};
