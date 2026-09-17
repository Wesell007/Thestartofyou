import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import TTCHubJourneyAction from "@/components/ttc/TTCHubJourneyAction";
import { resolvePublicAccountLink, type NavLifecycle } from "@/lib/navLifecycle";
import { ttcPageConfigs, ttcTopics } from "@/data/ttcTopicData";
import {
  TTC_EXPLORE_ACTION_LABEL,
  TTC_EXPLORE_TOPIC_CLUSTERS,
  TTC_EXPLORE_TOPIC_IMAGES,
} from "@/pages/TTCHub";

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
        href: "/ovulation-calculator",
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

  it("maps seven unique approved images to the seven supporting cards", () => {
    const slugs = TTC_EXPLORE_TOPIC_CLUSTERS.flatMap((cluster) => cluster.slugs);
    const images = slugs.map((slug) => TTC_EXPLORE_TOPIC_IMAGES[slug]);

    expect(slugs).toEqual([
      "cycle-tracking",
      "two-week-wait",
      "pregnancy-tests",
      "conditions",
      "age-and-fertility",
      "male-fertility",
      "ivf-and-treatment",
    ]);
    expect(images).toHaveLength(7);
    expect(new Set(images)).toHaveLength(7);
    expect(images).toEqual([
      expect.stringContaining("ttc-stage-cycle"),
      expect.stringContaining("ttc-stage-waiting"),
      expect.stringContaining("ttc-pregnancy-tests"),
      expect.stringContaining("ttc-conditions"),
      expect.stringContaining("ttc-age-and-fertility"),
      expect.stringContaining("ttc-male-fertility"),
      expect.stringContaining("ttc-ivf-treatment"),
    ]);
  });

  it("preserves supporting-card grouping, order, destinations, copy and action language", () => {
    const expected = [
      ["Timing, testing and waiting", "cycle-tracking", "/trying-to-conceive/cycle-tracking"],
      ["Timing, testing and waiting", "two-week-wait", "/trying-to-conceive/two-week-wait"],
      ["Timing, testing and waiting", "pregnancy-tests", "/trying-to-conceive/pregnancy-tests"],
      ["Health and preparation", "conditions", "/trying-to-conceive/conditions"],
      ["Fertility support", "age-and-fertility", "/trying-to-conceive/age-and-fertility"],
      ["Fertility support", "male-fertility", "/trying-to-conceive/male-fertility"],
      ["Fertility support", "ivf-and-treatment", "/trying-to-conceive/ivf-and-treatment"],
    ] as const;
    const topicsBySlug = new Map(ttcTopics.map((topic) => [topic.slug, topic]));
    const actual = TTC_EXPLORE_TOPIC_CLUSTERS.flatMap((cluster) =>
      cluster.slugs.map((slug) => [cluster.label, slug, topicsBySlug.get(slug)?.mainHref]),
    );

    expect(actual).toEqual(expected);
    expected.forEach(([, slug]) => {
      expect(topicsBySlug.get(slug)?.label).toBeTruthy();
      expect(topicsBySlug.get(slug)?.description).toBeTruthy();
    });
    expect(TTC_EXPLORE_ACTION_LABEL).toBe("Explore topic");
  });
});