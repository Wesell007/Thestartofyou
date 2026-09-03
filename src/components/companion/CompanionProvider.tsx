/**
 * Phase 29B — site-wide companion state.
 *
 * Session-only: turns live in React state and are dropped on unmount or on
 * "Start again". Nothing is written to the database, storage, the URL,
 * analytics or logs. Each backend request sends only the latest question,
 * the bounded page context and the resolved mode. Chat history is never sent.
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
import { useAISearch } from "@/hooks/useAISearch";
import { useCompanionPersonalJourney } from "@/hooks/useCompanionPersonalJourney";
import { buildJourneyContext, buildPageContext } from "@/lib/companion/journeyContext";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import type { CompanionMode } from "@/lib/companion/companionMode";
import { buildCompanionRequest, resolvePanelMode } from "@/lib/companion/companionRequest";
import { shouldShowCompanionLauncher } from "@/lib/companion/companionSurface";
import { buildCompanionPanelContext } from "@/lib/companion/companionPanelContext";
import { companionStarters } from "@/lib/companion/companionStarters";
import { resolveAskClarification, type AskClarification } from "@/lib/askClarification";

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
  lastQuestion: string | null;
  /** Register a 404 surface; returns the release function. */
  suppress: () => () => void;
}

const CompanionContext = createContext<CompanionContextValue | null>(null);

const newId = () => Math.random().toString(36).slice(2);

const looksRateLimited = (message: string | null): boolean =>
  !!message && /too many requests|rate limit/i.test(message);

export function CompanionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const identity = useCompanionIdentity();
  const { answer, isLoading, error, ask, reset } = useAISearch();
  // AIC-2 — one shared personal resolver, awaited at submit and never blocking
  // the send indefinitely.
  const { ensurePersonalJourney } = useCompanionPersonalJourney();

  const [open, setOpen] = useState(false);
  // Pages that render a 404 suppress the companion for as long as they are
  // mounted, so arbitrary unknown paths never offer guidance.
  const [suppressedCount, setSuppressedCount] = useState(0);
  const [turns, setTurns] = useState<CompanionTurn[]>([]);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);
  const committedRef = useRef(false);

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

  // Close the panel when moving to a route where the companion is hidden.
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  // Commit a finished stream into the session turn list.
  useEffect(() => {
    if (isLoading || committedRef.current) return;
    if (!answer.trim()) return;
    committedRef.current = true;
    setTurns((prev) => [...prev, { id: newId(), role: "assistant", text: answer }]);
  }, [isLoading, answer]);

  const send = useCallback(
    (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isLoading) return;
      committedRef.current = false;
      setLastQuestion(trimmed);
      setTurns((prev) => [...prev, { id: newId(), role: "user", text: trimmed }]);

      // A broad single-topic term is clarified locally. The resolver already
      // refuses to clarify anything with concern wording, so nothing that
      // needs the safety routing is delayed here.
      const clarification = resolveAskClarification(trimmed);
      if (clarification) {
        committedRef.current = true;
        setTurns((prev) => [
          ...prev,
          { id: newId(), role: "assistant", text: clarification.question, clarification },
        ]);
        return;
      }

      // Only the latest question, the bounded context and the mode, built at
      // the shared companion request boundary (AIC-1).
      void (async () => {
        const personal = await ensurePersonalJourney();
        const journeyContext = buildJourneyContext({
          personal,
          page: buildPageContext({ pathname: location.pathname }),
        });
        const request = buildCompanionRequest({ query: trimmed, context, mode, journeyContext });
        await ask(request.query, request.context, {
          mode: request.mode,
          journeyContext: request.journeyContext,
        });
      })();
    },
    [ask, context, ensurePersonalJourney, isLoading, location.pathname, mode],
  );

  const retry = useCallback(() => {
    if (!lastQuestion || isLoading) return;
    committedRef.current = false;
    void (async () => {
      const personal = await ensurePersonalJourney();
      const journeyContext = buildJourneyContext({
        personal,
        page: buildPageContext({ pathname: location.pathname }),
      });
      const request = buildCompanionRequest({ query: lastQuestion, context, mode, journeyContext });
      await ask(request.query, request.context, {
        mode: request.mode,
        journeyContext: request.journeyContext,
      });
    })();
  }, [ask, context, ensurePersonalJourney, isLoading, lastQuestion, location.pathname, mode]);

  const stop = useCallback(() => {
    reset();
    committedRef.current = true;
  }, [reset]);

  const clear = useCallback(() => {
    reset();
    committedRef.current = true;
    setTurns([]);
    setLastQuestion(null);
  }, [reset]);

  const value = useMemo<CompanionContextValue>(
    () => ({
      open: visible ? open : false,
      setOpen: (next: boolean) => setOpen(next && visible),
      mode,
      visible,
      turns,
      streamingAnswer: committedRef.current ? "" : answer,
      isLoading,
      error,
      isRateLimited: looksRateLimited(error),
      starters: companionStarters(mode),
      companionName: identity.name,
      context,
      send,
      retry,
      stop,
      clear,
      lastQuestion,
      suppress,
    }),
    [
      suppress,
      open,
      mode,
      visible,
      turns,
      answer,
      isLoading,
      error,
      identity.name,
      context,
      send,
      retry,
      stop,
      clear,
      lastQuestion,
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
