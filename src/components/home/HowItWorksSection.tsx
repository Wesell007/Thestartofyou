// SVG illustrations for each step — thin line art style matching the reference
const StepCalendarSVG = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="10" y="20" width="85" height="75" rx="4" stroke="hsl(271,18%,30%)" strokeWidth="1.5" fill="none"/>
    <line x1="10" y1="36" x2="95" y2="36" stroke="hsl(271,18%,30%)" strokeWidth="1.5"/>
    <line x1="32" y1="12" x2="32" y2="28" stroke="hsl(271,18%,30%)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="73" y1="12" x2="73" y2="28" stroke="hsl(271,18%,30%)" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="20" y="44" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="38" y="44" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="56" y="44" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="74" y="44" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="20" y="60" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="38" y="60" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="56" y="60" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="74" y="60" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="20" y="76" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <rect x="38" y="76" width="12" height="10" rx="1" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    {/* leaf decoration */}
    <path d="M88 85 Q98 70 105 82 Q98 90 88 85Z" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none"/>
    <path d="M96 83 L100 78" stroke="hsl(271,18%,30%)" strokeWidth="1"/>
  </svg>
);

const StepJournalSVG = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="60" cy="95" rx="30" ry="4" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none" opacity="0.3"/>
    <path d="M30 20 L30 88 Q30 92 34 92 L80 92 Q84 92 84 88 L84 20 Q84 16 80 16 L34 16 Q30 16 30 20Z" stroke="hsl(271,18%,30%)" strokeWidth="1.5" fill="none"/>
    <path d="M30 16 Q22 16 22 24 L22 84 Q22 92 30 92" stroke="hsl(271,18%,30%)" strokeWidth="1.5" fill="none"/>
    <line x1="40" y1="36" x2="74" y2="36" stroke="hsl(271,18%,30%)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="40" y1="46" x2="74" y2="46" stroke="hsl(271,18%,30%)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="40" y1="56" x2="64" y2="56" stroke="hsl(271,18%,30%)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M58 68 L62 72 L72 62" stroke="hsl(271,18%,30%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* person silhouette */}
    <circle cx="97" cy="38" r="6" stroke="hsl(271,18%,30%)" strokeWidth="1.2" fill="none"/>
    <path d="M91 54 Q97 48 103 54 L100 72 L94 72Z" stroke="hsl(271,18%,30%)" strokeWidth="1.2" fill="none"/>
    <line x1="91" y1="58" x2="86" y2="65" stroke="hsl(271,18%,30%)" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="103" y1="58" x2="108" y2="65" stroke="hsl(271,18%,30%)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const StepPregnantSVG = () => (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* sitting pregnant figure */}
    <circle cx="60" cy="22" r="9" stroke="hsl(271,18%,30%)" strokeWidth="1.5" fill="none"/>
    <path d="M48 38 Q44 30 52 30 L60 30 L68 30 Q76 30 72 38" stroke="hsl(271,18%,30%)" strokeWidth="1.5" fill="none"/>
    {/* body with bump */}
    <path d="M50 38 Q44 50 46 60 Q48 68 60 70 Q72 68 74 60 Q76 50 70 38" stroke="hsl(271,18%,30%)" strokeWidth="1.5" fill="none"/>
    {/* legs sitting */}
    <path d="M46 68 L38 82 Q38 88 44 88 L56 88" stroke="hsl(271,18%,30%)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M74 68 L82 82 Q82 88 76 88 L64 88" stroke="hsl(271,18%,30%)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* arm to belly */}
    <path d="M50 48 Q46 56 50 62" stroke="hsl(271,18%,30%)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* small circles near bump = baby */}
    <circle cx="60" cy="55" r="3.5" stroke="hsl(271,18%,30%)" strokeWidth="1" fill="none" opacity="0.6"/>
  </svg>
);

const steps = [
  {
    icon: <StepCalendarSVG />,
    step: "Step 1: Enter Your Due Date",
    desc: "Your 40-week journey begins with one simple date. We calculate your current stage and build your personalized timeline.",
  },
  {
    icon: <StepJournalSVG />,
    step: "Step 2: Receive Weekly Updates",
    desc: "Every Sunday, your dashboard updates with stage-specific guidance: body changes, development milestones, and practical reminders.",
  },
  {
    icon: <StepPregnantSVG />,
    step: "Step 3: Track & Reflect",
    desc: "Save your journey. Journal your thoughts. Access your full pregnancy roadmap anytime, from anywhere.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative bg-lavender-bg py-24 md:py-32 overflow-hidden">
      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-20 h-20 border-t border-l border-lavender/60 pointer-events-none" />
      <div className="absolute top-6 right-6 w-20 h-20 border-t border-r border-lavender/60 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-b border-l border-lavender/60 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-b border-r border-lavender/60 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-lavender-foreground mb-4">
            How The Start of You Works
          </h2>
          <p className="font-sans text-base font-light text-lavender-foreground/70 max-w-xl mx-auto leading-relaxed">
            There is physical change. Emotional change. Quiet questions that surface unexpectedly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="mb-6 opacity-90">{s.icon}</div>
              <h3 className="font-serif text-lg md:text-xl text-lavender-foreground mb-3">{s.step}</h3>
              <p className="font-sans text-sm font-light text-lavender-foreground/70 leading-relaxed max-w-xs">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
