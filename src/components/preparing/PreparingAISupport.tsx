import AISearchBar from "@/components/shared/AISearchBar";

const PreparingAISupport = () => {
  return (
    <section className="bg-sage-bg/40 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              AI Support
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Ask anything, whenever you need
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              If you're unsure about what you need or what matters most, you can ask and get guidance tailored to your situation.
            </p>
          </div>

          <div>
            <AISearchBar
              placeholder="What's on your mind?"
              suggestions={[
                "Do I really need this?",
                "What should I prioritise?",
                "What can wait?",
              ]}
              context="Preparing for baby"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingAISupport;
