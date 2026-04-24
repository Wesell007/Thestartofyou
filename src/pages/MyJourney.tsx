import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import JourneyHeader from "@/components/myjourney/JourneyHeader";
import CurrentChapterCard from "@/components/myjourney/CurrentChapterCard";
import JourneyGroup from "@/components/myjourney/JourneyGroup";
import KeptWeekRow from "@/components/myjourney/KeptWeekRow";
import MomentCard from "@/components/myjourney/MomentCard";
import LookingAheadCard from "@/components/myjourney/LookingAheadCard";

type ReflectionRow = {
  week: number;
  content: string;
  first_written_at: string | null;
};

type State = {
  firstName: string;
  currentWeek: number;
  due: Date;
  startedAt: Date | null;
  reflectionsByWeek: Record<number, ReflectionRow>;
  photoWeeks: Set<number>;
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

type GroupDef = { title: string; framing: string; min: number; max: number };

const GROUPS: GroupDef[] = [
  { title: "Beginning", framing: "Where the story quietly began.", min: 1, max: 4 },
  { title: "First trimester", framing: "The earliest weeks, mostly held in private.", min: 5, max: 13 },
  { title: "Second trimester", framing: "Steadier weeks, finding rhythm.", min: 14, max: 27 },
  { title: "Third trimester", framing: "The final stretch, drawing near.", min: 28, max: 42 },
];

const MyJourney = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }
      const [{ data: profile }, journey, { data: refls }, { data: photos }] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        getActivePregnancyJourney(user.id),
        supabase
          .from("reflections")
          .select("week, content, first_written_at")
          .eq("user_id", user.id),
        supabase.from("week_photos").select("week").eq("user_id", user.id),
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

      const reflectionsByWeek: Record<number, ReflectionRow> = {};
      (refls ?? []).forEach((r) => {
        if (r.content && r.content.trim().length > 0) {
          reflectionsByWeek[r.week] = {
            week: r.week,
            content: r.content,
            first_written_at: r.first_written_at ?? null,
          };
        }
      });

      const photoWeeks = new Set<number>((photos ?? []).map((p) => p.week));

      setState({
        firstName: profile.first_name,
        currentWeek: computeWeek(journey.lmp),
        due: journey.due,
        startedAt: journey.startedAt,
        reflectionsByWeek,
        photoWeeks,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const derived = useMemo(() => {
    if (!state) return null;
    const { currentWeek, reflectionsByWeek, photoWeeks } = state;

    // Kept = past or current week with reflection or photo. Past prioritised;
    // current week only included if it has saved content and is then visually
    // subordinated by KeptWeekRow's `isCurrentWeek` styling.
    const keptWeeks: number[] = [];
    for (let w = 1; w <= currentWeek; w++) {
      const hasContent = !!reflectionsByWeek[w] || photoWeeks.has(w);
      if (!hasContent) continue;
      // Always include past weeks; include current week only if it has saved content.
      keptWeeks.push(w);
    }

    // Moments — reflection-led only, most recent first.
    const reflectionWeeks = keptWeeks
      .filter((w) => !!reflectionsByWeek[w])
      .sort((a, b) => {
        const ra = reflectionsByWeek[a].first_written_at;
        const rb = reflectionsByWeek[b].first_written_at;
        if (ra && rb) return rb.localeCompare(ra);
        if (ra) return -1;
        if (rb) return 1;
        return b - a;
      });

    return { keptWeeks, reflectionWeeks };
  }, [state]);

  if (!state || !derived) {
    return <div className="min-h-screen bg-parchment" />;
  }

  const { currentWeek, due, startedAt, reflectionsByWeek, photoWeeks } = state;
  const { keptWeeks, reflectionWeeks } = derived;

  const showMoments = reflectionWeeks.length >= 2;
  const momentsDesktop = reflectionWeeks.slice(0, 3);
  const momentsMobile = reflectionWeeks.slice(0, 2);

  const renderRow = (w: number) => (
    <KeptWeekRow
      key={w}
      week={w}
      reflection={reflectionsByWeek[w]?.content}
      hasPhoto={photoWeeks.has(w)}
      isCurrentWeek={w === currentWeek}
    />
  );

  const groupsWithContent = GROUPS.map((g) => ({
    ...g,
    weeks: keptWeeks.filter((w) => w >= g.min && w <= g.max),
  })).filter((g) => g.weeks.length > 0);

  const accent = "hsl(var(--stage-pregnancy-accent))";

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        <JourneyHeader currentWeek={currentWeek} due={due} startedAt={startedAt} />
        <CurrentChapterCard currentWeek={currentWeek} />

        {keptWeeks.length === 0 ? (
          <section
            className="rounded-[20px] px-6 sm:px-7 py-7 sm:py-8 mb-4 keepsake-surface"
            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
          >
            <p
              className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
              style={{ color: accent }}
            >
              Your spine
            </p>
            <p className="font-serif italic text-foreground/68 text-[15.5px] leading-[1.65] max-w-[46ch]">
              Your journey has just begun. The weeks and reflections you keep will gather here over time.
            </p>
          </section>
        ) : (
          <div className="flex flex-col">
            {/* Moments — desktop position (above spine). Hidden on mobile. */}
            {showMoments && (
              <section className="hidden md:block mb-14 order-1">
                <div className="mb-5">
                  <h2
                    className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-2"
                    style={{ color: accent }}
                  >
                    Moments kept
                  </h2>
                  <p className="font-serif italic text-foreground/55 text-[14.5px] leading-[1.5]">
                    A few of the things you've held onto.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {momentsDesktop.map((w) => (
                    <MomentCard
                      key={w}
                      week={w}
                      reflection={reflectionsByWeek[w].content}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Spine */}
            <div className="order-2">
              {groupsWithContent.map((g) => (
                <JourneyGroup key={g.title} title={g.title} framing={g.framing}>
                  {g.weeks.map(renderRow)}
                </JourneyGroup>
              ))}
            </div>

            {/* Moments — mobile position (below spine). Hidden on desktop. */}
            {showMoments && (
              <section className="md:hidden mt-4 mb-4 order-3">
                <div className="mb-5">
                  <h2
                    className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-2"
                    style={{ color: accent }}
                  >
                    Moments kept
                  </h2>
                  <p className="font-serif italic text-foreground/55 text-[14.5px] leading-[1.5]">
                    A few of the things you've held onto.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {momentsMobile.map((w) => (
                    <MomentCard
                      key={w}
                      week={w}
                      reflection={reflectionsByWeek[w].content}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        <LookingAheadCard currentWeek={currentWeek} />
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default MyJourney;
