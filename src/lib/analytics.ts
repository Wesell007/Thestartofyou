/**
 * Analytics gate.
 *
 * The single entry point for all non-essential tracking. Every call is
 * checked against `hasAnalyticsConsent()` first; without explicit
 * "accepted" consent, every helper here is a no-op.
 *
 * Strict separation rules (do not break):
 *  - This file MUST NOT import from `savedJourney.ts`, `authIntent.ts`,
 *    or any AI helper. Product state is not implicitly observable here.
 *  - Callers may pass curated properties explicitly. Nothing about the
 *    user's journey, reflections, or behaviour leaks unless the call
 *    site decides to include it.
 *  - AI context is built separately from product state — it must not
 *    consume this event stream.
 *
 * Day-one adapter is a console adapter (dev only). Wiring a real sink
 * (PostHog, Plausible, Lovable Cloud table, etc.) is a single-file
 * change — replace the body of `forward()`.
 */

import {
  hasAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "./consent";
import {
  getIdentityContext,
  resetAnalyticsContext,
  setUserId,
} from "./analyticsContext";
import type { EventMap, EventName } from "./analyticsEvents";

const isDev =
  typeof import.meta !== "undefined" && Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);

const forward = (kind: "event" | "pageview" | "identify", payload: unknown): void => {
  // TODO: wire a real analytics sink here. Until then we log in dev only
  // so the architecture is verifiable end-to-end without shipping data.
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics:${kind}]`, payload);
  }
};

const dropped = (kind: string, payload: unknown): void => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics:dropped:${kind}] consent not granted`, payload);
  }
};

const buildEnvelope = (props?: Record<string, unknown>) => {
  const identity = getIdentityContext();
  const path =
    typeof window !== "undefined" ? window.location.pathname + window.location.search : null;
  return {
    ...identity,
    path,
    timestamp: new Date().toISOString(),
    properties: props ?? {},
  };
};

/**
 * Type-safe event tracker. Use the constants from `analyticsEvents.ts`
 * for the name; the props type is inferred from the EventMap.
 */
export const trackEvent = <N extends EventName>(
  name: N,
  ...args: EventMap[N] extends Record<string, never> ? [] : [EventMap[N]]
): void => {
  const props = (args[0] ?? undefined) as Record<string, unknown> | undefined;
  if (!hasAnalyticsConsent()) return dropped("event", { name, props });
  forward("event", { name, ...buildEnvelope(props) });
};

export const trackPageView = (path: string): void => {
  if (!hasAnalyticsConsent()) return dropped("pageview", { path });
  forward("pageview", { ...buildEnvelope(), path });
};

export const identify = (userId: string | null): void => {
  // Always update the in-memory user_id so that the moment consent flips
  // to accepted we already know who they are. The forward call itself is
  // still gated.
  setUserId(userId);
  if (!hasAnalyticsConsent()) return dropped("identify", { userId });
  forward("identify", { ...buildEnvelope(), user_id: userId });
};

// On consent reset/rejection, clear analytics identity state so a future
// opt-in starts with a fresh anonymous_id.
if (typeof window !== "undefined") {
  subscribeAnalyticsConsent((state) => {
    if (state !== "accepted") {
      resetAnalyticsContext();
    }
  });
}
