import { CalendarDays, Clock3 } from "lucide-react";
import WeekIllustration from "./WeekIllustration";
import SlotWhatMatters from "./SlotWhatMatters";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
  dueDateMeta: string;
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
  dueDateMeta,
  trimesterLabel,
  chapterTitle,
  theme,
  developmentCue,
  babyNote,
  content,
}: Props) => {
  const weeksLeft = dueDateMeta.split(" · ")[0] ?? dueDateMeta;
  const cueShape = developmentCue.toLowerCase().includes("mango")
    ? "mango"
    : developmentCue.toLowerCase().includes("raspberry") || developmentCue.toLowerCase().includes("berry")
    ? "berry"
    : developmentCue.toLowerCase().includes("watermelon") || developmentCue.toLowerCase().includes("pumpkin") || developmentCue.toLowerCase().includes("melon")
    ? "large"
    : "seed";

  return (
    <div className="relative">
        {/* Atmospheric wash behind the chapter opening */}
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
      <section className="relative pt-20 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-14">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end mb-8 sm:mb-11">
          <div className="md:col-span-8">
            <p className="font-serif italic text-[13px] sm:text-[14px] text-foreground/55 tracking-wide mb-6 sm:mb-7">
              {greeting}, {firstName}.
            </p>
            <p
              className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.3em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              {trimesterLabel} · Week {week}
            </p>
            <h1
              className="font-serif font-medium text-foreground leading-[0.95] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: "clamp(2.65rem, 6vw, 4.8rem)" }}
            >
              {chapterTitle}
            </h1>
            <p className="font-serif italic text-[1.15rem] sm:text-[1.25rem] lg:text-[1.32rem] text-foreground/72 leading-[1.4] max-w-[28ch]">
              {theme}
            </p>
          </div>
          <aside
            className="md:col-span-4 rounded-[24px] keepsake-surface px-6 py-6 md:py-7"
            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={13} strokeWidth={1.7} style={{ color: "hsl(var(--stage-pregnancy-accent))" }} />
              <p
                className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase"
                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              >
                Due date
              </p>
            </div>
            <p className="font-serif font-medium text-[2.05rem] md:text-[2.2rem] lg:text-[2.35rem] text-foreground/90 leading-none mb-3 whitespace-nowrap">
              {dueDateLabel}
            </p>
            <div className="flex items-start gap-2 pt-4 border-t" style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}>
              <Clock3 size={13} strokeWidth={1.6} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--stage-pregnancy-accent))" }} />
              <p className="font-sans text-[13.5px] text-foreground/65 leading-relaxed">
                {weeksLeft}
              </p>
            </div>
          </aside>
        </div>

        {/* Dominant weekly card */}
        <figure
          className="relative grid sm:grid-cols-12 gap-0 rounded-[24px] sm:rounded-[28px] overflow-hidden keepsake-surface"
          style={{
            borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
            background:
              "linear-gradient(135deg, hsl(var(--card)), hsl(var(--stage-pregnancy) / 0.18))",
          }}
        >
          <div
            className="sm:col-span-5 px-6 sm:px-8 py-7 sm:py-12 flex flex-col items-center justify-center"
            style={{
              background:
                "radial-gradient(120% 85% at 50% 45%, hsl(var(--stage-pregnancy) / 0.58), transparent 76%)",
            }}
          >
            <WeekIllustration week={week} size={226} className="mx-auto max-w-full" />
          </div>
          <div className="sm:col-span-7 px-6 sm:px-9 py-8 sm:py-12 flex flex-col justify-center">
            <p
              className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Your baby this week
            </p>
            <p className="font-serif text-[1.55rem] sm:text-[2.08rem] text-foreground/88 leading-[1.18] tracking-tight max-w-[19ch] mb-6">
              {babyNote}
            </p>
            <span
              aria-hidden="true"
              className="block w-10 h-px mb-6"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
            />
            <div className="flex items-center gap-3.5 max-w-[30rem]">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ background: "hsl(var(--stage-pregnancy) / 0.42)" }}
              >
                <svg viewBox="0 0 44 44" className="h-7 w-7 text-[hsl(var(--stage-pregnancy-accent))]" aria-hidden="true">
                  {cueShape === "mango" && <path d="M14 28c-5-7 1-18 10-18 8 0 13 7 10 14-3 8-14 13-20 4Z" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />}
                  {cueShape === "berry" && <><circle cx="22" cy="23" r="10" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.4" /><path d="M18 12c2 2 6 2 8 0M18 18h.1M25 20h.1M20 26h.1M27 28h.1" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></>}
                  {cueShape === "large" && <path d="M9 24c0-8 6-14 14-14s13 6 13 13c0 8-7 13-14 13S9 31 9 24Z" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.5" />}
                  {cueShape === "seed" && <path d="M23 9c7 7 7 18 0 25-7-7-7-18 0-25Z" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />}
                </svg>
              </span>
              <p className="font-sans text-[14px] sm:text-[14.5px] font-light leading-relaxed text-foreground/66">
                {developmentCue}
              </p>
            </div>
          </div>
        </figure>
      </section>

      {/* What matters this week — guidance briefing */}
      <SlotWhatMatters content={content} trimesterLabel={trimesterLabel} week={week} />
    </div>
  );
};

export default MyWeekChapter;
