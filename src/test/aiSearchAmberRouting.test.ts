/**
 * AIC-5D — endpoint proof that the optional assessment is selective,
 * release-gated, positioned after the AIC-5C boundary, and that it can only
 * raise caution: it never changes deterministic safety, quota, grounding or
 * the client contract.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { capturedHandler } from "@/test/stubs/denoStdServe";
import {
  AMBER_SAFETY_GUIDANCE,
  CAUTIOUS_UNCERTAINTY_GUIDANCE,
  GLOBAL_REASSURANCE_RULE,
} from "../../supabase/functions/_shared/amberGuidance";

const env: Record<string, string> = {
  LOVABLE_API_KEY: "test-key",
  SUPABASE_URL: "https://backend.test",
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
};

(globalThis as unknown as { Deno: unknown }).Deno = {
  env: { get: (key: string) => env[key] },
};

type AssessmentMode = "amber" | "green" | "fail";
let assessmentMode: AssessmentMode = "amber";
let assessmentCalls = 0;
let systemPrompts: string[] = [];

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

const fetchStub = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.toString();
  if (url.includes("consume_ai_rate_limit")) {
    return new Response(JSON.stringify([{ allowed: true, retry_after_seconds: 0 }]), {
      headers: { "Content-Type": "application/json" },
    });
  }
  if (url.includes("ai.gateway.lovable.dev")) {
    const body = JSON.parse((init?.body as string) ?? "{}");
    if (body.response_format) {
      assessmentCalls += 1;
      if (assessmentMode === "fail") return new Response("boom", { status: 500 });
      return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ state: assessmentMode }) } }] }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    systemPrompts.push(body.messages?.[0]?.content ?? "");
    return sse("A general answer.");
  }
  return new Response("<main>" + "grounding evidence. ".repeat(40) + "</main>", {
    headers: { "Content-Type": "text/html" },
  });
});

vi.stubGlobal("fetch", fetchStub);

await import(/* @vite-ignore */ "../../supabase/functions/ai-search/index.ts");

const post = (body: Record<string, unknown>) =>
  capturedHandler()(
    new Request("https://backend.test/functions/v1/ai-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

const drain = async (response: Response) => {
  await response.text();
  return response;
};

beforeEach(() => {
  assessmentMode = "amber";
  assessmentCalls = 0;
  systemPrompts = [];
  fetchStub.mockClear();
  delete env.AI_SEARCH_DISABLED;
  env.AI_AMBER_CLASSIFIER_ENABLED = "true";
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("release gating", () => {
  it("makes no assessment call when the server flag is off", async () => {
    delete env.AI_AMBER_CLASSIFIER_ENABLED;
    await drain(await post({ query: "i am worried about how sore my back has been" }));
    expect(assessmentCalls).toBe(0);
    expect(systemPrompts[0]).not.toContain(AMBER_SAFETY_GUIDANCE);
  });
});

describe("selective eligibility at the endpoint", () => {
  it("skips the assessment for routine informational questions", async () => {
    await drain(await post({ query: "when do most babies start weaning" }));
    expect(assessmentCalls).toBe(0);
  });

  it("assesses an eligible personal concern and raises caution", async () => {
    await drain(await post({ query: "i am worried about how sore my back has been" }));
    expect(assessmentCalls).toBe(1);
    expect(systemPrompts[0]).toContain(AMBER_SAFETY_GUIDANCE);
  });

  it("leaves a green assessment as an ordinary answer", async () => {
    assessmentMode = "green";
    await drain(await post({ query: "i am worried about packing my hospital bag in time" }));
    expect(assessmentCalls).toBe(1);
    expect(systemPrompts[0]).not.toContain(AMBER_SAFETY_GUIDANCE);
    expect(systemPrompts[0]).not.toContain(CAUTIOUS_UNCERTAINTY_GUIDANCE);
  });

  it("falls back to cautious guidance when the assessment cannot complete", async () => {
    assessmentMode = "fail";
    await drain(await post({ query: "i have had a headache since yesterday" }));
    expect(systemPrompts[0]).toContain(CAUTIOUS_UNCERTAINTY_GUIDANCE);
  });
});

describe("boundaries preserved", () => {
  it("never assesses a deterministic urgent message", async () => {
    const response = await post({ query: "i have heavy bleeding with clots and severe pain" });
    await response.text();
    expect(assessmentCalls).toBe(0);
    expect(systemPrompts).toHaveLength(0);
  });

  it("never assesses a clarification or unsupported request", async () => {
    await (await post({ query: "sleep" })).text();
    await (await post({ query: "book me a midwife appointment" })).text();
    expect(assessmentCalls).toBe(0);
  });

  it("adds no headers and keeps the client contract unchanged", async () => {
    const response = await drain(await post({ query: "i am worried about how sore my back has been" }));
    expect(response.headers.get("X-Companion-Boundary")).toBeNull();
    expect([...response.headers.keys()].some((key) => key.toLowerCase().includes("amber"))).toBe(false);
  });

  it("applies the global reassurance rule to ordinary answers too", async () => {
    await drain(await post({ query: "when do most babies start weaning" }));
    expect(systemPrompts[0]).toContain(GLOBAL_REASSURANCE_RULE);
  });
});

const occurrences = (haystack: string, needle: string) => haystack.split(needle).length - 1;

/**
 * AIC-5D closure evidence — first-year restraint must never be able to defeat
 * the trusted safety layer, and must stay intact when nothing raised caution.
 */
describe("first-year conflict", () => {
  it("injects the trusted guidance exactly once in ordinary first-year mode", async () => {
    await drain(
      await post({ query: "i am worried about how hot my baby has felt today", mode: "first_year_companion" }),
    );
    expect(assessmentCalls).toBe(1);
    expect(occurrences(systemPrompts[0], AMBER_SAFETY_GUIDANCE)).toBe(1);
    expect(occurrences(systemPrompts[0], GLOBAL_REASSURANCE_RULE)).toBe(1);
    expect(systemPrompts[0]).toMatch(/health visitor/i);
  });

  it("leaves routine first-year restraint untouched on a green assessment", async () => {
    assessmentMode = "green";
    await drain(await post({ query: "when do most babies start weaning", mode: "first_year_companion" }));
    expect(assessmentCalls).toBe(0);
    expect(systemPrompts[0]).not.toContain(AMBER_SAFETY_GUIDANCE);
    expect(systemPrompts[0]).not.toContain(CAUTIOUS_UNCERTAINTY_GUIDANCE);
  });

  it("keeps day-recap semantics exactly as they were", async () => {
    await drain(
      await post({ query: "i am worried about how hot my baby has felt today", mode: "first_year_day_recap" }),
    );
    expect(systemPrompts[0]).not.toContain(AMBER_SAFETY_GUIDANCE);
    expect(systemPrompts[0]).not.toContain(CAUTIOUS_UNCERTAINTY_GUIDANCE);
    expect(systemPrompts[0]).not.toContain(GLOBAL_REASSURANCE_RULE);
  });
});

/**
 * AIC-5D closure evidence — OFF means intentionally disabled, not unavailable.
 */
describe("flag-off semantics", () => {
  it("treats an eligible request as an ordinary answer with no cautious fallback", async () => {
    delete env.AI_AMBER_CLASSIFIER_ENABLED;
    const response = await drain(await post({ query: "i have had a headache since yesterday" }));
    expect(response.status).toBe(200);
    expect(assessmentCalls).toBe(0);
    expect(systemPrompts).toHaveLength(1);
    expect(systemPrompts[0]).not.toContain(AMBER_SAFETY_GUIDANCE);
    expect(systemPrompts[0]).not.toContain(CAUTIOUS_UNCERTAINTY_GUIDANCE);
    expect(systemPrompts[0]).toContain(GLOBAL_REASSURANCE_RULE);
  });
});

/**
 * AIC-5D closure evidence — exact guidance injection counts per outcome.
 */
describe("guidance injection counts", () => {
  it("amber: one amber block, no cautious block", async () => {
    await drain(await post({ query: "i am worried about how sore my back has been" }));
    expect(occurrences(systemPrompts[0], AMBER_SAFETY_GUIDANCE)).toBe(1);
    expect(occurrences(systemPrompts[0], CAUTIOUS_UNCERTAINTY_GUIDANCE)).toBe(0);
  });

  it("green: no trusted block beyond the global rule", async () => {
    assessmentMode = "green";
    await drain(await post({ query: "i am worried about how sore my back has been" }));
    expect(occurrences(systemPrompts[0], AMBER_SAFETY_GUIDANCE)).toBe(0);
    expect(occurrences(systemPrompts[0], CAUTIOUS_UNCERTAINTY_GUIDANCE)).toBe(0);
    expect(occurrences(systemPrompts[0], GLOBAL_REASSURANCE_RULE)).toBe(1);
  });

  it("unavailable: exactly one cautious block and the answer still streams", async () => {
    assessmentMode = "fail";
    const response = await drain(await post({ query: "i have had a headache since yesterday" }));
    expect(response.status).toBe(200);
    expect(occurrences(systemPrompts[0], CAUTIOUS_UNCERTAINTY_GUIDANCE)).toBe(1);
    expect(occurrences(systemPrompts[0], AMBER_SAFETY_GUIDANCE)).toBe(0);
  });

  it("disabled: no cautious block", async () => {
    delete env.AI_AMBER_CLASSIFIER_ENABLED;
    await drain(await post({ query: "i have had a headache since yesterday" }));
    expect(occurrences(systemPrompts[0], CAUTIOUS_UNCERTAINTY_GUIDANCE)).toBe(0);
  });
});
