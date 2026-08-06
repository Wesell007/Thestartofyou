import { useEffect, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { commitPendingJourneyToDB } from "@/lib/savedJourney";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { toast } from "sonner";
import {
  SUGGESTED_NAMES,
  TONE_OPTIONS,
  validateCompanionName,
  type CompanionTone,
} from "@/lib/companion";
import { getActivePregnancyJourney, readPendingJourney } from "@/lib/savedJourney";
import { getActiveTTCJourney } from "@/lib/savedTTCJourney";
import type { NavLifecycle } from "@/lib/navLifecycle";
import { resolveSetupCopy } from "@/lib/setupCopy";

type CompanionChoice = "skip" | "cindy" | "ava" | "mia" | "custom";

const isNavLifecycle = (value: unknown): value is NavLifecycle =>
  value === "pregnancy" || value === "ttc" || value === "first_year";

/**
 * Lifecycle for copy purposes only. The pointer is authoritative; a pending or
 * saved pregnancy journey and a saved TTC journey are fallbacks for users who
 * arrive before the pointer exists. Anything unresolved stays null so the
 * screen reads neutrally rather than assuming pregnancy.
 */
const resolveSetupLifecycle = async (userId: string): Promise<NavLifecycle | null> => {
  const { data: pointer } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();
  if (isNavLifecycle(pointer?.lifecycle)) return pointer.lifecycle;

  if (readPendingJourney()) return "pregnancy";
  const pregnancy = await getActivePregnancyJourney(userId);
  if (pregnancy) return "pregnancy";
  const ttc = await getActiveTTCJourney(userId);
  if (ttc) return "ttc";
  return null;
};

const Setup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lifecycle, setLifecycle] = useState<NavLifecycle | null>(null);

  const [choice, setChoice] = useState<CompanionChoice>("skip");
  const [customName, setCustomName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [tone, setTone] = useState<CompanionTone | null>(null);


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
      try {
        await commitPendingJourneyToDB(u.id);
      } catch (e) {
        console.error(e);
        setLoadError("We couldn't save your pregnancy dates. Please try again before continuing.");
        setLoading(false);
        return;
      }
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
    setNameError(null);

    let companionValue: string | null = null;
    if (choice === "custom") {
      const result = validateCompanionName(customName);
      if (result.ok === false) {
        setNameError(result.message);
        return;
      }
      companionValue = result.value;
    } else if (choice !== "skip") {
      const suggested = SUGGESTED_NAMES.find((n) => n.toLowerCase() === choice);
      companionValue = suggested ?? null;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: userId,
          first_name: firstName.trim(),
          companion_name: companionValue,
          companion_tone: tone,
        },
        { onConflict: "user_id" },
      );
    setSubmitting(false);
    if (error) {
      toast.error("Could not save. Please try again.");
      return;
    }
    trackEvent(EVENTS.SETUP_COMPLETED);
    navigate("/my-week", { replace: true });
  };

  const pillClass = (active: boolean) =>
    `rounded-pill border px-3.5 py-1.5 font-sans text-[12.5px] transition-colors ${
      active
        ? "bg-foreground/[0.06] border-foreground/40 text-foreground"
        : "bg-parchment border-border/50 text-foreground/75 hover:border-foreground/25"
    }`;

  return (
    <div className="min-h-screen bg-parchment flex items-center">
      <SeoHead
        title="Setup | The Start of You"
        description="Finish setting up your Start of You account."
        canonical="https://thestartofyou.com/setup"
        noindex
      />
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
          className="bg-card border rounded-2xl p-7 md:p-8 shadow-soft space-y-5"
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

          <div className="pt-2 border-t border-border/40">
            <p className="font-sans text-xs font-light text-muted-foreground/80 mb-1">
              Name your companion, if you would like
            </p>
            <p className="font-sans text-[11.5px] font-light text-muted-foreground/70 mb-3">
              You can skip this and change it later.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(["skip", "cindy", "ava", "mia", "custom"] as CompanionChoice[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setChoice(opt);
                    setNameError(null);
                  }}
                  className={pillClass(choice === opt)}
                >
                  {opt === "skip"
                    ? "Skip"
                    : opt === "custom"
                    ? "Custom"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
            {choice === "custom" && (
              <div>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  maxLength={24}
                  placeholder="A name for your companion"
                  className="w-full bg-parchment border rounded-pill px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                />
                {nameError && (
                  <p role="alert" className="mt-2 font-sans text-[11.5px] text-destructive">
                    {nameError}
                  </p>
                )}
              </div>
            )}

            <p className="font-sans text-xs font-light text-muted-foreground/80 mt-4 mb-2">
              Tone (optional)
            </p>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTone(tone === opt.value ? null : opt.value)}
                  className={pillClass(tone === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

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
