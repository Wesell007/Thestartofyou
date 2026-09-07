/**
 * AIC-J4 — First Year topic page contextual hand-off.
 *
 * The topic page is CONTENT context. Its Ask affordance opens the one
 * companion panel with a bounded content entry and the topic's own prompts as
 * transient chips. It sends no hidden turn, calls no model on open, and adds
 * no personal lifecycle inference: with no saved journey the personal context
 * stays null, and a genuine J2-resolved saved journey is still available.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const ask = vi.fn(async (..._args: unknown[]) => {});
const resolvePersonal = vi.fn(async () => null as unknown);

vi.mock("@/hooks/useAISearch", () => ({
  useAISearch: () => ({
    answer: "",
    isLoading: false,
    error: null,
    ask: (...args: unknown[]) => ask(...args),
    reset: () => {},
  }),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: async () => ({ data: { session: null } }),
    },
  },
}));

vi.mock("@/lib/companion/journeyPersonalSource", () => ({
  resolvePersonalJourneyContext: () => resolvePersonal(),
}));

vi.mock("@/lib/companion/conversation/conversationRepository", () => ({
  hasConversationSession: async () => false,
}));

vi.mock("@/lib/companion/memory/useCompanionMemoryInteraction", () => ({
  useCompanionMemoryInteraction: () => ({
    state: null,
    busy: false,
    confirm: () => {},
    cancel: () => {},
    dismiss: () => {},
    interceptQuery: async () => false,
  }),
}));

import { CompanionProvider, useCompanion } from "@/components/companion/CompanionProvider";
import FirstYearTopicPage from "@/components/firstyear/topic/FirstYearTopicPage";
import { firstYearTopicConfigs } from "@/data/firstYearTopicData";
import { resetPersonalJourneyCache } from "@/hooks/useCompanionPersonalJourney";

const config = firstYearTopicConfigs.feeding;

const Probe = () => {
  const companion = useCompanion();
  return (
    <div>
      <p data-testid="open">{String(companion.open)}</p>
      <p data-testid="starters">{companion.starters.join("|")}</p>
      <button type="button" onClick={() => companion.send("hello")}>
        send
      </button>
    </div>
  );
};

const mount = () =>
  render(
    <HelmetProvider>
    <MemoryRouter initialEntries={["/first-year/feeding"]}>
      <CompanionProvider>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <FirstYearTopicPage config={config} />
                <Probe />
              </>
            }
          />
        </Routes>
      </CompanionProvider>
    </MemoryRouter>
    </HelmetProvider>,
  );

const lastContext = () => {
  const call = ask.mock.calls.at(-1) as unknown[] | undefined;
  const options = call?.[2] as
    | { journeyContext?: { entry?: unknown; personal?: unknown } }
    | undefined;
  return options?.journeyContext;
};

beforeEach(() => {
  ask.mockClear();
  resolvePersonal.mockReset();
  resolvePersonal.mockResolvedValue(null);
  resetPersonalJourneyCache();
  sessionStorage.clear();
});

afterEach(cleanup);

describe("First Year topic contextual entry", () => {
  it("uses the topic-accurate label and no month wording", () => {
    mount();
    expect(screen.getByRole("button", { name: "Ask about this topic" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ask about this month/i })).toBeNull();
  });

  it("opens the one panel with the topic prompts and makes no model call", () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Ask about this topic" }));
    expect(screen.getByTestId("open").textContent).toBe("true");
    expect(screen.getByTestId("starters").textContent).toBe(
      config.aiPrompts.slice(0, 4).join("|"),
    );
    expect(ask).not.toHaveBeenCalled();
  });

  it("adds no personal lifecycle inference from the topic route", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Ask about this topic" }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(1));
    const context = lastContext();
    expect(context?.personal).toBeUndefined();
    expect(context?.entry).toMatchObject({ stage: "first-year", topic: config.slug });
  });

  it("does not suppress a genuine saved First Year journey", async () => {
    resolvePersonal.mockResolvedValue({ journey: "first-year", babyMonths: 4 });
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Ask about this topic" }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(1));
    const context = lastContext();
    expect(context?.personal).toMatchObject({ journey: "first-year", babyMonths: 4 });
    expect(context?.entry).toMatchObject({ stage: "first-year" });
  });
});
