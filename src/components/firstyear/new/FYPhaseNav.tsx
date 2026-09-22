import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import phaseZeroThree from "@/assets/firstyear-stage-0-3.jpg";
import phaseThreeSix from "@/assets/firstyear-stage-3-6.jpg";
import phaseSixNine from "@/assets/firstyear-stage-6-9.jpg";
import phaseNineTwelve from "@/assets/firstyear-stage-9-12.jpg";

const phases = [
  {
    num: "01",
    title: "0–3 months",
    baby: "Newborn rhythms, feeding, early sleep cues",
    you: "Bleeding, healing, early mood shifts",
    href: "/first-year/0-3-months",
    image: phaseZeroThree,
  },
  {
    num: "02",
    title: "3–6 months",
    baby: "Interaction, emerging routines, first foods",
    you: "Hormone shifts, energy returning unevenly",
    href: "/first-year/3-6-months",
    image: phaseThreeSix,
  },
  {
    num: "03",
    title: "6–9 months",
    baby: "Movement, curiosity, sleep regressions",
    you: "Pelvic floor, ongoing mood and identity shifts",
    href: "/first-year/6-9-months",
    image: phaseSixNine,
  },
  {
    num: "04",
    title: "9–12 months",
    baby: "Mobility, personality, transitions",
    you: "Long-arc recovery, cycles, intimacy",
    href: "/first-year/9-12-months",
    image: phaseNineTwelve,
  },
];

const FYPhaseNav = () => {
  return (
    <section id="phases" className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="mb-9 md:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.55)' }} />
            <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.55)' }} />
            <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
              Month by month
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Twelve months, four phases.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-xl">
            What's likely happening for your baby, and for you, in each phase of the year.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 items-stretch">
            {phases.map((p) => (
              <Link
                key={p.num}
                to={p.href}
                className="group relative rounded-lg border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(20,30,60,0.28)] flex flex-col"
                style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.16)' }}
              >
                {/* Soft First Year bloom top-left */}
                <div
                  className="absolute -top-14 -left-14 w-40 h-40 rounded-full blur-3xl opacity-70 pointer-events-none"
                  style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.55)' }}
                  aria-hidden
                />
                {/* Dual-tone base wash — baby left, recovery right */}
                <div className="absolute inset-0 grid grid-cols-2 pointer-events-none">
                  <div style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.22)' }} />
                  <div style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.18)' }} />
                </div>
                {/* Inner highlight */}
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.7), transparent)' }}
                  aria-hidden
                />

                <img src={p.image} alt="" loading="lazy" className="relative aspect-[4/3] w-full object-cover" />
                <div className="relative p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-sans text-[10px] font-light tracking-[0.24em] uppercase"
                      style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
                    >
                      Phase {p.num}
                    </span>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center border transition-all group-hover:translate-x-0.5"
                      style={{
                        borderColor: 'hsl(var(--stage-firstyear-accent) / 0.3)',
                        backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.65)',
                      }}
                    >
                      <ChevronRight size={12} style={{ color: 'hsl(var(--stage-firstyear-deep))' }} />
                    </span>
                  </div>
                  <h3 className="font-serif text-[1.25rem] text-foreground leading-snug mb-4">{p.title}</h3>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <div className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent))' }}
                      />
                      <div>
                        <p className="font-sans text-[10px] font-light tracking-wider uppercase mb-0.5" style={{ color: 'hsl(var(--stage-firstyear-deep))' }}>For your baby</p>
                        <p className="font-sans text-[13px] font-light text-foreground/85 leading-snug">{p.baby}</p>
                      </div>
                    </div>
                    <div
                      className="flex items-start gap-2.5 pt-3 border-t"
                      style={{ borderColor: 'hsl(var(--border) / 0.45)' }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'hsl(var(--stage-recovery-accent))' }}
                      />
                      <div>
                        <p className="font-sans text-[10px] font-light tracking-wider uppercase mb-0.5" style={{ color: 'hsl(var(--stage-recovery-deep))' }}>For you</p>
                        <p className="font-sans text-[13px] font-light text-foreground/75 leading-snug">{p.you}</p>
                      </div>
                    </div>
                  </div>

                  <span className="mt-auto inline-flex items-center gap-1 font-sans text-[11px] font-light text-foreground/65 group-hover:text-foreground/90 transition-colors">
                    Open phase <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FYPhaseNav;
