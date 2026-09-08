import { describe, expect, it } from "vitest";
import { resolveCompanionMode, companionAskStage } from "./companionMode";
import { shouldShowCompanionLauncher, COMPANION_ENABLED } from "./companionSurface";
import { companionStarters } from "./companionStarters";
import {
  companionPanelTitle,
  companionLauncherLabel,
  companionSafetyLine,
} from "./companionName";
import {
  buildCompanionPanelContext,
  COMPANION_PANEL_CONTEXT_MAX_LENGTH,
} from "./companionPanelContext";

describe("resolveCompanionMode", () => {
  it("maps TTC routes", () => {
    expect(resolveCompanionMode("/trying-to-conceive")).toBe("ttc_companion");
    expect(resolveCompanionMode("/trying-to-conceive/two-week-wait")).toBe("ttc_companion");
    expect(resolveCompanionMode("/my-ttc-journey")).toBe("ttc_companion");
    expect(resolveCompanionMode("/ovulation-calculator")).toBe("ttc_companion");
  });

  it("maps pregnancy routes", () => {
    for (const path of [
      "/pregnancy",
      "/pregnancy/week/12",
      "/my-week",
      "/my-journey",
      "/pregnancy-toolkit",
      "/due-date-calculator",
      "/due-date-results",
    ]) {
      expect(resolveCompanionMode(path)).toBe("pregnancy_week_companion");
    }
  });

  it("maps first year routes", () => {
    expect(resolveCompanionMode("/first-year")).toBe("first_year_companion");
    expect(resolveCompanionMode("/my-first-year/today")).toBe("first_year_companion");
  });

  it("falls back to general on unknown routes", () => {
    expect(resolveCompanionMode("/")).toBe("general");
    expect(resolveCompanionMode("/journal")).toBe("general");
    expect(resolveCompanionMode("/nonsense/route/here")).toBe("general");
  });

  it("never selects the first year day recap mode", () => {
    const paths = [
      "/",
      "/first-year",
      "/my-first-year",
      "/my-first-year/today",
      "/pregnancy",
      "/trying-to-conceive",
      "/anything",
    ];
    for (const path of paths) {
      expect(resolveCompanionMode(path)).not.toBe("first_year_day_recap");
    }
  });

  it("ignores trailing slashes, case and query strings", () => {
    expect(resolveCompanionMode("/My-Week/")).toBe("pregnancy_week_companion");
    expect(resolveCompanionMode("/ovulation-calculator?lmp=x")).toBe("ttc_companion");
  });

  it("gives safe ask stages only", () => {
    expect(companionAskStage("ttc_companion")).toBe("ttc");
    expect(companionAskStage("general")).toBeUndefined();
  });
});

describe("shouldShowCompanionLauncher", () => {
  it("hides on excluded routes", () => {
    for (const path of ["/ask", "/auth", "/setup", "/setup/trying-to-conceive", "/404"]) {
      expect(shouldShowCompanionLauncher(path)).toBe(false);
    }
  });

  it("shows on allowed routes", () => {
    for (const path of ["/", "/pregnancy", "/my-week", "/journal", "/first-year"]) {
      expect(shouldShowCompanionLauncher(path)).toBe(true);
    }
  });

  it("exposes a kill switch", () => {
    expect(typeof COMPANION_ENABLED).toBe("boolean");
  });
});

describe("companion naming", () => {
  it("uses neutral copy when no name is set", () => {
    expect(companionPanelTitle(null)).toBe("Ask about this");
    expect(companionPanelTitle("   ")).toBe("Ask about this");
    expect(companionLauncherLabel(undefined)).toBe("Ask your companion");
    expect(companionPanelTitle(null)).not.toMatch(/cindy/i);
    expect(companionLauncherLabel(null)).not.toMatch(/cindy/i);
    expect(companionSafetyLine(null)).not.toMatch(/cindy/i);
  });

  it("uses the chosen name when set", () => {
    expect(companionPanelTitle("Wren")).toBe("Ask Wren");
  });

  it("discloses AI and does not replace professional care", () => {
    const line = companionSafetyLine(null);
    expect(line).toMatch(/is AI/);
    expect(line).toMatch(/does not replace/);
  });

  /**
   * AIC-JA4 — the privacy promise has to track what the product does, so the
   * "never reads your notes" wording only survives while journal awareness is
   * switched off.
   */
  it("only promises never to read notes while journal awareness is off", () => {
    expect(companionSafetyLine(null)).toMatch(/does not read your private notes/);
    const aware = companionSafetyLine(null, true);
    expect(aware).not.toMatch(/does not read your private notes/);
    expect(aware).toMatch(/only uses your own journal writing/);
    expect(aware).toMatch(/allow it or choose an entry/);
    expect(aware).toMatch(/is AI/);
    expect(aware).toMatch(/does not replace/);
  });
});

describe("buildCompanionPanelContext", () => {
  it("stays within the shared cap", () => {
    const context = buildCompanionPanelContext({
      mode: "pregnancy_week_companion",
      pathname: "/my-week",
      stageLabel: "x".repeat(400),
      pageTopic: "y".repeat(400),
      pageHint: "z".repeat(400),
      tone: "calm",
    });
    expect(context.length).toBeLessThanOrEqual(COMPANION_PANEL_CONTEXT_MAX_LENGTH);
  });

  it("includes only allowlisted, non-identifying values", () => {
    const context = buildCompanionPanelContext({
      mode: "ttc_companion",
      pathname: "/my-ttc-journey",
      stageLabel: "two week wait",
      tone: "warm",
    });
    expect(context).toContain("trying to conceive");
    expect(context).toContain("two week wait");
    expect(context).not.toMatch(/@/);
    expect(context).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}/);
  });
});

describe("companionStarters", () => {
  it("returns calm, non-diagnostic chips per mode", () => {
    const banned = /(confirmed|you are pregnant|you are not pregnant|risk score|success rate|guarantee)/i;
    for (const mode of [
      "general",
      "ttc_companion",
      "pregnancy_week_companion",
      "first_year_companion",
    ] as const) {
      const chips = companionStarters(mode);
      expect(chips.length).toBeGreaterThan(0);
      for (const chip of chips) expect(chip).not.toMatch(banned);
    }
  });
});
