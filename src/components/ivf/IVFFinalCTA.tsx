import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const IVFFinalCTA = () => {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.05)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        {/* Colour trail */}
        <div className="flex items-center gap-1.5 mb-8">
          {[
            { var: '--stage-ttc-accent', w: 'w-5' },
            { var: '--stage-ivf-accent', w: 'w-14' },
            { var: '--stage-pregnancy-accent', w: 'w-5' },
          ].map((t, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full ${t.w}`}
              style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 1 ? '0.7' : '0.2'})` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Left — CTA */}
          <div>
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
              Begin Your Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground mb-4 leading-[1.08]">
              Your IVF guide<br />
              <span className="italic">is ready</span>
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7 max-w-md">
              Understand your stage, navigate the waiting, and find guidance that moves with you through every step.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                to="/ivf/before-transfer"
                className="inline-flex items-center justify-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Start your journey
                <ArrowUpRight size={15} />
              </Link>
              <Link
                to="/ask"
                className="inline-flex items-center justify-center gap-2 border rounded-pill px-7 py-3.5 font-sans text-sm font-light transition-all hover:bg-parchment-dark"
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.25)' }}
              >
                Ask a question
                <ArrowRight size={14} />
              </Link>
            </div>

            <p className="font-serif italic text-sm text-foreground/35">
              One stage at a time, with clarity and care.
            </p>
          </div>

          {/* Right — stage summary */}
          <div className="space-y-3">
            {[
              { num: "01", title: "Before transfer", desc: "Preparation, medication, your protocol", emotional: "Focus" },
              { num: "02", title: "After transfer", desc: "The two-week wait and what to expect", emotional: "Patience" },
              { num: "03", title: "Early pregnancy", desc: "Monitoring, scans, cautious progress", emotional: "Hope" },
            ].map((stage) => (
              <Link
                key={stage.num}
                to={`/ivf/${stage.title.toLowerCase().replace(/ /g, '-')}`}
                className="group rounded-xl px-5 py-4 border flex items-start gap-4 transition-all hover:shadow-card-brand"
                style={{
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.08)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.1)'}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.2)' }}
                >
                  <span className="font-serif text-sm" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.6)' }}>{stage.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-base text-foreground group-hover:text-foreground/80 transition-colors">{stage.title}</p>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: 'hsl(var(--stage-ivf-accent))' }} />
                  </div>
                  <p className="font-sans text-xs font-light text-muted-foreground/55">{stage.desc}</p>
                </div>
                <span
                  className="font-sans text-[9px] font-light tracking-[0.1em] uppercase rounded-full px-2.5 py-1 shrink-0 self-center hidden sm:block"
                  style={{
                    backgroundColor: 'hsl(var(--stage-ivf) / 0.15)',
                    color: 'hsl(var(--stage-ivf-accent) / 0.7)',
                  }}
                >
                  {stage.emotional}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFFinalCTA;
