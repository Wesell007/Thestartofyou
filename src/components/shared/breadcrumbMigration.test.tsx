import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const renderIn = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("migrated breadcrumb shapes", () => {
  it("renders the week hierarchy with a non-linked current week", () => {
    renderIn(
      <Breadcrumbs
        tone="section"
        items={[
          { label: "Pregnancy", href: "/pregnancy" },
          { label: "Week by week", href: "/pregnancy/first-trimester" },
          { label: "Week 5", href: "/pregnancy/week/5" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Pregnancy" }).getAttribute("href")).toBe("/pregnancy");
    expect(screen.getByRole("link", { name: "Week by week" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Week 5" })).toBeNull();
    expect(screen.getByText("Week 5").getAttribute("aria-current")).toBe("page");
  });

  it("renders the trimester hierarchy", () => {
    renderIn(
      <Breadcrumbs
        tone="section"
        items={[
          { label: "Pregnancy", href: "/pregnancy" },
          { label: "First trimester", href: "/pregnancy/first-trimester" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getAllByRole("listitem").length).toBe(3); // 2 crumbs + 1 separator
    expect(screen.queryByRole("link", { name: "First trimester" })).toBeNull();
  });

  it("renders the TTC subtopic hierarchy with the existing terminology", () => {
    renderIn(
      <Breadcrumbs
        tone="section"
        items={[
          { label: "The TTC Guide", href: "/trying-to-conceive" },
          { label: "Cycle basics", href: "/trying-to-conceive/cycle-basics" },
          { label: "Ovulation", href: "/trying-to-conceive/ovulation" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "The TTC Guide" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Cycle basics" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Ovulation" })).toBeNull();
  });

  it("renders the toddler topic hierarchy with palette colours and a home icon", () => {
    const { container } = renderIn(
      <Breadcrumbs
        tone="section"
        showHomeIcon
        colors={{ base: "rgb(1, 2, 3)", link: "rgb(4, 5, 6)", current: "rgb(7, 8, 9)" }}
        items={[
          { label: "Toddler", href: "/toddler" },
          { label: "Sleep", href: "/toddler/sleep" },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Toddler" });
    expect(link.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector("ol")?.getAttribute("style")).toContain("rgb(1, 2, 3)");
  });

  it("renders the hub article hierarchy with three crumbs", () => {
    renderIn(
      <Breadcrumbs
        tone="section"
        showHomeIcon
        items={[
          { label: "Family", href: "/family" },
          { label: "Routines", href: "/family/routines" },
          { label: "Bedtime that works", href: "/family/routines/bedtime-that-works" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Routines" }).getAttribute("href")).toBe("/family/routines");
    expect(screen.getByText("Bedtime that works").getAttribute("aria-current")).toBe("page");
  });
});

describe("showHomeIcon", () => {
  it("renders no icon by default", () => {
    const { container } = renderIn(
      <Breadcrumbs
        tone="section"
        items={[
          { label: "Toddler", href: "/toddler" },
          { label: "Sleep", href: "/toddler/sleep" },
        ]}
      />,
    );
    expect(container.querySelector("a svg")).toBeNull();
  });

  it("renders the icon only on the first item and hides it from assistive tech", () => {
    const { container } = renderIn(
      <Breadcrumbs
        tone="section"
        showHomeIcon
        items={[
          { label: "Toddler", href: "/toddler" },
          { label: "Sleep", href: "/toddler/sleep" },
          { label: "Naps", href: "/toddler/sleep/naps" },
        ]}
      />,
    );
    const links = screen.getAllByRole("link");
    expect(links[0].querySelector("svg")).toBeTruthy();
    expect(links[1].querySelector("svg")).toBeNull();
    const icons = Array.from(container.querySelectorAll("a svg"));
    expect(icons.every((i) => i.getAttribute("aria-hidden") === "true")).toBe(true);
    expect(screen.getByRole("link", { name: "Toddler" })).toBeTruthy();
  });
});
