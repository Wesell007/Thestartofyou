import { type AiMode, resolveAiMode } from "./aiModes.ts";

export const AI_QUERY_MAX_LENGTH = 1_000;
export const AI_CONTEXT_MAX_LENGTH = 500;
export const REFLECTION_MAX_LENGTH = 5_000;
export const REFLECTION_DRAFT_MAX_LENGTH = 1_500;

type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const boundedString = (
  value: unknown,
  label: string,
  min: number,
  max: number,
): ValidationResult<string> => {
  if (typeof value !== "string") return { ok: false, error: `${label} must be text.` };
  const trimmed = value.trim();
  if (trimmed.length < min) return { ok: false, error: `${label} is too short.` };
  if (trimmed.length > max) return { ok: false, error: `${label} is too long.` };
  return { ok: true, value: trimmed };
};

export const parseAiSearchBody = (
  body: unknown,
): ValidationResult<{ query: string; context?: string; mode: AiMode }> => {
  if (!isRecord(body)) return { ok: false, error: "Request body must be a JSON object." };
  const query = boundedString(body.query, "Question", 2, AI_QUERY_MAX_LENGTH);
  if (query.ok === false) return { ok: false, error: query.error };

  // An absent or unknown mode is never an error: it resolves to `general`, so
  // callers written before modes existed keep working unchanged.
  const mode = resolveAiMode(body.mode);

  if (body.context === undefined || body.context === null || body.context === "") {
    return { ok: true, value: { query: query.value, mode } };
  }
  const context = boundedString(body.context, "Context", 1, AI_CONTEXT_MAX_LENGTH);
  if (context.ok === false) return { ok: false, error: context.error };
  return { ok: true, value: { query: query.value, context: context.value, mode } };
};

export const parseReflectBody = (
  body: unknown,
): ValidationResult<{ rawThoughts: string; week?: number }> => {
  if (!isRecord(body)) return { ok: false, error: "Request body must be a JSON object." };
  const rawThoughts = boundedString(body.rawThoughts, "Reflection", 2, REFLECTION_MAX_LENGTH);
  if (rawThoughts.ok === false) return { ok: false, error: rawThoughts.error };

  if (body.week === undefined || body.week === null || body.week === "") {
    return { ok: true, value: { rawThoughts: rawThoughts.value } };
  }
  if (!Number.isInteger(body.week) || (body.week as number) < 1 || (body.week as number) > 42) {
    return { ok: false, error: "Week must be a whole number from 1 to 42." };
  }
  return { ok: true, value: { rawThoughts: rawThoughts.value, week: body.week as number } };
};

export const validateReflectionDraft = (draft: unknown): ValidationResult<string> => {
  const text = boundedString(draft, "Draft", 1, REFLECTION_DRAFT_MAX_LENGTH);
  if (!text.ok) return { ok: false, error: "The reflection service returned an invalid draft." };
  if (/^\s*(?:#{1,6}|[-*+]\s|\d+[.)]\s)/m.test(text.value)) {
    return { ok: false, error: "The reflection service returned an invalid draft." };
  }
  const sentences: string[] = text.value.match(/[^.!?]+[.!?]+(?:["')\]]+)?|[^.!?]+$/g) ?? [];
  if (sentences.filter((sentence) => sentence.trim()).length > 4) {
    return { ok: false, error: "The reflection service returned an invalid draft." };
  }
  return text;
};

export type EmailQueuePayload = {
  message_id: string;
  idempotency_key: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  sender_domain?: string;
  purpose?: string;
  label?: string;
  run_id?: string;
  unsubscribe_token?: string;
  queued_at?: string;
};

export const parseEmailQueuePayload = (body: unknown): ValidationResult<EmailQueuePayload> => {
  if (!isRecord(body)) return { ok: false, error: "Queue payload must be an object." };
  const messageId = boundedString(body.message_id, "message_id", 1, 200);
  if (messageId.ok === false) return { ok: false, error: messageId.error };
  const to = boundedString(body.to, "Recipient", 3, 320);
  if (!to.ok || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.value)) {
    return { ok: false, error: "Recipient email is invalid." };
  }
  const subject = boundedString(body.subject, "Subject", 1, 998);
  if (subject.ok === false) return { ok: false, error: subject.error };

  const html = typeof body.html === "string" && body.html.trim() ? body.html : undefined;
  const text = typeof body.text === "string" && body.text.trim() ? body.text : undefined;
  if (!html && !text) return { ok: false, error: "Email content is missing." };
  if ((html?.length ?? 0) > 500_000 || (text?.length ?? 0) > 200_000) {
    return { ok: false, error: "Email content is too large." };
  }

  const optional = (key: string, max = 500): string | undefined => {
    const value = body[key];
    return typeof value === "string" && value.trim() && value.length <= max
      ? value.trim()
      : undefined;
  };
  const queuedAt = optional("queued_at", 100);
  if (queuedAt && Number.isNaN(Date.parse(queuedAt))) {
    return { ok: false, error: "queued_at is invalid." };
  }

  return {
    ok: true,
    value: {
      message_id: messageId.value,
      idempotency_key: optional("idempotency_key", 200) ?? messageId.value,
      to: to.value,
      subject: subject.value,
      html,
      text,
      from: optional("from", 320),
      sender_domain: optional("sender_domain", 253),
      purpose: optional("purpose", 100),
      label: optional("label", 200),
      run_id: optional("run_id", 200),
      unsubscribe_token: optional("unsubscribe_token", 500),
      queued_at: queuedAt,
    },
  };
};
