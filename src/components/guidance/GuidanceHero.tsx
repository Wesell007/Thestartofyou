import { Link } from "react-router-dom";
import AISearchBar from "@/components/shared/AISearchBar";

const GuidanceHero = () => (
  <section className="relative bg-parchment pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    {/* Subtle decorative gradient */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-to-bl from-sage/[0.04] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-lavender/[0.03] via-transparent to-transparent" />
    </div>

    <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-10 font-sans text-[11px] font-light text-muted-foreground tracking-wide">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="opacity-40">/</span>
        <span className="text-foreground">Guidance</span>
      </nav>

      <div className="max-w-2xl mb-12">
        <p className="stage-label mb-5">Guidance library</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-foreground leading-[1.08] tracking-tight">
          Calm, clear guidance for every stage
        </h1>
        <p className="font-sans text-lg font-light text-muted-foreground mt-6 max-w-xl leading-relaxed">
          Trusted answers and in-depth guides across your full journey. Browse by stage, explore popular questions, or ask anything.
        </p>
      </div>

      {/* Integrated search */}
      <div className="max-w-2xl">
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
  </section>
);

export default GuidanceHero;
