/**
 * AIC-1 — shared companion request foundation.
 *
 * Protects the single request contract, mode parity between the site-wide
 * panel and /ask, and the safe general-mode fallback. No snapshots, and no
 * tests for context/memory features that do not exist yet.
 */

import { describe, expect, it } from "vitest";
import {
  buildCompanionRequest,
  resolveAskMode,
  resolvePanelMode,
} from "@/lib/companion/companionRequest";
import { companionAskStage } from "@/lib/companion/companionMode";

describe("AIC-1 companion request contract", () => {
  it("sends only query, context and mode", () => {
    const request = buildCompanionRequest({
      query: "  Is this normal?  ",
      context: "Journey area: pregnancy.",
      mode: "pregnancy_week_companion",
    });
    expect(Object.keys(request).sort()).toEqual(["context", "mode", "query"]);
    expect(request.query).toBe("Is this normal?");
    expect(request.mode).toBe("pregnancy_week_companion");
  });

  it("drops empty context instead of sending a blank block", () => {
    const request = buildCompanionRequest({ query: "hello", context: "   ", mode: "general" });
    expect(request.context).toBeUndefined();
    expect(Object.keys(request).sort()).toEqual(["mode", "query"]);
  });
});

describe("AIC-1 mode parity between surfaces", () => {
  const routes = [
    "/trying-to-conceive/ovulation",
    "/pregnancy/week/22",
    "/first-year/sleep",
    "/family/play",
  ];

  it("resolves the same mode on /ask as the panel for equivalent journeys", () => {
    for (const pathname of routes) {
      const panelMode = resolvePanelMode(pathname);
      const stage = companionAskStage(panelMode);
      expect(resolveAskMode({ stage })).toBe(panelMode);
    }
  });

  it("maps the authoritative stage keys", () => {
    expect(resolveAskMode({ stage: "ttc" })).toBe("ttc_companion");
    expect(resolveAskMode({ stage: "pregnancy" })).toBe("pregnancy_week_companion");
    expect(resolveAskMode({ stage: "first-year" })).toBe("first_year_companion");
  });
});

describe("AIC-1 general-mode fallback", () => {
  it("falls back to general when no authoritative journey input exists", () => {
    expect(resolveAskMode()).toBe("general");
    expect(resolveAskMode({ stage: null, journey: null })).toBe("general");
    expect(resolveAskMode({ stage: "" })).toBe("general");
  });

  it("keeps general for stages that have no dedicated mode", () => {
    for (const stage of ["toddler", "family", "support", "recovery", "postpartum", "preparing", "ivf"]) {
      expect(resolveAskMode({ stage })).toBe("general");
    }
    expect(resolveAskMode({ stage: null, journey: "ivf" })).toBe("general");
  });

  it("never infers a journey from free text", () => {
    expect(resolveAskMode({ stage: "I am 22 weeks pregnant" })).toBe("general");
  });
});
