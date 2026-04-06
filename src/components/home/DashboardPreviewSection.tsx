import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPreviewSection = () => {
  return (
    <section className="relative bg-lavender-bg section-spacing overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-lavender/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-lavender/40 pointer-events-none hidden sm:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="editorial-rule mb-6 md:mb-8" style={{ background: 'hsl(var(--lavender))' }} />
          <p className="stage-label mb-4 md:mb-5">Your Dashboard</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-lavender-foreground mb-4 md:mb-6">
            Everything you need, in one place
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-lavender-foreground/60 max-w-xl mx-auto leading-relaxed">
            Your personal dashboard organises weekly guidance, milestone tracking, reflection prompts, and curated resources, updated every week.
          </p>
        </div>

        {/* Browser mockup */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-elevated border border-border/15 bg-card mx-auto max-w-4xl transform md:scale-[1.03] transition-transform">
          {/* Browser chrome */}
          <div className="bg-parchment-dark px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-2 border-b border-border/20">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-sage/30" />
            <div className="ml-4 flex-1 bg-parchment rounded-lg px-4 py-1.5 text-[10px] sm:text-xs font-sans font-light text-muted-foreground/60 truncate">
              thestartofyou.com/journey
            </div>
          </div>

          {/* Inner app UI */}
          <div className="bg-card">
            {/* App nav */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-border/20">
              <span className="font-serif text-xs sm:text-sm text-foreground">The Start of You</span>
              <nav className="hidden sm:flex gap-5 md:gap-7">
                {["Overview", "Journal", "Resources", "Profile"].map((item, i) => (
                  <span key={item} className={`font-sans text-[10px] sm:text-[11px] font-light cursor-pointer transition-colors ${i === 0 ? "text-terracotta border-b border-terracotta pb-0.5" : "text-muted-foreground/60"}`}>
                    {item}
                  </span>
                ))}
              </nav>
              <div className="w-7 h-7 rounded-full bg-sage/80 flex items-center justify-center text-[10px] font-sans font-medium" style={{ color: 'hsl(var(--primary-foreground))' }}>
                AS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Main content */}
              <div className="md:col-span-2 p-5 sm:p-7 md:border-r border-border/20">
                <div className="flex items-center gap-3 mb-1.5">
                  <p className="font-sans text-[10px] font-medium text-terracotta/80 tracking-[0.2em] uppercase">WEEK 18</p>
                  <span className="px-2 py-0.5 rounded-pill bg-sage/10 text-sage font-sans text-[9px] font-medium">Second Trimester</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-foreground mb-1">Your week at a glance</h3>
                <p className="font-sans text-[11px] font-light text-muted-foreground/60 mb-5 sm:mb-7">Due date: 14 October 2025</p>

                {/* Progress */}
                <div className="bg-parchment rounded-xl p-4 sm:p-5 mb-5 sm:mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-sans text-[10px] font-light text-muted-foreground/60">Your Progress</p>
                    <p className="font-sans text-[10px] font-medium text-terracotta/70">45%</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-parchment-dark overflow-hidden mb-3">
                    <div className="h-full rounded-full bg-gradient-to-r from-sage to-terracotta/60 transition-all" style={{ width: "45%" }} />
                  </div>
                  <div className="flex justify-between font-sans text-[10px] font-light text-muted-foreground/50">
                    <span>18 weeks completed</span>
                    <span>22 weeks remaining</span>
                  </div>
                </div>

                {/* Info rows with subtle left border accents */}
                {[
                  { label: "This Week's Development", val: "Baby's bones are hardening and facial features continue to develop", color: "border-sage/40" },
                  { label: "Body Changes", val: "Increased energy and possible quickening movements", color: "border-lavender/40" },
                  { label: "This Week's Focus", val: "Consider starting birth preference discussions", color: "border-terracotta/40" },
                ].map((row) => (
                  <div key={row.label} className={`mb-4 sm:mb-5 pl-4 border-l-2 ${row.color}`}>
                    <p className="font-sans text-[12px] sm:text-[13px] font-medium text-foreground mb-1">{row.label}</p>
                    <p className="font-sans text-[11px] font-light text-muted-foreground/70 leading-relaxed">{row.val}</p>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="p-5 sm:p-6 flex flex-col gap-5 sm:gap-7 border-t md:border-t-0 border-border/20">
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

        {/* Supporting trust line */}
        <div className="text-center mt-8 md:mt-12">
          <p className="font-sans text-xs font-light text-lavender-foreground/40 mb-4">
            Your dashboard updates every Sunday with personalised guidance for your current week.
          </p>
          <Link
            to="/due-date-calculator"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-terracotta hover:text-terracotta-hover transition-colors"
          >
            Try it with your due date
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;
