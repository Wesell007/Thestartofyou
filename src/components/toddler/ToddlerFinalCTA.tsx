import { Link } from "react-router-dom";

const ToddlerFinalCTA = () => {
  return (
    <section
      className="py-24 md:py-28"
      style={{ backgroundColor: "hsl(var(--stage-toddler-soft) / 0.5)" }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-2xl text-center">
        <h2
          className="font-serif text-3xl md:text-4xl mb-5 leading-tight"
          style={{ color: "hsl(var(--stage-toddler-deep))" }}
        >
          When the day feels long, you can ask
        </h2>
        <p className="font-sans text-[15.5px] font-light text-foreground/70 leading-relaxed mb-10 max-w-md mx-auto">
          A quiet question, a calm answer — for the small moments and the harder
          ones, across the whole toddler stage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/ask?q=toddler"
            className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[200px] hover:-translate-y-[1px]"
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
            className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[200px] hover:-translate-y-[1px]"
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
    </section>
  );
};

export default ToddlerFinalCTA;
