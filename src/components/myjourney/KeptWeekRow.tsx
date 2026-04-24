import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MyWeekBabyImage from "@/components/myweek/MyWeekBabyImage";
import { getWeekIdentity } from "@/data/myWeekContent";

interface Props {
  week: number;
  reflection?: string;
  hasPhoto: boolean;
  /** True when this row represents the live current week. Visually subordinate. */
  isCurrentWeek?: boolean;
}

const truncate = (s: string, max: number) => {
  if (s.length <= max) return s;
  const slice = s.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
};

const KeptWeekRow = ({ week, reflection, hasPhoto, isCurrentWeek }: Props) => {
  const identity = getWeekIdentity(week);
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const hasReflection = !!reflection && reflection.trim().length > 0;

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
          <MyWeekBabyImage
            week={week}
            className="w-full h-full flex items-center justify-center"
            imgClassName="w-full h-full object-cover"
          />
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
            {!hasReflection && hasPhoto && (
              <span
                className="font-sans text-[9.5px] font-medium tracking-[0.24em] uppercase shrink-0"
                style={{ color: accent }}
              >
                Kept
              </span>
            )}
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
