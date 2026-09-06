/**
 * AIC-J2 — cache freshness for personal journey context.
 *
 * Proves that an authoritative journey mutation makes the cached personal
 * journey unusable immediately, that an obsolete in-flight resolution can
 * neither be cached nor returned, that a failed refresh falls back to unknown
 * rather than the old journey, and that concurrent reads coalesce.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, cleanup } from "@testing-library/react";
import type { PersonalJourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

const resolvePersonalJourneyContext = vi.fn();
let authCallback: (() => void) | null = null;

vi.mock("@/lib/companion/journeyPersonalSource", () => ({
  resolvePersonalJourneyContext: (...args: unknown[]) =>
    resolvePersonalJourneyContext(...args),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (cb: () => void) => {
        authCallback = cb;
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
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

type Loaded = {
  ensure: () => Promise<PersonalJourneyContextV1 | null>;
  notify: () => void;
};

/** Fresh module graph per test, so the module-level cache starts empty. */
const mount = async (): Promise<Loaded> => {
  vi.resetModules();
  const signal = await import("@/lib/journeyStateSignal");
  const hookModule = await import("@/hooks/useCompanionPersonalJourney");
  const { result } = renderHook(() => hookModule.useCompanionPersonalJourney());
  return {
    ensure: () => result.current.ensurePersonalJourney(),
    notify: () => signal.notifyJourneyStateChanged(),
  };
};

beforeEach(() => {
  authCallback = null;
  resolvePersonalJourneyContext.mockReset().mockResolvedValue(TTC);
});

afterEach(() => {
  cleanup();
});

describe("personal journey cache freshness", () => {
  it("replaces a cached TTC journey after a pregnancy mutation", async () => {
    const { ensure, notify } = await mount();
    expect(await ensure()).toEqual(TTC);

    resolvePersonalJourneyContext.mockResolvedValue(PREGNANCY);
    notify();

    const fresh = await ensure();
    expect(fresh).toEqual(PREGNANCY);
    expect(fresh).not.toHaveProperty("ttcStage");
    expect(fresh).not.toHaveProperty("ivfInTreatment");
  });

  it("never returns an obsolete in-flight result to its awaiting caller", async () => {
    let releaseStale: (value: PersonalJourneyContextV1) => void = () => {};
    resolvePersonalJourneyContext.mockImplementationOnce(
      () =>
        new Promise<PersonalJourneyContextV1>((resolve) => {
          releaseStale = resolve;
        }),
    );

    const { ensure, notify } = await mount();
    const pending = ensure();

    resolvePersonalJourneyContext.mockResolvedValue(PREGNANCY);
    notify();
    releaseStale(TTC);

    expect(await pending).toEqual(PREGNANCY);
    expect(await ensure()).toEqual(PREGNANCY);
  });

  it("returns unknown, never the old journey, when the refresh fails", async () => {
    const { ensure, notify } = await mount();
    expect(await ensure()).toEqual(TTC);

    resolvePersonalJourneyContext.mockRejectedValue(new Error("offline"));
    notify();

    expect(await ensure()).toBeNull();
  });

  it("coalesces concurrent reads after a signal into one resolution", async () => {
    const { ensure, notify } = await mount();
    await ensure();
    resolvePersonalJourneyContext.mockReset().mockResolvedValue(PREGNANCY);

    notify();
    const [a, b] = await Promise.all([ensure(), ensure()]);

    expect(a).toEqual(PREGNANCY);
    expect(b).toEqual(PREGNANCY);
    expect(resolvePersonalJourneyContext).toHaveBeenCalledTimes(1);
  });

  it("shares one cache and one listener across two mounted surfaces", async () => {
    vi.resetModules();
    const signal = await import("@/lib/journeyStateSignal");
    const hookModule = await import("@/hooks/useCompanionPersonalJourney");
    const panel = renderHook(() => hookModule.useCompanionPersonalJourney());
    const ask = renderHook(() => hookModule.useCompanionPersonalJourney());

    await panel.result.current.ensurePersonalJourney();
    await ask.result.current.ensurePersonalJourney();
    expect(resolvePersonalJourneyContext).toHaveBeenCalledTimes(1);

    resolvePersonalJourneyContext.mockReset().mockResolvedValue(PREGNANCY);
    signal.notifyJourneyStateChanged();

    expect(await panel.result.current.ensurePersonalJourney()).toEqual(PREGNANCY);
    expect(await ask.result.current.ensurePersonalJourney()).toEqual(PREGNANCY);
    expect(resolvePersonalJourneyContext).toHaveBeenCalledTimes(1);
  });

  it("keeps auth invalidation working alongside journey invalidation", async () => {
    const { ensure, notify } = await mount();
    expect(await ensure()).toEqual(TTC);

    // auth change, then journey signal
    resolvePersonalJourneyContext.mockResolvedValue(null);
    authCallback?.();
    expect(await ensure()).toBeNull();

    resolvePersonalJourneyContext.mockResolvedValue(PREGNANCY);
    notify();
    expect(await ensure()).toEqual(PREGNANCY);

    // journey signal, then auth change
    resolvePersonalJourneyContext.mockResolvedValue(TTC);
    notify();
    expect(await ensure()).toEqual(TTC);
    resolvePersonalJourneyContext.mockResolvedValue(null);
    authCallback?.();
    expect(await ensure()).toBeNull();
  });
});
