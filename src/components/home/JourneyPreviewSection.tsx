import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

import {
  TTC_EYEBROW,
  TTC_HELPER,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD,
} from "@/components/ttc/journey/ttcStyles";
import {
  FY_CARD_BODY,
  FY_CARD_RADIUS,
  FY_CHIP,
  FY_INNER_RADIUS,
  FY_KICKER,
} from "@/components/firstyear/journey/firstYearStyles";

/**
 * Homepage Story Refinement — chapter two: Inside your journey.
 *
 * Still, illustrative renderings of the real saved-journey surfaces (My TTC
 * Journey, My Week, First Year Today), built from the same shared style
 * constants those screens use so the marketing story matches the product.
 *
 * Privacy: this is a public marketing surface. It performs no Supabase reads
 * of any kind — no journey, journal, baby or TTC data — and every value shown
 * is fixed illustrative copy, not a person's record.
 */

const stages = ["TTC", "Pregnancy", "First Year"] as const;
type Stage = (typeof stages)[number];

const cyclePath = [
  { label: "Period started", state: "behind" },
  { label: "Possible fertile window", state: "behind" },
  { label: "Likely ovulation", state: "here" },
  { label: "Two-week wait", state: "ahead" },
  { label: "Possible test day", state: "ahead" },
] as const;

const TtcPreview = () => (
  <div className={`${TTC_PAPER_CARD} px-5 py-6 sm:px-7 sm:py-8`}>
    <p className={`${TTC_EYEBROW} mb-2`}>Your cycle path</p>
    <p className={`${TTC_HELPER} mb-6 max-w-[52ch]`}>
      A soft sense of where you may be and what may come next, based on the dates you saved.
    </p>
    <ol className="space-y-3">
      {cyclePath.map(({ label, state }) => (
        <li key={label} className="flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{
              background:
                state === "ahead"
                  ? "hsl(var(--stage-ttc-olive) / 0.28)"
                  : "hsl(var(--stage-ttc-olive))",
              boxShadow:
                state === "here" ? "0 0 0 5px hsl(var(--stage-ttc-olive) / 0.16)" : undefined,
            }}
          />
          <span className="font-serif text-[15px] leading-[1.5] text-[hsl(var(--stage-ttc-text))]">
            {label}
          </span>
        </li>
      ))}
    </ol>
    <div
      className={`${TTC_INNER_RADIUS} mt-6 border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.6)] px-5 py-4`}
    >
      <p className="font-serif italic text-[15px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))]">
        Estimates only, never a certainty. Your own notes stay private to you.
      </p>
    </div>
  </div>
);

const PregnancyPreview = () => (
  <div className="rounded-[26px] pregnancy-paper px-6 py-8 sm:px-9 sm:py-10">
    <p
      className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.3em]"
      style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
    >
      Second trimester · Week 24
    </p>
    <p className="font-serif font-medium leading-[1.02] tracking-tight text-foreground text-[2rem] sm:text-[2.6rem]">
      A steadier stretch
    </p>
    <p className="mt-4 max-w-[36ch] font-serif italic text-[1.05rem] leading-[1.45] text-[hsl(var(--stage-pregnancy-text-soft))]">
      Movement becomes more familiar, and your next appointment comes into view.
    </p>
    <span className="mt-7 inline-flex items-center gap-3 rounded-full bg-background/70 px-5 py-2.5">
      <CalendarDays
        size={14}
        strokeWidth={1.7}
        aria-hidden="true"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      />
      <span className="font-serif text-[15px] text-foreground/85">Due in the autumn</span>
      <span
        aria-hidden="true"
        className="block h-4 w-px"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.24)" }}
      />
      <span className="font-sans text-[12px] font-light tracking-wide text-foreground/60">
        16 weeks to go
      </span>
    </span>
  </div>
);

const FirstYearPreview = () => {
  const chip = {
    color: "hsl(var(--stage-firstyear-ink))",
    backgroundColor: "hsl(var(--stage-firstyear-cream))",
    border: "1px solid hsl(var(--stage-firstyear-accent) / 0.28)",
  };

  return (
    <div
      className={`${FY_CARD_RADIUS} border px-6 py-8 sm:px-9 sm:py-10`}
      style={{
        borderColor: "hsl(var(--stage-firstyear-accent) / 0.45)",
        background:
          "linear-gradient(158deg, hsl(var(--stage-firstyear-soft)) 0%, hsl(var(--stage-firstyear)) 58%, hsl(var(--stage-firstyear-cream)) 100%)",
      }}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span
          className={FY_KICKER}
          style={{
            color: "hsl(var(--parchment))",
            backgroundColor: "hsl(var(--stage-firstyear-ink))",
          }}
        >
          Today
        </span>
        <span className={FY_CHIP} style={chip}>
          Four months old
        </span>
      </div>
      <p className="mb-2.5 font-serif text-[1.85rem] leading-[1.1] text-foreground sm:text-[2.25rem]">
        A note for your baby
      </p>
      <p className={`${FY_CARD_BODY} max-w-[50ch]`}>
        Write as much or as little as you like. There is nothing to keep up with.
      </p>
      <div
        className={`${FY_INNER_RADIUS} mt-5 px-5 py-5`}
        style={{
          backgroundColor: "hsl(var(--stage-firstyear-cream))",
          border: "1px solid hsl(var(--stage-firstyear-accent) / 0.2)",
        }}
      >
        <p className="max-w-[48ch] font-serif text-[16px] leading-[1.72] text-foreground">
          Something you noticed, how the day is going, a note about your own recovery, or a question
          to remember for your next appointment.
        </p>
      </div>
    </div>
  );
};

const detail: Record<Stage, { title: string; body: string; href: string; linkLabel: string }> = {
  TTC: {
    title: "Your cycle, with context",
    body: "Your saved dates become a soft path through the cycle, with guidance that arrives when it is useful rather than all at once.",
    href: "/trying-to-conceive",
    linkLabel: "Explore TTC support",
  },
  Pregnancy: {
    title: "Guidance for this week",
    body: "Your own dates shape a calm weekly chapter: what is changing, what is coming and what is worth asking about.",
    href: "/pregnancy",
    linkLabel: "Explore pregnancy",
  },
  "First Year": {
    title: "Today, in one place",
    body: "An age aware home for the day: feeding, sleep, development and your recovery, with a quiet place to note what you want to keep.",
    href: "/first-year",
    linkLabel: "Explore the first year",
  },
};

const JourneyPreviewSection = () => {
  const [active, setActive] = useState<Stage>("Pregnancy");
  const { title, body, href, linkLabel } = detail[active];

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
          className="grid items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-14"
        >
          <div>
            {active === "TTC" && <TtcPreview />}
            {active === "Pregnancy" && <PregnancyPreview />}
            {active === "First Year" && <FirstYearPreview />}
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              An illustration of the saved journey
            </p>
            <h3 className="mt-3 font-serif text-[1.6rem] leading-tight text-foreground">{title}</h3>
            <p className="mt-4 font-sans text-[14px] font-light leading-relaxed text-muted-foreground">
              {body}
            </p>
            <Link
              to={href}
              className="mt-6 inline-flex items-center gap-2 font-sans text-[12.5px] font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              {linkLabel} <ArrowRight size={13} aria-hidden="true" />
            </Link>
            <p className="mt-6 font-sans text-[12.5px] font-light leading-relaxed text-muted-foreground">
              Illustrative only. Nothing personal is shown here, and your own journey stays private
              to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyPreviewSection;
