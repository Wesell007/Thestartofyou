import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";

type State = {
  firstName: string;
  currentWeek: number;
  reflections: Record<number, { content: string; updated_at: string }>;
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

const trimesterFor = (week: number) =>
  week <= 12 ? "First trimester" : week <= 27 ? "Second trimester" : "Third trimester";

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
      const [{ data: profile }, { data: journey }, { data: refls }] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        supabase.from("saved_journeys").select("lmp_date").eq("user_id", user.id).maybeSingle(),
        supabase.from("reflections").select("week, content, updated_at").eq("user_id", user.id),
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
      const reflections: State["reflections"] = {};
      (refls ?? []).forEach((r) => {
        if (r.content && r.content.trim().length > 0) {
          reflections[r.week] = { content: r.content, updated_at: r.updated_at };
        }
      });
      setState({
        firstName: profile.first_name,
        currentWeek: computeWeek(new Date(journey.lmp_date)),
        reflections,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const weeks = useMemo(() => {
    if (!state) return [];
    const arr: number[] = [];
    for (let w = 1; w <= MAX_PREGNANCY_WEEK; w++) arr.push(w);
    return arr;
  }, [state]);

  if (!state) {
    return <div className="min-h-screen bg-parchment" />;
  }

  const { firstName, currentWeek, reflections } = state;
  const reflectionCount = Object.keys(reflections).length;

  // Group by trimester for visible structure
  const groups: { label: string; weeks: number[] }[] = [
    { label: "First trimester", weeks: weeks.filter((w) => w <= 12) },
    { label: "Second trimester", weeks: weeks.filter((w) => w >= 13 && w <= 27) },
    { label: "Third trimester", weeks: weeks.filter((w) => w >= 28 && w <= 40) },
    { label: "Beyond your due date", weeks: weeks.filter((w) => w >= 41) },
  ];

  return (
    <div className="min-h-screen bg-parchment">
      <MyWeekHeader />
      <main className="mx-auto w-full max-w-[640px] md:max-w-[700px] px-5 sm:px-8 md:px-12">
        {/* Hero */}
        <section className="relative pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-[520px] sm:w-[640px] md:w-[760px] h-[300px] sm:h-[360px] md:h-[420px] rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.55), hsl(var(--stage-pregnancy) / 0) 70%)",
            }}
          />
          <div className="relative md:text-center md:flex md:flex-col md:items-center">
            <p
              className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.26em] uppercase mb-5 sm:mb-6"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Your journey · {firstName}
            </p>
            <h1 className="font-serif text-foreground leading-[0.95] tracking-tight mb-5 sm:mb-6">
              <span
                className="block font-medium"
                style={{ fontSize: "clamp(2.25rem, 7vw, 4rem)" }}
              >
                Week by week
              </span>
            </h1>
            <p className="font-serif italic text-[1.05rem] sm:text-[1.15rem] text-foreground/65 leading-snug max-w-[34ch] md:mx-auto">
              The quiet record of your pregnancy — held week by week, in your own words.
            </p>
            <p className="font-sans text-[12.5px] font-light text-foreground/45 italic mt-5">
              {reflectionCount === 0
                ? "Begin this week. Small entries become a record."
                : reflectionCount === 1
                ? "1 reflection held so far."
                : `${reflectionCount} reflections held so far.`}
            </p>
          </div>
        </section>

        {/* Week spine */}
        <section className="relative pb-20 sm:pb-24 md:pb-32">
          {/* Vertical spine line */}
          <div
            aria-hidden="true"
            className="absolute left-[14px] sm:left-[18px] md:left-[20px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, hsl(var(--stage-pregnancy-accent) / 0.25) 8%, hsl(var(--stage-pregnancy-accent) / 0.25) 92%, transparent 100%)",
            }}
          />

          <div className="space-y-12 sm:space-y-14">
            {groups.map((group) => (
              <div key={group.label}>
                {/* Trimester label */}
                <div className="flex items-center gap-3 mb-7 pl-10 sm:pl-12 md:pl-14">
                  <span
                    aria-hidden="true"
                    className="block w-5 h-px"
                    style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
                  />
                  <p
                    className="font-sans text-[10.5px] font-light tracking-[0.24em] uppercase"
                    style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                  >
                    {group.label}
                  </p>
                </div>

                <ul className="space-y-1.5">
                  {group.weeks.map((w) => {
                    const isCurrent = w === currentWeek;
                    const isPast = w < currentWeek;
                    const isFuture = w > currentWeek;
                    const reflection = reflections[w];
                    const identity = getWeekIdentity(w);
                    const lead = getMyWeekContent(w).lead;

                    return (
                      <li key={w} className="relative">
                        {/* Spine node */}
                        <span
                          aria-hidden="true"
                          className={`absolute left-[10px] sm:left-[14px] md:left-[16px] top-[22px] rounded-full transition-all ${
                            isCurrent
                              ? "w-[10px] h-[10px] ring-4 ring-[hsl(var(--stage-pregnancy)/0.6)]"
                              : isPast
                              ? "w-[7px] h-[7px]"
                              : "w-[5px] h-[5px]"
                          }`}
                          style={{
                            backgroundColor: isFuture
                              ? "hsl(var(--stage-pregnancy-accent) / 0.25)"
                              : "hsl(var(--stage-pregnancy-accent))",
                          }}
                        />

                        {isCurrent ? (
                          <div
                            className="ml-10 sm:ml-12 md:ml-14 rounded-2xl border px-5 sm:px-6 py-5 sm:py-6 transition-shadow"
                            style={{
                              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.3)",
                              background:
                                "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.22) 100%)",
                              boxShadow:
                                "0 6px 30px -12px hsl(var(--stage-pregnancy-accent) / 0.22)",
                            }}
                          >
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                              <p
                                className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
                                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                              >
                                This week
                              </p>
                              <span className="font-serif text-[1.1rem] text-foreground/80">
                                Week {w}
                              </span>
                            </div>
                            <p className="font-serif italic text-[1.05rem] sm:text-[1.15rem] text-foreground leading-snug mb-3">
                              {identity.theme}
                            </p>
                            <p className="font-sans text-[14px] font-light text-foreground/65 leading-relaxed mb-4">
                              {lead}
                            </p>
                            {reflection ? (
                              <p className="font-serif italic text-[14.5px] text-foreground/70 leading-relaxed border-l-2 pl-4 mb-4"
                                style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
                              >
                                "{reflection.content.length > 140
                                  ? reflection.content.slice(0, 140).trimEnd() + "…"
                                  : reflection.content}"
                              </p>
                            ) : null}
                            <a
                              href="/my-week"
                              className="inline-flex items-center font-sans text-[12px] font-light tracking-[0.16em] uppercase text-foreground/70 hover:text-foreground transition-colors"
                            >
                              Open this week →
                            </a>
                          </div>
                        ) : (
                          <div
                            className={`ml-10 sm:ml-12 md:ml-14 py-4 sm:py-5 ${
                              isFuture ? "opacity-50" : ""
                            }`}
                          >
                            <div className="flex items-baseline justify-between gap-4 mb-1">
                              <span className="font-serif text-[1rem] sm:text-[1.05rem] text-foreground/85">
                                Week {w}
                              </span>
                              <span className="font-sans text-[11px] font-light tracking-[0.16em] uppercase text-foreground/35">
                                {isPast ? "Past" : "Ahead"}
                              </span>
                            </div>
                            <p className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/55 leading-snug">
                              {identity.theme}
                            </p>
                            {isPast && reflection && (
                              <p className="font-serif italic text-[13.5px] text-foreground/60 leading-relaxed mt-2 border-l-[1.5px] pl-3"
                                style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.35)" }}
                              >
                                "{reflection.content.length > 100
                                  ? reflection.content.slice(0, 100).trimEnd() + "…"
                                  : reflection.content}"
                              </p>
                            )}
                            {isPast && !reflection && (
                              <p className="font-sans text-[12px] font-light italic text-foreground/30 mt-1.5">
                                No reflection held this week
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default MyJourney;
