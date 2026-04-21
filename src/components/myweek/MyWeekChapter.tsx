import WeekIllustration from "./WeekIllustration";
import SlotWhatMatters from "./SlotWhatMatters";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
  trimesterLabel: string;
  chapterTitle: string;
  theme: string;
  developmentCue: string;
  babyNote: string;
  content: MyWeekEntry;
}

/**
 * /my-week left zone — the chapter frontispiece + weekly guidance.
 *
 * Composed as the open page of a kept volume:
 *   - Quiet greeting + due date as marginalia
 *   - Trimester · Week X locator (no robotic numerals)
 *   - Chapter title (large serif, magnetic)
 *   - Italic theme — the held sentence
 *   - Relational illustration on a warm wash
 *   - Development cue + baby note (paired)
 *   - "What matters this week" guidance briefing
 *
 * Designed for desktop as a left column inside a two-zone layout. On
 * smaller screens it flows as the first vertical band.
 */
const MyWeekChapter = ({
  greeting,
  firstName,
  week,
  dueDateLabel,
  trimesterLabel,
  chapterTitle,
  theme,
  developmentCue,
  babyNote,
  content,
}: Props) => {
  return (
    <div className="relative">
      {/* Atmospheric wash — anchored behind the chapter opening */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-16 w-[680px] h-[520px] rounded-full blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.85), hsl(var(--stage-pregnancy) / 0.22) 55%, transparent 78%)",
          opacity: 0.92,
        }}
      />

      {/* Chapter frontispiece */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14">
        {/* Marginalia — greeting + due date */}
        <div className="flex items-baseline justify-between gap-4 mb-9 sm:mb-10">
          <p className="font-serif italic text-[13px] sm:text-[14px] text-foreground/55 tracking-wide">
            {greeting}, {firstName}.
          </p>
          <p className="font-sans text-[10.5px] font-light tracking-[0.2em] uppercase text-foreground/38">
            Due {dueDateLabel}
          </p>
        </div>

        {/* Trimester · Week locator — human, never robotic */}
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.3em] uppercase mb-6"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          {trimesterLabel} · Week {week}
        </p>

        {/* Chapter mark — quiet editorial frontispiece line */}
        <p className="font-sans text-[10.5px] font-medium tracking-[0.32em] uppercase text-foreground/42 mb-4 sm:mb-5">
          The chapter
        </p>
        <h1
          className="font-serif font-medium text-foreground leading-[0.95] tracking-tight mb-5 sm:mb-6"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)" }}
        >
          {chapterTitle}
        </h1>

        {/* Held theme */}
        <p className="font-serif italic text-[1.15rem] sm:text-[1.25rem] lg:text-[1.32rem] text-foreground/72 leading-[1.4] mb-10 sm:mb-12 max-w-[28ch]">
          {theme}
        </p>

        {/* Relational illustration — kept tight to the column */}
        <div className="relative mb-9 sm:mb-10">
          <figure
            className="relative rounded-[28px] overflow-hidden keepsake-surface px-8 sm:px-10 py-10 sm:py-12 flex flex-col items-center"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 35%, hsl(var(--stage-pregnancy) / 0.55), hsl(var(--card)) 78%)",
            }}
          >
            <WeekIllustration week={week} size={240} className="mx-auto" />
            <figcaption className="mt-6 font-serif italic text-[13.5px] text-foreground/55 tracking-wide text-center max-w-[28ch] leading-snug">
              {babyNote}
            </figcaption>
          </figure>
        </div>

        {/* Development cue — quiet, paired with hairline */}
        <div className="relative pl-5 sm:pl-6">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.55), hsl(var(--stage-pregnancy-accent) / 0.04))",
            }}
          />
          <p
            className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-2"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Development this week
          </p>
          <p className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/62 leading-[1.6] max-w-[36ch]">
            {developmentCue}
          </p>
        </div>
      </section>

      {/* What matters this week — guidance briefing */}
      <SlotWhatMatters content={content} trimesterLabel={trimesterLabel} week={week} />
    </div>
  );
};

export default MyWeekChapter;
