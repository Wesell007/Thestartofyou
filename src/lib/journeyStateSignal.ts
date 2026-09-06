/**
 * AIC-J2 — journey state change signal.
 *
 * A payload-free, in-memory notification meaning exactly one thing:
 * "authoritative journey state changed; any cached personal journey context is
 * no longer trustworthy."
 *
 * It carries no journey data, no journey type, no identifiers, no stage, week
 * or age. It is never stored, never sent anywhere, and must never become a
 * second source of truth for journey state. The only authority remains the
 * database, read through `resolvePersonalJourneyContext`.
 */

type JourneyStateListener = () => void;

const listeners = new Set<JourneyStateListener>();

/**
 * Announce that an authoritative journey mutation has committed.
 *
 * Call once per completed user-level mutation, never per SQL statement, and
 * only after the write succeeded. Listener failures are isolated: the write
 * has already committed, so a faulty cache listener must never make a
 * successful journey save look like a failure.
 */
export const notifyJourneyStateChanged = (): void => {
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch (err) {
      console.warn("[journeyStateSignal] listener failed (non-fatal):", err);
    }
  }
};

/** Subscribe to journey state changes. Returns an unsubscribe function. */
export const subscribeJourneyStateChanged = (
  listener: JourneyStateListener,
): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Test-only helper: drop every listener, for deterministic isolation. */
export const resetJourneyStateListeners = (): void => {
  listeners.clear();
};
