import HubAISupport from "@/components/shared/HubAISupport";

const accent = "hsl(var(--stage-family-accent))";
const accentMid = "hsl(var(--stage-family-accent) / 0.22)";
const accentBorderStrong = "hsl(var(--stage-family-accent) / 0.4)";
const deep = "hsl(var(--stage-family-deep))";
const deepSoft = "hsl(var(--stage-family-deep) / 0.7)";

const FamilyAISupport = () => {
  return (
    <section
      id="family-ai"
      className="relative py-20 md:py-28 scroll-mt-24"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--stage-family) / 0.55) 0%, hsl(var(--stage-family) / 0.25) 60%, hsl(var(--parchment)) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-8 md:mb-10">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: accentMid }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: accent }}
          >
            Ask The Start of You
          </p>
          <h2
            className="font-serif text-[1.9rem] md:text-[2.4rem] leading-tight"
            style={{ color: deep }}
          >
            A calm answer, whenever family life asks one
          </h2>
        </div>

        <div
          className="relative rounded-[30px] border bg-parchment/85 backdrop-blur-sm overflow-hidden"
          style={{
            borderColor: accentBorderStrong,
            boxShadow:
              "0 36px 80px -42px rgba(70,50,20,0.4), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
          }}
        >
          <span
            className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full blur-3xl opacity-70"
            style={{ background: "hsl(var(--stage-family-accent) / 0.18)" }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-family) / 0.55)" }}
            aria-hidden
          />
          <HubAISupport
            heading="Ask anything about family life"
            description="From sibling transitions to grandparent boundaries and the everyday questions that don't fit anywhere else — ask in plain words and get a calm, considered answer."
            placeholder="What's on your mind about family life?"
            suggestions={[
              "How do I prepare my child for a new baby?",
              "How do we manage family routines?",
              "How do I set boundaries with grandparents?",
              "How do we travel with young children?",
              "How can I feel less overwhelmed by family life?",
            ]}
            context="family"
            stageBg="--stage-family"
            stageAccent="--stage-family-accent"
            stage="family"
          />
        </div>

        <p
          className="mt-7 text-center font-sans text-[12.5px] font-light tracking-wide max-w-lg mx-auto leading-relaxed"
          style={{ color: deepSoft }}
        >
          A quiet companion for the questions family life keeps asking.
        </p>
      </div>
    </section>
  );
};

export default FamilyAISupport;
