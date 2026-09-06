/**
 * AIC-J3 — the canonical journey-aware suggestion registry.
 *
 * These tests hold the authority boundary: personal starters are reachable
 * only through an authoritative `JourneyContextV1.personal` object, and never
 * through a mode, page, route, hub, topic or entry string.
 */

import { describe, expect, it } from "vitest";
import {
  FIRST_YEAR_BANDS,
  GENERAL_STARTERS,
  MAX_SUGGESTIONS,
  contentModeStarters,
  firstYearBandIndex,
  resolveJourneySuggestions,
  type SuggestionSurface,
} from "@/lib/companion/journeySuggestions";
import { companionStarters } from "@/lib/companion/companionStarters";
import { trimesterFromWeek } from "@/lib/pregnancyWeek";
import type { PersonalJourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

const SURFACES: SuggestionSurface[] = ["companion", "ask", "hub"];

const resolve = (
  personal: PersonalJourneyContextV1 | null,
  surface: SuggestionSurface = "companion",
) => resolveJourneySuggestions({ personal, surface });

describe("journey mapping", () => {
  it("maps each personal journey to its own starters", () => {
    const ttc = resolve({ journey: "trying-to-conceive" });
    const pregnancy = resolve({ journey: "pregnancy" });
    const firstYear = resolve({ journey: "first-year" });

    expect(new Set([ttc[0], pregnancy[0], firstYear[0]]).size).toBe(3);
    for (const chips of [ttc, pregnancy, firstYear]) {
      expect(chips.length).toBeGreaterThan(0);
      expect(chips.length).toBeLessThanOrEqual(MAX_SUGGESTIONS);
      expect(new Set(chips).size).toBe(chips.length);
      for (const chip of chips) expect(chip.length).toBeLessThanOrEqual(60);
    }
  });

  it("falls back to general starters with no personal journey", () => {
    expect(resolve(null)).toEqual([...GENERAL_STARTERS]);
    expect(resolve(undefined as unknown as null)).toEqual([...GENERAL_STARTERS]);
  });
});

describe("TTC stages", () => {
  const stages = [
    "preparing_to_try",
    "trying_naturally",
    "considering_help",
    "in_treatment",
  ] as const;

  it("gives every authoritative stage a distinct set", () => {
    const first = stages.map(
      (ttcStage) => resolve({ journey: "trying-to-conceive", ttcStage })[0],
    );
    expect(new Set(first).size).toBe(stages.length);
  });

  it("uses in-treatment wording for ivfInTreatment when no stage is saved", () => {
    expect(resolve({ journey: "trying-to-conceive", ivfInTreatment: true })).toEqual(
      resolve({ journey: "trying-to-conceive", ttcStage: "in_treatment" }),
    );
  });

  it("never lets ivfInTreatment override a saved stage", () => {
    expect(
      resolve({
        journey: "trying-to-conceive",
        ttcStage: "trying_naturally",
        ivfInTreatment: true,
      }),
    ).toEqual(resolve({ journey: "trying-to-conceive", ttcStage: "trying_naturally" }));
  });

  it("stays inside the TTC journey for ivfInTreatment", () => {
    const ivf = resolve({ journey: "trying-to-conceive", ivfInTreatment: true });
    expect(ivf).not.toEqual(resolve({ journey: "pregnancy" }));
    expect(ivf).not.toEqual(resolve({ journey: "first-year" }));
  });

  it("falls back to journey level with no stage at all", () => {
    const chips = resolve({ journey: "trying-to-conceive" });
    expect(chips.length).toBeGreaterThan(0);
  });
});

describe("pregnancy trimester", () => {
  it("distinguishes the three trimesters", () => {
    const chips = (["first", "second", "third"] as const).map(
      (trimester) => resolve({ journey: "pregnancy", trimester })[0],
    );
    expect(new Set(chips).size).toBe(3);
  });

  it("derives trimester from week through the one canonical helper", () => {
    for (const week of [1, 12, 13, 27, 28, 42]) {
      expect(resolve({ journey: "pregnancy", week })).toEqual(
        resolve({ journey: "pregnancy", trimester: trimesterFromWeek(week) }),
      );
    }
  });

  it("prefers an explicit trimester over the week", () => {
    expect(resolve({ journey: "pregnancy", week: 8, trimester: "third" })).toEqual(
      resolve({ journey: "pregnancy", trimester: "third" }),
    );
  });

  it("falls back to journey level with neither week nor trimester", () => {
    expect(resolve({ journey: "pregnancy" }).length).toBeGreaterThan(0);
  });
});

describe("first year age bands", () => {
  it("uses exactly the bands 0-2, 3-5, 6-8, 9-11", () => {
    expect(FIRST_YEAR_BANDS.map((b) => [b.from, b.to])).toEqual([
      [0, 2],
      [3, 5],
      [6, 8],
      [9, 11],
    ]);
  });

  it("maps every supported month to exactly one band", () => {
    const indices = Array.from({ length: 12 }, (_, m) => firstYearBandIndex(m));
    expect(indices).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]);
  });

  it("keeps boundary months inside their own band", () => {
    for (const [a, b] of [
      [0, 2],
      [3, 5],
      [6, 8],
      [9, 11],
    ]) {
      expect(resolve({ journey: "first-year", ageMonths: a })).toEqual(
        resolve({ journey: "first-year", ageMonths: b }),
      );
    }
    expect(resolve({ journey: "first-year", ageMonths: 2 })).not.toEqual(
      resolve({ journey: "first-year", ageMonths: 3 }),
    );
    expect(resolve({ journey: "first-year", ageMonths: 5 })).not.toEqual(
      resolve({ journey: "first-year", ageMonths: 6 }),
    );
    expect(resolve({ journey: "first-year", ageMonths: 8 })).not.toEqual(
      resolve({ journey: "first-year", ageMonths: 9 }),
    );
  });

  it("treats month 12 and other unusable ages as unknown", () => {
    for (const ageMonths of [12, -1, 1.5, Number.NaN]) {
      expect(firstYearBandIndex(ageMonths)).toBeNull();
      expect(resolve({ journey: "first-year", ageMonths })).toEqual(
        resolve({ journey: "first-year" }),
      );
    }
  });
});

describe("authority: no personal inference", () => {
  const modes = [
    "general",
    "ttc_companion",
    "pregnancy_week_companion",
    "first_year_companion",
  ] as const;

  it("never produces personal starters from a mode", () => {
    const personalSets = [
      resolve({ journey: "trying-to-conceive" }),
      resolve({ journey: "pregnancy" }),
      resolve({ journey: "first-year" }),
    ].map((chips) => chips.join("|"));

    for (const mode of modes) {
      expect(personalSets).not.toContain(contentModeStarters(mode).join("|"));
    }
  });

  it("never produces personal starters from page context", () => {
    for (const journey of ["pregnancy", "trying-to-conceive", "first-year"] as const) {
      expect(
        resolveJourneySuggestions({
          personal: null,
          page: { journey, week: 20 } as never,
          surface: "companion",
        }),
      ).toEqual([...GENERAL_STARTERS]);
    }
  });

  it("never produces personal starters from entry context", () => {
    for (const stage of ["pregnancy", "ttc", "first-year", "recovery", "ivf"]) {
      expect(
        resolveJourneySuggestions({
          personal: null,
          entry: { stage } as never,
          surface: "companion",
        }),
      ).toEqual([...GENERAL_STARTERS]);
    }
  });

  it("never lets page or entry contradict the personal journey", () => {
    const personal: PersonalJourneyContextV1 = { journey: "pregnancy", trimester: "second" };
    const conflicts = [
      { page: { journey: "first-year" } as never },
      { entry: { stage: "ttc" } as never },
      { page: { journey: "trying-to-conceive" } as never, entry: { stage: "family" } as never },
    ];
    for (const conflict of conflicts) {
      expect(
        resolveJourneySuggestions({ personal, surface: "companion", ...conflict }),
      ).toEqual(resolve(personal));
    }
  });
});

describe("surfaces and determinism", () => {
  it("gives the same personal chips on every surface", () => {
    const personal: PersonalJourneyContextV1 = { journey: "first-year", ageMonths: 7 };
    const [companion, ask, hub] = SURFACES.map((surface) => resolve(personal, surface));
    expect(ask).toEqual(companion);
    expect(hub).toEqual(companion);
  });

  it("lets an explicit content entry lead on /ask", () => {
    expect(
      resolveJourneySuggestions({
        personal: { journey: "pregnancy", trimester: "first" },
        entry: { stage: "pregnancy", topic: "sleep" } as never,
        surface: "ask",
      }),
    ).toEqual([]);
  });

  it("is deterministic and never mutates its own data", () => {
    const personal: PersonalJourneyContextV1 = { journey: "pregnancy", week: 20 };
    const a = resolve(personal);
    a.push("mutated");
    expect(resolve(personal)).not.toContain("mutated");
    expect(resolve(personal)).toEqual(resolve(personal));
  });
});

describe("compatibility", () => {
  it("keeps companionStarters working as a delegate", () => {
    for (const mode of [
      "general",
      "ttc_companion",
      "pregnancy_week_companion",
      "first_year_companion",
    ] as const) {
      expect(companionStarters(mode)).toEqual(contentModeStarters(mode));
      expect(companionStarters(mode).length).toBeGreaterThan(0);
    }
  });

  it("keeps every chip calm and non-diagnostic", () => {
    const all = [
      ...SURFACES.flatMap((surface) => [
        ...resolve({ journey: "trying-to-conceive", ttcStage: "in_treatment" }, surface),
        ...resolve({ journey: "pregnancy", trimester: "third" }, surface),
        ...resolve({ journey: "first-year", ageMonths: 1 }, surface),
      ]),
      ...contentModeStarters("general"),
    ];
    const forbidden =
      /\b(diagnos|guarantee|definitely|emergency|urgent|miscarr|abnormal|infertile|you will|don't worry)\b/i;
    for (const chip of all) {
      expect(chip).not.toMatch(forbidden);
      expect(chip.trim()).toBe(chip);
    }
  });
});
