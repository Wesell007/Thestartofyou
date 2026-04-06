import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const TTCFinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36" style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.22)' }}>
      {/* Ambient layers */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.25)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-3xl"
        style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.15)' }}
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left — statement */}
          <div>
            {/* Colour trail */}
            <div className="flex items-center gap-1.5 mb-5">
              {[
                { var: '--stage-ttc-accent', w: 'w-12' },
                { var: '--stage-pregnancy-accent', w: 'w-3' },
                { var: '--stage-ivf-accent', w: 'w-3' },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full ${t.w}`}
                  style={{ backgroundColor: `hsl(var(${t.var}) / ${i === 0 ? '0.7' : '0.15'})` }}
                />
              ))}
            </div>

            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Begin Your Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 leading-[1.08]">
              Your TTC guide is ready
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6">
              Three stages. One cycle at a time. Guidance that understands what this experience really feels like.
            </p>

            {/* Stat chips */}
            <div className="flex items-center gap-6 mb-8">
              {[
                { n: "3", label: "stages" },
                { n: "5–6", label: "fertile days" },
                { n: "~85%", label: "within a year" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-xl text-foreground leading-none">{s.n}</span>
                  <span className="font-sans text-[9px] font-light text-muted-foreground/55 uppercase tracking-widest mt-1">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/trying-to-conceive/understanding-your-cycle"
                className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Start your journey
                <ArrowUpRight size={15} />
              </Link>
              <Link
                to="/ovulation-calculator"
                className="inline-flex items-center gap-2 border rounded-pill px-6 py-4 font-sans text-sm font-light text-foreground hover:bg-parchment transition-all"
                style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.25)' }}
              >
                <ArrowRight size={14} />
                Try the calculator
              </Link>
            </div>
          </div>

          {/* Right — emotional closing */}
          <div className="flex flex-col gap-4">
            {[
              { label: "Stage 01", text: "Understand your cycle", desc: "The foundation" },
              { label: "Stage 02", text: "Time with intention", desc: "Not perfection" },
              { label: "Stage 03", text: "Wait with support", desc: "Not alone" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5 border flex items-start gap-4"
                style={{
                  backgroundColor: 'hsl(var(--stage-ttc) / 0.12)',
                  borderColor: 'hsl(var(--stage-ttc-accent) / 0.1)',
                }}
              >
                <span
                  className="font-serif text-2xl leading-none shrink-0"
                  style={{ color: 'hsl(var(--stage-ttc-accent) / 0.35)' }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-base text-foreground leading-snug">{item.text}</p>
                  <p className="font-sans text-xs font-light text-muted-foreground/55 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}

            <p className="font-serif italic text-sm text-muted-foreground/45 mt-2 text-center">
              One cycle at a time, from the very beginning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCFinalCTA;
