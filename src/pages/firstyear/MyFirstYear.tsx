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
import StageGuidanceSection from "@/components/firstyear/journey/StageGuidanceSection";
import ForYouBlock, { type ForYouCard } from "@/components/firstyear/journey/ForYouBlock";
import PregnancyChapterKeptCard from "@/components/firstyear/journey/PregnancyChapterKeptCard";
import WhatComesNextCard from "@/components/firstyear/journey/WhatComesNextCard";
import TodayCard from "@/components/firstyear/journey/TodayCard";
import RecentlySavedCard from "@/components/firstyear/journey/RecentlySavedCard";
import MemoriesCard from "@/components/firstyear/journey/MemoriesCard";
import FirstYearAskCompanion from "@/components/firstyear/journey/FirstYearAskCompanion";
import ExploreGuidance from "@/components/firstyear/journey/ExploreGuidance";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { companionSentenceSubject } from "@/lib/companion/companionName";
import {
  countEntriesForDate,
  getRecentEntries,
  type FirstYearEntry,
} from "@/lib/firstYearEntries";
import { getRecentMemories, type FirstYearMemory } from "@/lib/firstYearMemories";
import { localDateKey } from "@/lib/firstYearEntriesSchema";
import { describeAge, describeBabies } from "@/lib/firstYearCopy";

/** For you lane. Existing public recovery and wellbeing routes only. */
const FOR_YOU_CARDS: ForYouCard[] = [
  {
    title: "Recovery after birth",
    detail: "How healing tends to go, and what to expect week by week.",
    href: "/first-year/postpartum-recovery",
    topic: "postpartum-recovery",
  },
  {
    title: "Body and hormones",
    detail: "The physical changes that carry on after your baby arrives.",
    href: "/first-year/body-and-hormones",
    topic: "body-and-hormones",
  },
  {
    title: "Emotional wellbeing",
    detail: "Feeling like yourself again, and when to reach for support.",
    href: "/first-year/emotional-wellbeing",
    topic: "emotional-wellbeing",
  },
];



type State = {
  babies: BabyRecord[];
  hasKeptChapter: boolean;
  savedToday: number;
  recentEntries: FirstYearEntry[];
  recentMemories: FirstYearMemory[];
};


/**
 * The signed-in First Year landing surface. One journey with two sides of
 * support: for baby, and for you. Read-only in this phase: no tracking, no
 * memory capture, no companion memory.
 */
const MyFirstYear = () => {
  const navigate = useNavigate();
  const { name: companionNameSetting } = useCompanionIdentity();
  const [state, setState] = useState<State | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const companion = companionSentenceSubject(companionNameSetting);

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

        // A quiet count, a short glance back, and the last kept moments only:
        // never streaks, counts of memories, or targets.
        const [savedToday, recentEntries, recentMemories] = await Promise.all([
          countEntriesForDate(userId, localDateKey()).catch(() => 0),
          getRecentEntries(userId, 7).catch((): FirstYearEntry[] => []),
          getRecentMemories(userId, 2).catch((): FirstYearMemory[] => []),
        ]);
        if (cancelled) return;

        setState({
          babies,
          hasKeptChapter: Boolean(journey.archived_pregnancy_journey_id),
          savedToday,
          recentEntries,
          recentMemories,
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
      style={{ backgroundColor: "hsl(var(--stage-firstyear-cream))" }}
    >

      <SeoHead
        title="Your First Year journey | The Start of You"
        description="Your saved First Year journey: support for your baby, and support for you."
        canonical="https://thestartofyou.com/my-first-year"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10 pb-4">
        <FirstYearHeroPanel babies={state.babies} companionName={companion} />
        <TodayCard
          savedToday={state.savedToday}
          babyCount={state.babies.length}
          subject={describeBabies(state.babies)}
          ageLine={
            state.babies[0] ? describeAge(state.babies[0].date_of_birth) : null
          }
        />
        <RecentlySavedCard entries={state.recentEntries} />
        <FirstYearAskCompanion
          dateOfBirth={state.babies[0]?.date_of_birth}
          babyCount={state.babies.length}
        />
        <MemoriesCard memories={state.recentMemories} />
        <StageGuidanceSection
          dateOfBirth={state.babies[0]?.date_of_birth}
          babyCount={state.babies.length}
          subject={describeBabies(state.babies)}
        />
        <ForYouBlock cards={FOR_YOU_CARDS} />
        {state.hasKeptChapter ? <PregnancyChapterKeptCard hasKeptChapter /> : null}
        <ExploreGuidance />
        <WhatComesNextCard />


      </main>
      <MyWeekFooter contextual="If anything worries you about your baby or your own recovery, speak to your midwife, GP or health visitor." />
    </div>
  );
};

export default MyFirstYear;
