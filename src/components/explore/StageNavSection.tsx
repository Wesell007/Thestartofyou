import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import preparingImg from "@/assets/preparing-card.jpg";
import supportImg from "@/assets/support-card.jpg";

/* ── Illustrated Stage Icons (line-art style) ── */

const TTCIcon = ({ className = "w-14 h-14" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
    <path d="M40 18 L40 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M40 68 L40 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M18 40 L12 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M68 40 L62 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.12"/>
    <circle cx="40" cy="40" r="2.5" fill="currentColor" opacity="0.35"/>
    <path d="M40 34 Q43 30 40 26 Q37 30 40 34Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.1"/>
  </svg>
);

const IVFIcon = ({ className = "w-14 h-14" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="40" cy="42" rx="22" ry="18" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4"/>
    <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.08"/>
    <circle cx="37" cy="38" r="5" stroke="currentColor" strokeWidth="1" fill="none"/>
    <circle cx="43" cy="42" r="5" stroke="currentColor" strokeWidth="1" fill="none"/>
    <circle cx="37" cy="38" r="2" fill="currentColor" opacity="0.2"/>
    <circle cx="43" cy="42" r="2" fill="currentColor" opacity="0.2"/>
    <path d="M40 22 L40 26" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
    <path d="M40 56 L40 60" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
    <path d="M20 40 L24 40" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
    <path d="M56 40 L60 40" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const PregnancyIcon = ({ className = "w-14 h-14" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="40" cy="18" r="7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M30 30 Q24 40 28 54 Q32 64 40 66 Q48 64 52 54 Q56 40 50 30" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.06"/>
    <path d="M32 44 Q36 56 44 56 Q50 56 50 48" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    <path d="M36 42 L38 38 L40 44 L42 40 L44 42" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);

const PostpartumIcon = ({ className = "w-14 h-14" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="18" r="7" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M22 30 Q20 26 26 25 L38 25 Q44 26 44 30 L44 52 Q44 56 40 56 L24 56 Q22 56 22 52Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.06"/>
    <ellipse cx="48" cy="44" rx="10" ry="8" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.08"/>
    <circle cx="48" cy="40" r="4" stroke="currentColor" strokeWidth="1" fill="none"/>
    <path d="M38 36 Q42 34 44 36" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const FirstYearIcon = ({ className = "w-14 h-14" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M40 66 L40 36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M40 50 Q32 42 26 44 Q30 52 40 50" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.1" strokeLinejoin="round"/>
    <path d="M40 42 Q48 34 54 36 Q50 44 40 42" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.1" strokeLinejoin="round"/>
    <path d="M40 36 Q34 28 28 30 Q32 38 40 36" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.08" strokeLinejoin="round"/>
    <circle cx="40" cy="28" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.1"/>
    <circle cx="40" cy="28" r="2.5" fill="currentColor" opacity="0.25"/>
    <path d="M30 66 Q40 62 50 66" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

/* ── Stage data ── */
const stages = [
  {
    Icon: TTCIcon,
    title: "Trying to conceive",
    desc: "Understanding your cycle, timing, and the early steps toward pregnancy.",
    href: "/trying-to-conceive",
    colorVar: "--stage-ttc",
    accentVar: "--stage-ttc-accent",
    number: "01",
  },
  {
    Icon: IVFIcon,
    title: "IVF & fertility",
    desc: "A guided, supported path through treatment and the emotions that come with it.",
    href: "/ivf",
    colorVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
    number: "02",
  },
  {
    Icon: PregnancyIcon,
    title: "Pregnancy",
    desc: "Week-by-week guidance, symptoms, and support from confirmation to birth.",
    href: "/pregnancy",
    colorVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
    number: "03",
  },
  {
    Icon: PostpartumIcon,
    title: "Postpartum",
    desc: "Recovery, identity, and the early weeks with your baby.",
    href: "/postpartum",
    colorVar: "--stage-postpartum",
    accentVar: "--stage-postpartum-accent",
    number: "04",
  },
  {
    Icon: FirstYearIcon,
    title: "First year",
    desc: "Growth, milestones, and finding your rhythm as a parent.",
    href: "/first-year",
    colorVar: "--stage-firstyear",
    accentVar: "--stage-firstyear-accent",
    number: "05",
  },
];

/* ── Editorial stat break ── */
const EditorialBreak = () => (
  <div className="py-12 sm:py-16 md:py-20">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 md:gap-20 text-center">
        {[
          { stat: "40+", unit: "weeks", label: "of pregnancy guidance" },
          { stat: "5", unit: "stages", label: "from TTC to first year" },
          { stat: "100+", unit: "", label: "evidence-based articles" },
        ].map((item) => (
          <div key={item.label}>
            <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-none mb-1">
              {item.stat}
              <span className="text-sage text-lg sm:text-xl md:text-2xl font-light ml-1">{item.unit}</span>
            </div>
            <p className="font-sans text-xs font-light text-muted-foreground tracking-wide">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Main Section ── */
const StageNavSection = () => {
  return (
    <>
      {/* Journey stages */}
      <section className="relative bg-parchment pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] glow-sage pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          {/* Section header */}
          <div className="mb-12 md:mb-16 lg:mb-20">
            <p className="stage-label flanking-lines mb-4 md:mb-5">Your journey</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.75rem] text-foreground mb-3 md:mb-4 text-center leading-tight">
              Start where you are
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-md mx-auto leading-relaxed text-center">
              Every journey is different. Choose your stage and find guidance designed for exactly this moment.
            </p>
          </div>

          {/* Journey timeline */}
          <div className="relative">
            {/* ── Connecting line (visible on all sizes) ── */}
            <div
              className="absolute left-5 sm:left-6 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2"
              style={{
                background: "linear-gradient(to bottom, hsl(var(--border) / 0.1), hsl(var(--border) / 0.5) 10%, hsl(var(--border) / 0.5) 90%, hsl(var(--border) / 0.1))",
              }}
            />

            {/* Stage rows */}
            <div className="space-y-6 lg:space-y-0">
              {stages.map((stage, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div key={stage.title} className="relative">
                    {/* ── Node on the line ── */}
                    <div
                      className="absolute left-5 sm:left-6 lg:left-1/2 -translate-x-1/2 top-6 sm:top-7 lg:top-8 z-20"
                    >
                      <div
                        className="w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center bg-card shadow-sm"
                        style={{
                          border: `2.5px solid hsl(var(${stage.accentVar}) / 0.5)`,
                        }}
                      >
                        <span
                          className="font-sans text-[10px] lg:text-[11px] font-semibold"
                          style={{ color: `hsl(var(${stage.accentVar}))` }}
                        >
                          {stage.number}
                        </span>
                      </div>
                    </div>

                    {/* ── Card ── */}
                    <div
                      className={`pl-14 sm:pl-16 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-6 ${
                        i > 0 ? "pt-0 lg:pt-4" : ""
                      }`}
                    >
                      {/* Spacer for desktop alternation */}
                      {!isLeft && <div className="hidden lg:block" />}

                      <Link
                        to={stage.href}
                        className={`group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft p-6 sm:p-7 lg:p-8 ${
                          isLeft ? "lg:text-right" : ""
                        }`}
                        style={{ backgroundColor: `hsl(var(${stage.colorVar}))` }}
                        aria-label={`Explore ${stage.title}`}
                      >
                        {/* Accent border */}
                        <div
                          className={`absolute top-0 w-[3px] h-full ${
                            isLeft
                              ? "left-0 lg:left-auto lg:right-0"
                              : "left-0"
                          }`}
                          style={{ background: `hsl(var(${stage.accentVar}))` }}
                        />

                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at ${isLeft ? "80%" : "20%"} 50%, hsl(var(${stage.accentVar}) / 0.06) 0%, transparent 70%)`,
                          }}
                        />

                        <div className={`relative z-10 ${isLeft ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
                          {/* Illustrated icon */}
                          <div style={{ color: `hsl(var(${stage.accentVar}))` }} className="mb-4">
                            <stage.Icon className="w-12 h-12 sm:w-14 sm:h-14" />
                          </div>

                          <h3 className="font-serif text-lg lg:text-xl text-foreground leading-snug mb-2">
                            {stage.title}
                          </h3>
                          <p className={`font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5 max-w-sm ${isLeft ? "lg:ml-auto" : ""}`}>
                            {stage.desc}
                          </p>

                          <span
                            className={`inline-flex items-center gap-1.5 font-sans text-xs font-medium group-hover:gap-2.5 transition-all duration-300 ${
                              isLeft ? "lg:flex-row-reverse" : ""
                            }`}
                            style={{ color: `hsl(var(${stage.accentVar}))` }}
                          >
                            <span>Explore</span>
                            <ArrowRight
                              size={12}
                              className={`transition-transform duration-300 group-hover:translate-x-0.5 ${
                                isLeft ? "lg:rotate-180 lg:group-hover:-translate-x-0.5 lg:group-hover:translate-x-0" : ""
                              }`}
                            />
                          </span>
                        </div>
                      </Link>

                      {/* Spacer for desktop alternation */}
                      {isLeft && <div className="hidden lg:block" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Journey end */}
            <div className="relative pt-8 lg:pt-10">
              <div className="absolute left-5 sm:left-6 lg:left-1/2 -translate-x-1/2 top-0 z-20">
                <div className="w-3 h-3 rounded-full bg-border/40" />
              </div>
              <p className="pl-14 sm:pl-16 lg:pl-0 lg:text-center font-sans text-[11px] font-light text-muted-foreground/60 tracking-wider uppercase">
                Your journey continues
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial stat break */}
      <EditorialBreak />

      {/* Beyond the stages */}
      <section className="relative overflow-hidden pb-16 sm:pb-20 md:pb-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="mb-8 md:mb-10">
            <div className="editorial-rule-left mb-4" />
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-2">
              Beyond the stages
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground max-w-md leading-relaxed">
              Practical preparation and emotional support, for the moments between milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl">
            {[
              { title: "Preparing for baby", desc: "What you actually need, what matters, and how to prepare without overwhelm.", href: "/preparing-for-baby", img: preparingImg },
              { title: "Emotional support", desc: "For moments that feel uncertain, overwhelming, or isolating. You are not alone in this.", href: "/support", img: supportImg },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border/30 shadow-sm hover:shadow-soft hover:-translate-y-0.5 transition-all duration-500"
                aria-label={`Explore ${card.title}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-sage group-hover:gap-2.5 transition-all duration-300">
                    Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StageNavSection;
