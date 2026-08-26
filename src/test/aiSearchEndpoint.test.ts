import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { capturedHandler } from "@/test/stubs/denoStdServe";
import { DAY_RECAP_UNAVAILABLE_ANSWER } from "../../supabase/functions/_shared/aiModes";

const ESCALATION_WORDING = /nhs\s?111|\b999\b|A&E|maternity unit|emergency|helpline/i;
const LINK_OR_SOURCE = /https?:\/\/|\bsources?\b|\breferences?\b/i;

const env: Record<string, string> = {
  LOVABLE_API_KEY: "test-key",
  SUPABASE_URL: "https://backend.test",
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
};

// The edge function reads configuration from Deno.env and calls fetch directly.
(globalThis as unknown as { Deno: unknown }).Deno = {
  env: { get: (key: string) => env[key] },
};

let requestedUrls: string[] = [];
let modelBodies: Record<string, unknown>[] = [];

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

let modelAnswer = "Today included a few care moments across nappies and feeds.";

const fetchStub = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.toString();
  requestedUrls.push(url);
  if (url.includes("consume_ai_rate_limit")) {
    return new Response(JSON.stringify([{ allowed: true, retry_after_seconds: 0 }]), {
      headers: { "Content-Type": "application/json" },
    });
  }
  if (url.includes("ai.gateway.lovable.dev")) {
    modelBodies.push(JSON.parse(String(init?.body ?? "{}")));
    return sse(modelAnswer);
  }
  return new Response("<main>" + "grounding evidence. ".repeat(40) + "</main>", {
    headers: { "Content-Type": "text/html" },
  });
});

vi.stubGlobal("fetch", fetchStub);

// Loaded via a non-literal specifier so the Deno-targeted edge function stays
// out of the browser TypeScript project while still running under Vitest.
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

beforeEach(() => {
  requestedUrls = [];
  modelBodies = [];
  fetchStub.mockClear();
  modelAnswer = "Today included a few care moments across nappies and feeds.";
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("ai-search mode behaviour", () => {
  it("fetches no grounding sources in recap mode", async () => {
    const response = await post({
      query: "Day: 2026-08-19. Logged: 2 nappy changes, 1 feed.",
      mode: "first_year_day_recap",
    });
    expect(response.headers.get("Content-Type")).toBe("text/event-stream");
    expect(requestedUrls.some((url) => url.includes("nhs.uk"))).toBe(false);
    expect(modelBodies).toHaveLength(1);
  });

  it("sends the recap prompt and returns the answer with no sources or contact footer", async () => {
    const response = await post({
      query: "Day: 2026-08-19. Logged: 2 nappy changes, 1 feed.",
      mode: "first_year_day_recap",
    });
    const messages = modelBodies[0].messages as { role: string; content: string }[];
    const systemPrompt = messages[0].content;
    expect(systemPrompt).toContain("recap of one logged day");
    expect(messages[1].content).not.toContain("approved_evidence");

    const body = await readStream(response);
    expect(body).not.toMatch(ESCALATION_WORDING);
    expect(body).not.toMatch(LINK_OR_SOURCE);
  });

  it("returns the controlled fallback for urgent wording in recap mode, without calling the model", async () => {
    const response = await post({
      query: "Day: 2026-08-19. Moment: he was unconscious for a moment.",
      mode: "first_year_day_recap",
    });
    const body = await readStream(response);
    expect(body).toBe(DAY_RECAP_UNAVAILABLE_ANSWER);
    expect(body).not.toMatch(ESCALATION_WORDING);
    expect(modelBodies).toHaveLength(0);
  });

  it("keeps grounding and the urgent escalation answer for callers with no mode", async () => {
    const grounded = await post({ query: "What helps with heartburn?" });
    expect(await readStream(grounded)).toBeTruthy();
    expect(requestedUrls.some((url) => url.includes("nhs.uk"))).toBe(true);
    const messages = modelBodies[0].messages as { role: string; content: string }[];
    expect(messages[0].content).toContain("Sources");

    const urgent = await post({ query: "I have chest pain" });
    expect(await readStream(urgent)).toMatch(ESCALATION_WORDING);
  });

  it("treats an unknown mode as general", async () => {
    await post({ query: "What helps with heartburn?", mode: "made_up_mode" });
    expect(requestedUrls.some((url) => url.includes("nhs.uk"))).toBe(true);
  });
});

describe("Phase 29D kill switch", () => {
  afterEach(() => {
    delete env.AI_SEARCH_DISABLED;
  });

  it("returns the calm pause answer without calling the model", async () => {
    env.AI_SEARCH_DISABLED = "true";
    const response = await post({ query: "What helps with heartburn?" });
    const body = await readStream(response);
    expect(body).toMatch(/short pause/i);
    expect(body).not.toMatch(/https?:\/\//);
    expect(modelBodies).toHaveLength(0);
    expect(requestedUrls.some((url) => url.includes("ai.gateway.lovable.dev"))).toBe(false);
    expect(requestedUrls.some((url) => url.includes("nhs.uk"))).toBe(false);
  });

  it("still escalates urgent wording while paused", async () => {
    env.AI_SEARCH_DISABLED = "1";
    const response = await post({ query: "My baby has blue lips" });
    const body = await readStream(response);
    expect(body).toMatch(ESCALATION_WORDING);
    expect(body).not.toMatch(/short pause/i);
    expect(modelBodies).toHaveLength(0);
  });

  it("gives recap surfaces their own controlled line while paused", async () => {
    env.AI_SEARCH_DISABLED = "true";
    const response = await post({ query: "Day: 2026-08-19. Logged: 2 feeds.", mode: "first_year_day_recap" });
    expect(await readStream(response)).toBe(DAY_RECAP_UNAVAILABLE_ANSWER);
  });

  it("keeps normal behaviour when the flag is absent or false", async () => {
    env.AI_SEARCH_DISABLED = "false";
    await post({ query: "What helps with heartburn?" });
    expect(modelBodies).toHaveLength(1);
  });
});

describe("Phase 29D expanded escalation at the endpoint", () => {
  it.each([
    "I am pregnant and bleeding",
    "I have a severe headache and vision changes",
    "My waters have broken",
    "My baby is floppy and hard to wake",
    "My baby has a rash that does not fade",
    "I cannot keep myself safe",
    "Someone at home is hurting me",
  ])("escalates %s before the model", async (query) => {
    const response = await post({ query });
    const body = await readStream(response);
    expect(body).toMatch(ESCALATION_WORDING);
    expect(body).not.toMatch(/https?:\/\//);
    expect(modelBodies).toHaveLength(0);
  });
});
