import { describe, expect, it } from "vitest";
import {
  buildPregnancyAiContext,
  pickPregnancyAiContext,
  pregnancyToneHint,
  PREGNANCY_CONTEXT_MAX_LENGTH,
  resolvePregnancyPageFamily,
  resolvePregnancyRouteWeek,
  type PregnancyAiContextInput,
} from "./pregnancyAiContext";

describe("pickPregnancyAiContext", () => {
  it("always carries the journey and nothing else for empty input", () => {
    expect(pickPregnancyAiContext(undefined)).toEqual({ journey: "pregnancy" });
    expect(pickPregnancyAiContext(null)).toEqual({ journey: "pregnancy" });
    expect(pickPregnancyAiContext({})).toEqual({ journey: "pregnancy" });
  });

  it("derives the trimester from the week at the boundaries", () => {
    expect(pickPregnancyAiContext({ weekNumber: 12 }).trimester).toBe(
      "first trimester",
    );
    expect(pickPregnancyAiContext({ weekNumber: 13 }).trimester).toBe(
      "second trimester",
    );
    expect(pickPregnancyAiContext({ weekNumber: 27 }).trimester).toBe(
      "second trimester",
    );
    expect(pickPregnancyAiContext({ weekNumber: 28 }).trimester).toBe(
      "third trimester",
    );
    expect(pickPregnancyAiContext({ weekNumber: 40 }).trimester).toBe(
      "third trimester",
    );
    expect(pickPregnancyAiContext({ weekNumber: 41 }).trimester).toBe(
      "past their due date",
    );
  });

  it("clamps out-of-range weeks and drops invalid ones", () => {
    expect(pickPregnancyAiContext({ weekNumber: 0 }).weekNumber).toBe(1);
    expect(pickPregnancyAiContext({ weekNumber: 99 }).weekNumber).toBe(42);
    expect(pickPregnancyAiContext({ weekNumber: Number.NaN }).weekNumber).toBeUndefined();
    expect(pickPregnancyAiContext({ weekNumber: Infinity }).weekNumber).toBeUndefined();
    expect(pickPregnancyAiContext({ weekNumber: null }).weekNumber).toBeUndefined();
  });

  it("rejects page family, tone and source values outside the allowlist", () => {
    const picked = pickPregnancyAiContext({
      pageFamily: "journal" as never,
      toneHint: "clinical" as never,
      contextSource: "database" as never,
    });
    expect(picked).toEqual({ journey: "pregnancy" });
  });

  it("keeps only the approved keys, even when extra properties are supplied", () => {
    const smuggled = {
      weekNumber: 18,
      pageFamily: "my-week",
      pageTopic: "baby movements",
      toneHint: "calm",
      contextSource: "route",
      // None of these may survive.
      dueDate: "2026-03-09",
      lmp: "2025-06-02",
      firstName: "Sophie",
      companionName: "Cindy",
      userId: "0f8c-uuid",
      pregnancyId: "abc-123",
      journalText: "I felt anxious last night",
      notes: "spotting on Tuesday",
      reflections: "a private reflection",
      symptoms: "cramping",
      photoUrl: "https://example.com/scan.jpg",
      videoUrl: "https://example.com/clip.mp4",
      voiceNote: "blob:audio",
      logs: "private log",
      appointments: "midwife 4pm",
      medicalHistory: "previous loss",
    } as unknown as PregnancyAiContextInput;

    const picked = pickPregnancyAiContext(smuggled);
    expect(Object.keys(picked).sort()).toEqual([
      "contextSource",
      "journey",
      "pageFamily",
      "pageTopic",
      "toneHint",
      "trimester",
      "weekNumber",
    ]);

    const rendered = buildPregnancyAiContext(smuggled).toLowerCase();
    for (const forbidden of [
      "2026",
      "2025",
      "march",
      "sophie",
      "cindy",
      "uuid",
      "abc-123",
      "anxious",
      "spotting",
      "reflection",
      "cramping",
      "http",
      "blob",
      "midwife",
      "loss",
    ]) {
      expect(rendered).not.toContain(forbidden);
    }
  });
});

describe("buildPregnancyAiContext", () => {
  it("renders stage, surface, topic and tone", () => {
    const ctx = buildPregnancyAiContext({
      weekNumber: 18,
      pageFamily: "my-week",
      pageTopic: "baby movements",
      toneHint: "calm",
      contextSource: "route",
    });
    expect(ctx).toContain("Journey: pregnancy.");
    expect(ctx).toContain("week 18, second trimester");
    expect(ctx).toContain("My Week");
    expect(ctx).toContain("baby movements");
    expect(ctx).toContain("calm and steady");
    expect(ctx).toContain("the page is background only");
  });

  it("degrades gracefully when fields are missing", () => {
    const ctx = buildPregnancyAiContext({});
    expect(ctx).toContain("Journey: pregnancy.");
    expect(ctx).not.toContain("Current stage");
    expect(ctx).not.toContain("Surface");
    expect(ctx).not.toContain("Page topic");
  });

  it("never contains a date or a digit other than the week", () => {
    const ctx = buildPregnancyAiContext({ weekNumber: 30, pageFamily: "toolkit" });
    expect(ctx.match(/\d+/g)).toEqual(["30"]);
  });

  it("truncates a long topic and stays under the shared cap", () => {
    const ctx = buildPregnancyAiContext({
      weekNumber: 22,
      pageFamily: "week-detail",
      pageTopic: "hospital bag ".repeat(60),
      toneHint: "practical",
    });
    expect(ctx.length).toBeLessThanOrEqual(PREGNANCY_CONTEXT_MAX_LENGTH);
    expect(PREGNANCY_CONTEXT_MAX_LENGTH).toBe(500);
  });
});

describe("resolvePregnancyPageFamily", () => {
  it("maps every pregnancy route", () => {
    expect(resolvePregnancyPageFamily("/my-week")).toBe("my-week");
    expect(resolvePregnancyPageFamily("/my-week/18")).toBe("my-week");
    expect(resolvePregnancyPageFamily("/my-journey/")).toBe("journey");
    expect(resolvePregnancyPageFamily("/pregnancy-toolkit")).toBe("toolkit");
    expect(resolvePregnancyPageFamily("/pregnancy/week/22")).toBe("week-detail");
    expect(resolvePregnancyPageFamily("/due-date-calculator")).toBe("due-date");
    expect(resolvePregnancyPageFamily("/due-date-results?d=1")).toBe("due-date");
    expect(resolvePregnancyPageFamily("/pregnancy")).toBe("pregnancy-guidance");
    expect(resolvePregnancyPageFamily("/pregnancy/first-trimester")).toBe(
      "pregnancy-guidance",
    );
    expect(resolvePregnancyPageFamily("/ask")).toBe("ask");
  });

  it("returns undefined for non-pregnancy routes", () => {
    for (const path of [
      "/",
      "/my-ttc-journey",
      "/trying-to-conceive",
      "/my-first-year/today",
      "/first-year",
      "/journal",
    ]) {
      expect(resolvePregnancyPageFamily(path)).toBeUndefined();
    }
  });
});

describe("resolvePregnancyRouteWeek", () => {
  it("reads the week from routes that already carry one", () => {
    expect(resolvePregnancyRouteWeek("/my-week/18")).toBe(18);
    expect(resolvePregnancyRouteWeek("/pregnancy/week/22/")).toBe(22);
    expect(resolvePregnancyRouteWeek("/my-week/99")).toBe(42);
  });

  it("returns undefined where there is no week", () => {
    expect(resolvePregnancyRouteWeek("/my-week")).toBeUndefined();
    expect(resolvePregnancyRouteWeek("/pregnancy-toolkit")).toBeUndefined();
    expect(resolvePregnancyRouteWeek("/my-first-year")).toBeUndefined();
  });
});

describe("pregnancyToneHint", () => {
  it("maps saved companion tones onto the allowlist", () => {
    expect(pregnancyToneHint("calm")).toBe("calm");
    expect(pregnancyToneHint("practical")).toBe("practical");
    expect(pregnancyToneHint("warm")).toBe("reassuring");
    expect(pregnancyToneHint(null)).toBeUndefined();
    expect(pregnancyToneHint("anything")).toBeUndefined();
  });
});
