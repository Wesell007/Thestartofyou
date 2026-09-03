import { describe, expect, it } from "vitest";
import {
  parseSafetyClassifierProbeResult,
  parseSafetyClassifierProbeText,
} from "./safetyClassifierProbeSchema";

describe("AIC-5B probe validator — accepted", () => {
  it("accepts green", () => {
    expect(parseSafetyClassifierProbeResult({ state: "green" })).toEqual({
      valid: true,
      state: "green",
    });
  });

  it("accepts amber", () => {
    expect(parseSafetyClassifierProbeResult({ state: "amber" })).toEqual({
      valid: true,
      state: "amber",
    });
  });
});

describe("AIC-5B probe validator — rejected", () => {
  const rejected: Array<[string, unknown, string]> = [
    ["red", { state: "red" }, "state-not-allowed"],
    ["crisis", { state: "crisis" }, "state-not-allowed"],
    ["unsupported", { state: "unsupported" }, "state-not-allowed"],
    ["unknown state", { state: "maybe" }, "state-not-allowed"],
    ["extra property", { state: "green", extra: true }, "unexpected-keys"],
    ["explanation property", { state: "amber", explanation: "hello" }, "unexpected-keys"],
    ["empty object", {}, "unexpected-keys"],
    ["alternative field", { safety: "green" }, "missing-state"],
    ["null", null, "not-an-object"],
    ["array", [{ state: "green" }], "not-an-object"],
    ["string", "green", "not-an-object"],
    ["number", 1, "not-an-object"],
    ["non-string state", { state: 1 }, "state-not-a-string"],
    ["uppercase state", { state: "GREEN" }, "state-not-allowed"],
  ];

  it.each(rejected)("rejects %s", (_label, value, reason) => {
    expect(parseSafetyClassifierProbeResult(value)).toEqual({ valid: false, reason });
  });
});

describe("AIC-5B probe validator — raw text", () => {
  it("accepts bare JSON", () => {
    expect(parseSafetyClassifierProbeText('{"state":"green"}')).toEqual({
      valid: true,
      state: "green",
    });
  });

  it("rejects markdown-fenced JSON rather than stripping it", () => {
    expect(parseSafetyClassifierProbeText('```json\n{"state":"green"}\n```')).toEqual({
      valid: false,
      reason: "malformed-json",
    });
  });

  it("rejects leading prose", () => {
    expect(parseSafetyClassifierProbeText('Sure! {"state":"green"}')).toEqual({
      valid: false,
      reason: "malformed-json",
    });
  });

  it("rejects trailing prose", () => {
    expect(parseSafetyClassifierProbeText('{"state":"green"} hope that helps')).toEqual({
      valid: false,
      reason: "malformed-json",
    });
  });

  it("rejects malformed JSON", () => {
    expect(parseSafetyClassifierProbeText("{state: green")).toEqual({
      valid: false,
      reason: "malformed-json",
    });
  });

  it("rejects a non-string input", () => {
    expect(parseSafetyClassifierProbeText({ state: "green" })).toEqual({
      valid: false,
      reason: "not-a-string",
    });
  });
});
