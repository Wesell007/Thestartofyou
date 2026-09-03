/**
 * AIC-2 — deterministic readiness for personal journey context.
 *
 * Resolution starts once on mount and is shared through a module-level
 * in-flight promise, so the panel and `/ask` never resolve it twice. At submit
 * time callers `await ensurePersonalJourney()`, which resolves immediately
 * when the value is already loaded and otherwise waits for the single
 * in-flight read, bounded by a short timeout.
 *
 * There is no new loading UI: if resolution has not finished within the
 * timeout, or fails, the request proceeds with no personal context.
 */

import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolvePersonalJourneyContext } from "@/lib/companion/journeyPersonalSource";
import type { PersonalJourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

/** Maximum wait before a request proceeds without personal context. */
export const PERSONAL_JOURNEY_TIMEOUT_MS = 1_500;

let inflight: Promise<PersonalJourneyContextV1 | null> | null = null;
let resolved: { value: PersonalJourneyContextV1 | null } | null = null;

const load = (): Promise<PersonalJourneyContextV1 | null> => {
  if (resolved) return Promise.resolve(resolved.value);
  if (!inflight) {
    inflight = resolvePersonalJourneyContext()
      .then((value) => {
        resolved = { value };
        return value;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
};

/** Drop the cached value, for auth changes and tests. */
export const resetPersonalJourneyCache = () => {
  inflight = null;
  resolved = null;
};

const withTimeout = async (
  promise: Promise<PersonalJourneyContextV1 | null>,
  ms: number,
): Promise<PersonalJourneyContextV1 | null> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
};

export function useCompanionPersonalJourney() {
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    void load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      resetPersonalJourneyCache();
      void load();
    });
    return () => {
      mounted.current = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  /**
   * Personal context for the request about to be sent. Never throws, never
   * blocks indefinitely, and returns `null` rather than a guess.
   */
  const ensurePersonalJourney = useCallback(
    async (): Promise<PersonalJourneyContextV1 | null> => {
      if (resolved) return resolved.value;
      try {
        return await withTimeout(load(), PERSONAL_JOURNEY_TIMEOUT_MS);
      } catch {
        return null;
      }
    },
    [],
  );

  return { ensurePersonalJourney };
}
