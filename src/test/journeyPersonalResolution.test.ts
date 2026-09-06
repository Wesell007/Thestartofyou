/**
 * AIC-J2 — personal journey resolution: unknown stays unknown, lifecycle
 * replacement is atomic, and page/entry context can never rewrite the personal
 * discriminant.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

type Row = Record<string, unknown>;
type TableData = { rows: Row[]; error?: unknown };

const state: {
  session: { user: { id: string } } | null;
  tables: Record<string, TableData>;
} = { session: null, tables: {} };

const makeQuery = (table: string) => {
  const data = state.tables[table] ?? { rows: [] };
  const result = { data: data.rows, error: data.error ?? null };
  const builder = {
    select: () => builder,
    eq: () => builder,
    order: () => builder,
    limit: () => builder,
    maybeSingle: async () => ({
      data: data.error ? null : (data.rows[0] ?? null),
      error: data.error ?? null,
    }),
    then: (resolve: (value: typeof result) => unknown) => Promise.resolve(result).then(resolve),
  };
  return builder;
};

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: async () => ({ data: { session: state.session }, error: null }) },
    from: (table: string) => makeQuery(table),
    rpc: async () => ({ data: null, error: null }),
  },
}));

import { resolvePersonalJourneyContext } from "@/lib/companion/journeyPersonalSource";
import { buildJourneyContext, buildPageContext } from "@/lib/companion/journeyContext";

const signIn = () => {
  state.session = { user: { id: "user-1" } };
};

beforeEach(() => {
  state.session = null;
  state.tables = {};
});

describe("unknown stays unknown", () => {
  it("sends no personal context when signed out", async () => {
    expect(await resolvePersonalJourneyContext()).toBeNull();
  });

  it("sends no personal context with no lifecycle pointer and no legacy journey", async () => {
    signIn();
    expect(await resolvePersonalJourneyContext()).toBeNull();
  });

  it("sends no active pregnancy stage for inactive statuses", async () => {
    signIn();
    state.tables.journeys = { rows: [{ lifecycle: "pregnancy" }] };
    for (const status of ["given_birth", "no_longer_pregnant", "pregnancy_loss", "paused"]) {
      state.tables.pregnancy_journeys = { rows: [{ lmp_date: "2026-01-01", status }] };
      expect(await resolvePersonalJourneyContext()).toBeNull();
    }
  });

  it("does not fabricate a TTC stage when none is recorded", async () => {
    signIn();
    state.tables.journeys = { rows: [{ lifecycle: "ttc" }] };
    state.tables.ttc_journeys = {
      rows: [{ support_status: null, ivf_consideration: null }],
    };
    expect(await resolvePersonalJourneyContext()).toEqual({ journey: "trying-to-conceive" });
  });

  it("does not guess an age with ambiguous babies", async () => {
    signIn();
    state.tables.journeys = { rows: [{ lifecycle: "first_year" }] };
    state.tables.babies = {
      rows: [
        { date_of_birth: "2026-01-01", is_primary: false },
        { date_of_birth: "2026-03-01", is_primary: false },
      ],
    };
    expect(await resolvePersonalJourneyContext()).toEqual({ journey: "first-year" });
  });

  it("does not fabricate a stage for a baby outside the first year", async () => {
    signIn();
    state.tables.journeys = { rows: [{ lifecycle: "first_year" }] };
    state.tables.babies = { rows: [{ date_of_birth: "2020-01-01", is_primary: true }] };
    expect(await resolvePersonalJourneyContext()).toEqual({ journey: "first-year" });
  });
});

describe("atomic lifecycle replacement", () => {
  it("returns pregnancy only, with no TTC field surviving, once the pointer moves", async () => {
    signIn();
    state.tables.journeys = { rows: [{ lifecycle: "ttc" }] };
    state.tables.ttc_journeys = {
      rows: [{ support_status: "trying_naturally", ivf_consideration: "in_treatment" }],
    };
    const before = await resolvePersonalJourneyContext();
    expect(before).toMatchObject({ journey: "trying-to-conceive", ivfInTreatment: true });

    state.tables.journeys = { rows: [{ lifecycle: "pregnancy" }] };
    state.tables.pregnancy_journeys = { rows: [{ lmp_date: "2026-01-01", status: "active" }] };
    const after = await resolvePersonalJourneyContext(new Date(2026, 3, 1));
    expect(after?.journey).toBe("pregnancy");
    expect(after).not.toHaveProperty("ttcStage");
    expect(after).not.toHaveProperty("ivfInTreatment");
  });

  it("reflects a new baby age and primary-baby change on the next resolution", async () => {
    signIn();
    state.tables.journeys = { rows: [{ lifecycle: "first_year" }] };
    state.tables.babies = {
      rows: [
        { date_of_birth: "2026-01-01", is_primary: true },
        { date_of_birth: "2026-06-01", is_primary: false },
      ],
    };
    const first = await resolvePersonalJourneyContext(new Date(2026, 6, 1));
    expect(first).toEqual({ journey: "first-year", ageMonths: 6 });

    state.tables.babies = {
      rows: [
        { date_of_birth: "2026-01-01", is_primary: false },
        { date_of_birth: "2026-06-01", is_primary: true },
      ],
    };
    const second = await resolvePersonalJourneyContext(new Date(2026, 6, 1));
    expect(second).toEqual({ journey: "first-year", ageMonths: 1 });
  });
});

describe("personal identity survives conflicting page context", () => {
  const cases = [
    {
      name: "pregnancy personal on family content",
      personal: { journey: "pregnancy", week: 20 } as const,
      pathname: "/family",
    },
    {
      name: "TTC personal on IVF content",
      personal: { journey: "trying-to-conceive", ttcStage: "trying_naturally" } as const,
      pathname: "/ttc/ivf-and-treatment",
    },
    {
      name: "first year personal on postpartum content",
      personal: { journey: "first-year", ageMonths: 2 } as const,
      pathname: "/postpartum",
    },
  ];

  for (const testCase of cases) {
    it(testCase.name, () => {
      const page = buildPageContext({ pathname: testCase.pathname });
      const context = buildJourneyContext({ personal: testCase.personal, page });
      expect(context?.personal).toEqual(testCase.personal);
      expect(context?.personal?.journey).toBe(testCase.personal.journey);
      // Page stays a separate layer and never writes into personal.
      if (page) expect(context?.page).toEqual(page);
      expect(Object.keys(context?.personal ?? {})).toEqual(
        Object.keys(testCase.personal),
      );
    });
  }
});
