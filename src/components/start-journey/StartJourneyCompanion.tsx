import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

import { companionStyles } from "@/components/companion/companionStyles";

/**
 * A small, still companion reassurance. No runtime, no model call, no
 * streaming, no second companion instance: static markup and a link to the
 * existing /ask surface only.
 */

const StartJourneyCompanion = () => (
  <section className="bg-background py-20 md:py-24" aria-labelledby="start-journey-companion-heading">
    <div className="container mx-auto max-w-4xl px-5 sm:px-6 md:px-10">
      <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-6 h-px w-10 bg-sage/40" />
          <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-sage">
            Your companion
          </p>
          <h2
            id="start-journey-companion-heading"
            className="font-serif text-[1.75rem] leading-[1.16] text-foreground sm:text-[2.05rem]"
          >
            Whichever journey you choose, you can ask
          </h2>
          <p className="mt-4 max-w-md font-sans text-[14px] font-light leading-[1.75] text-muted-foreground">
            Your companion answers with the calm, careful guidance of the stage you are in.
          </p>
          <Link
            to="/ask"
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 font-sans text-[13px] font-medium text-foreground transition-colors hover:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
          >
            Ask your companion
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
          <p className="mt-5 font-sans text-[12.5px] font-light leading-relaxed text-muted-foreground">
            Guidance only, never a replacement for your midwife, GP or urgent care.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="rounded-[24px] border border-[hsl(var(--stage-ttc-sage-soft))] bg-[hsl(var(--stage-ttc-cream))] p-6 shadow-soft sm:p-8"
        >
          <div className="flex items-start justify-between gap-5">
            <p className={companionStyles.panelHeading}>Ask your companion</p>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--stage-ttc-sage-tint))]">
              <Leaf size={16} className="text-[hsl(var(--stage-ttc-olive))]" />
            </span>
          </div>
          <div className="mt-6 space-y-4 border-t border-[hsl(var(--stage-ttc-sage-soft))] pt-5">
            <p className={companionStyles.userBubble}>Which journey should I start with?</p>
            <div className={companionStyles.assistantCard}>
              <p className="font-sans text-[14px] leading-relaxed text-[hsl(var(--stage-ttc-olive))]">
                Choose the journey that matches where you are today. You can move into a different
                one later, and the wider guidance stays open to you either way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StartJourneyCompanion;
