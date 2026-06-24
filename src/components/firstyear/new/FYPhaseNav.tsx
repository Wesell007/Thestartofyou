import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const phases = [
  {
    num: "01",
    title: "0–3 months",
    baby: "Newborn rhythms, feeding, early sleep cues",
    you: "Bleeding, healing, early mood shifts",
    href: "/first-year/0-3-months",
  },
  {
    num: "02",
    title: "3–6 months",
    baby: "Interaction, emerging routines, first foods",
    you: "Hormone shifts, energy returning unevenly",
    href: "/first-year/3-6-months",
  },
  {
    num: "03",
    title: "6–9 months",
    baby: "Movement, curiosity, sleep regressions",
    you: "Pelvic floor, ongoing mood and identity shifts",
    href: "/first-year/6-9-months",
  },
  {
    num: "04",
    title: "9–12 months",
    baby: "Mobility, personality, transitions",
    you: "Long-arc recovery, cycles, intimacy",
    href: "/first-year/9-12-months",
  },
];

const FYPhaseNav = () => {
  return (
    <section id="phases" className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="mb-8 md:mb-10">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3"
            style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
          >
            Month by month
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Four phases. Both of you.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-2xl">
            Each phase is shaped around your baby's development, with a quiet line of what's likely happening for you too.
          </p>
        </div>

        {/* Mobile: horizontal snap carousel. md+: 2x2 / 4-up grid */}
        <div className="-mx-5 sm:mx-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 sm:px-0 md:px-0">
            {phases.map((p) => (
              <Link
                key={p.num}
                to={p.href}
                className="group snap-start shrink-0 w-[78%] sm:w-[58%] md:w-auto rounded-2xl border bg-card p-6 flex flex-col transition-all hover:shadow-soft"
                style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.18)' }}
              >
                <span
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                >
                  Phase {p.num}
                </span>
                <h3 className="font-serif text-xl text-foreground leading-snug mb-4">{p.title}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent))' }}
                    />
                    <div>
                      <p className="font-sans text-[10px] font-light tracking-wider uppercase mb-0.5" style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>Baby</p>
                      <p className="font-sans text-[13px] font-light text-foreground/85 leading-snug">{p.baby}</p>
                    </div>
                  </div>
                  <div
                    className="flex items-start gap-2.5 pt-3 border-t"
                    style={{ borderColor: 'hsl(var(--stage-recovery-accent) / 0.18)' }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-recovery-accent))' }}
                    />
                    <div>
                      <p className="font-sans text-[10px] font-light tracking-wider uppercase mb-0.5" style={{ color: 'hsl(var(--stage-recovery-accent))' }}>For you</p>
                      <p className="font-sans text-[13px] font-light text-foreground/70 leading-snug">{p.you}</p>
                    </div>
                  </div>
                </div>

                <span className="mt-auto inline-flex items-center gap-1 font-sans text-[11px] font-light opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'hsl(var(--stage-firstyear-deep))' }}>
                  Open phase <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYPhaseNav;
