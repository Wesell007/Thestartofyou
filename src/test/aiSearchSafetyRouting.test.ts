/**
 * AIC-5A — endpoint-level proof that a deterministic RED/CRISIS decision can
 * never be suppressed by ordinary rate limiting, limiter failure, recap mode or
 * the AI kill switch, and that GREEN behaviour is unchanged.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { capturedHandler } from "@/test/stubs/denoStdServe";
import { DAY_RECAP_UNAVAILABLE_ANSWER } from "../../supabase/functions/_shared/aiModes";
import { AI_PAUSED_ANSWER } from "../../supabase/functions/_shared/urgentPatterns";

const ESCALATION_WORDING = /nhs\s?111|\b999\b|A&E|maternity unit|emergency|helpline/i;

const env: Record<string, string> = {
  LOVABLE_API_KEY: "test-key",
  SUPABASE_URL: "https://backend.test",
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
};

(globalThis as unknown as { Deno: unknown }).Deno = {
  env: { get: (key: string) => env[key] },
};

type LimiterMode = "allow" | "deny" | "error";
let limiterMode: LimiterMode = "allow";
let requestedUrls: string[] = [];
let modelCalls = 0;
let limiterCalls = 0;

const sse = (content: string) =>
  new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\ndata: [DONE]\n\n`,
          ),
        );
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } },
  );

const fetchStub = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : input.toString();
  requestedUrls.push(url);
  if (url.includes("consume_ai_rate_limit")) {
    limiterCalls += 1;
    if (limiterMode === "error") return new Response("boom", { status: 500 });
    return new Response(
      JSON.stringify([{ allowed: limiterMode === "allow", retry_after_seconds: 30 }]),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  if (url.includes("ai.gateway.lovable.dev")) {
    modelCalls += 1;
    return sse("A general answer.");
  }
  return new Response("<main>" + "grounding evidence. ".repeat(40) + "</main>", {
    headers: { "Content-Type": "text/html" },
  });
});

vi.stubGlobal("fetch", fetchStub);

const endpointModule = "../../supabase/functions/ai-search/index.ts";
await import(/* @vite-ignore */ endpointModule);

const post = (body: Record<string, unknown>) =>
  capturedHandler()(
    new Request("https://backend.test/functions/v1/ai-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

const readStream = async (response: Response) => {
  const raw = await response.text();
  return raw
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)).choices?.[0]?.delta?.content ?? "")
    .join("");
};

const CLINICAL = "My baby has blue lips";
const CRISIS = "I cannot keep myself safe";
const ABUSE = "Someone at home is hurting me";
const GREEN = "What helps with heartburn?";

const groundingCalls = () => requestedUrls.filter((url) => url.includes("nhs.uk")).length;

beforeEach(() => {
  limiterMode = "allow";
  requestedUrls = [];
  modelCalls = 0;
  limiterCalls = 0;
  fetchStub.mockClear();
  delete env.AI_SEARCH_DISABLED;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("deterministic safety survives ordinary rate limiting", () => {
  it.each([CLINICAL, CRISIS, ABUSE])("answers %s when the ordinary quota is exhausted", async (query) => {
    limiterMode = "deny";
    const response = await post({ query });
    expect(response.status).toBe(200);
    expect(await readStream(response)).toMatch(ESCALATION_WORDING);
    expect(modelCalls).toBe(0);
    expect(groundingCalls()).toBe(0);
  });

  it.each([CLINICAL, CRISIS])("answers %s when the rate limiter is unavailable", async (query) => {
    limiterMode = "error";
    const response = await post({ query });
    expect(response.status).toBe(200);
    expect(await readStream(response)).toMatch(ESCALATION_WORDING);
    expect(modelCalls).toBe(0);
  });

  it("does not call the limiter at all on the deterministic branch", async () => {
    await post({ query: CLINICAL });
    expect(limiterCalls).toBe(0);
  });

  it("keeps the ordinary 429 for a green request over quota", async () => {
    limiterMode = "deny";
    const response = await post({ query: GREEN });
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("30");
    expect(modelCalls).toBe(0);
  });

  it("keeps the ordinary 503 for a green request when the limiter fails", async () => {
    limiterMode = "error";
    const response = await post({ query: GREEN });
    expect(response.status).toBe(503);
    expect(modelCalls).toBe(0);
  });
});

describe("mode cannot downgrade a deterministic decision", () => {
  it("escalates a crafted recap request with a clinical match", async () => {
    const response = await post({
      query: "Day: 2026-08-19. Moment: his lips looked blue for a moment.",
      mode: "first_year_day_recap",
    });
    const body = await readStream(response);
    expect(body).toMatch(ESCALATION_WORDING);
    expect(body).not.toBe(DAY_RECAP_UNAVAILABLE_ANSWER);
  });

  it("escalates a crafted recap request with a crisis match", async () => {
    const response = await post({
      query: "Day: 2026-08-19. Moment: I cannot keep myself safe.",
      mode: "first_year_day_recap",
    });
    const body = await readStream(response);
    expect(body).toMatch(ESCALATION_WORDING);
    expect(body).not.toBe(DAY_RECAP_UNAVAILABLE_ANSWER);
  });

  it("leaves an ordinary recap request on the normal model path", async () => {
    const response = await post({
      query: "Day: 2026-08-19. Logged: 2 feeds, 1 nappy change.",
      mode: "first_year_day_recap",
    });
    expect(await readStream(response)).toBeTruthy();
    expect(modelCalls).toBe(1);
    expect(groundingCalls()).toBe(0);
  });

  it("ignores page context on a deterministic match", async () => {
    const response = await post({
      query: CLINICAL,
      context: "The reader is on a calm sleep guidance page.",
    });
    expect(await readStream(response)).toMatch(ESCALATION_WORDING);
    expect(modelCalls).toBe(0);
  });

});

describe("kill switch ordering", () => {
  it.each([CLINICAL, CRISIS, ABUSE])("still answers %s while the companion is paused", async (query) => {
    env.AI_SEARCH_DISABLED = "true";
    const body = await readStream(await post({ query }));
    expect(body).toMatch(ESCALATION_WORDING);
    expect(body).not.toBe(AI_PAUSED_ANSWER);
    expect(modelCalls).toBe(0);
  });

  it("keeps the paused answer for a green request", async () => {
    env.AI_SEARCH_DISABLED = "true";
    expect(await readStream(await post({ query: GREEN }))).toBe(AI_PAUSED_ANSWER);
    expect(modelCalls).toBe(0);
  });
});
