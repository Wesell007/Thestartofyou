import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoSrc from "@/assets/logo-dark.png";


const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Pregnancy", href: "/pregnancy" },
  { label: "Guidance", href: "/guidance" },
  { label: "Journal", href: "/product" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/97 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-24 flex items-center justify-between max-w-6xl relative">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logoSrc}
            alt="The Start of You"
            className="w-[120px] md:w-[185px] h-auto object-contain contrast-[1.1]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`font-sans text-[14.5px] tracking-wide transition-colors duration-200 ${
                isActive(href)
                  ? "text-foreground font-medium"
                  : "text-foreground/70 font-normal hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/explore"
            className="font-sans text-[14px] font-medium bg-terracotta text-terracotta-foreground px-7 py-2.5 rounded-pill hover:bg-terracotta-hover transition-all duration-300 shadow-cta"
          >
            Start your journey
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 -mr-1 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-parchment/98 backdrop-blur-lg border-t border-border/30 px-6 py-8 flex flex-col gap-1 animate-fade-in">
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
            to="/explore"
            className="mt-4 text-center font-sans text-sm font-medium bg-terracotta text-terracotta-foreground px-6 py-3.5 rounded-pill hover:bg-terracotta-hover transition-all shadow-cta"
            onClick={() => setMobileOpen(false)}
          >
            Start your journey
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
