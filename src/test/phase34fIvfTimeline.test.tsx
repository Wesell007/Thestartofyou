import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { format, subDays } from "date-fns";
import { ivfTopicConfigs, type IVFDestination } from "@/data/ivfTopicData";
import IVFTimelineForm from "@/components/ivf/IVFTimelineForm";

/**
 * Phase 34F — routing fix, standalone tool, and no persistence of treatment
 * information. The timeline result itself is stubbed: these tests are about
 * routing, resolution priority, address hygiene and persistence, not the
 * editorial content of the result.
 */

vi.mock("@/components/layout/Navbar", () => ({ default: () => <nav /> }));
vi.mock("@/components/layout/Footer", () => ({ default: () => <footer /> }));
vi.mock("@/components/seo/SeoHead", () => ({ default: () => null }));
vi.mock("@/components/seo/BreadcrumbJsonLd", () => ({ default: () => null }));
vi.mock("@/components/ivf/IVFTimelineResult", () => ({
  default: ({ transferDate, transferType }: { transferDate: Date; transferType: string }) => (
    <div data-testid="timeline-result">
      {`result ${format(transferDate, "yyyy-MM-dd")} ${transferType}`}
    </div>
  ),
}));

const timelineFormSource = readFileSync("src/components/ivf/IVFTimelineForm.tsx", "utf8");
const heroSource = readFileSync("src/components/ivf/IVFHero.tsx", "utf8");
const timelinePageSource = readFileSync("src/pages/IVFTimeline.tsx", "utf8");
const analyticsSource = readFileSync("src/lib/analytics.ts", "utf8");
const navLifecycleSource = readFileSync("src/lib/navLifecycle.ts", "utf8");

// Imported after the mocks so the page picks them up.
const importPage = async () => (await import("@/pages/IVFTimeline")).default;

const LocationProbe = () => {
  const location = useLocation();
  return (
    <span data-testid="location">{`${location.pathname}${location.search}`}</span>
  );
};

const renderTimelineAt = async (entry: string | { pathname: string; state: unknown }) => {
  const IVFTimeline = await importPage();
  return render(
    <MemoryRouter initialEntries={[entry as never]}>
      <LocationProbe />
      <Routes>
        <Route path="/ivf-timeline" element={<IVFTimeline />} />
      </Routes>
    </MemoryRouter>,
  );
};

const toolDestinations: IVFDestination[] = Object.values(ivfTopicConfigs)
  .map((config) => config.tool)
  .filter((item): item is IVFDestination => Boolean(item));

describe("phase 34F IVF timeline routing", () => {
  it("resolves every stage timeline tool action to /ivf-timeline", () => {
    expect(toolDestinations.length).toBeGreaterThan(0);
    for (const tool of toolDestinations) {
      expect(tool.kind).toBe("tool");
      expect(tool.href).toBe("/ivf-timeline");
    }
  });

  it("leaves zero incorrect tool destinations", () => {
    const incorrect = toolDestinations.filter((tool) => tool.href !== "/ivf-timeline");
    expect(incorrect).toHaveLength(0);
  });

  it("uses one shared calculator implementation from the hub hero", () => {
    expect(heroSource).toContain("IVFTimelineForm");
    expect(heroSource).not.toContain("Popover");
    expect(timelinePageSource).toContain("IVFTimelineForm");
  });
});

describe("phase 34F standalone calculator", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "setItem");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a usable calculator with no navigation state and no parameters", async () => {
    await renderTimelineAt("/ivf-timeline");
    expect(screen.getByLabelText("Embryo transfer date")).toBeTruthy();
    expect(screen.getByLabelText("Transfer type")).toBeTruthy();
    expect(screen.getByRole("button", { name: /track my timeline/i })).toBeTruthy();
    expect(screen.queryByTestId("timeline-result")).toBeNull();
  });

  it("shows no save control anywhere in the tool", async () => {
    await renderTimelineAt("/ivf-timeline");
    expect(screen.queryByText(/save my timeline/i)).toBeNull();
    expect(screen.queryByText(/timeline saved/i)).toBeNull();
    expect(timelineFormSource).not.toMatch(/Save my timeline/);
    expect(timelinePageSource).not.toMatch(/Save my timeline/);
  });

  it("writes nothing to persistent storage while calculating", () => {
    render(
      <MemoryRouter>
        <IVFTimelineForm initialDate={subDays(new Date(), 6)} initialType="5day" />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: /track my timeline/i }));
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
    expect(timelineFormSource).not.toMatch(/localStorage|sessionStorage|supabase/);
    expect(timelinePageSource).not.toMatch(/localStorage|sessionStorage|supabase/);
  });

  it("hands off through navigation state, never a new sensitive address", () => {
    expect(timelineFormSource).toContain('navigate(IVF_TIMELINE_ROUTE, { state })');
    expect(timelineFormSource).not.toMatch(/\?date=/);
    expect(heroSource).not.toMatch(/\?date=/);
  });

  it("renders the timeline for a 5-day transfer passed through navigation state", async () => {
    const date = subDays(new Date(), 8);
    await renderTimelineAt({
      pathname: "/ivf-timeline",
      state: { transferMs: date.getTime(), transferType: "5day" },
    });
    expect(screen.getByTestId("timeline-result").textContent).toContain(format(date, "yyyy-MM-dd"));
    expect(screen.getByTestId("timeline-result").textContent).toContain("5day");
  });

  it("renders the timeline for a 3-day transfer passed through navigation state", async () => {
    const date = subDays(new Date(), 4);
    await renderTimelineAt({
      pathname: "/ivf-timeline",
      state: { transferMs: date.getTime(), transferType: "3day" },
    });
    expect(screen.getByTestId("timeline-result").textContent).toContain("3day");
  });
});

describe("phase 34F legacy address compatibility", () => {
  it("still resolves a valid legacy link and then strips the treatment parameters", async () => {
    const date = subDays(new Date(), 5);
    await renderTimelineAt(`/ivf-timeline?date=${date.getTime()}&type=3day`);
    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe("/ivf-timeline");
    });
    // The reconstructed timeline survives the address replacement.
    expect(screen.getByTestId("timeline-result").textContent).toContain("3day");
  });

  it("prefers navigation state over legacy parameters", async () => {
    const stateDate = subDays(new Date(), 3);
    const legacyDate = subDays(new Date(), 30);
    await renderTimelineAt({
      pathname: "/ivf-timeline",
      search: `?date=${legacyDate.getTime()}&type=5day`,
      state: { transferMs: stateDate.getTime(), transferType: "3day" },
    } as never);
    expect(screen.getByTestId("timeline-result").textContent).toContain(
      format(stateDate, "yyyy-MM-dd"),
    );
  });

  it("falls back safely to the calculator for invalid legacy values", async () => {
    await renderTimelineAt("/ivf-timeline?date=not-a-date&type=nonsense");
    expect(screen.queryByTestId("timeline-result")).toBeNull();
    expect(screen.getByRole("button", { name: /track my timeline/i })).toBeTruthy();
  });
});

describe("phase 34F boundaries", () => {
  it("keeps the saved lifecycle list exactly ttc, pregnancy and first_year", () => {
    expect(navLifecycleSource).toContain(
      'export type NavLifecycle = "pregnancy" | "ttc" | "first_year";',
    );
    expect(navLifecycleSource).not.toMatch(/"ivf"/);
    expect(timelinePageSource).not.toContain("my-ivf-journey");
  });

  it("does not touch trying-to-conceive persistence or AI runtime from the tool", () => {
    for (const source of [timelineFormSource, timelinePageSource]) {
      expect(source).not.toContain("savedTTCJourney");
      expect(source).not.toContain("save_ttc_journey");
      expect(source).not.toContain("journeyPersonalSource");
      expect(source).not.toContain("ai-search");
    }
  });

  it("keeps analytics to page paths only, never treatment values", () => {
    expect(analyticsSource).toContain("window.location.pathname");
    expect(analyticsSource).not.toContain("window.location.search");
    expect(analyticsSource).not.toMatch(/transferType|transfer_date|transferMs/);
  });
});
