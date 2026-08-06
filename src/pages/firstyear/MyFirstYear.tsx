import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import { supabase } from "@/integrations/supabase/client";
import {
  canEnterFirstYearSetup,
  getActiveFirstYearJourney,
  getBabies,
  type BabyRecord,
} from "@/lib/firstYearJourney";
import { FIRST_YEAR_SETUP_ROUTE } from "@/components/firstyear/setup/firstYearSetupConstants";
import FirstYearHeroPanel from "@/components/firstyear/journey/FirstYearHeroPanel";
import BabySummaryCard from "@/components/firstyear/journey/BabySummaryCard";
import SupportLane, { type SupportCard } from "@/components/firstyear/journey/SupportLane";
import PregnancyChapterKeptCard from "@/components/firstyear/journey/PregnancyChapterKeptCard";
import WhatComesNextCard from "@/components/firstyear/journey/WhatComesNextCard";

/** For baby lane. Full public First Year routes only, never shortened paths. */
const FOR_BABY_CARDS: SupportCard[] = [
  {
    title: "Feeding rhythm",
    detail: "Finding a pattern that works, however you are feeding.",
    href: "/first-year/feeding",
  },
  {
    title: "Sleep rhythm",
    detail: "Safer sleep, wake windows and what is normal at this age.",
    href: "/first-year/sleep",
  },
  {
    title: "Development and milestones",
    detail: "What babies tend to do, without the pressure of a checklist.",
    href: "/first-year/development",
  },
  {
    title: "Nappies and care",
    detail: "Everyday care, skin, bathing and keeping things simple.",
    href: "/first-year/care-and-safety",
  },
  {
    title: "Check-ups and questions",
    detail: "Routine checks, and signs worth asking about.",
    href: "/first-year/checkups-and-warning-signs",
  },
];

/** For you lane. Existing public recovery and wellbeing routes only. */
const FOR_YOU_CARDS: SupportCard[] = [
  {
    title: "Recovery after birth",
    detail: "How healing tends to go, and what to expect week by week.",
    href: "/first-year/postpartum-recovery",
  },
  {
    title: "Body and hormones",
    detail: "The physical changes that carry on after your baby arrives.",
    href: "/first-year/body-and-hormones",
  },
  {
    title: "Emotional wellbeing",
    detail: "Feeling like yourself again, and when to reach for support.",
    href: "/first-year/emotional-wellbeing",
  },
  {
    title: "Questions for your midwife, GP or health visitor",
    detail: "What is worth raising, and how to ask for more help.",
    href: "/first-year/checkups-and-warning-signs",
  },
];

type State = {
  babies: BabyRecord[];
  hasKeptChapter: boolean;
  savedToday: number;
};

/**
 * The signed-in First Year landing surface. One journey with two sides of
 * support: for baby, and for you. Read-only in this phase: no tracking, no
 * memory capture, no companion memory.
 */
const MyFirstYear = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadError(null);
      try {
        const { data: auth, error: authError } = await supabase.auth.getUser();
        if (authError || !auth.user) {
          navigate("/auth", { replace: true });
          return;
        }
        const userId = auth.user.id;

        const { data: pointer, error: pointerError } = await supabase
          .from("journeys")
          .select("lifecycle")
          .eq("user_id", userId)
          .maybeSingle();
        if (pointerError) throw pointerError;
        if (cancelled) return;

        if (!pointer) {
          navigate("/due-date-calculator", { replace: true });
          return;
        }

        if (pointer.lifecycle === "ttc") {
          navigate("/my-ttc-journey", { replace: true });
          return;
        }

        if (pointer.lifecycle === "pregnancy") {
          const { data: pregnancy, error: pregnancyError } = await supabase
            .from("pregnancy_journeys")
            .select("status")
            .eq("user_id", userId)
            .maybeSingle();
          if (pregnancyError) throw pregnancyError;
          if (cancelled) return;
          if (canEnterFirstYearSetup(pregnancy?.status ?? null)) {
            navigate(FIRST_YEAR_SETUP_ROUTE, { replace: true });
          } else {
            navigate("/my-week", { replace: true });
          }
          return;
        }

        if (pointer.lifecycle !== "first_year") {
          navigate("/due-date-calculator", { replace: true });
          return;
        }

        const [journey, babies] = await Promise.all([
          getActiveFirstYearJourney(userId, { throwOnError: true }),
          getBabies(userId, { throwOnError: true }),
        ]);
        if (cancelled) return;

        if (!journey || babies.length === 0) {
          navigate(FIRST_YEAR_SETUP_ROUTE, { replace: true });
          return;
        }

        setState({
          babies,
          hasKeptChapter: Boolean(journey.archived_pregnancy_journey_id),
        });
      } catch {
        if (!cancelled) {
          setLoadError("We couldn't open your First Year journey just now.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt]);

  if (!state) {
    return (
      <PageLoadState
        message="Loading your First Year journey…"
        error={loadError}
        onRetry={loadError ? retry : undefined}
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-parchment-grain page-vignette"
      style={{ backgroundColor: "hsl(var(--stage-firstyear) / 0.35)" }}
    >
      <SeoHead
        title="Your First Year journey | The Start of You"
        description="Your saved First Year journey: support for your baby, and support for you."
        canonical="https://thestartofyou.com/my-first-year"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10 pb-6">
        <FirstYearHeroPanel babies={state.babies} />
        <BabySummaryCard babies={state.babies} />
        <SupportLane
          side="baby"
          kicker="For baby"
          heading="Support for your baby"
          intro="Gentle guidance for the early days and the months ahead. Nothing to keep up with."
          cards={FOR_BABY_CARDS}
        />
        <SupportLane
          side="you"
          kicker="For you"
          heading="Support for you"
          intro="Your recovery matters just as much. This side of the journey is yours."
          cards={FOR_YOU_CARDS}
        />
        {state.hasKeptChapter ? <PregnancyChapterKeptCard hasKeptChapter /> : null}
        <WhatComesNextCard />
      </main>
      <MyWeekFooter contextual="If anything worries you about your baby or your own recovery, speak to your midwife, GP or health visitor." />
    </div>
  );
};

export default MyFirstYear;
