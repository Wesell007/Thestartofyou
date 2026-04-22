import { Baby, Heart, Sparkles } from "lucide-react";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
  trimesterLabel: string;
  week: number;
}

/**
 * Slot 1 — What matters this week.
 *
 * The premium weekly briefing. Acts as the answer to "what matters now?"
 * with a clear hierarchy:
 *  - Editorial label + meta (trimester · week)
 *  - The lead — the held sentence
 *  - Three numbered briefing cards: Your baby / Your body / Emotionally
 *
 * Numbered, lightly-cardified, never tracker-like. Reads like a curated
 * weekly guide, not three bullet points.
 */
const SlotWhatMatters = ({ content, trimesterLabel, week }: Props) => {
  const icons = [Baby, Heart, Sparkles];

  return (
    <section className="relative pt-4 sm:pt-6 md:pt-8 pb-16 sm:pb-20 md:pb-24">
      {/* Section label + meta row */}
      <div className="flex items-center justify-between gap-4 mb-7 sm:mb-8 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="block w-6 h-px"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
          />
          <p
            className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            What matters this week
          </p>
        </div>
        <p className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase text-foreground/35">
          {trimesterLabel} · Week {week}
        </p>
      </div>

      <p className="font-serif text-[1.55rem] sm:text-[1.9rem] text-foreground/86 leading-[1.18] tracking-tight mb-3 max-w-[30ch]">
        {content.lead}
      </p>
      <p className="font-serif italic text-[1.05rem] sm:text-[1.16rem] text-foreground/58 leading-[1.5] mb-8 sm:mb-9 max-w-[38ch]">
        Your baby, your body, and what may be true emotionally.
      </p>

      {/* Briefing cards — stronger repeated scan rhythm */}
      <ol className="space-y-5 sm:space-y-6">
        {content.matters.map((p, i) => {
          const Icon = icons[i] ?? Sparkles;
          return (
          <li
            key={i}
            className="group relative rounded-[22px] keepsake-surface px-6 sm:px-8 py-5 sm:py-6 transition-all duration-500 hover:shadow-[0_24px_60px_-24px_hsl(var(--stage-pregnancy-accent)/0.18),0_4px_16px_-8px_hsl(222_14%_12%/0.05)]"
          >
            {/* Stage-coded left rule */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.6), hsl(var(--stage-pregnancy-accent) / 0.04))",
              }}
            />

            <div className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-7 items-center">
              <div className="flex items-center gap-4">
                <span
                  className="flex w-12 h-12 rounded-full shrink-0 items-center justify-center"
                  style={{ background: "hsl(var(--stage-pregnancy) / 0.45)" }}
                >
                  <Icon size={21} strokeWidth={1.45} style={{ color: "hsl(var(--stage-pregnancy-accent))" }} />
                </span>
                <p
                  className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  {p.title}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[15px] sm:text-[16px] font-light text-foreground/76 leading-[1.75]">
                  {p.body}
                </p>
              </div>
            </div>
          </li>
        )})}
      </ol>
    </section>
  );
};

export default SlotWhatMatters;
