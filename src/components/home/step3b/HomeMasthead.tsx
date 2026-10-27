import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildAuthUrl } from "@/lib/authIntent";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import logoSrc from "@/assets/home/logo-tsoy-trimmed.png";
import { useHomeAccount } from "./useHomeAccount";

const NAV = [
  { label: "Trying to conceive", to: "/trying-to-conceive" },
  { label: "Pregnancy", to: "/pregnancy" },
  { label: "First year", to: "/first-year" },
  { label: "Toddler", to: "/toddler" },
  { label: "Family", to: "/family" },
  { label: "Journal", to: "/journal" },
];

/** The Step 3B masthead: transparent, laid over the hero, logo as the supplied artwork. */
export default function HomeMasthead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authed, accountLink } = useHomeAccount();
  const signInHref = buildAuthUrl("sign_in");

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const account = authed ? (
    <Link className="text-link" to={accountLink.href}>
      {accountLink.label}
    </Link>
  ) : (
    <Link
      className="text-link"
      to={signInHref}
      onClick={() => trackEvent(EVENTS.SIGN_IN_CLICKED, { location: "navbar" })}
    >
      Sign in
    </Link>
  );

  return (
    <header className="masthead over">
      <div className="wrap">
        <Link className="brand" to="/">
          <img src={logoSrc} alt="The Start of You" width={721} height={304} />
        </Link>
        <nav className="nav" aria-label="Journeys">
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="comp-link" to="/ask">
            <span className="comp-mark" aria-hidden="true" />
            Companion
          </Link>
          {account}
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="home-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
      </div>
      <div className="menu-panel" id="home-menu" hidden={!menuOpen}>
        <div className="wrap">
          <ul>
            {NAV.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/ask" onClick={() => setMenuOpen(false)}>
                Companion
              </Link>
            </li>
            <li>
              {authed ? (
                <Link to={accountLink.href} onClick={() => setMenuOpen(false)}>
                  {accountLink.label}
                </Link>
              ) : (
                <Link
                  to={signInHref}
                  onClick={() => {
                    trackEvent(EVENTS.SIGN_IN_CLICKED, { location: "navbar" });
                    setMenuOpen(false);
                  }}
                >
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
