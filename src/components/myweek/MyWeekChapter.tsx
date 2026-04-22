import { CalendarDays, Clock3 } from "lucide-react";
import SlotWhatMatters from "./SlotWhatMatters";
import type { MyWeekEntry } from "@/data/myWeekContent";
import babyEarly from "@/assets/myweek-baby-early.png";
import babyMid from "@/assets/myweek-baby-mid.png";
import babyLate from "@/assets/myweek-baby-late.png";

type CueShape = "mango" | "berry" | "strawberry" | "orchard" | "pod" | "large" | "olive" | "seed";

const getCueShape = (developmentCue: string): CueShape => {
  const cue = developmentCue.toLowerCase();

  if (cue.includes("mango")) return "mango";
  if (cue.includes("raspberry") || cue.includes("blueberry") || cue.includes("berry")) return "berry";
  if (cue.includes("strawberry")) return "strawberry";
  if (cue.includes("olive")) return "olive";
  if (cue.includes("pea pod") || cue.includes("pepper") || cue.includes("corn") || cue.includes("banana") || cue.includes("carrot") || cue.includes("courgette") || cue.includes("romaine")) return "pod";
  if (cue.includes("watermelon") || cue.includes("pumpkin") || cue.includes("melon") || cue.includes("squash") || cue.includes("cabbage") || cue.includes("pineapple") || cue.includes("cauliflower")) return "large";
  if (cue.includes("apple") || cue.includes("pear") || cue.includes("avocado") || cue.includes("plum") || cue.includes("lime") || cue.includes("tomato") || cue.includes("aubergine") || cue.includes("swede")) return "orchard";

  return "seed";
};

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
  const cueShape = getCueShape(developmentCue);
  const babyArtwork = week <= 12 ? babyEarly : week <= 27 ? babyMid : babyLate;

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
            <div className="relative mx-auto aspect-square w-full max-w-[270px] sm:max-w-[318px]">
              <span
                aria-hidden="true"
                className="absolute inset-[11%] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, hsl(var(--stage-pregnancy-accent) / 0.26), hsl(var(--stage-pregnancy) / 0.02) 72%, transparent 82%)" }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-[6%] rounded-full border"
                style={{ borderColor: "hsl(var(--card) / 0.5)" }}
              />
              <img
                src={babyArtwork}
                alt={`Softly rendered baby illustration for week ${week}`}
                loading="eager"
                decoding="async"
                className="relative z-10 h-full w-full object-contain select-none"
              />
            </div>
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
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border"
                style={{ background: "hsl(var(--stage-pregnancy) / 0.52)", borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
              >
                <svg viewBox="0 0 48 48" className="h-8 w-8 text-[hsl(var(--stage-pregnancy-accent))]" aria-hidden="true">
                  {cueShape === "mango" && (
                    <>
                      <path d="M20 9c4-1 7 0 9 2 5 4 7 10 5 16-2 8-10 13-18 11-7-2-10-10-7-16 2-4 6-7 11-7Z" fill="currentColor" opacity="0.18" />
                      <path d="M20 9c4-1 7 0 9 2 5 4 7 10 5 16-2 8-10 13-18 11-7-2-10-10-7-16 2-4 6-7 11-7Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M24 11c1-3 4-5 8-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M29 7c3 0 5 1 7 4-3 1-6 1-8-1" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      <path d="M19 15c3-2 7-2 10 0" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.36" />
                    </>
                  )}
                  {cueShape === "berry" && (
                    <>
                      <circle cx="20" cy="23" r="5.2" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="26.8" cy="22.4" r="5.1" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="23.5" cy="28.5" r="5.4" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M18 15c2 1 4 1 6 0m1 0c2 1 4 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M24 13c1-3 3-5 6-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </>
                  )}
                  {cueShape === "strawberry" && (
                    <>
                      <path d="M24 14c6 0 10 4 9 10-1 7-5 13-9 13s-8-6-9-13c-1-6 3-10 9-10Z" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M18 14c2 1 4 1 6-1 2 2 4 2 6 1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M20 23h.1M27 22h.1M23 28h.1M27 29h.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </>
                  )}
                  {cueShape === "olive" && (
                    <>
                      <ellipse cx="24" cy="25" rx="8.5" ry="12" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M24 13c1-3 3-5 6-6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M20 20c2-2 6-2 8 0" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />
                    </>
                  )}
                  {cueShape === "orchard" && (
                    <>
                      <path d="M24 14c6 0 11 5 11 11s-5 10-11 10-11-4-11-10 5-11 11-11Z" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.35" />
                      <path d="M24 14c0-3 1-5 4-7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M27 9c3 0 5 1 7 4-3 1-5 1-7-1" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.15" />
                    </>
                  )}
                  {cueShape === "pod" && (
                    <>
                      <path d="M14 24c0-6 5-11 12-11 5 0 8 2 10 5-1 6-6 13-15 13-4 0-7-2-7-7Z" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
                      <path d="M20 19c1.5 1.2 3.2 1.7 5 1.7 2.1 0 4-.6 5.6-1.8" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" opacity="0.44" />
                      <path d="M14 24c7 2 14 0 21-6" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                    </>
                  )}
                  {cueShape === "large" && (
                    <>
                      <circle cx="24" cy="24" r="12" fill="currentColor" opacity="0.16" stroke="currentColor" strokeWidth="1.35" />
                      <path d="M24 12c0-3 2-5 5-7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M17 24c2.5-2 5.5-3 9-3 2 0 4.1.4 6 1.2" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" opacity="0.42" />
                    </>
                  )}
                  {cueShape === "seed" && (
                    <>
                      <path d="M24 11c6 6 7 16 0 25-7-8-6-18 0-25Z" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.35" />
                      <path d="M24 15c0-2 1-4 3-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </>
                  )}
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
