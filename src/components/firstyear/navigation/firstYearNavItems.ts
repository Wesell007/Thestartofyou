/**
 * The signed-in First Year navigation.
 *
 * Only routes that already exist are listed here. There is no signed-in
 * guidance or reading route, and no dedicated companion route, so neither
 * appears. Pure data plus a pure resolver, so active state can be tested
 * without a router.
 */

import { BookHeart, House, Sun, type LucideIcon } from "lucide-react";

export type FirstYearNavItem = {
  id: "home" | "today" | "memories";
  label: string;
  href: string;
  icon: LucideIcon;
  /** Home matches its own path only; the others also match deeper paths. */
  exact: boolean;
};

export const FIRST_YEAR_NAV_ITEMS: FirstYearNavItem[] = [
  { id: "home", label: "Home", href: "/my-first-year", icon: House, exact: true },
  { id: "today", label: "Today", href: "/my-first-year/today", icon: Sun, exact: false },
  {
    id: "memories",
    label: "Memories",
    href: "/my-first-year/memories",
    icon: BookHeart,
    exact: false,
  },
];

/** True when the given pathname should light up this navigation item. */
export const isNavItemActive = (pathname: string, item: FirstYearNavItem): boolean => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (item.exact) return path === item.href;
  return path === item.href || path.startsWith(`${item.href}/`);
};
