/**
 * AIC-J4 — the companion context value, or `null` outside the provider.
 *
 * Lives outside `CompanionProvider.tsx` so that file exports components only.
 * Never throws, so a contextual entry point can degrade to the `/ask` route in
 * isolated renders and tests.
 */

import { useContext } from "react";
import { CompanionContext, type CompanionContextValue } from "./companionContext";

export function useCompanionOptional(): CompanionContextValue | null {
  return useContext(CompanionContext);
}
