import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import logoSrc from "@/assets/logo-dark.png";

const MyWeekHeader = () => {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;

  const linkClass = (href: string) =>
    `font-sans text-[13px] sm:text-[14px] tracking-wide transition-colors ${
      isActive(href)
        ? "text-foreground font-medium"
        : "text-foreground/60 hover:text-foreground font-light"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-lg border-b border-border/30">
      <div className="mx-auto w-full max-w-[640px] px-5 sm:px-8 md:px-10 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logoSrc}
            alt="The Start of You"
            className="w-[100px] sm:w-[120px] md:w-[140px] h-auto object-contain contrast-[1.1]"
          />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Account navigation">
          <Link to="/my-week" className={linkClass("/my-week")}>
            My Week
          </Link>
          <Link to="/my-journey" className={linkClass("/my-journey")}>
            My Journey
          </Link>
          <button
            aria-label="Account"
            className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <User size={14} strokeWidth={1.5} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default MyWeekHeader;
