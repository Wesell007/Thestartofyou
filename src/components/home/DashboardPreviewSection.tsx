const DashboardPreviewSection = () => {
  return (
    <section className="bg-parchment py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14 md:mb-18">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5">
            A Structured View of Your Journey
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your personal dashboard organises everything you need for each stage: weekly guidance, milestone tracking, reflection prompts, and curated resources — all in one calm, clear interface.
          </p>
        </div>

        {/* Browser mockup */}
        <div className="rounded-2xl overflow-hidden shadow-soft border border-parchment-deeper bg-card mx-auto max-w-3xl">
          {/* Browser chrome */}
          <div className="bg-parchment-dark px-4 py-3 flex items-center gap-2 border-b border-parchment-deeper">
            <span className="w-3 h-3 rounded-full bg-red-400/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <span className="w-3 h-3 rounded-full bg-green-400/60" />
            <div className="ml-3 flex-1 bg-parchment rounded-md px-3 py-1 text-xs font-sans font-light text-muted-foreground">
              thestartofyou.com/journey
            </div>
          </div>

          {/* Inner app UI */}
          <div className="bg-card p-0">
            {/* App nav */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-parchment-dark">
              <span className="font-serif text-sm text-foreground">The Start of You</span>
              <nav className="flex gap-5">
                {["Overview", "Journal", "Resources", "Profile"].map((item, i) => (
                  <span key={item} className={`font-sans text-xs font-light cursor-pointer ${i === 0 ? "text-terracotta border-b border-terracotta pb-0.5" : "text-muted-foreground hover:text-foreground"}`}>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="w-7 h-7 rounded-full bg-sage flex items-center justify-center text-white text-xs font-sans">
                AS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Main content */}
              <div className="md:col-span-2 p-5 border-r border-parchment-dark">
                <p className="font-sans text-xs font-medium text-terracotta tracking-wider uppercase mb-1">WEEK 18</p>
                <h3 className="font-serif text-2xl text-foreground mb-1">Second Trimester</h3>
                <p className="font-sans text-xs font-light text-muted-foreground mb-5">Due date: 14 October 2025</p>

                {/* Progress */}
                <div className="bg-parchment rounded-xl p-4 mb-5">
                  <p className="font-sans text-xs font-light text-muted-foreground mb-2">Your Progress</p>
                  <div className="h-2 rounded-full bg-parchment-deeper overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-sage to-terracotta/60" style={{ width: "45%" }} />
                  </div>
                  <div className="flex justify-between font-sans text-xs font-light text-muted-foreground">
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
                  <div key={row.label} className="mb-4">
                    <p className="font-sans text-sm font-medium text-foreground mb-0.5">{row.label}</p>
                    <p className="font-sans text-xs font-light text-muted-foreground">{row.val}</p>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="p-5 flex flex-col gap-5">
                {/* Upcoming */}
                <div className="bg-sage-bg rounded-xl p-4">
                  <p className="font-sans text-xs font-medium tracking-wider uppercase text-sage mb-3">UPCOMING</p>
                  {[
                    { w: "Week 20", label: "Anatomy Scan" },
                    { w: "Week 24", label: "Viability Milestone" },
                    { w: "Week 28", label: "Third Trimester" },
                  ].map((item) => (
                    <div key={item.label} className="mb-2.5 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                      <div>
                        <p className="font-sans text-xs font-light text-muted-foreground">{item.w}</p>
                        <p className="font-sans text-xs font-medium text-foreground">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div>
                  <p className="font-sans text-xs font-medium tracking-wider uppercase text-muted-foreground mb-3">JOURNEY STATS</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: "18", label: "WEEKS" },
                      { val: "126", label: "DAYS" },
                      { val: "12", label: "JOURNAL ENTRIES" },
                      { val: "45%", label: "COMPLETE" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-parchment rounded-lg p-3 text-center">
                        <p className="font-serif text-lg text-terracotta">{stat.val}</p>
                        <p className="font-sans text-[10px] font-light text-muted-foreground tracking-wider">{stat.label}</p>
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
