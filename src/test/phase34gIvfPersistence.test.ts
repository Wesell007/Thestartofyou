import { describe, expect, it, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import {
  isIVFTransferType,
  isValidNewIVFTransferDate,
  parseIVFTransferDate,
  formatIVFTransferDate,
  IVF_TRANSFER_TYPES,
} from "@/lib/ivfTimeline";
import { IVF_TIMELINE_SAVE_ENABLED } from "@/lib/ivfTimelineFlags";

/**
 * Phase 34G — IVF timeline persistence foundation.
 *
 * The feature stays OFF: these tests prove the persistence boundary is safe,
 * not that anything is wired to the interface.
 */

const SESSION_USER = "user-a-0000-0000-0000-000000000001";

type UpdateOutcome = { data: Array<{ user_id: string }> | null; error: { message: string } | null };

const state = {
  sessionUserId: SESSION_USER as string | null,
  selectRow: null as Record<string, unknown> | null,
  updateOutcome: { data: [{ user_id: SESSION_USER }], error: null } as UpdateOutcome,
  updates: [] as Array<{ table: string; payload: Record<string, unknown>; userId: string }>,
  inserts: [] as string[],
  upserts: [] as string[],
};

vi.mock("@/integrations/supabase/client", () => {
  const from = (table: string) => ({
    select: () => ({
      eq: () => ({
        maybeSingle: async () => ({ data: state.selectRow, error: null }),
      }),
    }),
    update: (payload: Record<string, unknown>) => ({
      eq: (_col: string, userId: string) => ({
        select: async () => {
          state.updates.push({ table, payload, userId });
          return state.updateOutcome;
        },
      }),
    }),
    insert: async () => {
      state.inserts.push(table);
      return { data: null, error: null };
    },
    upsert: async () => {
      state.upserts.push(table);
      return { data: null, error: null };
    },
  });
  return {
    supabase: {
      from,
      auth: {
        getSession: async () => ({
          data: { session: state.sessionUserId ? { user: { id: state.sessionUserId } } : null },
          error: null,
        }),
      },
      rpc: async () => ({ data: null, error: null }),
    },
  };
});

const importHelpers = async () => await import("@/lib/savedTTCJourney");

const todayMinus = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return formatIVFTransferDate(d);
};

beforeEach(() => {
  state.sessionUserId = SESSION_USER;
  state.selectRow = null;
  state.updateOutcome = { data: [{ user_id: SESSION_USER }], error: null };
  state.updates = [];
  state.inserts = [];
  state.upserts = [];
});

describe("phase 34G shared IVF domain", () => {
  it("defines exactly one transfer-type representation", () => {
    expect(IVF_TRANSFER_TYPES).toEqual(["3day", "5day"]);
    expect(isIVFTransferType("3day")).toBe(true);
    expect(isIVFTransferType("5day")).toBe(true);
    expect(isIVFTransferType("day3")).toBe(false);
    expect(isIVFTransferType(null)).toBe(false);
  });

  it("parses a stored calendar date with no timezone drift", () => {
    const parsed = parseIVFTransferDate("2026-03-01");
    expect(parsed).not.toBeNull();
    expect(formatIVFTransferDate(parsed!)).toBe("2026-03-01");
    expect(parseIVFTransferDate("2026-13-01")).toBeNull();
    expect(parseIVFTransferDate("01/03/2026")).toBeNull();
    expect(parseIVFTransferDate(1772000000000)).toBeNull();
  });

  it("applies the calculator entry rules to a new save only", () => {
    expect(isValidNewIVFTransferDate(todayMinus(10))).toBe(true);
    expect(isValidNewIVFTransferDate(todayMinus(-2))).toBe(false); // future
    expect(isValidNewIVFTransferDate(todayMinus(400))).toBe(false); // outside entry window
    expect(isValidNewIVFTransferDate("nonsense")).toBe(false);
  });

  it("keeps persistence free of any dependency on the React form", () => {
    const persistence = readFileSync("src/lib/savedTTCJourney.ts", "utf8");
    const domain = readFileSync("src/lib/ivfTimeline.ts", "utf8");
    expect(persistence).not.toContain("components/ivf");
    expect(domain).not.toContain("components/");
    expect(domain).not.toContain("react");
    const form = readFileSync("src/components/ivf/IVFTimelineForm.tsx", "utf8");
    expect(form).toContain('from "@/lib/ivfTimeline"');
    expect(form).not.toMatch(/export type IVFTransferType =/);
  });
});

describe("phase 34G load", () => {
  it("returns the stored context for the signed-in person", async () => {
    state.selectRow = { ivf_transfer_date: "2026-03-01", ivf_transfer_type: "5day" };
    const { loadIVFTimelineContext } = await importHelpers();
    const result = await loadIVFTimelineContext();
    expect(result).toEqual({ ok: true, context: { transfer_date: "2026-03-01", transfer_type: "5day" } });
  });

  it("keeps historical context readable well beyond the 300-day entry window", async () => {
    const old = todayMinus(900);
    state.selectRow = { ivf_transfer_date: old, ivf_transfer_type: "3day" };
    const { loadIVFTimelineContext } = await importHelpers();
    const result = await loadIVFTimelineContext();
    expect(result).toEqual({ ok: true, context: { transfer_date: old, transfer_type: "3day" } });
    expect(state.updates).toHaveLength(0); // never silently rewritten or cleared
  });

  it("returns an empty context for a journey with no IVF values", async () => {
    state.selectRow = { ivf_transfer_date: null, ivf_transfer_type: null };
    const { loadIVFTimelineContext } = await importHelpers();
    await expect(loadIVFTimelineContext()).resolves.toEqual({
      ok: true,
      context: { transfer_date: null, transfer_type: null },
    });
  });

  it("distinguishes no journey at all", async () => {
    state.selectRow = null;
    const { loadIVFTimelineContext } = await importHelpers();
    await expect(loadIVFTimelineContext()).resolves.toEqual({ ok: false, reason: "no_ttc_journey" });
    expect(state.inserts).toHaveLength(0);
  });

  it("requires an authenticated person", async () => {
    state.sessionUserId = null;
    const { loadIVFTimelineContext } = await importHelpers();
    await expect(loadIVFTimelineContext()).resolves.toEqual({ ok: false, reason: "not_authenticated" });
  });
});

describe("phase 34G save and clear", () => {
  it("updates the existing journey for both transfer types", async () => {
    const { saveIVFTimelineContext } = await importHelpers();
    for (const type of ["3day", "5day"] as const) {
      const date = todayMinus(5);
      const result = await saveIVFTimelineContext({ transfer_date: date, transfer_type: type });
      expect(result).toEqual({ ok: true });
      const last = state.updates[state.updates.length - 1];
      expect(last.table).toBe("ttc_journeys");
      expect(last.payload).toEqual({ ivf_transfer_date: date, ivf_transfer_type: type });
      expect(last.userId).toBe(SESSION_USER);
    }
    expect(state.inserts).toHaveLength(0);
    expect(state.upserts).toHaveLength(0);
  });

  it("derives ownership from the session, with no caller-supplied user id", async () => {
    const helpers = await importHelpers();
    expect(helpers.saveIVFTimelineContext.length).toBe(1);
    expect(helpers.clearIVFTimelineContext.length).toBe(0);
    expect(helpers.loadIVFTimelineContext.length).toBe(0);
    await helpers.saveIVFTimelineContext({ transfer_date: todayMinus(3), transfer_type: "5day" });
    expect(state.updates[0].userId).toBe(SESSION_USER);
  });

  it("rejects an invalid transfer type or date before touching the database", async () => {
    const { saveIVFTimelineContext } = await importHelpers();
    await expect(
      saveIVFTimelineContext({ transfer_date: todayMinus(3), transfer_type: "day5" as never }),
    ).resolves.toEqual({ ok: false, reason: "invalid_context" });
    await expect(
      saveIVFTimelineContext({ transfer_date: todayMinus(400), transfer_type: "5day" }),
    ).resolves.toEqual({ ok: false, reason: "invalid_context" });
    expect(state.updates).toHaveLength(0);
  });

  it("treats a zero-row update as no journey, never as a successful save", async () => {
    state.updateOutcome = { data: [], error: null };
    const { saveIVFTimelineContext } = await importHelpers();
    await expect(
      saveIVFTimelineContext({ transfer_date: todayMinus(3), transfer_type: "5day" }),
    ).resolves.toEqual({ ok: false, reason: "no_ttc_journey" });
    expect(state.inserts).toHaveLength(0);
    expect(state.upserts).toHaveLength(0);
  });

  it("treats a zero-row clear as no journey, never as a successful clear", async () => {
    state.updateOutcome = { data: [], error: null };
    const { clearIVFTimelineContext } = await importHelpers();
    await expect(clearIVFTimelineContext()).resolves.toEqual({ ok: false, reason: "no_ttc_journey" });
    expect(state.inserts).toHaveLength(0);
    expect(state.upserts).toHaveLength(0);
  });

  it("clears both values together and touches nothing else", async () => {
    const { clearIVFTimelineContext } = await importHelpers();
    await expect(clearIVFTimelineContext()).resolves.toEqual({ ok: true });
    expect(state.updates).toHaveLength(1);
    expect(state.updates[0].payload).toEqual({ ivf_transfer_date: null, ivf_transfer_type: null });
    expect(Object.keys(state.updates[0].payload)).toHaveLength(2);
  });

  it("persists only the two source values and no derived milestones", async () => {
    const { saveIVFTimelineContext } = await importHelpers();
    await saveIVFTimelineContext({ transfer_date: todayMinus(7), transfer_type: "3day" });
    expect(Object.keys(state.updates[0].payload).sort()).toEqual([
      "ivf_transfer_date",
      "ivf_transfer_type",
    ]);
  });
});

describe("phase 34G boundaries", () => {
  const persistence = readFileSync("src/lib/savedTTCJourney.ts", "utf8");
  const migrationGlob = readFileSync("src/integrations/supabase/types.ts", "utf8");

  it("uses update only — no insert or upsert in the IVF helpers", () => {
    const ivfSection = persistence.slice(persistence.indexOf("Phase 34G"));
    expect(ivfSection).not.toContain(".insert(");
    expect(ivfSection).not.toContain(".upsert(");
    expect(ivfSection).toContain('.select("user_id")');
  });

  it("stores the IVF values on the existing TTC journey, with no new table", () => {
    expect(migrationGlob).toContain("ivf_transfer_date");
    expect(migrationGlob).not.toContain("ivf_journeys");
    expect(migrationGlob).not.toContain("ivf_timelines");
  });

  it("leaves the ordinary TTC save untouched, so omission never clears IVF values", () => {
    const commit = persistence.slice(
      persistence.indexOf("commitPendingTTCJourneyToDB"),
      persistence.indexOf("getActiveTTCJourney"),
    );
    expect(commit).not.toContain("ivf_transfer_date");
    expect(commit).not.toContain("ivf_transfer_type");
  });

  it("keeps the save feature off with no save, update or clear control", () => {
    expect(IVF_TIMELINE_SAVE_ENABLED).toBe(false);
    const form = readFileSync("src/components/ivf/IVFTimelineForm.tsx", "utf8");
    const page = readFileSync("src/pages/IVFTimeline.tsx", "utf8");
    for (const source of [form, page]) {
      expect(source).not.toMatch(/Save my timeline|Timeline saved|Update timeline|Delete saved timeline/i);
      expect(source).not.toContain("saveIVFTimelineContext");
      expect(source).not.toContain("clearIVFTimelineContext");
      expect(source).not.toContain("loadIVFTimelineContext");
      expect(source).not.toContain("IVF_TIMELINE_SAVE_ENABLED");
    }
  });

  it("makes no persistence write when the calculator is used", () => {
    const form = readFileSync("src/components/ivf/IVFTimelineForm.tsx", "utf8");
    expect(form).not.toContain("supabase");
    expect(form).not.toContain("localStorage");
    expect(form).not.toContain("sessionStorage");
  });

  it("keeps IVF out of the Companion, AI context and analytics", () => {
    const companionContext = readFileSync("src/lib/companionContext.ts", "utf8");
    const analytics = readFileSync("src/lib/analytics.ts", "utf8");
    expect(companionContext).not.toContain("ivf_transfer");
    expect(analytics).not.toContain("ivf_transfer");
  });

  it("keeps saved lifecycles to exactly ttc, pregnancy and first_year", () => {
    const navLifecycle = readFileSync("src/lib/navLifecycle.ts", "utf8");
    expect(navLifecycle).not.toContain("my-ivf-journey");
    expect(persistence).not.toContain('lifecycle: "ivf"');
  });

  it("allows /ivf-timeline as a return route without carrying values across sign-in", async () => {
    const { parseSafeReturnTo } = await import("@/lib/authIntent");
    expect(parseSafeReturnTo("/ivf-timeline")).toBe("/ivf-timeline");
    expect(parseSafeReturnTo("https://evil.example/ivf-timeline")).toBeNull();
    const authIntent = readFileSync("src/lib/authIntent.ts", "utf8");
    expect(authIntent).not.toContain("transfer");
  });
});
