import { describe, expect, it } from "vitest";
import {
  buildCompanionPanelContext,
  COMPANION_PANEL_CONTEXT_MAX_LENGTH,
} from "./companionPanelContext";

describe("buildCompanionPanelContext", () => {
  it("uses the pregnancy contract on pregnancy routes", () => {
    const ctx = buildCompanionPanelContext({
      mode: "pregnancy_week_companion",
      pathname: "/my-week/18",
      tone: "warm",
    });
    expect(ctx).toContain("Journey: pregnancy.");
    expect(ctx).toContain("week 18, second trimester");
    expect(ctx).toContain("My Week");
    expect(ctx).toContain("warm and reassuring");
  });

  it("omits the week when the pregnancy route does not carry one", () => {
    const ctx = buildCompanionPanelContext({
      mode: "pregnancy_week_companion",
      pathname: "/pregnancy-toolkit",
    });
    expect(ctx).toContain("the pregnancy toolkit");
    expect(ctx).not.toContain("Current stage");
  });

  it("ignores private-looking stage labels on pregnancy routes", () => {
    const ctx = buildCompanionPanelContext({
      mode: "pregnancy_week_companion",
      pathname: "/my-journey",
      stageLabel: "due 9 March 2026",
    });
    expect(ctx).not.toContain("March");
    expect(ctx).not.toContain("2026");
  });

  it("leaves TTC and First Year context unchanged", () => {
    const ttc = buildCompanionPanelContext({
      mode: "ttc_companion",
      pathname: "/my-ttc-journey",
    });
    expect(ttc).toContain("Journey area: trying to conceive.");
    expect(ttc).toContain("trying to conceive guidance");

    const firstYear = buildCompanionPanelContext({
      mode: "first_year_companion",
      pathname: "/my-first-year/today",
    });
    expect(firstYear).toContain("Journey area: first year.");
    expect(firstYear).toContain("first year guidance");
  });

  it("stays under the shared cap", () => {
    const ctx = buildCompanionPanelContext({
      mode: "general",
      pathname: "/journal",
      pageHint: "x".repeat(900),
    });
    expect(ctx.length).toBeLessThanOrEqual(COMPANION_PANEL_CONTEXT_MAX_LENGTH);
  });
});
