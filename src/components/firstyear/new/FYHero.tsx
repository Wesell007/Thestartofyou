import { Link } from "react-router-dom";
import firstyearScene from "@/assets/firstyear-scene.jpg";

/**
 * Premium still-image hero — single dual-entry moment.
 * No inner bands. The dual logic lives in the headline, support line,
 * two equal CTAs and the subtle dual-tone wash at the bottom.
 */
const FYHero = () => {
  return (
    <section
      id="first-year-top"
      className="relative overflow-hidden min-h-[70vh] md:min-h-[78vh] flex items-center pt-28 pb-16 md:pb-20"
    >
      {/* Full-bleed image */}
      <img
        src={firstyearScene}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Soft parchment veil */}
      <div className="absolute inset-0 bg-parchment/70 md:bg-gradient-to-r md:from-parchment md:via-parchment/85 md:to-parchment/25" />
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-parchment via-parchment/80 to-parchment/40" />

      {/* Subtle dual-tone wash at the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none flex">
        <div
          className="w-1/3 h-full blur-3xl opacity-60"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.55)' }}
        />
        <div className="w-1/3" />
        <div
          className="w-1/3 h-full blur-3xl opacity-60"
          style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.5)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-foreground/25" />
            <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-foreground/65">
              First year
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground mb-5 leading-[1.05]">
            Their first year, and{" "}
            <span className="italic" style={{ color: 'hsl(var(--stage-recovery-deep))' }}>
              your recovery
            </span>
            .
          </h1>

          {/* Support line */}
          <p className="font-sans text-base md:text-[17px] font-light text-muted-foreground leading-relaxed mb-9 max-w-lg">
            Your baby will change quickly. You're healing too. Both belong here.
          </p>

          {/* Two equal CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="#baby-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium transition-all duration-300 hover:opacity-90 min-w-[200px]"
              style={{
                backgroundColor: 'hsl(var(--stage-firstyear-deep))',
                color: 'hsl(var(--card))',
              }}
            >
              Baby's first year
            </Link>
            <Link
              to="#recovery-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium transition-all duration-300 hover:opacity-90 min-w-[200px]"
              style={{
                backgroundColor: 'hsl(var(--stage-recovery-deep))',
                color: 'hsl(var(--card))',
              }}
            >
              Your recovery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYHero;
