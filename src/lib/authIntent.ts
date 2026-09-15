import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney, readPendingJourney } from "@/lib/savedJourney";
import { getActiveTTCJourney } from "@/lib/savedTTCJourney";

/**
 * Auth intent model.
 *
 * The signed-out re-entry flow has three meaningfully different starting points
 * and we must not collapse them into one generic redirect:
 *
 *  - "start_journey"   — new user activation. They came in via Start your journey
 *                        and may already have a pending (unsaved) journey in
 *                        local storage. After auth they should continue setup.
 *  - "sign_in"         — returning user choosing Sign in. After auth they should
 *                        land in their saved product (typically /my-week).
 *  - "return_to_route" — signed-out user tried to open a protected route. After
 *                        auth we must return them to that exact route.
 *
 * Intent + a sanitised return_to are encoded as URL search params on /auth so
 * the flow survives full page reloads, magic-link round trips and OAuth.
 */
export type AuthIntent = "start_journey" | "sign_in" | "return_to_route";

/** Routes that require an authenticated user to view. */
export const PROTECTED_ROUTE_PREFIXES = [
  "/my-week",
  "/my-journey",
  "/my-first-year",
  "/my-pregnancy-chapter",
  "/my-ttc-journey",
  "/setup/trying-to-conceive",
  "/setup/first-year",
];

export const isProtectedPath = (pathname: string): boolean =>
  PROTECTED_ROUTE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

/**
 * Public setup routes that are still valid places to return to after signing
 * in. They carry no setup answers in the URL: the flow restores its own state
 * from the existing pending mechanism.
 */
export const SETUP_RETURN_PREFIXES = ["/setup/pregnancy"];

/**
 * Public tool routes that are safe to return to after signing in. They carry
 * no answers in the URL, and no tool values are preserved across sign-in.
 */
export const PUBLIC_TOOL_RETURN_PATHS = ["/ivf-timeline"];

const isSetupReturnPath = (pathname: string): boolean =>
  SETUP_RETURN_PREFIXES.some((p) => pathname === p) ||
  PUBLIC_TOOL_RETURN_PATHS.some((p) => pathname === p);

/**
 * Only allow internal, protected paths as return targets. This blocks
 * open-redirect abuse via ?return_to=https://evil.example and prevents
 * bouncing the user back to public marketing pages after they've signed in.
 */
const isSafeReturnTo = (value: string | null): value is string => {
  if (!value) return false;
  if (!value.startsWith("/")) return false;
  if (value.startsWith("//")) return false;
  return isProtectedPath(value) || isSetupReturnPath(value);
};

/** Build the auth URL for a given intent, preserving a safe return target. */
export const buildAuthUrl = (
  intent: AuthIntent,
  returnTo?: string | null
): string => {
  const params = new URLSearchParams();
  params.set("intent", intent);
  if (isSafeReturnTo(returnTo ?? null)) {
    params.set("return_to", returnTo!);
  }
  return `/auth?${params.toString()}`;
};

export const shouldCreateUserForIntent = (intent: AuthIntent): boolean =>
  intent === "start_journey";

/**
 * Resolve the post-login destination using the documented priority order:
 *   1. Valid return_to protected route
 *   2. Pending journey from start flow → /setup to finish activation
 *   3. Active First Year lifecycle → /my-first-year
 *   4. Active saved pregnancy journey → /my-week
 *   5. No saved journey → /due-date-calculator (sensible start state)
 */
export const resolvePostLoginDestination = async (
  userId: string,
  intent: AuthIntent | null,
  returnTo: string | null
): Promise<string> => {
  if (isSafeReturnTo(returnTo)) {
    return returnTo;
  }

  const pending = readPendingJourney();
  if (pending) return "/setup";

  // Lifecycle pointer first: once a user has moved into their First Year the
  // pregnancy journey no longer exists, which would otherwise look the same as
  // never having started one.
  const { data: pointer } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();
  if (pointer?.lifecycle === "first_year") return "/my-first-year";

  const journey = await getActivePregnancyJourney(userId, { throwOnError: true });
  if (journey) {
    // If they have a journey but no profile name yet, finish setup first.
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name")
      .eq("user_id", userId)
      .maybeSingle();
    if (!profile?.first_name) return "/setup";
    return "/my-week";
  }

  const ttcJourney = await getActiveTTCJourney(userId, { throwOnError: true });
  if (ttcJourney) return "/my-ttc-journey";

  // No saved journey at all — send them into the start flow.
  return "/due-date-calculator";
};

export const parseIntent = (value: string | null): AuthIntent | null => {
  if (value === "start_journey" || value === "sign_in" || value === "return_to_route") {
    return value;
  }
  return null;
};

export const parseSafeReturnTo = (value: string | null): string | null =>
  isSafeReturnTo(value) ? value : null;
