import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
          {/* Left: emotional close */}
          <div className="md:col-span-3">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-snug">
              Start with where you are
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mb-6">
              You do not need to have everything figured out. Start with your stage, and let the journey guide you from there. The right support is already here.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Explore your journey
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/due-date-calculator"
                className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
              >
                <Calculator size={14} className="text-sage" />
                Calculate your due date
              </Link>
            </div>
          </div>

          {/* Right: trust card */}
          <div className="md:col-span-2">
            <div className="card-elevated p-6 md:p-7 space-y-4">
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground">What you will find</p>
              {[
                "Stage-specific guidance that adapts to you",
                "Emotional support alongside practical information",
                "Tools, calculators, and structured guidance",
                "A journal designed for the full journey",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage/50 mt-1.5 flex-shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
