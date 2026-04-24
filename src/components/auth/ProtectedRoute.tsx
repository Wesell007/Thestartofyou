import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { buildAuthUrl } from "@/lib/authIntent";

type Status = "checking" | "authed" | "anon";

/**
 * Gate for saved-journey routes. If the user is signed out we send them to
 * /auth with intent=return_to_route and the original path encoded in
 * return_to, so post-login redirect can land them back exactly where they
 * tried to go (instead of dumping them on the homepage or start flow).
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setStatus(data.session?.user ? "authed" : "anon");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (cancelled) return;
      setStatus(session?.user ? "authed" : "anon");
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-parchment" />;
  }

  if (status === "anon") {
    const returnTo = `${location.pathname}${location.search}`;
    return <Navigate to={buildAuthUrl("return_to_route", returnTo)} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
