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

export const TOTAL_STEPS = 4;

export type CompanionChoice = "continue_gently" | "personalise" | "decide_later";

/**
 * Companion choices are session-only in this phase. Nothing is stored,
 * no profile column, no consent table, and no AI context is changed.
 */
export const COMPANION_OPTIONS: {
  value: CompanionChoice;
  label: string;
  detail: string;
}[] = [
  {
    value: "continue_gently",
    label: "Continue gently",
    detail:
      "Cindy carries on as she is. She will answer questions about your first year without looking at anything you have written.",
  },
  {
    value: "personalise",
    label: "Personalise Cindy with my pregnancy journey",
    detail:
      "Nothing is shared yet. Cindy will not use your private pregnancy memories or reflections. A later step will let you choose exactly what she can use, and you will be able to change your mind at any time.",
  },
  {
    value: "decide_later",
    label: "Decide later",
    detail: "You can make this choice another day. Nothing changes for now.",
  },
];

/** Baby count options. Five or more is deliberately not reachable. */
export const BABY_COUNT_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: "One baby" },
  { value: 2, label: "Twins" },
  { value: 3, label: "Triplets" },
  { value: 4, label: "Four babies" },
];

export const BABY_ROW_LABELS = [
  "First baby",
  "Second baby",
  "Third baby",
  "Fourth baby",
];
