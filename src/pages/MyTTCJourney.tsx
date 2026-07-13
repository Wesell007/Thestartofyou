import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getActiveTTCJourney, type ActiveTTCJourney } from "@/lib/savedTTCJourney";

/**
 * Minimal placeholder for the TTC dashboard. Phase 9.5d will build the real
 * dashboard here.
 */
const MyTTCJourney = () => {
  const [status, setStatus] = useState<"loading" | "empty" | "ready">("loading");
  const [journey, setJourney] = useState<ActiveTTCJourney | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const u = data.session?.user;
      if (!u) return;
      const row = await getActiveTTCJourney(u.id);
      if (cancelled) return;
      if (!row) {
        setStatus("empty");
        return;
      }
      setJourney(row);
      setStatus("ready");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") return <div className="min-h-screen bg-parchment" />;
  if (status === "empty") return <Navigate to="/setup/trying-to-conceive" replace />;

  void journey;

  return (
    <div className="min-h-screen bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl py-16 md:py-24 text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6"
          style={{ background: "hsl(var(--stage-ttc) / 0.5)" }}
        >
          <Check size={20} style={{ color: "hsl(var(--stage-ttc-accent))" }} />
        </div>
        <p
          className="font-sans text-[10px] font-light tracking-[0.3em] uppercase mb-3"
          style={{ color: "hsl(var(--stage-ttc-accent) / 0.8)" }}
        >
          Your TTC journey
        </p>
        <h1 className="font-serif text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
          Your TTC journey is saved
        </h1>
        <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed max-w-md mx-auto mb-8">
          Next, we will build your personal dashboard with cycle timing, next
          steps and gentle reminders.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link
            to="/trying-to-conceive"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Back to TTC guidance <ArrowRight size={14} />
          </Link>
          <div className="flex gap-x-5 gap-y-2 flex-wrap justify-center pt-2">
            <Link
              to="/ovulation-calculator"
              className="font-sans text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Open ovulation calculator
            </Link>
            <Link
              to="/ask?stage=ttc"
              className="font-sans text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Ask a TTC question
            </Link>
            <Link
              to="/setup/trying-to-conceive"
              className="font-sans text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Update TTC setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTTCJourney;
