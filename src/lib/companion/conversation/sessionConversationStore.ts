/**
 * AIC-4 — ephemeral session continuity.
 *
 * One narrowly namespaced `sessionStorage` key holds the visible transcript so
 * a refresh does not lose the thread. It ends naturally with the browser
 * session, and it is cleared on sign-in, sign-out and explicit clear.
 *
 * Stored: only visible user/assistant text plus role and timestamp.
 * Never stored: journey context, permissioned memory, prompts, grounding
 * material, tokens, user ids or any other identifier.
 *
 * `localStorage` is deliberately not used: this must not become indefinite
 * anonymous long-term history.
 */

import {
  SESSION_MAX_MESSAGES,
  SESSION_MAX_MESSAGE_CHARS,
  SESSION_MAX_PAYLOAD_CHARS,
  isCompletedTurn,
  type CompanionMessage,
} from "./conversationTypes";

export const SESSION_CONVERSATION_KEY = "tsoy.companion.conversation.v1";

interface StoredShape {
  v: 1;
  messages: Array<{ id: string; role: "user" | "assistant"; content: string; createdAt: string }>;
}

const storage = (): Storage | null => {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
};

/**
 * Deterministic bounding: completed turns only, capped count, capped
 * per-message length, then the oldest dropped until the serialised payload
 * fits the total budget.
 */
export const boundSessionMessages = (messages: CompanionMessage[]): StoredShape["messages"] => {
  const kept = messages
    .filter(isCompletedTurn)
    .slice(-SESSION_MAX_MESSAGES)
    .map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content.trim().slice(0, SESSION_MAX_MESSAGE_CHARS),
      createdAt: message.createdAt,
    }));

  while (kept.length > 0 && JSON.stringify({ v: 1, messages: kept }).length > SESSION_MAX_PAYLOAD_CHARS) {
    kept.shift();
  }
  return kept;
};

export const saveSessionConversation = (messages: CompanionMessage[]): void => {
  const store = storage();
  if (!store) return;
  const bounded = boundSessionMessages(messages);
  try {
    if (bounded.length === 0) {
      store.removeItem(SESSION_CONVERSATION_KEY);
      return;
    }
    store.setItem(SESSION_CONVERSATION_KEY, JSON.stringify({ v: 1, messages: bounded } satisfies StoredShape));
  } catch {
    // A full or unavailable store simply means no refresh continuity.
  }
};

export const loadSessionConversation = (): CompanionMessage[] => {
  const store = storage();
  if (!store) return [];
  try {
    const raw = store.getItem(SESSION_CONVERSATION_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredShape | null;
    if (!parsed || parsed.v !== 1 || !Array.isArray(parsed.messages)) return [];
    return parsed.messages
      .filter(
        (message) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      )
      .slice(-SESSION_MAX_MESSAGES)
      .map((message) => ({
        id: typeof message.id === "string" && message.id ? message.id : `restored-${Math.random().toString(36).slice(2)}`,
        role: message.role,
        content: message.content.slice(0, SESSION_MAX_MESSAGE_CHARS),
        createdAt: typeof message.createdAt === "string" ? message.createdAt : new Date().toISOString(),
        status: "complete" as const,
      }));
  } catch {
    return [];
  }
};

export const clearSessionConversation = (): void => {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(SESSION_CONVERSATION_KEY);
  } catch {
    // Nothing to do.
  }
};
