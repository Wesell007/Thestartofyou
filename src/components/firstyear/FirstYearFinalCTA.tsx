import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const stages = [
  { num: "01", title: "0–3 months", note: "Adjustment and early patterns", months: "Newborn–3m", keywords: ["Survival", "Bonding"] },
  { num: "02", title: "3–6 months", note: "Interaction and rhythm", months: "3–6m", keywords: ["Interaction", "Pattern"] },
  { num: "03", title: "6–9 months", note: "Curiosity and movement", months: "6–9m", keywords: ["Curiosity", "Movement"] },
  { num: "04", title: "9–12 months", note: "Independence and growth", months: "9–12m", keywords: ["Independence", "Growth"] },
];

const FirstYearFinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28" style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.14)' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.2)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — CTA */}
          <div>
            {/* Colour trail */}
            <div className="flex items-center gap-1.5 mb-6">
              {[
                { var: '--stage-postpartum-accent', w: 'w-4' },
                { var: '--stage-firstyear-accent', w: 'w-14' },
                { var: '--stage-preparing-accent', w: 'w-4' },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full ${t.w}`}
                  style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 1 ? '0.6' : '0.2'})` }}
                />
              ))}
            </div>

            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4" style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>
              Your Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 leading-tight">
              Start wherever you are. Every phase is the right one.
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6 max-w-md">
              Four phases of growth, development, and change. You don't have to figure it all out at once. Just start.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-6">
              <Link
                to="/first-year/0-3-months"
                className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Start your journey
                <ArrowUpRight size={15} />
              </Link>
              <Link
                to="/pregnancy"
                className="inline-flex items-center gap-2 border border-foreground/12 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
              >
                Explore all stages
              </Link>
            </div>

            <div className="pl-5 border-l-2" style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.25)' }}>
              <p className="font-serif italic text-sm text-foreground/45">
                One phase at a time. Growing together.
              </p>
            </div>
          </div>

          {/* Right — stage summary cards */}
          <div className="space-y-3">
            {stages.map((s, i) => (
              <Link
                key={i}
                to={`/first-year/${s.title.replace(/\s/g, '-').toLowerCase()}`}
                className="rounded-xl p-5 border border-border/20 flex items-center gap-4 transition-all hover:shadow-soft group block"
                style={{ backgroundColor: `hsl(var(--stage-firstyear) / ${0.16 - i * 0.02})` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-serif text-sm border"
                  style={{
                    backgroundColor: 'hsl(var(--stage-firstyear) / 0.3)',
                    borderColor: 'hsl(var(--stage-firstyear-accent) / 0.2)',
                    color: 'hsl(var(--stage-firstyear-accent))',
                  }}
                >
                  {s.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-serif text-base text-foreground leading-snug">{s.title}</p>
                    <div className="flex gap-1.5 shrink-0">
                      {s.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="font-sans text-[8px] font-light uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: 'hsl(var(--stage-firstyear) / 0.15)',
                            color: 'hsl(var(--stage-firstyear-accent) / 0.6)',
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="font-sans text-xs font-light text-muted-foreground/70">{s.note}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearFinalCTA;
