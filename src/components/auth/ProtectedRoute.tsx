import { ReactNode, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { buildAuthUrl } from "@/lib/authIntent";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import PageLoadState from "@/components/shared/PageLoadState";

type Status = "checking" | "authed" | "anon" | "error";

/**
 * Gate for saved-journey routes. If the user is signed out we send them to
 * /auth with intent=return_to_route and the original path encoded in
 * return_to, so post-login redirect can land them back exactly where they
 * tried to go (instead of dumping them on the homepage or start flow).
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [status, setStatus] = useState<Status>("checking");
  const [attempt, setAttempt] = useState(0);
  const redirectFiredRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("checking");
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setStatus("error");
          return;
        }
        setStatus(data.session?.user ? "authed" : "anon");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (cancelled) return;
      setStatus(session?.user ? "authed" : "anon");
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [attempt]);

  useEffect(() => {
    if (status !== "anon" || redirectFiredRef.current) return;
    redirectFiredRef.current = true;
    trackEvent(EVENTS.PROTECTED_ROUTE_REDIRECT);
  }, [status]);

  if (status === "checking") {
    return <PageLoadState message="Checking your account…" />;
  }

  if (status === "error") {
    return <PageLoadState error="We couldn't check your account just now." onRetry={() => setAttempt((n) => n + 1)} />;
  }

  if (status === "anon") {
    // Protected journey routes do not require query state. Keeping search
    // parameters here would copy potentially sensitive values into auth URLs.
    const returnTo = location.pathname;
    return <Navigate to={buildAuthUrl("return_to_route", returnTo)} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
