import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  currentWeek: number;
  due: Date;
  startedAt: Date | null;
}

const JourneyHeader = ({ currentWeek, due, startedAt }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  return (
    <header className="mb-12 sm:mb-14 lg:mb-16">
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.32em] uppercase mb-5"
        style={{ color: accent }}
      >
        Your saved journey
      </p>
      <h1
        className="font-serif font-medium text-foreground leading-[0.98] tracking-tight mb-5"
        style={{ fontSize: "clamp(2.4rem, 5.4vw, 3.6rem)" }}
      >
        My journey
      </h1>
      <p className="font-serif italic text-foreground/65 text-[1.1rem] sm:text-[1.18rem] leading-[1.55] max-w-[44ch] mb-3">
        Week {currentWeek} of your pregnancy.
      </p>
      <p className="font-serif text-foreground/60 text-[15px] sm:text-[15.5px] leading-[1.65] max-w-[52ch] mb-7">
        Your weeks, reflections, and moments are being kept here as your journey unfolds.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
        <Link
          to="/my-week"
          className="inline-flex items-center justify-center rounded-full px-6 py-2.5 font-sans text-[12px] font-medium tracking-[0.18em] uppercase transition-all hover:bg-[hsl(var(--stage-pregnancy-accent)/0.08)] w-full sm:w-auto"
          style={{
            color: accent,
            border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.4)",
            backgroundColor: "transparent",
          }}
        >
          Go to My Week
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-[12.5px] text-foreground/50">
          <span>Due {format(due, "d MMMM yyyy")}</span>
          {startedAt && (
            <>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>Saving since {format(startedAt, "d MMMM yyyy")}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default JourneyHeader;
