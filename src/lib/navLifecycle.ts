/**
 * Pure navigation resolution for signed-in surfaces.
 *
 * Navigation labels and destinations depend only on the user's active
 * lifecycle (and, for First Year, whether a kept pregnancy chapter exists).
 * Keeping the resolution pure makes it testable and keeps components free of
 * branching copy.
 */

export type NavLifecycle = "pregnancy" | "ttc" | "first_year";

export type NavTabId =
  | "my_week"
  | "my_journey"
  | "toolkit"
  | "my_ttc_journey"
  | "my_first_year"
  | "first_year_today"
  | "first_year_memories"
  | "pregnancy_chapter"
  | "ask"
  | "account";

export type NavLink = {
  id: NavTabId;
  label: string;
  href: string;
};

export const FIRST_YEAR_NAV_ROUTES = ["/my-first-year", "/my-pregnancy-chapter"];
export const PREGNANCY_NAV_ROUTES = ["/my-week", "/my-journey", "/pregnancy-toolkit"];
export const TTC_NAV_ROUTES = ["/my-ttc-journey"];

export const matchesRoute = (pathname: string, prefixes: string[]): boolean =>
  prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

/**
 * Lifecycle implied by the route itself. Used while the lifecycle fetch is in
 * flight so First Year surfaces never flash pregnancy labels.
 */
export const inferLifecycleFromPath = (pathname: string): NavLifecycle | null => {
  if (matchesRoute(pathname, FIRST_YEAR_NAV_ROUTES)) return "first_year";
  if (matchesRoute(pathname, TTC_NAV_ROUTES)) return "ttc";
  if (matchesRoute(pathname, PREGNANCY_NAV_ROUTES)) return "pregnancy";
  return null;
};

/** Where the signed-in logo should take someone home to. */
export const resolveHomeHref = (lifecycle: NavLifecycle | null): string => {
  if (lifecycle === "first_year") return "/my-first-year";
  if (lifecycle === "ttc") return "/my-ttc-journey";
  return "/my-week";
};

/**
 * Primary links shown in the signed-in desktop header. First Year users are
 * never pointed back at pregnancy routes. The pregnancy chapter link only
 * appears once a kept chapter is confirmed, so no placeholder or dead link
 * is ever rendered.
 */
export const resolveHeaderLinks = (
  lifecycle: NavLifecycle | null,
  hasKeptChapter = false,
): NavLink[] => {
  if (lifecycle === "first_year") {
    const links: NavLink[] = [
      { id: "my_first_year", label: "First Year", href: "/my-first-year" },
      { id: "first_year_today", label: "Today", href: "/my-first-year/today" },
      { id: "first_year_memories", label: "Memories", href: "/my-first-year/memories" },
    ];
    if (hasKeptChapter) {
      links.push({
        id: "pregnancy_chapter",
        label: "Pregnancy chapter",
        href: "/my-pregnancy-chapter",
      });
    }
    return links;
  }
  if (lifecycle === "ttc") {
    return [{ id: "my_ttc_journey", label: "My journey", href: "/my-ttc-journey" }];
  }
  if (lifecycle === "pregnancy") {
    return [
      { id: "my_week", label: "This week", href: "/my-week" },
      { id: "my_journey", label: "My journey", href: "/my-journey" },
      { id: "toolkit", label: "Toolkit", href: "/pregnancy-toolkit" },
    ];
  }
  // Unresolved lifecycle (for example the shared account screen): keep the
  // safe minimum so no pregnancy-only destination leaks into other contexts.
  return [
    { id: "my_week", label: "This week", href: "/my-week" },
    { id: "my_journey", label: "My journey", href: "/my-journey" },
  ];
};

/** The authed call to action shown in the public navbar. */
export const resolvePublicAccountLink = (
  lifecycle: NavLifecycle | null,
): { href: string; label: string } => {
  if (lifecycle === "first_year") return { href: "/my-first-year", label: "My First Year" };
  if (lifecycle === "ttc") return { href: "/my-ttc-journey", label: "My TTC Journey" };
  if (lifecycle === "pregnancy") return { href: "/my-week", label: "My Week" };
  return { href: "/due-date-calculator", label: "Set up journey" };
};
