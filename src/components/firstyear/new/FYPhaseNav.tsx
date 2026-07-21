import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";

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
  { label: "Newborn", href: "/first-year/newborn" },
  { label: "1 month", href: "/first-year/1-month" },
  { label: "2 months", href: "/first-year/2-months" },
  { label: "3 months", href: "/first-year/3-months" },
  { label: "4 months", href: "/first-year/4-months" },
  { label: "5 months", href: "/first-year/5-months" },
  { label: "6 months", href: "/first-year/6-months" },
  { label: "7 months", href: "/first-year/7-months" },
  { label: "8 months", href: "/first-year/8-months" },
  { label: "9 months", href: "/first-year/9-months" },
  { label: "10 months", href: "/first-year/10-months" },
  { label: "11 months", href: "/first-year/11-months" },
  { label: "12 months", href: "/first-year/12-months" },
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

        {/* Mobile: horizontal snap carousel. md+: 2x2 / 4-up grid */}
        <div className="-mx-5 sm:mx-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 px-5 sm:px-0 md:px-0 items-stretch">
            {phases.map((p) => (
              <Link
                key={p.num}
                to={p.href}
                className="group relative snap-start shrink-0 w-[78%] sm:w-[58%] md:w-auto rounded-[22px] border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(20,30,60,0.28)] flex"
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

        {/* Secondary quick navigation */}
        <div className="mt-16 md:mt-20">
          <div
            className="h-px w-full mb-10"
            style={{ backgroundColor: "hsl(var(--border) / 0.55)" }}
          />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-3 text-foreground/45">
            Month by month
          </p>
          <h3 className="font-serif text-xl sm:text-[1.4rem] text-foreground leading-snug mb-2">
            Your baby's first year, month by month.
          </h3>
          <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed max-w-xl mb-6">
            Choose your baby's age for a deeper guide to development, feeding, sleep, care and how this stage may feel for you.
          </p>
          <div className="flex flex-wrap gap-2">
            {ageItems.map((a) => (
              <Link
                key={a.label}
                to={a.href}
                className="inline-flex items-center justify-center rounded-full px-4 min-h-[36px] font-sans text-[12px] font-light border transition-all hover:-translate-y-[1px]"
                style={{
                  backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.38)",
                  color: "hsl(var(--stage-firstyear-deep))",
                  borderColor: "hsl(var(--stage-firstyear-accent) / 0.24)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--stage-firstyear-soft) / 0.65)";
                  e.currentTarget.style.borderColor = "hsl(var(--stage-firstyear-accent) / 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--stage-firstyear-soft) / 0.38)";
                  e.currentTarget.style.borderColor = "hsl(var(--stage-firstyear-accent) / 0.24)";
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
