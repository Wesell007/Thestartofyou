import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  CalendarHeart,
  CircleUserRound,
  ClipboardList,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { EVENTS, type JourneyNavTab } from "@/lib/analyticsEvents";

type Lifecycle = "pregnancy" | "ttc";

interface Tab {
  label: string;
  href: string;
  icon: LucideIcon;
  event: JourneyNavTab;
}

const PREGNANCY_ROUTES = ["/my-week", "/my-journey", "/pregnancy-toolkit"];
const TTC_ROUTES = ["/my-ttc-journey"];
const SHARED_ROUTES = ["/account", "/account-settings"];

const matchesAny = (pathname: string, prefixes: string[]) =>
  prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

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

/**
 * Mobile-only bottom navigation for signed-in journey screens. Mounted once
 * in App; decides its own visibility from the route, auth state, and the
 * user's journey lifecycle. On journey routes the lifecycle is implied by
 * the route itself, so the bar renders without waiting for the fetch; the
 * fetched lifecycle covers the shared /account screen.
 */
const JourneyBottomNav = () => {
  const { pathname } = useLocation();
  const [authed, setAuthed] = useState(false);
  const [fetchedLifecycle, setFetchedLifecycle] = useState<Lifecycle | null>(null);

  useEffect(() => {
    let cancelled = false;
    const update = async (userId: string | null) => {
      if (!userId) {
        if (!cancelled) {
          setAuthed(false);
          setFetchedLifecycle(null);
        }
        return;
      }
      if (!cancelled) setAuthed(true);
      const { data, error } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled || error) return;
      setFetchedLifecycle(
        data?.lifecycle === "ttc" || data?.lifecycle === "pregnancy" ? data.lifecycle : null,
      );
    };
    supabase.auth.getSession().then(({ data }) => {
      void update(data.session?.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      void update(session?.user?.id ?? null);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const routeLifecycle: Lifecycle | null = matchesAny(pathname, TTC_ROUTES)
    ? "ttc"
    : matchesAny(pathname, PREGNANCY_ROUTES)
      ? "pregnancy"
      : null;
  const onShellRoute = routeLifecycle !== null || matchesAny(pathname, SHARED_ROUTES);
  const lifecycle = routeLifecycle ?? fetchedLifecycle;
  const visible = authed && onShellRoute && lifecycle !== null;

  // Reserve space below in-flow content (see body.has-journey-nav in index.css).
  useEffect(() => {
    if (!visible) return;
    document.body.classList.add("has-journey-nav");
    return () => document.body.classList.remove("has-journey-nav");
  }, [visible]);

  if (!visible) return null;

  const tabs = lifecycle === "ttc" ? TTC_TABS : PREGNANCY_TABS;

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
              className={`flex flex-col items-center gap-1 pt-2.5 pb-2 font-sans text-[10.5px] tracking-wide transition-colors ${
                active
                  ? "text-sage font-medium"
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
