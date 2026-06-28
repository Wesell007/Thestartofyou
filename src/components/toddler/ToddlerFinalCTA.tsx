import { Link } from "react-router-dom";

const ToddlerFinalCTA = () => {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler-soft) / 0.4) 50%, hsl(var(--stage-toddler) / 0.6) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div
          className="text-center rounded-[32px] border bg-parchment/85 backdrop-blur-sm px-8 py-14 md:px-14 md:py-16 shadow-[0_30px_70px_-38px_rgba(60,40,20,0.4)]"
          style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.22)" }}
        >
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.55)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-4" style={{ color: "hsl(var(--stage-toddler-accent))" }}>
            When you need it
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.5rem] mb-5 leading-[1.15]" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
            When the day feels long, you can ask
          </h2>
          <p className="font-sans text-[15.5px] font-light text-foreground/70 leading-relaxed mb-10 max-w-md mx-auto">
            A quiet question, a calm answer — for the small moments and the harder ones, across the whole toddler stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/ask?q=toddler"
              className="inline-flex items-center justify-center rounded-pill px-8 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] shadow-[0_16px_36px_-18px_rgba(60,40,20,0.55)] hover:-translate-y-[1px] hover:shadow-[0_20px_42px_-16px_rgba(60,40,20,0.6)]"
              style={{
                backgroundColor: "hsl(var(--stage-toddler-deep))",
                color: "hsl(var(--stage-toddler-soft))",
                borderColor: "hsl(var(--stage-toddler-deep))",
              }}
            >
              Ask a toddler question
            </Link>
            <Link
              to="#toddler-age"
              className="inline-flex items-center justify-center rounded-pill px-8 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px] hover:bg-[hsl(var(--stage-toddler)/0.6)]"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--stage-toddler-deep))",
                borderColor: "hsl(var(--stage-toddler-accent) / 0.5)",
              }}
            >
              Go to your toddler's age
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToddlerFinalCTA;
