import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Track {
  anchor: string;
  eyebrow: string;
  title: string;
  desc: string;
  scope: string;
  inside: string[];
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
    eyebrow: "For your baby",
    title: "Baby's first year",
    desc: "Feeding, sleep and the milestones of the first twelve months.",
    scope: "",
    inside: ["Feeding", "Sleep", "Development", "Care & safety"],
    cta: "Open baby's first year",
    href: "#baby",
    bg: "--stage-firstyear",
    soft: "--stage-firstyear-soft",
    accent: "--stage-firstyear-accent",
    deep: "--stage-firstyear-deep",
  },
  {
    anchor: "recovery",
    eyebrow: "For you",
    title: "Your postpartum recovery",
    desc: "Healing, hormones and how you feel in the months after birth.",
    scope: "",
    inside: ["Physical recovery", "Emotional wellbeing", "Body & hormones", "Check-ups & red flags"],
    cta: "Open your recovery",
    href: "#recovery",
    bg: "--stage-recovery",
    soft: "--stage-recovery-soft",
    accent: "--stage-recovery-accent",
    deep: "--stage-recovery-deep",
  },
];

const FYTwoTrackEntry = () => {
  return (
    <section id="two-track" className="bg-parchment pt-4 pb-14 md:pt-6 md:pb-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tracks.map((t) => (
            <article
              key={t.anchor}
              className="relative rounded-2xl border overflow-hidden flex flex-col p-7 sm:p-8 md:p-9"
              style={{
                backgroundColor: `hsl(var(${t.bg}) / 0.5)`,
                borderColor: `hsl(var(${t.accent}) / 0.22)`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: `hsl(var(${t.accent}) / 0.55)` }}
              />

              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                  style={{ color: `hsl(var(${t.deep}))` }}
                >
                  {t.eyebrow}
                </p>
                <span
                  className="font-sans text-[10px] font-light tracking-wider uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    color: `hsl(var(${t.deep}) / 0.75)`,
                    borderColor: `hsl(var(${t.accent}) / 0.18)`,
                  }}
                >
                  Medically reviewed
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-[1.75rem] text-foreground leading-tight mb-3">
                {t.title}
              </h3>
              <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed mb-6">
                {t.desc}
              </p>

              <ul className="space-y-2 mb-7">
                {t.inside.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 font-sans text-[13px] font-light text-foreground/85"
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: `hsl(var(${t.accent}))` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

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
