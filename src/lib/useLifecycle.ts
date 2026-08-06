import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { inferLifecycleFromPath, type NavLifecycle } from "@/lib/navLifecycle";

export type LifecycleState = {
  authed: boolean;
  lifecycle: NavLifecycle | null;
  hasKeptChapter: boolean;
  loading: boolean;
};

const isNavLifecycle = (value: unknown): value is NavLifecycle =>
  value === "pregnancy" || value === "ttc" || value === "first_year";

/**
 * Lightweight lifecycle read for navigation only.
 *
 * The lifecycle implied by the current route wins while the fetch is in
 * flight, so First Year surfaces never flash pregnancy labels. Only three
 * things are read: auth state, the lifecycle pointer, and (for First Year)
 * a boolean check for a kept pregnancy chapter. No reflections, photos,
 * media memories or signed URLs are ever loaded here.
 */
export const useLifecycle = (): LifecycleState => {
  const { pathname } = useLocation();
  const [authed, setAuthed] = useState(false);
  const [fetched, setFetched] = useState<NavLifecycle | null>(null);
  const [hasKeptChapter, setHasKeptChapter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkKeptChapter = async (userId: string): Promise<boolean> => {
      const { data: journey } = await supabase
        .from("first_year_journeys")
        .select("archived_pregnancy_journey_id")
        .eq("user_id", userId)
        .maybeSingle();
      if (journey?.archived_pregnancy_journey_id) return true;

      const { data: archived } = await supabase
        .from("archived_journeys")
        .select("id")
        .eq("user_id", userId)
        .eq("lifecycle", "pregnancy")
        .order("ended_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return Boolean(archived?.id);
    };

    const update = async (userId: string | null) => {
      if (!userId) {
        if (cancelled) return;
        setAuthed(false);
        setFetched(null);
        setHasKeptChapter(false);
        setLoading(false);
        return;
      }
      if (!cancelled) setAuthed(true);

      const { data, error } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;

      const lifecycle = !error && isNavLifecycle(data?.lifecycle) ? data.lifecycle : null;
      setFetched(lifecycle);
      setLoading(false);

      if (lifecycle !== "first_year") {
        setHasKeptChapter(false);
        return;
      }
      const kept = await checkKeptChapter(userId);
      if (!cancelled) setHasKeptChapter(kept);
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

  const routeLifecycle = inferLifecycleFromPath(pathname);

  return {
    authed,
    lifecycle: routeLifecycle ?? fetched,
    hasKeptChapter,
    loading,
  };
};
