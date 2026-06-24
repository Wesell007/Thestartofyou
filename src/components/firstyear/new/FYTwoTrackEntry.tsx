import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Track {
  anchor: string;
  eyebrow: string;
  title: string;
  desc: string;
  scope: string;
  chips: string[];
  cta: string;
  href: string;
  bg: string;
  soft: string;
  accent: string;
  deep: string;
}

const tracks: Track[] = [
  {
    anchor: "baby",
    eyebrow: "Track One",
    title: "Baby's first year",
    desc: "Feeding, sleep, milestones, routine shifts, and everything that changes month by month.",
    scope: "4 phases · 12 months · 4 topic clusters",
    chips: ["Sleep", "Feeding", "Milestones"],
    cta: "Enter baby track",
    href: "#baby",
    bg: "--stage-firstyear",
    soft: "--stage-firstyear-soft",
    accent: "--stage-firstyear-accent",
    deep: "--stage-firstyear-deep",
  },
  {
    anchor: "recovery",
    eyebrow: "Track Two",
    title: "Your postpartum recovery",
    desc: "Physical healing, hormones, emotional wellbeing, and the check-ups and warning signs to know.",
    scope: "Recovery beyond the first six weeks · 4 topic clusters",
    chips: ["Bleeding & healing", "Mood", "Hormones"],
    cta: "Enter recovery track",
    href: "#recovery",
    bg: "--stage-recovery",
    soft: "--stage-recovery-soft",
    accent: "--stage-recovery-accent",
    deep: "--stage-recovery-deep",
  },
];

const FYTwoTrackEntry = () => {
  return (
    <section id="two-track" className="bg-parchment py-14 md:py-24">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tracks.map((t) => (
            <article
              key={t.anchor}
              className="relative rounded-2xl border overflow-hidden flex flex-col p-7 sm:p-8"
              style={{
                backgroundColor: `hsl(var(${t.bg}) / 0.45)`,
                borderColor: `hsl(var(${t.accent}) / 0.18)`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: `hsl(var(${t.accent}) / 0.55)` }}
              />

              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                  style={{ color: `hsl(var(${t.deep}))` }}
                >
                  {t.eyebrow}
                </p>
                <span
                  className="font-sans text-[10px] font-light tracking-wider uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: `hsl(var(${t.deep}))`,
                    borderColor: `hsl(var(${t.accent}) / 0.25)`,
                    backgroundColor: `hsl(var(${t.soft}) / 0.4)`,
                  }}
                >
                  Medically reviewed
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-[1.75rem] text-foreground leading-tight mb-3">
                {t.title}
              </h3>
              <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed mb-5">
                {t.desc}
              </p>

              <p
                className="font-sans text-[11px] font-light tracking-wide uppercase mb-5"
                style={{ color: `hsl(var(${t.accent}) / 0.85)` }}
              >
                {t.scope}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {t.chips.map((c) => (
                  <span
                    key={c}
                    className="font-sans text-[12px] font-light px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: `hsl(var(${t.accent}) / 0.22)`,
                      color: `hsl(var(${t.deep}))`,
                      backgroundColor: 'hsl(var(--card) / 0.6)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <Link
                to={t.href}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-sans text-[13px] font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: `hsl(var(${t.deep}))`,
                  color: 'hsl(var(--card))',
                }}
              >
                {t.cta}
                <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FYTwoTrackEntry;
