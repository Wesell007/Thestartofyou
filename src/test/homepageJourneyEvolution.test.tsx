import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import JourneyBrandedSection from "@/components/home/JourneyBrandedSection";
import JourneyPreviewSection from "@/components/home/JourneyPreviewSection";
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
  });

  it("moves keyboard focus to the selector heading when opened by its anchor", async () => {
    renderAt(<JourneyBrandedSection />, "/#start-where-you-are");

    const heading = screen.getByRole("heading", { name: "Start where you are" });
    await waitFor(() => expect(heading).toHaveFocus());
  });

  it("shows generic public demonstrations for TTC, Pregnancy and First Year", () => {
    renderAt(<JourneyPreviewSection />);

    expect(screen.getByText("TTC")).toBeInTheDocument();
    expect(screen.getByText("Pregnancy")).toBeInTheDocument();
    expect(screen.getByText("First Year")).toBeInTheDocument();
    expect(screen.getAllByText("A typical view")).toHaveLength(3);
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