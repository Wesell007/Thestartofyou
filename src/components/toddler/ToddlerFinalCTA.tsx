import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const accent = "hsl(var(--stage-toddler-accent))";
const accentMid = "hsl(var(--stage-toddler-accent) / 0.28)";
const accentBorder = "hsl(var(--stage-toddler-accent) / 0.22)";
const deep = "hsl(var(--stage-toddler-deep))";
const deepSoft = "hsl(var(--stage-toddler-deep) / 0.7)";

const ToddlerFinalCTA = () => {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler-soft) / 0.5) 45%, hsl(var(--stage-toddler) / 0.65) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div
          className="relative text-center rounded-[32px] border bg-parchment px-8 py-14 md:px-14 md:py-16 overflow-hidden"
          style={{
            borderColor: accentBorder,
            boxShadow:
              "0 32px 76px -42px rgba(70,40,20,0.36), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
          }}
        >
          <span
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-80 rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-toddler) / 0.4)" }}
            aria-hidden
          />
          <span
            className="relative mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: accentMid }}
          />
          <p
            className="relative font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-4"
            style={{ color: accent }}
          >
            When you need it
          </p>
          <h2
            className="relative font-serif text-[2rem] md:text-[2.5rem] mb-5 leading-[1.15]"
            style={{ color: deep }}
          >
            When the day feels long, you can ask
          </h2>
          <p
            className="relative font-sans text-[15.5px] font-light leading-relaxed mb-10 max-w-md mx-auto"
            style={{ color: deepSoft }}
          >
            A quiet question, a calm answer — for the small moments and the harder ones, across the whole toddler stage.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/ask?q=toddler"
              className="group inline-flex items-center justify-center gap-2 rounded-pill px-8 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px] hover:shadow-[0_22px_46px_-22px_rgba(70,40,20,0.5)]"
              style={{
                backgroundColor: "hsl(var(--stage-toddler-deep))",
                color: "hsl(var(--stage-toddler-soft))",
                borderColor: "hsl(var(--stage-toddler-deep))",
                boxShadow: "0 18px 38px -22px rgba(70,40,20,0.45)",
              }}
            >
              Ask a toddler question
              <ArrowRight size={14} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="#toddler-age"
              className="inline-flex items-center justify-center rounded-pill px-8 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px] hover:bg-[hsl(var(--stage-toddler)/0.5)]"
              style={{
                backgroundColor: "transparent",
                color: deep,
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
