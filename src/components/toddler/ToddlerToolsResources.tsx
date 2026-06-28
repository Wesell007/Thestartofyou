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
      className="py-20 md:py-24"
      style={{ backgroundColor: "hsl(var(--stage-toddler) / 0.35)" }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            Tools & resources
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            A few quiet places to start
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {tools.map(({ title, body, q }) => (
            <Link
              key={title}
              to={`/ask?q=${encodeURIComponent(q)}`}
              className="group flex h-full flex-col rounded-2xl border bg-parchment/75 backdrop-blur-sm p-7 md:p-8 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_40px_-24px_rgba(60,40,20,0.35)]"
              style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.2)" }}
            >
              <p
                className="font-sans text-[10.5px] font-light tracking-[0.28em] uppercase mb-3"
                style={{ color: "hsl(var(--stage-toddler-accent) / 0.85)" }}
              >
                Resource
              </p>
              <h3
                className="font-serif text-xl mb-2"
                style={{ color: "hsl(var(--stage-toddler-deep))" }}
              >
                {title}
              </h3>
              <p className="font-sans text-[14.5px] font-light text-foreground/70 leading-relaxed mb-6">
                {body}
              </p>
              <span
                className="mt-auto inline-flex items-center gap-2 font-sans text-[12.5px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-0.5"
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
