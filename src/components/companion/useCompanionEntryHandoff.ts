/**
 * AIC-J4 — safe access to the one panel's contextual hand-off.
 *
 * Returns `null` when there is no companion provider (isolated renders and
 * tests), so an entry point degrades to the `/ask` route rather than throwing.
 * No second runtime is ever created here.
 */

import { useCompanionOptional } from "./useCompanionOptional";
import { buildEntryContext } from "@/lib/companion/journeyContext";
import type { AskAboutThisEntry } from "./AskAboutThis";

export interface CompanionHandoffInput {
  entry: AskAboutThisEntry;
  suggestions?: string[];
}

export type CompanionHandoff = (input: CompanionHandoffInput) => void;

export function useCompanionEntryHandoff(): CompanionHandoff | null {
  const companion = useCompanionOptional();
  if (!companion) return null;
  return ({ entry, suggestions }: CompanionHandoffInput) => {
    const built = buildEntryContext({
      stage: entry.stage ?? undefined,
      journey: entry.journey ?? undefined,
      topic: entry.topic ?? undefined,
      title: entry.title ?? undefined,
    });
    if (!built) return;
    companion.openWithEntry({ entry: built, ...(suggestions ? { suggestions } : {}) });
  };
}
