import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SeoHead from "@/components/seo/SeoHead";
import PageLoadState from "@/components/shared/PageLoadState";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import { supabase } from "@/integrations/supabase/client";
import { canEnterFirstYearSetup, saveFirstYearJourney } from "@/lib/firstYearJourney";
import {
  FIRST_YEAR_SETUP_COPY,
  type FirstYearSetupMode,
} from "@/lib/firstYearEntry";
import StepIntro from "@/components/firstyear/setup/StepIntro";
import StepBabies from "@/components/firstyear/setup/StepBabies";
import StepStage from "@/components/firstyear/setup/StepStage";
import StepValue from "@/components/firstyear/setup/StepValue";
import StepCompanion, {
  type CompanionDraft,
} from "@/components/firstyear/setup/StepCompanion";
import StepReview from "@/components/firstyear/setup/StepReview";
import { resolveFirstYearStage } from "@/lib/firstYearStage";
import { isCompanionTone, validateCompanionName } from "@/lib/companion";
import {
  FIRST_YEAR_POST_SAVE_DESTINATION,
  TOTAL_STEPS,
} from "@/components/firstyear/setup/firstYearSetupConstants";

import {
  buildBabyPayload,
  createEmptyDraft,
  friendlySaveError,
  setBabyCount,
  setBabyName,
  validateDraft,
  type FirstYearSetupDraft,
  type FirstYearSetupErrors,
} from "@/components/firstyear/setup/firstYearSetupSchema";

type Screen = "loading" | "ready" | "error";

/**
 * First Year setup with two modes.
 *
 *  - Transition: pregnancy journey with status `given_birth`.
 *  - Direct: no journey pointer at all, started from the public hub.
 *
 * Every other state redirects silently, so no baby age copy or setup prompt
 * can appear in a sensitive state. The RPC repeats these guards server-side.
 */
const FirstYearSetup = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("loading");
  const [mode, setMode] = useState<FirstYearSetupMode>("transition");
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<FirstYearSetupDraft>(createEmptyDraft);
  const [errors, setErrors] = useState<FirstYearSetupErrors>({});
  const [companion, setCompanion] = useState<CompanionDraft>({
    name: "Cindy",
    tone: "calm",
  });
  const [hasSavedName, setHasSavedName] = useState(false);
  const [companionNameError, setCompanionNameError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (cancelled) return;
      if (error || !data.user) {
        setScreen("error");
        return;
      }
      const userId = data.user.id;
      setUserId(userId);

      // Reuse the existing profile companion fields. A saved name means the
      // parent already met their companion, so we prefill instead of
      // reintroducing Cindy from scratch.
      const { data: profile } = await supabase
        .from("profiles")
        .select("companion_name, companion_tone")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      const savedName = profile?.companion_name?.trim() ?? "";
      const savedTone = profile?.companion_tone ?? null;
      setHasSavedName(savedName.length > 0);
      setCompanion({
        name: savedName.length > 0 ? savedName : "Cindy",
        tone: isCompanionTone(savedTone) ? savedTone : "calm",
      });



      // Read the lifecycle pointer first: getActivePregnancyJourney returns
      // null once the lifecycle has moved on, which would otherwise look the
      // same as having no journey at all.
      const { data: pointer, error: pointerError } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      if (pointerError) {
        setScreen("error");
        return;
      }
      if (pointer?.lifecycle === "first_year") {
        navigate(FIRST_YEAR_POST_SAVE_DESTINATION, { replace: true });
        return;
      }
      if (!pointer) {
        // No journey pointer at all: direct First Year start from the hub.
        setMode("direct");
        setScreen("ready");
        return;
      }
      if (pointer.lifecycle === "ttc") {
        navigate("/my-ttc-journey", { replace: true });
        return;
      }
      if (pointer.lifecycle !== "pregnancy") {
        navigate("/my-journey", { replace: true });
        return;
      }

      const { data: pregnancy, error: pregnancyError } = await supabase
        .from("pregnancy_journeys")
        .select("status")
        .eq("user_id", userId)
        .maybeSingle();
      if (cancelled) return;
      if (pregnancyError) {
        setScreen("error");
        return;
      }

      const status = pregnancy?.status ?? null;
      if (status === "active") {
        navigate("/my-week", { replace: true });
        return;
      }
      if (!canEnterFirstYearSetup(status)) {
        navigate("/my-journey", { replace: true });
        return;
      }
      setMode("transition");
      setScreen("ready");
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Move focus to the step heading on every step change, but never steal focus
  // on first paint.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const goTo = useCallback((next: number) => {
    setSaveError(null);
    setStep(Math.min(TOTAL_STEPS, Math.max(1, next)));
  }, []);

  const stage = resolveFirstYearStage(draft.dateOfBirth);

  const handleBabiesContinue = () => {
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    goTo(3);
  };

  /** Validate the companion name only when one was typed. Blank is allowed. */
  const resolveCompanionName = (): { ok: boolean; value: string | null } => {
    const trimmed = companion.name.trim();
    if (trimmed.length === 0) return { ok: true, value: null };
    const result = validateCompanionName(trimmed);
    if (result.ok === false) {
      setCompanionNameError(result.message);
      return { ok: false, value: null };
    }
    setCompanionNameError(null);
    return { ok: true, value: result.value };
  };

  const handleCompanionContinue = () => {
    if (!resolveCompanionName().ok) return;
    goTo(6);
  };

  const handleSubmit = async () => {
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      goTo(2);
      return;
    }
    const companionResult = resolveCompanionName();
    if (!companionResult.ok) {
      goTo(5);
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      await saveFirstYearJourney(buildBabyPayload(draft));
      if (userId) {
        // Display-only personalisation. A failure here must not lose the
        // journey that has already saved.
        const { error: profileError } = await supabase.from("profiles").upsert(
          {
            user_id: userId,
            companion_name: companionResult.value,
            companion_tone: companion.tone,
          },
          { onConflict: "user_id" },
        );
        if (profileError) console.error(profileError);
      }
      toast.success("Your First Year journey has begun.");
      navigate(FIRST_YEAR_POST_SAVE_DESTINATION, { replace: true });
    } catch (error) {
      console.error(error);
      setSaveError(friendlySaveError());
    } finally {
      setSaving(false);
    }
  };


  if (screen === "loading") {
    return <PageLoadState message="Loading your First Year setup…" />;
  }

  if (screen === "error") {
    return (
      <PageLoadState
        error="We couldn't open this just now. Please try again in a moment."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const copy = FIRST_YEAR_SETUP_COPY[mode];

  return (
    <div
      className="min-h-screen bg-parchment-grain page-vignette relative"
      style={{ backgroundColor: "hsl(var(--stage-firstyear) / 0.35)" }}
    >
      <SeoHead
        title="Start your First Year | The Start of You"
        description="Begin your saved First Year journey."
        canonical="https://thestartofyou.com/setup/first-year"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-20">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-3"
          style={{ color: "hsl(var(--stage-firstyear-accent))" }}
        >
          {copy.kicker}
        </p>
        <h1 className="sr-only">Start your First Year journey</h1>

        <div
          className="rounded-[22px] keepsake-surface px-6 sm:px-9 py-8 sm:py-10 min-h-[420px] flex flex-col"
          style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
        >
          <div className="mb-6">
            <p className="font-sans text-[12.5px] text-foreground/55" aria-live="polite">
              Step {step} of {TOTAL_STEPS}
            </p>
            <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: TOTAL_STEPS }, (_, index) => (
                <span
                  key={index}
                  className="h-[3px] w-7 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      index < step
                        ? "hsl(var(--stage-firstyear-accent) / 0.55)"
                        : "hsl(var(--stage-firstyear-accent) / 0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            {step === 1 && (
              <StepIntro
                ref={headingRef}
                onBegin={() => goTo(2)}
                mode={mode}
                onNotNow={() => navigate(copy.exitHref)}
              />
            )}
            {step === 2 && (
              <StepBabies
                ref={headingRef}
                draft={draft}
                errors={errors}
                onCountChange={(count) => setDraft((d) => setBabyCount(d, count))}
                onNameChange={(index, name) => {
                  setDraft((d) => setBabyName(d, index, name));
                  setErrors((e) => {
                    if (!e.names?.[index]) return e;
                    const names = { ...e.names };
                    delete names[index];
                    return {
                      ...e,
                      names: Object.keys(names).length > 0 ? names : undefined,
                    };
                  });
                }}
                onDateChange={(value) => {
                  setDraft((d) => ({ ...d, dateOfBirth: value }));
                  setErrors((e) => (e.dateOfBirth ? { ...e, dateOfBirth: undefined } : e));
                }}
                onBack={() => goTo(1)}
                onContinue={handleBabiesContinue}
              />
            )}
            {step === 3 && (
              <StepStage
                ref={headingRef}
                stage={stage}
                babyCount={draft.babyCount}
                onBack={() => goTo(2)}
                onContinue={() => goTo(4)}
              />
            )}
            {step === 4 && (
              <StepValue
                ref={headingRef}
                mode={mode}
                onBack={() => goTo(3)}
                onContinue={() => goTo(5)}
              />
            )}
            {step === 5 && (
              <StepCompanion
                ref={headingRef}
                hasSavedName={hasSavedName}
                value={companion}
                nameError={companionNameError}
                onChange={(next) => {
                  setCompanion(next);
                  setCompanionNameError(null);
                }}
                onBack={() => goTo(4)}
                onContinue={handleCompanionContinue}
              />
            )}
            {step === 6 && (
              <StepReview
                ref={headingRef}
                mode={mode}
                draft={draft}
                stage={stage}
                companionName={companion.name}
                companionTone={companion.tone}
                saving={saving}
                saveError={saveError}
                onEditBabies={() => goTo(2)}
                onEditCompanion={() => goTo(5)}
                onBack={() => goTo(5)}
                onSubmit={handleSubmit}
              />
            )}

          </div>

          <div className="pt-8">
            <button
              type="button"
              onClick={() => navigate(copy.exitHref)}
              className="font-sans text-[13px] text-foreground/60 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FirstYearSetup;
