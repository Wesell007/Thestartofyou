import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("@/lib/savedJourney", () => ({
  getActivePregnancyJourney: vi.fn(),
  readPendingJourney: vi.fn(),
}));
vi.mock("@/lib/savedTTCJourney", () => ({ getActiveTTCJourney: vi.fn() }));

import {
  buildAuthUrl,
  parseSafeReturnTo,
  shouldCreateUserForIntent,
} from "@/lib/authIntent";

describe("auth intent routing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lets a new TTC journey create an account and return to setup", () => {
    const url = buildAuthUrl("start_journey", "/setup/trying-to-conceive");
    const params = new URLSearchParams(url.split("?")[1]);

    expect(params.get("intent")).toBe("start_journey");
    expect(params.get("return_to")).toBe("/setup/trying-to-conceive");
    expect(shouldCreateUserForIntent("start_journey")).toBe(true);
  });

  it("does not create accounts for ordinary returning sign-in", () => {
    expect(shouldCreateUserForIntent("sign_in")).toBe(false);
    expect(shouldCreateUserForIntent("return_to_route")).toBe(false);
  });

  it("rejects external and public return targets", () => {
    expect(parseSafeReturnTo("https://example.com/my-week")).toBeNull();
    expect(parseSafeReturnTo("//example.com/my-week")).toBeNull();
    expect(parseSafeReturnTo("/pregnancy")).toBeNull();
  });
});
