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
  const sizeCue = developmentCue.replace(/[—–].*$/, "").trim();
  const comparison = sizeCue.toLowerCase();
  const objectLabel = comparison.includes("mango")
    ? "mango"
    : comparison.includes("poppy")
    ? "poppy seed"
    : comparison.includes("sesame")
    ? "sesame seed"
    : comparison.includes("apple")
    ? "apple seed"
    : comparison.includes("lentil")
    ? "lentil"
    : comparison.includes("blueberry")
    ? "blueberry"
    : comparison.includes("raspberry")
    ? "raspberry"
    : comparison.includes("olive")
    ? "olive"
    : comparison.includes("strawberry")
    ? "strawberry"
    : comparison.includes("lime")
    ? "lime"
    : comparison.includes("plum")
    ? "plum"
    : comparison.includes("pepper")
    ? "pepper"
    : comparison.includes("banana")
    ? "banana"
    : comparison.includes("carrot")
    ? "carrot"
    : comparison.includes("squash")
    ? "squash"
    : comparison.includes("corn")
    ? "corn"
    : comparison.includes("courgette")
    ? "courgette"
    : comparison.includes("cauliflower")
    ? "cauliflower"
    : comparison.includes("aubergine")
    ? "aubergine"
    : comparison.includes("cabbage")
    ? "cabbage"
    : comparison.includes("coconut")
    ? "coconut"
    : comparison.includes("pineapple")
    ? "pineapple"
    : comparison.includes("pumpkin")
    ? "pumpkin"
    : comparison.includes("watermelon")
    ? "watermelon"
    : "comparison";

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
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-14">
        <div className="grid md:grid-cols-12 gap-7 md:gap-10 items-end mb-9 sm:mb-11">
          <div className="md:col-span-8">
            <p className="font-serif italic text-[13px] sm:text-[14px] text-foreground/55 tracking-wide mb-7">
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
          className="relative grid sm:grid-cols-12 gap-0 rounded-[28px] overflow-hidden keepsake-surface"
          style={{
            borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
            background:
              "linear-gradient(135deg, hsl(var(--card)), hsl(var(--stage-pregnancy) / 0.18))",
          }}
        >
          <div
            className="sm:col-span-5 px-7 sm:px-8 py-9 sm:py-12 flex flex-col items-center justify-center"
            style={{
              background:
                "radial-gradient(120% 85% at 50% 45%, hsl(var(--stage-pregnancy) / 0.58), transparent 76%)",
            }}
          >
            <WeekIllustration week={week} size={220} className="mx-auto" />
          </div>
          <div className="sm:col-span-7 px-7 sm:px-9 py-8 sm:py-11 flex flex-col justify-center">
            <p
              className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Your baby this week
            </p>
            <p className="font-serif text-[1.65rem] sm:text-[2rem] text-foreground/88 leading-[1.18] tracking-tight max-w-[18ch] mb-5">
              {babyNote}
            </p>
            <span
              aria-hidden="true"
              className="block w-10 h-px mb-5"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
            />
            <div className="mt-1 flex items-center gap-3 rounded-[18px] px-4 py-3 max-w-[36ch]" style={{ background: "hsl(var(--stage-pregnancy) / 0.38)", border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.12)" }}>
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "hsl(var(--card))" }}>
                <svg viewBox="0 0 32 32" width="25" height="25" aria-hidden="true" className="text-[hsl(var(--stage-pregnancy-accent))]">
                  <ellipse cx="16" cy="17" rx={objectLabel.includes("seed") || objectLabel === "lentil" ? 7 : objectLabel === "banana" || objectLabel === "carrot" || objectLabel === "courgette" ? 10 : 8} ry={objectLabel.includes("seed") || objectLabel === "lentil" ? 5 : objectLabel === "banana" || objectLabel === "carrot" || objectLabel === "courgette" ? 4 : 7} fill="currentColor" opacity="0.66" transform={objectLabel === "banana" || objectLabel === "carrot" || objectLabel === "courgette" ? "rotate(-18 16 17)" : undefined} />
                  <path d="M19 10c3-1 5-3 6-5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.62" />
                  <path d="M21 8c2 0 3.4.7 4.2 2" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.42" />
                </svg>
              </span>
              <figcaption className="font-sans text-[12.5px] text-foreground/66 leading-snug">
                <span className="block text-[9.5px] font-medium tracking-[0.24em] uppercase mb-1" style={{ color: "hsl(var(--stage-pregnancy-accent))" }}>
                  Size comparison
                </span>
                {sizeCue}
              </figcaption>
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
