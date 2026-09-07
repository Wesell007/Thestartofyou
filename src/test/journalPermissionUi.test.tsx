/**
 * AIC-JA2 — the client half: fail-closed header reading, the permission
 * setting, and the transparency line.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { readJournalContextUsage } from "@/hooks/useAISearch";
import {
  CompanionJournalNote,
  JOURNAL_CONTEXT_NOTE,
} from "@/components/companion/CompanionJournalNote";

const readPermission = vi.fn();
const writePermission = vi.fn();

vi.mock("@/lib/companion/journal/journalPermission", () => ({
  JOURNAL_PERMISSION_COLUMN: "companion_journal_context_enabled",
  readJournalPermission: () => readPermission(),
  writeJournalPermission: (enabled: boolean) => writePermission(enabled),
}));

const loadSection = async () => {
  vi.resetModules();
  const module = await import("@/components/settings/CompanionJournalSection");
  return module.default;
};

beforeEach(() => {
  readPermission.mockReset().mockResolvedValue(false);
  writePermission.mockReset().mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("journal transparency header", () => {
  it("only treats an exact used value as used", () => {
    expect(readJournalContextUsage("used")).toBe(true);
    expect(readJournalContextUsage(" USED ")).toBe(true);
  });

  it("fails closed on anything else", () => {
    for (const value of [null, undefined, "", "none", "true", "1", "unused", "used-ish"]) {
      expect(readJournalContextUsage(value)).toBe(false);
    }
  });
});

describe("transparency line", () => {
  it("says nothing unless the answer actually used the journal", () => {
    const { queryByText, rerender } = render(<CompanionJournalNote used={false} />);
    expect(queryByText(JOURNAL_CONTEXT_NOTE)).toBeNull();
    rerender(<CompanionJournalNote />);
    expect(queryByText(JOURNAL_CONTEXT_NOTE)).toBeNull();
    rerender(<CompanionJournalNote used />);
    expect(screen.getByText(JOURNAL_CONTEXT_NOTE)).toBeTruthy();
  });

  it("never reveals journal content", () => {
    expect(JOURNAL_CONTEXT_NOTE).not.toMatch(/entry|note|week|baby/i);
  });
});

describe("journal permission setting", () => {
  it("is hidden entirely while the client flag is off", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "false");
    const Section = await loadSection();
    const { container } = render(<Section />);
    expect(container.firstChild).toBeNull();
    expect(readPermission).not.toHaveBeenCalled();
  });

  it("shows the stored permission and saves a change", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "true");
    const Section = await loadSection();
    render(<Section />);

    const toggle = await screen.findByRole("switch");
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("false"));

    await act(async () => {
      fireEvent.click(toggle);
    });
    await waitFor(() => expect(writePermission).toHaveBeenCalledWith(true));
    expect(toggle.getAttribute("aria-checked")).toBe("true");
  });

  it("reverts and says so when the save fails", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "true");
    writePermission.mockRejectedValue(new Error("nope"));
    const Section = await loadSection();
    render(<Section />);

    const toggle = await screen.findByRole("switch");
    await act(async () => {
      fireEvent.click(toggle);
    });

    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("false"));
    expect(screen.getByRole("status").textContent).toMatch(/could not be saved/i);
  });

  it("defaults to off when the stored value cannot be read", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "true");
    readPermission.mockRejectedValue(new Error("offline"));
    const Section = await loadSection();
    render(<Section />);

    const toggle = await screen.findByRole("switch");
    await waitFor(() => expect(toggle.getAttribute("aria-checked")).toBe("false"));
  });
});
