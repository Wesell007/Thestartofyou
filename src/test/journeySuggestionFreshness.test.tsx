/**
 * AIC-J3 × AIC-J2 — visible starter chips must never be stale.
 *
 * The registry is pure, so freshness lives entirely in the single module cache
 * from J2. These tests prove that the published personal value goes unknown
 * the instant journey state changes, that both surfaces share one resolution,
 * and that no TTC chip survives a TTC → Pregnancy transition.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { resolveJourneySuggestions } from "@/lib/companion/journeySuggestions";
import type { PersonalJourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

const resolvePersonalJourneyContext = vi.fn();

vi.mock("@/lib/companion/journeyPersonalSource", () => ({
  resolvePersonalJourneyContext: (...args: unknown[]) =>
    resolvePersonalJourneyContext(...args),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
  },
}));

const TTC: PersonalJourneyContextV1 = {
  journey: "trying-to-conceive",
  ttcStage: "trying_naturally",
};
const PREGNANCY: PersonalJourneyContextV1 = {
  journey: "pregnancy",
  week: 20,
  trimester: "second",
};

const ttcChips = resolveJourneySuggestions({ personal: TTC, surface: "companion" });
const pregnancyChips = resolveJourneySuggestions({
  personal: PREGNANCY,
  surface: "companion",
});

const mount = async () => {
  vi.resetModules();
  const signal = await import("@/lib/journeyStateSignal");
  const hookModule = await import("@/hooks/useCompanionPersonalJourney");
  const panel = renderHook(() => hookModule.useCompanionPersonalJourney());
  const ask = renderHook(() => hookModule.useCompanionPersonalJourney());
  const chipsOf = (r: typeof panel) =>
    r.result.current.personalJourney
      ? resolveJourneySuggestions({
          personal: r.result.current.personalJourney,
          surface: "companion",
        })
      : null;
  return { panel, ask, chipsOf, notify: () => signal.notifyJourneyStateChanged() };
};

beforeEach(() => {
  resolvePersonalJourneyContext.mockReset().mockResolvedValue(TTC);
});

afterEach(() => {
  cleanup();
});

describe("starter chip freshness", () => {
  it("shows no stale TTC chips after a TTC → Pregnancy transition", async () => {
    const { panel, chipsOf, notify } = await mount();
    await waitFor(() => expect(chipsOf(panel)).toEqual(ttcChips));

    let release: (value: PersonalJourneyContextV1) => void = () => {};
    resolvePersonalJourneyContext.mockImplementation(
      () =>
        new Promise<PersonalJourneyContextV1>((resolve) => {
          release = resolve;
        }),
    );

    act(() => {
      notify();
    });
    // Invalidation is synchronous: personal chips disappear immediately rather
    // than lingering while the fresh read is in flight.
    expect(chipsOf(panel)).toBeNull();

    await act(async () => {
      release(PREGNANCY);
      await Promise.resolve();
    });
    await waitFor(() => expect(chipsOf(panel)).toEqual(pregnancyChips));
    expect(chipsOf(panel)).not.toEqual(ttcChips);
  });

  it("keeps two mounted surfaces on one resolution and one set of chips", async () => {
    const { panel, ask, chipsOf, notify } = await mount();
    await waitFor(() => expect(chipsOf(panel)).toEqual(ttcChips));
    expect(chipsOf(ask)).toEqual(chipsOf(panel));
    expect(resolvePersonalJourneyContext).toHaveBeenCalledTimes(1);

    resolvePersonalJourneyContext.mockReset().mockResolvedValue(PREGNANCY);
    await act(async () => {
      notify();
      await Promise.resolve();
    });

    await waitFor(() => expect(chipsOf(panel)).toEqual(pregnancyChips));
    expect(chipsOf(ask)).toEqual(pregnancyChips);
    expect(resolvePersonalJourneyContext).toHaveBeenCalledTimes(1);
  });

  it("shows neutral chips, never the old journey, when a refresh fails", async () => {
    const { panel, chipsOf, notify } = await mount();
    await waitFor(() => expect(chipsOf(panel)).toEqual(ttcChips));

    resolvePersonalJourneyContext.mockRejectedValue(new Error("offline"));
    await act(async () => {
      notify();
      await Promise.resolve();
    });

    await waitFor(() => expect(panel.result.current.personalJourney).toBeNull());
    expect(chipsOf(panel)).toBeNull();
  });
});
