import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoSrc from "@/assets/logo.png";

const navLinks = [
  { label: "My Journey", href: "#" },
  { label: "Explore", href: "/explore" },
  { label: "Journal", href: "#" },
  { label: "About", href: "#" },
];


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/90 backdrop-blur-sm border-b border-parchment-dark">
      <div className="container mx-auto px-6 md:px-10 h-20 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logoSrc}
            alt="The Start of You"
            width={320}
            height={120}
            className="h-16 w-auto object-contain mix-blend-multiply"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map(({ label, href }) =>
            href.startsWith("/") ? (
              <Link
                key={label}
                to={href}
                className={`font-sans text-sm font-light tracking-wide transition-colors ${
                  isActive(href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {label}
              </a>
            )
          )}
        </nav>

        {/* Sign In */}
        <div className="hidden md:flex items-center">
          <a
            href="#"
            className="font-sans text-sm font-medium bg-terracotta text-terracotta-foreground px-5 py-2 rounded-pill hover:bg-terracotta-hover transition-colors shadow-cta"
          >
            Sign In
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-parchment border-t border-parchment-dark px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, href }) =>
            href.startsWith("/") ? (
              <Link
                key={label}
                to={href}
                className={`font-sans text-base font-light transition-colors ${
                  isActive(href) ? "text-sage" : "text-foreground hover:text-sage"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="font-sans text-base font-light text-foreground hover:text-sage transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            )
          )}
          <a
            href="#"
            className="mt-2 text-center font-sans text-sm font-medium bg-terracotta text-terracotta-foreground px-5 py-3 rounded-pill hover:bg-terracotta-hover transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Sign In
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
