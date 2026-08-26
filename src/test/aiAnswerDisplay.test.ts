import { readdirSync, readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  SAFE_FALLBACK_ANSWER,
  findBannedVerdicts,
  sanitiseAnswerForDisplay,
} from "@/lib/aiAnswerSafety";

/**
 * Phase 29E — every AI surface renders through one shared sanitiser.
 */

const RAW_ANSWER = [
  "Based on the provided NHS evidence, tiredness is very common at this stage.",
  "",
  "Rest where you can and keep fluids up. More at https://www.nhs.uk/pregnancy/",
  "",
  "## Sources",
  "- NHS: https://www.nhs.uk/pregnancy/",
].join("\n");

describe("sanitiseAnswerForDisplay", () => {
  it("strips retrieval wording, source blocks and raw URLs on a finished answer", () => {
    const output = sanitiseAnswerForDisplay(RAW_ANSWER);
    expect(output).not.toMatch(/provided NHS evidence/i);
    expect(output).not.toMatch(/https?:\/\/|www\./);
    expect(output).not.toMatch(/^#*\s*Sources/im);
    expect(output).toMatch(/Rest where you can/);
  });

  it("keeps partial text while streaming and never flashes the fallback", () => {
    expect(sanitiseAnswerForDisplay("Rest wher", { isStreaming: true })).toBe("Rest wher");
    expect(sanitiseAnswerForDisplay("", { isStreaming: true })).toBe("");
  });

  it("returns the single approved fallback when nothing usable survives", () => {
    const refusal = "I cannot provide specific information on this topic because the provided evidence does not cover it.";
    expect(sanitiseAnswerForDisplay(refusal)).toBe(SAFE_FALLBACK_ANSWER);
  });

  it("never returns the fallback line for recap-only surfaces", () => {
    const shortRecap = "A small amount was recorded today.";
    const output = sanitiseAnswerForDisplay(shortRecap, { allowFallback: false });
    expect(output).toBe(shortRecap);
    expect(output).not.toContain(SAFE_FALLBACK_ANSWER);
  });

  it("does not alter clean guidance", () => {
    const clean = "Tiredness is very common at this stage. Rest where you can and keep fluids up.";
    expect(sanitiseAnswerForDisplay(clean)).toBe(clean);
  });
});

describe("banned verdict checker", () => {
  it("reports banned wording without changing the answer", () => {
    const answer = "Your baby is fine and there is no need to call anyone.";
    expect(findBannedVerdicts(answer)).toEqual(
      expect.arrayContaining(["your baby is fine", "no need to call"]),
    );
    expect(sanitiseAnswerForDisplay(answer)).toContain("Your baby is fine");
  });

  it("stays quiet on ordinary guidance", () => {
    expect(findBannedVerdicts("Contact your midwife if the pain continues.")).toEqual([]);
  });
});

/** Every component that renders a model answer must use the shared helper. */
const AI_SURFACES = [
  "src/pages/AskPage.tsx",
  "src/components/companion/CompanionMessageList.tsx",
  "src/components/myweek/SectionAskAI.tsx",
  "src/components/firstyear/journey/FirstYearAskCompanion.tsx",
  "src/components/ttc/journey/TTCAskCompanionCard.tsx",
  "src/components/firstyear/today/DaySummaryCard.tsx",
];

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = `${dir}/${entry}`;
    if (statSync(full).isDirectory()) return walk(full);
    return /\.tsx?$/.test(entry) && !/\.(test|spec)\.tsx?$/.test(entry) ? [full] : [];
  });

describe("output hygiene is consistent across surfaces", () => {
  it("routes every AI surface through sanitiseAnswerForDisplay", () => {
    for (const file of AI_SURFACES) {
      expect(readFileSync(file, "utf8"), file).toContain("sanitiseAnswerForDisplay");
    }
  });

  it("has no local source-splitting helpers left anywhere", () => {
    const offenders = walk("src").filter((file) =>
      /const splitSources\s*=/.test(readFileSync(file, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});
