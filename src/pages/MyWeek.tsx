import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekChapter from "@/components/myweek/MyWeekChapter";
import SlotOneFocus from "@/components/myweek/SlotOneFocus";
import SlotPhotoMemory from "@/components/myweek/SlotPhotoMemory";
import SlotReflection from "@/components/myweek/SlotReflection";
import SlotCompanionRecall from "@/components/myweek/SlotCompanionRecall";
import SlotWhatsNext from "@/components/myweek/SlotWhatsNext";
import MyWeekClosing from "@/components/myweek/MyWeekClosing";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";

const getGreeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const formatDueDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

const formatRemainingTime = (dueDate: Date, currentWeek: number) => {
  const daysLeft = Math.max(differenceInDays(dueDate, new Date()), 0);
  const weeksLeft = Math.max(Math.ceil(daysLeft / 7), 0);
  return `${weeksLeft} ${weeksLeft === 1 ? "week" : "weeks"} to go`;
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

type Loaded = {
  userId: string;
  firstName: string;
  currentWeek: number;
  dueDate: Date;
};

const MyWeek = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<Loaded | null>(null);
  const [loading, setLoading] = useState(true);
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
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }

      const [{ data: profile }, journey] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        getActivePregnancyJourney(user.id),
      ]);

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
      });
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const content = useMemo(
    () => (state ? getMyWeekContent(state.currentWeek) : null),
    [state]
  );
  const identity = useMemo(
    () => (state ? getWeekIdentity(state.currentWeek) : null),
    [state]
  );

  if (loading || !state || !content || !identity) {
    return <div className="min-h-screen bg-parchment" />;
  }

  const { userId, firstName, currentWeek, dueDate } = state;
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

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative overflow-x-hidden">
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[680px] md:max-w-[920px] lg:max-w-[1200px] xl:max-w-[1320px] px-4 sm:px-8 md:px-10 lg:px-14">
        {/* Two-zone composition from md upward. Mobile = single column flow. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-14 xl:gap-20 lg:items-start">
          {/* LEFT — Chapter + guidance */}
          <div className="lg:col-span-7">
            <MyWeekChapter
              greeting={getGreeting()}
              firstName={firstName}
              week={currentWeek}
              dueDateLabel={formatDueDate(dueDate)}
              dueDateMeta={formatRemainingTime(dueDate, currentWeek)}
              trimesterLabel={trimesterLabel}
              chapterTitle={identity.chapterTitle}
              theme={identity.theme}
              developmentCue={identity.developmentCue}
              babyNote={identity.babyNote}
              content={content}
            />
          </div>

          {/* RIGHT — One contained ritual rail. Sticky on lg so it stays in
              view as the left guidance scrolls, eliminating the empty
              lower-right quadrant. */}
          <aside className="lg:col-span-5 mt-10 lg:mt-0 lg:pt-24 lg:sticky lg:top-28 lg:self-start">
            <div
              className="relative rounded-[28px] md:rounded-[32px] px-6 sm:px-8 md:px-7 lg:px-9 py-8 sm:py-9 lg:py-10 keepsake-surface divide-y"
              style={{
                borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)",
                ['--tw-divide-opacity' as string]: 1,
              }}
            >
              <div
                className="space-y-0 [&>*+*]:border-t [&>*+*]:border-[hsl(var(--stage-pregnancy-accent)/0.12)]"
              >
                <SlotOneFocus content={content} />
                <SlotPhotoMemory userId={userId} week={currentWeek} chapterTitle={identity.chapterTitle} />
                <SlotReflection content={content} userId={userId} week={currentWeek} />
                <SlotCompanionRecall userId={userId} currentWeek={currentWeek} />
                <SlotWhatsNext
                  content={content}
                  nextWeek={nextWeek}
                  nextChapterTitle={nextIdentity?.chapterTitle}
                  nextTheme={nextIdentity?.theme}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Chapter-closing surface — solves the lower empty space */}
        <MyWeekClosing
          firstName={firstName}
          currentWeek={currentWeek}
          chapterTitle={identity.chapterTitle}
          nextChapterTitle={nextIdentity?.chapterTitle ?? null}
          nextWeek={nextWeek}
        />
      </main>
      <MyWeekFooter contextual={contextual} />
    </div>
  );
};

export default MyWeek;
