import { useEffect, useMemo, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { format, isAfter, isBefore, isValid, parseISO, startOfDay, subDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { buildAuthUrl } from "@/lib/authIntent";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import {
  commitPendingTTCJourneyToDB,
  getActiveTTCJourney,
  getPendingTTCJourney,
  stashPendingTTCJourney,
  type TTCFormValues,
} from "@/lib/savedTTCJourney";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { toast } from "sonner";
import SetupShell from "@/components/setup/SetupShell";
import SetupGlimpse from "@/components/setup/SetupGlimpse";

const schema = z.object({
  last_period_date: z
    .string()
    .min(1, "Please add the first day of your last period.")
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && isValid(parseISO(value)), "Please add a valid period date.")
    .refine((value) => {
      const date = parseISO(value);
      const today = startOfDay(new Date());
      return !isAfter(date, today) && !isBefore(date, subDays(today, 90));
    }, "Please use a period date from the last 90 days."),
  cycle_length_days: z
    .number({ invalid_type_error: "Please add your usual cycle length." })
    .int()
    .min(20, "Cycle length must be at least 20 days.")
    .max(45, "Cycle length must be 45 days or fewer."),
  period_length_days: z
    .number()
    .int()
    .min(2)
    .max(10)
    .nullable(),
  cycle_regularity: z.enum(["regular", "irregular", "unsure"]),
  actively_trying: z.enum(["yes", "preparing", "unsure"]),
  uses_ovulation_tests: z.enum(["yes", "no", "sometimes"]),
  tracks_symptoms: z.enum(["yes", "not_now"]),
  support_status: z.enum([
    "trying_naturally",
    "preparing_to_try",
    "considering_help",
    "in_treatment",
  ]),
  ivf_consideration: z.enum([
    "no",
    "considering",
    "in_treatment",
    "prefer_not_to_say",
  ]),
});

/** The cycle values are the only answers ever kept on the device. */
const cycleStepSchema = schema.pick({
  last_period_date: true,
  cycle_length_days: true,
  period_length_days: true,
});

type Mode = "loading" | "signed_out" | "signed_in" | "pregnancy_active" | "error";

const RADIO = "flex items-center gap-2 text-[13.5px] font-sans text-foreground/85";

const TOTAL_STEPS = 3;
const STEP_LABELS = ["Your cycle", "How you're trying", "Ready to save"];

const INPUT =
  "w-full bg-parchment border rounded-pill px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10";

const SetupTTC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("loading");
  const [userId, setUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [existing, setExisting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  /** True when cycle values came back from the device but the personal
   *  answers deliberately did not, so they are asked again. */
  const [reconfirm, setReconfirm] = useState(false);

  const [form, setForm] = useState<TTCFormValues>({
    last_period_date: "",
    cycle_length_days: 28,
    period_length_days: null,
    cycle_regularity: "regular",
    actively_trying: "yes",
    uses_ovulation_tests: "no",
    tracks_symptoms: "not_now",
    support_status: "trying_naturally",
    ivf_consideration: "no",
  });

  // Load session, pending stash, and any existing TTC/pregnancy row.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pending = getPendingTTCJourney();
      let restoredCycle = false;
      if (pending) {
        const pendingDate = new Date(pending.lmp_ms);
        if (isValid(pendingDate) && Number.isInteger(pending.cycle_length_days)) {
          restoredCycle = true;
          setForm((f) => ({
            ...f,
            last_period_date: format(pendingDate, "yyyy-MM-dd"),
            cycle_length_days: pending.cycle_length_days,
            period_length_days: pending.period_length_days ?? null,
          }));
        }
      }

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (cancelled) return;
      if (sessionError) {
        setLoadError("We couldn't check your account. Please try again.");
        setMode("error");
        return;
      }
      const u = data.session?.user;
      if (!u) {
        setMode("signed_out");
        return;
      }
      setUserId(u.id);

      let preg;
      let ttc;
      try {
        preg = await getActivePregnancyJourney(u.id, { throwOnError: true });
        if (preg) {
          setMode("pregnancy_active");
          return;
        }
        ttc = await getActiveTTCJourney(u.id, { throwOnError: true });
      } catch (error) {
        console.error(error);
        setLoadError("We couldn't load your saved journey. Please try again.");
        setMode("error");
        return;
      }
      if (ttc && ttc.last_period_date) {
        setExisting(true);
        setForm((f) => ({
          last_period_date: ttc.last_period_date ?? f.last_period_date,
          cycle_length_days: ttc.cycle_length_days ?? f.cycle_length_days,
          period_length_days: ttc.period_length_days ?? f.period_length_days,
          cycle_regularity:
            (ttc.cycle_regularity as TTCFormValues["cycle_regularity"]) ?? f.cycle_regularity,
          actively_trying:
            (ttc.actively_trying as TTCFormValues["actively_trying"]) ?? f.actively_trying,
          uses_ovulation_tests:
            (ttc.uses_ovulation_tests as TTCFormValues["uses_ovulation_tests"]) ??
            f.uses_ovulation_tests,
          tracks_symptoms:
            (ttc.tracks_symptoms as TTCFormValues["tracks_symptoms"]) ?? f.tracks_symptoms,
          support_status:
            (ttc.support_status as TTCFormValues["support_status"]) ?? f.support_status,
          ivf_consideration:
            (ttc.ivf_consideration as TTCFormValues["ivf_consideration"]) ??
            f.ivf_consideration,
        }));
      } else if (restoredCycle) {
        // Cycle values carried across sign-in. The personal answers never do,
        // so they are asked again rather than quietly assumed.
        setReconfirm(true);
        setStep(2);
      }
      setMode("signed_in");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const set = <K extends keyof TTCFormValues>(k: K, v: TTCFormValues[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const stashCurrent = () => {
    if (!form.last_period_date) return;
    stashPendingTTCJourney({
      lmp: parseISO(form.last_period_date),
      cycle_length_days: form.cycle_length_days,
      period_length_days: form.period_length_days,
    });
  };

  const numericForm = () => ({
    ...form,
    cycle_length_days: Number(form.cycle_length_days),
    period_length_days:
      form.period_length_days === null || form.period_length_days === undefined
        ? null
        : Number(form.period_length_days),
  });

  const handleCycleContinue = () => {
    const parsed = cycleStepSchema.safeParse(numericForm());
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your cycle dates.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(numericForm());
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      setStep(1);
      return;
    }

    if (mode === "signed_out") {
      stashCurrent();
      navigate(buildAuthUrl("start_journey", "/setup/trying-to-conceive"));
      return;
    }
    if (!userId) return;

    setSubmitting(true);
    const result = await commitPendingTTCJourneyToDB(
      userId,
      parsed.data as TTCFormValues,
    );
    setSubmitting(false);
    if (result.ok === false) {
      if (result.reason === "pregnancy_active") {
        setMode("pregnancy_active");
        return;
      }
      toast.error("Could not save. Please try again.");
      return;
    }
    trackEvent(EVENTS.TTC_JOURNEY_SETUP_COMPLETED);
    navigate("/my-ttc-journey", { replace: true });
  };

  const ctaLabel = useMemo(() => {
    if (submitting) return null;
    if (mode === "signed_out") return "Continue, sign in to save";
    if (existing) return "Update TTC setup";
    return "Save my TTC journey";
  }, [mode, existing, submitting]);

  if (mode === "loading") {
    return <div className="min-h-screen bg-parchment flex items-center justify-center" role="status"><Loader2 className="animate-spin text-sage" aria-hidden /><span className="sr-only">Loading your TTC setup</span></div>;
  }

  if (mode === "error") {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
        <div role="alert" className="max-w-md text-center space-y-5">
          <h1 className="font-serif text-3xl text-foreground">We couldn't load your setup</h1>
          <p className="font-sans text-sm text-muted-foreground">{loadError}</p>
          <button type="button" onClick={() => window.location.reload()} className="rounded-pill bg-terracotta px-6 py-3 font-sans text-sm text-terracotta-foreground">Try again</button>
        </div>
      </div>
    );
  }

  if (mode === "pregnancy_active") {
    return (
      <div className="min-h-screen bg-parchment flex items-center">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-md py-16 text-center">
          <h1 className="font-serif text-3xl text-foreground leading-tight mb-3">
            You already have a pregnancy journey saved
          </h1>
          <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed mb-8">
            We will not replace your active pregnancy journey. You can carry on
            with it below. Deliberate journey switching will be available from
            your journey settings.
          </p>
          <Link
            to="/my-journey"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Go to my journey <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const periodLabel = form.last_period_date
    ? format(parseISO(form.last_period_date), "d MMMM yyyy")
    : "Not added yet";

  return (
    <>
      <SeoHead
        title="TTC setup | The Start of You"
        description="Save your trying to conceive journey."
        canonical="https://thestartofyou.com/setup/trying-to-conceive"
        noindex
      />
      <SetupShell
        stage="ttc"
        kicker="Save your TTC journey"
        title="Let's save your TTC journey"
        intro="We use a few details to keep your fertile window, likely ovulation day and next steps in one place. You can update these later."
        step={step}
        totalSteps={TOTAL_STEPS}
        stepLabel={STEP_LABELS[step - 1]}
        aside={
          <SetupGlimpse
            stage="ttc"
            kicker="My TTC journey"
            title="What your saved journey opens on"
            lines={[
              "Where you are in this cycle, in plain language",
              "A possible fertile window and likely ovulation day, as estimates",
              "A private place for symptoms, tests or a note",
              "Reading that fits the part of the month you are in",
            ]}
          />
        }
      >
        <div
          className="mb-6 flex items-start gap-3 rounded-2xl border bg-parchment/60 px-4 py-3.5"
          style={{ borderColor: "hsl(var(--border) / 0.5)" }}
        >
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: "hsl(var(--stage-ttc-accent))" }}
          />
          <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
            Your TTC journey can include sensitive information. We use it to
            keep your saved guidance together. You can update or remove it
            later.
            {mode === "signed_out" ? (
              <>
                {" "}
                <span className="text-foreground/70">
                  Until you sign in, only your period date and cycle lengths are
                  held on this device. Your answers about how you are trying are
                  not kept anywhere, so we will ask them again after you sign in.
                </span>
              </>
            ) : null}
          </p>
        </div>

        {reconfirm ? (
          <p
            className="mb-6 rounded-2xl border px-4 py-3.5 font-sans text-[13px] font-light text-muted-foreground leading-relaxed"
            style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.25)" }}
          >
            Welcome back. Your cycle dates carried across. The more personal
            answers were deliberately not kept, so please confirm them again.
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <h2 className="font-serif text-[1.5rem] text-foreground">Your cycle</h2>
              <label className="block">
                <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block">
                  First day of last period
                </span>
                <input
                  type="date"
                  required
                  min={format(subDays(new Date(), 90), "yyyy-MM-dd")}
                  max={format(new Date(), "yyyy-MM-dd")}
                  value={form.last_period_date}
                  onChange={(e) => set("last_period_date", e.target.value)}
                  className={INPUT}
                  style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block">
                    Usual cycle length (days)
                  </span>
                  <input
                    type="number"
                    required
                    min={20}
                    max={45}
                    value={form.cycle_length_days}
                    onChange={(e) => set("cycle_length_days", Number(e.target.value))}
                    className={INPUT}
                    style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                  />
                </label>
                <label className="block">
                  <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block">
                    Period length (optional)
                  </span>
                  <input
                    type="number"
                    min={2}
                    max={10}
                    value={form.period_length_days ?? ""}
                    onChange={(e) =>
                      set(
                        "period_length_days",
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    className={INPUT}
                    style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={handleCycleContinue}
                className="inline-flex items-center gap-2 rounded-pill bg-terracotta px-6 py-3 font-sans text-sm font-medium text-terracotta-foreground shadow-cta hover:bg-terracotta-hover"
              >
                Continue <ArrowRight size={14} aria-hidden="true" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-serif text-[1.5rem] text-foreground">How you're trying</h2>
              <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed">
                These shape the guidance you see. There is no right answer, and
                you can change any of them later.
              </p>

              <RadioGroup
                label="Are your cycles usually regular?"
                name="cycle_regularity"
                value={form.cycle_regularity}
                onChange={(v) => set("cycle_regularity", v as TTCFormValues["cycle_regularity"])}
                options={[
                  { v: "regular", l: "Regular" },
                  { v: "irregular", l: "Irregular" },
                  { v: "unsure", l: "Unsure" },
                ]}
              />

              <RadioGroup
                label="Are you actively trying now?"
                name="actively_trying"
                value={form.actively_trying}
                onChange={(v) => set("actively_trying", v as TTCFormValues["actively_trying"])}
                options={[
                  { v: "yes", l: "Yes" },
                  { v: "preparing", l: "Not yet, preparing" },
                  { v: "unsure", l: "Unsure" },
                ]}
              />

              <RadioGroup
                label="Are you using ovulation tests?"
                name="uses_ovulation_tests"
                value={form.uses_ovulation_tests}
                onChange={(v) =>
                  set("uses_ovulation_tests", v as TTCFormValues["uses_ovulation_tests"])
                }
                options={[
                  { v: "yes", l: "Yes" },
                  { v: "no", l: "No" },
                  { v: "sometimes", l: "Sometimes" },
                ]}
              />

              <RadioGroup
                label="Do you want to track symptoms?"
                name="tracks_symptoms"
                value={form.tracks_symptoms}
                onChange={(v) => set("tracks_symptoms", v as TTCFormValues["tracks_symptoms"])}
                options={[
                  { v: "yes", l: "Yes" },
                  { v: "not_now", l: "Not right now" },
                ]}
              />

              <RadioGroup
                label="Where are you in the wider journey?"
                name="support_status"
                value={form.support_status}
                onChange={(v) => set("support_status", v as TTCFormValues["support_status"])}
                options={[
                  { v: "trying_naturally", l: "Trying naturally" },
                  { v: "preparing_to_try", l: "Preparing to try" },
                  { v: "considering_help", l: "Considering fertility help" },
                  { v: "in_treatment", l: "In fertility treatment" },
                ]}
              />

              <RadioGroup
                label="Are you considering IVF or fertility treatment?"
                name="ivf_consideration"
                value={form.ivf_consideration}
                onChange={(v) => set("ivf_consideration", v as TTCFormValues["ivf_consideration"])}
                options={[
                  { v: "no", l: "No" },
                  { v: "considering", l: "Considering" },
                  { v: "in_treatment", l: "Already in treatment" },
                  { v: "prefer_not_to_say", l: "Prefer not to say" },
                ]}
              />

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
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-serif text-[1.5rem] text-foreground">Ready to save</h2>
              <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed">
                Your cycle dates shape the estimates in your journey. They are
                estimates, not confirmation of ovulation or fertility.
              </p>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[16px] border border-border/40 bg-parchment/70 p-4">
                  <dt className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                    First day of last period
                  </dt>
                  <dd className="mt-2 font-serif text-[1.1rem] text-foreground">{periodLabel}</dd>
                </div>
                <div className="rounded-[16px] border border-border/40 bg-parchment/70 p-4">
                  <dt className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                    Usual cycle length
                  </dt>
                  <dd className="mt-2 font-serif text-[1.1rem] text-foreground">
                    {form.cycle_length_days} days
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-pill border border-border/60 px-5 py-3 font-sans text-sm text-foreground/70 hover:text-foreground"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      {ctaLabel} <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </SetupShell>
    </>
  );
};

const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) => (
  <fieldset>
    <legend className="font-sans text-xs font-light text-muted-foreground/80 mb-2">
      {label}
    </legend>
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {options.map((o) => (
        <label key={o.v} className={RADIO}>
          <input
            type="radio"
            name={name}
            value={o.v}
            checked={value === o.v}
            onChange={() => onChange(o.v)}
            className="accent-terracotta"
          />
          {o.l}
        </label>
      ))}
    </div>
  </fieldset>
);

export default SetupTTC;
