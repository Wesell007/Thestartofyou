/**
 * AIC-J4 — contextual journey entry points.
 *
 * Proves the one panel accepts a transient entry hand-off, that opening an
 * entry point causes no model call and sends no hidden user message, that the
 * entry is consumed by the first accepted user turn and never revived, and
 * that the three journey cards are no longer answer surfaces.
 */

import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";

const ask = vi.fn(async () => {});

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
  resolvePersonalJourneyContext: async () => null,
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
import AskAboutThis from "@/components/companion/AskAboutThis";

const Probe = () => {
  const companion = useCompanion();
  const navigate = useNavigate();
  return (
    <div>
      <AskAboutThis
        label="Ask about week 21"
        entry={{ stage: "pregnancy", title: "Week 21" }}
        suggestions={["What changes this week?", "What can I ask my midwife?"]}
      />
      <p data-testid="open">{String(companion.open)}</p>
      <p data-testid="starters">{companion.starters.join("|")}</p>
      <button type="button" onClick={() => companion.send("hello")}>
        send
      </button>
      <button type="button" onClick={() => companion.setOpen(false)}>
        close
      </button>
      <button type="button" onClick={() => navigate("/pregnancy")}>
        go
      </button>
    </div>
  );
};

const mount = () =>
  render(
    <MemoryRouter initialEntries={["/my-week"]}>
      <CompanionProvider>
        <Routes>
          <Route path="*" element={<Probe />} />
        </Routes>
      </CompanionProvider>
    </MemoryRouter>,
  );

const lastEntry = () => {
  const call = ask.mock.calls.at(-1);
  const options = call?.[2] as { journeyContext?: { entry?: unknown } } | undefined;
  return options?.journeyContext?.entry;
};

beforeEach(() => {
  ask.mockClear();
  sessionStorage.clear();
});

afterEach(cleanup);

describe("AIC-J4 contextual entry points", () => {
  it("opens the one panel with presentation-only suggestions and no model call", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: /ask about week 21/i }));
    expect(screen.getByTestId("open").textContent).toBe("true");
    expect(screen.getByTestId("starters").textContent).toBe(
      "What changes this week?|What can I ask my midwife?",
    );
    expect(ask).not.toHaveBeenCalled();
  });

  it("consumes the entry on the first accepted turn and never revives it", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: /ask about week 21/i }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(1));
    expect(lastEntry()).toMatchObject({ stage: "pregnancy", title: "Week 21" });

    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(2));
    expect(lastEntry()).toBeUndefined();
  });

  it("drops an unconsumed entry when the panel is closed", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: /ask about week 21/i }));
    fireEvent.click(screen.getByRole("button", { name: "close" }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(1));
    expect(lastEntry()).toBeUndefined();
  });

  it("drops an unconsumed entry on a route change", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: /ask about week 21/i }));
    fireEvent.click(screen.getByRole("button", { name: "go" }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(1));
    expect(lastEntry()).toBeUndefined();
  });

  it("a new material hand-off can activate a new entry", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: /ask about week 21/i }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: /ask about week 21/i }));
    fireEvent.click(screen.getByRole("button", { name: "send" }));
    await vi.waitFor(() => expect(ask).toHaveBeenCalledTimes(2));
    expect(lastEntry()).toMatchObject({ stage: "pregnancy" });
  });
});

describe("AIC-J4 journey cards are not answer surfaces", () => {
  const cards = [
    "src/components/ttc/journey/TTCAskCompanionCard.tsx",
    "src/components/myweek/SectionAskAI.tsx",
    "src/components/firstyear/journey/FirstYearAskCompanion.tsx",
  ];

  it("makes no direct useAISearch call", () => {
    const hits = cards.filter((path) => /useAISearch/.test(readFileSync(path, "utf8")));
    expect(hits).toEqual([]);
  });

  it("renders no inline answer", () => {
    const hits = cards.filter((path) =>
      /renderAnswerLines|sanitiseAnswerForDisplay|EditorialAnswer/.test(
        readFileSync(path, "utf8"),
      ),
    );
    expect(hits).toEqual([]);
  });
});
