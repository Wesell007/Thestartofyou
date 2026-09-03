/**
 * AIC-5C — endpoint-level proof that the shared clarification/unsupported
 * boundary is server-owned, runs on the GREEN path only, sits after ordinary
 * quota and the kill switch, and reports itself through explicit structured
 * headers rather than prose markers.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { capturedHandler } from "@/test/stubs/denoStdServe";
import { AI_PAUSED_ANSWER } from "../../supabase/functions/_shared/urgentPatterns";
import { UNSUPPORTED_ANSWERS } from "../../supabase/functions/_shared/companionBoundaryRules";

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

const groundingCalls = () => requestedUrls.filter((url) => url.includes("nhs.uk")).length;

beforeEach(() => {
  limiterMode = "allow";
  requestedUrls = [];
  modelCalls = 0;
  fetchStub.mockClear();
  delete env.AI_SEARCH_DISABLED;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("clarification is decided and answered by the server", () => {
  it("returns the clarifying question with explicit structured headers", async () => {
    const response = await post({ query: "sleep" });
    expect(response.status).toBe(200);
    expect(response.headers.get("X-Companion-Boundary")).toBe("clarify");
    expect(response.headers.get("X-Companion-Clarification-Topic")).toBe("sleep");
    expect(await readStream(response)).toMatch(/safer sleep/i);
    expect(modelCalls).toBe(0);
    expect(groundingCalls()).toBe(0);
  });

  it("exposes the boundary headers to the browser", async () => {
    const response = await post({ query: "sleep" });
    expect(response.headers.get("Access-Control-Expose-Headers")).toContain("X-Companion-Boundary");
    expect(response.headers.get("Access-Control-Expose-Headers")).toContain(
      "X-Companion-Clarification-Topic",
    );
  });

  it("never encodes the decision in the answer prose", async () => {
    const body = await readStream(await post({ query: "feeding" }));
    expect(body).not.toMatch(/clarif|boundary|unsupported|\[\[|<</i);
  });

  it("uses the bounded session history as a referent instead of clarifying", async () => {
    const response = await post({
      query: "sleep",
      sessionHistory: [
        { role: "user", content: "How much sleep does a six month old need?" },
        { role: "assistant", content: "Most babies sleep about 12 to 15 hours in total." },
      ],
    });
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect(modelCalls).toBe(1);
  });

  it("leaves an ordinary question on the model path with no boundary header", async () => {
    const response = await post({ query: "What helps with heartburn?" });
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect(modelCalls).toBe(1);
  });
});

describe("unsupported capability boundaries", () => {
  it("answers a diagnosis request deterministically", async () => {
    const response = await post({ query: "Diagnose me." });
    expect(response.headers.get("X-Companion-Boundary")).toBe("unsupported");
    expect(response.headers.get("X-Companion-Clarification-Topic")).toBeNull();
    expect(await readStream(response)).toBe(UNSUPPORTED_ANSWERS.diagnosis);
    expect(modelCalls).toBe(0);
  });

  it("answers an external-action request deterministically", async () => {
    const response = await post({ query: "Call my midwife for me." });
    expect(response.headers.get("X-Companion-Boundary")).toBe("unsupported");
    expect(await readStream(response)).toBe(UNSUPPORTED_ANSWERS.contact_clinician);
    expect(modelCalls).toBe(0);
    expect(groundingCalls()).toBe(0);
  });
});

describe("ordering — safety, quota and kill switch keep their authority", () => {
  it("gives a clinical question the deterministic safety answer, never a clarification", async () => {
    const response = await post({ query: "reduced movements" });
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect(await readStream(response)).toMatch(ESCALATION_WORDING);
    expect(modelCalls).toBe(0);
  });

  it("does not clarify a crisis disclosure", async () => {
    const response = await post({ query: "I cannot keep myself safe" });
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect(await readStream(response)).toMatch(ESCALATION_WORDING);
  });

  it("still applies the ordinary quota before the boundary router", async () => {
    limiterMode = "deny";
    const response = await post({ query: "sleep" });
    expect(response.status).toBe(429);
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect(modelCalls).toBe(0);
  });

  it("keeps the kill switch above the boundary router", async () => {
    env.AI_SEARCH_DISABLED = "true";
    const response = await post({ query: "sleep" });
    expect(await readStream(response)).toBe(AI_PAUSED_ANSWER);
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect(modelCalls).toBe(0);
  });
});
