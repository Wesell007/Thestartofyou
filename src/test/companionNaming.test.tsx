/**
 * Companion naming cleanup — no default name anywhere.
 *
 * A companion name is only ever shown when the person chose it. With nothing
 * chosen, every surface uses the neutral fallback wording. Cindy stays only as
 * one optional suggested name.
 */

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {
  companionAskLabel,
  companionSentenceSubject,
  companionLauncherLabel,
  companionPanelTitle,
  companionSafetyLine,
  companionSubject,
} from "@/lib/companion/companionName";
import { companionStarters } from "@/lib/companion/companionStarters";
import { SUGGESTED_NAMES } from "@/lib/companion";
import { FIRST_YEAR_SETUP_COPY } from "@/lib/firstYearEntry";
import { COMPANION_INTRO_POINTS } from "@/components/firstyear/setup/firstYearSetupConstants";
import { ALL_TTC_SUPPORT_MOMENTS } from "@/lib/ttcSupportMoment";
import { DAY_SUMMARY_GUARDRAILS } from "@/lib/firstYearDaySummaryPrompt";
import { askButtonLabelFor, askHeadingFor } from "@/lib/ttcAskContext";
import TTCSupportMomentCard from "@/components/ttc/journey/TTCSupportMomentCard";

const NAME = /cindy/i;

let identity: { name: string | null; tone: "calm" | "practical" | "warm" | null } = {
  name: null,
  tone: null,
};

vi.mock("@/hooks/useCompanionIdentity", () => ({
  useCompanionIdentity: () => ({ ...identity, loading: false }),
}));

vi.mock("@/hooks/useAISearch", () => ({
  useAISearch: () => ({
    answer: "",
    isLoading: false,
    error: null,
    ask: vi.fn(),
    reset: vi.fn(),
  }),
}));

// Imported after the mocks so the component picks them up.
const importAskCard = async () =>
  (await import("@/components/firstyear/journey/FirstYearAskCompanion")).default;

describe("companion name helpers", () => {
  it("falls back to neutral wording with no chosen name", () => {
    expect(companionSentenceSubject(null)).toBe("Your companion");
    expect(companionSentenceSubject("  ")).toBe("Your companion");
    expect(companionAskLabel(null)).toBe("Ask your companion");
    expect(companionSubject(null)).toBe("your companion");
    expect(companionPanelTitle(null)).not.toMatch(NAME);
    expect(companionLauncherLabel(null)).not.toMatch(NAME);
    expect(companionSafetyLine(null)).not.toMatch(NAME);
  });

  it("shows a chosen name, including Cindy when the person picked it", () => {
    expect(companionSentenceSubject("Wren")).toBe("Wren");
    expect(companionAskLabel("Wren")).toBe("Ask Wren");
    expect(companionSentenceSubject("Cindy")).toBe("Cindy");
    expect(companionAskLabel("Cindy")).toBe("Ask Cindy");
  });
});

describe("default copy carries no companion name", () => {
  it("keeps starter chips neutral", () => {
    for (const mode of [
      "general",
      "ttc_companion",
      "pregnancy_week_companion",
      "first_year_companion",
    ] as const) {
      for (const starter of companionStarters(mode)) {
        expect(starter).not.toMatch(NAME);
      }
    }
  });

  it("keeps the TTC support actions neutral", () => {
    const labels = ALL_TTC_SUPPORT_MOMENTS.flatMap((moment) =>
      moment.actions.map((action) => action.label),
    );
    for (const label of labels) expect(label).not.toMatch(NAME);
    expect(labels).toContain("Ask your companion");
  });

  it("keeps the TTC ask copy neutral", () => {
    expect(askHeadingFor(null)).not.toMatch(NAME);
    expect(askButtonLabelFor(null)).toBe("Ask your companion");
  });

  it("keeps First Year setup copy neutral", () => {
    expect(JSON.stringify(FIRST_YEAR_SETUP_COPY)).not.toMatch(NAME);
    for (const point of COMPANION_INTRO_POINTS) expect(point).not.toMatch(NAME);
  });

  it("keeps the day recap prompt identity neutral", () => {
    expect(DAY_SUMMARY_GUARDRAILS).not.toMatch(NAME);
    expect(DAY_SUMMARY_GUARDRAILS).toMatch(/gentle First Year companion/);
  });

  it("keeps Cindy available as an optional suggested name only", () => {
    expect(SUGGESTED_NAMES).toContain("Cindy");
  });
});

describe("First Year ask companion surface", () => {
  const renderCard = async () => {
    const Card = await importAskCard();
    return render(
      <MemoryRouter>
        <Card dateOfBirth="2026-06-01" babyCount={1} />
      </MemoryRouter>,
    );
  };

  it("uses the neutral fallback with no chosen name", async () => {
    identity = { name: null, tone: null };
    const { container } = await renderCard();
    expect(container.textContent).not.toMatch(NAME);
    expect(screen.getAllByText(/Ask your companion/i).length).toBeGreaterThan(0);
  });

describe("TTC support moment card", () => {
  const afterTestMoment = ALL_TTC_SUPPORT_MOMENTS.find((m) => m.id === "after_test_result")!;

  it("uses the neutral fallback for the Ask action with no chosen name", () => {
    identity = { name: null, tone: null };
    render(
      <MemoryRouter>
        <TTCSupportMomentCard moment={afterTestMoment} onAddNote={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Ask your companion/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ask Cindy/i)).not.toBeInTheDocument();
  });

  it("shows a chosen name on the Ask action when one exists", () => {
    identity = { name: "Wren", tone: "calm" };
    render(
      <MemoryRouter>
        <TTCSupportMomentCard moment={afterTestMoment} onAddNote={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Ask Wren/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ask Cindy/i)).not.toBeInTheDocument();
  });
});
