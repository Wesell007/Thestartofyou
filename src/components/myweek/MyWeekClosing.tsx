import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Props {
  firstName: string;
  currentWeek: number;
  chapterTitle: string;
  nextChapterTitle?: string | null;
  nextWeek?: number | null;
}

/**
 * The chapter-closing surface.
 *
 * Sits at the bottom of /my-week, above the footer. Solves the empty
 * lower-page problem by providing a quiet, emotionally-grounded
 * completion to the chapter, not a dashboard module.
 *
 * Composition:
 *   - A faint horizon rule — the chapter closes
 *   - A signature botanical seal, centred
 *   - A serif italic closing note, addressed to the user by name
 *   - Two soft continuation cues — back to the journey record, or
 *     forward to the next chapter
 */
const MyWeekClosing = ({
  firstName,
  currentWeek,
  chapterTitle,
  nextChapterTitle,
  nextWeek,
}: Props) => {
  return (
    <section className="relative mt-16 sm:mt-20 lg:mt-24">
      {/* Atmospheric envelope as the chapter quietly closes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-80px] sm:inset-x-[-160px] inset-y-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 100%, hsl(var(--stage-pregnancy) / 0.4), transparent 70%)",
        }}
      />

      {/* Horizon rule as the chapter ends */}
      <div className="relative flex items-center justify-center mb-12">
        <span
          aria-hidden="true"
          className="block h-px flex-1 max-w-[180px]"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(var(--stage-pregnancy-accent) / 0.4))",
          }}
        />
        {/* Botanical chapter mark */}
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          className="mx-5"
          aria-hidden="true"
        >
          <circle
            cx="21"
            cy="22"
            r="3.4"
            fill="hsl(var(--stage-pregnancy-accent) / 0.78)"
          />
          <path
            d="M 21 18 C 26 14, 31 9, 33 3"
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.55)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M 21 18 C 16 14, 11 9, 9 3"
            fill="none"
            stroke="hsl(var(--stage-pregnancy-accent) / 0.55)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <ellipse
            cx="30"
            cy="7"
            rx="2.6"
            ry="1.1"
            fill="hsl(var(--stage-pregnancy-accent) / 0.42)"
            transform="rotate(-32 30 7)"
          />
          <ellipse
            cx="12"
            cy="7"
            rx="2.6"
            ry="1.1"
            fill="hsl(var(--stage-pregnancy-accent) / 0.42)"
            transform="rotate(32 12 7)"
          />
          <circle
            cx="21"
            cy="34"
            r="1.3"
            fill="hsl(var(--stage-pregnancy-accent) / 0.42)"
          />
        </svg>
        <span
          aria-hidden="true"
          className="block h-px flex-1 max-w-[180px]"
          style={{
            background:
              "linear-gradient(to left, transparent, hsl(var(--stage-pregnancy-accent) / 0.4))",
          }}
        />
      </div>

      <div className="text-center max-w-[42ch] mx-auto">
        <p
          className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase mb-5"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          End of chapter · Week {currentWeek}
        </p>
        <p className="font-serif italic text-[1.35rem] sm:text-[1.5rem] text-foreground/72 leading-[1.4] mb-8">
          {chapterTitle ? (
            <>
              That was <span className="not-italic font-normal text-foreground/82">{chapterTitle.toLowerCase()}</span>, {firstName}.
            </>
          ) : (
            <>That was your week, {firstName}.</>
          )}
          <br />
          <span className="text-foreground/55">However it felt, it is yours, and it is kept.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center">
          <Link
            to="/my-journey"
            className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/65 hover:text-foreground transition-colors group"
          >
            See your record
            <ArrowUpRight
              size={13}
              strokeWidth={1.6}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          {nextWeek && nextChapterTitle && (
            <>
              <span
                aria-hidden="true"
                className="hidden sm:block w-px h-3"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
              />
              <span className="font-serif italic text-[13px] text-foreground/45">
                Next: {nextChapterTitle.toLowerCase()} · Week {nextWeek}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyWeekClosing;
