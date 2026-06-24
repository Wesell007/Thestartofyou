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

// Secondary quick-navigation strip — supports the four phase cards, never replaces them.
const ageItems: { label: string; href: string }[] = [
  { label: "Newborn", href: "/first-year/0-3-months" },
  { label: "1 month", href: "/first-year/0-3-months" },
  { label: "2 months", href: "/first-year/0-3-months" },
  { label: "3 months", href: "/first-year/0-3-months" },
  { label: "4 months", href: "/first-year/3-6-months" },
  { label: "5 months", href: "/first-year/3-6-months" },
  { label: "6 months", href: "/first-year/3-6-months" },
  { label: "7 months", href: "/first-year/6-9-months" },
  { label: "8 months", href: "/first-year/6-9-months" },
  { label: "9 months", href: "/first-year/6-9-months" },
  { label: "10 months", href: "/first-year/9-12-months" },
  { label: "11 months", href: "/first-year/9-12-months" },
  { label: "12 months", href: "/first-year/9-12-months" },
];

const FYPhaseNav = () => {
  return (
    <section id="phases" className="bg-parchment py-14 md:py-16">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="mb-8 md:mb-10">
          <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3 text-foreground/55">
            Month by month
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Twelve months, four phases.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-xl">
            What's likely happening for your baby, and for you, in each phase of the year.
          </p>
        </div>

        {/* Mobile: horizontal snap carousel. md+: 2x2 / 4-up grid */}
        <div className="-mx-5 sm:mx-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 sm:px-0 md:px-0">
            {phases.map((p) => (
              <Link
                key={p.num}
                to={p.href}
                className="group relative snap-start shrink-0 w-[78%] sm:w-[58%] md:w-auto rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-soft"
                style={{ borderColor: 'hsl(var(--border) / 0.7)' }}
              >
                {/* Dual-tone tinted background — baby left, recovery right */}
                <div className="absolute inset-0 grid grid-cols-2 pointer-events-none">
                  <div style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.35)' }} />
                  <div style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.3)' }} />
                </div>

                <div className="relative p-6 flex flex-col">
                  <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-3 text-foreground/55">
                    Phase {p.num}
                  </span>
                  <h3 className="font-serif text-xl text-foreground leading-snug mb-4">{p.title}</h3>

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
                      style={{ borderColor: 'hsl(var(--border) / 0.5)' }}
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

                  <span className="mt-auto inline-flex items-center gap-1 font-sans text-[11px] font-light opacity-60 group-hover:opacity-100 transition-opacity text-foreground/70">
                    Open phase <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary quick navigation — generously spaced from the cards above */}
        <div className="mt-16 md:mt-20">
          <div
            className="h-px w-full mb-10"
            style={{ backgroundColor: "hsl(var(--border) / 0.6)" }}
          />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-3 text-foreground/45">
            Quick navigation
          </p>
          <h3 className="font-serif text-xl sm:text-[1.4rem] text-foreground leading-snug mb-2">
            Go to your baby's age.
          </h3>
          <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed max-w-xl mb-6">
            Use this as a quick way into the phase that fits where you are now.
          </p>
          <div className="flex flex-wrap gap-2">
            {ageItems.map((a) => (
              <Link
                key={a.label}
                to={a.href}
                className="inline-flex items-center justify-center rounded-full px-4 min-h-[36px] font-sans text-[12px] font-light border transition-colors"
                style={{
                  backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.32)",
                  color: "hsl(var(--stage-firstyear-deep))",
                  borderColor: "hsl(var(--stage-firstyear-accent) / 0.22)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--stage-firstyear-soft) / 0.55)";
                  e.currentTarget.style.borderColor = "hsl(var(--stage-firstyear-accent) / 0.36)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--stage-firstyear-soft) / 0.32)";
                  e.currentTarget.style.borderColor = "hsl(var(--stage-firstyear-accent) / 0.22)";
                }}
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYPhaseNav;
