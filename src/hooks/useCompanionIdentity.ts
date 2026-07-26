import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isCompanionTone, type CompanionTone } from "@/lib/companion";

export interface CompanionIdentity {
  name: string | null;
  tone: CompanionTone | null;
  loading: boolean;
}

/**
 * Reads the current user's companion_name and companion_tone from profiles.
 * Display-only: never used for AI request bodies or analytics.
 */
export function useCompanionIdentity(): CompanionIdentity {
  const [state, setState] = useState<CompanionIdentity>({
    name: null,
    tone: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        if (!user) {
          if (active) setState({ name: null, tone: null, loading: false });
          return;
        }
        const { data } = await supabase
          .from("profiles")
          .select("companion_name, companion_tone")
          .eq("user_id", user.id)
          .maybeSingle();
        if (!active) return;
        const rawName = data?.companion_name?.trim() ?? "";
        const rawTone = data?.companion_tone ?? null;
        setState({
          name: rawName.length > 0 ? rawName : null,
          tone: isCompanionTone(rawTone) ? rawTone : null,
          loading: false,
        });
      } catch {
        if (active) setState({ name: null, tone: null, loading: false });
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
