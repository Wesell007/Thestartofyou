import { describe, expect, it } from "vitest";
import { resolveMemoryCommand } from "@/lib/companion/memory/memoryIntent";

describe("AIC-3 explicit memory commands", () => {
  it("recognises a plain remember command", () => {
    expect(resolveMemoryCommand("Remember that I prefer short answers")).toEqual({
      kind: "remember",
      value: "I prefer short answers",
    });
    expect(resolveMemoryCommand("Please remember I work night shifts")).toEqual({
      kind: "remember",
      value: "I work night shifts",
    });
  });

  it("recognises forget, with and without a target", () => {
    expect(resolveMemoryCommand("Forget that I work night shifts")).toEqual({
      kind: "forget",
      reference: "I work night shifts",
    });
    expect(resolveMemoryCommand("forget that")).toEqual({ kind: "forget", reference: null });
  });

  it("recognises an explicit replacement", () => {
    expect(
      resolveMemoryCommand('Replace "I prefer long answers" with "I prefer short answers"'),
    ).toEqual({
      kind: "replace",
      oldValue: "I prefer long answers",
      newValue: "I prefer short answers",
    });
  });

  it("treats ordinary conversation as ordinary conversation", () => {
    for (const message of [
      "I am 20 weeks pregnant and feeling tired",
      "Will you remember this conversation?",
      "It is hard to remember everything at the moment",
      "My midwife told me to rest",
      "what should I pack in my hospital bag",
      "",
    ]) {
      expect(resolveMemoryCommand(message)).toBeNull();
    }
  });
});
