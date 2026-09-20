import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import PregnancyCommonQuestions from "@/components/pregnancy/PregnancyCommonQuestions";
import PregnancyHubJourneyAction from "@/components/pregnancy/PregnancyHubJourneyAction";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { PREGNANCY_TOPIC_IMAGES } from "@/components/pregnancy/pregnancyTopicImages";
import { pregnancyTopicConfigs, topicMapEntries } from "@/data/pregnancyTopicData";
import { resolvePublicAccountLink, type NavLifecycle } from "@/lib/navLifecycle";

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

describe("Phase 36A Pregnancy public experience", () => {
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
        <PregnancyHubJourneyAction />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", destination);
  });

  it("retains six unique canonical pathways with six approved images", () => {
    expect(topicMapEntries).toHaveLength(6);
    expect(new Set(topicMapEntries.map((topic) => topic.slug))).toHaveLength(6);
    expect(topicMapEntries.map((topic) => topic.mainHref)).toEqual([
      "/pregnancy/body",
      "/pregnancy/baby",
      "/pregnancy/feelings",
      "/pregnancy/health-and-safety",
      "/pregnancy/diet-and-exercise",
      "/pregnancy/preparing-for-baby",
    ]);
    expect(new Set(Object.values(PREGNANCY_TOPIC_IMAGES))).toHaveLength(6);
  });

  it("preserves variable Start Here counts and classifies the topic destination", () => {
    const configs = Object.values(pregnancyTopicConfigs).filter((config) => config !== null);
    expect(configs.map((config) => config.startHere.length)).toEqual([2, 1, 2, 3, 3, 3]);
    expect(pregnancyTopicConfigs["preparing-for-baby"]?.startHere[0]).toEqual(
      expect.objectContaining({ href: "/preparing-for-baby", destinationKind: "topic" }),
    );
  });

  it("has no duplicate destination within any configured library group", () => {
    Object.values(pregnancyTopicConfigs).forEach((config) => {
      config?.groups.forEach((group) => {
        const hrefs = group.links.map((link) => link.href);
        expect(new Set(hrefs).size, `${config.slug}: ${group.label}`).toBe(hrefs.length);
      });
    });
  });

  it("keeps six editorial questions with no AI actions", () => {
    render(
      <MemoryRouter>
        <PregnancyCommonQuestions />
      </MemoryRouter>,
    );
    const questions = screen.getAllByRole("button");
    expect(questions).toHaveLength(6);
    questions.forEach((question) => fireEvent.click(question));
    expect(screen.queryByRole("link", { name: /ask more/i })).not.toBeInTheDocument();
  });

  it("retains three trimester and 42 week destinations in the established ranges", () => {
    const trimesterDestinations = [
      "/pregnancy/first-trimester",
      "/pregnancy/second-trimester",
      "/pregnancy/third-trimester",
    ];
    const weekDestinations = Array.from({ length: 42 }, (_, index) => `/pregnancy/week/${index + 1}`);
    expect(trimesterDestinations).toHaveLength(3);
    expect(weekDestinations).toHaveLength(42);
    expect(weekDestinations.at(0)).toBe("/pregnancy/week/1");
    expect(weekDestinations.at(-1)).toBe("/pregnancy/week/42");
  });

  it("configures one presentation-only Companion suggestion set for every topic", () => {
    const configs = Object.values(pregnancyTopicConfigs).filter((config) => config !== null);
    expect(configs).toHaveLength(6);
    configs.forEach((config) => expect(config.companionSuggestions).toHaveLength(2));
  });

  it("keeps the shared topic breadcrumb clear on mobile without changing larger breakpoints", () => {
    const bodyConfig = pregnancyTopicConfigs.body;
    if (!bodyConfig) {
      throw new Error("Pregnancy body topic configuration is required");
    }

    render(
      <HelmetProvider>
        <MemoryRouter>
          <PregnancyTopicPage config={bodyConfig} />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    const hero = breadcrumb.closest("section");

    expect(hero).toHaveClass("pt-24", "sm:pt-14", "md:pt-20");
    expect(breadcrumb).toHaveClass(
      "[&_ol]:text-foreground/75",
      "sm:[&_ol]:text-muted-foreground",
    );
    expect(breadcrumb).toHaveTextContent("Home");
    expect(breadcrumb.querySelector('a[href="/"]')).toBeInTheDocument();
    expect(breadcrumb.querySelector('a[href="/pregnancy"]')).toBeInTheDocument();
    expect(breadcrumb.querySelector('[aria-current="page"]')).toHaveTextContent("Your body");
  });
});