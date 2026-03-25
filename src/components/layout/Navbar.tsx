import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/90 backdrop-blur-sm border-b border-parchment-dark">
      <div className="container mx-auto px-6 md:px-10 h-16 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="22" height="28" rx="2" stroke="hsl(100,18%,52%)" strokeWidth="1.5" fill="none"/>
            <path d="M5 8 Q14 4 23 8" stroke="hsl(100,18%,52%)" strokeWidth="1.2" fill="none"/>
            <path d="M14 4 L14 1" stroke="hsl(100,18%,52%)" strokeWidth="1.2"/>
            <circle cx="14" cy="3" r="1.5" fill="hsl(100,18%,52%)"/>
            <path d="M6 15 L18 15M6 19 L15 19" stroke="hsl(100,18%,65%)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span className="font-serif text-foreground leading-tight text-sm md:text-base">
            The Start<br className="hidden sm:block" /><span className="sm:hidden"> </span>of You
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {["My Journey", "Explore", "Journal", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {item}
            </a>
          ))}
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
          {["My Journey", "Explore", "Journal", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-sans text-base font-light text-foreground hover:text-sage transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
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
