import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ── SVG Stage Icons ── */

const TTCIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M24 14 L24 10M24 38 L24 34M14 24 L10 24M38 24 L34 24" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity="0.15"/>
    <path d="M30 18 Q34 12 38 10" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    <path d="M36 14 L38 10 L34 12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const IVFIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 38 C18 34 10 28 10 20 C10 14 14.5 10 20 10 C22 10 24 11 24 11 C24 11 26 10 28 10 C33.5 10 38 14 38 20 C38 28 30 34 24 38Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1" />
    <circle cx="24" cy="22" r="4" stroke="currentColor" strokeWidth="1" fill="none"/>
    <path d="M22 20 L26 24M26 20 L22 24" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
  </svg>
);

const PregnancyIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="24" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M17 20 Q13 26 15 34 Q17 40 24 40 Q31 40 33 34 Q35 26 31 20" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1"/>
    <ellipse cx="24" cy="31" rx="6" ry="7" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.4"/>
  </svg>
);

const PostpartumIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="11" r="5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M10 22 Q10 18 14 17 L18 17 L22 17 Q26 18 26 22 L26 36 Q26 38 24 38 L12 38 Q10 38 10 36Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1"/>
    <circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity="0.15"/>
    <path d="M26 28 Q29 24 32 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const FirstYearIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 40 L24 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M24 30 Q18 25 14 26 Q16 32 24 30" stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity="0.15" strokeLinejoin="round"/>
    <path d="M24 24 Q30 19 34 20 Q32 26 24 24" stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity="0.15" strokeLinejoin="round"/>
    <circle cx="24" cy="17" r="4" stroke="currentColor" strokeWidth="1.1" fill="currentColor" opacity="0.12"/>
    <path d="M14 40 L34 40" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const PreparingIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="10" y="18" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.08"/>
    <path d="M16 18 L16 14 Q16 10 20 10 L28 10 Q32 10 32 14 L32 18" stroke="currentColor" strokeWidth="1.1" fill="none"/>
    <path d="M18 28 L22 32 L30 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 38 C18 34 10 28 10 20 C10 14 14.5 10 20 10 C22 10 24 11 24 11 C24 11 26 10 28 10 C33.5 10 38 14 38 20 C38 28 30 34 24 38Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.08"/>
    <circle cx="24" cy="20" r="2.5" stroke="currentColor" strokeWidth="0.9" fill="currentColor"/>
    <path d="M24 25 L24 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

/* ── Stage data with colour tokens ── */
const mainStages = [
  {
    icon: <TTCIcon />,
    title: "Trying to conceive",
    desc: "Understanding your cycle, timing, and the early steps toward pregnancy.",
    href: "/trying-to-conceive",
    colorVar: "--stage-ttc",
    accentVar: "--stage-ttc-accent",
  },
  {
    icon: <IVFIcon />,
    title: "IVF & fertility",
    desc: "A guided, supported path through treatment and the emotions that come with it.",
    href: "/ivf",
    colorVar: "--stage-ivf",
    accentVar: "--stage-ivf-accent",
  },
  {
    icon: <PregnancyIcon />,
    title: "Pregnancy",
    desc: "Week-by-week guidance, symptoms, and support from confirmation to birth.",
    href: "/pregnancy",
    colorVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
  },
  {
    icon: <PostpartumIcon />,
    title: "Postpartum",
    desc: "Recovery, identity, and the early weeks of life with your baby.",
    href: "/postpartum",
    colorVar: "--stage-postpartum",
    accentVar: "--stage-postpartum-accent",
  },
  {
    icon: <FirstYearIcon />,
    title: "First year",
    desc: "Growth, milestones, and finding your rhythm as a parent.",
    href: "/first-year",
    colorVar: "--stage-firstyear",
    accentVar: "--stage-firstyear-accent",
  },
];

const supportStages = [
  {
    icon: <PreparingIcon />,
    title: "Preparing for baby",
    desc: "Essentials, planning, and what actually matters before arrival.",
    href: "/preparing-for-baby",
    colorVar: "--stage-preparing",
    accentVar: "--stage-preparing-accent",
  },
  {
    icon: <SupportIcon />,
    title: "Emotional support",
    desc: "For the moments that feel uncertain, overwhelming, or isolating.",
    href: "/support",
    colorVar: "--stage-support",
    accentVar: "--stage-support-accent",
  },
];

/* ── Stage Card ── */
interface StageCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  colorVar: string;
  accentVar: string;
  featured?: boolean;
}

const StageCard = ({ icon, title, desc, href, colorVar, accentVar, featured = false }: StageCardProps) => {
  return (
    <Link
      to={href}
      className={`group relative flex flex-col rounded-2xl border border-border/20 hover:border-transparent hover:-translate-y-1 transition-all duration-500 overflow-hidden ${featured ? "p-7 sm:p-8 md:p-9" : "p-6 sm:p-7"}`}
      style={{ backgroundColor: `hsl(var(${colorVar}))` }}
      aria-label={`Explore ${title}`}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, hsl(var(${colorVar}) / 0.8) 0%, transparent 70%)`,
        }}
      />

      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `hsl(var(${accentVar}))` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
          style={{ color: `hsl(var(${accentVar}))`, backgroundColor: `hsl(var(${accentVar}) / 0.1)` }}
        >
          {icon}
        </div>

        <h3 className={`font-serif text-foreground leading-snug mb-2.5 ${featured ? "text-lg md:text-xl" : "text-base md:text-lg"}`}>
          {title}
        </h3>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
          {desc}
        </p>

        <span
          className="inline-flex items-center gap-1.5 font-sans text-xs font-medium group-hover:gap-3 transition-all duration-300"
          style={{ color: `hsl(var(${accentVar}))` }}
        >
          Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

/* ── Section ── */
const StageNavSection = () => {
  return (
    <>
      {/* Main stages */}
      <section className="relative bg-parchment section-spacing overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] glow-sage" />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="mb-14 md:mb-20">
            <p className="stage-label flanking-lines mb-5 md:mb-6">Your journey</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.75rem] text-foreground mb-4 md:mb-5 text-center leading-tight">
              Start where you are
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-md mx-auto leading-relaxed text-center">
              Choose your stage and find guidance, tools, and support designed for exactly this moment.
            </p>
          </div>

          {/* Featured layout: first 3 in a row, then 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            {mainStages.slice(0, 3).map((s) => (
              <StageCard key={s.title} {...s} featured />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
            {mainStages.slice(3).map((s) => (
              <StageCard key={s.title} {...s} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Additional support — elevated */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28" style={{ background: `linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--parchment-dark)) 100%)` }}>
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="mb-10 md:mb-14">
            <div className="editorial-rule-left mb-5" />
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3">
              Beyond the stages
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground max-w-md leading-relaxed">
              Practical preparation and emotional support — for the moments between the milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl">
            {supportStages.map((s) => (
              <StageCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StageNavSection;
