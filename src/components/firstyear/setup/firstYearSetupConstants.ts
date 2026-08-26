/**
 * Route and label constants for the First Year setup flow.
 * Kept out of the schema module so validation stays pure logic.
 */

/** Where a completed First Year setup lands the user. */
export const FIRST_YEAR_POST_SAVE_DESTINATION = "/my-first-year";

/** The protected route for this flow. */
export const FIRST_YEAR_SETUP_ROUTE = "/setup/first-year";

/** Entry point CTA label used by the given-birth panel in My Week. */
export const FIRST_YEAR_SETUP_CTA_LABEL = "Start your First Year journey";

/** Quiet link label used in My Journey. */
export const FIRST_YEAR_SETUP_QUIET_LINK_LABEL = "Set up your First Year";

/** Welcome, babies, stage, value, companion, review. */
export const TOTAL_STEPS = 6;

/**
 * Baby count choices. Four remains the backend limit, so "More than three"
 * reveals a small control rather than pretending larger counts are supported.
 */
export const BABY_COUNT_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: "One baby" },
  { value: 2, label: "Twins" },
  { value: 3, label: "Triplets" },
];

/** Sentinel used by the radio group only. Never saved. */
export const MORE_THAN_THREE = "more" as const;

export const MORE_THAN_THREE_LABEL = "More than three";

/** Shown once the "More than three" control is revealed. */
export const BABY_LIMIT_NOTE =
  "We can set up four babies at the moment. If you have more than four, choose four for now and tell us so we can help.";

export const BABY_ROW_LABELS = [
  "First baby",
  "Second baby",
  "Third baby",
  "Fourth baby",
];

/** Human label for any saved count, including four. */
export const babyCountLabel = (count: number): string =>
  BABY_COUNT_OPTIONS.find((option) => option.value === count)?.label ??
  (count === 4 ? "Four babies" : "One baby");

/** Warm, plain rows for the "what you get" step. */
export const FIRST_YEAR_VALUE_ITEMS: { title: string; detail: string }[] = [
  {
    title: "A daily note",
    detail: "A quiet place for your baby's rhythm and how you are doing.",
  },
  {
    title: "Memories",
    detail: "The small things you want to keep, written in your own words.",
  },
  {
    title: "Guidance that follows your baby's age",
    detail: "What you read shifts as the weeks and months go on.",
  },
  {
    title: "Feeding, sleep, nappies and questions",
    detail: "Plain answers when something is on your mind.",
  },
  {
    title: "A place for your recovery too",
    detail: "Your own body and mood matter here, not only the baby's.",
  },
];

/** Only offered to transition users. */
export const FIRST_YEAR_VALUE_ITEM_TRANSITION = {
  title: "Your pregnancy chapter, kept",
  detail: "Everything you saved stays readable whenever you want to open it.",
};

/** Shown to direct-start parents who have no companion name yet. */
export const COMPANION_INTRO_POINTS: string[] = [
  "Your companion is a calm presence inside your First Year space.",
  "It gives gentle, plain-language support about the early months and your recovery.",
  "Its tone is unhurried and never alarming.",
  "It does not track anything, and it does not read your private notes.",
  "It does not replace your midwife, GP or health visitor.",
];
