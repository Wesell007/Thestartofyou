/**
 * AIC-J5 — the canonical, closed registry of PERSONAL JOURNEY NEXT ACTIONS.
 *
 * Scope is strictly the three saved personal lifecycles: trying to conceive,
 * pregnancy and first year.
 *
 *   - Actions are produced ONLY from an authoritative
 *     `JourneyContextV1.personal` object resolved through J2. A route, page,
 *     hub, topic, entry descriptor, question or answer can never produce one.
 *   - Nothing here parses the person's question, the model's answer, or any
 *     free text. There are no model-generated actions.
 *   - Nothing here classifies safety. Whether the layer may render at all is
 *     decided by the server and reaches the browser as an opaque permission.
 *   - Every destination is an existing internal route. Actions navigate and do
 *     nothing else: no mutation, no request, no storage, no analytics.
 *   - Pure data plus a pure function: same input, same output.
 */

import type { PersonalJourneyContextV1 } from "../../../supabase/functions/_shared/journeyContextContract";

/** Closed union of destinations. A new route requires a deliberate change. */
export type JourneyNextActionRoute =
  | "/my-ttc-journey"
  | "/my-week"
  | "/my-journey"
  | "/my-first-year"
  | "/my-first-year/today"
  | `/pregnancy/week/${number}`
  | `/first-year/${string}`;

export type JourneyNextActionId =
  | "ttc-open-journey"
  | "pregnancy-view-my-week"
  | "pregnancy-read-week"
  | "pregnancy-open-journey"
  | "first-year-open-today"
  | "first-year-read-month"
  | "first-year-open-journey";

export interface JourneyNextAction {
  id: JourneyNextActionId;
  label: string;
  to: JourneyNextActionRoute;
}

/** Never more than two, on any surface or viewport. */
export const MAX_NEXT_ACTIONS = 2;

/** Saved pregnancy weeks the guidance library actually covers. */
const MIN_WEEK = 1;
const MAX_WEEK = 42;

/**
 * Saved baby age in whole months. The saved PERSONAL first-year journey is
 * 0–11 months only. Twelve-month guidance exists as public CONTENT
 * (`/first-year/12-months`), but it is never produced from personal state: a
 * saved age of 12 or anything invalid falls through to the journey home.
 */
const MIN_MONTH = 0;
const MAX_MONTH = 11;

const isWholeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value);

/**
 * The existing public month routes, keyed by saved age in whole months.
 * Deliberately stops at 11: the twelve-month page is content, not a
 * destination the saved personal journey can produce.
 */
const FIRST_YEAR_MONTH_ROUTES: Record<number, JourneyNextActionRoute> = {
  0: "/first-year/newborn",
  1: "/first-year/1-month",
  2: "/first-year/2-months",
  3: "/first-year/3-months",
  4: "/first-year/4-months",
  5: "/first-year/5-months",
  6: "/first-year/6-months",
  7: "/first-year/7-months",
  8: "/first-year/8-months",
  9: "/first-year/9-months",
  10: "/first-year/10-months",
  11: "/first-year/11-months",
};

const monthLabel = (months: number) =>
  months === 0 ? "Read newborn guidance" : `Read month ${months} guidance`;

const registryFor = (personal: PersonalJourneyContextV1): JourneyNextAction[] => {
  if (personal.journey === "trying-to-conceive") {
    // Every saved TTC stage, treatment included, leads to the same one place.
    return [{ id: "ttc-open-journey", label: "Open My TTC Journey", to: "/my-ttc-journey" }];
  }

  if (personal.journey === "pregnancy") {
    const week = personal.week;
    if (isWholeNumber(week) && week >= MIN_WEEK && week <= MAX_WEEK) {
      return [
        { id: "pregnancy-view-my-week", label: "View My Week", to: "/my-week" },
        {
          id: "pregnancy-read-week",
          label: `Read week ${week} guidance`,
          to: `/pregnancy/week/${week}`,
        },
      ];
    }
    // A saved pregnancy without a trustworthy week gets the journey home only.
    return [{ id: "pregnancy-open-journey", label: "Open My Journey", to: "/my-journey" }];
  }

  const months = personal.ageMonths;
  if (isWholeNumber(months) && months >= MIN_MONTH && months <= MAX_MONTH) {
    const monthRoute = FIRST_YEAR_MONTH_ROUTES[months];
    if (monthRoute) {
      return [
        { id: "first-year-open-today", label: "Open Today", to: "/my-first-year/today" },
        { id: "first-year-read-month", label: monthLabel(months), to: monthRoute },
      ];
    }
  }
  // Ambiguous or unknown age: the journey home only, never a guessed month.
  return [{ id: "first-year-open-journey", label: "Open My First Year", to: "/my-first-year" }];
};

export interface ResolveJourneyNextActionsInput {
  /** Authoritative saved journey state, or null when there is none. */
  personal: PersonalJourneyContextV1 | null | undefined;
  /** Actions point at protected routes, so a signed-out person gets none. */
  signedIn: boolean;
}

/**
 * Pure resolver. Returns at most `MAX_NEXT_ACTIONS` actions in stable registry
 * order, deduplicated by exact destination. Signed out, or no saved personal
 * journey, always returns an empty list.
 */
export const resolveJourneyNextActions = ({
  personal,
  signedIn,
}: ResolveJourneyNextActionsInput): JourneyNextAction[] => {
  if (!signedIn || !personal) return [];

  const seen = new Set<string>();
  const actions: JourneyNextAction[] = [];
  for (const action of registryFor(personal)) {
    if (seen.has(action.to)) continue;
    seen.add(action.to);
    actions.push(action);
    if (actions.length === MAX_NEXT_ACTIONS) break;
  }
  return actions;
};
