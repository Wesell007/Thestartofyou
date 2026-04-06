import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import trimesterFirstImg from "@/assets/trimester-first.jpg";
import trimesterSecondImg from "@/assets/trimester-second.jpg";
import trimesterThirdImg from "@/assets/trimester-third.jpg";

const trimesters = [
  {
    label: "First Trimester",
    range: "Weeks 1-12",
    sub: "Foundation & Early Development",
    desc: "The invisible beginning. Intense biological shifts, often before you know it's happening.",
    href: "/pregnancy/first-trimester",
    start: 1,
    end: 12,
    image: trimesterFirstImg,
    stageVar: "--stage-ttc",
    accentVar: "--stage-ttc-accent",
  },
  {
    label: "Second Trimester",
    range: "Weeks 13-27",
    sub: "Growth & Increasing Awareness",
    desc: "Relief and new questions. Your body changes visibly and your baby becomes more present.",
    href: "/pregnancy/second-trimester",
    start: 13,
    end: 27,
    image: trimesterSecondImg,
    stageVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
  },
  {
    label: "Third Trimester",
    range: "Weeks 28-40",
    sub: "Preparation & Arrival",
    desc: "The quiet intensity of waiting. Preparation meets anticipation as the journey nears its end.",
    href: "/pregnancy/third-trimester",
    start: 28,
    end: 40,
    image: trimesterThirdImg,
    stageVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
  },
];

const milestones = [
  { week: 1, label: "Wk 1" },
  { week: 6 },
  { week: 12, label: "Wk 12" },
  { week: 16 },
  { week: 20 },
  { week: 27, label: "Wk 27" },
  { week: 28 },
  { week: 32 },
  { week: 36 },
  { week: 40, label: "Wk 40" },
];

const getWeekPercent = (week: number) => ((week - 1) / 39) * 100;

const PregnancyTimeline = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            The Full Journey
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 leading-tight">
            Your pregnancy timeline
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Forty weeks, three trimesters, one continuous journey.
          </p>
        </div>

        {/* Timeline track — desktop only */}
        <div className="hidden sm:block mb-14">
          {/* Trimester labels */}
          <div className="grid grid-cols-3 gap-1 mb-3 text-center">
            {trimesters.map((t) => (
              <p
                key={t.label}
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                style={{ color: `hsl(var(${t.accentVar}) / 0.8)` }}
              >
                {t.label}
              </p>
            ))}
          </div>

          <div className="relative h-20 select-none">
            {/* Trimester zones — taller, more visible */}
            <div
              className="absolute left-0 right-0 flex rounded-xl overflow-hidden"
              style={{ top: "30%", bottom: "30%" }}
            >
              {trimesters.map((t) => (
                <div
                  key={t.label}
                  style={{
                    width: `${((t.end - t.start + 1) / 40) * 100}%`,
                    backgroundColor: `hsl(var(${t.stageVar}) / 0.7)`,
                  }}
                />
              ))}
            </div>

            {/* Connector line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-foreground/10 -translate-y-1/2" />

            {/* Milestone dots */}
            {milestones.map((m) => (
              <div
                key={m.week}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${getWeekPercent(m.week)}%` }}
              >
                <div className="w-2.5 h-2.5 rounded-full border border-foreground/20 bg-card" />
                {m.label && (
                  <p className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-[10px] font-light text-muted-foreground whitespace-nowrap">
                    {m.label}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Sub labels */}
          <div className="grid grid-cols-3 gap-1 mt-4 text-center">
            {trimesters.map((t) => (
              <p key={t.sub} className="font-serif italic text-sm text-muted-foreground/70">
                {t.sub}
              </p>
            ))}
          </div>
        </div>

        {/* Trimester cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {trimesters.map((t, i) => (
            <Link
              key={t.label}
              to={t.href}
              className="group bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card-brand flex flex-col hover:shadow-soft hover:border-border transition-all duration-300"
            >
              {/* Accent bar */}
              <div
                className="h-1"
                style={{ backgroundColor: `hsl(var(${t.accentVar}) / 0.5)` }}
              />
              <div className="h-36 sm:h-40 overflow-hidden relative">
                <img
                  src={t.image}
                  alt={t.label}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                    style={{ color: `hsl(var(${t.accentVar}))` }}
                  >
                    {t.range}
                  </span>
                  <span
                    className="font-serif text-lg select-none"
                    style={{ color: `hsl(var(${t.accentVar}) / 0.25)` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground">
                  {t.label}
                </h3>
                <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed mt-1">
                  {t.desc}
                </p>
                <span
                  className="mt-auto pt-3 inline-flex items-center gap-1.5 font-sans text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: `hsl(var(${t.accentVar}))` }}
                >
                  Explore
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PregnancyTimeline;
