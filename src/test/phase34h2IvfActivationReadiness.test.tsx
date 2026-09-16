import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { format, subDays } from "date-fns";

/**
 * Phase 34H.2 — activation readiness.
 *
 * These tests assert the release state itself: the flag resolves at build time,
 * defaults FALSE, is not turned on anywhere in the repository, and while it is
 * FALSE the save subsystem is absent and no persistence helper is reached.
 *
 * Nothing here activates the feature and nothing writes to a database.
 */

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
  default: ({ transferDate }: { transferDate: Date }) => (
    <div data-testid="timeline-result">{format(transferDate, "yyyy-MM-dd")}</div>
  ),
}));

const FLAG_NAME = "VITE_IVF_TIMELINE_SAVE_ENABLED";

const readText = (relative: string) => readFileSync(join(process.cwd(), relative), "utf8");

const collectFiles = (dir: string, out: string[] = []): string[] => {
  for (const entry of readdirSync(join(process.cwd(), dir))) {
    if (entry === "node_modules" || entry === "dist" || entry.startsWith(".")) continue;
    const relative = `${dir}/${entry}`;
    if (statSync(join(process.cwd(), relative)).isDirectory()) collectFiles(relative, out);
    else out.push(relative);
  }
  return out;
};

beforeEach(() => {
  loadIVFTimelineContext.mockReset();
  saveIVFTimelineContext.mockReset();
  clearIVFTimelineContext.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("phase 34H.2 feature flag resolution", () => {
  it("resolves the flag at build time through import.meta.env", () => {
    const source = readText("src/lib/ivfTimelineFlags.ts");
    expect(source).toContain(`import.meta.env.${FLAG_NAME}`);
    // No runtime configuration source: no fetch, no window lookup, no storage.
    expect(source).not.toMatch(/fetch\(|window\.|localStorage|sessionStorage/);
  });

  it("defaults to FALSE with no environment value supplied", async () => {
    const { IVF_TIMELINE_SAVE_ENABLED } = await import("@/lib/ivfTimelineFlags");
    expect(IVF_TIMELINE_SAVE_ENABLED).toBe(false);
  });

  it("is enabled nowhere in the repository", () => {
    const sources = [
      ...collectFiles("src/lib"),
      ...collectFiles("src/components/ivf"),
      ...collectFiles("scripts"),
      ...collectFiles(".github"),
      "vite.config.ts",
      "package.json",
      ".env.example",
    ];
    const enabling = sources.filter((file) => {
      const text = readText(file);
      return new RegExp(`${FLAG_NAME}\\s*[=:]\\s*["']?true`, "i").test(text);
    });
    expect(enabling).toEqual([]);
  }, 30000);


  it("does not inject the flag through the Vite define map", () => {
    expect(readText("vite.config.ts")).not.toContain(FLAG_NAME);
    expect(readText("scripts/public-backend-defaults.ts")).not.toContain(FLAG_NAME);
  });
});

describe("phase 34H.2 feature-off release contract", () => {
  it("renders no save subsystem and reaches no persistence helper", async () => {
    const IVFTimeline = (await import("@/pages/IVFTimeline")).default;
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/ivf-timeline",
            state: { transferMs: subDays(new Date(), 5).getTime(), transferType: "5day" },
          } as never,
        ]}
      >
        <Routes>
          <Route path="/ivf-timeline" element={<IVFTimeline />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByTestId("timeline-result")).toBeTruthy());
    expect(loadIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(saveIVFTimelineContext).toHaveBeenCalledTimes(0);
    expect(clearIVFTimelineContext).toHaveBeenCalledTimes(0);
    for (const label of [
      /save my timeline/i,
      /update saved timeline/i,
      /remove saved timeline/i,
      /sign in to save/i,
    ]) {
      expect(screen.queryByText(label)).toBeNull();
    }
  }, 20000);
});
