import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { companionStyles } from "@/components/companion/companionStyles";

/**
 * Homepage Story Refinement — chapter four: Your companion.
 *
 * A still, non-interactive rendering of the real companion surface, built from
 * the shared `companionStyles` tokens so the marketing story matches the
 * product. There is no runtime here: no model call, no streaming, no second
 * companion instance. The only action is a link to the existing /ask surface.
 */

const CompanionMomentSection = () => (
  <section className="bg-background py-20 md:py-28" aria-labelledby="companion-moment-heading">
    <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <div className="mb-6 h-px w-10 bg-sage/40" />
          <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-sage">
            Your companion
          </p>
          <h2
            id="companion-moment-heading"
            className="font-serif text-[1.9rem] leading-[1.14] text-foreground sm:text-[2.3rem]"
          >
            Questions change. Your companion stays close.
          </h2>
          <p className="mt-4 max-w-md font-sans text-[14.5px] font-light leading-[1.75] text-muted-foreground">
            Ask about what matters right now and get calm guidance shaped around the journey you are
            in.
          </p>
          <Link
            to="/ask"
            className="mt-7 inline-flex items-center gap-2.5 font-sans text-[13px] font-medium text-foreground transition-colors duration-300 hover:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
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
          className="rounded-3xl border border-[hsl(var(--stage-ttc-sage-soft))] bg-[hsl(var(--stage-ttc-cream))] p-5 shadow-soft sm:p-6"
        >
          <p className={companionStyles.panelHeading}>Ask your companion</p>
          <p className={`${companionStyles.safetyLine} mt-1`}>
            Calm guidance, shaped around where you are.
          </p>

          <div className="mt-5 space-y-3">
            <p className={companionStyles.userBubble}>
              What can I expect in the second trimester?
            </p>
            <div className={companionStyles.assistantCard}>
              <p className="font-sans text-[14.5px] leading-relaxed text-[hsl(var(--stage-ttc-olive))]">
                Many people find the middle weeks steadier: early sickness often eases and energy
                can return. You may start to feel movement, and your next routine appointment will
                usually check growth and wellbeing.
              </p>
              <p className={`${companionStyles.safetyLine} mt-3`}>
                If anything feels wrong, contact your midwife or maternity unit.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className={companionStyles.chip}>What should I ask at my next appointment?</span>
            <span className={companionStyles.chip}>Is this tiredness normal?</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CompanionMomentSection;
