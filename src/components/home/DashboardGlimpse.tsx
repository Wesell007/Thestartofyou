const DashboardGlimpse = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
        {/* Minimal intro */}
        <div className="text-center mb-10 md:mb-14">
          <div className="editorial-rule mb-5" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground/40 mb-3">
            What you will see
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground">
            Personalised guidance, updated every week
          </h2>
        </div>

        {/* Restrained dashboard card */}
        <div className="rounded-2xl border border-border/30 bg-card shadow-soft overflow-hidden max-w-xl mx-auto">
          {/* Top bar */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-border/20 flex items-center justify-between">
            <span className="font-serif text-xs text-foreground/80">Your Dashboard</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sage/10 text-sage font-sans text-[9px] font-medium tracking-wide">
              Week 18
            </span>
          </div>

          {/* Content */}
          <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans text-[11px] font-light text-muted-foreground/50">Your progress</p>
                <p className="font-sans text-[11px] font-medium text-terracotta/60">45%</p>
              </div>
              <div className="h-1 rounded-full bg-parchment-dark overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sage/60 to-terracotta/40"
                  style={{ width: "45%" }}
                />
              </div>
            </div>

            {/* Key guidance items */}
            <div className="space-y-3 pt-1">
              {[
                { label: "This week", value: "Baby's bones are beginning to harden" },
                { label: "Your body", value: "Increased energy and possible first movements" },
                { label: "Focus", value: "Start thinking about birth preferences" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-1 rounded-full bg-sage/25 shrink-0 mt-1" style={{ height: '14px' }} />
                  <div>
                    <p className="font-sans text-[10px] font-medium text-muted-foreground/40 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-sans text-[12.5px] font-light text-foreground/70 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade hint — suggests more without showing */}
          <div className="h-8 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Quiet supporting line */}
        <p className="text-center mt-6 font-sans text-[12px] font-light text-muted-foreground/35">
          Updates every Sunday with guidance for your current week.
        </p>
      </div>
    </section>
  );
};

export default DashboardGlimpse;
