/**
 * AIC-2 — deterministic readiness for personal journey context.
 * AIC-J2 — freshness after authoritative journey mutations.
 *
 * Resolution starts once on mount and is shared through a module-level
 * in-flight promise, so the panel and `/ask` never resolve it twice. At submit
 * time callers `await ensurePersonalJourney()`, which resolves immediately
 * when the value is already loaded and otherwise waits for the single
 * in-flight read, bounded by a short timeout.
 *
 * There is no new loading UI: if resolution has not finished within the
 * timeout, or fails, the request proceeds with no personal context.
 *
 * Freshness (AIC-J2): this module owns the only cache and the only listener
 * for `journeyStateSignal`. A signal bumps an epoch, which synchronously makes
 * the cached value unusable. A resolution that completes under an obsolete
 * epoch is neither cached nor returned to its awaiting caller: it chains onto
 * the current-epoch resolution instead. A stale journey is never returned, and
 * a failed refresh resolves to `null` rather than resurrecting the old journey.
 */

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolvePersonalJourneyContext } from "@/lib/companion/journeyPersonalSource";
import { subscribeJourneyStateChanged } from "@/lib/journeyStateSignal";
import type { PersonalJourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

/** Maximum wait before a request proceeds without personal context. */
export const PERSONAL_JOURNEY_TIMEOUT_MS = 1_500;

let inflight: Promise<PersonalJourneyContextV1 | null> | null = null;
let resolved: { value: PersonalJourneyContextV1 | null } | null = null;
/** Incremented by every invalidation; guards both write-back and return value. */
let epoch = 0;

/**
 * AIC-J3 — subscribers to the *published* value, so surfaces that render
 * personal starters re-read the same module cache. No second cache, no second
 * resolver: this only mirrors what `load()` has already resolved.
 */
const valueListeners = new Set<() => void>();
const publish = () => {
  for (const listener of [...valueListeners]) {
    try {
      listener();
    } catch (err) {
      console.warn("[personalJourney] listener failed (non-fatal):", err);
    }
  }
};

const load = (): Promise<PersonalJourneyContextV1 | null> => {
  if (resolved) return Promise.resolve(resolved.value);
  if (!inflight) {
    const started = epoch;
    const pending: Promise<PersonalJourneyContextV1 | null> =
      resolvePersonalJourneyContext()
        .catch(() => null)
        .then((value) => {
          if (inflight === pending) inflight = null;
          if (started !== epoch) {
            // Journey state changed while this read was in flight: the answer
            // is already stale, so neither cache it nor hand it back. Resolve
            // again under the current epoch.
            return load();
          }
          resolved = { value };
          publish();
          return value;
        });
    inflight = pending;
  }
  return inflight;
};


/**
 * Drop the cached value immediately. Used for auth changes, journey state
 * changes and tests. Any resolution already in flight can no longer populate
 * the cache or be returned to a caller.
 */
export const resetPersonalJourneyCache = () => {
  epoch += 1;
  inflight = null;
  resolved = null;
  // Published value becomes unknown synchronously, so no surface can keep
  // showing personal starters for a journey that no longer applies.
  publish();
};

// One module-level listener, however many companion surfaces are mounted, so
// there are never duplicate listeners or duplicate database resolutions.
// Invalidation is synchronous; the refresh is kicked off eagerly so the next
// submit usually finds a completed fresh value.
subscribeJourneyStateChanged(() => {
  resetPersonalJourneyCache();
  void load();
});


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
   * blocks indefinitely, and returns `null` rather than a guess or a stale
   * journey.
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
