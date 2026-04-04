const DashboardPreviewSection = () => {
  return (
    <section className="relative bg-parchment section-spacing overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="editorial-rule mb-6 md:mb-8" />
          <p className="stage-label mb-4 md:mb-5">Your Dashboard</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-5 md:mb-7">
            A Structured View of Your Journey
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your personal dashboard organises everything you need for each stage: weekly guidance, milestone tracking, reflection prompts, and curated resources.
          </p>
        </div>

        {/* Browser mockup */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-elevated border border-border/20 bg-card mx-auto max-w-3xl">
          {/* Browser chrome */}
          <div className="bg-parchment-dark px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-2 border-b border-border/30">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-destructive/30" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-terracotta/30" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sage/30" />
            <div className="ml-3 sm:ml-4 flex-1 bg-parchment rounded-lg px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-sans font-light text-muted-foreground/60 truncate">
              thestartofyou.com/journey
            </div>
          </div>

          {/* Inner app UI */}
          <div className="bg-card p-0">
            {/* App nav */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-border/30">
              <span className="font-serif text-xs sm:text-sm text-foreground">The Start of You</span>
              <nav className="hidden sm:flex gap-5 md:gap-7">
                {["Overview", "Journal", "Resources", "Profile"].map((item, i) => (
                  <span key={item} className={`font-sans text-[10px] sm:text-[11px] font-light cursor-pointer transition-colors ${i === 0 ? "text-terracotta border-b border-terracotta pb-0.5" : "text-muted-foreground/60"}`}>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sage/80 flex items-center justify-center text-[9px] sm:text-[10px] font-sans font-medium" style={{ color: 'hsl(var(--primary-foreground))' }}>
                AS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Main content */}
              <div className="md:col-span-2 p-5 sm:p-7 md:border-r border-border/30">
                <p className="font-sans text-[10px] font-medium text-terracotta/80 tracking-[0.2em] uppercase mb-1.5">WEEK 18</p>
                <h3 className="font-serif text-lg sm:text-xl text-foreground mb-1.5">Second Trimester</h3>
                <p className="font-sans text-[11px] font-light text-muted-foreground/60 mb-5 sm:mb-7">Due date: 14 October 2025</p>

                {/* Progress */}
                <div className="bg-parchment rounded-xl p-4 sm:p-5 mb-5 sm:mb-7">
                  <p className="font-sans text-[10px] font-light text-muted-foreground/60 mb-3">Your Progress</p>
                  <div className="h-1.5 rounded-full bg-parchment-dark overflow-hidden mb-3">
                    <div className="h-full rounded-full bg-gradient-to-r from-sage to-terracotta/50" style={{ width: "45%" }} />
                  </div>
                  <div className="flex justify-between font-sans text-[10px] font-light text-muted-foreground/50">
                    <span>18 weeks completed</span>
                    <span>22 weeks remaining</span>
                  </div>
                </div>

                {/* Info rows */}
                {[
                  { label: "This Week's Development", val: "Baby's bones are hardening and facial features continue to develop" },
                  { label: "Body Changes", val: "Increased energy and possible quickening movements" },
                  { label: "This Week's Focus", val: "Consider starting birth preference discussions" },
                ].map((row) => (
                  <div key={row.label} className="mb-4 sm:mb-5">
                    <p className="font-sans text-[12px] sm:text-[13px] font-medium text-foreground mb-1">{row.label}</p>
                    <p className="font-sans text-[11px] font-light text-muted-foreground/70 leading-relaxed">{row.val}</p>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="p-5 sm:p-6 flex flex-col gap-5 sm:gap-7 border-t md:border-t-0 border-border/30">
                <div className="bg-sage-bg/60 rounded-xl p-4 sm:p-5">
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage/80 mb-4">UPCOMING</p>
                  {[
                    { w: "Week 20", label: "Anatomy Scan" },
                    { w: "Week 24", label: "Viability Milestone" },
                    { w: "Week 28", label: "Third Trimester" },
                  ].map((item) => (
                    <div key={item.label} className="mb-3.5 flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0" />
                      <div>
                        <p className="font-sans text-[10px] font-light text-muted-foreground/50">{item.w}</p>
                        <p className="font-sans text-[11px] font-medium text-foreground/80">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/50 mb-4">JOURNEY STATS</p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { val: "18", label: "WEEKS" },
                      { val: "126", label: "DAYS" },
                      { val: "12", label: "ENTRIES" },
                      { val: "45%", label: "COMPLETE" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-parchment rounded-xl p-3 sm:p-3.5 text-center">
                        <p className="font-serif text-base sm:text-lg text-terracotta/80">{stat.val}</p>
                        <p className="font-sans text-[9px] font-light text-muted-foreground/50 tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;
