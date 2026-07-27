import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  isBabyIllustrationStyle,
  type BabyIllustrationStyle,
} from "@/lib/myWeekBabyIllustrations";

export interface BabyIllustrationStyleState {
  style: BabyIllustrationStyle;
  isLoading: boolean;
}

/**
 * Reads the current user's baby_illustration_style from profiles.
 * Display-only: never sent to AI, never tracked in analytics.
 * Falls back to "default" while loading, on error, when signed out,
 * or when the stored value is NULL/unknown. Never throws, never toasts,
 * never blocks the page.
 */
export function useBabyIllustrationStyle(): BabyIllustrationStyleState {
  const [state, setState] = useState<BabyIllustrationStyleState>({
    style: "default",
    isLoading: true,
  });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        if (!user) {
          if (active) setState({ style: "default", isLoading: false });
          return;
        }
        const { data } = await supabase
          .from("profiles")
          .select("baby_illustration_style")
          .eq("user_id", user.id)
          .maybeSingle();
        if (!active) return;
        const raw = (data as { baby_illustration_style?: unknown } | null)
          ?.baby_illustration_style ?? null;
        setState({
          style: isBabyIllustrationStyle(raw) ? raw : "default",
          isLoading: false,
        });
      } catch {
        if (active) setState({ style: "default", isLoading: false });
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
