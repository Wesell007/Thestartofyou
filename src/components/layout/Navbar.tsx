import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { buildAuthUrl } from "@/lib/authIntent";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import logoSrc from "@/assets/logo-dark.png";


// NOTE: IVF is intentionally NOT in the top nav. IVF is a treatment
// pathway that bridges TTC → Pregnancy. The /ivf route still works
// and is surfaced from inside TTC and from the IVF-aware pregnancy copy.
const navLinks = [
  { label: "Trying to conceive", href: "/trying-to-conceive" },
  { label: "Pregnancy", href: "/pregnancy" },
  // NOTE: Postpartum is no longer a top-level destination — it now lives
  // inside the First Year ecosystem as the "Recovery" track. The /postpartum
  // route is preserved but redirects to /first-year#recovery.
  { label: "First year", href: "/first-year" },
  { label: "Toddler", href: "/toddler" },
  { label: "Family", href: "/family" },
  { label: "Journal", href: "/journal" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [accountLink, setAccountLink] = useState({ href: "/my-week", label: "My Week" });
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const updateAccount = async (userId: string | null) => {
      if (!userId) {
        if (!cancelled) setAuthed(false);
        return;
      }
      if (!cancelled) setAuthed(true);
      const { data, error } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled || error) return;
      if (data?.lifecycle === "ttc") {
        setAccountLink({ href: "/my-ttc-journey", label: "My TTC Journey" });
      } else if (data?.lifecycle === "pregnancy") {
        setAccountLink({ href: "/my-week", label: "My Week" });
      } else {
        setAccountLink({ href: "/due-date-calculator", label: "Set up journey" });
      }
    };
    supabase.auth.getSession().then(({ data }) => {
      void updateAccount(data.session?.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      void updateAccount(session?.user?.id ?? null);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const signInHref = buildAuthUrl("sign_in");

  // Pages don't share a layout wrapper, so resolve the skip target at click
  // time: an explicit #main-content anchor if present, otherwise <main>.
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target =
      document.getElementById("main-content") ?? document.querySelector("main");
    if (!target) return;
    e.preventDefault();
    target.setAttribute("tabindex", "-1");
    (target as HTMLElement).focus({ preventScroll: true });
    target.scrollIntoView();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-xl border-b border-border/30">
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:bg-terracotta focus:text-terracotta-foreground focus:px-5 focus:py-2.5 focus:rounded-pill font-sans text-sm font-medium shadow-cta"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 h-16 lg:h-[88px] flex items-center justify-between max-w-6xl relative gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 mr-2">
          <img
            src={logoSrc}
            alt="The Start of You"
            className="w-[120px] md:w-[170px] h-auto object-contain contrast-[1.1]"
          />
        </Link>

        {/* Desktop Nav — centered, even rhythm */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 flex-1 justify-center" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`font-sans text-[13px] tracking-[0.01em] transition-colors duration-200 whitespace-nowrap ${
                isActive(href)
                  ? "text-foreground font-medium"
                  : "text-foreground/65 font-normal hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA cluster — quiet sign in, anchored CTA */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <Link
            to="/ask"
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-foreground/60 hover:text-foreground transition-colors"
          >
            <Sparkles size={13} strokeWidth={1.8} aria-hidden />
            Ask a question
          </Link>
          {authed ? (
            <Link
              to={accountLink.href}
              className="font-sans text-[13.5px] font-medium bg-terracotta text-terracotta-foreground px-6 py-2.5 rounded-pill hover:bg-terracotta-hover transition-all duration-300 shadow-cta"
            >
              {accountLink.label}
            </Link>
          ) : (
            <>
              <Link
                to={signInHref}
                onClick={() => trackEvent(EVENTS.SIGN_IN_CLICKED, { location: "navbar" })}
                className="font-sans text-[13px] font-light text-foreground/60 hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/due-date-calculator"
                onClick={() => trackEvent(EVENTS.START_JOURNEY_CLICKED, { location: "navbar" })}
                className="font-sans text-[13px] font-medium bg-terracotta text-terracotta-foreground px-6 py-2.5 rounded-pill hover:bg-terracotta-hover hover:shadow-lg transition-all duration-300 shadow-cta"
              >
                Start your journey
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2.5 -mr-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-parchment/98 backdrop-blur-lg border-t border-border/30 px-6 py-8 flex flex-col gap-1 animate-fade-in">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`font-sans text-base font-light transition-colors py-3 px-2 rounded-lg ${
                isActive(href) ? "text-sage bg-sage-bg/40" : "text-foreground hover:text-sage hover:bg-sage-bg/20"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/ask"
            onClick={() => setMobileOpen(false)}
            className="font-sans text-base font-light transition-colors py-3 px-2 rounded-lg text-foreground hover:text-sage hover:bg-sage-bg/20 inline-flex items-center gap-2"
          >
            <Sparkles size={15} strokeWidth={1.8} className="text-sage" aria-hidden />
            Ask a question
          </Link>

          {authed ? (
            <Link
              to={accountLink.href}
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-center font-sans text-sm font-medium bg-terracotta text-terracotta-foreground px-6 py-3.5 rounded-pill hover:bg-terracotta-hover transition-all shadow-cta"
            >
              {accountLink.label}
            </Link>
          ) : (
            <>
              <Link
                to="/due-date-calculator"
                className="mt-4 text-center font-sans text-sm font-medium bg-terracotta text-terracotta-foreground px-6 py-3.5 rounded-pill hover:bg-terracotta-hover transition-all shadow-cta"
                onClick={() => {
                  trackEvent(EVENTS.START_JOURNEY_CLICKED, { location: "navbar" });
                  setMobileOpen(false);
                }}
              >
                Start your journey
              </Link>
              <Link
                to={signInHref}
                onClick={() => {
                  trackEvent(EVENTS.SIGN_IN_CLICKED, { location: "navbar" });
                  setMobileOpen(false);
                }}
                className="mt-2 text-center font-sans text-sm font-light text-foreground/75 hover:text-foreground py-3 transition-colors"
              >
                Already saving your journey? Sign in
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
