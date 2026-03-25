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

        {/* Features grid with center oval */}
        <div className="relative flex flex-col md:grid md:grid-cols-3 items-center gap-8 md:gap-0">
          {/* Left features */}
          <div className="flex flex-col gap-10 md:text-right order-2 md:order-1">
            {features.slice(0, 2).map((f) => (
              <p key={f.label} className="font-serif italic text-lg md:text-xl text-foreground leading-snug">
                – {f.label}
              </p>
            ))}
          </div>

          {/* Center oval */}
          <div className="relative flex items-center justify-center order-1 md:order-2 mx-auto">
            <div className="relative w-56 h-72 md:w-64 md:h-80">
              {/* Oval border */}
              <div className="absolute inset-0 rounded-[50%] border border-sage-light" />

              {/* Decorative text arc (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 240 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  id="arcPath"
                  d="M 30 220 A 100 140 0 0 1 210 220"
                  fill="none"
                  stroke="none"
                />
                <text fontSize="9.5" fill="hsl(271,22%,70%)" fontFamily="Jost, sans-serif" fontWeight="300" letterSpacing="2">
                  <textPath href="#arcPath" startOffset="10%">
                    This space exists to meet you where you are.
                  </textPath>
                </text>
              </svg>

              {/* Inner fill — sage tinted circle */}
              <div className="absolute inset-4 rounded-[50%] bg-sage-bg/40 flex items-end justify-center overflow-hidden">
                {/* Simple illustrated pregnant silhouette SVG */}
                <svg
                  viewBox="0 0 120 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-28 h-auto"
                  aria-hidden="true"
                >
                  <circle cx="60" cy="22" r="13" stroke="hsl(30,15%,40%)" strokeWidth="1.2" fill="hsl(40,30%,96%)"/>
                  {/* hair */}
                  <path d="M47 18 Q50 8 60 8 Q70 8 73 18" stroke="hsl(30,15%,35%)" strokeWidth="1.2" fill="hsl(30,12%,25%)"/>
                  {/* body */}
                  <path d="M48 36 Q38 50 40 66 Q42 82 60 86 Q78 82 80 66 Q82 50 72 36" stroke="hsl(30,15%,40%)" strokeWidth="1.2" fill="hsl(36,30%,88%)"/>
                  {/* bump highlight */}
                  <ellipse cx="60" cy="68" rx="14" ry="14" stroke="hsl(30,15%,50%)" strokeWidth="0.8" fill="hsl(40,28%,92%)" opacity="0.6"/>
                  {/* arms */}
                  <path d="M48 44 Q42 58 46 66" stroke="hsl(30,15%,40%)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M72 44 Q78 58 74 66" stroke="hsl(30,15%,40%)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  {/* clothing drape */}
                  <path d="M40 52 Q48 48 56 54" stroke="hsl(30,15%,50%)" strokeWidth="0.8" fill="none"/>
                  <path d="M80 52 Q72 48 64 54" stroke="hsl(30,15%,50%)" strokeWidth="0.8" fill="none"/>
                  {/* legs */}
                  <path d="M46 86 L42 130 L50 130 L60 105 L70 130 L78 130 L74 86" stroke="hsl(30,15%,40%)" strokeWidth="1.2" fill="hsl(36,28%,85%)"/>
                </svg>
              </div>
            </div>
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
