import { useState } from "react";
import { ChevronRight } from "lucide-react";

import {
  FirstYearPreview,
  PregnancyPreview,
  TtcPreview,
} from "@/components/home/journeyPreviews";

/** Static product compositions. No journey, journal, baby or TTC data is read. */

const stages = ["TTC", "Pregnancy", "First Year"] as const;
type Stage = (typeof stages)[number];



const detail: Record<Stage, { title: string; body: string }> = {
  TTC: {
    title: "Your cycle, with context",
    body: "Your saved dates become a soft path through the cycle, with guidance that arrives when it is useful rather than all at once.",
  },
  Pregnancy: {
    title: "Guidance for this week",
    body: "Your own dates shape a calm weekly chapter: what is changing, what is coming and what is worth asking about.",
  },
  "First Year": {
    title: "Today, in one place",
    body: "An age aware home for the day: feeding, sleep, development and your recovery, with a quiet place to note what you want to keep.",
  },
};

const JourneyPreviewSection = () => {
  const [active, setActive] = useState<Stage>("Pregnancy");
  const { title, body } = detail[active];

  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="journey-preview-heading">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <div className="mb-10 max-w-2xl md:mb-14">
          <div className="mb-6 h-px w-10 bg-sage/40" />
          <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Inside your journey
          </p>
          <h2
            id="journey-preview-heading"
            className="font-serif text-[2rem] leading-[1.12] text-foreground sm:text-4xl md:text-[2.75rem]"
          >
            One journey, shaped around where you are
          </h2>
          <p className="mt-4 max-w-xl font-sans text-[14.5px] font-light leading-relaxed text-muted-foreground">
            From trying to conceive to your baby's first year, your saved journey changes with you —
            bringing the guidance, reflections and moments that matter into one calm space.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Preview a stage of the journey"
          className="mb-8 flex flex-wrap gap-2"
        >
          {stages.map((stage) => (
            <button
              key={stage}
              type="button"
              role="tab"
              id={`journey-preview-tab-${stage.replace(/\s/g, "-").toLowerCase()}`}
              aria-selected={active === stage}
              aria-controls="journey-preview-panel"
              onClick={() => setActive(stage)}
              className={`min-h-11 rounded-full border px-5 font-sans text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 ${
                active === stage
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        <div
          id="journey-preview-panel"
          role="tabpanel"
          aria-labelledby={`journey-preview-tab-${active.replace(/\s/g, "-").toLowerCase()}`}
           className="mx-auto max-w-5xl"
        >
           <div className="relative before:absolute before:inset-x-5 before:-bottom-3 before:top-6 before:-z-10 before:rounded-[28px] before:border before:border-border/50 before:bg-card/60">
            {active === "TTC" && <TtcPreview />}
            {active === "Pregnancy" && <PregnancyPreview />}
            {active === "First Year" && <FirstYearPreview />}
          </div>

           <div className="mt-8 flex flex-col justify-between gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center"><div><p className="font-serif text-[1.2rem] text-foreground">{title}</p><p className="mt-1 max-w-2xl font-sans text-[13px] font-light leading-relaxed text-muted-foreground">{body}</p></div><p className="shrink-0 font-sans text-[11px] text-muted-foreground">Illustrative only · Nothing personal shown</p></div>
        </div>
      </div>
    </section>
  );
};

export default JourneyPreviewSection;
