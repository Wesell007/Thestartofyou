/**
 * AIC-JA2 — endpoint proof of the one invariant that matters:
 *
 *   ordinary GREEN model path -> journal may be resolved
 *   anything else             -> zero journal-table reads, header "none"
 *
 * "Anything else" includes RED, CRISIS, rate limiting, the kill switch,
 * clarification, unsupported, recap mode and AMBER.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { capturedHandler } from "@/test/stubs/denoStdServe";

const env: Record<string, string> = {
  LOVABLE_API_KEY: "test-key",
  SUPABASE_URL: "https://backend.test",
  SUPABASE_ANON_KEY: "anon-key",
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
  AI_JOURNAL_CONTEXT_ENABLED: "true",
};

(globalThis as unknown as { Deno: unknown }).Deno = {
  env: { get: (key: string) => env[key] },
};

const JOURNAL_TABLES = ["reflections", "first_year_entries", "first_year_memories", "ttc_logs"];

let limiterAllows = true;
let requestedUrls: string[] = [];
let modelBodies: string[] = [];

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

const json = (body: unknown) =>
  new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });

const restRows: Record<string, unknown[]> = {
  profiles: [{ companion_journal_context_enabled: true }],
  journeys: [{ lifecycle: "pregnancy" }],
  pregnancy_journeys: [{ lmp_date: "2025-08-01", status: "active" }],
  archived_journeys: [],
  reflections: [
    {
      week: 30,
      content: "I have been sleeping badly and writing about it helps.",
      created_at: "2026-03-05T09:00:00.000Z",
    },
  ],
};

const fetchStub = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.toString();
  requestedUrls.push(url);
  if (url.includes("consume_ai_rate_limit")) {
    return json([{ allowed: limiterAllows, retry_after_seconds: 30 }]);
  }
  if (url.includes("/auth/v1/user")) return json({ id: "user-1" });
  if (url.includes("ai.gateway.lovable.dev")) {
    modelBodies.push(typeof init?.body === "string" ? init.body : "");
    return sse("A general answer.");
  }
  const table = /\/rest\/v1\/([a-z_]+)\?/.exec(url)?.[1] ?? "";
  if (table) return json(restRows[table] ?? []);
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
      headers: { "Content-Type": "application/json", authorization: "Bearer session-token" },
      body: JSON.stringify({ journeyContext: { version: 1, personal: { journey: "pregnancy", week: 31 } }, ...body }),
    }),
  );

const drain = async (response: Response) => {
  await response.text();
  return response;
};

const journalReads = () =>
  requestedUrls.filter((url) => JOURNAL_TABLES.some((t) => url.includes(`/rest/v1/${t}?`))).length;

const HEADER = "X-Companion-Journal-Context";

beforeEach(() => {
  limiterAllows = true;
  requestedUrls = [];
  modelBodies = [];
  fetchStub.mockClear();
  delete env.AI_SEARCH_DISABLED;
  delete env.AI_AMBER_CLASSIFIER_ENABLED;
  env.AI_JOURNAL_CONTEXT_ENABLED = "true";
});

describe("journal context reaches only the ordinary GREEN model path", () => {
  it("resolves and reports the journal on an ordinary question", async () => {
    const response = await drain(await post({ query: "What helps with heartburn?" }));
    expect(response.headers.get(HEADER)).toBe("used");
    expect(journalReads()).toBe(1);
    expect(modelBodies[0]).toContain("sleeping badly");
  });

  it("reports none and reads nothing when the server flag is off", async () => {
    env.AI_JOURNAL_CONTEXT_ENABLED = "false";
    const response = await drain(await post({ query: "What helps with heartburn?" }));
    expect(response.headers.get(HEADER)).toBe("none");
    expect(journalReads()).toBe(0);
  });

  const noJournal = async (label: string, body: Record<string, unknown>) => {
    it(`reads no journal on ${label}`, async () => {
      const response = await drain(await post(body));
      expect(journalReads()).toBe(0);
      expect(response.headers.get(HEADER) ?? "none").toBe("none");
    });
  };

  noJournal("a clinical red question", { query: "My baby has blue lips" });
  noJournal("a crisis question", { query: "I cannot keep myself safe" });
  noJournal("a clarification", { query: "sleep" });
  noJournal("an unsupported request", { query: "Diagnose me." });
  noJournal("recap mode", { query: "Recap my day", mode: "first_year_day_recap" });

  it("reads no journal when the request is rate limited", async () => {
    limiterAllows = false;
    await drain(await post({ query: "What helps with heartburn?" }));
    expect(journalReads()).toBe(0);
  });

  it("reads no journal when the kill switch is on", async () => {
    env.AI_SEARCH_DISABLED = "true";
    await drain(await post({ query: "What helps with heartburn?" }));
    expect(journalReads()).toBe(0);
  });

  it("reads no journal on the gated AMBER path", async () => {
    env.AI_AMBER_CLASSIFIER_ENABLED = "true";
    const response = await drain(await post({ query: "i have had a headache since yesterday" }));
    expect(journalReads()).toBe(0);
    expect(response.headers.get(HEADER)).toBe("none");
  });

  it("never sends journal text to the model when it is not used", async () => {
    env.AI_JOURNAL_CONTEXT_ENABLED = "false";
    await drain(await post({ query: "What helps with heartburn?" }));
    expect(modelBodies.join("")).not.toContain("sleeping badly");
  });
});
