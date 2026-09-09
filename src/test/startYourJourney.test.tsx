/**
 * Public journey decision page.
 *
 * Exactly three saved journeys, canonical setup destinations, wider guidance
 * kept separate, auth-aware copy that never nags a signed-in visitor, and no
 * lifecycle selection or data writes from the page itself.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import StartYourJourney from "@/pages/StartYourJourney";
import { resolvePublicAccountLink } from "@/lib/navLifecycle";

const account = vi.hoisted(() => ({
  value: { authed: false as boolean | null, lifecycle: null as string | null },
}));

vi.mock("@/hooks/usePublicAccountLink", () => ({
  usePublicAccountLink: () => ({
    authed: account.value.authed,
    lifecycle: account.value.lifecycle,
    accountLink: resolvePublicAccountLink(account.value.lifecycle as never),
  }),
}));

vi.mock("@/components/layout/Navbar", () => ({ default: () => null }));
vi.mock("@/components/layout/Footer", () => ({ default: () => null }));

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/start-your-journey"]}>
        <StartYourJourney />
      </MemoryRouter>
    </HelmetProvider>,
  );

afterEach(() => {
  cleanup();
  account.value = { authed: false, lifecycle: null };
});

describe("start your journey page", () => {
  it("presents exactly three saved journeys at their canonical setup destinations", () => {
    renderPage();
    const main = within(screen.getByRole("main"));

    expect(main.getByRole("heading", { level: 2, name: "Trying to Conceive" })).toBeInTheDocument();
    expect(main.getByRole("heading", { level: 2, name: "Pregnancy" })).toBeInTheDocument();
    expect(main.getByRole("heading", { level: 2, name: "First Year" })).toBeInTheDocument();

    expect(main.getByRole("link", { name: /start my ttc journey/i })).toHaveAttribute(
      "href",
      "/setup/trying-to-conceive",
    );
    expect(main.getByRole("link", { name: /start my pregnancy journey/i })).toHaveAttribute(
      "href",
      "/due-date-calculator",
    );
    expect(main.getByRole("link", { name: /start my first year journey/i })).toHaveAttribute(
      "href",
      "/setup/first-year",
    );
  });

  it("keeps IVF, Toddler and Family as guidance rather than a fourth journey", () => {
    renderPage();
    const main = within(screen.getByRole("main"));

    expect(main.getByRole("link", { name: /^ivf$/i })).toHaveAttribute("href", "/ivf");
    expect(main.getByRole("link", { name: /^toddler$/i })).toHaveAttribute("href", "/toddler");
    expect(main.getByRole("link", { name: /^family$/i })).toHaveAttribute("href", "/family");
    expect(main.queryByText(/start my ivf journey/i)).toBeNull();
    expect(main.queryByText(/start my toddler journey/i)).toBeNull();
    expect(main.queryByText(/start my family journey/i)).toBeNull();
  });

  it("offers sign in only to signed-out visitors", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /sign in to continue/i })).toHaveAttribute(
      "href",
      expect.stringContaining("/auth"),
    );
  });

  it("offers a continuation link to a signed-in visitor with a saved journey", () => {
    account.value = { authed: true, lifecycle: "ttc" };
    renderPage();

    expect(screen.getByRole("link", { name: "Continue My TTC Journey" })).toHaveAttribute(
      "href",
      "/my-ttc-journey",
    );
    expect(screen.queryByText(/sign in/i)).toBeNull();
  });

  it("uses neutral copy for a signed-in visitor with no saved journey", () => {
    account.value = { authed: true, lifecycle: null };
    renderPage();

    expect(
      screen.getByText(/You haven't started a saved journey yet\. Choose where you'd like to begin\./i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).toBeNull();
  });

  it("recommends from the decision helper without removing the other journeys", () => {
    renderPage();
    const main = within(screen.getByRole("main"));

    fireEvent.click(main.getByRole("button", { name: /are you pregnant now\?/i }));
    expect(main.getByText(/Pregnancy is likely to be the best fit\./i)).toBeInTheDocument();

    expect(main.getByRole("link", { name: /start my ttc journey/i })).toBeInTheDocument();
    expect(main.getByRole("link", { name: /start my first year journey/i })).toBeInTheDocument();
  });

  it("marks the product glimpses as illustrative only", () => {
    renderPage();
    expect(screen.getAllByText(/Illustrative only/i)).toHaveLength(3);
  });
});
