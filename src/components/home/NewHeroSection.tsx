import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/home-hero-premium.jpg";

const NewHeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[50%_30%]"
        />
        {/* Clean gradient — left text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/85 via-45% to-parchment/20 md:to-transparent" />
        {/* Subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/40 via-transparent via-60% to-parchment" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="max-w-lg md:max-w-xl pt-24 pb-16 md:pt-0 md:pb-0">
          {/* Quiet label */}
          <div className="flex items-center gap-2.5 mb-6 md:mb-8 animate-fade-up">
            <div className="h-px w-10 bg-sage" />
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage">
              The Start of You
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[2.25rem] sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.08] mb-5 md:mb-6 animate-fade-up [animation-delay:0.05s]">
            A calmer way{" "}
            <span className="italic text-foreground/85">through pregnancy</span>
          </h1>

          {/* Supporting line */}
          <p className="font-sans text-base md:text-[17px] font-light text-muted-foreground leading-[1.7] mb-8 md:mb-10 animate-fade-up [animation-delay:0.1s] max-w-[26rem]">
            Week-by-week guidance, made for how this really feels.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-3.5 animate-fade-up [animation-delay:0.15s]">
            <Link
              to="/due-date-calculator"
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
            >
              Start your journey
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors py-3.5"
            >
              Explore guidance
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
