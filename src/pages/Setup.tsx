import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { commitPendingJourneyToDB } from "@/lib/savedJourney";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { toast } from "sonner";

const Setup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(async ({ data, error: sessionError }) => {
      if (cancelled) return;
      if (sessionError) {
        setLoadError("We couldn't check your account. Please try again.");
        setLoading(false);
        return;
      }
      const u = data.session?.user;
      if (!u) {
        navigate("/auth", { replace: true });
        return;
      }
      setUserId(u.id);
      // Make sure pending journey is committed (covers magic-link arrivals)
      try {
        await commitPendingJourneyToDB(u.id);
      } catch (e) {
        console.error(e);
        setLoadError("We couldn't save your pregnancy dates. Please try again before continuing.");
        setLoading(false);
        return;
      }
      // If already has a name, skip
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("user_id", u.id)
        .maybeSingle();
      if (profileError) {
        setLoadError("We couldn't load your profile. Please try again.");
        setLoading(false);
        return;
      }
      if (profile?.first_name) navigate("/my-week", { replace: true });
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || loading || !firstName.trim()) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ user_id: userId, first_name: firstName.trim() }, { onConflict: "user_id" });
    setSubmitting(false);
    if (error) {
      toast.error("Could not save. Please try again.");
      return;
    }
    trackEvent(EVENTS.SETUP_COMPLETED);
    navigate("/my-week", { replace: true });
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-md py-16">
        <div className="text-center mb-10">
          <p
            className="font-sans text-[10px] font-light tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--stage-pregnancy-accent) / 0.7)" }}
          >
            One small thing
          </p>
          <h1 className="font-serif text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
            What should we call you?
          </h1>
          <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed max-w-sm mx-auto">
            Just your first name. We'll use it to greet you each week.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border rounded-2xl p-7 md:p-8 shadow-soft space-y-4"
          style={{ borderColor: "hsl(var(--border) / 0.4)" }}
        >
          <label className="block">
            <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block">First name</span>
            <input
              type="text"
              required
              maxLength={80}
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Sarah"
              className="w-full bg-parchment border rounded-pill px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
              style={{ borderColor: "hsl(var(--border) / 0.5)" }}
            />
          </label>
          <button
            type="submit"
            disabled={loading || submitting || !userId || !firstName.trim()}
            className="w-full inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-60"
          >
            {loading || submitting ? <Loader2 size={16} className="animate-spin" /> : <>Continue to my week <ArrowRight size={14} /></>}
          </button>
          {loadError ? (
            <div role="alert" className="space-y-3 text-center">
              <p className="font-sans text-xs text-destructive">{loadError}</p>
              <button type="button" onClick={() => window.location.reload()} className="font-sans text-xs underline text-foreground">
                Try again
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Setup;
