import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const TTCIVFPathway = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="relative rounded-3xl border-2 overflow-hidden"
          style={{
            borderColor: "hsl(var(--stage-ivf-accent) / 0.35)",
            backgroundColor: "hsl(var(--stage-ivf) / 0.35)",
          }}
        >
          {/* Botanical arrow visual */}
          <div
            aria-hidden
            className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: "hsl(var(--stage-ivf-accent) / 0.18)" }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 p-8 sm:p-10 md:p-14">
            <div className="md:col-span-3 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="h-px w-8"
                  style={{ backgroundColor: "hsl(var(--stage-ivf-accent) / 0.6)" }}
                />
                <span
                  className="font-sans text-[11px] font-medium tracking-[0.24em] uppercase"
                  style={{ color: "hsl(var(--stage-ivf-accent))" }}
                >
                  Treatment pathway
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground leading-tight tracking-[-0.01em] mb-4">
                When treatment becomes part of the conversation
              </h2>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-3 max-w-xl">
                If you are starting to think about fertility treatment or IVF, this connected hub
                gives you a calmer place to understand timelines, transfer preparation, the IVF
                two-week wait and early pregnancy after IVF.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-7">
                <Link
                  to="/ivf"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[13.5px] font-medium transition-all hover:-translate-y-[1px]"
                  style={{
                    backgroundColor: "hsl(var(--stage-ivf-accent))",
                    color: "hsl(var(--card))",
                  }}
                >
                  <Sparkles size={14} strokeWidth={1.8} />
                  Go to IVF hub
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Right side — pathway visual */}
            <div className="md:col-span-2 flex items-center justify-center">
              <div
                className="w-full max-w-[260px] rounded-2xl p-6 border"
                style={{
                  borderColor: "hsl(var(--stage-ivf-accent) / 0.28)",
                  backgroundColor: "hsl(var(--card))",
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "hsl(var(--stage-ivf) / 0.7)" }}
                >
                  <Sparkles
                    size={18}
                    style={{ color: "hsl(var(--stage-ivf-accent))" }}
                    strokeWidth={1.8}
                  />
                </div>
                <p className="font-serif text-[15px] text-foreground leading-snug mb-2">
                  A separate, calmer guide
                </p>
                <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed">
                  Treatment timelines, transfer preparation and IVF-specific support in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCIVFPathway;
