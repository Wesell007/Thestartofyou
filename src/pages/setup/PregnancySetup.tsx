/**
 * Pregnancy journey setup — /setup/pregnancy.
 *
 * A journey-led, non-indexed setup route. `/due-date-calculator` remains the
 * separate public utility and is untouched.
 *
 * Boundaries held here:
 *  - Exactly one calculation implementation: the shared calculator form and
 *    `pregnancyDates.ts`. Nothing is recalculated locally.
 *  - No setup value ever enters the URL. The estimate lives in component
 *    state while the person is on the page.
 *  - If sign-in is needed, only the existing pending-journey contract is used
 *    (the derived LMP). No method-specific input — IVF transfer details,
 *    ultrasound measurements or conception dates — is persisted.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import SeoHead from "@/components/seo/SeoHead";
import SetupShell from "@/components/setup/SetupShell";
import SetupGlimpse from "@/components/setup/SetupGlimpse";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import { computeResult } from "@/components/shared/DueDateCalculatorResult";
import { supabase } from "@/integrations/supabase/client";
import { buildAuthUrl } from "@/lib/authIntent";
import {
  clearPendingJourney,
  getActivePregnancyJourney,
  readPendingJourney,
  saveActivePregnancyJourney,
  stashPendingJourney,
} from "@/lib/savedJourney";

type Mode = "loading" | "signed_out" | "signed_in" | "error";

const TOTAL_STEPS = 3;

const STEP_LABELS = ["Your dates", "Your starting point", "Ready to save"];

const PregnancySetup = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("loading");
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [lmp, setLmp] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (cancelled) return;
      if (error) {
        setMode("error");
        return;
      }
      const user = data.session?.user ?? null;

      // Resume: the only value ever persisted is the derived LMP.
      const pending = readPendingJourney();
      if (pending?.journey_type === "pregnancy") {
        const resumed = new Date(pending.lmp_ms);
        if (!Number.isNaN(resumed.getTime())) {
          setLmp(resumed);
          setStep(user ? 3 : 2);
        }
      }

      if (!user) {
        setMode("signed_out");
        return;
      }
      setUserId(user.id);

      try {
        const active = await getActivePregnancyJourney(user.id, { throwOnError: true });
        if (cancelled) return;
        if (active) {
          navigate("/my-week", { replace: true });
          return;
        }
      } catch {
        if (cancelled) return;
        setMode("error");
        return;
      }
      setMode("signed_in");
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const result = lmp ? computeResult(lmp) : null;

  const handleSave = async () => {
    if (!lmp) return;
    if (mode === "signed_out") {
      stashPendingJourney(lmp);
      navigate(buildAuthUrl("start_journey", "/setup/pregnancy"));
      return;
    }
    if (!userId) return;
    setSaving(true);
    try {
      await saveActivePregnancyJourney(userId, lmp);
      navigate("/my-week", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("We could not save this just now. Please try again in a moment.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    clearPendingJourney();
    navigate("/start-your-journey");
  };

  if (mode === "loading") {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center" role="status">
        <Loader2 className="animate-spin text-sage" aria-hidden />
        <span className="sr-only">Loading your pregnancy setup</span>
      </div>
    );
  }

  if (mode === "error") {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
        <div role="alert" className="max-w-md text-center space-y-5">
          <h1 className="font-serif text-3xl text-foreground">We couldn't open this just now</h1>
          <p className="font-sans text-sm text-muted-foreground">
            Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-pill bg-terracotta px-6 py-3 font-sans text-sm text-terracotta-foreground"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title="Start your Pregnancy journey | The Start of You"
        description="Begin your saved pregnancy journey."
        canonical="https://thestartofyou.com/setup/pregnancy"
        noindex
      />
      <SetupShell
        stage="pregnancy"
        kicker="Save your pregnancy journey"
        title="Let's shape your pregnancy journey"
        intro="We use your dates to keep your week, your appointments and the reading that fits this stage in one calm place. Your estimate stays on this page until you choose to save it."
        step={step}
        totalSteps={TOTAL_STEPS}
        stepLabel={STEP_LABELS[step - 1]}
        onCancel={handleCancel}
        aside={
          <SetupGlimpse
            stage="pregnancy"
            kicker="My Week"
            title="What your saved journey opens on"
            highlight={
              result ? `Around week ${result.currentWeek} · ${result.trimester}` : undefined
            }
            lines={[
              "Where you are this week, in plain language",
              "The appointments and checks that usually come next",
              "A private place for a thought you want to keep",
              "Guidance that moves as your weeks do",
            ]}
          />
        }
      >
        {step === 1 && (
          <div>
            <h2 className="font-serif text-[1.5rem] text-foreground mb-2">Your dates</h2>
            <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed mb-6">
              Choose whichever starting point you have. Last period, conception, an IVF
              transfer date or a scan all work.
            </p>
            <DueDateCalculatorForm
              onResult={(value) => {
                setLmp(value);
                setStep(2);
              }}
            />
          </div>
        )}

        {step === 2 && result && lmp && (
          <div>
            <h2 className="font-serif text-[1.5rem] text-foreground mb-2">
              Your starting point
            </h2>
            <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed mb-6">
              This is where your journey begins. Your midwife or doctor may adjust your
              due date after a scan, and you can update this later.
            </p>
            <dl className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="rounded-[16px] border border-border/40 bg-parchment/70 p-4">
                <dt className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Estimated due date
                </dt>
                <dd className="mt-2 font-serif text-[1.15rem] text-foreground">
                  {format(result.dueDate, "d MMMM yyyy")}
                </dd>
              </div>
              <div className="rounded-[16px] border border-border/40 bg-parchment/70 p-4">
                <dt className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Current week
                </dt>
                <dd className="mt-2 font-serif text-[1.15rem] text-foreground">
                  Week {result.currentWeek}
                </dd>
              </div>
              <div className="rounded-[16px] border border-border/40 bg-parchment/70 p-4">
                <dt className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Trimester
                </dt>
                <dd className="mt-2 font-serif text-[1.15rem] text-foreground">
                  {result.trimester}
                </dd>
              </div>
            </dl>
            <p className="font-sans text-[13px] font-light text-muted-foreground/80 leading-relaxed mb-7">
              This is an estimate, not a diagnosis or confirmation of anything. Your care
              team remains the place for medical questions.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-pill border border-border/60 px-5 py-3 font-sans text-sm text-foreground/70 hover:text-foreground"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-pill bg-terracotta px-6 py-3 font-sans text-sm font-medium text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
              >
                Continue <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div>
            <h2 className="font-serif text-[1.5rem] text-foreground mb-2">Ready to save</h2>
            <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed mb-6">
              {mode === "signed_out"
                ? "Signing in saves your journey so your week is waiting for you each time you come back. Only your estimated start date is kept on this device until then."
                : "Saving keeps your pregnancy journey with your account. You can update your dates whenever you need to."}
            </p>
            <p className="font-serif text-[1.1rem] text-foreground mb-7">
              Week {result.currentWeek} · due {format(result.dueDate, "d MMMM yyyy")}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-pill border border-border/60 px-5 py-3 font-sans text-sm text-foreground/70 hover:text-foreground"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-pill bg-terracotta px-6 py-3 font-sans text-sm font-medium text-terracotta-foreground shadow-cta hover:bg-terracotta-hover disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <>
                    {mode === "signed_out"
                      ? "Continue, sign in to save"
                      : "Save my pregnancy journey"}
                    <ArrowRight size={14} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step > 1 && !result ? (
          <div>
            <p className="font-sans text-sm text-muted-foreground mb-5">
              Let's start with your dates.
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-pill bg-terracotta px-6 py-3 font-sans text-sm text-terracotta-foreground"
            >
              Add my dates
            </button>
          </div>
        ) : null}
      </SetupShell>
    </>
  );
};

export default PregnancySetup;
