import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import logoSrc from "@/assets/logo-dark.png";

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
    <header className="border-b border-border/30 bg-parchment/95">
      <div className="mx-auto flex h-16 max-w-[980px] items-center justify-between px-5 sm:px-8">
        <Link to="/my-ttc-journey"><img src={logoSrc} alt="The Start of You" className="w-[120px] h-auto" /></Link>
        <nav aria-label="TTC account navigation" className="flex items-center gap-5 font-sans text-sm">
          <Link to="/trying-to-conceive" className="text-foreground/65 hover:text-foreground">TTC guidance</Link>
          <Link to="/account" className="text-foreground/65 hover:text-foreground">Account</Link>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 text-foreground/65 hover:text-foreground">
            <LogOut size={14} /> Sign out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default TTCJourneyHeader;
