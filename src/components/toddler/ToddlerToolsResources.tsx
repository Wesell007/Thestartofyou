import { Link } from "react-router-dom";

const tools = [
  { title: "Milestone guide", body: "A calm view of typical toddler milestones, without the pressure.", q: "toddler milestones 12 to 36 months development guide" },
  { title: "Potty readiness checklist", body: "The signs that suggest your toddler may be ready to start.", q: "toddler potty training readiness signs checklist" },
  { title: "Speech support", body: "What to expect, what to watch for, and when to ask for help.", q: "toddler speech and language development support" },
  { title: "Sleep rhythm guide", body: "Naps, bedtime and night waking through the toddler years.", q: "toddler sleep rhythm naps bedtime night waking guide" },
];

const ToddlerToolsResources = () => {
  return (
    <section
      className="py-24 md:py-28"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.4) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-14 md:mb-16">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: "hsl(var(--stage-toddler-accent))" }}>
            Tools & resources
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
            A few quiet places to start
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/65 max-w-xl mx-auto leading-relaxed">
            Practical companions for the moments you don't want to scroll for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7">
          {tools.map(({ title, body, q }) => (
            <Link
              key={title}
              to={`/ask?q=${encodeURIComponent(q)}`}
              className="group flex h-full flex-col rounded-[22px] border bg-parchment/90 backdrop-blur-sm p-8 md:p-9 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_56px_-28px_rgba(60,40,20,0.38)]"
              style={{
                borderColor: "hsl(var(--stage-toddler-accent) / 0.2)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
                <p className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase" style={{ color: "hsl(var(--stage-toddler-accent) / 0.95)" }}>
                  Resource
                </p>
              </div>
              <h3 className="font-serif text-[1.35rem] md:text-[1.5rem] mb-2.5 leading-snug" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
                {title}
              </h3>
              <p className="font-sans text-[14.5px] font-light text-foreground/70 leading-relaxed mb-7">
                {body}
              </p>
              <span
                className="mt-auto inline-flex items-center gap-2 font-sans text-[12.5px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "hsl(var(--stage-toddler-accent))" }}
              >
                Open
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerToolsResources;
