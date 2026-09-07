import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { parseAiSearchBody } from "../_shared/validation.ts";
import { DAY_RECAP_UNAVAILABLE_ANSWER, getAiModeConfig } from "../_shared/aiModes.ts";
import { AI_MODEL_ID, AI_VERSION_SUMMARY } from "../_shared/aiVersions.ts";
import { selectSources } from "../_shared/aiSources.ts";
import {
  JOURNEY_CONTEXT_INSTRUCTIONS,
  renderJourneyContextBlock,
} from "../_shared/aiJourneyContext.ts";
import { AI_PAUSED_ANSWER, isAiDisabled } from "../_shared/urgentPatterns.ts";
import { decideSafety } from "../_shared/safetyRouter.ts";
import { isDeterministicSafetyDecision } from "../_shared/safetyState.ts";
import { decideBoundary } from "../_shared/companionBoundaryRules.ts";
import { decideAmberEligibility } from "../_shared/amberEligibility.ts";
import { classifyAmber, isAmberClassifierEnabled } from "../_shared/amberClassifier.ts";
import {
  AMBER_SAFETY_GUIDANCE,
  CAUTIOUS_UNCERTAINTY_GUIDANCE,
  GLOBAL_REASSURANCE_RULE,
} from "../_shared/amberGuidance.ts";

import { resolveEmotionalEvidence } from "../_shared/emotionalEvidence.ts";
import { renderEmotionalGuidance } from "../_shared/emotionalGuidance.ts";
import {
  MEMORY_INSTRUCTIONS,
  renderMemoryBlock,
  type MemoryRecord,
} from "../_shared/aiMemory.ts";
import {
  CONVERSATION_HISTORY_INSTRUCTIONS,
  HISTORY_MAX_MESSAGES,
  renderConversationHistory,
  type ConversationTurn,
} from "../_shared/aiConversationHistory.ts";

// Internal traceability only: version data is logged once per cold start and
// never reaches a browser or an answer.
console.log("ai-search versions", JSON.stringify(AI_VERSION_SUMMARY));


const DEFAULT_ORIGINS = [
  "https://thestartofyou.com",
  "https://www.thestartofyou.com",
  "http://localhost:8080",
];

const allowedOrigins = () => new Set([
  ...DEFAULT_ORIGINS,
  ...(Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((value) => value.trim()).filter(Boolean),
]);

const responseHeaders = (req: Request) => {
  const origin = req.headers.get("origin");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    // AIC-4: lets the browser learn which stored conversation an answer joined.
    // AIC-5C: explicit structured boundary metadata — never encoded in prose.
    // AIC-J5: an opaque presentation permission. It says only whether the
    // ordinary journey next-action UI may render, and never carries a safety
    // state, category, score, rule, reason or classifier result.
    "Access-Control-Expose-Headers":
      "X-Conversation-Id, X-Companion-Boundary, X-Companion-Clarification-Topic, X-Companion-Next-Actions",



    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  if (origin && allowedOrigins().has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
};

const json = (req: Request, body: Record<string, unknown>, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...responseHeaders(req), "Content-Type": "application/json", ...extra },
  });


const htmlToEvidence = (html: string) => {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return main
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 10_000);
};

const fetchGrounding = async (urls: string[], signal: AbortSignal) => {
  const results = await Promise.allSettled(urls.map(async (url) => {
    const response = await fetch(url, {
      headers: { Accept: "text/html", "User-Agent": "TheStartOfYou-Guidance/1.0" },
      signal,
    });
    if (!response.ok) throw new Error(`Grounding source returned ${response.status}`);
    const evidence = htmlToEvidence(await response.text());
    if (evidence.length < 200) throw new Error("Grounding source returned insufficient content");
    // The URL is deliberately not passed to the model: nothing in the answer
    // may reference or print a source address.
    return `<background>\n${evidence}\n</background>`;
  }));

  const documents = results
    .filter((result): result is PromiseFulfilledResult<string> => result.status === "fulfilled")
    .map((result) => result.value);
  if (documents.length === 0) {
    throw new Error("All grounding sources were unavailable");
  }
  return documents.join("\n");
};

const sseAnswer = (req: Request, content: string) => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { ...responseHeaders(req), "Content-Type": "text/event-stream", "X-Content-Type-Options": "nosniff" },
  });
};

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const consumeRateLimit = async (req: Request): Promise<{ allowed: boolean; retryAfter: number }> => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) throw new Error("Rate limiter is not configured");

  const address = req.headers.get("cf-connecting-ip")
    ?? req.headers.get("x-real-ip")
    ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
  const fingerprint = await sha256(`${Deno.env.get("AI_RATE_LIMIT_SALT") ?? "tsoy-ai"}:${address}:${req.headers.get("user-agent") ?? "unknown"}`);

  const limits = [
    { suffix: "minute", limit: 12, seconds: 60 },
    { suffix: "hour", limit: 100, seconds: 3_600 },
  ];
  let retryAfter = 0;
  for (const limit of limits) {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/consume_ai_rate_limit`, {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        p_key: `${fingerprint}:${limit.suffix}`,
        p_limit: limit.limit,
        p_window_seconds: limit.seconds,
      }),
      signal: req.signal,
    });
    if (!response.ok) throw new Error(`Rate limiter returned ${response.status}`);
    const result = await response.json();
    const row = Array.isArray(result) ? result[0] : result;
    if (!row?.allowed) {
      retryAfter = Math.max(retryAfter, Number(row?.retry_after_seconds) || limit.seconds);
    }
  }
  return { allowed: retryAfter === 0, retryAfter };
};


/**
 * AIC-3 — permissioned memory retrieval.
 *
 * Authoritative kill switch: without AI_MEMORY_ENABLED=true nothing is
 * queried and no memory block can exist. Identity comes only from a verified
 * Supabase access token; a user id is never accepted from the request body.
 * Retrieval runs through a user-scoped PostgREST call carrying that token, so
 * row-level security stays active — the service role is not used here.
 *
 * Fails open: any problem means the answer is produced without memory.
 */
const isMemoryEnabled = () => (Deno.env.get("AI_MEMORY_ENABLED") ?? "").trim().toLowerCase() === "true";

const bearerToken = (req: Request): string | null => {
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  const token = match?.[1]?.trim();
  if (!token) return null;
  // The anonymous publishable key is not a user session.
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (anonKey && token === anonKey) return null;
  return token;
};

const loadPermissionedMemory = async (req: Request): Promise<string> => {
  if (!isMemoryEnabled()) return "";
  const token = bearerToken(req);
  if (!token) return "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) return "";

  try {
    // 1. Verify the token with Supabase auth. Client claims are never trusted.
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: req.signal,
    });
    if (!userResponse.ok) return "";
    const user = await userResponse.json();
    if (!user?.id) return "";

    // 2. Read through the verified user's own token so RLS applies. No
    //    service role, no user id from the browser, no manual filter.
    const rows = await fetch(
      `${supabaseUrl}/rest/v1/companion_memories?select=value,category,updated_at&order=updated_at.desc&limit=24`,
      { headers: { apikey: anonKey, Authorization: `Bearer ${token}` }, signal: req.signal },
    );
    if (!rows.ok) return "";
    const records = (await rows.json()) as MemoryRecord[];
    if (!Array.isArray(records) || records.length === 0) return "";
    return renderMemoryBlock(records);
  } catch (error) {
    if (req.signal.aborted) return "";
    // Counts only; a memory value is never logged.
    console.error("ai-search memory unavailable", error instanceof Error ? error.name : "unknown error");
    return "";
  }
};

/**
 * AIC-4 — account-owned conversation continuity.
 *
 * Authoritative kill switch: without AI_CONVERSATION_HISTORY_ENABLED=true no
 * row is ever written or read, whatever the browser asks for. Persistence
 * additionally requires an explicit `historyMode: "persistent"` request and a
 * verified user token, so an anonymous visitor can never create a row.
 *
 * Every call runs through PostgREST with the *user's own* token, so row-level
 * security is the boundary. The service role is not used, and a user id is
 * never taken from the request body.
 */
const isConversationHistoryEnabled = () =>
  (Deno.env.get("AI_CONVERSATION_HISTORY_ENABLED") ?? "").trim().toLowerCase() === "true";

interface ConversationContext {
  token: string;
  supabaseUrl: string;
  anonKey: string;
  conversationId: string;
}

const restHeaders = (ctx: ConversationContext, extra: Record<string, string> = {}) => ({
  apikey: ctx.anonKey,
  Authorization: `Bearer ${ctx.token}`,
  "Content-Type": "application/json",
  ...extra,
});

const verifyUserId = async (req: Request, token: string, supabaseUrl: string, anonKey: string) => {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
    signal: req.signal,
  });
  if (!response.ok) return null;
  const user = await response.json();
  return typeof user?.id === "string" ? (user.id as string) : null;
};

type ConversationSetup =
  | { ok: true; ctx: ConversationContext | null }
  | { ok: false; status: number; error: string };

const establishConversation = async (
  req: Request,
  historyMode: "session" | "persistent",
  conversationId: string | undefined,
): Promise<ConversationSetup> => {
  if (historyMode !== "persistent" || !isConversationHistoryEnabled()) return { ok: true, ctx: null };
  const token = bearerToken(req);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  // No verified session means no persistence at all: the request simply
  // continues as an ordinary session-mode answer.
  if (!token || !supabaseUrl || !anonKey) return { ok: true, ctx: null };

  try {
    const userId = await verifyUserId(req, token, supabaseUrl, anonKey);
    if (!userId) return { ok: true, ctx: null };

    if (conversationId) {
      // A conversation the caller does not own is invisible under RLS, so this
      // returns nothing. It is refused rather than quietly adopted.
      const existing = await fetch(
        `${supabaseUrl}/rest/v1/companion_conversations?select=id&id=eq.${conversationId}&limit=1`,
        { headers: { apikey: anonKey, Authorization: `Bearer ${token}` }, signal: req.signal },
      );
      if (!existing.ok) return { ok: true, ctx: null };
      const rows = await existing.json();
      if (!Array.isArray(rows) || rows.length === 0) {
        return { ok: false, status: 404, error: "That conversation is not available on this account." };
      }
      return { ok: true, ctx: { token, supabaseUrl, anonKey, conversationId } };
    }

    // `user_id` is deliberately omitted: the column defaults to auth.uid().
    const created = await fetch(`${supabaseUrl}/rest/v1/companion_conversations`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({}),
      signal: req.signal,
    });
    if (!created.ok) return { ok: true, ctx: null };
    const createdRows = await created.json();
    const newId = Array.isArray(createdRows) ? createdRows[0]?.id : null;
    if (typeof newId !== "string") return { ok: true, ctx: null };
    return { ok: true, ctx: { token, supabaseUrl, anonKey, conversationId: newId } };
  } catch (error) {
    if (req.signal.aborted) return { ok: true, ctx: null };
    console.error("ai-search conversation unavailable", error instanceof Error ? error.name : "unknown error");
    return { ok: true, ctx: null };
  }
};

/** Idempotent: a retry with the same client message id inserts nothing new. */
const persistMessage = async (
  req: Request,
  ctx: ConversationContext,
  role: "user" | "assistant",
  content: string,
  clientMessageId?: string,
): Promise<void> => {
  const trimmed = content.trim();
  if (!trimmed) return;
  try {
    await fetch(`${ctx.supabaseUrl}/rest/v1/companion_messages`, {
      method: "POST",
      headers: restHeaders(ctx, { Prefer: "resolution=ignore-duplicates,return=minimal" }),
      body: JSON.stringify({
        conversation_id: ctx.conversationId,
        role,
        content: trimmed.slice(0, 8_000),
        ...(clientMessageId ? { client_message_id: clientMessageId } : {}),
      }),
    });
  } catch (error) {
    // Persistence never blocks an answer, and message text is never logged.
    console.error("ai-search message not stored", error instanceof Error ? error.name : "unknown error");
  }
};

/**
 * Server-authoritative history: the transcript comes from the database, never
 * from the browser. The current turn is excluded by client message id.
 */
const loadConversationTurns = async (
  req: Request,
  ctx: ConversationContext,
  clientMessageId: string | undefined,
): Promise<ConversationTurn[]> => {
  try {
    const rows = await fetch(
      `${ctx.supabaseUrl}/rest/v1/companion_messages?select=role,content,client_message_id,created_at` +
        `&conversation_id=eq.${ctx.conversationId}&order=created_at.desc&limit=${HISTORY_MAX_MESSAGES + 2}`,
      { headers: restHeaders(ctx), signal: req.signal },
    );
    if (!rows.ok) return [];
    const records = await rows.json();
    if (!Array.isArray(records)) return [];
    return records
      .filter((row) => (row.role === "user" || row.role === "assistant") && typeof row.content === "string")
      .filter((row) => !clientMessageId || row.client_message_id !== clientMessageId)
      .reverse()
      .map((row) => ({ role: row.role as "user" | "assistant", content: row.content as string }));
  } catch (error) {
    if (req.signal.aborted) return [];
    console.error("ai-search history unavailable", error instanceof Error ? error.name : "unknown error");
    return [];
  }
};

/**
 * Passes the provider stream straight through while accumulating the answer,
 * so only a stream that actually completes is stored. An aborted or failed
 * stream leaves no assistant row.
 */
const persistOnComplete = (
  req: Request,
  ctx: ConversationContext,
  body: ReadableStream<Uint8Array>,
): ReadableStream<Uint8Array> => {
  const decoder = new TextDecoder();
  let answer = "";
  let completed = false;
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        controller.enqueue(chunk);
        const text = decoder.decode(chunk, { stream: true });
        for (const line of text.split("\n")) {
          const payload = line.startsWith("data:") ? line.slice(5).trim() : "";
          if (!payload) continue;
          if (payload === "[DONE]") {
            completed = true;
            continue;
          }
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (typeof delta === "string") answer += delta;
          } catch {
            // Non-JSON keep-alive frames are ignored.
          }
        }
      },
      async flush() {
        if (!completed || req.signal.aborted) return;
        await persistMessage(req, ctx, "assistant", answer);
      },
    }),
  );
};

serve(async (req) => {
  const headers = responseHeaders(req);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return json(req, { error: "Method not allowed." }, 405, { Allow: "POST" });

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return json(req, { error: "Request body must be valid JSON." }, 400);
  }
  const parsed = parseAiSearchBody(rawBody);
  if (!parsed.ok) return json(req, { error: parsed.error }, 400);

  const { query, context, mode, journeyContext, historyMode, conversationId, clientMessageId, sessionHistory } =
    parsed.value;
  const modeConfig = getAiModeConfig(mode);

  // AIC-5A: the deterministic safety decision is taken immediately after body
  // validation, before rate limiting, before the kill switch and before any
  // mode behaviour. Nothing downstream may downgrade a RED or CRISIS result.
  const safety = decideSafety(query);

  // AIC-4 semantics are preserved on both branches: the conversation is
  // established and the visible user turn stored before any answer is sent.
  // Establishing it never influences safety severity, and on the deterministic
  // branch a persistence failure can never suppress the safety answer.
  const openConversation = async () => {
    const setup = await establishConversation(req, historyMode, conversationId);
    if (!setup.ok) return { ok: false as const, status: setup.status, error: setup.error };
    if (setup.ctx) await persistMessage(req, setup.ctx, "user", query, clientMessageId);
    return { ok: true as const, ctx: setup.ctx };
  };

  const sendControlled = async (answer: string, ctx: ConversationContext | null) => {
    if (ctx) await persistMessage(req, ctx, "assistant", answer);
    const response = sseAnswer(req, answer);
    if (ctx) response.headers.set("X-Conversation-Id", ctx.conversationId);
    return response;
  };

  if (isDeterministicSafetyDecision(safety)) {
    // No model call, no grounding fetch, no journey/memory/history enrichment,
    // and no ordinary AI quota check: this branch returns fixed controlled text
    // that quota exhaustion or limiter failure must never be able to suppress.
    let ctx: ConversationContext | null = null;
    try {
      const opened = await openConversation();
      if (opened.ok) ctx = opened.ctx;
    } catch {
      ctx = null;
    }
    try {
      return await sendControlled(safety.answer, ctx);
    } catch {
      return sseAnswer(req, safety.answer);
    }
  }

  // GREEN only: ordinary generative rate limiting is unchanged (12/min, 100/hour).
  try {
    const rateLimit = await consumeRateLimit(req);
    if (!rateLimit.allowed) {
      return json(req, { error: "Too many requests. Please try again shortly." }, 429, {
        "Retry-After": String(rateLimit.retryAfter),
      });
    }
  } catch (error) {
    if (req.signal.aborted) return json(req, { error: "Request cancelled." }, 499);
    console.error("ai-search rate limiter unavailable", error instanceof Error ? error.message : "unknown error");
    return json(req, { error: "Guidance is temporarily unavailable. Please try again." }, 503);
  }

  const setup = await openConversation();
  if (!setup.ok) return json(req, { error: setup.error }, setup.status);
  const conversation = setup.ctx;
  const conversationHeader: Record<string, string> = conversation
    ? { "X-Conversation-Id": conversation.conversationId }
    : {};

  const controlledAnswer = (answer: string) => sendControlled(answer, conversation);

  // Phase 29D kill switch, GREEN path only. RED and CRISIS have already
  // returned above, so a high-risk question still gets its deterministic
  // answer while the companion is paused.
  if (isAiDisabled(Deno.env.get("AI_SEARCH_DISABLED"))) {
    return controlledAnswer(
      modeConfig.allowUrgentEscalationAnswer ? AI_PAUSED_ANSWER : DAY_RECAP_UNAVAILABLE_ANSWER,
    );
  }

  // AIC-4: exactly one bounded history load per request. Persistent mode is
  // server-authoritative; session mode uses the bounded transcript the browser
  // supplied. It is resolved here so the AIC-5C boundary router can tell
  // whether a referent already exists, without a second transcript store and
  // without changing AIC-4 bounds. A failed load returns [], which the router
  // reads as "no usable referent" — nothing is ever fabricated.
  const priorTurns: ConversationTurn[] = conversation
    ? await loadConversationTurns(req, conversation, clientMessageId)
    : sessionHistory;

  // AIC-5C: the shared capability/clarification boundary. GREEN only, after
  // ordinary quota and the kill switch, and before any grounding or model
  // work. Structured metadata travels in explicit headers, never in prose.
  const boundary = decideBoundary({ query, priorTurns });
  if (boundary.kind !== "continue") {
    const response = await controlledAnswer(boundary.answer);
    response.headers.set("X-Companion-Boundary", boundary.kind);
    if (boundary.kind === "clarify") {
      response.headers.set("X-Companion-Clarification-Topic", boundary.topic);
    }
    return response;
  }

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("ai-search configuration error: LOVABLE_API_KEY is missing");
    return json(req, { error: "Guidance is temporarily unavailable. Please try again." }, 503);
  }

  // AIC-5D: optional structured GREEN → AMBER assessment. Deterministic
  // eligibility first, then the release-gated classifier. Routine traffic never
  // reaches the provider call, RED/CRISIS/clarify/unsupported never reach this
  // line, and no result is persisted, logged with content or sent to the client.
  const eligibility = decideAmberEligibility(query);
  let amberGuidance = "";
  if (eligibility.eligibleForAmberAssessment && isAmberClassifierEnabled(Deno.env.get("AI_AMBER_CLASSIFIER_ENABLED"))) {
    // Only prior USER-authored turns may act as evidence, and only when the
    // current wording deterministically depends on them.
    const priorUserTurns = eligibility.needsPriorUserTurn
      ? priorTurns.filter((turn) => turn.role === "user").slice(-2).map((turn) => turn.content)
      : undefined;
    const assessment = await classifyAmber({
      query,
      journeyFamily: journeyContext?.personal?.journey,
      priorUserTurns,
      apiKey,
    });
    if (assessment.kind === "amber") amberGuidance = AMBER_SAFETY_GUIDANCE;
    if (assessment.kind === "unavailable") amberGuidance = CAUTIOUS_UNCERTAINTY_GUIDANCE;
  }

  // AIC-5E: request-scoped emotional continuity. Deterministic, pure and
  // fail-open: no model call, no storage, no logging, no client exposure. It
  // runs only on the ordinary model path — RED, CRISIS, clarification and
  // unsupported answers have already returned above and are untouched.
  const emotionalGuidance = renderEmotionalGuidance(
    resolveEmotionalEvidence({ query, priorTurns }),
  );

  let evidence = "";
  if (modeConfig.useGrounding) {
    try {
      evidence = await fetchGrounding(selectSources(query, context), req.signal);
    } catch (error) {
      if (req.signal.aborted) return json(req, { error: "Request cancelled." }, 499);
      console.error("ai-search grounding unavailable", error instanceof Error ? error.message : "unknown error");
      return json(req, { error: "Verified guidance sources are temporarily unavailable. Please try again." }, 503);
    }
  }
  // AIC-2: the structured block is a separate, clearly named data section. The
  // legacy freeform context stays exactly as it was.
  const structuredJourneyContext = renderJourneyContextBlock(journeyContext);
  // AIC-3: enrichment only, and only for a request that is going to the model.
  const permissionedMemory = await loadPermissionedMemory(req);
  // AIC-4: exactly one history block, rendered from the turns already loaded
  // above.
  const conversationHistory = renderConversationHistory(priorTurns);

  const userContent = [
    "<user_question>", query, "</user_question>",
    structuredJourneyContext,
    permissionedMemory,
    conversationHistory,
    context ? `<journey_context>\n${context}\n</journey_context>` : "",
    evidence ? `<background_material>\n${evidence}\n</background_material>` : "",
  ].filter(Boolean).join("\n");


  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL_ID,
        messages: [
          {
            role: "system",
            // Interpretation rules live in the trusted layer, and only when
            // structured context is actually present.
            content: [
              modeConfig.systemPrompt,
              structuredJourneyContext ? JOURNEY_CONTEXT_INSTRUCTIONS : "",
              permissionedMemory ? MEMORY_INSTRUCTIONS : "",
              conversationHistory ? CONVERSATION_HISTORY_INSTRUCTIONS : "",
              // AIC-5E tone guidance, placed before the safety layer so the
              // safety rules remain the last and strongest instructions.
              modeConfig.allowUrgentEscalationAnswer ? emotionalGuidance : "",
              // AIC-5D trusted safety layer, last so it outranks mode, tone,
              // journey wording, memory, history and page context. Recap mode
              // answers no health question, so it is left untouched.
              modeConfig.allowUrgentEscalationAnswer ? GLOBAL_REASSURANCE_RULE : "",
              modeConfig.allowUrgentEscalationAnswer ? amberGuidance : "",
            ].filter(Boolean).join("\n\n"),

          },
          { role: "user", content: userContent },
        ],
        stream: true,
        max_tokens: 700,
        temperature: 0.2,
      }),
      signal: req.signal,
    });

    if (!response.ok) {
      const providerStatus = response.status;
      console.error("ai-search provider error", providerStatus);
      if (providerStatus === 429) return json(req, { error: "Too many requests. Please try again shortly." }, 429);
      if (providerStatus === 402) return json(req, { error: "Guidance is temporarily unavailable. Please try again later." }, 503);
      return json(req, { error: "Guidance is temporarily unavailable. Please try again." }, 502);
    }
    if (!response.body) return json(req, { error: "The guidance service returned no answer." }, 502);

    // Only a stream that reaches completion is stored.
    const stream = conversation ? persistOnComplete(req, conversation, response.body) : response.body;
    return new Response(stream, {
      headers: {
        ...headers,
        ...conversationHeader,
        "Content-Type": "text/event-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });

  } catch (error) {
    if (req.signal.aborted) return json(req, { error: "Request cancelled." }, 499);
    console.error("ai-search provider request failed", error instanceof Error ? error.message : "unknown error");
    return json(req, { error: "Guidance is temporarily unavailable. Please try again." }, 502);
  }
});
