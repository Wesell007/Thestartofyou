import { useEffect, useMemo, useRef, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { canEnterFirstYearSetup } from "@/lib/firstYearJourney";
import {
  FIRST_YEAR_SETUP_QUIET_LINK_LABEL,
  FIRST_YEAR_SETUP_ROUTE,
} from "@/components/firstyear/setup/firstYearSetupConstants";
import { useNavigate, Link } from "react-router-dom";
import { differenceInDays, format } from "date-fns";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney, type PregnancyJourneyStatus } from "@/lib/savedJourney";
import {
  STATUS_CHIP_LABEL,
  JOURNEY_SUPPORT_HREF,
  JOURNEY_SUPPORT_LINK_LABEL,
} from "@/lib/journeyStatusCopy";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import JourneyHero from "@/components/myjourney/JourneyHero";
import TrimesterRail from "@/components/myjourney/TrimesterRail";
import CurrentChapterCard from "@/components/myjourney/CurrentChapterCard";
import MomentsKeptSummary from "@/components/myjourney/MomentsKeptSummary";
import TrimesterTimeline from "@/components/myjourney/TrimesterTimeline";
import KeptWeekRow from "@/components/myjourney/KeptWeekRow";
import PhotoJournal from "@/components/myjourney/PhotoJournal";
import ReflectionHighlights from "@/components/myjourney/ReflectionHighlights";
import ToolkitEntryPanel from "@/components/myjourney/ToolkitEntryPanel";
import LookingAheadCard from "@/components/myjourney/LookingAheadCard";
import PageLoadState from "@/components/shared/PageLoadState";
import { useBabyIllustrationStyle } from "@/hooks/useBabyIllustrationStyle";
import { normaliseRealismTone, type RealismTone } from "@/lib/myWeekRealismIllustrations";
import type { VideoItem, VoiceItem } from "@/components/myjourney/PhotoJournal";
import MemoryFilmEntry from "@/components/myjourney/MemoryFilmEntry";
import MemoryFilmBuilder from "@/components/myjourney/MemoryFilmBuilder";
import type { WeekMemory } from "@/lib/memoryFilm";

type ReflectionRow = {
  week: number;
  content: string;
  first_written_at: string | null;
};

type PhotoRow = { week: number; storage_path: string; caption: string | null };
type MediaRow = {
  week: number;
  media_type: string;
  storage_path: string;
  caption: string | null;
  mime_type: string;
  duration_seconds: number | null;
};

type State = {
  firstName: string;
  currentWeek: number;
  due: Date;
  startedAt: Date | null;
  status: PregnancyJourneyStatus;
  reflectionsByWeek: Record<number, ReflectionRow>;
  photoWeeks: Set<number>;
  videoWeeks: Set<number>;
  voiceWeeks: Set<number>;
  photoUrls: { week: number; url: string; caption: string | null }[];
  videos: VideoItem[];
  voiceNotes: VoiceItem[];
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

const MyJourney = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [filmOpen, setFilmOpen] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (viewedRef.current || !state) return;
    viewedRef.current = true;
    trackEvent(EVENTS.MY_JOURNEY_VIEWED);
  }, [state]);

  useEffect(() => {
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
          { data: refls, error: reflectionError },
          { data: photos, error: photoError },
          { data: mediaRows, error: mediaError },
        ] = await Promise.all([
          supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
          getActivePregnancyJourney(user.id, { throwOnError: true }),
          supabase
            .from("reflections")
            .select("week, content, first_written_at")
            .eq("user_id", user.id),
          supabase.from("week_photos").select("week, storage_path, caption").eq("user_id", user.id),
          supabase
            .from("week_media_memories")
            .select("week, media_type, storage_path, caption, mime_type, duration_seconds")
            .eq("user_id", user.id),
        ]);
        if (profileError) throw profileError;
        if (reflectionError) throw reflectionError;
        if (photoError) throw photoError;
        if (mediaError) throw mediaError;
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

        const photoRows: PhotoRow[] = (photos ?? []).filter((p): p is PhotoRow => !!p.storage_path);
        const photoWeeks = new Set<number>(photoRows.map((p) => p.week));

        const mediaOfType = (type: string): MediaRow[] =>
          (mediaRows ?? []).filter(
            (m): m is MediaRow => !!m.storage_path && m.media_type === type,
          );
        const videoRows = mediaOfType("video");
        const voiceRows = mediaOfType("voice_note");
        const videoWeeks = new Set<number>(videoRows.map((v) => v.week));
        const voiceWeeks = new Set<number>(voiceRows.map((v) => v.week));

        const allPaths = [
          ...photoRows.map((p) => p.storage_path),
          ...videoRows.map((v) => v.storage_path),
          ...voiceRows.map((v) => v.storage_path),
        ];
        const signedByPath = new Map<string, string>();
        if (allPaths.length > 0) {
          const { data: signed } = await supabase.storage
            .from("weekly-photos")
            .createSignedUrls(allPaths, 60 * 60);
          (signed ?? []).forEach((s) => {
            if (s.path && s.signedUrl) signedByPath.set(s.path, s.signedUrl);
          });
        }

        const photoUrls = photoRows
          .map((p) => ({ week: p.week, url: signedByPath.get(p.storage_path) ?? "", caption: p.caption }))
          .filter((p) => p.url.length > 0)
          .sort((a, b) => b.week - a.week);

        const videos: VideoItem[] = videoRows
          .map((v) => ({
            week: v.week,
            url: signedByPath.get(v.storage_path) ?? "",
            caption: v.caption,
            mimeType: v.mime_type,
            durationSeconds: v.duration_seconds,
          }))
          .filter((v) => v.url.length > 0)
          .sort((a, b) => b.week - a.week);

        const voiceNotes: VoiceItem[] = voiceRows
          .map((v) => ({
            week: v.week,
            url: signedByPath.get(v.storage_path) ?? "",
            caption: v.caption,
            mimeType: v.mime_type,
            durationSeconds: v.duration_seconds,
          }))
          .filter((v) => v.url.length > 0)
          .sort((a, b) => b.week - a.week);

        setState({
          firstName: profile.first_name,
          currentWeek: computeWeek(journey.lmp),
          due: journey.due,
          startedAt: journey.startedAt,
          status: journey.status,
          reflectionsByWeek,
          photoWeeks,
          videoWeeks,
          voiceWeeks,
          photoUrls,
          videos,
          voiceNotes,
        });
      } catch {
        if (!cancelled) setLoadError("We couldn't load your saved journey just now. Nothing has been removed.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt]);

  // Signed media URLs are minted for 60 minutes at load. Re-run the load a
  // little before expiry so a long-open journey tab keeps working, matching
  // the behaviour already in KeptChapter.
  const hasMedia =
    (state?.photoUrls.length ?? 0) +
      (state?.videos.length ?? 0) +
      (state?.voiceNotes.length ?? 0) >
    0;
  useEffect(() => {
    if (!hasMedia) return;
    const timer = window.setTimeout(() => setAttempt((n) => n + 1), 50 * 60 * 1000);
    return () => window.clearTimeout(timer);
  }, [hasMedia, attempt]);

  const derived = useMemo(() => {
    if (!state) return null;
    const { currentWeek, reflectionsByWeek, photoWeeks, videoWeeks, voiceWeeks } = state;

    const keptWeeks: number[] = [];
    for (let w = 1; w <= currentWeek; w++) {
      const hasContent =
        !!reflectionsByWeek[w] || photoWeeks.has(w) || videoWeeks.has(w) || voiceWeeks.has(w);
      if (hasContent) keptWeeks.push(w);
    }

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

    const { photoUrls, videos, voiceNotes } = state;
    const filmWeeks: WeekMemory[] = keptWeeks.map((w) => ({
      week: w,
      reflection: reflectionsByWeek[w]?.content ?? null,
      photo: (() => {
        const p = photoUrls.find((item) => item.week === w);
        return p ? { url: p.url, caption: p.caption } : null;
      })(),
      video: (() => {
        const v = videos.find((item) => item.week === w);
        return v
          ? {
              url: v.url,
              caption: v.caption ?? null,
              mimeType: v.mimeType ?? null,
              durationSeconds: v.durationSeconds ?? null,
            }
          : null;
      })(),
      voice: (() => {
        const v = voiceNotes.find((item) => item.week === w);
        return v
          ? {
              url: v.url,
              caption: v.caption ?? null,
              mimeType: v.mimeType ?? null,
              durationSeconds: v.durationSeconds ?? null,
            }
          : null;
      })(),
    }));

    return { keptWeeks, reflectionWeeks, filmWeeks };
  }, [state]);

  const { style: illustrationStyle } = useBabyIllustrationStyle();
  const tone: RealismTone = normaliseRealismTone(illustrationStyle);

  if (loadError) return <PageLoadState error={loadError} onRetry={() => setAttempt((n) => n + 1)} />;
  if (!state || !derived) return <PageLoadState />;

  const {
    firstName,
    currentWeek,
    due,
    status,
    reflectionsByWeek,
    photoWeeks,
    videoWeeks,
    voiceWeeks,
    photoUrls,
    videos,
    voiceNotes,
  } = state;
  const { keptWeeks, reflectionWeeks, filmWeeks } = derived;

  const accent = "hsl(var(--stage-pregnancy-accent))";
  const isActive = status === "active";
  // Sensitive statuses keep saved memories behind a reveal control so nothing
  // difficult appears unprompted. Active and given-birth journeys show normally.
  const isLoss =
    status === "pregnancy_loss" || status === "paused" || status === "no_longer_pregnant";

  const renderRow = (w: number) => (
    <KeptWeekRow
      key={w}
      week={w}
      reflection={reflectionsByWeek[w]?.content}
      hasPhoto={photoWeeks.has(w)}
      hasVideo={videoWeeks.has(w)}
      hasVoiceNote={voiceWeeks.has(w)}
      tone={tone}
      isCurrentWeek={w === currentWeek}
    />
  );

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="My journey | The Start of You"
        description="Your saved pregnancy journey."
        canonical="https://thestartofyou.com/my-journey"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        <JourneyHero firstName={firstName} currentWeek={currentWeek} due={due} variant={status} />

        {!isActive && (
          <section
            className="rounded-[18px] keepsake-surface px-5 py-4 mb-8 flex flex-wrap items-center gap-3"
            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.2)" }}
          >
            <span
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
              style={{ color: accent }}
            >
              {STATUS_CHIP_LABEL[status]}
            </span>
            {status === "given_birth" && (
              <Link
                to={
                  canEnterFirstYearSetup(status)
                    ? FIRST_YEAR_SETUP_ROUTE
                    : "/first-year"
                }
                className="ml-auto text-sm text-foreground/75 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
              >
                {canEnterFirstYearSetup(status)
                  ? FIRST_YEAR_SETUP_QUIET_LINK_LABEL
                  : "Open First Year"}
              </Link>
            )}
            {status === "pregnancy_loss" && (
              <Link
                to={JOURNEY_SUPPORT_HREF}
                className="ml-auto text-sm text-foreground/75 underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
              >
                {JOURNEY_SUPPORT_LINK_LABEL}
              </Link>
            )}
            <Link
              to="/account-settings"
              className={`text-sm text-foreground/75 underline underline-offset-4 decoration-foreground/25 hover:text-foreground ${status === "given_birth" || status === "pregnancy_loss" ? "" : "ml-auto"}`}
            >
              Manage in Account Settings
            </Link>
          </section>
        )}

        {isActive && (
          <>
            <TrimesterRail currentWeek={currentWeek} />
            <CurrentChapterCard currentWeek={currentWeek} tone={tone} />
          </>
        )}

        <MomentsKeptSummary
          reflections={reflectionWeeks.length}
          photos={photoWeeks.size}
          videos={videoWeeks.size}
          voiceNotes={voiceWeeks.size}
          weeksKept={keptWeeks.length}
        />

        {isActive && (
          <>
            <MemoryFilmEntry
              keptWeeksCount={keptWeeks.length}
              hasMedia={photoUrls.length + videos.length + voiceNotes.length > 0}
              onOpen={() => setFilmOpen(true)}
            />
            <MemoryFilmBuilder
              open={filmOpen}
              onClose={() => setFilmOpen(false)}
              firstName={firstName}
              currentWeek={currentWeek}
              dueLabel={format(due, "d MMMM yyyy")}
              weeks={filmWeeks}
            />
          </>
        )}


        <JourneyKeptRegion
          isLoss={isLoss}
          hasKept={keptWeeks.length > 0}
          accent={accent}
          keptWeeks={keptWeeks}
          reflectionWeeks={reflectionWeeks}
          reflectionsByWeek={reflectionsByWeek}
          photoUrls={photoUrls}
          videos={videos}
          voiceNotes={voiceNotes}
          currentWeek={currentWeek}
          renderRow={renderRow}
        />

        <ToolkitEntryPanel status={status} />

        {isActive && (
          <LookingAheadCard currentWeek={currentWeek} keptCount={keptWeeks.length} />
        )}
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

/**
 * Kept content region: for pregnancy_loss the whole region is hidden
 * behind a local reveal toggle. For every other status the kept content
 * shows as before.
 */
const JourneyKeptRegion = ({
  isLoss,
  hasKept,
  accent,
  keptWeeks,
  reflectionWeeks,
  reflectionsByWeek,
  photoUrls,
  videos,
  voiceNotes,
  currentWeek,
  renderRow,
}: {
  isLoss: boolean;
  hasKept: boolean;
  accent: string;
  keptWeeks: number[];
  reflectionWeeks: number[];
  reflectionsByWeek: Record<number, ReflectionRow>;
  photoUrls: { week: number; url: string; caption: string | null }[];
  videos: VideoItem[];
  voiceNotes: VoiceItem[];
  currentWeek: number;
  renderRow: (w: number) => JSX.Element;
}) => {
  const [revealed, setRevealed] = useState(false);

  if (isLoss && !revealed) {
    return (
      <section
        className="rounded-[20px] px-6 sm:px-7 py-7 sm:py-8 mb-12 keepsake-surface"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
      >
        <p
          className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
          style={{ color: accent }}
        >
          Kept for you
        </p>
        <p className="font-serif text-foreground/80 text-[15.5px] leading-[1.65] max-w-[46ch] mb-5">
          Your saved weeks, reflections, photos, videos and voice notes are here whenever you want
          them.
        </p>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
        >
          Show what I've kept
        </button>
      </section>
    );
  }

  return (
    <>
      {hasKept ? (
        <TrimesterTimeline keptWeeks={keptWeeks} renderRow={renderRow} />
      ) : (
        <section
          className="rounded-[20px] px-6 sm:px-7 py-7 sm:py-8 mb-12 keepsake-surface"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
        >
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: accent }}
          >
            Your timeline
          </p>
          <p className="font-serif text-foreground/80 text-[15.5px] leading-[1.65] max-w-[46ch]">
            Your journey has just begun. The weeks and reflections you keep will gather here over time.
          </p>
        </section>
      )}
      <PhotoJournal
        photos={photoUrls}
        videos={videos}
        voiceNotes={voiceNotes}
        currentWeek={currentWeek}
      />
      <ReflectionHighlights weeks={reflectionWeeks} reflectionByWeek={reflectionsByWeek} />
    </>
  );
};

export default MyJourney;
