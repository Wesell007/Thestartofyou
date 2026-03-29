import AISearchBar from "@/components/shared/AISearchBar";

interface HubAISupportProps {
  heading?: string;
  emotionalPrompt?: string;
  description: string;
  placeholder?: string;
  suggestions: string[];
  context: string;
}

const HubAISupport = ({
  heading = "Ask anything, whenever you need",
  emotionalPrompt,
  description,
  placeholder = "What's on your mind?",
  suggestions,
  context,
}: HubAISupportProps) => {
  return (
    <section className="relative bg-sage-bg/40 section-spacing overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] glow-sage" />

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="stage-label mb-5">AI Support</p>
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
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubAISupport;
