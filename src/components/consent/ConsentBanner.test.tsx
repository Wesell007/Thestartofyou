/**
 * Phase 29I QA — the analytics consent banner must never appear on design
 * prototype routes, and must be unchanged everywhere else.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConsentBanner from "./ConsentBanner";
import { resetAnalyticsConsent } from "@/lib/consent";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ConsentBanner />
    </MemoryRouter>,
  );

beforeEach(() => {
  window.localStorage.clear();
  resetAnalyticsConsent();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ConsentBanner", () => {
  it("renders on a normal route when consent is unknown", async () => {
    renderAt("/");
    expect(
      await screen.findByRole("button", { name: /accept analytics/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reject analytics/i }),
    ).toBeInTheDocument();
  });

  it("renders nothing on prototype routes", async () => {
    renderAt("/prototype/memory-settings");
    await waitFor(() => {
      expect(screen.queryByRole("region", { name: /analytics consent/i })).toBeNull();
    });
    expect(screen.queryByText(/accept analytics/i)).toBeNull();
    expect(screen.queryByText(/reject analytics/i)).toBeNull();
  });

  it("touches no storage on prototype routes", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    renderAt("/prototype/memory-settings");
    await waitFor(() => expect(screen.queryByText(/accept analytics/i)).toBeNull());
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });
});
