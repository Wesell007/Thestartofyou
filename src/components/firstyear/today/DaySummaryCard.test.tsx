import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DaySummaryCard from "@/components/firstyear/today/DaySummaryCard";
import type { CareEvent } from "@/lib/firstYearCareEventsSchema";

const handoffMock = vi.fn();

vi.mock("@/components/companion/useCompanionEntryHandoff", () => ({
  useCompanionEntryHandoff: () => handoffMock,
}));

vi.mock("@/hooks/useCompanionIdentity", () => ({
  useCompanionIdentity: () => ({ name: null, tone: null, loading: false }),
}));

const event: CareEvent = {
  id: "e1",
  baby_id: "baby-1",
  event_type: "nappy",
  occurred_at: "2026-08-19T09:00:00.000Z",
  started_at: null,
  ended_at: null,
  amount_ml: null,
  side: null,
  nappy_type: "wee",
  feed_method: null,
  sleep_kind: null,
  note: null,
  metadata: {},
  updated_at: "2026-08-19T09:00:00.000Z",
};

const setup = (events: CareEvent[]) =>
  render(
    <MemoryRouter>
      <DaySummaryCard
        events={events}
        day="2026-08-19"
        babyLabels={{ "baby-1": "Baby 1" }}
        dateOfBirth="2026-06-01"
        babyCount={1}
      />
    </MemoryRouter>,
  );

describe("DaySummaryCard — AIC-J4 entry point", () => {
  beforeEach(() => handoffMock.mockClear());

  it("hands off nothing on render", () => {
    setup([event]);
    expect(handoffMock).not.toHaveBeenCalled();
  });

  it("offers no companion button until something is logged", () => {
    setup([]);
    expect(screen.queryByRole("button", { name: /look back over today/i })).toBeNull();
    expect(screen.getByText(/Add a feed, sleep, nappy or moment first/i)).toBeTruthy();
  });

  it("opens the shared panel with content entry provenance only", () => {
    setup([event]);
    fireEvent.click(screen.getByRole("button", { name: /look back over today/i }));
    expect(handoffMock).toHaveBeenCalledTimes(1);
    const intent = handoffMock.mock.calls[0][0];
    expect(intent.entry).toEqual({
      stage: "first-year",
      journey: "first_year",
      topic: "today",
      title: "Today",
    });
    expect(intent.suggestions.length).toBeGreaterThan(0);
  });

  it("renders no assistant answer region", () => {
    const { container } = setup([event]);
    expect(container.querySelector("[aria-live]")).toBeNull();
  });
});
