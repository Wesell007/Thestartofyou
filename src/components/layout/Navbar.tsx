import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
  { label: "Postpartum", href: "/postpartum" },
  { label: "First year", href: "/first-year" },
  // NOTE: temporary route mapping — Journal label points to /product
  // until the route is renamed to /journal in a follow-up pass.
  { label: "Journal", href: "/product" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setAuthed(!!data.session?.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!cancelled) setAuthed(!!session?.user);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const signInHref = buildAuthUrl("sign_in");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-xl border-b border-border/30">
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
          {authed ? (
            <Link
              to="/my-week"
              className="font-sans text-[13.5px] font-medium bg-terracotta text-terracotta-foreground px-6 py-2.5 rounded-pill hover:bg-terracotta-hover transition-all duration-300 shadow-cta"
            >
              My Week
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
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-parchment/98 backdrop-blur-lg border-t border-border/30 px-6 py-8 flex flex-col gap-1 animate-fade-in">
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

          {authed ? (
            <Link
              to="/my-week"
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-center font-sans text-sm font-medium bg-terracotta text-terracotta-foreground px-6 py-3.5 rounded-pill hover:bg-terracotta-hover transition-all shadow-cta"
            >
              My Week
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
