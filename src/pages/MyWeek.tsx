import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
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

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }

      const [{ data: profile }, { data: journey }] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        supabase.from("saved_journeys").select("lmp_date, due_date").eq("user_id", user.id).maybeSingle(),
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

      const lmp = new Date(journey.lmp_date);
      const due = new Date(journey.due_date);
      setState({
        userId: user.id,
        firstName: profile.first_name,
        currentWeek: computeWeek(lmp),
        dueDate: due,
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
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[680px] lg:max-w-[1200px] xl:max-w-[1320px] px-5 sm:px-8 md:px-12 lg:px-14">
        {/* Two-zone desktop composition. Below lg, single column flow. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT — Chapter + guidance */}
          <div className="lg:col-span-7">
            <MyWeekChapter
              greeting={getGreeting()}
              firstName={firstName}
              week={currentWeek}
              dueDateLabel={formatDueDate(dueDate)}
              trimesterLabel={trimesterLabel}
              chapterTitle={identity.chapterTitle}
              theme={identity.theme}
              developmentCue={identity.developmentCue}
              babyNote={identity.babyNote}
              content={content}
            />
          </div>

          {/* RIGHT — One contained ritual rail */}
          <aside className="lg:col-span-5 lg:pt-24">
            <div
              className="relative rounded-[32px] px-7 sm:px-9 py-9 sm:py-10 keepsake-surface divide-y"
              style={{
                borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)",
                ['--tw-divide-opacity' as string]: 1,
              }}
            >
              {/* Quiet rail label */}
              <div className="-mt-3 mb-3 flex items-center gap-3 pb-0 border-b-0">
                <span
                  aria-hidden="true"
                  className="block w-5 h-px"
                  style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
                />
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase"
                  style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  This week, held
                </p>
              </div>

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
