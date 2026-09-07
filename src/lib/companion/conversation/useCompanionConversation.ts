/**
 * AIC-4 — the one companion conversation runtime.
 *
 * Both surfaces (the site-wide panel and the full `/ask` page) run on this
 * hook, so a conversation behaves identically wherever it happens: same
 * ordering, same streaming, same errors, same clear/new behaviour, same
 * bounds. Neither surface keeps its own parallel transcript.
 *
 * Layer separation is deliberate and preserved:
 *   conversation history — what was said, here
 *   journey context (AIC-2) — saved journey facts, resolved per request
 *   permissioned memory (AIC-3) — explicitly saved preferences, server-side
 *
 * They are never merged into one blob, and a conversation turn never becomes
 * long-term memory.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAISearch } from "@/hooks/useAISearch";
import { buildCompanionRequest, type CompanionMode } from "@/lib/companion/companionRequest";
import { clarificationDisplay } from "@/lib/companion/clarificationDisplay";
import {
  useCompanionMemoryInteraction,
  type MemoryInteractionState,
} from "@/lib/companion/memory/useCompanionMemoryInteraction";
import type { JourneyContextV1 } from "../../../../supabase/functions/_shared/journeyContextContract";
import {
  buildSessionHistory,
  conversationTitleFrom,
  newMessageId,
  type CompanionMessage,
} from "./conversationTypes";
import {
  clearSessionConversation,
  loadSessionConversation,
  saveSessionConversation,
} from "./sessionConversationStore";
import { isCompanionHistoryUiEnabled } from "./conversationFlags";
import { hasConversationSession } from "./conversationRepository";

export interface CompanionConversationOptions {
  mode: CompanionMode;
  context?: string;
  /** Resolves the AIC-2 structured journey context for this request. */
  resolveJourneyContext: () => Promise<JourneyContextV1 | undefined>;
  /** Restore the session transcript on mount. Both surfaces do. */
  restoreSession?: boolean;
}

export interface CompanionConversationRuntime {
  messages: CompanionMessage[];
  streamingAnswer: string;
  isLoading: boolean;
  error: string | null;
  isRateLimited: boolean;
  /**
   * AIC-J5 — true only when the latest committed assistant answer was reported
   * eligible for the ordinary journey next-action layer. Fails closed.
   */
  nextActionsAllowed: boolean;

  lastQuestion: string | null;
  /** The account-owned conversation this thread joined, when persisting. */
  conversationId: string | null;
  /** True when persistent history is available to this person right now. */
  historyEnabled: boolean;
  title: string;
  send: (question: string) => void;
  retry: () => void;
  stop: () => void;
  /** Ends the visible thread and starts a fresh one. Stored rows are kept. */
  newConversation: () => void;
  /** Ends the visible thread and removes the local copy. */
  clearConversation: () => void;
  /** Replaces the visible thread with a stored conversation. */
  restoreConversation: (conversationId: string, messages: CompanionMessage[]) => void;
  memory: {
    state: MemoryInteractionState;
    busy: boolean;
    confirm: () => void;
    cancel: () => void;
    dismiss: () => void;
  };
}

const looksRateLimited = (message: string | null): boolean =>
  !!message && /too many requests|rate limit/i.test(message);

export function useCompanionConversation({
  mode,
  context,
  resolveJourneyContext,
  restoreSession = true,
}: CompanionConversationOptions): CompanionConversationRuntime {
  const { answer, isLoading, error, ask, reset } = useAISearch();
  const memory = useCompanionMemoryInteraction();

  const [messages, setMessages] = useState<CompanionMessage[]>(() =>
    restoreSession ? loadSessionConversation() : [],
  );
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const committedRef = useRef(false);
  // AIC-5C — the last boundary the *server* reported for the in-flight
  // request. Display metadata only; the browser never decides it.
  const boundaryRef = useRef<{ kind: "clarify" | "unsupported"; clarificationTopic?: string } | null>(null);
  const lastClientMessageIdRef = useRef<string | null>(null);
  // AIC-J5 — the opaque presentation permission for the one in-flight request.
  // It is never acted on until that same response commits as a completed
  // answer, and it never leaks into another request.
  const eligibilityRef = useRef<NextActionsEligibility>("suppress");
  const [nextActionsAllowed, setNextActionsAllowed] = useState(false);


  const historyUi = isCompanionHistoryUiEnabled();
  const historyEnabled = historyUi && signedIn;

  // Session continuity mirrors exactly what is on screen.
  useEffect(() => {
    saveSessionConversation(messages);
  }, [messages]);

  // Sign-in and sign-out both end the visible thread, so one person's
  // conversation is never shown to the next person on the same device.
  useEffect(() => {
    let active = true;
    void hasConversationSession().then((value) => {
      if (active) setSignedIn(value);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSignedIn(!!session?.user?.id);
      clearSessionConversation();
      setMessages([]);
      setConversationId(null);
      setLastQuestion(null);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  // Commit a finished stream into the visible thread exactly once.
  useEffect(() => {
    if (isLoading || committedRef.current) return;
    if (!answer.trim()) return;
    committedRef.current = true;
    const clarification =
      boundaryRef.current?.kind === "clarify"
        ? clarificationDisplay(boundaryRef.current.clarificationTopic)
        : null;
    setMessages((prev) => [
      ...prev,
      {
        id: newMessageId(),
        role: "assistant",
        content: answer,
        createdAt: new Date().toISOString(),
        status: "complete",
        ...(clarification ? { clarification } : {}),
      },
    ]);
    // AIC-J5 — only a completed canonical answer may host the action layer,
    // and only when the server permitted it for this very response.
    setNextActionsAllowed(eligibilityRef.current === "allow" && !clarification);
  }, [isLoading, answer]);


  const runRequest = useCallback(
    async (question: string, priorMessages: CompanionMessage[], clientMessageId: string) => {
      const journeyContext = await resolveJourneyContext();
      const request = buildCompanionRequest({
        query: question,
        context,
        mode,
        journeyContext,
        historyMode: historyEnabled ? "persistent" : "session",
        conversationId,
        clientMessageId,
        // The current turn is never included: only what came before it.
        sessionHistory: buildSessionHistory(priorMessages),
      });
      await ask(request.query, request.context, {
        mode: request.mode,
        journeyContext: request.journeyContext,
        historyMode: request.historyMode,
        conversationId: request.conversationId,
        clientMessageId: request.clientMessageId,
        sessionHistory: request.sessionHistory,
        onConversationId: (id) => setConversationId(id),
        onBoundary: (boundary) => {
          boundaryRef.current = boundary;
        },
      });
    },
    [ask, context, conversationId, historyEnabled, mode, resolveJourneyContext],
  );

  const send = useCallback(
    (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isLoading) return;
      committedRef.current = false;
      // AIC-5C — any boundary metadata belongs to one request only.
      boundaryRef.current = null;
      // AIC-J5 — a new accepted turn clears the previous action layer at once.
      eligibilityRef.current = "suppress";
      setNextActionsAllowed(false);

      memory.dismiss();
      setLastQuestion(trimmed);

      const priorMessages = messages;
      const clientMessageId = newMessageId();
      lastClientMessageIdRef.current = clientMessageId;
      setMessages((prev) => [
        ...prev,
        {
          id: newMessageId(),
          role: "user",
          content: trimmed,
          createdAt: new Date().toISOString(),
          status: "complete",
          clientMessageId,
        },
      ]);

      void (async () => {
        // AIC-3 — an explicit "remember"/"forget" command is handled by the
        // application and never reaches the model or the conversation store.
        if (await memory.interceptQuery(trimmed)) {
          committedRef.current = true;
          return;
        }
        await runRequest(trimmed, priorMessages, clientMessageId);
      })();
    },
    [isLoading, memory, messages, runRequest],
  );

  const retry = useCallback(() => {
    if (!lastQuestion || isLoading) return;
    committedRef.current = false;
    boundaryRef.current = null;
    eligibilityRef.current = "suppress";
    setNextActionsAllowed(false);

    // The same idempotency key is reused, so a retry cannot store the question
    // twice.
    const clientMessageId = lastClientMessageIdRef.current ?? newMessageId();
    lastClientMessageIdRef.current = clientMessageId;
    const prior = messages.filter((message) => message.clientMessageId !== clientMessageId);
    void runRequest(lastQuestion, prior, clientMessageId);
  }, [isLoading, lastQuestion, messages, runRequest]);

  const stop = useCallback(() => {
    reset();
    committedRef.current = true;
  }, [reset]);

  const endThread = useCallback(() => {
    reset();
    committedRef.current = true;
    setMessages([]);
    setLastQuestion(null);
    setConversationId(null);
    lastClientMessageIdRef.current = null;
  }, [reset]);

  const newConversation = useCallback(() => {
    endThread();
    clearSessionConversation();
  }, [endThread]);

  const clearConversation = useCallback(() => {
    endThread();
    clearSessionConversation();
  }, [endThread]);

  const restoreConversation = useCallback(
    (id: string, restored: CompanionMessage[]) => {
      reset();
      committedRef.current = true;
      setMessages(restored);
      setConversationId(id);
      setLastQuestion(null);
      lastClientMessageIdRef.current = null;
    },
    [reset],
  );

  return useMemo(
    () => ({
      messages,
      streamingAnswer: committedRef.current ? "" : answer,
      isLoading,
      error,
      isRateLimited: looksRateLimited(error),
      nextActionsAllowed,

      lastQuestion,
      conversationId,
      historyEnabled,
      title: conversationTitleFrom(messages),
      send,
      retry,
      stop,
      newConversation,
      clearConversation,
      restoreConversation,
      memory: {
        state: memory.state,
        busy: memory.busy,
        confirm: () => void memory.confirm(),
        cancel: memory.cancel,
        dismiss: memory.dismiss,
      },
    }),
    [
      answer,
      clearConversation,
      conversationId,
      error,
      historyEnabled,
      isLoading,
      lastQuestion,
      memory,
      messages,
      newConversation,
      restoreConversation,
      retry,
      send,
      stop,
    ],
  );
}
