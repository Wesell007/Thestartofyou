import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TTCStage } from "@/lib/ttcDerived";
import type { TTCSupportMoment } from "@/lib/ttcSupportMoment";
import {
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_PAPER_CARD,
  TTC_QUIET_LINK,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";
import { TTCWatercolourWash } from "@/components/ttc/journey/TTCDecor";

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
    body: "Ovulation can shift, even in steady cycles. Use this as a guide rather than a guarantee.",
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

type Props = {
  stage: TTCStage | null;
  /** Phase 28E — when a support moment is active, lead with its guidance. */
  moment?: TTCSupportMoment | null;
};

const TTCJourneyFocusCard = ({ stage, moment }: Props) => {
  const stageCopy = STAGE_COPY[stage ?? "before_ovulation"];
  const copy: Copy = moment
    ? {
        heading: moment.focus.heading,
        body: moment.focus.body,
        primaryLabel: moment.focus.primary.label,
        primaryHref: moment.focus.primary.href,
        askLabel: moment.focus.ask.label,
        askHref: `/ask?stage=ttc&topic=${moment.focus.ask.topic}`,
      }
    : stageCopy;
  return (
    <section className={`relative overflow-hidden ${TTC_PAPER_CARD} ${TTC_CARD_PAD}`}>
      <TTCWatercolourWash
        className="-bottom-24 -left-20 w-[320px]"
        opacity={0.28}
      />
      <div className="relative">
        <p className={`${TTC_EYEBROW} mb-3`}>What may be useful today</p>
        <h2 className={`${TTC_HEADING} text-[22px] sm:text-[25px] mb-3`}>{copy.heading}</h2>
        <p className={`${TTC_CARD_BODY} mb-6`}>{copy.body}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link to={copy.primaryHref} className={TTC_SOFT_PILL}>
            {copy.primaryLabel} <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link to={copy.askHref} className={TTC_QUIET_LINK}>
            {copy.askLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TTCJourneyFocusCard;
