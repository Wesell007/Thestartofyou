/**
 * Analytics event taxonomy — Wave 1.
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
  HOME_VIEWED: "home_viewed",
  START_JOURNEY_CLICKED: "start_journey_clicked",
  SIGN_IN_CLICKED: "sign_in_clicked",
} as const;

export type ClickLocation = "home_hero" | "navbar";

export type EventMap = {
  home_viewed: Record<string, never>;
  start_journey_clicked: { location: ClickLocation };
  sign_in_clicked: { location: ClickLocation };
};

export type EventName = keyof EventMap;
