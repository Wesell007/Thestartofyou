interface Props {
  firstName: string;
  currentWeek: number;
  heldCount: number;
  photoCount: number;
}

/**
 * /my-journey left zone — what this record is and why it matters.
 *
 * Sticky, atmospheric column. Composed as the inside cover of a kept
 * volume: title, ethos, summary of what's been kept, and a quiet
 * companion-memory framing.
 */
const JourneyMeaning = ({ firstName, currentWeek, heldCount, photoCount }: Props) => {
  return (
    <div className="relative lg:sticky lg:top-24">
      {/* Atmospheric wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-12 w-[520px] h-[420px] rounded-full blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.7), hsl(var(--stage-pregnancy) / 0.18) 55%, transparent 78%)",
        }}
      />

      {/* Top hairline */}
      <div className="flex items-center gap-3 mb-7 pt-4">
        <span
          aria-hidden="true"
          className="block h-px w-10"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)",
          }}
        />
        <span
          aria-hidden="true"
          className="block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.7)" }}
        />
      </div>

      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-6"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        {firstName}'s journey
      </p>

      <h1
        className="font-serif font-medium text-foreground leading-[0.96] tracking-tight mb-6"
        style={{ fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)" }}
      >
        Week by week,<br />kept close.
      </h1>

      <p className="font-serif italic text-[1.05rem] lg:text-[1.12rem] text-foreground/68 leading-[1.5] max-w-[34ch] mb-10">
        Not a timeline. A pregnancy record of the weeks you've lived,
        the thoughts you've held, and the images you chose to keep.
      </p>

      {/* Summary of what's been kept */}
      <div className="grid grid-cols-2 gap-3 mb-10 max-w-[390px]">
        <div className="rounded-[18px] keepsake-surface px-5 py-5 min-h-[118px] flex flex-col justify-between">
          <p className="font-sans text-[9.5px] font-medium tracking-[0.22em] uppercase text-foreground/45 leading-relaxed">
            Kept so far
          </p>
          <p className="font-serif font-medium text-foreground text-[1.35rem] sm:text-[1.48rem] leading-none whitespace-nowrap">
            {currentWeek === 1 ? "1 week" : `${currentWeek} weeks`}
          </p>
        </div>
        <div className="rounded-[18px] keepsake-surface px-5 py-5 min-h-[118px] flex flex-col justify-between">
          <p className="font-sans text-[9.5px] font-medium tracking-[0.22em] uppercase text-foreground/45 leading-relaxed">
            Memory objects
          </p>
          <p className="font-serif font-medium text-foreground text-[1.08rem] sm:text-[1.2rem] leading-none whitespace-nowrap tabular-nums">
            {heldCount === 0 && photoCount === 0
              ? "None yet"
              : `${heldCount} note${heldCount === 1 ? "" : "s"} · ${photoCount} photo${photoCount === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>

      {/* Companion-memory framing */}
      <div
        className="rounded-[22px] keepsake-surface px-6 py-6 max-w-[360px]"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.22) 100%)",
        }}
      >
        <p
          className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-3"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Companion · Quiet structure
        </p>
        <p className="font-serif text-[1.02rem] text-foreground/80 leading-[1.45] mb-4">
          Every week stores what future recall needs.
        </p>
        <ul className="space-y-1.5 font-sans text-[12.5px] font-light text-foreground/55 leading-relaxed">
          <li>Week name + chapter title</li>
          <li>Reflection kept in context</li>
          <li>One image worth remembering</li>
          <li>Theme + development cue</li>
        </ul>
      </div>
    </div>
  );
};

export default JourneyMeaning;
