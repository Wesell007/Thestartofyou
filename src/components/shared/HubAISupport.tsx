import AISearchBar from "@/components/shared/AISearchBar";

interface HubAISupportProps {
  heading?: string;
  emotionalPrompt?: string;
  description: string;
  placeholder?: string;
  suggestions: string[];
  context: string;
  /** CSS custom property name for stage background, e.g. "--stage-ttc" */
  stageBg?: string;
  /** CSS custom property name for stage accent, e.g. "--stage-ttc-accent" */
  stageAccent?: string;
  /** Stage key for /ask re-toning, e.g. "toddler". */
  stage?: string;
}

const HubAISupport = ({
  heading = "Ask anything, whenever you need",
  emotionalPrompt,
  description,
  placeholder = "What's on your mind?",
  suggestions,
  context,
  stageBg,
  stageAccent,
  stage,
}: HubAISupportProps) => {
  return (
    <section
      className="relative section-spacing overflow-hidden"
      style={stageBg ? { backgroundColor: `hsl(var(${stageBg}) / 0.45)` } : undefined}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl opacity-30"
        style={stageAccent ? { backgroundColor: `hsl(var(${stageAccent}) / 0.2)` } : undefined}
      />
      {!stageAccent && <div className="absolute top-0 left-1/4 w-[500px] h-[400px] glow-sage" />}

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="stage-label mb-5">Your companion</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
              {heading}
            </h2>
            {emotionalPrompt && (
              <p className="font-serif italic text-base text-muted-foreground leading-relaxed mb-4">
                "{emotionalPrompt}"
              </p>
            )}
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>
          </div>

          <div>
            <AISearchBar
              placeholder={placeholder}
              suggestions={suggestions}
              context={context}
              stageAccent={stageAccent}
              stage={stage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubAISupport;
