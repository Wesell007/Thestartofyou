import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TTCStage } from "@/lib/ttcDerived";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";

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
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
        style={{ color: "hsl(var(--stage-ttc-accent))" }}
      >
        Guidance for you
      </p>
      <h2 className="font-serif text-[20px] sm:text-[22px] text-foreground mb-5">
        Recommended reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {finalCards.map((c) => (
          <Link
            key={c.key}
            to={c.href}
            className="group rounded-[18px] px-5 py-5 keepsake-surface hover:shadow-md transition-shadow flex flex-col"
            style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
          >
            <h3 className="font-serif text-[17px] text-foreground leading-snug mb-2">
              {c.title}
            </h3>
            <p className="font-sans text-[13.5px] text-muted-foreground leading-relaxed mb-4 flex-1">
              {c.blurb}
            </p>
            <span
              className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium group-hover:gap-2 transition-all"
              style={{ color: "hsl(var(--stage-ttc-accent))" }}
            >
              Read more <ArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TTCJourneyGuidance;
