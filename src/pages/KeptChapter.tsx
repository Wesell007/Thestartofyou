import { useEffect, useMemo, useRef, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import NotFound from "@/pages/NotFound";
import {
  resolveRealismForWeek,
  defaultRealismAltForWeek,
  normaliseRealismTone,
  type RealismTone,
} from "@/lib/myWeekRealismIllustrations";

/**
 * /my-week/:week — KEPT CHAPTER (preserved page).
 *
 * A calm, singular, retrospective view of one finished pregnancy week.
 * Deliberately distinct from /my-week (live, present-tense, guidance-first)
 * and /my-journey (broad, cumulative spine).
 *
 * No editing affordances on this pass. No live prompts, no input,
 * no dashboard furniture. The page is shaped for revisiting.
 */

type ReflectionLite = { week: number; content: string; updated_at: string };

type VideoLite = {
  url: string;
  caption: string | null;
  mimeType: string | null;
};

type Loaded = {
  currentWeek: number;
  reflection: ReflectionLite | null;
  photoUrl: string | null;
  photoCaption: string | null;
  video: VideoLite | null;
  tone: RealismTone;
  // All weeks (past, ≠ current) that have *any* kept content.
  // Used to find adjacent kept chapters for chapter-style navigation.
  keptWeeks: number[];
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const trimesterLabelFor = (week: number) => {
  if (week <= 12) return "First trimester";
  if (week <= 27) return "Second trimester";
  if (week <= 40) return "Third trimester";
  return "Past your due date";
};

const KeptChapter = () => {
  const { week: weekParam } = useParams();
  const navigate = useNavigate();
  const week = Number(weekParam);
  const [data, setData] = useState<Loaded | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const lastFiredWeekRef = useRef<number | null>(null);

  const validWeek = Number.isFinite(week) && week >= 1 && week <= MAX_PREGNANCY_WEEK;

  useEffect(() => {
    if (!data || !validWeek) return;
    if (lastFiredWeekRef.current === week) return;
    lastFiredWeekRef.current = week;
    trackEvent(EVENTS.KEPT_CHAPTER_VIEWED);
  }, [data, week, validWeek]);

  useEffect(() => {
    if (!validWeek) return;
    let cancelled = false;
    (async () => {
      setLoadError(null);
      try {
      const { data: sess, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }
      const [
        { data: profile, error: profileError },
        journey,
        { data: refl, error: reflectionError },
        { data: photo, error: photoError },
        { data: videoRow, error: videoError },
        { data: allRefls, error: allReflectionError },
        { data: allPhotos, error: allPhotoError },
        { data: allVideos, error: allVideoError },
      ] = await Promise.all([
          supabase
            .from("profiles")
            .select("first_name, baby_illustration_style")
            .eq("user_id", user.id)
            .maybeSingle(),
          getActivePregnancyJourney(user.id, { throwOnError: true }),
          supabase
            .from("reflections")
            .select("week, content, updated_at")
            .eq("user_id", user.id)
            .eq("week", week)
            .maybeSingle(),
          supabase
            .from("week_photos")
            .select("storage_path, caption")
            .eq("user_id", user.id)
            .eq("week", week)
            .maybeSingle(),
          supabase
            .from("week_media_memories")
            .select("storage_path, caption, mime_type")
            .eq("user_id", user.id)
            .eq("week", week)
            .eq("media_type", "video")
            .maybeSingle(),
          supabase.from("reflections").select("week, content").eq("user_id", user.id),
          supabase.from("week_photos").select("week").eq("user_id", user.id),
          supabase
            .from("week_media_memories")
            .select("week")
            .eq("user_id", user.id)
            .eq("media_type", "video"),
        ]);
      if (
        profileError ||
        reflectionError ||
        photoError ||
        videoError ||
        allReflectionError ||
        allPhotoError ||
        allVideoError
      ) {
        throw (
          profileError ??
          reflectionError ??
          photoError ??
          videoError ??
          allReflectionError ??
          allPhotoError ??
          allVideoError
        );
      }
      if (cancelled) return;
      if (!journey) {
        navigate("/due-date-calculator", { replace: true });
        return;
      }
      if (!profile?.first_name) {
        navigate("/setup", { replace: true });
        return;
      }
      const currentWeek = computeWeek(journey.lmp);

      // Kept chapters are *past* weeks (strictly < currentWeek). The current
      // week belongs to /my-week, not to a kept chapter view.
      if (week >= currentWeek) {
        navigate(week === currentWeek ? "/my-week" : "/my-journey", { replace: true });
        return;
      }

      const tone = normaliseRealismTone(profile?.baby_illustration_style);

      let photoUrl: string | null = null;
      const photoCaption: string | null = photo?.caption ?? null;
      if (photo?.storage_path) {
        const { data: urlData, error: urlError } = await supabase.storage
          .from("weekly-photos")
          .createSignedUrl(photo.storage_path, 60 * 60);
        if (urlError) throw urlError;
        photoUrl = urlData?.signedUrl ?? null;
      }

      let video: VideoLite | null = null;
      if (videoRow?.storage_path) {
        const { data: urlData, error: urlError } = await supabase.storage
          .from("weekly-photos")
          .createSignedUrl(videoRow.storage_path, 60 * 60);
        if (urlError) throw urlError;
        if (urlData?.signedUrl) {
          video = {
            url: urlData.signedUrl,
            caption: videoRow.caption ?? null,
            mimeType: videoRow.mime_type ?? null,
          };
        }
      }

      // Build the set of past weeks with any kept content for adjacent
      // chapter navigation.
      const kept = new Set<number>();
      (allRefls ?? []).forEach((r) => {
        if (r.content && r.content.trim().length > 0 && r.week < currentWeek) {
          kept.add(r.week);
        }
      });
      (allPhotos ?? []).forEach((p) => {
        if (p.week < currentWeek) kept.add(p.week);
      });
      (allVideos ?? []).forEach((v) => {
        if (v.week < currentWeek) kept.add(v.week);
      });
      const keptWeeks = Array.from(kept).sort((a, b) => a - b);

      if (!kept.has(week)) {
        navigate("/my-journey", { replace: true });
        return;
      }

      const reflection: ReflectionLite | null =
        refl && refl.content && refl.content.trim().length > 0
          ? { week: refl.week, content: refl.content, updated_at: refl.updated_at }
          : null;

      setData({
        currentWeek,
        reflection,
        photoUrl,
        photoCaption,
        video,
        tone,
        keptWeeks,
      });
      } catch {
        if (!cancelled) setLoadError("We couldn't open this kept chapter just now. Your memories are still saved.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [week, validWeek, navigate, attempt]);

  useEffect(() => {
    if (!data?.photoUrl) return;
    const timer = window.setTimeout(() => setAttempt((n) => n + 1), 50 * 60 * 1000);
    return () => window.clearTimeout(timer);
  }, [data?.photoUrl]);

  const content = useMemo(() => (validWeek ? getMyWeekContent(week) : null), [week, validWeek]);
  const identity = useMemo(() => (validWeek ? getWeekIdentity(week) : null), [week, validWeek]);

  if (!validWeek) return <NotFound />;
  if (loadError) return <PageLoadState error={loadError} onRetry={() => setAttempt((n) => n + 1)} />;
  if (!data || !content || !identity) {
    return <PageLoadState />;
  }

  const { reflection, photoUrl, photoCaption, video, tone, keptWeeks } = data;
  const realism = resolveRealismForWeek(week, tone);
  const realismAlt = defaultRealismAltForWeek(week);
  const trimester = trimesterLabelFor(week);

  // Adjacent KEPT chapters (not just adjacent week numbers). Calmer browsing.
  const prevKept = [...keptWeeks].reverse().find((w) => w < week) ?? null;
  const nextKept = keptWeeks.find((w) => w > week) ?? null;

  const accent = "hsl(var(--stage-pregnancy-accent))";
  const accentSoft = (a: number) => `hsl(var(--stage-pregnancy-accent) / ${a})`;
  const tint = (a: number) => `hsl(var(--stage-pregnancy) / ${a})`;

  // ── Chapter summary: a quiet one- to two-sentence opening shaped from the
  // week's identity. We deliberately do not generate florid copy; we use the
  // hand-written `theme` and `babyNote` already curated per week.
  const summarySentences = [identity.babyNote].filter(Boolean);

  // ── "What mattered this week" — preserved, retrospective version.
  // Uses the existing `lead` + the first matters bullet as the central
  // developmental theme, and the curated `focus` as the single explanatory
  // block. No checklists, no widgets, no live prompts.
  const centralMatter = content.matters?.[0] ?? null;

  const reflectionSavedAt = reflection?.updated_at ? new Date(reflection.updated_at) : null;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative overflow-x-hidden">
      <SeoHead
        title="My week | The Start of You"
        description="A kept chapter from your pregnancy journey."
        canonical="https://thestartofyou.com/my-week"
        noindex
      />
      {/* Atmospheric wash — kept chapters live in a slightly deeper, settled tone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, hsl(var(--stage-pregnancy) / 0.45), transparent 75%)",
        }}
      />
      <MyWeekHeader />

      <main className="relative mx-auto w-full max-w-[680px] px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 lg:pt-20 pb-20">
        {/* 1. Top return link — orientation back to the spine */}
        <div className="mb-8 sm:mb-10">
          <Link
            to="/my-journey"
            className="group inline-flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/55 hover:text-foreground/85 transition-colors"
          >
            <ArrowLeft size={12} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
            Back to My Journey
          </Link>
        </div>

        {/* 2. Chapter header */}
        <header className="mb-10 sm:mb-12">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase mb-4"
            style={{ color: accent }}
          >
            Kept chapter
          </p>
          <h1
            className="font-serif font-medium text-foreground leading-[0.98] tracking-tight mb-3 sm:mb-4"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)" }}
          >
            Week {week}
          </h1>
          <p className="font-serif text-[1.25rem] sm:text-[1.4rem] text-foreground/80 leading-[1.25] mb-3">
            {identity.chapterTitle}
          </p>
          <p className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/55 leading-[1.55]">
            {trimester} · {identity.theme}
          </p>

          {/* Oval fetal image — same system as /my-week and /my-journey */}
          <div className="mt-8 sm:mt-9 flex justify-center">
            <div
              className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 78%)",
                border: `1px solid ${accentSoft(0.22)}`,
              }}
            >
              <img
                src={realism.src}
                alt={realismAlt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />

            </div>
          </div>

          {/* Adjacent kept-chapter quiet links, immediately under the header */}
          {(prevKept || nextKept) && (
            <div className="mt-9 flex items-center justify-between gap-4 text-[10.5px] font-medium tracking-[0.24em] uppercase">
              {prevKept ? (
                <Link
                  to={`/my-week/${prevKept}`}
                  className="group inline-flex items-center gap-2 text-foreground/55 hover:text-foreground/85 transition-colors"
                >
                  <ArrowLeft size={11} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
                  Week {prevKept}
                </Link>
              ) : (
                <span />
              )}
              {nextKept ? (
                <Link
                  to={`/my-week/${nextKept}`}
                  className="group inline-flex items-center gap-2 text-foreground/55 hover:text-foreground/85 transition-colors"
                >
                  Week {nextKept}
                  <ArrowRight size={11} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </header>

        {/* 3. Chapter summary */}
        <section className="mb-12 sm:mb-14">
          <p className="font-serif text-[1.05rem] sm:text-[1.15rem] text-foreground/75 leading-[1.65]">
            {content.lead}
          </p>
          {summarySentences.length > 0 && (
            <p className="font-serif italic text-foreground/55 text-[15px] leading-[1.65] mt-3">
              {summarySentences.join(" ")}
            </p>
          )}
        </section>

        {/* DESKTOP order: 4. What mattered → 5. Your reflection → 6. A moment kept
            MOBILE order:  5. Your reflection → 4. What mattered → 6. A moment kept
            Achieved with flex order utilities. */}
        <div className="flex flex-col gap-12 sm:gap-14">
          {/* 4. What mattered this week */}
          <section className="order-2 md:order-1">
            <h2
              className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-5"
              style={{ color: accent }}
            >
              What mattered this week
            </h2>
            {centralMatter && (
              <div className="mb-7">
                <h3 className="font-serif font-medium text-foreground text-[1.25rem] sm:text-[1.35rem] leading-[1.25] mb-2.5">
                  {centralMatter.title}
                </h3>
                <p className="font-serif text-foreground/72 text-[15.5px] leading-[1.7]">
                  {centralMatter.body}
                </p>
              </div>
            )}
            <div
              className="rounded-[20px] keepsake-surface px-6 sm:px-7 py-6 sm:py-7"
              style={{ borderColor: accentSoft(0.16) }}
            >
              <p
                className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
                style={{ color: accent }}
              >
                The focus you were holding
              </p>
              <p className="font-serif font-medium text-foreground text-[1.1rem] sm:text-[1.15rem] leading-[1.35] mb-2.5">
                {content.focus.headline}
              </p>
              <p className="font-serif italic text-foreground/65 text-[14.5px] leading-[1.65]">
                {content.focus.body}
              </p>
            </div>
          </section>

          {/* 5. Your reflection */}
          <section className="order-1 md:order-2">
            <h2
              className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-5"
              style={{ color: accent }}
            >
              Your reflection
            </h2>
            {reflection ? (
              <div
                className="rounded-[20px] px-6 sm:px-8 py-7 sm:py-8 relative"
                style={{
                  background: tint(0.16),
                  border: `1px solid ${accentSoft(0.18)}`,
                }}
              >
                <p className="font-serif italic text-foreground/85 text-[16.5px] sm:text-[17px] leading-[1.85] whitespace-pre-wrap">
                  {reflection.content}
                </p>
                {reflectionSavedAt && (
                  <p className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/45 mt-5">
                    Kept · {formatDate(reflectionSavedAt)}
                  </p>
                )}
              </div>
            ) : (
              <p className="font-serif italic text-foreground/55 text-[15.5px] leading-[1.7] pl-4 border-l"
                 style={{ borderColor: accentSoft(0.32) }}>
                No written reflection was kept for this week.
              </p>
            )}
          </section>

          {/* 6. A moment kept — photo, video, or both */}
          {(photoUrl || video) && (
            <section className="order-3 space-y-5">
              <h2
                className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-1"
                style={{ color: accent }}
              >
                A moment kept
              </h2>
              {photoUrl && (
                <figure
                  className="rounded-[24px] overflow-hidden"
                  style={{ border: `1px solid ${accentSoft(0.16)}` }}
                >
                  <img
                    src={photoUrl}
                    alt={`A moment kept from week ${week} — ${identity.chapterTitle}`}
                    className="w-full h-auto max-h-[520px] object-cover block"
                  />
                  {photoCaption && (
                    <figcaption
                      className="px-5 sm:px-6 py-4 font-serif italic text-[14.5px] sm:text-[15px] leading-[1.65] text-foreground/75"
                      style={{
                        borderTop: `1px solid ${accentSoft(0.16)}`,
                        background: tint(0.16),
                      }}
                    >
                      {photoCaption}
                    </figcaption>
                  )}
                </figure>
              )}
              {video && (
                <figure
                  className="rounded-[24px] overflow-hidden"
                  style={{ border: `1px solid ${accentSoft(0.16)}` }}
                >
                  <video
                    src={video.url}
                    controls
                    preload="metadata"
                    playsInline
                    muted
                    className="w-full h-auto max-h-[520px] block bg-black"
                  />
                  {video.caption && (
                    <figcaption
                      className="px-5 sm:px-6 py-4 font-serif italic text-[14.5px] sm:text-[15px] leading-[1.65] text-foreground/75"
                      style={{
                        borderTop: `1px solid ${accentSoft(0.16)}`,
                        background: tint(0.16),
                      }}
                    >
                      {video.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          )}
        </div>


        {/* 7. Chapter context — quiet, no progress UI */}
        <section className="mt-14 sm:mt-16">
          <div
            className="flex items-center gap-4"
            aria-label="Chapter context"
          >
            <span aria-hidden="true" className="block h-px w-8" style={{ background: accentSoft(0.4) }} />
            <p className="font-serif italic text-foreground/55 text-[14px] sm:text-[14.5px] leading-[1.6]">
              Part of your {trimester.toLowerCase()}
              {prevKept && nextKept
                ? ` · between Week ${prevKept} and Week ${nextKept}`
                : prevKept
                ? ` · after Week ${prevKept}`
                : nextKept
                ? ` · before Week ${nextKept}`
                : ""}
            </p>
          </div>
        </section>

        {/* 8. Chapter navigation — editorial, chapter-turning */}
        <nav className="mt-12 sm:mt-14 pt-8 border-t" style={{ borderColor: accentSoft(0.16) }}>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {prevKept ? (
              <Link
                to={`/my-week/${prevKept}`}
                className="group block rounded-[18px] keepsake-surface px-5 py-4 transition-all hover:translate-x-[-2px]"
                style={{ borderColor: accentSoft(0.16) }}
              >
                <span
                  className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 flex items-center gap-1.5 text-foreground/50"
                >
                  <ArrowLeft size={10} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
                  Previous kept chapter
                </span>
                <p className="font-serif font-medium text-[15px] text-foreground/85 leading-tight">
                  Week {prevKept}
                </p>
                <p className="font-serif italic text-[12.5px] text-foreground/55 mt-0.5">
                  {getWeekIdentity(prevKept).chapterTitle}
                </p>
              </Link>
            ) : (
              <div className="hidden sm:block" aria-hidden="true" />
            )}
            {nextKept ? (
              <Link
                to={`/my-week/${nextKept}`}
                className="group block rounded-[18px] keepsake-surface px-5 py-4 transition-all hover:translate-x-[2px] sm:text-right"
                style={{ borderColor: accentSoft(0.16) }}
              >
                <span
                  className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 flex items-center gap-1.5 text-foreground/50 sm:justify-end"
                >
                  Next kept chapter
                  <ArrowRight size={10} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
                </span>
                <p className="font-serif font-medium text-[15px] text-foreground/85 leading-tight">
                  Week {nextKept}
                </p>
                <p className="font-serif italic text-[12.5px] text-foreground/55 mt-0.5">
                  {getWeekIdentity(nextKept).chapterTitle}
                </p>
              </Link>
            ) : (
              <div className="hidden sm:block" aria-hidden="true" />
            )}
          </div>
          <div className="text-center">
            <Link
              to="/my-journey"
              className="group inline-flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/55 hover:text-foreground/85 transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
              Back to My Journey
            </Link>
          </div>
        </nav>
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default KeptChapter;
