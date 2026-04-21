import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";

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

      // Sign all photo URLs in parallel
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
      <main className="relative mx-auto w-full max-w-[640px] md:max-w-[720px] px-5 sm:px-8 md:px-12">
        {/* Frontispiece — composed like the opening of a kept volume */}
        <section className="relative pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-16 md:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-[560px] sm:w-[700px] md:w-[840px] h-[340px] sm:h-[400px] md:h-[480px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.85), hsl(var(--stage-pregnancy) / 0.2) 50%, transparent 78%)",
            }}
          />
          <div className="relative md:text-center md:flex md:flex-col md:items-center">
            {/* Top hairline + chapter mark */}
            <div className="flex items-center gap-3 mb-7 md:justify-center">
              <span
                aria-hidden="true"
                className="block h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(to right, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)",
                }}
              />
              <span
                aria-hidden="true"
                className="block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.7)" }}
              />
              <span
                aria-hidden="true"
                className="block h-px w-10 sm:w-14"
                style={{
                  background:
                    "linear-gradient(to left, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)",
                }}
              />
            </div>

            <p
              className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.3em] uppercase mb-6 sm:mb-7"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              {firstName}'s pregnancy, week by week
            </p>
            <h1 className="font-serif text-foreground leading-[0.96] tracking-tight mb-5 sm:mb-6">
              <span
                className="block font-medium"
                style={{ fontSize: "clamp(2.5rem, 7.6vw, 4.4rem)" }}
              >
                Week by week
              </span>
            </h1>
            <p className="font-serif italic text-[1.1rem] sm:text-[1.2rem] text-foreground/68 leading-[1.4] max-w-[34ch] md:mx-auto">
              A kept record of your pregnancy — your words, your images, your becoming.
            </p>
            {(heldCount > 0 || photoCount > 0) && (
              <p className="font-serif italic text-[12.5px] sm:text-[13px] text-foreground/48 mt-7 max-w-[40ch] md:mx-auto tracking-wide">
                {heldCount > 0 && `${heldCount} reflection${heldCount === 1 ? "" : "s"} held`}
                {heldCount > 0 && photoCount > 0 && " · "}
                {photoCount > 0 && `${photoCount} photo${photoCount === 1 ? "" : "s"} kept`}
              </p>
            )}
          </div>
        </section>

        {/* Continuous vertical week spine — no trimester groupings */}
        <section className="relative pb-20 sm:pb-24 md:pb-32">
          {/* Spine line */}
          <div
            aria-hidden="true"
            className="absolute left-[14px] sm:left-[18px] md:left-[20px] top-2 bottom-2 w-px"
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
                    className={`absolute left-[10px] sm:left-[14px] md:left-[16px] top-[24px] rounded-full transition-all ${
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
                      className="block ml-12 sm:ml-14 md:ml-16 my-4 rounded-[28px] overflow-hidden keepsake-surface transition-all duration-500 hover:shadow-[0_36px_80px_-32px_hsl(var(--stage-pregnancy-accent)/0.32),0_8px_24px_-12px_hsl(222_14%_12%/0.1)]"
                      style={{
                        border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.22)",
                      }}
                    >
                      {photo && (
                        <div className="relative">
                          <img
                            src={photo.signedUrl}
                            alt={`Week ${w} — ${identity.chapterTitle}`}
                            className="w-full max-h-[320px] object-cover"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background:
                                "linear-gradient(to bottom, transparent 60%, hsl(var(--card) / 0.5) 100%)",
                            }}
                          />
                        </div>
                      )}
                      <div className="px-6 sm:px-8 py-6 sm:py-7">
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h3 className="font-serif font-medium text-foreground leading-[1] flex items-baseline gap-3">
                            <span className="text-[1.7rem] sm:text-[1.95rem]">Week {w}</span>
                          </h3>
                          <span
                            className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
                            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                          >
                            This week
                          </span>
                        </div>
                        <p
                          className="font-serif italic text-[1.05rem] sm:text-[1.15rem] text-foreground/72 leading-[1.4] mb-2"
                        >
                          {identity.chapterTitle}
                        </p>
                        <p className="font-serif italic text-[15px] sm:text-[15.5px] text-foreground/55 leading-[1.5] mb-5">
                          {identity.theme}
                        </p>
                        {reflection && (
                          <p
                            className="font-serif italic text-[15px] text-foreground/72 leading-[1.75] border-l-2 pl-5 mb-5"
                            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
                          >
                            "{reflection.content.length > 140
                              ? reflection.content.slice(0, 140).trimEnd() + "…"
                              : reflection.content}"
                          </p>
                        )}
                        <span className="inline-flex items-center font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/65">
                          Open this week →
                        </span>
                      </div>
                    </a>
                  ) : isPast ? (
                    <a
                      href="/my-week"
                      className={`block ml-12 sm:ml-14 md:ml-16 py-5 sm:py-6 pr-2 group transition-opacity ${
                        reflection || photo ? "opacity-100" : "opacity-92"
                      }`}
                    >
                      <div className="flex gap-5">
                        {photo ? (
                          <div className="held-image rounded-[14px] overflow-hidden shrink-0">
                            <img
                              src={photo.signedUrl}
                              alt={`Week ${w}`}
                              className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-[14px] shrink-0 flex items-center justify-center"
                            style={{
                              border: "1px dashed hsl(var(--stage-pregnancy-accent) / 0.24)",
                              background:
                                "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.22) 100%)",
                            }}
                          >
                            <Camera
                              size={14}
                              strokeWidth={1.4}
                              className="text-foreground/30"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-4 mb-1.5">
                            <div className="flex items-baseline gap-3 min-w-0">
                              <span className="font-serif font-medium text-[1.05rem] sm:text-[1.12rem] text-foreground/85 group-hover:text-foreground transition-colors shrink-0">
                                Week {w}
                              </span>
                              <span className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/60 truncate">
                                {identity.chapterTitle}
                              </span>
                            </div>
                            <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/35 shrink-0">
                              {reflection ? "Held" : photo ? "Kept" : "Earlier"}
                            </span>
                          </div>
                          <p className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/55 leading-[1.5]">
                            {identity.theme}
                          </p>
                          {reflection && (
                            <p
                              className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/62 leading-[1.75] mt-2.5 border-l-[1.5px] pl-4"
                              style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.42)" }}
                            >
                              "{reflection.content.length > 110
                                ? reflection.content.slice(0, 110).trimEnd() + "…"
                                : reflection.content}"
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="ml-12 sm:ml-14 md:ml-16 py-5 sm:py-6 opacity-50">
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
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default MyJourney;
