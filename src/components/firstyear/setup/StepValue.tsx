import { forwardRef } from "react";
import type { FirstYearSetupMode } from "@/lib/firstYearEntry";
import {
  FIRST_YEAR_VALUE_ITEMS,
  FIRST_YEAR_VALUE_ITEM_TRANSITION,
} from "./firstYearSetupConstants";

type Props = {
  mode: FirstYearSetupMode;
  onBack: () => void;
  onContinue: () => void;
};

/** Step 4. A warm, short explanation of what the First Year home holds. */
const StepValue = forwardRef<HTMLHeadingElement, Props>(({ mode, onBack, onContinue }, ref) => {
  const items =
    mode === "transition"
      ? [...FIRST_YEAR_VALUE_ITEMS, FIRST_YEAR_VALUE_ITEM_TRANSITION]
      : FIRST_YEAR_VALUE_ITEMS;

  return (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] mb-4 outline-none"
        style={{ color: "hsl(var(--stage-firstyear-deep))" }}
      >
        Here's what your First Year home gives you
      </h2>
      <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[52ch] mb-7">
        Nothing to keep up with. It is there when you want it.
      </p>

      <ul className="mb-9 space-y-4 max-w-[52ch]">
        {items.map((item) => (
          <li key={item.title}>
            <p className="font-sans text-[15px] text-foreground/90 mb-1">{item.title}</p>
            <p className="font-serif text-[14.5px] leading-[1.65] text-foreground/70">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-6 py-3 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-3 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
});

StepValue.displayName = "StepValue";

export default StepValue;
