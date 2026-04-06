const normal = [
  "Development happening at different speeds",
  "Sleep patterns changing frequently",
  "Periods of progress and regression",
  "Feeling unsure or comparing to others",
  "Confidence going up and down",
];

const seekSupport = [
  "Concerns about development or milestones",
  "Persistent feeding or sleep issues that aren't improving",
  "Feeling unable to cope or persistently low",
  "Anything that feels worrying, even if you're not sure why",
];

const FirstYearNormal = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Guidance
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-4">
              What's normal, and when to seek support
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Most of what you're experiencing is part of normal development. But some things deserve professional attention, and asking for help is always valid.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Normal card — stage coloured */}
          <div
            className="border rounded-xl p-7 sm:p-8 shadow-card-brand"
            style={{
              backgroundColor: 'hsl(var(--stage-firstyear) / 0.08)',
              borderColor: 'hsl(var(--stage-firstyear) / 0.2)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
              >
                What's normal
              </p>
              <span
                className="font-sans text-[9px] font-light uppercase tracking-wide px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'hsl(var(--stage-firstyear) / 0.15)',
                  color: 'hsl(var(--stage-firstyear-accent) / 0.7)',
                }}
              >
                Common
              </span>
            </div>
            <ul className="space-y-4">
              {normal.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.5)' }} />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Seek support card */}
          <div className="bg-card border border-border/50 rounded-xl p-7 sm:p-8 shadow-card-brand">
            <div className="flex items-center justify-between mb-6">
              <p className="font-sans text-[11px] font-light tracking-[0.15em] uppercase text-terracotta/80">
                When to seek support
              </p>
              <span className="font-sans text-[9px] font-light uppercase tracking-wide px-2.5 py-1 rounded-full bg-terracotta/8 text-terracotta/60">
                Important
              </span>
            </div>
            <ul className="space-y-4">
              {seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 font-sans text-xs font-light text-muted-foreground flex items-center gap-2">
          <span style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>✔</span> Medically reviewed by Jenny Joines
        </p>
      </div>
    </section>
  );
};

export default FirstYearNormal;
