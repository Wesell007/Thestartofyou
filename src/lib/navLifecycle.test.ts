import { describe, expect, it } from "vitest";
import {
  inferLifecycleFromPath,
  matchesRoute,
  resolveHeaderLinks,
  resolveHomeHref,
  resolvePublicAccountLink,
} from "@/lib/navLifecycle";

describe("navLifecycle", () => {
  it("gives pregnancy users the three signed-in spaces", () => {
    expect(resolveHomeHref("pregnancy")).toBe("/my-week");
    expect(resolveHeaderLinks("pregnancy")).toEqual([
      { id: "my_week", label: "This week", href: "/my-week" },
      { id: "my_journey", label: "My journey", href: "/my-journey" },
      { id: "toolkit", label: "Toolkit", href: "/pregnancy-toolkit" },
    ]);
    expect(resolvePublicAccountLink("pregnancy")).toEqual({
      href: "/my-week",
      label: "My Week",
    });
  });

  it("never offers a memories destination on pregnancy or TTC navigation", () => {
    for (const lifecycle of ["pregnancy", "ttc", null] as const) {
      const links = resolveHeaderLinks(lifecycle);
      expect(links.some((l) => l.href.includes("memories"))).toBe(false);
      expect(links.some((l) => l.label.toLowerCase().includes("memories"))).toBe(false);
    }
  });

  it("marks the toolkit tab active on toolkit sub-routes", () => {
    expect(matchesRoute("/pregnancy-toolkit", ["/pregnancy-toolkit"])).toBe(true);
    expect(matchesRoute("/pregnancy-toolkit/birth-plan", ["/pregnancy-toolkit"])).toBe(true);
    expect(matchesRoute("/pregnancy-toolkit/appointments/new", ["/pregnancy-toolkit"])).toBe(true);
    expect(matchesRoute("/my-week", ["/pregnancy-toolkit"])).toBe(false);
    expect(matchesRoute("/my-week/22", ["/my-week"])).toBe(true);
    expect(matchesRoute("/my-journey", ["/my-journey"])).toBe(true);
    expect(matchesRoute("/pregnancy", ["/my-week", "/my-journey", "/pregnancy-toolkit"])).toBe(
      false,
    );
  });

  it("shows the pregnancy chapter link for First Year users who kept one", () => {
    expect(resolveHomeHref("first_year")).toBe("/my-first-year");
    const links = resolveHeaderLinks("first_year", true);
    expect(links.map((l) => l.href)).toEqual([
      "/my-first-year",
      "/my-first-year/today",
      "/my-first-year/memories",
      "/my-pregnancy-chapter",
    ]);
    expect(links.map((l) => l.label)).toEqual([
      "First Year",
      "Today",
      "Memories",
      "Pregnancy chapter",
    ]);
  });

  it("omits the pregnancy chapter link when nothing was kept", () => {
    expect(resolveHeaderLinks("first_year", false)).toEqual([
      { id: "my_first_year", label: "First Year", href: "/my-first-year" },
      { id: "first_year_today", label: "Today", href: "/my-first-year/today" },
      { id: "first_year_memories", label: "Memories", href: "/my-first-year/memories" },
    ]);
  });

  it("never points First Year users at pregnancy routes", () => {
    for (const kept of [true, false]) {
      const hrefs = resolveHeaderLinks("first_year", kept).map((l) => l.href);
      expect(hrefs).not.toContain("/my-week");
      expect(hrefs).not.toContain("/my-journey");
    }
    expect(resolvePublicAccountLink("first_year")).toEqual({
      href: "/my-first-year",
      label: "My First Year",
    });
  });

  it("keeps TTC navigation unchanged", () => {
    expect(resolveHomeHref("ttc")).toBe("/my-ttc-journey");
    expect(resolveHeaderLinks("ttc")).toEqual([
      { id: "my_ttc_journey", label: "My journey", href: "/my-ttc-journey" },
    ]);
    expect(resolvePublicAccountLink("ttc")).toEqual({
      href: "/my-ttc-journey",
      label: "My TTC Journey",
    });
  });

  it("falls back safely when the lifecycle is unknown", () => {
    expect(resolveHomeHref(null)).toBe("/my-week");
    expect(resolveHeaderLinks(null).map((l) => l.href)).toEqual(["/my-week", "/my-journey"]);
    expect(resolvePublicAccountLink(null)).toEqual({
      href: "/due-date-calculator",
      label: "Set up journey",
    });
  });

  it("infers the lifecycle from the route so nav never flashes the wrong labels", () => {
    expect(inferLifecycleFromPath("/my-first-year")).toBe("first_year");
    expect(inferLifecycleFromPath("/my-pregnancy-chapter")).toBe("first_year");
    expect(inferLifecycleFromPath("/my-week")).toBe("pregnancy");
    expect(inferLifecycleFromPath("/my-week/22")).toBe("pregnancy");
    expect(inferLifecycleFromPath("/pregnancy-toolkit/birth-plan")).toBe("pregnancy");
    expect(inferLifecycleFromPath("/my-ttc-journey")).toBe("ttc");
    expect(inferLifecycleFromPath("/account")).toBeNull();
  });
});
