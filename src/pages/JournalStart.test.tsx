import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const navigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => navigate };
});

const getSession = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession: () => getSession() } },
}));

const getActivePregnancyJourney = vi.fn();
vi.mock("@/lib/savedJourney", () => ({
  getActivePregnancyJourney: (...args: unknown[]) => getActivePregnancyJourney(...args),
}));

import JournalStart from "./JournalStart";

const OWNER_KEY = "theStartOfYou:pregnancyJournalOwner";

const renderPage = () =>
  render(
    <MemoryRouter>
      <JournalStart />
    </MemoryRouter>
  );

const signedIn = () =>
  getSession.mockResolvedValue({ data: { session: { user: { id: "u1" } } } });

describe("JournalStart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    getSession.mockResolvedValue({ data: { session: null } });
    getActivePregnancyJourney.mockResolvedValue(null);
  });

  it("renders one heading and both actions, with no sales copy", () => {
    const { container } = renderPage();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Welcome to your digital companion." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start my pregnancy journey" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "I do not have the journal" })
    ).toBeInTheDocument();

    const text = (container.textContent ?? "").toLowerCase();
    for (const banned of [
      "buy now",
      "upgrade",
      "unlock",
      "claim",
      "members only",
      "limited offer",
      "must-have",
      "checkout",
    ]) {
      expect(text).not.toContain(banned);
    }
  });

  it("sends a signed-out visitor into the existing auth start flow", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Start my pregnancy journey" }));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/auth?intent=start_journey"));
    expect(window.localStorage.getItem(OWNER_KEY)).toBe("true");
  });

  it("sends a signed-in user with a journey to /my-week", async () => {
    signedIn();
    getActivePregnancyJourney.mockResolvedValue({ lmp: new Date(), due: new Date() });
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Start my pregnancy journey" }));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/my-week"));
  });

  it("sends a signed-in user without a journey to setup", async () => {
    signedIn();
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Start my pregnancy journey" }));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/setup"));
  });

  it("does not set the preference on the app-only path", async () => {
    signedIn();
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "I do not have the journal" }));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/setup"));
    expect(window.localStorage.getItem(OWNER_KEY)).toBeNull();
  });
});
