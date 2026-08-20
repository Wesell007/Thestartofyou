import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DaySummaryCard from "@/components/firstyear/today/DaySummaryCard";
import type { CareEvent } from "@/lib/firstYearCareEventsSchema";

const askMock = vi.fn();
let state = { answer: "", isLoading: false, error: null as string | null };

vi.mock("@/hooks/useAISearch", () => ({
  useAISearch: () => ({ ...state, ask: askMock, reset: vi.fn() }),
}));

vi.mock("@/hooks/useCompanionIdentity", () => ({
  useCompanionIdentity: () => ({ name: "Cindy", tone: "warm" }),
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
    <DaySummaryCard
      events={events}
      day="2026-08-19"
      babyLabels={{ "baby-1": "Baby 1" }}
      dateOfBirth="2026-06-01"
      babyCount={1}
    />,
  );

describe("DaySummaryCard", () => {
  beforeEach(() => {
    askMock.mockClear();
    state = { answer: "", isLoading: false, error: null };
  });

  it("does not call the companion on render", () => {
    setup([event]);
    expect(askMock).not.toHaveBeenCalled();
  });

  it("offers no button until something is logged", () => {
    setup([]);
    expect(screen.queryByRole("button", { name: /summarise today/i })).toBeNull();
    expect(screen.getByText(/Add a feed, sleep, nappy or moment first/i)).toBeTruthy();
  });

  it("sends only today's care events, with no names, in recap mode", () => {
    setup([event]);
    fireEvent.click(screen.getByRole("button", { name: /summarise today/i }));
    expect(askMock).toHaveBeenCalledTimes(1);
    const [query, context, options] = askMock.mock.calls[0];
    expect(query).toContain("Day: 2026-08-19.");
    expect(query).toContain("Nappy");
    expect(query).not.toMatch(/photo|memory|memories|pregnancy chapter/i);
    expect(context).not.toMatch(/photo|memory|pregnancy chapter/i);
    expect(options).toEqual({ mode: "first_year_day_recap" });
  });

  it("still strips any contact wording, link or sources block defensively", () => {
    state = {
      answer:
        "Today at a glance\nOne nappy change was logged.\nIf you are worried, contact your health visitor.\n\nSources\n\nhttps://www.nhs.uk/baby/",
      isLoading: false,
      error: null,
    };
    setup([event]);
    expect(screen.getByText(/One nappy change was logged\./i)).toBeTruthy();
    expect(screen.queryByText(/health visitor/i)).toBeNull();
    expect(screen.queryByText(/nhs\.uk/i)).toBeNull();
  });

  it("renders the summary once it arrives", () => {
    state = { answer: "Today at a glance\nOne nappy change was logged.", isLoading: false, error: null };
    setup([event]);
    expect(screen.getByText(/One nappy change was logged\./i)).toBeTruthy();
  });

  it("renders the calm error state", () => {
    state = { answer: "", isLoading: false, error: "boom" };
    setup([event]);
    expect(screen.getByText(/could not summarise today just now/i)).toBeTruthy();
  });
});
