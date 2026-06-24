import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Dual-band hero — calm and premium, not dramatic.
 * Shared headline sits above two equal track bands so the dual-track model is visible
 * before any scrolling, while keeping the editorial restraint of the rest of the site.
 */
const FYHero = () => {
  return (
    <section
      id="first-year-top"
      className="relative overflow-hidden pt-28 pb-12 md:pb-16"
    >
      {/* Soft ambient wash */}
      <div className="absolute inset-0 pointer-events-none bg-parchment" />
      <div
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.5)' }}
      />
      <div
        className="absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.45)' }}
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative z-10">
        {/* Shared eyebrow */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.7)' }} />
          <div className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.7)' }} />
          <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase ml-2 text-foreground/70">
            First Year · One hub, two tracks
          </span>
        </div>

        {/* Shared headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] text-foreground mb-4 leading-[1.06] max-w-3xl">
          Their first year. <span className="italic" style={{ color: 'hsl(var(--stage-recovery-deep))' }}>Your recovery.</span> Held together.
        </h1>
        <p className="font-sans text-base md:text-[17px] font-light text-muted-foreground leading-relaxed mb-10 max-w-2xl">
          Twelve months for your baby, and a real recovery for you. Two parallel tracks inside one hub, so you never have to choose which one to learn about first.
        </p>

        {/* Dual track bands */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Baby band */}
          <div
            className="relative rounded-2xl border p-6 md:p-7 flex flex-col"
            style={{
              backgroundColor: 'hsl(var(--stage-firstyear) / 0.55)',
              borderColor: 'hsl(var(--stage-firstyear-accent) / 0.22)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.7)' }}
            />
            <p
              className="font-sans text-[10px] font-light tracking-[0.22em] uppercase mb-2"
              style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
            >
              Track One · Baby
            </p>
            <h2 className="font-serif text-xl md:text-[1.4rem] text-foreground leading-snug mb-2">
              Baby's first year
            </h2>
            <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-5">
              Feeding, sleep, milestones and care across twelve months of change.
            </p>
            <Link
              to="#baby"
              className="mt-auto inline-flex items-center gap-1.5 font-sans text-[12px] font-medium self-start"
              style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
            >
              Enter baby track <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Recovery band */}
          <div
            className="relative rounded-2xl border p-6 md:p-7 flex flex-col"
            style={{
              backgroundColor: 'hsl(var(--stage-recovery) / 0.55)',
              borderColor: 'hsl(var(--stage-recovery-accent) / 0.22)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.7)' }}
            />
            <p
              className="font-sans text-[10px] font-light tracking-[0.22em] uppercase mb-2"
              style={{ color: 'hsl(var(--stage-recovery-deep))' }}
            >
              Track Two · You
            </p>
            <h2 className="font-serif text-xl md:text-[1.4rem] text-foreground leading-snug mb-2">
              Your postpartum recovery
            </h2>
            <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-5">
              Physical healing, hormones, emotional wellbeing and check-ups that matter.
            </p>
            <Link
              to="#recovery"
              className="mt-auto inline-flex items-center gap-1.5 font-sans text-[12px] font-medium self-start"
              style={{ color: 'hsl(var(--stage-recovery-deep))' }}
            >
              Enter recovery track <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYHero;
