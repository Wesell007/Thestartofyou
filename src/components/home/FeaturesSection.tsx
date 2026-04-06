import homeEmotional from "@/assets/home-emotional.jpg";

const features = [
  "Gentle insight into your baby's development",
  "Acknowledgment of how you might be feeling",
  "Reassurance about changes in your body",
  "Thoughtful prompts for reflection",
];

const FeaturesSection = () => {
  return (
    <section className="bg-parchment-dark section-spacing overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start order-1 md:order-1">
            <div className="relative">
              <img
                src={homeEmotional}
                alt="Pregnant woman standing gently by a sunlit window"
                width={800}
                height={1000}
                loading="lazy"
                className="w-64 sm:w-72 md:w-80 rounded-2xl shadow-elevated object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-sage-light/30 pointer-events-none" />
            </div>
          </div>

          {/* Content */}
          <div className="order-2 md:order-2">
            <div className="editorial-rule-left mb-6 md:mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 md:mb-6 leading-tight">
              Pregnancy can feel expansive and uncertain all at once.
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-md">
              There is physical change. Emotional change. Quiet questions that surface unexpectedly. Each week, we give you:
            </p>

            <ul className="space-y-5 mb-8 md:mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-terracotta/60 shrink-0" />
                  <span className="font-serif italic text-base sm:text-lg text-foreground/85 leading-snug">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-serif italic text-base sm:text-lg text-foreground/70 leading-snug border-l-2 border-sage-light/50 pl-5">
              Nothing more than what you need.<br />
              Nothing that pulls you ahead.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
