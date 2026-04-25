/**
 * Analytics event taxonomy.
 *
 * Single source of truth for event names + their property shapes.
 * Keep this file boring: no logic, no imports from product/AI layers.
 *
 * Forbidden in any event props (do not loosen these types to allow them):
 *  - journey content, reflections, free-text notes
 *  - due dates, names, emails, any PII
 *  - anything from product memory or AI context
 *
 * Common properties (anonymous_id, user_id, path, timestamp) are attached
 * automatically by the analytics gate — never pass them in by hand.
 */

export const EVENTS = {
  // Wave 1 — proof
  HOME_VIEWED: "home_viewed",
  START_JOURNEY_CLICKED: "start_journey_clicked",
  SIGN_IN_CLICKED: "sign_in_clicked",

  // Wave 2 / Pass 1 — start-flow funnel
  DUE_DATE_CALCULATOR_STARTED: "due_date_calculator_started",
  DUE_DATE_CALCULATOR_COMPLETED: "due_date_calculator_completed",
  DUE_DATE_RESULTS_VIEWED: "due_date_results_viewed",
  SAVE_JOURNEY_STARTED: "save_journey_started",
  AUTH_VIEWED: "auth_viewed",
  AUTH_COMPLETED: "auth_completed",
  SETUP_COMPLETED: "setup_completed",
} as const;

export type ClickLocation = "home_hero" | "navbar";

export type EventMap = {
  // Wave 1
  home_viewed: Record<string, never>;
  start_journey_clicked: { location: ClickLocation };
  sign_in_clicked: { location: ClickLocation };

  // Wave 2 / Pass 1 — no extra properties; common envelope only.
  due_date_calculator_started: Record<string, never>;
  due_date_calculator_completed: Record<string, never>;
  due_date_results_viewed: Record<string, never>;
  save_journey_started: Record<string, never>;
  auth_viewed: Record<string, never>;
  auth_completed: Record<string, never>;
  setup_completed: Record<string, never>;
};

export type EventName = keyof EventMap;
