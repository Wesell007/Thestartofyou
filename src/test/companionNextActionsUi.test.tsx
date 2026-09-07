/**
 * AIC-J5 — shared next-action UI behaviour.
 *
 * The component itself is deliberately dumb: it renders links only, is
 * accessible, and renders nothing at all when there is no eligible action.
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CompanionNextActions } from "@/components/companion/CompanionNextActions";
import { resolveJourneyNextActions } from "@/lib/companion/journeyNextActions";

afterEach(cleanup);

const renderActions = (
  actions: ReturnType<typeof resolveJourneyNextActions>,
  surface: "companion" | "ask" = "companion",
) =>
  render(
    <MemoryRouter>
      <CompanionNextActions actions={actions} surface={surface} />
    </MemoryRouter>,
  );

describe("CompanionNextActions", () => {
  it("renders nothing when there are no actions", () => {
    const { container } = renderActions([]);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders an accessible navigation group of links only", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "pregnancy", week: 24 },
      signedIn: true,
    });
    renderActions(actions);
    const nav = screen.getByRole("navigation", { name: /next steps in your journey/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View My Week" })).toHaveAttribute("href", "/my-week");
    expect(screen.getByRole("link", { name: "Read week 24 guidance" })).toHaveAttribute(
      "href",
      "/pregnancy/week/24",
    );
    // Navigation only: no buttons, no forms, no nested controls.
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("produces identical labels, order and destinations on both surfaces", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "first-year", ageMonths: 7 },
      signedIn: true,
    });
    const panel = renderActions(actions, "companion");
    const panelLinks = panel
      .getAllByRole("link")
      .map((link) => `${link.textContent}|${link.getAttribute("href")}`);
    cleanup();
    const ask = renderActions(actions, "ask");
    const askLinks = ask
      .getAllByRole("link")
      .map((link) => `${link.textContent}|${link.getAttribute("href")}`);
    expect(askLinks).toEqual(panelLinks);
  });
});


describe("mobile structure", () => {
  // AIC-J6-R3 — structural invariants that keep the layer usable on a narrow
  // screen: comfortable tap targets, wrapping rather than overflow, and a
  // single navigation group per surface.
  it("keeps comfortable, wrapping tap targets and one navigation group", () => {
    const actions = resolveJourneyNextActions({
      personal: { journey: "trying-to-conceive", ttcStage: "trying_naturally" },
      signedIn: true,
    });
    renderActions(actions);
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
    const list = screen.getByRole("list");
    expect(list.className).toContain("flex-wrap");
    for (const link of screen.getAllByRole("link")) {
      expect(link.className).toContain("min-h-[44px]");
      expect(link.className).not.toContain("whitespace-nowrap");
    }
  });
});

