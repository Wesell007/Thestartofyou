import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ── SVG Stage Icons ── */

const TTCIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="24" cy="24" r="10" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="none"/>
    <path d="M24 14 L24 10M24 38 L24 34M14 24 L10 24M38 24 L34 24" stroke="hsl(var(--sage))" strokeWidth="1.1" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="4" stroke="hsl(var(--sage))" strokeWidth="1.1" fill="hsl(var(--sage-bg))"/>
    <path d="M30 18 Q34 12 38 10" stroke="hsl(var(--sage-muted))" strokeWidth="0.9" strokeLinecap="round"/>
    <path d="M36 14 L38 10 L34 12" stroke="hsl(var(--sage-muted))" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IVFIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 38 C18 34 10 28 10 20 C10 14 14.5 10 20 10 C22 10 24 11 24 11 C24 11 26 10 28 10 C33.5 10 38 14 38 20 C38 28 30 34 24 38Z" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="hsl(var(--sage-bg) / 0.4)" />
    <circle cx="24" cy="22" r="4" stroke="hsl(var(--sage))" strokeWidth="1" fill="none"/>
    <path d="M22 20 L26 24M26 20 L22 24" stroke="hsl(var(--sage))" strokeWidth="0.9" strokeLinecap="round"/>
  </svg>
);

const PregnancyIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="24" cy="12" r="5" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="none"/>
    <path d="M17 20 Q13 26 15 34 Q17 40 24 40 Q31 40 33 34 Q35 26 31 20" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="hsl(var(--sage-bg) / 0.3)"/>
    <ellipse cx="24" cy="31" rx="6" ry="7" stroke="hsl(var(--sage))" strokeWidth="0.9" fill="none" opacity="0.5"/>
  </svg>
);

const PostpartumIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="11" r="5" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="none"/>
    <path d="M10 22 Q10 18 14 17 L18 17 L22 17 Q26 18 26 22 L26 36 Q26 38 24 38 L12 38 Q10 38 10 36Z" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="hsl(var(--sage-bg) / 0.3)"/>
    <circle cx="32" cy="28" r="6" stroke="hsl(var(--sage))" strokeWidth="1.1" fill="hsl(var(--sage-bg) / 0.5)"/>
    <path d="M26 28 Q29 24 32 22" stroke="hsl(var(--sage))" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const FirstYearIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 40 L24 20" stroke="hsl(var(--sage))" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M24 30 Q18 25 14 26 Q16 32 24 30" stroke="hsl(var(--sage))" strokeWidth="1.1" fill="hsl(var(--sage-bg) / 0.4)" strokeLinejoin="round"/>
    <path d="M24 24 Q30 19 34 20 Q32 26 24 24" stroke="hsl(var(--sage))" strokeWidth="1.1" fill="hsl(var(--sage-bg) / 0.4)" strokeLinejoin="round"/>
    <circle cx="24" cy="17" r="4" stroke="hsl(var(--sage))" strokeWidth="1.1" fill="hsl(var(--sage-bg))"/>
    <path d="M14 40 L34 40" stroke="hsl(var(--sage-muted))" strokeWidth="0.9" strokeLinecap="round"/>
  </svg>
);

const PreparingIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="10" y="18" width="28" height="20" rx="3" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="hsl(var(--sage-bg) / 0.3)"/>
    <path d="M16 18 L16 14 Q16 10 20 10 L28 10 Q32 10 32 14 L32 18" stroke="hsl(var(--sage))" strokeWidth="1.1" fill="none"/>
    <path d="M18 28 L22 32 L30 24" stroke="hsl(var(--sage))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 38 C18 34 10 28 10 20 C10 14 14.5 10 20 10 C22 10 24 11 24 11 C24 11 26 10 28 10 C33.5 10 38 14 38 20 C38 28 30 34 24 38Z" stroke="hsl(var(--sage))" strokeWidth="1.2" fill="hsl(var(--sage-bg) / 0.2)"/>
    <circle cx="24" cy="20" r="2.5" stroke="hsl(var(--sage))" strokeWidth="0.9" fill="hsl(var(--sage))"/>
    <path d="M24 25 L24 30" stroke="hsl(var(--sage))" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

/* ── Stage data ── */
const mainStages = [
  { icon: <TTCIcon />, title: "Trying to conceive", desc: "Understanding your cycle, timing, and early steps", href: "/trying-to-conceive", color: "bg-sage-bg/50" },
  { icon: <IVFIcon />, title: "IVF", desc: "A more supported path into pregnancy", href: "/ivf", color: "bg-lavender-bg/50" },
  { icon: <PregnancyIcon />, title: "Pregnancy", desc: "Week-by-week guidance through each stage", href: "/pregnancy", color: "bg-parchment-dark" },
  { icon: <PostpartumIcon />, title: "Postpartum", desc: "Recovery, adjustment, and the early weeks", href: "/postpartum", color: "bg-sage-bg/30" },
  { icon: <FirstYearIcon />, title: "First year", desc: "Growth, change, and finding your rhythm", href: "/first-year", color: "bg-lavender-bg/30" },
];

const supportStages = [
  { icon: <PreparingIcon />, title: "Preparing for your baby", desc: "What you need, what matters, and how to prepare", href: "/preparing-for-baby" },
  { icon: <SupportIcon />, title: "Support", desc: "For moments that feel uncertain, overwhelming, or different", href: "/support" },
];

/* ── Stage Card ── */
interface StageCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  bgColor?: string;
  subtle?: boolean;
}

const StageCard = ({ icon, title, desc, href, bgColor = "bg-card", subtle = false }: StageCardProps) => {
  const isInternal = href.startsWith("/");
  const Wrapper = isInternal ? Link : "a";
  return (
    <Wrapper
      to={isInternal ? href : undefined}
      href={!isInternal ? href : undefined}
      className={`group flex flex-col rounded-2xl p-8 md:p-9 border border-border/20 shadow-card-brand hover:shadow-soft hover:border-sage/20 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm ${bgColor}`}
      aria-label={`Explore ${title}`}
    >
      <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{icon}</div>
      <h3 className={`font-serif mb-3 text-foreground leading-snug ${subtle ? "text-base" : "text-lg md:text-xl"}`}>
        {title}
      </h3>
      <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1 mb-7">
        {desc}
      </p>
      <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-sage group-hover:gap-3 transition-all duration-300">
        Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Wrapper>
  );
};

/* ── Section ── */
const StageNavSection = () => {
  return (
    <>
      {/* Main stages */}
      <section className="relative bg-parchment section-spacing overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] glow-sage" />
        <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
          <div className="mb-16 md:mb-20">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 text-center">
              Start where you are
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground max-w-md mx-auto leading-relaxed text-center">
              Choose your current stage and find the guidance that's right for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {mainStages.map((s) => (
              <StageCard key={s.title} {...s} bgColor={s.color} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional support */}
      <section className="bg-parchment pb-28 md:pb-40">
        <div className="container mx-auto px-6 md:px-10 max-w-5xl">
          <div className="mb-14">
            <div className="editorial-rule-left mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
              Additional support
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground max-w-md leading-relaxed">
              Resources for specific moments and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-2xl">
            {supportStages.map((s) => (
              <StageCard key={s.title} {...s} bgColor="bg-parchment-dark/60" subtle />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StageNavSection;
