import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  CalendarHeart,
  CircleUserRound,
  ClipboardList,
  Heart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { EVENTS, type JourneyNavTab } from "@/lib/analyticsEvents";
import { useLifecycle } from "@/lib/useLifecycle";
import {
  FIRST_YEAR_NAV_ROUTES,
  PREGNANCY_NAV_ROUTES,
  TTC_NAV_ROUTES,
  matchesRoute,
} from "@/lib/navLifecycle";
import { NAV_INSET_VAR, NAV_INSET_VALUE } from "@/lib/navInset";
import { PG_FOCUS_RING, PG_NAV_ACTIVE, PG_NAV_INACTIVE } from "@/components/myweek/pregnancyStyles";

interface Tab {
  label: string;
  href: string;
  icon: LucideIcon;
  event: JourneyNavTab;
}

const SHARED_ROUTES = ["/account", "/account-settings"];

const PREGNANCY_TABS: Tab[] = [
  { label: "This week", href: "/my-week", icon: CalendarHeart, event: "my_week" },
  { label: "My journey", href: "/my-journey", icon: BookOpen, event: "my_journey" },
  { label: "Toolkit", href: "/pregnancy-toolkit", icon: ClipboardList, event: "toolkit" },
  { label: "Account", href: "/account", icon: CircleUserRound, event: "account" },
];

const TTC_TABS: Tab[] = [
  { label: "My journey", href: "/my-ttc-journey", icon: CalendarHeart, event: "my_ttc_journey" },
  { label: "Ask", href: "/ask", icon: Sparkles, event: "ask" },
  { label: "Account", href: "/account", icon: CircleUserRound, event: "account" },
];

const firstYearTabs = (hasKeptChapter: boolean): Tab[] => [
  { label: "First Year", href: "/my-first-year", icon: Heart, event: "my_first_year" },
  ...(hasKeptChapter
    ? [
        {
          label: "Pregnancy chapter",
          href: "/my-pregnancy-chapter",
          icon: BookOpen,
          event: "pregnancy_chapter" as const,
        },
      ]
    : []),
  { label: "Account", href: "/account", icon: CircleUserRound, event: "account" },
];


/**
 * Mobile-only bottom navigation for signed-in journey screens. Mounted once
 * in App; decides its own visibility from the route, auth state, and the
 * user's journey lifecycle. On journey routes the lifecycle is implied by
 * the route itself, so the bar renders without waiting for the fetch; the
 * fetched lifecycle covers the shared /account screen.
 */
const JourneyBottomNav = () => {
  const { pathname } = useLocation();
  const { authed, lifecycle, hasKeptChapter } = useLifecycle();

  const onShellRoute =
    matchesRoute(pathname, FIRST_YEAR_NAV_ROUTES) ||
    matchesRoute(pathname, PREGNANCY_NAV_ROUTES) ||
    matchesRoute(pathname, TTC_NAV_ROUTES) ||
    matchesRoute(pathname, SHARED_ROUTES);
  const visible = authed && onShellRoute && lifecycle !== null;

  // Reserve space below in-flow content (see body.has-journey-nav in index.css)
  // and publish the bar height so other bottom-pinned surfaces (the analytics
  // consent banner) sit above it. Both are cleared as soon as the bar hides or
  // the route leaves the signed-in shell.
  useEffect(() => {
    if (!visible) return;
    const root = document.documentElement;
    document.body.classList.add("has-journey-nav");
    root.style.setProperty(NAV_INSET_VAR, NAV_INSET_VALUE);
    return () => {
      document.body.classList.remove("has-journey-nav");
      root.style.removeProperty(NAV_INSET_VAR);
    };
  }, [visible]);

  if (!visible) return null;

  const isPregnancy = lifecycle !== "first_year" && lifecycle !== "ttc";
  const tabs =
    lifecycle === "first_year"
      ? firstYearTabs(hasKeptChapter)
      : lifecycle === "ttc"
        ? TTC_TABS
        : PREGNANCY_TABS;


  return (
    <nav
      aria-label="Journey navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-parchment/95 backdrop-blur-xl border-t border-border/40 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid auto-cols-fr grid-flow-col">
        {tabs.map(({ label, href, icon: Icon, event }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              to={href}
              aria-current={active ? "page" : undefined}
              onClick={() => trackEvent(EVENTS.JOURNEY_NAV_CLICKED, { tab: event })}
              className={`flex flex-col items-center justify-center gap-1 min-h-[56px] pt-2.5 pb-2 font-sans text-[10.5px] tracking-wide transition-colors ${PG_FOCUS_RING} ${
                active
                  ? isPregnancy
                    ? PG_NAV_ACTIVE
                    : "text-sage font-medium"
                  : isPregnancy
                    ? PG_NAV_INACTIVE
                    : "text-foreground/55 font-light hover:text-foreground"
              }`}
            >
              <Icon size={19} strokeWidth={active ? 2 : 1.6} aria-hidden />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default JourneyBottomNav;
