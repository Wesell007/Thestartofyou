import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import { ArrowLeft, ChevronDown } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import { FY_QUIET_LINK } from "@/components/firstyear/journey/firstYearStyles";
import { supabase } from "@/integrations/supabase/client";
import { parseDateOnly } from "@/lib/dateOnly";
import { FIRST_YEAR_SETUP_ROUTE } from "@/components/firstyear/setup/firstYearSetupConstants";
import {
  getActiveFirstYearJourney,
  getKeptPregnancyChapter,
  keptChapterNeedsReveal,
  type KeptPregnancyChapter,
} from "@/lib/firstYearJourney";

/**
 * /my-pregnancy-chapter — a read-only place for someone in their First Year
 * to come back to what they saved during pregnancy.
 *
 * Nothing here can be edited, deleted or added to. No tracking, no prompts,
 * no companion. It is a kept chapter, not a dashboard.
 */

type MediaLite = {
  url: string;
  caption: string | null;
  mimeType: string | null;
};

type SavedWeek = {
  week: number;
  dateLabel: string | null;
  reflection: string | null;
  photo: MediaLite | null;
  video: MediaLite | null;
  voice: MediaLite | null;
  kinds: string[];
};

type Loaded = {
  chapter: KeptPregnancyChapter;
  weeks: SavedWeek[];
  needsReveal: boolean;
};

const BUCKET = "weekly-photos";
const SIGNED_URL_SECONDS = 60 * 60;

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const accent = "hsl(var(--stage-postpartum-accent))";

const MyPregnancyChapter = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Loaded | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  // Nothing kept for this person: a gentle state rather than a redirect.
  const [empty, setEmpty] = useState(false);
  const [failedMedia, setFailedMedia] = useState<string[]>([]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const markFailed = useCallback(
    (url: string) => setFailedMedia((prev) => (prev.includes(url) ? prev : [...prev, url])),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadError(null);
      try {
        const { data: auth, error: authError } = await supabase.auth.getUser();
        if (authError || !auth.user) {
          navigate("/auth?intent=return_to_route&return_to=%2Fmy-pregnancy-chapter", {
            replace: true,
          });
          return;
        }
        const userId = auth.user.id;

        const [{ data: pointer, error: pointerError }, { data: profile, error: profileError }] =
          await Promise.all([
            supabase.from("journeys").select("lifecycle").eq("user_id", userId).maybeSingle(),
            supabase.from("profiles").select("first_name").eq("user_id", userId).maybeSingle(),
          ]);
        if (pointerError) throw pointerError;
        if (profileError) throw profileError;
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
          navigate(
            pregnancy?.status === "given_birth" ? FIRST_YEAR_SETUP_ROUTE : "/my-journey",
            { replace: true },
          );
          return;
        }
        if (pointer.lifecycle !== "first_year") {
          navigate("/due-date-calculator", { replace: true });
          return;
        }
        if (!profile?.first_name) {
          navigate("/setup", { replace: true });
          return;
        }

        const journey = await getActiveFirstYearJourney(userId, { throwOnError: true });
        if (cancelled) return;

        const chapter = await getKeptPregnancyChapter(userId, {
          referenceId: journey?.archived_pregnancy_journey_id ?? null,
          throwOnError: true,
        });
        if (cancelled) return;

        if (!chapter) {
          setData(null);
          setLoadError(null);
          setEmpty(true);
          return;
        }

        const [
          { data: reflections, error: reflectionError },
          { data: photos, error: photoError },
          { data: media, error: mediaError },
        ] = await Promise.all([
          supabase.from("reflections").select("week, content").eq("user_id", userId),
          supabase.from("week_photos").select("week, storage_path, caption").eq("user_id", userId),
          supabase
            .from("week_media_memories")
            .select("week, media_type, storage_path, caption, mime_type")
            .eq("user_id", userId),
        ]);
        if (reflectionError) throw reflectionError;
        if (photoError) throw photoError;
        if (mediaError) throw mediaError;
        if (cancelled) return;

        const lmp = chapter.lmp_date ? parseDateOnly(chapter.lmp_date) : null;

        const sign = async (path: string | null | undefined): Promise<string | null> => {
          if (!path) return null;
          const { data: urlData } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(path, SIGNED_URL_SECONDS);
          return urlData?.signedUrl ?? null;
        };

        const byWeek = new Map<number, SavedWeek>();
        const ensure = (week: number): SavedWeek => {
          const existing = byWeek.get(week);
          if (existing) return existing;
          const weekStart = lmp ? addDays(lmp, (week - 1) * 7) : null;
          const created: SavedWeek = {
            week,
            dateLabel: weekStart ? formatDate(weekStart) : null,
            reflection: null,
            photo: null,
            video: null,
            voice: null,
            kinds: [],
          };
          byWeek.set(week, created);
          return created;
        };

        (reflections ?? []).forEach((row) => {
          if (row.content && row.content.trim().length > 0) {
            const entry = ensure(row.week);
            entry.reflection = row.content;
            entry.kinds.push("Reflection");
          }
        });

        for (const row of photos ?? []) {
          if (!row.storage_path) continue;
          const url = await sign(row.storage_path);
          if (!url) continue;
          const entry = ensure(row.week);
          entry.photo = { url, caption: row.caption ?? null, mimeType: null };
          entry.kinds.push("Photo");
        }

        for (const row of media ?? []) {
          if (!row.storage_path) continue;
          const url = await sign(row.storage_path);
          if (!url) continue;
          const entry = ensure(row.week);
          const item: MediaLite = {
            url,
            caption: row.caption ?? null,
            mimeType: row.mime_type ?? null,
          };
          if (row.media_type === "video") {
            entry.video = item;
            entry.kinds.push("Video");
          } else if (row.media_type === "voice_note") {
            entry.voice = item;
            entry.kinds.push("Voice note");
          }
        }

        if (cancelled) return;

        setEmpty(false);
        setData({
          chapter,
          weeks: Array.from(byWeek.values()).sort((a, b) => a.week - b.week),
          needsReveal: keptChapterNeedsReveal(chapter.status),
        });
      } catch {
        if (!cancelled) {
          setLoadError("We couldn't open your pregnancy chapter just now. Everything you saved is still here.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt]);

  // Signed links are short-lived, so refresh the page data before they lapse.
  useEffect(() => {
    if (!data) return;
    const timer = window.setTimeout(() => setAttempt((n) => n + 1), 50 * 60 * 1000);
    return () => window.clearTimeout(timer);
  }, [data]);

  const chapterSpan = useMemo(() => {
    if (!data) return null;
    // The pregnancy itself is the span worth showing, not the moment the
    // chapter was set aside. Fall back gently when dates are incomplete.
    const start =
      (data.chapter.lmp_date ? parseDateOnly(data.chapter.lmp_date) : null) ??
      (data.chapter.started_at ? new Date(data.chapter.started_at) : null);
    const end = data.chapter.ended_at ? new Date(data.chapter.ended_at) : null;
    if (start && end && formatDate(start) !== formatDate(end)) {
      return `${formatDate(start)} to ${formatDate(end)}`;
    }
    if (start) return `From ${formatDate(start)}`;
    return null;
  }, [data]);

  if (loadError) return <PageLoadState error={loadError} onRetry={retry} />;

  if (!data && !empty) {
    return <PageLoadState message="Opening your pregnancy chapter…" />;
  }

  const shell = (children: ReactNode) => (
    <div
      className="min-h-screen bg-parchment-grain page-vignette"
      style={{ backgroundColor: "hsl(var(--stage-firstyear) / 0.35)" }}
    >
      <SeoHead
        title="Your pregnancy chapter | The Start of You"
        description="A quiet place to come back to what you saved during pregnancy."
        canonical="https://thestartofyou.com/my-pregnancy-chapter"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-8">
        <div className="mb-8">
          <Link
            to="/my-first-year"
            className="group inline-flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/55 hover:text-foreground/85 transition-colors"
          >
            <ArrowLeft size={12} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
            Back to your First Year
          </Link>
        </div>
        {children}
      </main>
      <MyWeekFooter contextual="Nothing new is being added here. Your First Year journey continues separately." />
    </div>
  );

  if (empty || !data) {
    return shell(
      <section
        className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-8"
        style={{ borderColor: "hsl(var(--stage-postpartum-accent) / 0.16)" }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: accent }}
        >
          Kept for you
        </p>
        <h1 className="font-serif text-[1.6rem] sm:text-[1.9rem] leading-[1.2] text-foreground/90 mb-3">
          Your pregnancy chapter is kept
        </h1>
        <p className="font-sans text-[14px] leading-[1.75] text-foreground/70 max-w-[52ch]">
          There is nothing saved to open here yet. Anything you kept during pregnancy stays yours, and this is where
          you would find it.
        </p>
      </section>,
    );
  }

  const { chapter, weeks, needsReveal } = data;
  const hidden = needsReveal && !revealed;

  return shell(
    <>
      <section className="mb-8">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: accent }}
        >
          Kept for you
        </p>
        <h1 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.15] text-foreground/90 mb-4">
          Your pregnancy chapter is kept
        </h1>
        <p className="font-sans text-[15px] leading-[1.75] text-foreground/70 max-w-[54ch]">
          You can come back to what you saved here, whenever you want to. Nothing has been removed.
        </p>
        {(chapterSpan || chapter.due_date) && (
          <p className="mt-4 font-serif italic text-[14.5px] text-foreground/55">
            {chapterSpan}
            {chapter.due_date && parseDateOnly(chapter.due_date)
              ? `${chapterSpan ? " · " : ""}Due ${formatDate(parseDateOnly(chapter.due_date) as Date)}`
              : ""}
          </p>
        )}
      </section>

      {hidden ? (
        <section
          className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-8"
          style={{ borderColor: "hsl(var(--stage-postpartum-accent) / 0.16)" }}
        >
          <h2 className="font-serif text-[1.4rem] leading-[1.25] text-foreground/90 mb-3">
            This chapter is here whenever you want it
          </h2>
          <p className="font-sans text-[14px] leading-[1.75] text-foreground/70 max-w-[52ch] mb-6">
            What you saved is kept and hidden until you choose to look.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-4 py-2 font-sans text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
          >
            Show what I saved
          </button>
        </section>
      ) : weeks.length === 0 ? (
        <section
          className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-8"
          style={{ borderColor: "hsl(var(--stage-postpartum-accent) / 0.16)" }}
        >
          <p className="font-sans text-[14px] leading-[1.75] text-foreground/70 max-w-[52ch]">
            You did not save anything week by week during your pregnancy. That is completely fine, and this space
            stays here for you.
          </p>
        </section>
      ) : (
        <section className="space-y-3">
          <h2 className="font-serif text-[1.3rem] text-foreground/85 mb-4">What you saved</h2>
          {weeks.map((entry) => {
            const isOpen = openWeek === entry.week;
            return (
              <article
                key={entry.week}
                className="rounded-[18px] keepsake-surface overflow-hidden"
                style={{ borderColor: "hsl(var(--stage-postpartum-accent) / 0.14)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenWeek(isOpen ? null : entry.week)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                >
                  <span>
                    <span className="block font-serif text-[1.05rem] text-foreground/90">Week {entry.week}</span>
                    <span className="block font-sans text-[12.5px] text-foreground/55 mt-1">
                      {[entry.dateLabel, entry.kinds.join(", ")].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className={`shrink-0 text-foreground/45 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 space-y-5">
                    {entry.reflection && (
                      <p className="font-serif text-[15px] leading-[1.75] text-foreground/80 whitespace-pre-wrap">
                        {entry.reflection}
                      </p>
                    )}

                    {entry.photo &&
                      (failedMedia.includes(entry.photo.url) ? (
                        <p className="font-sans text-[13px] text-foreground/55">
                          This photo is taking a moment to load. It is still saved.
                        </p>
                      ) : (
                        <figure className="space-y-2">
                          <img
                            src={entry.photo.url}
                            alt={entry.photo.caption ?? `A photo you saved in week ${entry.week}`}
                            loading="lazy"
                            onError={() => entry.photo && markFailed(entry.photo.url)}
                            className="w-full rounded-[14px] object-cover"
                          />
                          {entry.photo.caption && (
                            <figcaption className="font-sans text-[13px] text-foreground/60">
                              {entry.photo.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}

                    {entry.video &&
                      (failedMedia.includes(entry.video.url) ? (
                        <p className="font-sans text-[13px] text-foreground/55">
                          This video is taking a moment to load. It is still saved.
                        </p>
                      ) : (
                        <figure className="space-y-2">
                          <video
                            src={entry.video.url}
                            controls
                            playsInline
                            preload="metadata"
                            onError={() => entry.video && markFailed(entry.video.url)}
                            className="w-full rounded-[14px]"
                          />
                          {entry.video.caption && (
                            <figcaption className="font-sans text-[13px] text-foreground/60">
                              {entry.video.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}

                    {entry.voice &&
                      (failedMedia.includes(entry.voice.url) ? (
                        <p className="font-sans text-[13px] text-foreground/55">
                          This voice note is taking a moment to load. It is still saved.
                        </p>
                      ) : (
                        <figure className="space-y-2">
                          <audio
                            src={entry.voice.url}
                            controls
                            preload="metadata"
                            onError={() => entry.voice && markFailed(entry.voice.url)}
                            className="w-full"
                          />
                          {entry.voice.caption && (
                            <figcaption className="font-sans text-[13px] text-foreground/60">
                              {entry.voice.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      <p className="mt-10 font-serif italic text-[15px] leading-[1.7] text-foreground/60 max-w-[52ch]">
        This chapter stays yours. Your First Year journey continues separately.
      </p>
      <div className="mt-8 border-t border-border/50 pt-6">
        <Link to="/my-first-year" className={FY_QUIET_LINK}>
          Back to your First Year journey
        </Link>
      </div>
    </>,
  );
};

export default MyPregnancyChapter;
