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

  // Wave 2 / Pass 2 — signed-in core product
  MY_WEEK_VIEWED: "my_week_viewed",
  MY_JOURNEY_VIEWED: "my_journey_viewed",
  KEPT_CHAPTER_VIEWED: "kept_chapter_viewed",
  REFLECTION_SAVED: "reflection_saved",
  PHOTO_SAVED: "photo_saved",
  PROTECTED_ROUTE_REDIRECT: "protected_route_redirect",
  POST_LOGIN_REDIRECT: "post_login_redirect",

  // Wave 3 — TTC journey (common envelope only; never carry cycle-sensitive props)
  TTC_JOURNEY_SAVE_STARTED: "ttc_journey_save_started",
  TTC_JOURNEY_SETUP_COMPLETED: "ttc_journey_setup_completed",
  TTC_JOURNEY_DASHBOARD_VIEWED: "ttc_journey_dashboard_viewed",
  TTC_LOG_CREATED: "ttc_log_created",
  TTC_LOG_DELETED: "ttc_log_deleted",
  TTC_INSIGHT_CLICKED: "ttc_insight_clicked",
  TTC_PREGNANCY_HANDOVER_STARTED: "ttc_pregnancy_handover_started",
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

  // Wave 2 / Pass 2 — signed-in core product. Common envelope only.
  // Page identity for `kept_chapter_viewed` is carried by the envelope's
  // `path` (e.g. "/my-week/14"); deliberately no `week` property here so
  // the common model stays intact.
  my_week_viewed: Record<string, never>;
  my_journey_viewed: Record<string, never>;
  kept_chapter_viewed: Record<string, never>;
  reflection_saved: Record<string, never>;
  photo_saved: Record<string, never>;
  protected_route_redirect: Record<string, never>;
  post_login_redirect: Record<string, never>;

  // Wave 3 — TTC journey
  ttc_journey_save_started: Record<string, never>;
  ttc_journey_setup_completed: Record<string, never>;
  ttc_journey_dashboard_viewed: Record<string, never>;
  ttc_log_created: Record<string, never>;
  ttc_log_deleted: Record<string, never>;
  ttc_insight_clicked: Record<string, never>;
  ttc_pregnancy_handover_started: Record<string, never>;
};


export type EventName = keyof EventMap;
