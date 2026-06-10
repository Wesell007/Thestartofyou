import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, NotebookPen } from "lucide-react";

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

          {/* Right — quiet editorial closing panel */}
          <div
            className="relative rounded-[1.75rem] border p-7 sm:p-9 overflow-hidden"
            style={{
              backgroundColor: 'hsl(var(--stage-ivf) / 0.08)',
              borderColor: 'hsl(var(--stage-ivf-accent) / 0.16)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-70"
              style={{ background: 'hsl(var(--stage-ivf) / 0.45)' }}
            />

            {/* Colour trail repeated */}
            <div className="relative flex items-center gap-1.5 mb-6">
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
              className="relative font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ivf-accent))' }}
            >
              A quiet note
            </p>
            <p className="relative font-serif italic text-lg sm:text-xl text-foreground/80 leading-snug mb-5">
              "IVF asks you to hold a lot at once. You don't have to carry it all in your head."
            </p>
            <div
              className="relative h-px w-10 mb-5"
              style={{ background: 'hsl(var(--stage-ivf-accent) / 0.35)' }}
            />
            <p className="relative font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-5">
              Some people find it helps to keep their appointments, questions, and the things this stage stirs up somewhere gentle and private.
            </p>
            <Link
              to="/journal"
              className="relative inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium transition-colors"
              style={{ color: 'hsl(var(--stage-ivf-accent))' }}
            >
              <NotebookPen size={12} />
              Hold your IVF journey
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFFinalCTA;
