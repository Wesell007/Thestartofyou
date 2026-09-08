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
import { resolvePanelMode } from "@/lib/companion/companionRequest";
import { shouldShowCompanionLauncher } from "@/lib/companion/companionSurface";
import { buildCompanionPanelContext } from "@/lib/companion/companionPanelContext";
import { companionStarters } from "@/lib/companion/companionStarters";
import { resolveJourneySuggestions, MAX_SUGGESTIONS } from "@/lib/companion/journeySuggestions";
import { resolveJourneyNextActions } from "@/lib/companion/journeyNextActions";

import { useCompanionConversation } from "@/lib/companion/conversation/useCompanionConversation";
import {
  CompanionContext,
  type CompanionContextValue,
  type CompanionEntryIntent,
  type CompanionJournalEntryIntent,
  type CompanionTurn,
} from "./companionContext";

export type {
  CompanionEntryIntent,
  CompanionJournalEntryIntent,
  CompanionTurn,
} from "./companionContext";


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

  // AIC-J4 — transient entry intent. `entryRef` is the authority for the next
  // request; `entryIntent` only mirrors it so the panel can show the chips.
  // Both are cleared the moment the shared runtime accepts the first user turn.
  const entryRef = useRef<CompanionEntryIntent | null>(null);
  const [entryIntent, setEntryIntent] = useState<CompanionEntryIntent | null>(null);

  const clearEntry = useCallback(() => {
    entryRef.current = null;
    setEntryIntent((current) => (current ? null : current));
  }, []);

  // AIC-JA3 — a pending explicitly selected journal entry. Like the AIC-J4
  // hand-off it is transient, and it is handed to the runtime exactly once,
  // for the next accepted question only.
  const journalEntryRef = useRef<CompanionJournalEntryIntent | null>(null);
  const [journalEntry, setJournalEntry] = useState<CompanionJournalEntryIntent | null>(null);

  const clearJournalEntry = useCallback(() => {
    journalEntryRef.current = null;
    setJournalEntry((current) => (current ? null : current));
  }, []);

  const resolveJournalEntryRef = useCallback(() => {
    const intent = journalEntryRef.current;
    if (!intent) return null;
    clearJournalEntry();
    return intent.ref;
  }, [clearJournalEntry]);

  const resolveJourneyContext = useCallback(async () => {
    const personal = await ensurePersonalJourney();
    // Consumed at the point the runtime accepts and commits the user turn,
    // before any assistant reply. A later failure or retry does not revive it.
    const intent = entryRef.current;
    if (intent) clearEntry();
    return buildJourneyContext({
      personal,
      page: buildPageContext({ pathname: pathnameRef.current }),
      ...(intent ? { entry: intent.entry } : {}),
    });
  }, [clearEntry, ensurePersonalJourney]);

  // AIC-4 — the shared runtime. Ordering, streaming, bounds, clarification and
  // memory interception all live there rather than in this surface.
  const conversation = useCompanionConversation({
    mode,
    context,
    resolveJourneyContext,
    resolveJournalEntryRef,
  });

  const openWithEntry = useCallback(
    (intent: CompanionEntryIntent) => {
      entryRef.current = intent;
      setEntryIntent(intent);
      setOpen(true);
    },
    [],
  );

  const openWithJournalEntry = useCallback(
    (intent: CompanionJournalEntryIntent) => {
      // An explicit entry selection is the more specific hand-off, so it
      // replaces any generic page-level entry context waiting alongside it.
      entryRef.current = null;
      setEntryIntent(null);
      journalEntryRef.current = intent;
      setJournalEntry(intent);
      setOpen(true);
    },
    [],
  );

  // Close the panel when moving to a route where the companion is hidden.
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // A route change clears any entry intent that was never used. Turns already
  // in the conversation are untouched.
  useEffect(() => {
    clearEntry();
    clearJournalEntry();
  }, [location.pathname, clearEntry, clearJournalEntry]);

  // Closing the panel abandons an unconsumed entry: reopening the launcher is
  // an ordinary open, not a contextual hand-off.
  useEffect(() => {
    if (!open) {
      clearEntry();
      clearJournalEntry();
    }
  }, [open, clearEntry, clearJournalEntry]);

  // A journey change, or signing in or out, abandons a pending selection: it
  // belonged to a state that no longer holds.
  useEffect(() => {
    clearJournalEntry();
  }, [personalJourney, conversation.signedIn, clearJournalEntry]);


  // AIC-J5 — a J2 journey change invalidates the layer for the answer already
  // on screen. Actions for a new lifecycle are never attached retroactively to
  // an older answer; the next eligible completed answer produces fresh ones.
  const [journeyInvalidated, setJourneyInvalidated] = useState(false);
  const lastPersonalRef = useRef(personalJourney);
  useEffect(() => {
    if (lastPersonalRef.current === personalJourney) return;
    const previous = lastPersonalRef.current;
    lastPersonalRef.current = personalJourney;
    // The first resolution of an unknown journey is not a transition: nothing
    // stale existed. Only a change away from a known journey invalidates.
    if (previous !== null) setJourneyInvalidated(true);
  }, [personalJourney]);

  useEffect(() => {
    // Every new turn clears eligibility first, which also clears the block.
    if (!conversation.nextActionsAllowed) setJourneyInvalidated(false);
  }, [conversation.nextActionsAllowed]);

  const nextActions = useMemo(
    () =>
      conversation.nextActionsAllowed && !journeyInvalidated
        ? resolveJourneyNextActions({
            personal: personalJourney,
            signedIn: conversation.signedIn,
          })
        : [],
    [conversation.nextActionsAllowed, conversation.signedIn, journeyInvalidated, personalJourney],
  );

  const turns = useMemo<CompanionTurn[]>(
    () =>
      conversation.messages.map((message) => ({
        id: message.id,
        role: message.role,
        text: message.content,
        ...(message.clarification ? { clarification: message.clarification } : {}),
        ...(message.journalContextUsed ? { journalContextUsed: true } : {}),
        ...(message.selectedJournalEntryUsed ? { selectedJournalEntryUsed: true } : {}),
      })),
    [conversation.messages],
  );

  const value = useMemo<CompanionContextValue>(
    () => ({
      open: visible ? open : false,
      setOpen: (next: boolean) => setOpen(next && visible),
      openWithEntry,
      openWithJournalEntry,
      journalEntry,
      clearJournalEntry,
      mode,
      visible,
      turns,
      streamingAnswer: conversation.streamingAnswer,
      isLoading: conversation.isLoading,
      error: conversation.error,
      isRateLimited: conversation.isRateLimited,
      // AIC-J4 — presentation-only suggestions handed over with a contextual
      // entry, while that entry is still unconsumed. They never displace the
      // personal starter authority once the conversation is under way.
      // AIC-J3 — personal journey starters when saved journey state exists,
      // otherwise the existing CONTENT/MODE chips for this area of the site.
      // A mode never becomes a personal journey.
      starters:
        journalEntry?.suggestions?.length && turns.length === 0
          ? journalEntry.suggestions.slice(0, MAX_SUGGESTIONS)
          : entryIntent?.suggestions?.length && turns.length === 0
          ? entryIntent.suggestions.slice(0, MAX_SUGGESTIONS)
          : personalJourney
            ? resolveJourneySuggestions({ personal: personalJourney, surface: "companion" })
            : companionStarters(mode),


      nextActions,
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
    [
      suppress,
      open,
      openWithEntry,
      openWithJournalEntry,
      journalEntry,
      clearJournalEntry,
      entryIntent,
      mode,
      visible,
      turns,
      nextActions,
      conversation,
      identity.name,
      context,
      personalJourney,
    ],


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
