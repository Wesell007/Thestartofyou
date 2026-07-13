import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TTCStage } from "@/lib/ttcDerived";

type Copy = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  askLabel: string;
  askHref: string;
};

const STAGE_COPY: Record<TTCStage, Copy> = {
  before_ovulation: {
    heading: "Your fertile window may be ahead",
    body: "This can be a good time to notice your cycle pattern without putting pressure on every day.",
    primaryLabel: "Read about cycle tracking",
    primaryHref: "/trying-to-conceive/cycle-tracking",
    askLabel: "Ask about timing",
    askHref: "/ask?stage=ttc&topic=cycle-tracking",
  },
  fertile_window: {
    heading: "You may be in your fertile window",
    body: "These may be the days when conception is more likely, based on your saved cycle details.",
    primaryLabel: "Read about ovulation",
    primaryHref: "/trying-to-conceive/ovulation",
    askLabel: "Ask about your fertile window",
    askHref: "/ask?stage=ttc&topic=fertile-window",
  },
  likely_ovulation: {
    heading: "Ovulation may be around now",
    body: "Ovulation can shift, even in regular cycles. Use this as a guide rather than a guarantee.",
    primaryLabel: "Read about ovulation signs",
    primaryHref: "/articles/ovulation-signs",
    askLabel: "Ask about ovulation signs",
    askHref: "/ask?stage=ttc&topic=fertile-window",
  },
  two_week_wait: {
    heading: "You may be in the two-week wait",
    body: "This part can feel emotionally loud. Gentle routines and fewer repeated checks can help the wait feel more manageable.",
    primaryLabel: "Read two-week wait guidance",
    primaryHref: "/trying-to-conceive/two-week-wait",
    askLabel: "Ask about the two-week wait",
    askHref: "/ask?stage=ttc&topic=two-week-wait",
  },
  test_window: {
    heading: "Testing may feel more useful soon",
    body: "Testing after your expected period can help avoid some of the uncertainty that comes with testing very early.",
    primaryLabel: "Read pregnancy test guidance",
    primaryHref: "/trying-to-conceive/pregnancy-tests",
    askLabel: "Ask about testing",
    askHref: "/ask?stage=ttc&topic=pregnancy-tests",
  },
  expected_period: {
    heading: "Your expected period may be around now",
    body: "If your period arrives, you can update your cycle. If it does not, you may want to think about when testing feels right.",
    primaryLabel: "Read pregnancy test guidance",
    primaryHref: "/trying-to-conceive/pregnancy-tests",
    askLabel: "Ask what to do next",
    askHref: "/ask?stage=ttc&topic=when-to-ask-help",
  },
};

const TTCJourneyFocusCard = ({ stage }: { stage: TTCStage | null }) => {
  const copy = STAGE_COPY[stage ?? "before_ovulation"];
  return (
    <section
      className="rounded-[22px] px-6 sm:px-7 py-7 sm:py-8 keepsake-surface"
      style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.18)" }}
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
        style={{ color: "hsl(var(--stage-ttc-accent))" }}
      >
        Today's focus
      </p>
      <h2 className="font-serif text-[22px] sm:text-[24px] leading-snug text-foreground mb-3">
        {copy.heading}
      </h2>
      <p className="font-serif italic text-[15.5px] text-foreground/70 leading-[1.65] max-w-[52ch] mb-6">
        {copy.body}
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          to={copy.primaryHref}
          className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-sm font-medium text-white shadow-cta hover:opacity-90 transition-opacity"
          style={{ background: "hsl(var(--stage-ttc-accent))" }}
        >
          {copy.primaryLabel} <ArrowRight size={14} />
        </Link>
        <Link
          to={copy.askHref}
          className="font-sans text-[13.5px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          {copy.askLabel}
        </Link>
      </div>
    </section>
  );
};

export default TTCJourneyFocusCard;
