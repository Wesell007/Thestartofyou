import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolvePublicAccountLink } from "@/lib/navLifecycle";

/**
 * Signed-in state for the homepage masthead, resolved the same way as the site Navbar: a signed-in person
 * is offered their own journey instead of "Sign in".
 */
export function useHomeAccount() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [accountLink, setAccountLink] = useState(resolvePublicAccountLink(null));

  useEffect(() => {
    let cancelled = false;
    const update = async (userId: string | null) => {
      if (!userId) {
        if (!cancelled) setAuthed(false);
        return;
      }
      if (!cancelled) setAuthed(true);
      const { data, error } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled || error) return;
      const lifecycle =
        data?.lifecycle === "ttc" || data?.lifecycle === "pregnancy" || data?.lifecycle === "first_year"
          ? data.lifecycle
          : null;
      setAccountLink(resolvePublicAccountLink(lifecycle));
    };

    supabase.auth.getSession().then(({ data }) => {
      void update(data.session?.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void update(session?.user?.id ?? null);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { authed, accountLink };
}
