import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import preparingImg from "@/assets/preparing-card.jpg";
import supportImg from "@/assets/support-card.jpg";
/* ── Compact SVG Stage Icons ── */
const TTCIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    <path d="M24 14 L24 10M24 38 L24 34M14 24 L10 24M38 24 L34 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.15"/>
  </svg>
);

const IVFIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 38 C18 34 10 28 10 20 C10 14 14.5 10 20 10 C22 10 24 11 24 11 C24 11 26 10 28 10 C33.5 10 38 14 38 20 C38 28 30 34 24 38Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.1" />
    <circle cx="24" cy="22" r="4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M22 20 L26 24M26 20 L22 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const PregnancyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="24" cy="12" r="5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    <path d="M17 20 Q13 26 15 34 Q17 40 24 40 Q31 40 33 34 Q35 26 31 20" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.1"/>
  </svg>
);

const PostpartumIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="18" cy="11" r="5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    <path d="M10 22 Q10 18 14 17 L22 17 Q26 18 26 22 L26 36 Q26 38 24 38 L12 38 Q10 38 10 36Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.1"/>
    <circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.15"/>
  </svg>
);

const FirstYearIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 40 L24 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M24 30 Q18 25 14 26 Q16 32 24 30" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.15" strokeLinejoin="round"/>
    <path d="M24 24 Q30 19 34 20 Q32 26 24 24" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.15" strokeLinejoin="round"/>
    <circle cx="24" cy="17" r="4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.12"/>
  </svg>
);

const PreparingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="10" y="18" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.08"/>
    <path d="M16 18 L16 14 Q16 10 20 10 L28 10 Q32 10 32 14 L32 18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M18 28 L22 32 L30 24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 38 C18 34 10 28 10 20 C10 14 14.5 10 20 10 C22 10 24 11 24 11 C24 11 26 10 28 10 C33.5 10 38 14 38 20 C38 28 30 34 24 38Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.08"/>
    <circle cx="24" cy="20" r="2.5" stroke="currentColor" strokeWidth="1" fill="currentColor"/>
    <path d="M24 25 L24 30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

/* ── Stage data ── */
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
    icon: <PregnancyIcon />,
    title: "Pregnancy",
    desc: "Week-by-week guidance, symptoms, and support from confirmation to birth.",
    href: "/pregnancy",
    colorVar: "--stage-pregnancy",
    accentVar: "--stage-pregnancy-accent",
    featured: true,
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
    icon: <PostpartumIcon />,
    title: "Postpartum",
    desc: "Recovery, identity, and the early weeks with your baby.",
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
    desc: "What you actually need, what matters, and how to prepare without overwhelm.",
    href: "/preparing-for-baby",
    colorVar: "--stage-preparing",
    accentVar: "--stage-preparing-accent",
  },
  {
    icon: <SupportIcon />,
    title: "Emotional support",
    desc: "For moments that feel uncertain, overwhelming, or isolating — you're not alone in this.",
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
  compact?: boolean;
}

const StageCard = ({ icon, title, desc, href, colorVar, accentVar, featured = false, compact = false }: StageCardProps) => {
  return (
    <Link
      to={href}
      className={`group relative flex rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft ${
        featured ? "flex-col sm:flex-row sm:col-span-2 lg:col-span-3" : "flex-col"
      } ${compact ? "p-5 sm:p-6" : "p-6 sm:p-7 md:p-8"}`}
      style={{ backgroundColor: `hsl(var(${colorVar}))` }}
      aria-label={`Explore ${title}`}
    >
      {/* Left accent border */}
      <div
        className="absolute top-0 left-0 w-[3px] h-full rounded-l-2xl"
        style={{ background: `hsl(var(${accentVar}))` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, hsl(var(${accentVar}) / 0.06) 0%, transparent 70%)`,
        }}
      />

      <div className={`relative z-10 flex-1 ${featured ? "sm:pr-8" : ""}`}>
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
          style={{ color: `hsl(var(${accentVar}))`, backgroundColor: `hsl(var(${accentVar}) / 0.12)` }}
        >
          {icon}
        </div>

        <h3 className={`font-serif text-foreground leading-snug mb-2 ${featured ? "text-lg sm:text-xl md:text-2xl" : compact ? "text-base" : "text-base md:text-lg"}`}>
          {title}
        </h3>
        <p className={`font-sans font-light text-muted-foreground leading-relaxed mb-5 ${featured ? "text-sm sm:text-base max-w-md" : "text-sm"}`}>
          {desc}
        </p>

        <span
          className="inline-flex items-center gap-1.5 font-sans text-xs font-medium group-hover:gap-2.5 transition-all duration-300"
          style={{ color: `hsl(var(${accentVar}))` }}
        >
          Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>

      {/* Featured: extra visual element on right */}
      {featured && (
        <div className="hidden sm:flex items-center justify-center sm:w-48 md:w-56 shrink-0">
          <div className="relative">
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, hsl(var(${accentVar}) / 0.5) 0%, transparent 70%)` }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center text-[2.5rem] md:text-[3rem] font-serif italic font-light"
              style={{ color: `hsl(var(${accentVar}) / 0.25)` }}
            >
              40w
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

/* ── Editorial stat break ── */
const EditorialBreak = () => (
  <div className="py-12 sm:py-16 md:py-20">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 md:gap-20 text-center">
        {[
          { stat: "40", unit: "weeks", label: "of pregnancy guidance" },
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

/* ── Section ── */
const StageNavSection = () => {
  return (
    <>
      {/* Main stages */}
      <section className="relative bg-parchment pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-10 md:pb-14 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] glow-sage" />

        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
          <div className="mb-10 md:mb-14">
            <p className="stage-label flanking-lines mb-4 md:mb-5">Your journey</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.75rem] text-foreground mb-3 md:mb-4 text-center leading-tight">
              Start where you are
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-md mx-auto leading-relaxed text-center">
              Choose your stage and find guidance designed for exactly this moment.
            </p>
          </div>

          {/* Pregnancy featured, then 2x2 grid */}
          <div className="space-y-3 sm:space-y-4">
            {/* All stages in life-stage order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {mainStages.map((s) => (
                <StageCard key={s.title} {...s} />
              ))}
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
              Practical preparation and emotional support — for the moments between milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl">
            {[
              { title: "Preparing for baby", desc: "What you actually need, what matters, and how to prepare without overwhelm.", href: "/preparing-for-baby", img: preparingImg },
              { title: "Emotional support", desc: "For moments that feel uncertain, overwhelming, or isolating — you're not alone in this.", href: "/support", img: supportImg },
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
