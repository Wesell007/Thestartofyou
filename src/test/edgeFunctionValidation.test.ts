import { describe, expect, it } from "vitest";
import {
  AI_QUERY_MAX_LENGTH,
  parseAiSearchBody,
  parseEmailQueuePayload,
  parseReflectBody,
  REFLECTION_MAX_LENGTH,
  validateReflectionDraft,
} from "../../supabase/functions/_shared/validation";

describe("Edge Function request validation", () => {
  it("accepts a bounded AI question and optional context", () => {
    expect(parseAiSearchBody({ query: "  What happens next?  ", context: "week 8" })).toEqual({
      ok: true,
      value: { query: "What happens next?", context: "week 8", mode: "general", historyMode: "session", sessionHistory: [] },
    });
  });

  it("keeps a known mode and falls back to general otherwise", () => {
    expect(parseAiSearchBody({ query: "Recap", mode: "first_year_day_recap" })).toEqual({
      ok: true,
      value: { query: "Recap", mode: "first_year_day_recap", historyMode: "session", sessionHistory: [] },
    });
    expect(parseAiSearchBody({ query: "Recap", mode: "made_up" })).toEqual({
      ok: true,
      value: { query: "Recap", mode: "general", historyMode: "session", sessionHistory: [] },
    });
    expect(parseAiSearchBody({ query: "Recap" })).toEqual({
      ok: true,
      value: { query: "Recap", mode: "general", historyMode: "session", sessionHistory: [] },
    });
  });

  it("rejects empty and oversized AI questions", () => {
    expect(parseAiSearchBody({ query: " " }).ok).toBe(false);
    expect(parseAiSearchBody({ query: "x".repeat(AI_QUERY_MAX_LENGTH + 1) }).ok).toBe(false);
    expect(parseAiSearchBody({ query: "Recap", context: "x".repeat(501) }).ok).toBe(false);
  });

  it("bounds reflection text and pregnancy week", () => {
    expect(parseReflectBody({ rawThoughts: "I feel hopeful.", week: 12 }).ok).toBe(true);
    expect(parseReflectBody({ rawThoughts: "I feel hopeful.", week: 0 }).ok).toBe(false);
    expect(parseReflectBody({ rawThoughts: "x".repeat(REFLECTION_MAX_LENGTH + 1), week: 12 }).ok).toBe(false);
  });

  it("rejects reflection drafts that violate the editor-only shape", () => {
    expect(validateReflectionDraft("I feel tired. I also feel hopeful.").ok).toBe(true);
    expect(validateReflectionDraft("## Advice\n- Call your doctor").ok).toBe(false);
    expect(validateReflectionDraft("One. Two. Three. Four. Five.").ok).toBe(false);
  });

  it("requires a deliverable email payload and supplies stable idempotency", () => {
    const parsed = parseEmailQueuePayload({
      message_id: "message-1",
      to: "person@example.com",
      subject: "Your sign-in code",
      text: "123456",
    });
    expect(parsed).toMatchObject({
      ok: true,
      value: { message_id: "message-1", idempotency_key: "message-1" },
    });
    expect(parseEmailQueuePayload({ message_id: "x", to: "invalid", subject: "Hello", text: "Body" }).ok)
      .toBe(false);
    expect(parseEmailQueuePayload({ message_id: "x", to: "person@example.com", subject: "Hello" }).ok)
      .toBe(false);
  });
});
