import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import { isPrototypeRoute } from "@/lib/prototypeRoutes";


/**
 * Single source of pageview tracking. Mounted once inside the router.
 *
 * Skips paths that have a dedicated semantic event so we never double-count.
 * After this skip step, those surfaces are measured *only* by their
 * semantic event:
 *
 *   - `/`              → `home_viewed`           (Index.tsx)
 *   - `/auth`          → `auth_viewed`           (Auth.tsx, only when the
 *                        form is actually shown to a signed-out user)
 *   - `/my-week`       → `my_week_viewed`        (MyWeek.tsx, after load)
 *   - `/my-journey`    → `my_journey_viewed`     (MyJourney.tsx, after load)
 *   - `/my-week/:week` → `kept_chapter_viewed`   (KeptChapter.tsx, per week)
 *
 * Everything else (articles, hubs, calculators, setup, etc.) still emits a
 * generic `page_viewed`.
 *
 * No-op until the user accepts analytics consent (the analytics gate
 * enforces this; this component just wires the call site).
 */
const PAGEVIEW_SKIP_EXACT = new Set<string>([
  "/",
  "/auth",
  "/my-week",
  "/my-journey",
]);

// `/my-week/:week` — kept chapters are measured by `kept_chapter_viewed`.
// Trailing slash tolerated; deeper sub-paths are not skipped.
const KEPT_CHAPTER_RE = /^\/my-week\/[^/]+\/?$/;

const shouldSkip = (pathname: string) =>
  PAGEVIEW_SKIP_EXACT.has(pathname) || KEPT_CHAPTER_RE.test(pathname);

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (shouldSkip(location.pathname)) return;
    // Never send query strings: calculator dates, auth return targets and AI
    // questions can contain private journey context.
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default RouteTracker;
