/**
 * AIC-4 — the one canonical companion conversation contract.
 *
 * Both surfaces (the site-wide panel and the full `/ask` page) share this
 * shape. It is deliberately human-facing: a stored or session-cached message
 * is only what the person could already see on screen. No system prompt, no
 * developer instruction, no `JourneyContextV1`, no permissioned-memory block,
 * no grounding material, no model reasoning and no auth data ever lives here.
 */

import type { AskClarification } from "@/lib/companion/clarificationDisplay";

export type CompanionRole = "user" | "assistant";

/**
 * Transient display status. `streaming` and `error` are client display state
 * only — they are never persisted, and never rendered into model history.
 */
export type CompanionMessageStatus = "streaming" | "complete" | "error";

export interface CompanionMessage {
  id: string;
  role: CompanionRole;
  content: string;
  /** ISO timestamp. */
  createdAt: string;
  status?: CompanionMessageStatus;
  /** Opaque idempotency key for the user turn. Never a trust claim. */
  clientMessageId?: string;
  /**
   * AIC-5C — display metadata for a clarification the *server* decided on.
   * Display-only: it is not sent to the model as history and is not stored as
   * hidden conversation metadata.
   */
  clarification?: AskClarification;
  /**
   * AIC-JA2 — transparency for this one completed answer: a journal block was
   * supplied to the model for it. Session-only and display-only. No journal
   * text, id, source name or date is ever carried here or persisted.
   */
  journalContextUsed?: boolean;
}

/**
 * Which continuity mode a request runs in.
 *
 * `session` — browser/session scoped only. No database row is written, and a
 * small bounded client history may be sent for coherence.
 * `persistent` — account-owned, server-authoritative. The client never sends
 * a transcript; the server loads the conversation it owns.
 */
export type CompanionHistoryMode = "session" | "persistent";

/** Bounds for the ephemeral sessionStorage transcript. */
export const SESSION_MAX_MESSAGES = 20;
export const SESSION_MAX_MESSAGE_CHARS = 2_000;
export const SESSION_MAX_PAYLOAD_CHARS = 20_000;

/** Bounds for what may reach the model as prior conversation. */
export const HISTORY_MAX_MESSAGES = 10;
export const HISTORY_MAX_MESSAGE_CHARS = 1_200;
export const HISTORY_MAX_RENDERED_CHARS = 4_000;

/** Only completed, visible turns are eligible as conversation history. */
export const isCompletedTurn = (message: CompanionMessage): boolean =>
  message.status !== "streaming" &&
  message.status !== "error" &&
  !message.clarification &&
  message.content.trim().length > 0;

/**
 * The bounded transcript a *session-mode* request may carry. Deterministic:
 * most recent completed turns first dropped from the oldest end until every
 * bound holds. The current turn is excluded by the caller, never here.
 */
export const buildSessionHistory = (
  messages: CompanionMessage[],
): Array<{ role: CompanionRole; content: string }> => {
  const eligible = messages.filter(isCompletedTurn);
  const trimmed = eligible.slice(-HISTORY_MAX_MESSAGES).map((message) => ({
    role: message.role,
    content: message.content.trim().slice(0, HISTORY_MAX_MESSAGE_CHARS),
  }));

  let total = trimmed.reduce((sum, item) => sum + item.content.length, 0);
  while (trimmed.length > 0 && total > HISTORY_MAX_RENDERED_CHARS) {
    total -= trimmed[0].content.length;
    trimmed.shift();
  }
  return trimmed;
};

/** A deterministic, non-AI conversation label taken from the first question. */
export const conversationTitleFrom = (messages: CompanionMessage[]): string => {
  const first = messages.find((message) => message.role === "user" && message.content.trim());
  if (!first) return "New conversation";
  const text = first.content.trim().replace(/\s+/g, " ");
  return text.length > 60 ? `${text.slice(0, 57)}…` : text;
};

export const newMessageId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
