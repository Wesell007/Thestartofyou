import HubAISupport from "@/components/shared/HubAISupport";

const ToddlerAISupport = () => {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--stage-toddler) / 0.55) 0%, hsl(var(--stage-toddler) / 0.25) 60%, hsl(var(--parchment)) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-8 md:mb-10">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            Ask The Start of You
          </p>
          <h2
            className="font-serif text-[1.9rem] md:text-[2.4rem] leading-tight"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            A calm answer, whenever the day asks one
          </h2>
        </div>

        <div
          className="rounded-[28px] border bg-parchment/85 backdrop-blur-sm shadow-[0_28px_70px_-40px_rgba(60,40,20,0.35)] overflow-hidden"
          style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.2)" }}
        >
          <HubAISupport
            heading="Ask anything about the toddler years"
            description="From midnight wake-ups to picky meals and the daily push-pull of independence — ask in plain words and get a calm, considered answer."
            placeholder="What's happening with your toddler?"
            suggestions={[
              "Why does my toddler have tantrums?",
              "How much sleep does a 2 year old need?",
              "When should I worry about speech?",
              "How do I handle picky eating?",
              "When can we start potty training?",
            ]}
            context="toddler"
            stageBg="--stage-toddler"
            stageAccent="--stage-toddler-accent"
          />
        </div>

        <p
          className="mt-7 text-center font-sans text-[13px] font-light tracking-wide max-w-lg mx-auto leading-relaxed"
          style={{ color: "hsl(var(--stage-toddler-deep) / 0.7)" }}
        >
          Grounded, parent-tested guidance. Not a chatbot — a quiet companion for
          the questions you'd rather not Google at 2am.
        </p>
      </div>
    </section>
  );
};

export default ToddlerAISupport;
