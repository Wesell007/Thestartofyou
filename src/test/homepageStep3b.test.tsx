import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import Index from "@/pages/Index";
import HomeCompanion from "@/components/home/step3b/HomeCompanion";
import HomeHero from "@/components/home/step3b/HomeHero";
import { CompanionContext, type CompanionContextValue } from "@/components/companion/companionContext";
import {
  heroFilmTierFor,
  heroPosterFor,
  heroPrefersPoster,
  HERO_POSTERS,
} from "@/components/home/step3b/heroFilmSources";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const renderAt = (ui: React.ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

describe("Step 3B homepage", () => {
  it("tells the story in the approved section order", () => {
    renderAt(<Index />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("From trying, to family life.Yours to keep.");
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Start wherever you are",
      "The same page, wherever you keep it",
      "A Companion that answers carefully",
      "Things worth keeping",
      "One journey that moves with you",
    ]);
    expect(screen.getByText("Brand film · includes AI-generated scenes")).toBeInTheDocument();
  });

  it("links each chapter plate to its guidance hub", () => {
    renderAt(<Index />);

    const plates = document.querySelectorAll(".plates a");
    expect([...plates].map((a) => a.getAttribute("href"))).toEqual([
      "/trying-to-conceive",
      "/pregnancy",
      "/first-year",
      "/toddler",
      "/family",
    ]);
    plates.forEach((plate) => expect(plate.querySelector("img")?.getAttribute("alt")).toBeTruthy());
  });

  it("sends the hero actions to real destinations", () => {
    renderAt(<Index />);

    const hero = document.getElementById("hero") as HTMLElement;
    expect(within(hero).getByRole("link", { name: "Start your journey" })).toHaveAttribute(
      "href",
      "/start-your-journey",
    );
    expect(within(hero).getByRole("link", { name: "Have the journal? Connect it" })).toHaveAttribute(
      "href",
      "/journal-start",
    );
    expect(within(hero).getByRole("link", { name: "Sign in" }).getAttribute("href")).toMatch(/^\/auth/);
  });

  it("carries no prototype review controls and no fake memory controls", () => {
    renderAt(<Index />);

    expect(document.querySelector(".review-bar")).toBeNull();
    expect(screen.queryByText(/previous version/i)).toBeNull();
    const memories = document.getElementById("memories") as HTMLElement;
    expect(within(memories).queryAllByRole("button")).toHaveLength(0);
  });

  it("keeps the film decorative and out of the accessibility tree", () => {
    renderAt(<HomeHero />);

    const video = document.getElementById("heroVideo") as HTMLVideoElement;
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.controls).toBe(false);
    expect(video.loop).toBe(true);
  });

  it("loads no film at all when reduced motion is preferred", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({
        ...original(query),
        matches: query === "(prefers-reduced-motion: reduce)",
      }) as MediaQueryList) as typeof window.matchMedia;
    try {
      renderAt(<HomeHero />);
      expect(document.getElementById("hero")).toHaveClass("use-poster");
      expect(document.querySelectorAll("#heroVideo source")).toHaveLength(0);
    } finally {
      window.matchMedia = original;
    }
  });
});

describe("hero film source selection", () => {
  it("uses the mobile master at 720 px and below", () => {
    expect(heroFilmTierFor({ width: 390, height: 844, dpr: 3, mobile: true })).toBe("mobile");
    expect(heroPosterFor({ width: 390, height: 844, dpr: 3, mobile: true })).toBe(HERO_POSTERS.mobile);
  });

  it("uses 1920 wherever 1280 would be upscaled in the cover-fitted hero", () => {
    expect(heroFilmTierFor({ width: 1440, height: 900, dpr: 1, mobile: false })).toBe("d1920");
    expect(heroFilmTierFor({ width: 1280, height: 800, dpr: 1, mobile: false })).toBe("d1920");
    expect(heroFilmTierFor({ width: 834, height: 1112, dpr: 1, mobile: false })).toBe("d1920");
    expect(heroFilmTierFor({ width: 1024, height: 576, dpr: 1, mobile: false })).toBe("d1280");
  });

  it("falls back to the poster on Save-Data", () => {
    const fake = {
      matchMedia: () => ({ matches: false }),
      navigator: { connection: { saveData: true } },
    } as unknown as Window;
    expect(heroPrefersPoster(fake)).toBe(true);
  });
});

describe("homepage Companion ask", () => {
  const LocationProbe = () => <span data-testid="path">{useLocation().pathname + useLocation().search}</span>;

  it("hands the question to the shared Companion panel without putting it in the URL", () => {
    const setOpen = vi.fn();
    const send = vi.fn();
    const value = { visible: true, setOpen, send } as unknown as CompanionContextValue;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CompanionContext.Provider value={value}>
          <Routes>
            <Route path="*" element={<><HomeCompanion /><LocationProbe /></>} />
          </Routes>
        </CompanionContext.Provider>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "  Is this tiredness normal?  " } });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));

    expect(setOpen).toHaveBeenCalledWith(true);
    expect(send).toHaveBeenCalledWith("Is this tiredness normal?");
    expect(screen.getByTestId("path")).toHaveTextContent(/^\/$/);
    expect(screen.getByLabelText("Your question")).toHaveValue("");
  });

  it("opens the Companion page when the panel is unavailable", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomeCompanion />} />
          <Route path="/ask" element={<p>Companion page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Ask" }));
    expect(screen.getByText("Companion page")).toBeInTheDocument();
  });
});
