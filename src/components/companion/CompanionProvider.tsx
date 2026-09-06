/**
 * Phase 29B — site-wide companion state.
 *
 * AIC-4: the panel no longer owns its own transcript. It runs on the shared
 * companion conversation runtime, exactly as `/ask` does, so both surfaces
 * behave identically. Continuity is session-scoped by default; account-owned
 * persistence only happens when the history flag is on and someone is signed
 * in. Nothing reaches the URL, analytics or logs.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { useCompanionPersonalJourney } from "@/hooks/useCompanionPersonalJourney";
import { buildJourneyContext, buildPageContext } from "@/lib/companion/journeyContext";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import type { CompanionMode } from "@/lib/companion/companionMode";
import { resolvePanelMode } from "@/lib/companion/companionRequest";
import { shouldShowCompanionLauncher } from "@/lib/companion/companionSurface";
import { buildCompanionPanelContext } from "@/lib/companion/companionPanelContext";
import { companionStarters } from "@/lib/companion/companionStarters";
import { resolveJourneySuggestions } from "@/lib/companion/journeySuggestions";

import type { AskClarification } from "@/lib/companion/clarificationDisplay";
import type { MemoryInteractionState } from "@/lib/companion/memory/useCompanionMemoryInteraction";
import { useCompanionConversation } from "@/lib/companion/conversation/useCompanionConversation";
import type { CompanionMessage } from "@/lib/companion/conversation/conversationTypes";

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
}

interface CompanionContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: CompanionMode;
  visible: boolean;
  turns: CompanionTurn[];
  streamingAnswer: string;
  isLoading: boolean;
  error: string | null;
  isRateLimited: boolean;
  starters: string[];
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

const CompanionContext = createContext<CompanionContextValue | null>(null);

export function CompanionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const identity = useCompanionIdentity();
  // AIC-2 — one shared personal resolver, awaited at submit and never blocking
  // the send indefinitely.
  const { ensurePersonalJourney, personalJourney } = useCompanionPersonalJourney();

  const [open, setOpen] = useState(false);
  // Pages that render a 404 suppress the companion for as long as they are
  // mounted, so arbitrary unknown paths never offer guidance.
  const [suppressedCount, setSuppressedCount] = useState(0);

  const mode = useMemo(() => resolvePanelMode(location.pathname), [location.pathname]);
  const visible = useMemo(
    () => suppressedCount === 0 && shouldShowCompanionLauncher(location.pathname),
    [location.pathname, suppressedCount],
  );

  const suppress = useCallback(() => {
    setSuppressedCount((count) => count + 1);
    return () => setSuppressedCount((count) => Math.max(0, count - 1));
  }, []);

  const context = useMemo(
    () =>
      buildCompanionPanelContext({
        mode,
        pathname: location.pathname,
        tone: identity.tone,
      }),
    [mode, location.pathname, identity.tone],
  );

  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;
  const resolveJourneyContext = useCallback(async () => {
    const personal = await ensurePersonalJourney();
    return buildJourneyContext({
      personal,
      page: buildPageContext({ pathname: pathnameRef.current }),
    });
  }, [ensurePersonalJourney]);

  // AIC-4 — the shared runtime. Ordering, streaming, bounds, clarification and
  // memory interception all live there rather than in this surface.
  const conversation = useCompanionConversation({ mode, context, resolveJourneyContext });

  // Close the panel when moving to a route where the companion is hidden.
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  const turns = useMemo<CompanionTurn[]>(
    () =>
      conversation.messages.map((message) => ({
        id: message.id,
        role: message.role,
        text: message.content,
        ...(message.clarification ? { clarification: message.clarification } : {}),
      })),
    [conversation.messages],
  );

  const value = useMemo<CompanionContextValue>(
    () => ({
      open: visible ? open : false,
      setOpen: (next: boolean) => setOpen(next && visible),
      mode,
      visible,
      turns,
      streamingAnswer: conversation.streamingAnswer,
      isLoading: conversation.isLoading,
      error: conversation.error,
      isRateLimited: conversation.isRateLimited,
      // AIC-J3 — personal journey starters when saved journey state exists,
      // otherwise the existing CONTENT/MODE chips for this area of the site.
      // A mode never becomes a personal journey.
      starters: personalJourney
        ? resolveJourneySuggestions({ personal: personalJourney, surface: "companion" })
        : companionStarters(mode),

      companionName: identity.name,
      context,
      send: conversation.send,
      retry: conversation.retry,
      stop: conversation.stop,
      clear: conversation.clearConversation,
      newConversation: conversation.newConversation,
      historyEnabled: conversation.historyEnabled,
      conversationId: conversation.conversationId,
      restoreConversation: conversation.restoreConversation,
      lastQuestion: conversation.lastQuestion,
      memory: conversation.memory,
      suppress,
    }),
    [suppress, open, mode, visible, turns, conversation, identity.name, context],
  );

  return <CompanionContext.Provider value={value}>{children}</CompanionContext.Provider>;
}

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
