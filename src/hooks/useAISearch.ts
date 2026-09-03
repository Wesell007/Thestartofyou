import { useState, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AiMode } from "../../supabase/functions/_shared/aiModes";
import type { JourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

export type AISearchOptions = {
  /** Surface mode. Omitted means the shared endpoint uses its general behaviour. */
  mode?: AiMode;
  /**
   * AIC-2 — validated structured journey context. Omitted means the request
   * body is exactly what it was before AIC-2.
   */
  journeyContext?: JourneyContextV1;
  /**
   * AIC-4 — conversation continuity. `session` (the default) never writes a
   * row; `persistent` asks the backend to store the turn against the signed-in
   * account, and is only ever set when the history flag is on.
   */
  historyMode?: "session" | "persistent";
  /** Existing account-owned conversation to continue, when there is one. */
  conversationId?: string;
  /** Idempotency key for the user turn, so a retry cannot duplicate it. */
  clientMessageId?: string;
  /** Bounded prior turns for session mode only. Ignored by persistent mode. */
  sessionHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  /** Called with the conversation the answer joined, when one exists. */
  onConversationId?: (conversationId: string) => void;
};

export function useAISearch() {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const requestRef = useRef(0);

  const ask = useCallback(async (query: string, context?: string, options?: AISearchOptions) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestRef.current;
    setAnswer("");
    setError(null);
    setIsLoading(true);

    try {
      // AIC-3 — when someone is signed in the request carries their verified
      // access token so the backend can load their own permissioned memory
      // under row-level security. Signed out, the request is exactly what it
      // was before AIC-3, and the companion works the same way.
      let accessToken: string | null = null;
      try {
        const { data } = await supabase.auth.getSession();
        accessToken = data.session?.access_token ?? null;
      } catch {
        accessToken = null;
      }

      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${accessToken ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            query,
            context,
            ...(options?.mode ? { mode: options.mode } : {}),
            ...(options?.journeyContext ? { journeyContext: options.journeyContext } : {}),
            ...(options?.historyMode ? { historyMode: options.historyMode } : {}),
            ...(options?.conversationId ? { conversationId: options.conversationId } : {}),
            ...(options?.clientMessageId ? { clientMessageId: options.clientMessageId } : {}),
            ...(options?.sessionHistory?.length ? { sessionHistory: options.sessionHistory } : {}),
          }),
          signal: controller.signal,
        }
      );

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      if (!resp.body) throw new Error("No response body");

      // AIC-4 — the backend reports which stored conversation this answer
      // joined. Absent for anonymous and session-mode requests.
      const conversationId = resp.headers.get("X-Conversation-Id");
      if (conversationId && options?.onConversationId) options.onConversationId(conversationId);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      const processLine = (rawLine: string) => {
        let line = rawLine;
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) return;
        const json = line.slice(6).trim();
        if (!json || json === "[DONE]") return;
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content && requestRef.current === requestId) {
          full += content;
          setAnswer(full);
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          buffer += decoder.decode();
          if (buffer.trim()) processLine(buffer.trimEnd());
          break;
        }
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          try {
            processLine(line);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      if (requestRef.current === requestId) {
        const message = e instanceof Error ? e.message : "";
        setError(
          message && message !== "Failed to fetch" && !/networkerror/i.test(message)
            ? message
            : "Guidance is temporarily unavailable. Please check your connection and try again.",
        );
      }
    } finally {
      if (requestRef.current === requestId) setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    requestRef.current += 1;
    setAnswer("");
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  return { answer, isLoading, error, ask, reset };
}
