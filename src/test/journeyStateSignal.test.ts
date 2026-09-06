/**
 * AIC-J2 — the journey state change signal and the authoritative write paths
 * that emit it. No prompt, safety, grounding, memory, history or voice
 * behaviour is touched here.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
const getSession = vi.fn();
const upsert = vi.fn();
const update = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: (...args: unknown[]) => getSession(...args) },
    rpc: (...args: unknown[]) => rpc(...args),
    from: (table: string) => ({
      upsert: (...args: unknown[]) => upsert(table, ...args),
      update: (values: unknown) => ({
        eq: () => update(table, values),
      }),
    }),
  },
}));

import {
  notifyJourneyStateChanged,
  resetJourneyStateListeners,
  subscribeJourneyStateChanged,
} from "@/lib/journeyStateSignal";
import {
  deletePregnancyJourney,
  saveActivePregnancyJourney,
  updatePregnancyJourneyStatus,
} from "@/lib/savedJourney";
import { commitPendingTTCJourneyToDB, deleteTTCJourney } from "@/lib/savedTTCJourney";
import { saveFirstYearJourney } from "@/lib/firstYearJourney";

const USER = "user-1";

const listen = () => {
  const spy = vi.fn();
  subscribeJourneyStateChanged(spy);
  return spy;
};

const ttcValues = {
  last_period_date: "2026-01-01",
  cycle_length_days: 28,
  period_length_days: 5,
  cycle_regularity: "regular",
  actively_trying: "yes",
  uses_ovulation_tests: "no",
  tracks_symptoms: "not_now",
  support_status: "trying_naturally",
  ivf_consideration: "no",
} as const;

beforeEach(() => {
  resetJourneyStateListeners();
  rpc.mockReset().mockResolvedValue({ data: null, error: null });
  upsert.mockReset().mockResolvedValue({ error: null });
  update.mockReset().mockResolvedValue({ error: null });
  getSession
    .mockReset()
    .mockResolvedValue({ data: { session: { user: { id: USER } } }, error: null });
});

afterEach(() => {
  resetJourneyStateListeners();
});

describe("journey state signal", () => {
  it("notifies subscribers with no payload at all", () => {
    const spy = listen();
    notifyJourneyStateChanged();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]).toHaveLength(0);
  });

  it("stops notifying after unsubscribe", () => {
    const spy = vi.fn();
    const off = subscribeJourneyStateChanged(spy);
    off();
    notifyJourneyStateChanged();
    expect(spy).not.toHaveBeenCalled();
  });

  it("isolates a throwing listener so a committed write is not reported failed", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    subscribeJourneyStateChanged(() => {
      throw new Error("listener exploded");
    });
    const healthy = listen();
    await expect(
      saveActivePregnancyJourney(USER, new Date(2026, 0, 1)),
    ).resolves.toBeTruthy();
    expect(healthy).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});

describe("pregnancy write paths", () => {
  it("emits exactly once for a nested save, not once per helper", async () => {
    const spy = listen();
    await saveActivePregnancyJourney(USER, new Date(2026, 0, 1));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("emits nothing when the save fails", async () => {
    const spy = listen();
    rpc.mockResolvedValue({ data: null, error: { message: "nope" } });
    await expect(saveActivePregnancyJourney(USER, new Date(2026, 0, 1))).rejects.toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });

  it("emits once on a status change and nothing when it fails", async () => {
    const spy = listen();
    await updatePregnancyJourneyStatus(USER, { status: "given_birth" });
    expect(spy).toHaveBeenCalledTimes(1);

    update.mockResolvedValue({ error: { message: "nope" } });
    await expect(
      updatePregnancyJourneyStatus(USER, { status: "paused" }),
    ).rejects.toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("emits once on deletion and nothing when it fails", async () => {
    const spy = listen();
    await deletePregnancyJourney(USER);
    expect(spy).toHaveBeenCalledTimes(1);

    rpc.mockResolvedValue({ data: null, error: { message: "nope" } });
    await expect(deletePregnancyJourney(USER)).rejects.toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("TTC write paths", () => {
  it("emits once on a successful save", async () => {
    const spy = listen();
    const result = await commitPendingTTCJourneyToDB(USER, { ...ttcValues });
    expect(result.ok).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("emits nothing on failure or a refused pregnancy overwrite", async () => {
    const spy = listen();
    rpc.mockResolvedValue({ data: null, error: { message: "nope" } });
    expect((await commitPendingTTCJourneyToDB(USER, { ...ttcValues })).ok).toBe(false);
    rpc.mockResolvedValue({ data: "pregnancy_active", error: null });
    expect((await commitPendingTTCJourneyToDB(USER, { ...ttcValues })).ok).toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it("emits once on deletion", async () => {
    const spy = listen();
    await deleteTTCJourney(USER);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("first year write paths", () => {
  it("emits once per logical save, not once per baby", async () => {
    const spy = listen();
    await saveFirstYearJourney([
      { date_of_birth: "2026-01-01", name: "A" },
      { date_of_birth: "2026-01-01", name: "B" },
    ]);
    expect(rpc).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("emits nothing when the save fails", async () => {
    const spy = listen();
    rpc.mockResolvedValue({ data: null, error: { message: "nope" } });
    await expect(saveFirstYearJourney([{ date_of_birth: "2026-01-01" }])).rejects.toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });
});
