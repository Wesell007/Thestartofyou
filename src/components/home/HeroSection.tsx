import { ArrowUpRight, ChevronDown, Calendar } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import botanicalCorner from "@/assets/botanical-corner.png";

const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-parchment overflow-hidden flex flex-col justify-center pt-20 md:pt-24">
      {/* Top-right botanical decoration */}
      <img
        src={botanicalCorner}
        alt=""
        aria-hidden="true"
        width={340}
        height={340}
        className="absolute -top-6 -right-10 w-60 md:w-80 opacity-70 pointer-events-none select-none"
      />

      <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">
          {/* Left: copy + form */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5 animate-fade-up">
              Your Pregnancy Journey,{" "}
              <span className="italic">Week by Week</span>
            </h1>

            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:0.1s] max-w-md">
              A structured system that adapts to your stage. Enter your due date
              to begin your personalized{" "}
              <strong className="font-medium text-foreground">40-week guide</strong>.
            </p>

            {/* Form */}
            <div className="w-full max-w-md space-y-3 animate-fade-up [animation-delay:0.2s]">
              {/* Week select */}
              <div>
                <label className="block font-sans text-xs font-light text-muted-foreground mb-1.5 tracking-wide uppercase">
                  Select week:
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-card border border-border rounded-pill px-5 py-3.5 font-sans text-sm font-light text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>Select your current week</option>
                    {weeks.map((w) => (
                      <option key={w} value={w}>Week {w}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Due date */}
              <div>
                <label className="block font-sans text-xs font-light text-muted-foreground mb-1.5 tracking-wide uppercase">
                  Enter your due date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    className="w-full bg-card border border-border rounded-pill px-5 py-3.5 font-sans text-sm font-light text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage transition-all"
                  />
                  <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 pt-1">
                <button className="flex-1 bg-terracotta text-terracotta-foreground rounded-pill py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
                  Start My Journey
                </button>
                <button className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center shrink-0 hover:bg-lavender/80 transition-colors">
                  <ArrowUpRight size={18} className="text-lavender-foreground" />
                </button>
              </div>

              <p className="font-sans text-xs font-light text-muted-foreground text-center pt-1 space-x-2">
                <span>Free to start</span>
                <span className="text-sage-muted">·</span>
                <span>Updates weekly</span>
                <span className="text-sage-muted">·</span>
                <span>Saved to your profile</span>
              </p>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="flex justify-center md:justify-end relative">
            <img
              src={heroIllustration}
              alt="Pregnant woman holding flowers, illustrated in sage green line art"
              width={480}
              height={540}
              className="w-64 sm:w-80 md:w-full max-w-sm md:max-w-md animate-float"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
