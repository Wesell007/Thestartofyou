import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

import { buildAuthUrl } from "@/lib/authIntent";

const read = (path: string) => readFileSync(path, "utf8");

describe("pregnancy setup route boundaries", () => {
  it("allows /setup/pregnancy as a return target after signing in", () => {
    expect(buildAuthUrl("start_journey", "/setup/pregnancy")).toBe(
      "/auth?intent=start_journey&return_to=%2Fsetup%2Fpregnancy",
    );
  });

  it("still refuses external return targets", () => {
    expect(buildAuthUrl("start_journey", "https://evil.example")).toBe(
      "/auth?intent=start_journey",
    );
  });

  it("keeps every setup route out of the sitemap", () => {
    const sitemap = read("scripts/generate-sitemap.ts");
    expect(sitemap).not.toContain("/setup/pregnancy");
    expect(sitemap).not.toContain("/setup/first-year");
    expect(sitemap).not.toContain("/setup/trying-to-conceive");
  });

  it("marks all three setup pages as non-indexed", () => {
    for (const path of [
      "src/pages/setup/PregnancySetup.tsx",
      "src/pages/setup/FirstYearSetup.tsx",
      "src/pages/SetupTTC.tsx",
    ]) {
      expect(read(path)).toContain("noindex");
    }
  });

  it("puts no pregnancy setup value in the URL and uses one calculation source", () => {
    const page = read("src/pages/setup/PregnancySetup.tsx");
    expect(page).not.toContain("/due-date-results");
    expect(page).not.toContain("lmp=");
    expect(page).toContain("DueDateCalculatorForm");
    expect(page).toContain("computeResult");
    // Only the existing pending contract (the derived LMP) is persisted.
    expect(page).toContain("stashPendingJourney(lmp)");
    // No method-specific input is persisted: no direct storage writes, and no
    // transfer type, scan measurement or conception date leaves the page.
    expect(page).not.toContain("localStorage");
    expect(page).not.toContain("ivfType");
    expect(page).not.toContain("usWeeks");
    expect(page).not.toContain("conceptionDate");
  });

  it("keeps the public calculator on its existing results handoff", () => {
    expect(read("src/pages/DueDateCalculator.tsx")).toContain("/due-date-results");
  });

  it("sends pregnancy-committed entry points to the setup route", () => {
    expect(read("src/pages/StartYourJourney.tsx")).toContain(
      'href: "/setup/pregnancy"',
    );
  });
});
