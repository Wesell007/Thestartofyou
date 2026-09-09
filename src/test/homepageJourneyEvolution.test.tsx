import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import JourneyBrandedSection from "@/components/home/JourneyBrandedSection";
import JourneyPreviewSection from "@/components/home/JourneyPreviewSection";
import LifecycleEcosystemSection from "@/components/home/LifecycleEcosystemSection";
import CompanionMomentSection from "@/components/home/CompanionMomentSection";
import Index from "@/pages/Index";

afterEach(cleanup);

const renderAt = (ui: React.ReactElement, entry = "/") =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[entry]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

describe("homepage journey evolution", () => {
  it("offers exactly the three personal journey starts at their canonical entry points", () => {
    renderAt(<JourneyBrandedSection />);

    expect(screen.getByRole("link", { name: /trying to conceive/i })).toHaveAttribute(
      "href",
      "/setup/trying-to-conceive",
    );
    expect(screen.getByRole("link", { name: /pregnancy/i })).toHaveAttribute(
      "href",
      "/due-date-calculator",
    );
    expect(screen.getByRole("link", { name: /first year/i })).toHaveAttribute(
      "href",
      "/setup/first-year",
    );
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.queryByText(/chapter 0[1-3]/i)).toBeNull();
  });

  it("moves keyboard focus to the selector heading when opened by its anchor", async () => {
    renderAt(<JourneyBrandedSection />, "/#start-where-you-are");

    const heading = screen.getByRole("heading", { name: "Start where you are" });
    await waitFor(() => expect(heading).toHaveFocus());
  });

  it("shows a switchable, clearly illustrative preview for each of the three journeys", () => {
    renderAt(<JourneyPreviewSection />);

    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: "Pregnancy" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("My week")).toBeInTheDocument();
    expect(screen.getByText("A meaningful moment")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "TTC" }));
    expect(screen.getByText("My TTC journey")).toBeInTheDocument();
    expect(screen.getByText("Your private cycle notes")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "First Year" }));
    expect(screen.getByText("Four months old")).toBeInTheDocument();
    expect(screen.getByText("My first year")).toBeInTheDocument();
    expect(screen.getByText("A memory to keep")).toBeInTheDocument();
    expect(screen.getByText(/Illustrative only/i)).toBeInTheDocument();
  });

  it("lists exactly three primary and three wider image-led guidance hubs", () => {
    renderAt(<LifecycleEcosystemSection />);

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "/trying-to-conceive",
      "/pregnancy",
      "/first-year",
      "/ivf",
      "/toddler",
      "/family",
    ]);
    expect(screen.getAllByRole("img")).toHaveLength(6);
    expect(screen.queryByText(/preparing for baby/i)).toBeNull();
  });

  it("tells the companion story without starting a second companion runtime", () => {
    renderAt(<CompanionMomentSection />);

    expect(
      screen.getByRole("heading", { name: "Questions change. Your companion stays close." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ask your companion/i })).toHaveAttribute(
      "href",
      "/ask",
    );
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("publishes the approved homepage title and description", async () => {
    renderAt(<Index />);

    await waitFor(() => {
      expect(document.title).toBe("The Start of You | TTC, Pregnancy & First Year");
    });
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Personalised guidance, journalling and a companion for trying to conceive, pregnancy and your baby's first year.",
    );
  });

  it("scrolls and focuses the selector from the hero action", async () => {
    const scrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = vi.fn();
    renderAt(<Index />);

    fireEvent.click(within(screen.getByRole("main")).getByRole("link", { name: "Start your journey" }));
    const heading = screen.getByRole("heading", { name: "Start where you are" });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    Element.prototype.scrollIntoView = scrollIntoView;
  });
});