/**
 * AIC-5E — endpoint proof that emotional tone guidance is injected only on the
 * ordinary model path, always below the safety layer, and that it changes no
 * deterministic wording, no headers, no storage and no telemetry.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { capturedHandler } from "@/test/stubs/denoStdServe";
import {
  AMBER_SAFETY_GUIDANCE,
  GLOBAL_REASSURANCE_RULE,
} from "../../supabase/functions/_shared/amberGuidance";
import { urgentAnswer } from "../../supabase/functions/_shared/urgentPatterns";

const env: Record<string, string> = {
  LOVABLE_API_KEY: "test-key",
  SUPABASE_URL: "https://backend.test",
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
};

(globalThis as unknown as { Deno: unknown }).Deno = {
  env: { get: (key: string) => env[key] },
};

let systemPrompts: string[] = [];
let assessmentCalls = 0;
const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

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
      return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ state: "amber" }) } }] }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    systemPrompts.push(body.messages?.[0]?.content ?? "");
    return sse("An ordinary answer.");
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

const TONE_MARKER = "Tone guidance for this answer";

beforeEach(() => {
  systemPrompts = [];
  assessmentCalls = 0;
  fetchStub.mockClear();
  errorSpy.mockClear();
  delete env.AI_SEARCH_DISABLED;
  delete env.AI_AMBER_CLASSIFIER_ENABLED;
});

afterEach(() => {
  vi.clearAllMocks();
});

const drain = async (response: Response) => {
  const text = await response.text();
  return { response, text };
};

describe("ordinary model path", () => {
  it("injects tone guidance when the person states how they feel", async () => {
    await drain(await post({ query: "i am nervous about my scan next week, what happens at it" }));
    expect(systemPrompts[0]).toContain(TONE_MARKER);
    expect(systemPrompts[0]).toMatch(/acknowledge the worry briefly/i);
  });

  it("injects nothing for a neutral question", async () => {
    await drain(await post({ query: "when do most babies start weaning" }));
    expect(systemPrompts[0]).not.toContain(TONE_MARKER);
  });

  it("keeps the safety layer after the tone guidance so safety is last", async () => {
    await drain(await post({ query: "i am nervous about my scan next week, what happens at it" }));
    const prompt = systemPrompts[0];
    expect(prompt.indexOf(TONE_MARKER)).toBeLessThan(prompt.indexOf(GLOBAL_REASSURANCE_RULE));
    expect(prompt).toMatch(/lower authority than every safety rule/i);
  });

  it("never adds tone guidance to day recap mode", async () => {
    await drain(await post({ query: "i am so relieved today went well", mode: "first_year_day_recap" }));
    expect(systemPrompts[0]).not.toContain(TONE_MARKER);
  });

  it("makes no extra model call", async () => {
    await drain(await post({ query: "i feel overwhelmed, where do i start with weaning" }));
    const modelCalls = fetchStub.mock.calls.filter(([input]) =>
      String(input).includes("ai.gateway.lovable.dev"),
    );
    expect(modelCalls).toHaveLength(1);
    expect(assessmentCalls).toBe(0);
  });
});

describe("deterministic routes stay byte-identical", () => {
  it("leaves a RED answer unchanged and injects no tone guidance", async () => {
    const query = "i am so scared, i have heavy bleeding with clots and severe pain";
    const { text } = await drain(await post({ query }));
    expect(text).toContain(urgentAnswer(query));
    expect(text).not.toContain(TONE_MARKER);
    expect(systemPrompts).toHaveLength(0);
  });

  it("leaves a CRISIS answer unchanged", async () => {
    const query = "i am terrified and i want to harm myself";
    const { text } = await drain(await post({ query }));
    expect(text).toContain(urgentAnswer(query));
    expect(text).not.toContain(TONE_MARKER);
    expect(systemPrompts).toHaveLength(0);
  });

  it("leaves clarification unchanged", async () => {
    const { response, text } = await drain(await post({ query: "sleep" }));
    expect(response.headers.get("X-Companion-Boundary")).toBe("clarify");
    expect(text).not.toContain(TONE_MARKER);
    expect(systemPrompts).toHaveLength(0);
  });

  it("leaves an unsupported boundary unchanged", async () => {
    const { response, text } = await drain(
      await post({ query: "i am so frustrated, book me a midwife appointment" }),
    );
    expect(response.headers.get("X-Companion-Boundary")).toBe("unsupported");
    expect(text).not.toContain(TONE_MARKER);
    expect(systemPrompts).toHaveLength(0);
  });
});

describe("AIC-5D interaction", () => {
  it("keeps AMBER guidance alongside tone guidance and never removes it", async () => {
    env.AI_AMBER_CLASSIFIER_ENABLED = "true";
    await drain(await post({ query: "i am scared, i have had a headache since yesterday" }));
    const prompt = systemPrompts[0];
    expect(assessmentCalls).toBe(1);
    expect(prompt).toContain(AMBER_SAFETY_GUIDANCE);
    expect(prompt).toContain(TONE_MARKER);
    expect(prompt.indexOf(TONE_MARKER)).toBeLessThan(prompt.indexOf(AMBER_SAFETY_GUIDANCE));
  });

  it("does not change classifier call counts for a neutral eligible question", async () => {
    env.AI_AMBER_CLASSIFIER_ENABLED = "true";
    await drain(await post({ query: "i have had a headache since yesterday" }));
    expect(assessmentCalls).toBe(1);
    expect(systemPrompts[0]).not.toContain(TONE_MARKER);
  });
});

describe("no profiling", () => {
  it("adds no client headers, no storage call and no emotional logging", async () => {
    const { response } = await drain(await post({ query: "i feel overwhelmed, where do i start with weaning" }));
    const headerKeys = [...response.headers.keys()].map((key) => key.toLowerCase());
    expect(headerKeys.some((key) => key.includes("emotion") || key.includes("mood"))).toBe(false);
    const persistence = fetchStub.mock.calls.filter(([input]) =>
      /companion_messages|companion_conversations|companion_memories/.test(String(input)),
    );
    expect(persistence).toHaveLength(0);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
