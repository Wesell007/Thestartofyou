/**
 * Phase 29I QA — pageviews must not fire on design prototype routes, and must
 * still fire on normal routes.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const trackPageView = vi.fn();
vi.mock("@/lib/analytics", () => ({
  trackPageView: (...args: unknown[]) => trackPageView(...args),
}));

import RouteTracker from "./RouteTracker";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <RouteTracker />
    </MemoryRouter>,
  );

afterEach(() => {
  vi.clearAllMocks();
});

describe("RouteTracker", () => {
  it("fires a pageview on a normal route", () => {
    renderAt("/pregnancy");
    expect(trackPageView).toHaveBeenCalledWith("/pregnancy");
  });

  it("fires no pageview on prototype routes", () => {
    renderAt("/prototype/memory-settings");
    expect(trackPageView).not.toHaveBeenCalled();
  });
});
