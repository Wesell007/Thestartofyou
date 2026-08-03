import { BIRTH_PLAN_BANDS, BirthPlanBand as BirthPlanBandType } from "@/lib/birthPlanSchema";
import { ReactNode } from "react";

interface Props {
  band: BirthPlanBandType;
  children: ReactNode;
}

const accent = "hsl(var(--stage-pregnancy-accent))";

const BirthPlanBand = ({ band, children }: Props) => {
  const isClosing = band.id === BIRTH_PLAN_BANDS[BIRTH_PLAN_BANDS.length - 1].id;

  return (
    <section className="mb-10" aria-labelledby={`birthplan-band-${band.id}`}>
      <div className="mb-4 px-1">
        <div className="flex items-center gap-3 mb-2">
          <span
            aria-hidden="true"
            className="block w-5 h-px"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
          />
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
            style={{ color: accent }}
          >
            {isClosing ? "In your words" : "Section"}
          </p>
        </div>
        <h2
          id={`birthplan-band-${band.id}`}
          className="font-serif text-[1.35rem] sm:text-[1.5rem] text-foreground/90 leading-[1.2] mb-1.5"
        >
          {band.title}
        </h2>
        <p className="font-serif italic text-foreground/65 text-[14px] leading-[1.65] max-w-[56ch]">
          {band.intro}
        </p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
};

export default BirthPlanBand;
