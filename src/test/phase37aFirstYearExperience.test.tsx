import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import FYCommonQuestions from "@/components/firstyear/new/FYCommonQuestions";
import { FIRST_YEAR_MONTH_DESTINATIONS } from "@/components/firstyear/new/firstYearMonthDestinations";
import FYStartFirstYearCTA from "@/components/firstyear/new/FYStartFirstYearCTA";
import { phaseData } from "@/data/firstYearPhaseData";
import { firstYearTopicConfigs } from "@/data/firstYearTopicData";
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

describe("Phase 37A First Year public experience", () => {
  it.each([
    ["signed out", false, null, "/start-your-journey"],
    ["signed in with TTC", true, "ttc", "/my-ttc-journey"],
    ["signed in with Pregnancy", true, "pregnancy", "/my-week"],
    ["signed in with First Year", true, "first_year", "/my-first-year"],
    ["signed in without a lifecycle", true, null, "/start-your-journey"],
  ] as const)("routes the final action for %s", (_name, authed, lifecycle, href) => {
    account.authed = authed;
    account.lifecycle = lifecycle;
    render(
      <MemoryRouter>
        <FYStartFirstYearCTA variant="final" />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", href);
  });

  it("retains four phases and thirteen locked month destinations", () => {
    expect(Object.keys(phaseData)).toHaveLength(4);
    expect(FIRST_YEAR_MONTH_DESTINATIONS).toHaveLength(13);
    expect(FIRST_YEAR_MONTH_DESTINATIONS.at(0)?.href).toBe("/first-year/newborn");
    expect(FIRST_YEAR_MONTH_DESTINATIONS.at(-1)?.href).toBe("/first-year/12-months");
  });

  it("keeps four baby and four postpartum topic consumers", () => {
    const configs = Object.values(firstYearTopicConfigs);
    expect(configs.filter((item) => item.side === "baby")).toHaveLength(4);
    expect(configs.filter((item) => item.side === "recovery")).toHaveLength(4);
  });

  it("reconciles 24 topic cards as 21 mapped and 3 removed", () => {
    const mapped = Object.values(firstYearTopicConfigs).flatMap((item) => item.featured);
    expect(mapped).toHaveLength(21);
    expect(24 - mapped.length).toBe(3);
    mapped.forEach((item) => expect(item.href).toMatch(/^\/(first-year|toddler)/));
    Object.values(firstYearTopicConfigs).forEach((config) => {
      const hrefs = config.featured.map((item) => item.href);
      expect(new Set(hrefs).size, config.slug).toBe(hrefs.length);
    });
  });

  it("reconciles 12 phase cards as 11 converted and 1 removed", () => {
    const mapped = Object.values(phaseData).flatMap((item) => item.featuredGuidance);
    expect(mapped).toHaveLength(11);
    expect(12 - mapped.length).toBe(1);
    Object.values(phaseData).forEach((config) => {
      const hrefs = config.featuredGuidance.map((item) => item.href);
      expect(new Set(hrefs).size, config.slug).toBe(hrefs.length);
    });
  });

  it("keeps six editorial hub questions with no AI actions", () => {
    render(
      <MemoryRouter>
        <FYCommonQuestions />
      </MemoryRouter>,
    );
    const questions = screen.getAllByRole("button");
    expect(questions).toHaveLength(6);
    questions.forEach((question) => fireEvent.click(question));
    expect(screen.queryByText("Ask more")).not.toBeInTheDocument();
  });

  it("keeps fifteen genuine phase reads and no question needs an AI destination", () => {
    const questions = Object.values(phaseData).flatMap((item) => item.commonQuestions);
    expect(questions).toHaveLength(20);
    expect(questions.filter((item) => item.readMore)).toHaveLength(15);
  });

  it("preserves the Toddler transition", () => {
    expect(phaseData["9-12-months"].featuredGuidance).toContainEqual(
      expect.objectContaining({ href: "/toddler" }),
    );
  });
});