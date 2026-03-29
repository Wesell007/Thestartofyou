import pregnancyBump from "@/assets/pregnancy-bump.jpg";

const FeaturesSection = () => {
  const features = [
    { label: "Gentle insight into your baby's development" },
    { label: "Acknowledgment of how you might be feeling" },
    { label: "Reassurance about changes in your body" },
    { label: "Thoughtful prompts for reflection" },
  ];

  return (
    <section className="bg-parchment-dark section-spacing overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <div className="editorial-rule mb-8" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-7 max-w-2xl mx-auto">
            Pregnancy can feel expansive and uncertain all at once.
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            There is physical change. Emotional change. Quiet questions that surface unexpectedly.
          </p>
          <p className="font-sans text-sm font-medium text-foreground mt-7">Each week offers:</p>
        </div>

        {/* Features grid with center image */}
        <div className="relative flex flex-col md:grid md:grid-cols-3 items-center gap-12 md:gap-0">
          {/* Left features */}
          <div className="flex flex-col gap-14 md:text-right order-2 md:order-1">
            {features.slice(0, 2).map((f) => (
              <p key={f.label} className="font-serif italic text-lg md:text-xl text-foreground/85 leading-snug">
                - {f.label}
              </p>
            ))}
          </div>

          {/* Center image */}
          <div className="flex flex-col items-center gap-8 order-1 md:order-2 mx-auto">
            <div className="relative flex items-center justify-center">
              <div className="relative w-56 md:w-64 overflow-hidden rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-elevated">
                <img
                  src={pregnancyBump}
                  alt="Pregnant woman gently holding her bump"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute inset-[-12px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border border-sage-light/40 pointer-events-none" />
            </div>

            <p className="font-serif italic text-lg md:text-xl text-foreground/85 leading-snug text-center mt-2">
              - Nothing more than what you need.<br />Nothing that pulls you ahead.
            </p>
          </div>

          {/* Right features */}
          <div className="flex flex-col gap-14 md:text-left order-3">
            {features.slice(2, 4).map((f) => (
              <p key={f.label} className="font-serif italic text-lg md:text-xl text-foreground/85 leading-snug">
                - {f.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
