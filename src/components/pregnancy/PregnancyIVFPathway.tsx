import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Compass } from "lucide-react";

const PregnancyIVFPathway = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="h-px w-10"
            style={{ backgroundColor: "hsl(var(--stage-ivf-accent) / 0.55)" }}
          />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Pregnant after IVF?
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          If this pregnancy began through IVF
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8 max-w-xl">
          If this pregnancy began through IVF or fertility treatment, you may want guidance that
          understands that part of the story too.
        </p>

        <div
          className="relative rounded-[22px] border overflow-hidden p-6 sm:p-8"
          style={{
            borderColor: "hsl(var(--stage-ivf-accent) / 0.28)",
            background:
              "linear-gradient(135deg, hsl(var(--stage-ivf) / 0.45) 0%, hsl(var(--stage-ivf) / 0.22) 100%)",
          }}
        >
          <span
            aria-hidden
            className="absolute top-0 left-0 h-full w-1"
            style={{ backgroundColor: "hsl(var(--stage-ivf-accent))" }}
          />

          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-ivf-accent))" }}
          >
            Connected hub
          </p>
          <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3">
            IVF and early pregnancy support
          </h3>
          <p
            className="font-sans text-[14px] font-light leading-[1.7] mb-6 max-w-xl"
            style={{ color: "hsl(var(--foreground) / 0.85)" }}
          >
            A calm IVF hub covering treatment timelines, transfer preparation, the two-week wait and
            early pregnancy after IVF.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link
              to="/ivf"
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-[13px] font-medium transition-all hover:-translate-y-[1px]"
              style={{
                backgroundColor: "hsl(var(--stage-ivf-accent))",
                color: "hsl(var(--card))",
              }}
            >
              <Sparkles size={13} strokeWidth={1.9} />
              Go to IVF hub
              <ArrowUpRight size={12} />
            </Link>
            <Link
              to="/ivf-timeline"
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-[13px] font-medium border transition-all hover:-translate-y-[1px]"
              style={{
                borderColor: "hsl(var(--stage-ivf-accent) / 0.35)",
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--stage-ivf-accent))",
              }}
            >
              <Compass size={13} strokeWidth={1.9} />
              View IVF timeline
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyIVFPathway;
