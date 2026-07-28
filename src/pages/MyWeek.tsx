import { useEffect, useMemo, useRef, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney, type PregnancyJourneyStatus } from "@/lib/savedJourney";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity, getSafeAskSeed, getSizeCueSlug } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import SectionHero from "@/components/myweek/SectionHero";
import SectionBabyThisWeek from "@/components/myweek/SectionBabyThisWeek";
import SectionBodyThisWeek from "@/components/myweek/SectionBodyThisWeek";
import SectionEmotionallyThisWeek from "@/components/myweek/SectionEmotionallyThisWeek";
import SlotOneFocus from "@/components/myweek/SlotOneFocus";
import SectionAskAI from "@/components/myweek/SectionAskAI";
import SectionToolsThisWeek from "@/components/myweek/SectionToolsThisWeek";

import SectionKeepThisWeek from "@/components/myweek/SectionKeepThisWeek";
import SectionNextChapter from "@/components/myweek/SectionNextChapter";
import SectionWeeklyReads from "@/components/myweek/SectionWeeklyReads";
import SectionPregnancyComplete from "@/components/myweek/SectionPregnancyComplete";
import SectionJourneyPaused from "@/components/myweek/SectionJourneyPaused";
import SectionJourneyQuiet from "@/components/myweek/SectionJourneyQuiet";
import PageLoadState from "@/components/shared/PageLoadState";

const getGreeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const formatDueDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

const formatWeeksToGo = (dueDate: Date) => {
  const daysLeft = Math.max(differenceInDays(dueDate, new Date()), 0);
  const weeksLeft = Math.max(Math.ceil(daysLeft / 7), 0);
  if (weeksLeft === 0) return "Any day now";
  return `${weeksLeft} ${weeksLeft === 1 ? "week" : "weeks"} to go`;
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

const stageWhatThisMeans = (week: number): string => {
  if (week <= 12)
    return "Most of this early work is invisible from the outside. It is still happening.";
  if (week <= 27)
    return "The middle weeks often feel steadier, though every day can still hold its own weather.";
  if (week <= 36)
    return "Growth slows into shape and readiness now, more than it does in size.";
  if (week <= 40)
    return "The last weeks are quiet finishing, not falling behind.";
  return "Going past your due date is common. Your body knows the way.";
};

type Loaded = {
  userId: string;
  firstName: string;
  currentWeek: number;
  dueDate: Date;
  status: PregnancyJourneyStatus;
};

const MyWeek = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<Loaded | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (viewedRef.current) return;
    if (loading || !state) return;
    viewedRef.current = true;
    trackEvent(EVENTS.MY_WEEK_VIEWED);
  }, [loading, state]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const { data: sess, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        const user = sess.session?.user;
        if (!user) {
          navigate("/auth", { replace: true });
          return;
        }

        const [{ data: profile, error: profileError }, journey] = await Promise.all([
          supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
          getActivePregnancyJourney(user.id, { throwOnError: true }),
        ]);
        if (profileError) throw profileError;

        if (cancelled) return;

        if (!journey) {
          navigate("/due-date-calculator", { replace: true });
          return;
        }
        if (!profile?.first_name) {
          navigate("/setup", { replace: true });
          return;
        }

        setState({
          userId: user.id,
          firstName: profile.first_name,
          currentWeek: computeWeek(journey.lmp),
          dueDate: journey.due,
          status: journey.status,
        });
        setLoading(false);
      } catch {
        if (!cancelled) {
          setLoadError("We couldn't load your week just now. Your saved journey has not been changed.");
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt]);

  const content = useMemo(
    () => (state ? getMyWeekContent(state.currentWeek) : null),
    [state]
  );
  const identity = useMemo(
    () => (state ? getWeekIdentity(state.currentWeek) : null),
    [state]
  );

  if (loading) return <PageLoadState />;
  if (loadError) {
    return <PageLoadState error={loadError} onRetry={() => setAttempt((n) => n + 1)} />;
  }
  if (!state || !content || !identity) {
    return <PageLoadState error="We couldn't prepare this week's content." onRetry={() => setAttempt((n) => n + 1)} />;
  }

  const { userId, firstName, currentWeek, dueDate, status } = state;

  if (status !== "active") {
    return (
      <div className="min-h-screen bg-parchment-grain page-vignette relative overflow-x-hidden">
        <SeoHead
          title="My week | The Start of You"
          description="Your saved pregnancy journey."
          canonical="https://thestartofyou.com/my-week"
          noindex
        />
        <MyWeekHeader />
        <main className="relative mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10 pt-16 sm:pt-20">
          {status === "given_birth" && <SectionPregnancyComplete />}
          {(status === "paused" || status === "no_longer_pregnant") && (
            <SectionJourneyPaused variant={status} />
          )}
          {status === "pregnancy_loss" && <SectionJourneyQuiet />}
        </main>
        <MyWeekFooter contextual={null} />
      </div>
    );
  }

  const nextWeek = currentWeek < MAX_PREGNANCY_WEEK ? currentWeek + 1 : null;
  const nextIdentity = nextWeek ? getWeekIdentity(nextWeek) : null;

  const trimesterLabel =
    currentWeek <= 12
      ? "First trimester"
      : currentWeek <= 27
      ? "Second trimester"
      : currentWeek <= 40
      ? "Third trimester"
      : "Past your due date";

  const contextual =
    currentWeek <= 12
      ? "If something doesn't feel right, our Support hub is here."
      : currentWeek >= 37
      ? "Whatever you're feeling right now, support is here."
      : null;

  const bodyText =
    content.bodyParagraph ??
    content.matters.find((m) => m.title.toLowerCase().includes("body"))?.body ??
    content.matters[1]?.body ??
    "";
  const emotionalText =
    content.emotionalNote ??
    content.matters.find((m) => m.title.toLowerCase().startsWith("emotion"))?.body ??
    content.matters[2]?.body ??
    "";
  const askSeed = content.safeAskSeed ?? getSafeAskSeed(currentWeek);
  const standfirst = content.lead ?? identity.theme;
  const whatThisMeans = stageWhatThisMeans(currentWeek);

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative overflow-x-hidden">
      <SeoHead
        title="My week | The Start of You"
        description="Your current pregnancy week chapter."
        canonical="https://thestartofyou.com/my-week"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10">
        <SectionHero
          greeting={getGreeting()}
          firstName={firstName}
          trimesterLabel={trimesterLabel}
          week={currentWeek}
          chapterTitle={identity.chapterTitle}
          standfirst={standfirst}
          dueDateLabel={formatDueDate(dueDate)}
          weeksToGoLabel={formatWeeksToGo(dueDate)}
        />

        <SectionBabyThisWeek
          week={currentWeek}
          developmentCue={identity.developmentCue}
          babyNote={identity.babyNote}
          whatThisMeans={whatThisMeans}
          sizeComparisonSlug={getSizeCueSlug(currentWeek) ?? undefined}
        />

        {bodyText && <SectionBodyThisWeek bodyText={bodyText} />}

        {emotionalText && (
          <SectionEmotionallyThisWeek
            emotionalText={emotionalText}
            reflectionPrompt={content.reflection.prompt}
          />
        )}

        <section className="relative pt-4 pb-12">
          <div
            className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
          >
            <SlotOneFocus content={content} />
          </div>
        </section>

        <SectionAskAI week={currentWeek} seed={askSeed} />

        <SectionToolsThisWeek week={currentWeek} />

        <SectionWeeklyReads week={currentWeek} />

        <SectionKeepThisWeek
          userId={userId}
          week={currentWeek}
          chapterTitle={identity.chapterTitle}
          content={content}
        />

        <SectionNextChapter
          nextWeek={nextWeek}
          nextChapterTitle={nextIdentity?.chapterTitle}
          nextTheme={nextIdentity?.theme}
          nextPreview={content.nextPreview}
        />
      </main>
      <MyWeekFooter contextual={contextual} />
    </div>
  );
};

export default MyWeek;
