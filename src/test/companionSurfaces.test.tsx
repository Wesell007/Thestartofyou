/**
 * WC-4 — Companion / Ask experience consolidation.
 *
 * Exactly two intentional AI surfaces: the site-wide companion panel (opened
 * only by the launcher) and the dedicated /ask page. Every other companion
 * entry point routes to /ask. Terminology stays in the companion family and
 * personalised naming keeps coming from useCompanionIdentity.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Footer from "@/components/layout/Footer";
import JournalMoment from "@/components/home/JournalMoment";
import Navbar from "@/components/layout/Navbar";
import { CompanionProvider } from "@/components/companion/CompanionProvider";
import CompanionLauncher from "@/components/companion/CompanionLauncher";
import CompanionPanel from "@/components/companion/CompanionPanel";
import { askDestination } from "@/lib/askNavigation";
import { companionLauncherLabel } from "@/lib/companion/companionName";

vi.mock("@/hooks/useCompanionIdentity", () => ({
  useCompanionIdentity: () => ({ name: null, tone: null, loading: false }),
}));

const renderAt = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const hrefOf = (el: HTMLElement) => el.getAttribute("href");

// Each case mounts a heavy tree (Navbar / Footer / companion provider). Without
// an explicit unmount the trees accumulate for the whole file, which both slows
// later cases down and leaves consent state behind for them.
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("WC-4 companion entry points", () => {
  it("keeps /ask as the shared destination for inline Ask navigation", () => {
    expect(askDestination()).toEqual({ pathname: "/ask", search: "" });
    expect(askDestination({ stage: "pregnancy" })).toEqual({
      pathname: "/ask",
      search: "?stage=pregnancy",
    });
  });

  it("routes the footer companion entry to /ask", () => {
    renderAt(<Footer />);
    const link = screen.getByRole("link", { name: /ask your companion/i });
    expect(hrefOf(link)).toBe("/ask");
  });

  it("routes the homepage companion discovery line to /ask", () => {
    renderAt(<JournalMoment />);
    const link = screen.getByRole("link", { name: /ask your companion/i });
    expect(hrefOf(link)).toBe("/ask");
  });

  it("uses neutral companion wording for the launcher when no name is chosen", () => {
    expect(companionLauncherLabel(null)).toMatch(/companion/i);
    expect(companionLauncherLabel(null)).not.toMatch(/cindy/i);
  });

  it("keeps personalised companion naming when a name exists", () => {
    expect(companionLauncherLabel("Wren")).toMatch(/Wren/);
  });
});

describe("WC-4 navigation terminology", () => {
  it("points the desktop and mobile nav companion entries at /ask", () => {
    renderAt(<Navbar />);
    const links = screen
      .getAllByRole("link", { name: /companion/i })
      .map(hrefOf);
    expect(links.length).toBeGreaterThan(0);
    expect(new Set(links)).toEqual(new Set(["/ask"]));
  });
});

describe("WC-4 companion panel", () => {
  it("opens the panel only from the launcher", async () => {
    window.localStorage.setItem("tsoy_consent_analytics_v1", "accepted");

    render(
      <MemoryRouter initialEntries={["/pregnancy"]}>
        <CompanionProvider>
          <CompanionLauncher />
          <CompanionPanel />
        </CompanionProvider>
      </MemoryRouter>,
    );

    const launcher = await screen.findByRole("button", { name: /companion/i });
    fireEvent.click(launcher);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
