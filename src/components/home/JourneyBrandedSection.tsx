import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JourneyBrandedSection = () => {
  return (
    <section className="relative bg-[hsl(271_20%_94%)] py-20 md:py-28 overflow-hidden">
      {/* Corner frames — inspired by the designer reference */}
      <CornerFrame position="top-left" />
      <CornerFrame position="top-right" />
      <CornerFrame position="bottom-left" />
      <CornerFrame position="bottom-right" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10 text-center">
        {/* Illustration — refined seated figure */}
        <div className="mb-8 flex justify-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-50"
          >
            {/* Simplified seated figure with botanical element */}
            <ellipse cx="40" cy="68" rx="18" ry="4" fill="hsl(271 30% 74% / 0.2)" />
            <path
              d="M40 16c-3.5 0-6.5 3-6.5 6.5s3 6.5 6.5 6.5 6.5-3 6.5-6.5-3-6.5-6.5-6.5z"
              stroke="hsl(271 30% 60%)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M33 30c-1 2-2 6-2 10 0 3 1 6 3 8l3 4v10c0 1 1 2 3 2s3-1 3-2v-8h-1"
              stroke="hsl(271 30% 60%)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M47 30c1 2 2 6 2 10 0 3-1 6-3 8l-3 4v10c0 1-1 2-3 2s-3-1-3-2"
              stroke="hsl(271 30% 60%)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Small botanical leaf */}
            <path
              d="M54 36c4-8 8-14 14-16-2 8-6 14-14 16z"
              stroke="hsl(271 30% 60%)"
              strokeWidth="0.8"
              fill="hsl(271 30% 74% / 0.1)"
              strokeLinecap="round"
            />
            <path
              d="M54 36c6-4 12-6 14-16"
              stroke="hsl(271 30% 60%)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-lavender-foreground/40 mb-4">
          Your journey
        </p>

        <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-lavender-foreground leading-[1.2] mb-4">
          A calmer way to begin
        </h2>

        <p className="font-sans text-[14.5px] font-light text-lavender-foreground/50 max-w-md mx-auto leading-relaxed mb-8">
          One date is all it takes. We build your personalised pregnancy timeline from there.
        </p>

        <Link
          to="/due-date-calculator"
          className="inline-flex items-center gap-2.5 font-sans text-[13.5px] font-medium text-terracotta hover:text-terracotta-hover transition-colors"
        >
          Start with your due date
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

/* Elegant corner ornament */
const CornerFrame = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const baseClasses = "absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 pointer-events-none";
  
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  };

  return (
    <div className={`${baseClasses} ${positionClasses[position]}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${rotation[position]}`}
      >
        {/* Corner L-frame with botanical accent */}
        <path
          d="M8 8h40M8 8v40"
          stroke="hsl(271 30% 68%)"
          strokeWidth="0.75"
          opacity="0.35"
        />
        {/* Small botanical branch */}
        <path
          d="M12 12c8 4 16 12 20 24"
          stroke="hsl(271 30% 68%)"
          strokeWidth="0.6"
          opacity="0.25"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 20c-4-2-8 0-10 2 4 0 8 0 10-2z"
          fill="hsl(271 30% 68%)"
          opacity="0.15"
        />
        <path
          d="M26 30c-2-4-6-4-8-2 4 2 6 4 8 2z"
          fill="hsl(271 30% 68%)"
          opacity="0.12"
        />
      </svg>
    </div>
  );
};

export default JourneyBrandedSection;
