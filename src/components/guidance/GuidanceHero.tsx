import { Link } from "react-router-dom";
import AISearchBar from "@/components/shared/AISearchBar";
import heroImg from "@/assets/guidance-hero.jpg";

const GuidanceHero = () => (
  <section className="relative bg-parchment pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden">
    {/* Hero background image with gradient overlay */}
    <div className="absolute inset-0 pointer-events-none">
      <img
        src={heroImg}
        alt=""
        className="absolute top-0 right-0 w-full md:w-[65%] h-full object-cover opacity-[0.12] md:opacity-[0.18]"
        width={1280}
        height={720}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/95 to-parchment/60" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-parchment to-transparent" />
    </div>

    {/* Subtle decorative gradient */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-to-bl from-sage/[0.04] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-lavender/[0.03] via-transparent to-transparent" />
    </div>

    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 sm:mb-10 font-sans text-[11px] font-light text-muted-foreground tracking-wide">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="opacity-40">/</span>
        <span className="text-foreground">Guidance</span>
      </nav>

      <div className="max-w-2xl mb-10 sm:mb-14">
        <p className="stage-label mb-4 md:mb-5">Guidance library</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.5rem] text-foreground leading-[1.08] tracking-tight">
          Calm, clear guidance for every stage
        </h1>
        <p className="font-sans text-[15px] sm:text-base md:text-lg font-light text-muted-foreground mt-4 sm:mt-6 max-w-xl leading-relaxed">
          Trusted answers and in-depth guides across your full journey — from trying to conceive through the first year and beyond.
        </p>
      </div>

      {/* Integrated search — more intentional styling */}
      <div className="max-w-2xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/30 p-5 sm:p-6 shadow-soft">
          <p className="font-sans text-xs font-light text-muted-foreground mb-3">Ask anything or search guidance</p>
          <AISearchBar
            variant="hero"
            placeholder="What would you like guidance on?"
            suggestions={[
              "Is nausea normal in early pregnancy?",
              "When do pregnancy symptoms start?",
              "I'm feeling overwhelmed",
              "Implantation bleeding vs period",
            ]}
            context="guidance-library"
          />
        </div>
      </div>

      {/* Trust signals */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground/50">
        <span className="font-sans text-[11px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage/40" />
          Medically reviewed
        </span>
        <span className="font-sans text-[11px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage/40" />
          Evidence-based
        </span>
        <span className="font-sans text-[11px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage/40" />
          Updated regularly
        </span>
      </div>
    </div>
  </section>
);

export default GuidanceHero;
