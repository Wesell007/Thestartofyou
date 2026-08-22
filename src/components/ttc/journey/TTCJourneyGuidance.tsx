import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TTCStage } from "@/lib/ttcDerived";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import {
  TTC_CARD_TITLE,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_HELPER,
  TTC_PAPER_CARD,
  TTC_TILE_PAD,
  TTC_FOCUS_RING,
} from "@/components/ttc/journey/ttcStyles";

type Card = { key: string; title: string; blurb: string; href: string };

const CARDS: Record<string, Card> = {
  ovulation: {
    key: "ovulation",
    title: "Ovulation and fertile window",
    blurb: "How your body signals ovulation and when conception is more likely.",
    href: "/trying-to-conceive/ovulation",
  },
  cycle_tracking: {
    key: "cycle_tracking",
    title: "Cycle tracking",
    blurb: "Simple ways to notice your pattern without turning it into pressure.",
    href: "/trying-to-conceive/cycle-tracking",
  },
  two_week_wait: {
    key: "two_week_wait",
    title: "Two-week wait",
    blurb: "Gentle ways to move through the wait between ovulation and testing.",
    href: "/trying-to-conceive/two-week-wait",
  },
  pregnancy_tests: {
    key: "pregnancy_tests",
    title: "Pregnancy tests",
    blurb: "When to test, what results can mean and how to think about early testing.",
    href: "/trying-to-conceive/pregnancy-tests",
  },
  fertility: {
    key: "fertility",
    title: "Thinking about fertility support",
    blurb: "Options and questions to consider when you'd like more guidance.",
    href: "/trying-to-conceive/fertility",
  },
  ivf: {
    key: "ivf",
    title: "IVF and treatment guidance",
    blurb: "Understanding the process, expectations and what to ask along the way.",
    href: "/ivf",
  },
};

const orderForStage = (stage: TTCStage | null): string[] => {
  switch (stage) {
    case "fertile_window":
    case "likely_ovulation":
      return ["ovulation", "cycle_tracking", "two_week_wait", "pregnancy_tests"];
    case "two_week_wait":
    case "test_window":
      return ["two_week_wait", "pregnancy_tests", "ovulation", "cycle_tracking"];
    case "expected_period":
      return ["pregnancy_tests", "two_week_wait", "cycle_tracking", "ovulation"];
    default:
      return ["ovulation", "cycle_tracking", "two_week_wait", "pregnancy_tests"];
  }
};

type Props = { stage: TTCStage | null; journey: ActiveTTCJourney };

const TTCJourneyGuidance = ({ stage, journey }: Props) => {
  const base = orderForStage(stage);

  // Quietly add fertility/ivf cards where relevant, cap at 4 total.
  const extras: string[] = [];
  if (
    journey.support_status === "considering_help" ||
    journey.support_status === "in_treatment"
  ) {
    extras.push("fertility");
  }
  if (
    journey.ivf_consideration === "considering" ||
    journey.ivf_consideration === "in_treatment"
  ) {
    extras.push("ivf");
  }

  // Merge: prepend one extra if present, keep total <= 4.
  let keys = [...base];
  if (extras.length > 0) {
    keys = [extras[0], ...base.filter((k) => k !== extras[0])];
    if (extras[1]) {
      keys = [extras[0], extras[1], ...base.filter((k) => !extras.includes(k))];
    }
  }
  const finalCards = keys.slice(0, 4).map((k) => CARDS[k]).filter(Boolean);

  return (
    <section>
      <p className={`${TTC_EYEBROW} mb-3`}>Guidance for you</p>
      <h2 className={`${TTC_HEADING} text-[21px] sm:text-[23px] mb-5`}>
        Helpful reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {finalCards.map((c) => (
          <Link
            key={c.key}
            to={c.href}
            className={`group ${TTC_PAPER_CARD} ${TTC_TILE_PAD} flex flex-col transition-shadow hover:shadow-md ${TTC_FOCUS_RING}`}
          >
            <h3 className={`${TTC_CARD_TITLE} mb-2`}>{c.title}</h3>
            <p className={`${TTC_HELPER} mb-4 flex-1`}>{c.blurb}</p>
            <span className="inline-flex min-h-[24px] items-center gap-1.5 font-sans text-[12.5px] font-medium text-[hsl(var(--stage-ttc-olive))] transition-all group-hover:gap-2">
              Read more <ArrowRight size={13} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TTCJourneyGuidance;
