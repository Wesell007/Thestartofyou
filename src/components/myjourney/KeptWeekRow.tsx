import { Link } from "react-router-dom";
import { ArrowRight, AudioLines, Video as VideoIcon } from "lucide-react";
import { getWeekIdentity } from "@/data/myWeekContent";
import {
  defaultRealismAltForWeek,
  resolveRealismForWeek,
  type RealismTone,
} from "@/lib/myWeekRealismIllustrations";

interface Props {
  week: number;
  reflection?: string;
  hasPhoto: boolean;
  hasVideo?: boolean;
  hasVoiceNote?: boolean;
  /** Saved illustration preference, normalised. */
  tone?: RealismTone;
  /** True when this row represents the live current week. Visually subordinate. */
  isCurrentWeek?: boolean;
}

const truncate = (s: string, max: number) => {
  if (s.length <= max) return s;
  const slice = s.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
};

const KeptWeekRow = ({
  week,
  reflection,
  hasPhoto,
  hasVideo,
  hasVoiceNote,
  tone = "default",
  isCurrentWeek,
}: Props) => {
  const identity = getWeekIdentity(week);
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const hasReflection = !!reflection && reflection.trim().length > 0;
  const resolved = resolveRealismForWeek(week, tone);

  return (
    <li className={isCurrentWeek ? "opacity-80" : ""}>
      <Link
        to={`/my-week/${week}`}
        className="group flex items-start gap-4 sm:gap-5 rounded-[18px] keepsake-surface px-4 sm:px-5 py-4 sm:py-4 transition-all hover:shadow-[0_18px_42px_-22px_hsl(var(--stage-pregnancy-accent)/0.26)]"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
      >
        <div
          className="shrink-0 w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.45), hsl(var(--card)) 75%)",
            border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.18)",
          }}
        >
          {resolved.src ? (
            <img
              src={resolved.src}
              alt={defaultRealismAltForWeek(week)}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          ) : (
            <span aria-hidden="true" className="w-full h-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <div className="flex items-baseline gap-2.5 min-w-0 flex-wrap">
              <span className="font-serif font-medium text-foreground/90 text-[15px] sm:text-[15.5px] shrink-0">
                Week {week}
              </span>
              <span className="font-serif italic text-foreground/60 text-[13.5px] sm:text-[14px] truncate">
                {identity.chapterTitle}
              </span>
              {isCurrentWeek && (
                <span
                  className="font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase text-foreground/50 shrink-0"
                  aria-label="This is your current week"
                >
                  · This week
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {hasVideo && (
                <span
                  className="inline-flex items-center gap-1 font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: accent }}
                  aria-label="Video kept for this week"
                >
                  <VideoIcon size={11} strokeWidth={1.8} aria-hidden="true" />
                  Video
                </span>
              )}
              {hasVoiceNote && (
                <span
                  className="inline-flex items-center gap-1 font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: accent }}
                  aria-label="Voice note kept for this week"
                >
                  <AudioLines size={11} strokeWidth={1.8} aria-hidden="true" />
                  Voice
                </span>
              )}
              {!hasReflection && hasPhoto && !hasVideo && !hasVoiceNote && (
                <span
                  className="font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: accent }}
                >
                  Kept
                </span>
              )}
            </div>
          </div>
          {hasReflection && (
            <p className="font-serif italic text-foreground/65 text-[13.5px] sm:text-[14px] leading-[1.55] truncate">
              "{truncate(reflection!, 120)}"
            </p>
          )}
        </div>
        <ArrowRight
          size={14}
          strokeWidth={1.6}
          className="shrink-0 mt-2 text-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:text-foreground/65"
        />
      </Link>
    </li>
  );
};

export default KeptWeekRow;
