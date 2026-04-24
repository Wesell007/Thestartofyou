/**
 * Analytics consent state.
 *
 * Single source of truth for whether the user has explicitly opted in to
 * non-essential analytics. This module knows nothing about analytics
 * implementations, product state, or AI helpers — that separation is
 * intentional.
 *
 * Rules:
 *  - "unknown" is NOT consent. Dismissal is never consent.
 *  - Only "accepted" enables tracking.
 *  - Storage key is versioned; bump the version if the meaning of consent
 *    changes (e.g. new tracking categories) so we force a fresh decision.
 */

export type ConsentState = "unknown" | "accepted" | "rejected";

const STORAGE_KEY = "tsoy_consent_analytics_v1";
const EVENT_NAME = "tsoy:consentchange";

const isBrowser = (): boolean => typeof window !== "undefined";

export const getAnalyticsConsent = (): ConsentState => {
  if (!isBrowser()) return "unknown";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
    return "unknown";
  } catch {
    return "unknown";
  }
};

export const setAnalyticsConsent = (state: "accepted" | "rejected"): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Storage may be unavailable (private mode, quota). Fail closed —
    // without persisted consent we'll treat the user as not opted in.
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: state }));
};

/** Reset to "unknown" so the consent banner reappears. Used by the footer
 *  "Manage analytics" link to give users a clean way to change their mind
 *  without us building a full preference centre in this pass. */
export const resetAnalyticsConsent = (): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: "unknown" }));
};

export const subscribeAnalyticsConsent = (
  cb: (state: ConsentState) => void
): (() => void) => {
  if (!isBrowser()) return () => {};
  const handler = () => cb(getAnalyticsConsent());
  window.addEventListener(EVENT_NAME, handler);
  // Cross-tab sync: localStorage events fire in *other* tabs.
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb(getAnalyticsConsent());
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
};

export const hasAnalyticsConsent = (): boolean =>
  getAnalyticsConsent() === "accepted";
