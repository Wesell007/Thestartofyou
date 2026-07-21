import MyWeekBabyImage from "./MyWeekBabyImage";

interface Props {
  week: number;
  developmentCue: string;
  babyNote: string;
  whatThisMeans: string;
}

/**
 * Baby this week — the visual centre of My Week 2.0.
 *
 * Large fetus image on a warm wash, paired with a size cue, a two-to-three
 * sentence development note, and one calm "what this means" line. Framed
 * so a future Nano Banana image drop-in lifts the whole card.
 */
const SectionBabyThisWeek = ({ week, developmentCue, babyNote, whatThisMeans }: Props) => {
  return (
    <section className="relative pt-4 pb-12 sm:pb-14">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Baby this week
        </p>
      </div>

      <figure
        className="relative grid sm:grid-cols-12 gap-0 rounded-[24px] sm:rounded-[28px] overflow-hidden keepsake-surface shadow-elevated"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
          background:
            "linear-gradient(135deg, hsl(var(--card)), hsl(var(--stage-pregnancy) / 0.2))",
        }}
      >
        <div
          className="sm:col-span-6 px-6 sm:px-8 py-10 sm:py-12 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, hsl(var(--stage-pregnancy) / 0.6), transparent 78%)",
          }}
        >
          <div className="relative mx-auto aspect-[13/16] w-full max-w-[280px] sm:max-w-[320px]">
            <span
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--stage-pregnancy-accent) / 0.24), transparent 74%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-[5%] rounded-full border"
              style={{ borderColor: "hsl(var(--card) / 0.55)" }}
            />
            <MyWeekBabyImage
              week={week}
              className="relative z-10 h-full w-full"
              imgClassName="h-full w-full object-contain select-none"
            />
          </div>
        </div>

        <figcaption className="sm:col-span-6 px-6 sm:px-9 py-9 sm:py-12 flex flex-col justify-center">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-4"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            About this size
          </p>
          <p className="font-serif text-[1.35rem] sm:text-[1.55rem] text-foreground/88 leading-[1.22] tracking-tight mb-6 max-w-[26ch]">
            {developmentCue}
          </p>
          <span
            aria-hidden="true"
            className="block w-12 h-px mb-5"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
          />
          <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/72 leading-[1.75] mb-4">
            {babyNote}
          </p>
          <p className="font-serif italic text-[14px] sm:text-[14.5px] text-foreground/60 leading-[1.65] max-w-[36ch]">
            {whatThisMeans}
          </p>
        </figcaption>
      </figure>
    </section>
  );
};

export default SectionBabyThisWeek;
