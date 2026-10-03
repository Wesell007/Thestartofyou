/**
 * The companion context hooks.
 *
 * Kept in a component-free module, next to `useCompanionOptional`, so that
 * `CompanionProvider.tsx` exports only the provider component and React Fast
 * Refresh can keep its state. Behaviour is unchanged: `useCompanion` throws
 * outside the provider and `useSuppressCompanion` is safe to call anywhere.
 */

import { useContext, useEffect } from "react";
import { CompanionContext, type CompanionContextValue } from "./companionContext";

export function useCompanion(): CompanionContextValue {
  const ctx = useContext(CompanionContext);
  if (!ctx) throw new Error("useCompanion must be used inside CompanionProvider");
  return ctx;
}

/**
 * Hide the companion launcher, and keep the panel closed, for as long as the
 * calling page is mounted. Used by the 404 page. Safe to call outside the
 * provider (tests, isolated renders).
 */
export function useSuppressCompanion(): void {
  const ctx = useContext(CompanionContext);
  const suppress = ctx?.suppress;
  useEffect(() => {
    if (!suppress) return;
    return suppress();
  }, [suppress]);
}
