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
    <div className="min-h-screen bg-parchment">
      <MyWeekHeader />
      <main className="mx-auto w-full max-w-[640px] md:max-w-[700px] px-5 sm:px-8 md:px-12">
        {/* Hero — quiet, no metricisation */}
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
              {firstName}'s journey
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
              The quiet record of your pregnancy — held week by week, in your own words and images.
            </p>
            {(heldCount > 0 || photoCount > 0) && (
              <p className="font-sans text-[11.5px] font-light italic text-foreground/45 mt-5 max-w-[40ch] md:mx-auto">
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
                      className="block ml-10 sm:ml-12 md:ml-14 my-3 rounded-2xl border overflow-hidden transition-all hover:shadow-[0_10px_36px_-14px_hsl(var(--stage-pregnancy-accent)/0.3)]"
                      style={{
                        borderColor: "hsl(var(--stage-pregnancy-accent) / 0.32)",
                        background:
                          "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.24) 100%)",
                        boxShadow:
                          "0 6px 30px -14px hsl(var(--stage-pregnancy-accent) / 0.22)",
                      }}
                    >
                      {photo && (
                        <img
                          src={photo.signedUrl}
                          alt={`Week ${w} — ${identity.chapterTitle}`}
                          className="w-full max-h-[280px] object-cover"
                        />
                      )}
                      <div className="px-5 sm:px-6 py-5 sm:py-6">
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <p
                            className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase"
                            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                          >
                            This week · Chapter {w}
                          </p>
                          <span className="font-serif text-[1.1rem] text-foreground/85">
                            Week {w}
                          </span>
                        </div>
                        <h3 className="font-serif font-medium text-[1.4rem] sm:text-[1.55rem] text-foreground leading-tight mb-2">
                          {identity.chapterTitle}
                        </h3>
                        <p className="font-serif italic text-[1rem] sm:text-[1.05rem] text-foreground/68 leading-snug mb-4">
                          {identity.theme}
                        </p>
                        {reflection && (
                          <p
                            className="font-serif italic text-[14.5px] text-foreground/72 leading-relaxed border-l-2 pl-4 mb-4"
                            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.42)" }}
                          >
                            "{reflection.content.length > 140
                              ? reflection.content.slice(0, 140).trimEnd() + "…"
                              : reflection.content}"
                          </p>
                        )}
                        <span className="inline-flex items-center font-sans text-[12px] font-light tracking-[0.16em] uppercase text-foreground/65">
                          Open this week →
                        </span>
                      </div>
                    </a>
                  ) : isPast ? (
                    <a
                      href="/my-week"
                      className={`block ml-10 sm:ml-12 md:ml-14 py-4 sm:py-5 pr-2 group transition-opacity hover:opacity-100 ${
                        reflection || photo ? "opacity-100" : "opacity-90"
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Photo thumbnail or chapter mark */}
                        {photo ? (
                          <img
                            src={photo.signedUrl}
                            alt={`Week ${w}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border"
                            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
                          />
                        ) : (
                          <div
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0 flex items-center justify-center border border-dashed"
                            style={{
                              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.22)",
                              background: "hsl(var(--stage-pregnancy) / 0.18)",
                            }}
                          >
                            <Camera
                              size={14}
                              strokeWidth={1.4}
                              className="text-foreground/25"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-4 mb-1">
                            <span className="font-serif text-[1rem] sm:text-[1.1rem] text-foreground/85 group-hover:text-foreground transition-colors">
                              Week {w} · {identity.chapterTitle}
                            </span>
                            <span className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase text-foreground/35 shrink-0">
                              {reflection ? "Held" : photo ? "Kept" : "Past"}
                            </span>
                          </div>
                          <p className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/55 leading-snug">
                            {identity.theme}
                          </p>
                          {reflection && (
                            <p
                              className="font-serif italic text-[13px] sm:text-[13.5px] text-foreground/62 leading-relaxed mt-2 border-l-[1.5px] pl-3"
                              style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.38)" }}
                            >
                              "{reflection.content.length > 100
                                ? reflection.content.slice(0, 100).trimEnd() + "…"
                                : reflection.content}"
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="ml-10 sm:ml-12 md:ml-14 py-4 sm:py-5 opacity-45">
                      <div className="flex items-baseline justify-between gap-4 mb-1">
                        <span className="font-serif text-[1rem] sm:text-[1.05rem] text-foreground/75">
                          Week {w} · {identity.chapterTitle}
                        </span>
                        <span className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase text-foreground/30">
                          Ahead
                        </span>
                      </div>
                      <p className="font-serif italic text-[13.5px] sm:text-[14px] text-foreground/45 leading-snug">
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
