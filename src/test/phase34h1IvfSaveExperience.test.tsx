import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import type { IVFTransferType } from "@/lib/ivfTimeline";

/**
 * Phase 34H.1 — the IVF timeline save experience.
 *
 * The feature flag is mocked per file: the real default stays FALSE and the
 * shared environment flag is never enabled. Authentication, lifecycle and the
 * three Phase 34G persistence helpers are mocked, so no treatment value is
 * ever written to a real database by these tests.
 */

const flagState = { enabled: true };
const lifecycleState = {
  authed: true,
  lifecycle: "ttc" as "ttc" | "pregnancy" | "first_year" | null,
  hasKeptChapter: false,
  loading: false,
};

vi.mock("@/lib/ivfTimelineFlags", () => ({
  get IVF_TIMELINE_SAVE_ENABLED() {
    return flagState.enabled;
  },
}));

vi.mock("@/lib/useLifecycle", () => ({
  useLifecycle: () => lifecycleState,
}));

const loadIVFTimelineContext = vi.fn();
const saveIVFTimelineContext = vi.fn();
const clearIVFTimelineContext = vi.fn();

vi.mock("@/lib/savedTTCJourney", () => ({
  loadIVFTimelineContext: (...args: unknown[]) => loadIVFTimelineContext(...args),
  saveIVFTimelineContext: (...args: unknown[]) => saveIVFTimelineContext(...args),
  clearIVFTimelineContext: (...args: unknown[]) => clearIVFTimelineContext(...args),
}));

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

const importPage = async () => (await import("@/pages/IVFTimeline")).default;

const okContext = (date: string | null, type: IVFTransferType | null) => ({
  ok: true as const,
  context: { transfer_date: date, transfer_type: type },
});

const NavTrigger = () => {
  const navigate = useNavigate();
  const date = subDays(new Date(), 2);
  return (
    <button
      type="button"
      onClick={() =>
        navigate("/ivf-timeline", {
          state: { transferMs: date.getTime(), transferType: "5day" },
        })
      }
    >
      calculate now
    </button>
  );
};

const renderPage = async (entry: string | { pathname: string; state: unknown }) => {
  const IVFTimeline = await importPage();
  return render(
    <MemoryRouter initialEntries={[entry as never]}>
      <Routes>
        <Route
          path="/ivf-timeline"
          element={
            <>
              <NavTrigger />
              <IVFTimeline />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
};

const withCalculation = (daysAgo = 6, type: IVFTransferType = "5day") => ({
  pathname: "/ivf-timeline",
  state: { transferMs: subDays(new Date(), daysAgo).getTime(), transferType: type },
});

beforeEach(() => {
  flagState.enabled = true;
  lifecycleState.authed = true;
  lifecycleState.lifecycle = "ttc";
  lifecycleState.loading = false;
  loadIVFTimelineContext.mockReset().mockResolvedValue(okContext(null, null));
  saveIVFTimelineContext.mockReset().mockResolvedValue({ ok: true });
  clearIVFTimelineContext.mockReset().mockResolvedValue({ ok: true });
  vi.spyOn(Storage.prototype, "setItem");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("phase 34H.1 feature-off boundary", () => {
  beforeEach(() => {
    flagState.enabled = false;
  });

  it("mounts no save controller and never reads persistence", async () => {
    await renderPage(withCalculation());
    await waitFor(() => expect(screen.getByTestId("timeline-result")).toBeTruthy());
    expect(loadIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(clearIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(screen.queryByRole("button", { name: /save my timeline/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /update saved timeline/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /remove saved timeline/i })).toBeNull();
    expect(screen.queryByText(/timeline saved/i)).toBeNull();
    expect(screen.queryByText(/sign in to save/i)).toBeNull();
  });

  it("keeps the standalone calculator exactly as Phase 34F left it", async () => {
    await renderPage("/ivf-timeline");
    expect(screen.getByLabelText("Embryo transfer date")).toBeTruthy();
    expect(loadIVFTimelineContext).toHaveBeenCalledTimes(0);
  });
});

describe("phase 34H.1 signed out", () => {
  beforeEach(() => {
    lifecycleState.authed = false;
    lifecycleState.lifecycle = null;
  });

  it("offers no save experience before a calculation", async () => {
    await renderPage("/ivf-timeline");
    expect(screen.getByLabelText("Embryo transfer date")).toBeTruthy();
    expect(screen.queryByText(/sign in to save/i)).toBeNull();
    expect(loadIVFTimelineContext).toHaveBeenCalledTimes(0);
  });

  it("shows a sign-in CTA that states values must be re-entered, and writes nothing", async () => {
    await renderPage(withCalculation());
    expect(await screen.findByText("Want to keep this timeline?")).toBeTruthy();
    expect(
      screen.getByText(/re-enter your transfer details to save them/i),
    ).toBeTruthy();
    const cta = screen.getByRole("link", { name: /sign in to save/i });
    expect(cta.getAttribute("href")).toContain("/auth");
    expect(cta.getAttribute("href")).toContain("return_to=%2Fivf-timeline");
    expect(cta.getAttribute("href")).not.toMatch(/transfer|date=|5day/);
    fireEvent.click(cta);
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(loadIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
  });
});

describe("phase 34H.1 active TTC save and update", () => {
  it("offers Save my timeline and saves the two source values exactly once", async () => {
    const date = subDays(new Date(), 6);
    await renderPage(withCalculation(6));
    const button = await screen.findByRole("button", { name: /save my timeline/i });
    expect(screen.getByText(/Calculated milestones are not stored\./i)).toBeTruthy();

    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Timeline saved" })).toBeTruthy(),
    );
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(1);
    expect(saveIVFTimelineContext).toHaveBeenCalledWith({
      transfer_date: format(date, "yyyy-MM-dd"),
      transfer_type: "5day",
    });
  });

  it("shows a saved state with no redundant Save when stored context matches", async () => {
    const date = subDays(new Date(), 4);
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(date, "yyyy-MM-dd"), "5day"),
    );
    await renderPage(withCalculation(4));
    expect(await screen.findByText("Timeline saved")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /save my timeline/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /update saved timeline/i })).toBeNull();
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
  });

  it("offers Update saved timeline when the calculation differs", async () => {
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(subDays(new Date(), 40), "yyyy-MM-dd"), "3day"),
    );
    await renderPage(withCalculation(3));
    const button = await screen.findByRole("button", { name: /update saved timeline/i });
    expect(
      screen.getByText(/replace the transfer details currently saved/i),
    ).toBeTruthy();
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    await waitFor(() => expect(saveIVFTimelineContext).toHaveBeenCalledTimes(1));
  });

  it("shows no IVF-specific save timestamp", async () => {
    const date = subDays(new Date(), 4);
    loadIVFTimelineContext.mockResolvedValue(okContext(format(date, "yyyy-MM-dd"), "5day"));
    await renderPage(withCalculation(4));
    expect(await screen.findByText("Timeline saved")).toBeTruthy();
    expect(screen.queryByText(/saved at|last saved|updated at/i)).toBeNull();
  });
});

describe("phase 34H.1 restoration and priority", () => {
  it("reconstructs a usable saved timeline when nothing is on screen", async () => {
    const date = subDays(new Date(), 9);
    loadIVFTimelineContext.mockResolvedValue(okContext(format(date, "yyyy-MM-dd"), "3day"));
    await renderPage("/ivf-timeline");
    await waitFor(() =>
      expect(screen.getByTestId("timeline-result").textContent).toContain(
        format(date, "yyyy-MM-dd"),
      ),
    );
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(clearIVFTimelineContext).toHaveBeenCalledTimes(0);
  });

  it("keeps a current calculation ahead of older saved context", async () => {
    const current = subDays(new Date(), 2);
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(subDays(new Date(), 50), "yyyy-MM-dd"), "3day"),
    );
    await renderPage(withCalculation(2));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /update saved timeline/i })).toBeTruthy(),
    );
    expect(screen.getByTestId("timeline-result").textContent).toContain(
      format(current, "yyyy-MM-dd"),
    );
  });

  it("never lets a late saved-context load overwrite a newer calculation", async () => {
    const savedDate = subDays(new Date(), 30);
    let resolveLoad: ((value: unknown) => void) | null = null;
    loadIVFTimelineContext.mockReturnValue(
      new Promise((resolve) => {
        resolveLoad = resolve;
      }),
    );

    await renderPage("/ivf-timeline");
    // The person calculates while the saved-context read is still in flight.
    fireEvent.click(screen.getByRole("button", { name: /calculate now/i }));
    const expected = format(subDays(new Date(), 2), "yyyy-MM-dd");
    expect(screen.getByTestId("timeline-result").textContent).toContain(expected);

    resolveLoad?.(okContext(format(savedDate, "yyyy-MM-dd"), "3day"));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /update saved timeline/i })).toBeTruthy(),
    );
    // Their own calculation is still the displayed timeline.
    expect(screen.getByTestId("timeline-result").textContent).toContain(expected);
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
  });
});

describe("phase 34H.1 historical context and other lifecycles", () => {
  const historicalDate = subDays(new Date(), 420);

  it("keeps out-of-range saved context readable and never clears it", async () => {
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(historicalDate, "yyyy-MM-dd"), "5day"),
    );
    await renderPage("/ivf-timeline");
    expect(await screen.findByText("Saved IVF timeline")).toBeTruthy();
    expect(screen.getByText(new RegExp(format(historicalDate, "d MMMM yyyy")))).toBeTruthy();
    expect(screen.queryByTestId("timeline-result")).toBeNull();
    expect(clearIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(screen.getByRole("button", { name: /remove saved timeline/i })).toBeTruthy();
  });

  it("treats saved context as historical during pregnancy", async () => {
    lifecycleState.lifecycle = "pregnancy";
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(subDays(new Date(), 20), "yyyy-MM-dd"), "5day"),
    );
    await renderPage("/ivf-timeline");
    expect(await screen.findByText("Saved IVF timeline")).toBeTruthy();
    expect(screen.queryByTestId("timeline-result")).toBeNull();
    expect(screen.queryByRole("button", { name: /save my timeline/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /update saved timeline/i })).toBeNull();
    expect(screen.getByRole("button", { name: /remove saved timeline/i })).toBeTruthy();
  });

  it("treats saved context as historical during the first year", async () => {
    lifecycleState.lifecycle = "first_year";
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(subDays(new Date(), 20), "yyyy-MM-dd"), "3day"),
    );
    await renderPage(withCalculation(2));
    expect(await screen.findByText("Saved IVF timeline")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /save my timeline/i })).toBeNull();
    expect(screen.getByRole("button", { name: /remove saved timeline/i })).toBeTruthy();
  });

  it("leaves the calculator usable with no persistence CTA outside TTC", async () => {
    lifecycleState.lifecycle = "pregnancy";
    await renderPage(withCalculation(2));
    await waitFor(() => expect(loadIVFTimelineContext).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole("button", { name: /save my timeline/i })).toBeNull();
    expect(screen.queryByText("Saved IVF timeline")).toBeNull();
  });
});

describe("phase 34H.1 remove", () => {
  beforeEach(() => {
    loadIVFTimelineContext.mockResolvedValue(
      okContext(format(subDays(new Date(), 6), "yyyy-MM-dd"), "5day"),
    );
  });

  it("does nothing when the confirmation is cancelled", async () => {
    await renderPage(withCalculation(6));
    fireEvent.click(await screen.findByRole("button", { name: /remove saved timeline/i }));
    expect(await screen.findByText("Remove your saved IVF timeline?")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(clearIVFTimelineContext).toHaveBeenCalledTimes(0);
  });

  it("clears once on confirmation and keeps the calculation on screen", async () => {
    const date = subDays(new Date(), 6);
    await renderPage(withCalculation(6));
    fireEvent.click(await screen.findByRole("button", { name: /remove saved timeline/i }));
    const dialogConfirm = await screen.findByRole("button", {
      name: /^remove saved timeline$/i,
    });
    fireEvent.click(dialogConfirm);

    await waitFor(() => expect(clearIVFTimelineContext).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /save my timeline/i })).toBeTruthy(),
    );
    expect(screen.getByTestId("timeline-result").textContent).toContain(
      format(date, "yyyy-MM-dd"),
    );
  });
});

describe("phase 34H.1 no TTC journey", () => {
  it("explains the product state and never creates a journey", async () => {
    loadIVFTimelineContext.mockResolvedValue({ ok: false, reason: "no_ttc_journey" });
    lifecycleState.lifecycle = null;
    await renderPage(withCalculation(3));
    expect(
      await screen.findByText("Saving is connected to a Trying to Conceive journey."),
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: /save my timeline/i })).toBeNull();
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(screen.getByRole("link", { name: /start your ttc journey/i })).toBeTruthy();
  });

  it("offers no journey-start action when another lifecycle is active", async () => {
    loadIVFTimelineContext.mockResolvedValue({ ok: false, reason: "no_ttc_journey" });
    lifecycleState.lifecycle = "pregnancy";
    await renderPage(withCalculation(3));
    expect(
      await screen.findByText("Saving is connected to a Trying to Conceive journey."),
    ).toBeTruthy();
    expect(screen.queryByRole("link", { name: /start your ttc journey/i })).toBeNull();
  });
});

describe("phase 34H.1 errors and privacy", () => {
  it("shows calm generic copy and no database detail when a save fails", async () => {
    saveIVFTimelineContext.mockResolvedValue({
      ok: false,
      reason: "error",
      message: "duplicate key value violates unique constraint ttc_journeys_pkey",
    });
    await renderPage(withCalculation(5));
    fireEvent.click(await screen.findByRole("button", { name: /save my timeline/i }));
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toBe("Something went wrong. Please try again.");
    expect(document.body.textContent).not.toContain("ttc_journeys_pkey");
  });

  it("writes no treatment value to browser storage", async () => {
    await renderPage(withCalculation(5));
    fireEvent.click(await screen.findByRole("button", { name: /save my timeline/i }));
    await waitFor(() => expect(saveIVFTimelineContext).toHaveBeenCalledTimes(1));
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
  });
});
