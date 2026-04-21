import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getWeekIdentity } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import JourneyMeaning from "@/components/myweek/JourneyMeaning";

type State = {
  firstName: string;
  currentWeek: number;
  reflections: Record<number, { content: string; updated_at: string }>;
  photos: Record<number, { signedUrl: string }>;
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

const MyJourney = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State | null>(null);
  const currentRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }
      const [{ data: profile }, { data: journey }, { data: refls }, { data: photos }] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        supabase.from("saved_journeys").select("lmp_date").eq("user_id", user.id).maybeSingle(),
        supabase.from("reflections").select("week, content, updated_at").eq("user_id", user.id),
        supabase.from("week_photos").select("week, storage_path").eq("user_id", user.id),
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

      const photoEntries: [number, { signedUrl: string }][] = [];
      if (photos && photos.length > 0) {
        const signed = await Promise.all(
          photos.map(async (p) => {
            const { data } = await supabase.storage
              .from("weekly-photos")
              .createSignedUrl(p.storage_path, 60 * 60);
            return data?.signedUrl
              ? ([p.week, { signedUrl: data.signedUrl }] as [number, { signedUrl: string }])
              : null;
          })
        );
        signed.forEach((s) => s && photoEntries.push(s));
      }
      const photosByWeek: State["photos"] = Object.fromEntries(photoEntries);

      setState({
        firstName: profile.first_name,
        currentWeek: computeWeek(new Date(journey.lmp_date)),
        reflections,
        photos: photosByWeek,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Scroll the current week into view on first load
  useEffect(() => {
    if (state && currentRef.current) {
      const t = window.setTimeout(() => {
        currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [state]);

  const weeks = useMemo(() => {
    const arr: number[] = [];
    for (let w = 1; w <= MAX_PREGNANCY_WEEK; w++) arr.push(w);
    return arr;
  }, []);

  if (!state) {
    return <div className="min-h-screen bg-parchment" />;
  }

  const { firstName, currentWeek, reflections, photos } = state;

  const heldCount = Object.keys(reflections).length;
  const photoCount = Object.keys(photos).length;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[680px] lg:max-w-[1200px] xl:max-w-[1320px] px-5 sm:px-8 md:px-12 lg:px-14 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT — meaning / summary / companion framing */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <JourneyMeaning
              firstName={firstName}
              currentWeek={currentWeek}
              heldCount={heldCount}
              photoCount={photoCount}
            />
          </div>

          {/* RIGHT — vertical week spine */}
          <section className="relative lg:col-span-7">
            {/* Spine line */}
            <div
              aria-hidden="true"
              className="absolute left-[14px] sm:left-[18px] lg:left-[20px] top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, hsl(var(--stage-pregnancy-accent) / 0.28) 6%, hsl(var(--stage-pregnancy-accent) / 0.28) 94%, transparent 100%)",
              }}
            />

            <ol className="space-y-1">
              {weeks.map((w) => {
                const isCurrent = w === currentWeek;
                const isPast = w < currentWeek;
                const isFuture = w > currentWeek;
                const reflection = reflections[w];
                const photo = photos[w];
                const identity = getWeekIdentity(w);

                return (
                  <li
                    key={w}
                    ref={isCurrent ? currentRef : undefined}
                    className="relative scroll-mt-24"
                  >
                    {/* Spine node */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-[10px] sm:left-[14px] lg:left-[16px] top-[26px] rounded-full transition-all ${
                        isCurrent
                          ? "w-[10px] h-[10px] ring-4 ring-[hsl(var(--stage-pregnancy)/0.65)]"
                          : isPast
                          ? "w-[7px] h-[7px]"
                          : "w-[5px] h-[5px]"
                      }`}
                      style={{
                        backgroundColor: isFuture
                          ? "hsl(var(--stage-pregnancy-accent) / 0.22)"
                          : "hsl(var(--stage-pregnancy-accent))",
                      }}
                    />

                    {isCurrent ? (
                      <a
                        href="/my-week"
                        className="block ml-12 sm:ml-14 lg:ml-16 my-4 rounded-[28px] overflow-hidden keepsake-surface transition-all duration-500 hover:shadow-[0_36px_80px_-32px_hsl(var(--stage-pregnancy-accent)/0.32),0_8px_24px_-12px_hsl(222_14%_12%/0.1)]"
                        style={{
                          border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.22)",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row gap-0">
                          {photo ? (
                            <div className="relative shrink-0 sm:w-[200px]">
                              <img
                                src={photo.signedUrl}
                                alt={`Week ${w} — ${identity.chapterTitle}`}
                                className="w-full h-[180px] sm:h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className="hidden sm:flex shrink-0 sm:w-[140px] items-center justify-center"
                              style={{
                                background:
                                  "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.28) 100%)",
                                borderRight: "1px dashed hsl(var(--stage-pregnancy-accent) / 0.22)",
                              }}
                            >
                              <Camera size={18} strokeWidth={1.4} className="text-foreground/30" />
                            </div>
                          )}
                          <div className="px-6 sm:px-8 py-6 sm:py-7 flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                              <span
                                className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase"
                                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                              >
                                This week · Week {w}
                              </span>
                            </div>
                            <h3 className="font-serif font-medium text-foreground text-[1.7rem] sm:text-[1.95rem] leading-[1.05] mb-2">
                              {identity.chapterTitle}
                            </h3>
                            <p className="font-serif italic text-[15px] sm:text-[15.5px] text-foreground/55 leading-[1.5] mb-5">
                              {identity.theme}
                            </p>
                            {reflection && (
                              <p
                                className="font-serif italic text-[14.5px] text-foreground/72 leading-[1.75] border-l-2 pl-5 mb-5"
                                style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
                              >
                                "{reflection.content.length > 140
                                  ? reflection.content.slice(0, 140).trimEnd() + "…"
                                  : reflection.content}"
                              </p>
                            )}
                            <span className="inline-flex items-center font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/65">
                              Open this week →
                            </span>
                          </div>
                        </div>
                      </a>
                    ) : isPast ? (
                      (() => {
                        const isHeld = !!(reflection || photo);
                        if (!isHeld) {
                          // Untouched past week — a single quiet inline row.
                          // No frame, no placeholder block. Reads as part of
                          // the spine, never competes with held weeks.
                          return (
                            <a
                              href="/my-week"
                              className="block ml-12 sm:ml-14 lg:ml-16 py-2.5 pr-2 group transition-opacity duration-300 opacity-55 hover:opacity-90"
                            >
                              <div className="flex items-baseline justify-between gap-4">
                                <div className="flex items-baseline gap-3 min-w-0">
                                  <span className="font-serif font-medium text-[0.95rem] sm:text-[1rem] text-foreground/68 shrink-0">
                                    Week {w}
                                  </span>
                                  <span className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/45 truncate">
                                    {identity.chapterTitle}
                                  </span>
                                </div>
                                <span className="font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase text-foreground/28 shrink-0">
                                  Earlier
                                </span>
                              </div>
                            </a>
                          );
                        }
                        return (
                          <a
                            href="/my-week"
                            className="block ml-12 sm:ml-14 lg:ml-16 my-2 group transition-all duration-500 rounded-[20px] keepsake-surface px-5 sm:px-6 py-5 sm:py-6 hover:shadow-[0_22px_56px_-26px_hsl(var(--stage-pregnancy-accent)/0.28),0_3px_12px_-6px_hsl(222_14%_12%/0.06)]"
                          >
                            <div className="flex gap-5">
                              {photo ? (
                                <div className="held-image rounded-[14px] overflow-hidden shrink-0">
                                  <img
                                    src={photo.signedUrl}
                                    alt={`Week ${w}`}
                                    className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] object-cover"
                                  />
                                </div>
                              ) : (
                                // Held by reflection — quiet chapter-mark glyph
                                <div
                                  className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-[14px] shrink-0 flex items-center justify-center"
                                  style={{
                                    background:
                                      "radial-gradient(circle at 50% 45%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 70%)",
                                    border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.18)",
                                  }}
                                >
                                  <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                                    <circle cx="14" cy="15" r="2.4" fill="hsl(var(--stage-pregnancy-accent) / 0.7)" />
                                    <path d="M 14 12 C 18 9, 21 5, 22 1" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.55)" strokeWidth="0.8" strokeLinecap="round" />
                                    <path d="M 14 12 C 10 9, 7 5, 6 1" fill="none" stroke="hsl(var(--stage-pregnancy-accent) / 0.55)" strokeWidth="0.8" strokeLinecap="round" />
                                  </svg>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                                  <div className="flex items-baseline gap-3 min-w-0">
                                    <span className="font-serif font-medium text-[1.05rem] sm:text-[1.15rem] text-foreground/92 group-hover:text-foreground transition-colors shrink-0">
                                      Week {w}
                                    </span>
                                    <span className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/68 truncate">
                                      {identity.chapterTitle}
                                    </span>
                                  </div>
                                  <span
                                    className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase shrink-0"
                                    style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                                  >
                                    {reflection && photo
                                      ? "Held · Kept"
                                      : reflection
                                      ? "Held"
                                      : "Kept"}
                                  </span>
                                </div>
                                <p className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/58 leading-[1.5]">
                                  {identity.theme}
                                </p>
                                {reflection && (
                                  <p
                                    className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/68 leading-[1.75] mt-3 border-l-[1.5px] pl-4"
                                    style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
                                  >
                                    "{reflection.content.length > 110
                                      ? reflection.content.slice(0, 110).trimEnd() + "…"
                                      : reflection.content}"
                                  </p>
                                )}
                              </div>
                            </div>
                          </a>
                        );
                      })()
                    ) : (
                      <div className="ml-12 sm:ml-14 lg:ml-16 py-5 sm:py-6 opacity-50">
                        <div className="flex items-baseline justify-between gap-4 mb-1">
                          <div className="flex items-baseline gap-3 min-w-0">
                            <span className="font-serif font-medium text-[1rem] sm:text-[1.05rem] text-foreground/72 shrink-0">
                              Week {w}
                            </span>
                            <span className="font-serif italic text-[14px] text-foreground/52 truncate">
                              {identity.chapterTitle}
                            </span>
                          </div>
                          <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/28">
                            Ahead
                          </span>
                        </div>
                        <p className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/42 leading-[1.5] pl-0 sm:pl-0">
                          {identity.theme}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default MyJourney;
