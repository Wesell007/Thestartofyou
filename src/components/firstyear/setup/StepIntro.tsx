import { forwardRef } from "react";
import { FIRST_YEAR_SETUP_COPY, type FirstYearSetupMode } from "@/lib/firstYearEntry";

type Props = {
  mode: FirstYearSetupMode;
  onBegin: () => void;
  onNotNow: () => void;
};

/**
 * Step 1. Transition mode reassures that the pregnancy chapter is kept.
 * Direct mode never mentions pregnancy at all.
 */
const StepIntro = forwardRef<HTMLHeadingElement, Props>(({ mode, onBegin, onNotNow }, ref) => {
  const copy = FIRST_YEAR_SETUP_COPY[mode].intro;
  return (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
        style={{ color: "hsl(var(--stage-firstyear-deep))" }}
      >
        {copy.heading}
      </h2>
      {copy.body.map((paragraph, index) => (
        <p
          key={paragraph}
          className={`font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] ${
            index === copy.body.length - 1 ? "mb-8" : "mb-3"
          }`}
        >
          {paragraph}
        </p>
      ))}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBegin}
          className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-6 py-3 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Begin
        </button>
        <button
          type="button"
          onClick={onNotNow}
          className="inline-flex items-center justify-center rounded-pill px-5 py-3 text-sm text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-foreground/25"
        >
          Not right now
        </button>
      </div>
    </div>
  );
});

StepIntro.displayName = "StepIntro";

export default StepIntro;
