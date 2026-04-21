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
  return (
    <section className="relative pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24">
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

      {/* The lead — premium editorial sentence */}
      <h2 className="font-serif text-[1.55rem] sm:text-[1.85rem] md:text-[2.15rem] text-foreground leading-[1.18] mb-3 sm:mb-4 max-w-[26ch]">
        {content.lead}
      </h2>
      <p className="font-sans text-[13.5px] sm:text-[14px] font-light italic text-foreground/55 mb-10 sm:mb-12 max-w-[42ch]">
        A short, guided lens on the week — your body, your baby, and what's quietly true emotionally.
      </p>

      {/* Briefing cards — keepsake surfaces with serif numerals */}
      <ol className="space-y-5 sm:space-y-6">
        {content.matters.map((p, i) => (
          <li
            key={i}
            className="group relative rounded-[24px] keepsake-surface px-6 sm:px-8 py-6 sm:py-7 transition-all duration-500 hover:shadow-[0_24px_60px_-24px_hsl(var(--stage-pregnancy-accent)/0.22),0_4px_16px_-8px_hsl(222_14%_12%/0.06)]"
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

            <div className="flex items-baseline gap-5 sm:gap-6">
              {/* Quiet vertical mark — replaces robotic numeral */}
              <span
                aria-hidden="true"
                className="block w-[3px] h-10 rounded-full shrink-0 mt-1"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.7), hsl(var(--stage-pregnancy-accent) / 0.18))",
                }}
              />

              <div className="flex-1 min-w-0">
                <p
                  className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase mb-3"
                  style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  {p.title}
                </p>
                <p className="font-sans text-[15px] sm:text-[16px] font-light text-foreground/76 leading-[1.75]">
                  {p.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default SlotWhatMatters;
