import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Single source of pageview tracking. Mounted once inside the router.
 *
 * Skips `/` because the homepage emits a deliberate `home_viewed` event
 * from `Index.tsx` — we do not want to double-count it here.
 *
 * No-op until the user accepts analytics consent (the analytics gate
 * enforces this; this component just wires the call site).
 */
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") return;
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteTracker;
