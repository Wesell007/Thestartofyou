/**
 * AIC-J4 (closure) — the companion context object and its shared types.
 *
 * Kept in a component-free module so `CompanionProvider.tsx` exports only the
 * provider component and its two established hooks. Provider semantics are
 * unchanged: this file holds the same context, the same value shape and the
 * same defaults it always had.
 */

import { createContext } from "react";
import type { JourneyNextAction } from "@/lib/companion/journeyNextActions";
import type { CompanionMode } from "@/lib/companion/companionMode";
import type { AskClarification } from "@/lib/companion/clarificationDisplay";
import type { MemoryInteractionState } from "@/lib/companion/memory/useCompanionMemoryInteraction";
import type { CompanionMessage } from "@/lib/companion/conversation/conversationTypes";
import type { EntryJourneyContextV1 } from "../../../supabase/functions/_shared/journeyContextContract";

/**
 * AIC-J4 — a contextual hand-off into the one shared panel.
 *
 * `entry` is AIC-2 entry provenance (content, never identity). `suggestions`
 * are transient presentation-only chips: they are never stored in
 * JourneyContextV1, never persisted and never sent as a hidden user message.
 */
export interface CompanionEntryIntent {
  entry: EntryJourneyContextV1;
  suggestions?: string[];
}

export interface CompanionTurn {
  id: string;
  role: "user" | "assistant";
  text: string;
  /**
   * Phase 29D — set when a short, broad question was met with a gentle
   * clarifying question instead of a model call. Session-only, like every
   * other turn: nothing is persisted.
   */
  clarification?: AskClarification;
  /**
   * AIC-JA2 — transparency for this one completed answer. Display-only, never
   * persisted, and it says nothing about what the journal contained.
   */
  journalContextUsed?: boolean;
}

export interface CompanionContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  /**
   * AIC-J4 — open the one panel carrying entry provenance for what the person
   * pressed Ask from. No model call happens here, and no user message is sent.
   */
  openWithEntry: (intent: CompanionEntryIntent) => void;

  mode: CompanionMode;
  visible: boolean;
  turns: CompanionTurn[];
  streamingAnswer: string;
  isLoading: boolean;
  error: string | null;
  isRateLimited: boolean;
  starters: string[];
  /**
   * AIC-J5 — saved-journey navigation shown under the latest completed answer
   * only, and only when the server permitted the layer for that response.
   */
  nextActions: JourneyNextAction[];
  /** The chosen companion name, or null when the person never set one. */
  companionName: string | null;
  context: string;
  send: (question: string) => void;
  retry: () => void;
  stop: () => void;
  clear: () => void;
  /** AIC-4 — end this thread and begin a new one. */
  newConversation: () => void;
  /** AIC-4 — true when this thread is being stored against the account. */
  historyEnabled: boolean;
  /** AIC-4 — the stored thread being continued, when there is one. */
  conversationId: string | null;
  /** AIC-4 — reopen a stored thread the person picked from their history. */
  restoreConversation: (conversationId: string, messages: CompanionMessage[]) => void;
  lastQuestion: string | null;
  /** AIC-3 — explicit memory command state for this surface. */
  memory: {
    state: MemoryInteractionState;
    busy: boolean;
    confirm: () => void;
    cancel: () => void;
    dismiss: () => void;
  };
  /** Register a 404 surface; returns the release function. */
  suppress: () => () => void;
}

export const CompanionContext = createContext<CompanionContextValue | null>(null);
