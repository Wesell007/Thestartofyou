import pregnancyBump from "@/assets/pregnancy-bump.jpg";

const FeaturesSection = () => {
  const features = [
    { label: "Gentle insight into your baby's development" },
    { label: "Acknowledgment of how you might be feeling" },
    { label: "Reassurance about changes in your body" },
    { label: "Thoughtful prompts for reflection" },
  ];

  return (
    <section className="bg-parchment-dark py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 max-w-2xl mx-auto leading-tight">
            Pregnancy can feel expansive and uncertain all at once.
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            There is physical change. Emotional change. Quiet questions that surface unexpectedly.
          </p>
          <p className="font-sans text-sm font-medium text-foreground mt-5">Each week offers:</p>
        </div>

        {/* Features grid with center image */}
        <div className="relative flex flex-col md:grid md:grid-cols-3 items-center gap-8 md:gap-0">
          {/* Left features */}
          <div className="flex flex-col gap-10 md:text-right order-2 md:order-1">
            {features.slice(0, 2).map((f) => (
              <p key={f.label} className="font-serif italic text-lg md:text-xl text-foreground leading-snug">
                – {f.label}
              </p>
            ))}
          </div>

          {/* Center image */}
          <div className="relative flex items-center justify-center order-1 md:order-2 mx-auto">
            <div className="relative w-56 md:w-64 overflow-hidden rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-soft">
              {/* Image */}
              <img
                src={pregnancyBump}
                alt="Pregnant woman gently holding her bump"
                width={640}
                height={800}
                loading="lazy"
                className="w-full h-auto object-cover"
              />

              {/* Bottom caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent px-4 pt-8 pb-5 text-center">
                <p className="font-serif italic text-[0.65rem] leading-snug text-parchment/90 tracking-wide">
                  Nothing more than what you need.<br />
                  Nothing that pulls you ahead.
                </p>
              </div>
            </div>

            {/* Decorative oval border ring around image */}
            <div className="absolute inset-[-8px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border border-sage-light pointer-events-none" />
          </div>

          {/* Right features */}
          <div className="flex flex-col gap-10 md:text-left order-3">
            {features.slice(2, 4).map((f) => (
              <p key={f.label} className="font-serif italic text-lg md:text-xl text-foreground leading-snug">
                – {f.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
