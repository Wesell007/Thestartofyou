/**
 * Bridging beat between hero and the rest of the hub.
 * Premium panel with a soft dual-tone wash — First Year (baby) on the left,
 * Recovery (you) on the right — grounding the two-track promise visually.
 * Copy unchanged.
 */
const FYWhatThisCovers = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div
          className="relative overflow-hidden rounded-[28px] border shadow-[0_30px_80px_-48px_rgba(20,30,60,0.28)] bg-card"
          style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.14)' }}
        >
          {/* Dual-tone diagonal wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(120deg, hsl(var(--stage-firstyear-soft) / 0.36) 0%, hsl(var(--stage-firstyear-soft) / 0.08) 45%, hsl(var(--stage-recovery-soft) / 0.10) 55%, hsl(var(--stage-recovery-soft) / 0.32) 100%)',
            }}
            aria-hidden
          />
          {/* Corner blooms */}
          <div
            className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-55 pointer-events-none"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.6)' }}
            aria-hidden
          />
          <div
            className="absolute -bottom-20 -right-16 w-60 h-60 rounded-full blur-3xl opacity-50 pointer-events-none"
            style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.55)' }}
            aria-hidden
          />
          {/* Inner highlight */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.75), transparent)' }}
            aria-hidden
          />

          <div className="relative p-8 sm:p-10 md:p-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.55)' }} />
              <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.55)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
                What you'll find
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-[1.85rem] text-foreground mb-5 leading-snug">
              What you'll find here
            </h2>
            <p className="font-sans text-base md:text-[17px] font-light text-muted-foreground leading-[1.75]">
              Month-by-month guidance for your baby, from feeding and sleep to development and care. Alongside it, equal space for your postpartum recovery — healing, hormones, mood and the check-ups that matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYWhatThisCovers;
