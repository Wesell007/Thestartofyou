import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const IVFFinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 md:py-28" style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.12)' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left — CTA */}
          <div>
            {/* Colour trail */}
            <div className="flex items-center gap-1.5 mb-6">
              {[
                { var: '--stage-ttc-accent', w: 'w-4' },
                { var: '--stage-ivf-accent', w: 'w-12' },
                { var: '--stage-pregnancy-accent', w: 'w-4' },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full ${t.w}`}
                  style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 1 ? '0.7' : '0.2'})` }}
                />
              ))}
            </div>

            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ivf-accent))' }}
            >
              Begin Your Journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              Your IVF guide is ready
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6 max-w-md">
              Understand your stage, navigate the waiting, and find guidance that moves with you through every step.
            </p>

            {/* Stat chips */}
            <div className="flex items-center gap-5 mb-8">
              {[
                { n: "3", label: "stages" },
                { n: "14", label: "day wait" },
                { n: "1", label: "step at a time" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
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
                style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.25)', color: 'hsl(var(--foreground))' }}
              >
                Ask a question
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right — stage summary */}
          <div className="space-y-3">
            {[
              { num: "01", title: "Before transfer", desc: "Preparation, medication, your protocol" },
              { num: "02", title: "After transfer", desc: "The two-week wait and what to expect" },
              { num: "03", title: "Early pregnancy", desc: "Monitoring, scans, cautious progress" },
            ].map((stage) => (
              <div
                key={stage.num}
                className="rounded-xl px-5 py-4 border flex items-start gap-4"
                style={{
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.1)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.1)',
                }}
              >
                <span
                  className="font-serif text-lg select-none shrink-0"
                  style={{ color: 'hsl(var(--stage-ivf-accent) / 0.4)' }}
                >
                  {stage.num}
                </span>
                <div>
                  <p className="font-serif text-base text-foreground mb-0.5">{stage.title}</p>
                  <p className="font-sans text-xs font-light text-muted-foreground/60">{stage.desc}</p>
                </div>
              </div>
            ))}

            <p className="pt-3 font-serif italic text-sm text-foreground/40">
              One stage at a time, with clarity and care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFFinalCTA;
