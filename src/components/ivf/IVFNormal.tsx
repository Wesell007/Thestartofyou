const normal = [
  "Symptoms that feel unclear or inconsistent",
  "Emotional ups and downs throughout the process",
  "Feeling both hopeful and cautious at the same time",
  "Questioning what signs mean between appointments",
];

const seekSupport = [
  "Severe or unusual pain after a procedure",
  "Heavy or unexpected bleeding",
  "Strong or concerning physical reactions",
  "Anything that feels outside your expected care plan",
];

const IVFNormal = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Guidance
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              What's normal, and when to seek support
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
              IVF can bring symptoms and emotions that feel unfamiliar. Knowing what is common and when to reach out can help.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Normal card */}
          <div
            className="rounded-2xl p-7 sm:p-8 border shadow-card-brand"
            style={{
              backgroundColor: 'hsl(var(--stage-ivf) / 0.08)',
              borderColor: 'hsl(var(--stage-ivf-accent) / 0.12)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'hsl(var(--stage-ivf-accent))' }}
              />
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                What's normal
              </span>
            </div>
            <ul className="space-y-4">
              {normal.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.5)' }}
                  />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Seek support card */}
          <div className="rounded-2xl p-7 sm:p-8 bg-card border border-border/50 shadow-card-brand">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-terracotta" />
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-terracotta">
                When to seek support
              </span>
            </div>
            <ul className="space-y-4">
              {seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta/50 shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFNormal;
