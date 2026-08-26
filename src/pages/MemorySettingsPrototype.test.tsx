/**
 * Phase 29I — guards for the memory settings prototype.
 *
 * These tests exist to keep the prototype a prototype: default off, sensitive
 * memory unavailable, journal content not usable, synthetic items only, and no
 * Supabase, fetch or browser storage access from the page.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const supabaseFrom = vi.fn();
const supabaseGetSession = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: (...args: unknown[]) => supabaseFrom(...args),
    auth: { getSession: () => supabaseGetSession() },
  },
}));

import MemorySettingsPrototype from "./MemorySettingsPrototype";
import { shouldShowCompanionLauncher } from "@/lib/companion/companionSurface";
import { PROTOTYPE_ITEMS } from "@/components/memory-prototype/memoryPrototypeData";

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/prototype/memory-settings"]}>
        <MemorySettingsPrototype />
      </MemoryRouter>
    </HelmetProvider>,
  );

let fetchSpy: ReturnType<typeof vi.spyOn>;
let localSetSpy: ReturnType<typeof vi.spyOn>;
let localGetSpy: ReturnType<typeof vi.spyOn>;
let sessionSetSpy: ReturnType<typeof vi.spyOn>;
let sessionGetSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  fetchSpy = vi.spyOn(globalThis, "fetch" as never).mockImplementation((() => {
    throw new Error("fetch must not be called from the memory settings prototype");
  }) as never);
  localSetSpy = vi.spyOn(Storage.prototype, "setItem");
  localGetSpy = vi.spyOn(Storage.prototype, "getItem");
  sessionSetSpy = vi.spyOn(window.sessionStorage, "setItem");
  sessionGetSpy = vi.spyOn(window.sessionStorage, "getItem");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("MemorySettingsPrototype", () => {
  it("renders and states that memory is off for now", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { level: 1, name: /memory is off for now/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/prototype only/i).length).toBeGreaterThan(0);
  });

  it("defaults every level to off", () => {
    renderPage();
    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBeGreaterThan(0);
    switches.forEach((control) => expect(control).toHaveAttribute("aria-checked", "false"));
    expect(screen.getByText("Off")).toBeInTheDocument();
    expect(screen.getAllByText("Not enabled")).toHaveLength(3);
  });

  it("shows sensitive memory as unavailable with no control to enable it", () => {
    renderPage();
    const heading = screen.getByRole("heading", { name: "Sensitive memory" });
    const card = heading.closest("li");
    expect(card).not.toBeNull();
    expect(within(card as HTMLElement).getByText(/not available/i)).toBeInTheDocument();
    expect(within(card as HTMLElement).queryByRole("switch")).toBeNull();
    expect(within(card as HTMLElement).queryByRole("button")).toBeNull();
    expect(
      screen.getByRole("heading", { name: /some information is not available for memory/i }),
    ).toBeInTheDocument();
  });

  it("shows journal content as not used and offers no working toggle", () => {
    renderPage();
    const heading = screen.getByRole("heading", { name: /journal entries stay separate/i });
    const card = heading.closest("section");
    expect(card).not.toBeNull();
    expect(within(card as HTMLElement).getByText(/not used/i)).toBeInTheDocument();
    expect(within(card as HTMLElement).queryByRole("switch")).toBeNull();
    expect(screen.getByText("Journal content")).toBeInTheDocument();
  });

  it("renders only the approved synthetic items", () => {
    renderPage();
    PROTOTYPE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
    expect(PROTOTYPE_ITEMS.map((item) => item.label)).toEqual([
      "Prefers shorter companion answers",
      "Likes practical next steps",
      "Prefers gentle reminders",
    ]);
  });

  it("keeps pause and delete in local state only", async () => {
    renderPage();

    const pause = screen.getByRole("button", { name: /pause memory/i });
    fireEvent.click(pause);
    expect(screen.getByRole("button", { name: /resume memory/i })).toBeInTheDocument();
    expect(screen.getByText(/paused in this prototype/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /delete all memory/i }));
    const confirm = await screen.findByRole("button", { name: /clear everything$/i });
    fireEvent.click(confirm);

    await waitFor(() =>
      expect(screen.queryByText("Prefers shorter companion answers")).not.toBeInTheDocument(),
    );

    expect(supabaseFrom).not.toHaveBeenCalled();
    expect(supabaseGetSession).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("makes no Supabase, network or browser storage calls while rendering", () => {
    renderPage();
    expect(supabaseFrom).not.toHaveBeenCalled();
    expect(supabaseGetSession).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(localSetSpy).not.toHaveBeenCalled();
    expect(localGetSpy).not.toHaveBeenCalled();
    expect(sessionSetSpy).not.toHaveBeenCalled();
    expect(sessionGetSpy).not.toHaveBeenCalled();
  });

  it("marks the route noindex", async () => {
    renderPage();
    await waitFor(() => {
      const robots = document.head.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute("content")).toContain("noindex");
    });
  });

  it("suppresses the companion on the prototype route", () => {
    expect(shouldShowCompanionLauncher("/prototype/memory-settings")).toBe(false);
    expect(shouldShowCompanionLauncher("/my-week")).toBe(true);
  });

  it("keeps the prototype out of the source files and the sitemap generator", () => {
    const sitemap = readFileSync(resolve("scripts/generate-sitemap.ts"), "utf8");
    expect(sitemap).not.toContain("/prototype");
    const app = readFileSync(resolve("src/App.tsx"), "utf8");
    expect(app).toContain('path="/prototype/memory-settings"');
    // No navigation surface links to the prototype.
    const nav = readFileSync(resolve("src/components/myweek/MyWeekHeader.tsx"), "utf8");
    expect(nav).not.toContain("/prototype");
  });

  it("does not import the Supabase client from the prototype sources", () => {
    const page = readFileSync(resolve("src/pages/MemorySettingsPrototype.tsx"), "utf8");
    expect(page).not.toContain("integrations/supabase");
    const chrome = readFileSync(
      resolve("src/components/memory-prototype/PrototypeChrome.tsx"),
      "utf8",
    );
    expect(chrome).not.toContain("integrations/supabase");
    expect(chrome).not.toContain("useLifecycle");
  });
});
