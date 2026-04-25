import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Single source of pageview tracking. Mounted once inside the router.
 *
 * Skips paths that have a dedicated semantic event so we never double-count:
 *   - `/`     → measured by `home_viewed` (Index.tsx)
 *   - `/auth` → measured by `auth_viewed` (Auth.tsx, only when the form
 *               is actually shown to a signed-out user)
 *
 * No-op until the user accepts analytics consent (the analytics gate
 * enforces this; this component just wires the call site).
 */
const PAGEVIEW_SKIP_PATHS = new Set<string>(["/", "/auth"]);

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (PAGEVIEW_SKIP_PATHS.has(location.pathname)) return;
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteTracker;
