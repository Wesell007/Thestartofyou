import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { resolvePublicAccountLink, type NavLifecycle } from "@/lib/navLifecycle";

/**
 * Shared public-surface account state.
 *
 * Extracted unchanged from the navbar so the public pages that need to know
 * whether someone is already signed in (and which saved journey they hold) all
 * use one resolution path. It reads the lifecycle pointer only — never journey
 * content, journal entries, baby records or notes — and writes nothing.
 */
export const usePublicAccountLink = () => {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [lifecycle, setLifecycle] = useState<NavLifecycle | null>(null);

  useEffect(() => {
    let cancelled = false;

    const update = async (userId: string | null) => {
      if (!userId) {
        if (!cancelled) {
          setAuthed(false);
          setLifecycle(null);
        }
        return;
      }
      if (!cancelled) setAuthed(true);
      const { data, error } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled || error) return;
      const resolved =
        data?.lifecycle === "ttc" ||
        data?.lifecycle === "pregnancy" ||
        data?.lifecycle === "first_year"
          ? data.lifecycle
          : null;
      setLifecycle(resolved);
    };

    supabase.auth.getSession().then(({ data }) => {
      void update(data.session?.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      void update(session?.user?.id ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { authed, lifecycle, accountLink: resolvePublicAccountLink(lifecycle) };
};

export default usePublicAccountLink;
