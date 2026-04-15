import { Link } from "react-router-dom";
import AISearchBar from "@/components/shared/AISearchBar";
import heroImg from "@/assets/guidance-editorial-1.jpg";

const GuidanceHero = () => (
  <section className="relative bg-foreground overflow-hidden">
    {/* Full-bleed hero image */}
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Parent reading in soft morning light"
        className="w-full h-full object-cover object-[75%_15%] sm:object-top"
        width={1280}
        height={720}
      />
      {/* Mobile: stronger overall overlay for text legibility */}
      <div className="absolute inset-0 bg-foreground/60 sm:bg-transparent" />
      {/* Desktop: directional gradient */}
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-foreground/75 via-foreground/50 to-transparent" />
      {/* Bottom fade — blends into parchment below */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[hsl(var(--parchment))] via-[hsl(var(--parchment)/0.6)] to-transparent" />
    </div>

    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 sm:mb-10 font-sans text-[11px] font-light text-white/50 tracking-wide">
        <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
        <span className="opacity-40">/</span>
        <span className="text-white/70">Guidance</span>
      </nav>

      <div className="max-w-xl mb-10 sm:mb-12">
        <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-sage-light/80 mb-3 md:mb-4">
          Guidance library
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-white leading-[1.1] tracking-tight">
          Calm, clear guidance for every stage
        </h1>
        <p className="font-sans text-sm sm:text-[15px] md:text-base font-light text-white/65 mt-4 sm:mt-5 leading-relaxed">
          Trusted answers and in-depth guides — from trying to conceive through the first year and beyond.
        </p>
      </div>

      {/* Search card */}
      <div className="max-w-xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6">
          <p className="font-sans text-[11px] font-light text-white/50 mb-3">Ask anything or search our guidance</p>
          <AISearchBar
            variant="hero"
            placeholder="What would you like guidance on?"
            suggestions={[
              "What should I expect at 8 weeks?",
              "Are my symptoms normal?",
              "Best time to take a test?",
              "Help me understand my due date",
            ]}
            context="guidance-library"
          />
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/35">
        <span className="font-sans text-[11px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-light/50" />
          Medically reviewed
        </span>
        <span className="font-sans text-[11px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-light/50" />
          Evidence-based
        </span>
        <span className="font-sans text-[11px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-light/50" />
          Updated regularly
        </span>
      </div>
    </div>
  </section>
);

export default GuidanceHero;
