import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { parseAiSearchBody } from "../_shared/validation.ts";
import { DAY_RECAP_UNAVAILABLE_ANSWER, getAiModeConfig } from "../_shared/aiModes.ts";
import { AI_MODEL_ID, AI_VERSION_SUMMARY } from "../_shared/aiVersions.ts";
import { selectSources } from "../_shared/aiSources.ts";
import { AI_PAUSED_ANSWER, isAiDisabled, matchUrgent, urgentAnswer } from "../_shared/urgentPatterns.ts";

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

  const { query, context, mode } = parsed.value;
  const modeConfig = getAiModeConfig(mode);

  if (matchUrgent(query)) {
    // Recap-only surfaces never receive the escalation answer. They get a short
    // controlled fallback instead, and the model is not called at all.
    return sseAnswer(
      req,
      modeConfig.allowUrgentEscalationAnswer ? urgentAnswer(query) : DAY_RECAP_UNAVAILABLE_ANSWER,
    );
  }

  // Phase 29D kill switch. Checked after hard escalation so a red or crisis
  // question still receives its escalation answer while the companion is paused.
  if (isAiDisabled(Deno.env.get("AI_SEARCH_DISABLED"))) {
    return sseAnswer(
      req,
      modeConfig.allowUrgentEscalationAnswer ? AI_PAUSED_ANSWER : DAY_RECAP_UNAVAILABLE_ANSWER,
    );
  }

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("ai-search configuration error: LOVABLE_API_KEY is missing");
    return json(req, { error: "Guidance is temporarily unavailable. Please try again." }, 503);
  }

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
  const userContent = [
    "<user_question>", query, "</user_question>",
    context ? `<journey_context>\n${context}\n</journey_context>` : "",
    evidence ? `<background_material>\n${evidence}\n</background_material>` : "",
  ].filter(Boolean).join("\n");

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL_ID,
        messages: [{ role: "system", content: modeConfig.systemPrompt }, { role: "user", content: userContent }],
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

    return new Response(response.body, {
      headers: { ...headers, "Content-Type": "text/event-stream", "X-Content-Type-Options": "nosniff" },
    });
  } catch (error) {
    if (req.signal.aborted) return json(req, { error: "Request cancelled." }, 499);
    console.error("ai-search provider request failed", error instanceof Error ? error.message : "unknown error");
    return json(req, { error: "Guidance is temporarily unavailable. Please try again." }, 502);
  }
});
