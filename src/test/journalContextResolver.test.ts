/**
 * AIC-JA2 — the permissioned journal resolver.
 *
 * These tests exist to prove the gates, not the happy path: flag off, no
 * session, the anonymous key as a token, permission off, lifecycle mismatch,
 * episode leakage, baby ambiguity, tags/titles/ids, safety and bounds. Every
 * failure mode must produce zero journal-table reads or no block at all.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const env: Record<string, string> = {
  SUPABASE_URL: "https://backend.test",
  SUPABASE_ANON_KEY: "anon-key",
  AI_JOURNAL_CONTEXT_ENABLED: "true",
};

(globalThis as unknown as { Deno: unknown }).Deno = {
  env: { get: (key: string) => env[key] },
};

const { resolveJournalContext } = await import(
  "../../supabase/functions/_shared/aiJournalContext"
);

const NOW = new Date("2026-03-10T12:00:00.000Z");

/** Table name -> rows. A table absent here returns []. */
type Tables = Record<string, unknown[]>;

let tables: Tables = {};
let requested: string[] = [];
let authOk = true;

const JOURNAL_TABLES = [
  "reflections",
  "first_year_entries",
  "first_year_memories",
  "ttc_logs",
];

const journalReads = () =>
  requested.filter((url) =>
    JOURNAL_TABLES.some((table) => url.includes(`/rest/v1/${table}?`)),
  ).length;

const json = (body: unknown) =>
  new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });

const fetchStub = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : input.toString();
  requested.push(url);
  if (url.includes("/auth/v1/user")) {
    return authOk ? json({ id: "user-1" }) : new Response("no", { status: 401 });
  }
  const table = /\/rest\/v1\/([a-z_]+)\?/.exec(url)?.[1] ?? "";
  return json(tables[table] ?? []);
});

vi.stubGlobal("fetch", fetchStub);

const request = (token: string | null = "session-token") =>
  new Request("https://backend.test/functions/v1/ai-search", {
    method: "POST",
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });

const pregnancyWorld = (): Tables => ({
  profiles: [{ companion_journal_context_enabled: true }],
  journeys: [{ lifecycle: "pregnancy" }],
  pregnancy_journeys: [{ lmp_date: "2025-08-01", status: "active" }],
  archived_journeys: [],
  reflections: [
    { week: 31, content: "I felt calmer this week after the midwife call.", created_at: "2026-03-05T09:00:00.000Z" },
  ],
});

beforeEach(() => {
  env.AI_JOURNAL_CONTEXT_ENABLED = "true";
  tables = pregnancyWorld();
  requested = [];
  authOk = true;
  fetchStub.mockClear();
});

const resolvePregnancy = () =>
  resolveJournalContext(request(), { personal: { journey: "pregnancy", week: 32 }, now: NOW });

describe("journal resolver gates", () => {
  it("uses permitted pregnancy reflections on the ordinary path", async () => {
    const result = await resolvePregnancy();
    expect(result.used).toBe(true);
    expect(result.block).toContain("after the midwife call");
  });

  it("reads nothing when the server flag is off", async () => {
    env.AI_JOURNAL_CONTEXT_ENABLED = "false";
    const result = await resolvePregnancy();
    expect(result).toEqual({ block: "", used: false });
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it("reads nothing without a personal journey", async () => {
    const result = await resolveJournalContext(request(), { now: NOW });
    expect(result.used).toBe(false);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it("reads nothing without a bearer token", async () => {
    const result = await resolveJournalContext(request(null), {
      personal: { journey: "pregnancy" },
      now: NOW,
    });
    expect(result.used).toBe(false);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it("refuses the anonymous publishable key as a session", async () => {
    const result = await resolveJournalContext(request("anon-key"), {
      personal: { journey: "pregnancy" },
      now: NOW,
    });
    expect(result.used).toBe(false);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it("reads no journal table when the token does not verify", async () => {
    authOk = false;
    const result = await resolvePregnancy();
    expect(result.used).toBe(false);
    expect(journalReads()).toBe(0);
  });

  it("reads no journal table when permission is off", async () => {
    tables.profiles = [{ companion_journal_context_enabled: false }];
    const result = await resolvePregnancy();
    expect(result.used).toBe(false);
    expect(journalReads()).toBe(0);
  });

  it("reads no journal table when the profile row is missing", async () => {
    tables.profiles = [];
    expect((await resolvePregnancy()).used).toBe(false);
    expect(journalReads()).toBe(0);
  });

  it("reads no journal table when the authoritative lifecycle disagrees", async () => {
    tables.journeys = [{ lifecycle: "first_year" }];
    const result = await resolvePregnancy();
    expect(result.used).toBe(false);
    expect(journalReads()).toBe(0);
  });

  it("returns nothing when every entry is dropped by safety", async () => {
    tables.reflections = [
      { week: 31, content: "I have chest pain and cannot breathe", created_at: "2026-03-05T09:00:00.000Z" },
    ];
    const result = await resolvePregnancy();
    expect(result.used).toBe(false);
    expect(result.block).toBe("");
  });

  it("drops an over-long entry whole rather than rendering a fragment", async () => {
    const long = `${"a".repeat(4000)} unmistakable-tail`;
    tables.reflections = [{ week: 31, content: long, created_at: "2026-03-05T09:00:00.000Z" }];
    const result = await resolvePregnancy();
    expect(result.used).toBe(false);
    expect(result.block).not.toContain("aaaa");
  });

  it("fails closed and never throws when a read fails", async () => {
    fetchStub.mockImplementationOnce(async () => {
      throw new Error("network");
    });
    await expect(resolvePregnancy()).resolves.toEqual({ block: "", used: false });
  });
});

describe("pregnancy episode isolation", () => {
  it("never selects reflections created before the current LMP", async () => {
    const url = () => requested.find((entry) => entry.includes("/rest/v1/reflections?")) ?? "";
    await resolvePregnancy();
    expect(url()).toContain(encodeURIComponent("2025-08-01T00:00:00.000Z"));
    expect(url()).not.toContain("updated_at");
  });

  it("moves the boundary to a later archived pregnancy chapter", async () => {
    tables.archived_journeys = [{ ended_at: "2026-01-20T00:00:00.000Z" }];
    await resolvePregnancy();
    const url = requested.find((entry) => entry.includes("/rest/v1/reflections?")) ?? "";
    expect(url).toContain(encodeURIComponent("2026-01-20T00:00:00.000Z"));
  });

  it("reads no reflections when the pregnancy is not active", async () => {
    tables.pregnancy_journeys = [{ lmp_date: "2025-08-01", status: "given_birth" }];
    expect((await resolvePregnancy()).used).toBe(false);
    expect(journalReads()).toBe(0);
  });
});

describe("first year scope", () => {
  const firstYearWorld = (babies: unknown[]): Tables => ({
    profiles: [{ companion_journal_context_enabled: true }],
    journeys: [{ lifecycle: "first_year" }],
    first_year_journeys: [{ status: "active" }],
    babies,
    first_year_entries: [
      { entry_date: "2026-03-08", lane: "parent", note: "I am tired but coping.", baby_id: null },
      { entry_date: "2026-03-07", lane: "baby", note: "She napped well today.", baby_id: "baby-1" },
      { entry_date: "2026-03-06", lane: "baby", note: "Other baby note.", baby_id: "baby-2" },
    ],
    first_year_memories: [
      { memory_date: "2026-03-05", note: "A calm family morning.", memory_scope: "family", baby_id: null },
      { memory_date: "2026-03-04", note: "Everyone laughed together.", memory_scope: "all_babies", baby_id: null },
    ],
  });

  const resolveFirstYear = () =>
    resolveJournalContext(request(), {
      personal: { journey: "first-year", ageMonths: 4 },
      now: NOW,
    });

  it("keeps parent, active baby and family material semantically distinct", async () => {
    tables = firstYearWorld([{ id: "baby-1", is_primary: true }, { id: "baby-2", is_primary: false }]);
    const { block, used } = await resolveFirstYear();
    expect(used).toBe(true);
    expect(block).toContain("their own note about themselves");
    expect(block).toContain("their own note about their baby");
    expect(block).toContain("a family memory they wrote");
    expect(block).not.toContain("Other baby note");
    expect(block).not.toContain("Everyone laughed together");
  });

  it("excludes baby-scoped material when the active baby is ambiguous", async () => {
    tables = firstYearWorld([{ id: "baby-1", is_primary: false }, { id: "baby-2", is_primary: false }]);
    const { block } = await resolveFirstYear();
    expect(block).toContain("I am tired but coping");
    expect(block).not.toContain("She napped well");
  });

  it("never exposes ids or tags to the model", async () => {
    tables = firstYearWorld([{ id: "baby-1", is_primary: true }]);
    const { block } = await resolveFirstYear();
    expect(block).not.toContain("baby-1");
    expect(block).not.toMatch(/tag/i);
  });

  it("reads nothing when the first year journey is not active", async () => {
    tables = firstYearWorld([{ id: "baby-1", is_primary: true }]);
    tables.first_year_journeys = [{ status: "paused" }];
    expect((await resolveFirstYear()).used).toBe(false);
    expect(journalReads()).toBe(0);
  });
});

describe("ttc scope", () => {
  beforeEach(() => {
    tables = {
      profiles: [{ companion_journal_context_enabled: true }],
      journeys: [{ lifecycle: "ttc" }],
      ttc_journeys: [{ id: "11111111-2222-3333-4444-555555555555" }],
      ttc_logs: [{ log_date: "2026-03-09", notes: "A gentler week than the last one." }],
    };
  });

  const resolveTtc = () =>
    resolveJournalContext(request(), {
      personal: { journey: "trying-to-conceive" },
      now: NOW,
    });

  it("scopes notes to the current journey and note logs only", async () => {
    const { block, used } = await resolveTtc();
    expect(used).toBe(true);
    expect(block).toContain("A gentler week");
    const url = requested.find((entry) => entry.includes("/rest/v1/ttc_logs?")) ?? "";
    expect(url).toContain("journey_id=eq.11111111-2222-3333-4444-555555555555");
    expect(url).toContain("log_type=eq.note");
  });

  it("reads no logs when there is no current journey", async () => {
    tables.ttc_journeys = [];
    expect((await resolveTtc()).used).toBe(false);
    expect(journalReads()).toBe(0);
  });
});
