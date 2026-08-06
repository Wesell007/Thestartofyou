import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoSrc from "@/assets/logo-dark.png";
import { toast } from "@/hooks/use-toast";
import { useLifecycle } from "@/lib/useLifecycle";
import { resolveHeaderLinks, resolveHomeHref } from "@/lib/navLifecycle";

const MyWeekHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { lifecycle, hasKeptChapter } = useLifecycle();
  const homeHref = resolveHomeHref(lifecycle);
  const links = resolveHeaderLinks(lifecycle, hasKeptChapter);

  const isActive = (href: string) => location.pathname === href;


  const linkClass = (href: string) =>
    `font-sans text-[13px] sm:text-[14px] tracking-wide transition-colors ${
      isActive(href)
        ? "text-foreground font-medium"
        : "text-foreground/60 hover:text-foreground font-light"
    }`;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Could not sign out", description: "Please try again.", variant: "destructive" });
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-lg border-b border-border/30">
      <div className="mx-auto w-full max-w-[680px] lg:max-w-[1200px] xl:max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/my-week" className="flex items-center shrink-0">
          <img
            src={logoSrc}
            alt="The Start of You"
            className="w-[100px] sm:w-[120px] md:w-[140px] h-auto object-contain contrast-[1.1]"
          />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7" aria-label="Account navigation">
          {/* On mobile these tabs live in the fixed bottom journey nav */}
          <Link to="/my-week" className={`hidden md:inline ${linkClass("/my-week")}`}>
            This week
          </Link>
          <Link to="/my-journey" className={`hidden md:inline ${linkClass("/my-journey")}`}>
            My journey
          </Link>
          <div className="relative" ref={menuRef}>
            <button
              aria-label="Account"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              <User size={14} strokeWidth={1.5} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-card border border-border/60 rounded-xl shadow-elevated py-1.5 overflow-hidden">
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 font-sans text-[13px] font-light text-foreground/75 hover:text-foreground hover:bg-muted/40 transition-colors"
                >
                  <Settings size={13} strokeWidth={1.5} />
                  Account settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 font-sans text-[13px] font-light text-foreground/75 hover:text-foreground hover:bg-muted/40 transition-colors text-left"
                >
                  <LogOut size={13} strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MyWeekHeader;
