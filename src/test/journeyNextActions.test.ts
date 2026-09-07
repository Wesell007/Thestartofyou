/**
 * AIC-J5 — registry, resolver and eligibility contract.
 *
 * These tests assert the closed, deterministic behaviour of the personal
 * next-action layer: saved journeys only, at most two actions, no content or
 * page inference, and a fail-closed eligibility header.
 */

import { describe, expect, it } from "vitest";
import {
  MAX_NEXT_ACTIONS,
  resolveJourneyNextActions,
} from "@/lib/companion/journeyNextActions";
import { readNextActionsEligibility } from "@/hooks/useAISearch";

describe("resolveJourneyNextActions — authority", () => {
  it("returns nothing when signed out, even with a saved journey shape", () => {
    expect(
      resolveJourneyNextActions({ personal: { journey: "pregnancy", week: 24 }, signedIn: false }),
    ).toEqual([]);
  });

  it("returns nothing when there is no saved personal journey", () => {
    expect(resolveJourneyNextActions({ personal: null, signedIn: true })).toEqual([]);
    expect(resolveJourneyNextActions({ personal: undefined, signedIn: true })).toEqual([]);
  });
});

describe("resolveJourneyNextActions — TTC", () => {
  it("offers only the TTC journey, whatever the stage", () => {
    for (const stage of ["preparing_to_try", "trying_naturally", "considering_help", "in_treatment"] as const) {
      expect(
        resolveJourneyNextActions({
          personal: { journey: "trying-to-conceive", ttcStage: stage },
          signedIn: true,
        }),
      ).toEqual([{ id: "ttc-open-journey", label: "Open My TTC Journey", to: "/my-ttc-journey" }]);
    }
  });

  it("treats treatment as the same one action", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "trying-to-conceive", ttcStage: "in_treatment", ivfInTreatment: true },
      signedIn: true,
    });
    expect(actions.map((action) => action.to)).toEqual(["/my-ttc-journey"]);
  });
});

describe("resolveJourneyNextActions — pregnancy", () => {
  it("uses the saved week, not any week being read", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "pregnancy", week: 24 },
      signedIn: true,
    });
    expect(actions).toEqual([
      { id: "pregnancy-view-my-week", label: "View My Week", to: "/my-week" },
      { id: "pregnancy-read-week", label: "Read week 24 guidance", to: "/pregnancy/week/24" },
    ]);
  });

  it("falls back to the journey home when the week is missing or out of range", () => {
    for (const personal of [
      { journey: "pregnancy" } as const,
      { journey: "pregnancy", week: 0 } as const,
      { journey: "pregnancy", week: 60 } as const,
      { journey: "pregnancy", week: 12.5 } as const,
    ]) {
      expect(resolveJourneyNextActions({ personal, signedIn: true })).toEqual([
        { id: "pregnancy-open-journey", label: "Open My Journey", to: "/my-journey" },
      ]);
    }
  });
});

describe("resolveJourneyNextActions — First Year", () => {
  it("uses the saved month", () => {
    expect(
      resolveJourneyNextActions({
        personal: { journey: "first-year", ageMonths: 7 },
        signedIn: true,
      }),
    ).toEqual([
      { id: "first-year-open-today", label: "Open Today", to: "/my-first-year/today" },
      { id: "first-year-read-month", label: "Read month 7 guidance", to: "/first-year/7-months" },
    ]);
  });

  it("uses the newborn route and wording at month zero", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "first-year", ageMonths: 0 },
      signedIn: true,
    });
    expect(actions[1]).toEqual({
      id: "first-year-read-month",
      label: "Read newborn guidance",
      to: "/first-year/newborn",
    });
  });

  it("falls back to the journey home for an ambiguous or unknown age", () => {
    for (const personal of [
      { journey: "first-year" } as const,
      { journey: "first-year", ageMonths: -1 } as const,
      { journey: "first-year", ageMonths: 19 } as const,
      { journey: "first-year", ageMonths: 4.4 } as const,
    ]) {
      expect(resolveJourneyNextActions({ personal, signedIn: true })).toEqual([
        { id: "first-year-open-journey", label: "Open My First Year", to: "/my-first-year" },
      ]);
    }
  });

  it("keeps month 11 as the last personal month", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "first-year", ageMonths: 11 },
      signedIn: true,
    });
    expect(actions[1]).toEqual({
      id: "first-year-read-month",
      label: "Read month 11 guidance",
      to: "/first-year/11-months",
    });
  });

  it("never produces the twelve-month page from saved personal state", () => {
    // AIC-J6-R2 — twelve-month guidance stays public CONTENT. The saved
    // personal journey is 0–11 months, so month 12 falls back to the home.
    const actions = resolveJourneyNextActions({
      personal: { journey: "first-year", ageMonths: 12 },
      signedIn: true,
    });
    expect(actions).toEqual([
      { id: "first-year-open-journey", label: "Open My First Year", to: "/my-first-year" },
    ]);
    for (const personal of [
      { journey: "first-year", ageMonths: 11 } as const,
      { journey: "first-year", ageMonths: 12 } as const,
      { journey: "first-year", ageMonths: 13 } as const,
    ]) {
      const resolved = resolveJourneyNextActions({ personal, signedIn: true });
      expect(resolved.some((action) => action.to === "/first-year/12-months")).toBe(false);
    }
  });
});


describe("resolveJourneyNextActions — bounds", () => {
  it("never exceeds the shared maximum and never repeats a destination", () => {
    const cases = [
      { journey: "pregnancy", week: 20 } as const,
      { journey: "first-year", ageMonths: 3 } as const,
      { journey: "trying-to-conceive", ttcStage: "trying_naturally" } as const,
    ];
    for (const personal of cases) {
      const actions = resolveJourneyNextActions({ personal, signedIn: true });
      expect(actions.length).toBeLessThanOrEqual(MAX_NEXT_ACTIONS);
      expect(new Set(actions.map((action) => action.to)).size).toBe(actions.length);
      expect(actions.every((action) => action.to.startsWith("/"))).toBe(true);
    }
  });
});

describe("eligibility header — fails closed", () => {
  it("allows only the exact permission value", () => {
    expect(readNextActionsEligibility("allow")).toBe("allow");
    expect(readNextActionsEligibility(" ALLOW ")).toBe("allow");
  });

  it("suppresses for missing, unknown or malformed values", () => {
    for (const value of [null, undefined, "", "suppress", "true", "1", "deny", "{}", "allowed"]) {
      expect(readNextActionsEligibility(value)).toBe("suppress");
    }
  });
});
