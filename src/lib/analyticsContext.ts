/**
 * Analytics identity context.
 *
 * Strict rules:
 *  - `anonymous_id` is generated lazily and ONLY after analytics consent
 *    has been accepted. We never create it speculatively.
 *  - `user_id` is held in memory only. It is never persisted anywhere
 *    and never written to product tables.
 *  - This module must not import from savedJourney, authIntent, profile
 *    helpers, or any AI helper. The only outside fact it knows is the
 *    raw user id string passed via setUserId.
 */

import { hasAnalyticsConsent } from "./consent";

const ANON_KEY = "tsoy_anon_id_v1";

let userIdInMemory: string | null = null;

const isBrowser = (): boolean => typeof window !== "undefined";

const generateId = (): string => {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback — sufficient for an opaque client id.
  return `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
};

/**
 * Returns the anonymous_id, creating + persisting one on first call.
 * Caller MUST gate on consent before invoking; this function trusts the
 * caller and will create the id unconditionally.
 */
const getOrCreateAnonId = (): string | null => {
  if (!isBrowser()) return null;
  try {
    const existing = window.localStorage.getItem(ANON_KEY);
    if (existing) return existing;
    const fresh = generateId();
    window.localStorage.setItem(ANON_KEY, fresh);
    return fresh;
  } catch {
    return null;
  }
};

export const setUserId = (userId: string | null): void => {
  userIdInMemory = userId;
};

export const getUserId = (): string | null => userIdInMemory;

/**
 * Get the identity context to attach to outgoing events. Returns null
 * fields if consent isn't accepted — but in practice the analytics gate
 * blocks before reaching here, so this is defence-in-depth.
 */
export const getIdentityContext = (): {
  anonymous_id: string | null;
  user_id: string | null;
} => {
  if (!hasAnalyticsConsent()) {
    return { anonymous_id: null, user_id: null };
  }
  return {
    anonymous_id: getOrCreateAnonId(),
    user_id: userIdInMemory,
  };
};

/**
 * Clear all analytics identity state. Called on consent reset/rejection
 * and on sign-out. Removes the persisted anonymous_id so a future opt-in
 * starts fresh, and drops the in-memory user_id.
 */
export const resetAnalyticsContext = (): void => {
  userIdInMemory = null;
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(ANON_KEY);
  } catch {
    // ignore
  }
};
