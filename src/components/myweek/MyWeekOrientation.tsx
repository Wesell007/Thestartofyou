interface Props {
  trimesterLabel: string;
  week: number;
  arcPhrase: string;
}

/**
 * Quiet bridge between hero and Slot 1.
 * Gives the user a one-line sense of "where you are in the wider arc"
 * before the weekly content begins. Restrained, editorial, never dashboard-like.
 */
const MyWeekOrientation = ({ trimesterLabel, week, arcPhrase }: Props) => {
  return (
    <section className="pb-10 sm:pb-12 md:pb-14">
      <div
        className="relative md:text-center md:flex md:flex-col md:items-center"
      >
        {/* Inline meta row */}
        <div className="flex items-center gap-3 md:justify-center mb-4">
          <span
            aria-hidden="true"
            className="block w-6 h-px"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
          />
          <p
            className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.22em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            {trimesterLabel} · Week {week}
          </p>
          <span
            aria-hidden="true"
            className="block w-6 h-px"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
          />
        </div>

        <p className="font-serif italic text-[15px] sm:text-[16px] md:text-[17px] text-foreground/65 leading-relaxed max-w-[42ch]">
          {arcPhrase}
        </p>
      </div>
    </section>
  );
};

export default MyWeekOrientation;
