/**
 * AIC-JA4 — the "Ask about this entry" affordance, at its boundary.
 *
 * The CTA is the only place a journal record becomes a companion hand-off, so
 * it must refuse to exist without a real id, refuse to exist with the client
 * feature gate off, and hand over exactly the typed reference and a generic
 * source label — never the person's own words.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CompanionContext, type CompanionContextValue } from "@/components/companion/companionContext";

const ENTRY_ID = "11111111-1111-4111-8111-111111111111";

const loadCta = async () => {
  vi.resetModules();
  const module = await import("@/components/companion/AskAboutThisEntry");
  return module.default;
};

const stubContext = (openWithJournalEntry: CompanionContextValue["openWithJournalEntry"]) =>
  ({ openWithJournalEntry }) as unknown as CompanionContextValue;

const renderCta = (
  Cta: Awaited<ReturnType<typeof loadCta>>,
  open: CompanionContextValue["openWithJournalEntry"],
  props: Record<string, unknown>,
) =>
  render(
    <CompanionContext.Provider value={stubContext(open)}>
      <Cta source="first_year_memory" {...props} />
    </CompanionContext.Provider>,
  );

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("ask about this entry", () => {
  it("renders nothing while the client journal gate is off", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "false");
    const open = vi.fn();
    const Cta = await loadCta();
    const { container } = renderCta(Cta, open, { entryId: ENTRY_ID });
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing without a real stored id", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "true");
    const Cta = await loadCta();
    for (const entryId of [null, undefined, "", "   ", "not-a-uuid", "12345"]) {
      const { container, unmount } = renderCta(Cta, vi.fn(), { entryId });
      expect(container).toBeEmptyDOMElement();
      unmount();
    }
  });

  it("hands over only the typed reference and a generic label", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "true");
    const open = vi.fn();
    const Cta = await loadCta();
    renderCta(Cta, open, { entryId: ENTRY_ID });

    fireEvent.click(screen.getByRole("button", { name: /ask about this entry/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const intent = open.mock.calls[0][0];
    expect(intent.ref).toEqual({ version: 1, source: "first_year_memory", id: ENTRY_ID });
    expect(Object.keys(intent.ref).sort()).toEqual(["id", "source", "version"]);
    expect(intent.label).toBe("Memory");
  });

  it("never shows the person's own words in the affordance", async () => {
    vi.stubEnv("VITE_COMPANION_JOURNAL_ENABLED", "true");
    const Cta = await loadCta();
    const { container } = renderCta(Cta, vi.fn(), { entryId: ENTRY_ID });
    expect(container.textContent).toBe("Ask about this entry");
  });
});
