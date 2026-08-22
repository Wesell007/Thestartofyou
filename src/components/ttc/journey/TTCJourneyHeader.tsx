import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import logoSrc from "@/assets/logo-dark.png";
import { TTC_FOCUS_RING } from "@/components/ttc/journey/ttcStyles";

const linkClass = `inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] font-light text-[hsl(var(--stage-ttc-text-soft))] transition-colors hover:text-[hsl(var(--stage-ttc-text))] ${TTC_FOCUS_RING}`;

const TTCJourneyHeader = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Could not sign out", description: "Please try again.", variant: "destructive" });
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--stage-ttc-edge)/0.7)] bg-[hsl(var(--stage-ttc-cream)/0.92)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[980px] items-center justify-between px-5 sm:px-8">
        <Link to="/my-ttc-journey" className={`inline-flex items-center rounded-sm ${TTC_FOCUS_RING}`}>
          <img src={logoSrc} alt="The Start of You" className="w-[120px] h-auto" />
        </Link>
        <nav aria-label="TTC account navigation" className="flex items-center gap-4 sm:gap-6">
          <Link to="/trying-to-conceive" className={linkClass}>
            Guidance
          </Link>
          <Link to="/account" className={`${linkClass} hidden sm:inline-flex`}>
            Account
          </Link>
          <button type="button" onClick={signOut} className={`${linkClass} gap-2`}>
            <LogOut size={14} aria-hidden="true" /> Sign out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default TTCJourneyHeader;
