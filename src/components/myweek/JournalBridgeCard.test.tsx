import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JournalBridgeCard from "./JournalBridgeCard";

const renderCard = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("JournalBridgeCard", () => {
  it("renders the discovery variant with no ownership prop required", () => {
    renderCard(<JournalBridgeCard />);
    expect(
      screen.getByText("Some things are nicer written by hand.")
    ).toBeInTheDocument();
  });

  it("renders the owner variant by prop only", () => {
    renderCard(<JournalBridgeCard variant="owner" context="week" />);
    expect(
      screen.getByText("This week also has space in your journal.")
    ).toBeInTheDocument();
  });

  it("uses weekly copy in the week context", () => {
    renderCard(<JournalBridgeCard context="week" />);
    expect(
      screen.getByText("Keep the quick moments here, and the longer story by hand.")
    ).toBeInTheDocument();
  });

  it("uses toolkit copy in the compact toolkit cue", () => {
    renderCard(<JournalBridgeCard context="toolkit" tone="inline" />);
    expect(
      screen.getByText(/There is space for this in your journal too\./)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("links to the existing /journal route in every context", () => {
    for (const context of ["week", "journey", "toolkit"] as const) {
      const { unmount } = renderCard(<JournalBridgeCard context={context} />);
      expect(screen.getByRole("link", { name: "See the journal" })).toHaveAttribute(
        "href",
        "/journal"
      );
      unmount();
    }
  });

  it("uses no hard sell copy", () => {
    const { container } = renderCard(<JournalBridgeCard context="journey" />);
    const text = container.textContent ?? "";
    for (const banned of ["Buy", "Upgrade", "offer", "must-have", "need this"]) {
      expect(text.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });
});
