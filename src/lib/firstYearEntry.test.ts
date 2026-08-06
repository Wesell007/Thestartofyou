import { describe, expect, it } from "vitest";
import {
  FIRST_YEAR_SETUP_COPY,
  resolveFirstYearCta,
  resolveFirstYearSetupGuard,
  type FirstYearEntryState,
} from "./firstYearEntry";

describe("resolveFirstYearCta", () => {
  it("sends signed-out visitors to auth with a return to the setup route", () => {
    const cta = resolveFirstYearCta({ kind: "signed_out" });
    expect(cta.show).toBe(true);
    expect(cta.label).toBe("Start your First Year");
    expect(cta.href).toContain("/auth?");
    expect(cta.href).toContain(encodeURIComponent("/setup/first-year"));
  });

  it("sends users with no journey straight into setup", () => {
    expect(resolveFirstYearCta({ kind: "no_journey" })).toMatchObject({
      show: true,
      label: "Start your First Year",
      href: "/setup/first-year",
    });
  });

  it("opens the existing space for first year users", () => {
    expect(resolveFirstYearCta({ kind: "first_year" })).toMatchObject({
      label: "Open your First Year",
      href: "/my-first-year",
    });
  });

  it("sends given birth pregnancy users into transition setup", () => {
    expect(resolveFirstYearCta({ kind: "pregnancy", status: "given_birth" })).toMatchObject({
      show: true,
      href: "/setup/first-year",
    });
  });

  it("keeps active pregnancy users in their week with a quiet line", () => {
    const cta = resolveFirstYearCta({ kind: "pregnancy", status: "active" });
    expect(cta.href).toBe("/my-week");
    expect(cta.note).toBe("Your First Year space opens once your baby arrives.");
  });

  it.each(["pregnancy_loss", "paused", "no_longer_pregnant", null])(
    "shows no start CTA for sensitive pregnancy status %s",
    (status) => {
      const cta = resolveFirstYearCta({ kind: "pregnancy", status: status as string | null });
      expect(cta.show).toBe(false);
      expect(cta.quietLink).toEqual({ label: "Open your journey", href: "/my-journey" });
    },
  );

  it("routes TTC users to their own journey", () => {
    expect(resolveFirstYearCta({ kind: "ttc" }).href).toBe("/my-ttc-journey");
  });
});

describe("resolveFirstYearSetupGuard", () => {
  const cases: [FirstYearEntryState, unknown][] = [
    [{ kind: "signed_out" }, { action: "auth" }],
    [{ kind: "first_year" }, { action: "redirect", to: "/my-first-year" }],
    [{ kind: "ttc" }, { action: "redirect", to: "/my-ttc-journey" }],
    [{ kind: "no_journey" }, { action: "render", mode: "direct" }],
    [{ kind: "pregnancy", status: "given_birth" }, { action: "render", mode: "transition" }],
    [{ kind: "pregnancy", status: "active" }, { action: "redirect", to: "/my-week" }],
    [{ kind: "pregnancy", status: "pregnancy_loss" }, { action: "redirect", to: "/my-journey" }],
    [{ kind: "pregnancy", status: "paused" }, { action: "redirect", to: "/my-journey" }],
    [{ kind: "pregnancy", status: null }, { action: "redirect", to: "/my-journey" }],
  ];

  it.each(cases)("resolves %j", (state, expected) => {
    expect(resolveFirstYearSetupGuard(state)).toEqual(expected);
  });
});

describe("setup copy", () => {
  const pregnancyWords = ["pregnan", "archived", "memories", "chapter"];

  it("direct mode never mentions pregnancy continuity", () => {
    const copy = FIRST_YEAR_SETUP_COPY.direct;
    const text = [
      copy.kicker,
      copy.intro.heading,
      ...copy.intro.body,
      copy.companion.heading,
      copy.companion.body,
      copy.review.heading,
      copy.review.intro,
      copy.review.companionNote,
    ]
      .join(" ")
      .toLowerCase();
    for (const word of pregnancyWords) {
      expect(text).not.toContain(word);
    }
    expect(copy.intro.heading).toBe("Let's set up your First Year space.");
    expect(copy.review.intro).toBe("Your First Year space starts from here.");
    expect(copy.exitHref).toBe("/first-year");
  });

  it("transition mode keeps the pregnancy chapter reassurance", () => {
    const copy = FIRST_YEAR_SETUP_COPY.transition;
    expect(copy.intro.heading).toContain("Your pregnancy chapter is kept");
    expect(copy.companion.heading).toContain("Same companion, new chapter");
    expect(copy.review.intro).toContain("pregnancy chapter is kept");
    expect(copy.exitHref).toBe("/my-week");
  });
});
