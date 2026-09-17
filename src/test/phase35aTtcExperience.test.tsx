import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import TTCHubJourneyAction from "@/components/ttc/TTCHubJourneyAction";
import { resolvePublicAccountLink, type NavLifecycle } from "@/lib/navLifecycle";
import { ttcPageConfigs, ttcTopics } from "@/data/ttcTopicData";

const account = vi.hoisted(() => ({
  authed: false as boolean | null,
  lifecycle: null as NavLifecycle | null,
}));

vi.mock("@/hooks/usePublicAccountLink", () => ({
  default: () => ({
    authed: account.authed,
    lifecycle: account.lifecycle,
    accountLink: resolvePublicAccountLink(account.lifecycle),
  }),
}));

afterEach(() => {
  cleanup();
  account.authed = false;
  account.lifecycle = null;
});

describe("Phase 35A TTC public experience", () => {
  it.each([
    ["signed out", false, null, "/start-your-journey"],
    ["signed in with TTC", true, "ttc", "/my-ttc-journey"],
    ["signed in with Pregnancy", true, "pregnancy", "/my-week"],
    ["signed in with First Year", true, "first_year", "/my-first-year"],
    ["signed in with no active lifecycle", true, null, "/start-your-journey"],
  ] as const)("routes the final action for %s", (_name, authed, lifecycle, destination) => {
    account.authed = authed;
    account.lifecycle = lifecycle;

    render(
      <MemoryRouter>
        <TTCHubJourneyAction />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", destination);
  });

  it("keeps exactly three primary pathways and seven supporting destinations", () => {
    expect(ttcTopics.filter((topic) => topic.kind === "pillar")).toHaveLength(3);
    expect(ttcTopics.filter((topic) => topic.kind === "subtopic")).toHaveLength(7);
  });

  it("classifies calculators as tools without changing their existing href", () => {
    expect(ttcPageConfigs.ovulation.startHere).toEqual([
      expect.objectContaining({
        href: "/trying-to-conceive/ovulation-calculator",
        destinationKind: "tool",
      }),
    ]);
    expect(ttcPageConfigs["preconception-health"].startHere).toHaveLength(1);
    expect(ttcPageConfigs["preconception-health"].startHere[0]?.href).not.toBe("/ask");
  });

  it("retains the configured AMH destination for the untruncated library", () => {
    const fertilityDestinations = ttcPageConfigs.fertility.groups.flatMap((group) => group.links);
    expect(fertilityDestinations).toContainEqual(
      expect.objectContaining({ label: "AMH test explained", href: "/articles/amh-test-explained" }),
    );
  });
});