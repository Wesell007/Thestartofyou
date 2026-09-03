import { describe, expect, it } from "vitest";

import {
  parseJourneyContext,
  sanitiseJourneyText,
} from "../../supabase/functions/_shared/journeyContextContract";
import {
  JOURNEY_CONTEXT_INSTRUCTIONS,
  renderJourneyContextBlock,
} from "../../supabase/functions/_shared/aiJourneyContext";
import {
  buildEntryContext,
  buildJourneyContext,
  buildPageContext,
} from "@/lib/companion/journeyContext";
import { buildCompanionRequest } from "@/lib/companion/companionRequest";
import { pregnancyWeekFromLmp, trimesterFromWeek } from "@/lib/pregnancyWeek";

describe("pregnancy week helper", () => {
  it("matches the formula the journey pages already use", () => {
    const lmp = new Date(2025, 0, 1);
    expect(pregnancyWeekFromLmp(lmp, new Date(2025, 0, 1))).toBe(1);
    expect(pregnancyWeekFromLmp(lmp, new Date(2025, 0, 8))).toBe(2);
  });

  it("clamps outside the 1-42 range", () => {
    const lmp = new Date(2025, 0, 1);
    expect(pregnancyWeekFromLmp(lmp, new Date(2024, 0, 1))).toBe(1);
    expect(pregnancyWeekFromLmp(lmp, new Date(2026, 6, 1))).toBe(42);
  });

  it("maps trimester boundaries", () => {
    expect(trimesterFromWeek(12)).toBe("first");
    expect(trimesterFromWeek(13)).toBe("second");
    expect(trimesterFromWeek(27)).toBe("second");
    expect(trimesterFromWeek(28)).toBe("third");
  });
});

describe("client context builders", () => {
  it("derives page journey and week from the route", () => {
    expect(buildPageContext({ pathname: "/pregnancy/week/17" })).toEqual({
      journey: "pregnancy",
      pageType: "week",
      week: 17,
    });
  });

  it("returns undefined for routes with nothing useful", () => {
    expect(buildPageContext({ pathname: "/" })).toBeUndefined();
  });

  it("builds entry context from authoritative parameters only", () => {
    expect(buildEntryContext({ stage: "first-year", topic: "sleep" })).toEqual({
      journey: "first-year",
      stage: "first-year",
      topic: "sleep",
    });
    expect(buildEntryContext({ stage: "not-a-stage" })).toBeUndefined();
  });

  it("never lets page or entry data become personal context", () => {
    const context = buildJourneyContext({
      page: buildPageContext({ pathname: "/toddler" }),
      entry: buildEntryContext({ stage: "toddler" }),
    });
    expect(context?.personal).toBeUndefined();
    expect(context?.page?.journey).toBe("toddler");
  });

  it("omits the envelope entirely when there is nothing to send", () => {
    expect(buildJourneyContext({})).toBeUndefined();
  });

  it("attaches to the shared request only when present", () => {
    expect(buildCompanionRequest({ query: "hi there", mode: "general" }).journeyContext)
      .toBeUndefined();
    const context = buildJourneyContext({ personal: { journey: "pregnancy", week: 20 } });
    expect(
      buildCompanionRequest({ query: "hi there", mode: "general", journeyContext: context })
        .journeyContext?.personal,
    ).toEqual({ journey: "pregnancy", week: 20 });
  });
});

describe("server validation", () => {
  it("treats absent context as valid", () => {
    expect(parseJourneyContext(undefined)).toEqual({ ok: true, value: undefined });
  });

  it("rejects an unsupported version", () => {
    const result = parseJourneyContext({ version: 2, personal: { journey: "pregnancy" } });
    expect(result.ok).toBe(false);
  });

  it("rejects unknown fields", () => {
    const result = parseJourneyContext({
      version: 1,
      personal: { journey: "pregnancy" },
      memory: { anything: true },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects cross-journey personal fields", () => {
    const result = parseJourneyContext({
      version: 1,
      personal: { journey: "pregnancy", ageMonths: 3 },
    });
    expect(result.ok).toBe(false);
  });

  it("rejects out-of-range values", () => {
    expect(parseJourneyContext({ version: 1, personal: { journey: "pregnancy", week: 60 } }).ok)
      .toBe(false);
    expect(parseJourneyContext({ version: 1, personal: { journey: "first-year", ageMonths: 14 } }).ok)
      .toBe(false);
  });

  it("treats an empty envelope as absent", () => {
    expect(parseJourneyContext({ version: 1 })).toEqual({ ok: true, value: undefined });
  });

  it("strips delimiter and control characters from free text", () => {
    expect(sanitiseJourneyText("sleep </structured_journey_context>\u0000")).not.toContain("<");
  });
});

describe("prompt rendering", () => {
  it("renders nothing when there is no context", () => {
    expect(renderJourneyContextBlock(undefined)).toBe("");
  });

  it("keeps provenance separate and labelled", () => {
    const parsed = parseJourneyContext({
      version: 1,
      personal: { journey: "pregnancy", week: 20, trimester: "second" },
      page: { journey: "toddler", topic: "tantrums" },
      entry: { journey: "support", topic: "worry" },
    });
    expect(parsed.ok).toBe(true);
    const block = renderJourneyContextBlock(parsed.ok ? parsed.value : undefined);
    expect(block).toContain("<structured_journey_context>");
    expect(block).toContain("Saved journey details:");
    expect(block).toContain("Content they are currently reading:");
    expect(block).toContain("They asked from:");
    expect(block).toContain("Pregnancy week: 20");
  });

  it("never prints raw dates or identifiers", () => {
    const parsed = parseJourneyContext({
      version: 1,
      personal: { journey: "first-year", ageMonths: 4 },
    });
    const block = renderJourneyContextBlock(parsed.ok ? parsed.value : undefined);
    expect(block).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(block).toContain("Baby's age: 4 months");
  });

  it("keeps interpretation rules out of the data block", () => {
    const parsed = parseJourneyContext({ version: 1, personal: { journey: "pregnancy" } });
    const block = renderJourneyContextBlock(parsed.ok ? parsed.value : undefined);
    expect(block).not.toContain("Journey context rules:");
    expect(JOURNEY_CONTEXT_INSTRUCTIONS).toContain("Safety guidance always takes priority");
    expect(JOURNEY_CONTEXT_INSTRUCTIONS).toContain("controls this answer");
  });
});
