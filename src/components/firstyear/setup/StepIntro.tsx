import { forwardRef } from "react";

type Props = {
  onBegin: () => void;
  onNotNow: () => void;
};

/** Step 1. Reassurance that the pregnancy chapter is kept, nothing more. */
const StepIntro = forwardRef<HTMLHeadingElement, Props>(({ onBegin, onNotNow }, ref) => (
  <div>
    <h2
      ref={ref}
      tabIndex={-1}
      className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
      style={{ color: "hsl(var(--stage-firstyear-deep))" }}
    >
      Your pregnancy chapter is kept. Your First Year can begin when you are ready.
    </h2>
    <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-3">
      Everything you saved stays exactly where it is. Your weeks, photos, notes and
      voice memories remain yours to open whenever you want them.
    </p>
    <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-8">
      This takes a minute. You can stop at any point and come back later.
    </p>
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
));

StepIntro.displayName = "StepIntro";

export default StepIntro;
