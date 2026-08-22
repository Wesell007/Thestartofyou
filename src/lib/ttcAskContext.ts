import { format } from "date-fns";
import { stageLabel, type TTCStage } from "@/lib/ttcDerived";
import type { TTCSupportMomentId } from "@/lib/ttcSupportMoment";

/**
 * Phase 28F — builds the small, non-identifying context string sent with the
 * TTC Ask companion card.
 *
 * Deliberately excluded: note text, log notes, whole log rows, first names,
 * companion names, emails, user or journey identifiers, years and any raw
 * journey record. Only coarse facts already shown on the TTC journey page are
 * included, and log-derived facts are reduced to booleans.
 */

export const TTC_ASK_CONTEXT_MAX_LENGTH = 500;

/** The only Ask topics this surface may link to. */
export const TTC_ASK_TOPICS = [
  "two-week-wait",
  "pregnancy-tests",
  "cycle-tracking",
  "fertile-window",
  "when-to-ask-help",
] as const;

export type TTCAskTopic = (typeof TTC_ASK_TOPICS)[number];

export interface TTCAskContextInput {
  stage: TTCStage | null;
  cycleDay?: number | null;
  momentId?: TTCSupportMomentId | null;
  possibleTestDate?: Date | null;
  expectedPeriodDate?: Date | null;
  /** Whether a recent negative or unclear test was noted. Boolean only. */
  hasRecentUnclearOrNegativeTest?: boolean;
  /** Whether a recent period-started note exists. Boolean only. */
  hasRecentPeriodStarted?: boolean;
}

/** Day and month only, never the year. */
const dayMonth = (date: Date): string | null =>
  Number.isNaN(date.getTime()) ? null : format(date, "d MMMM");

const MOMENT_HINT: Record<TTCSupportMomentId, string> = {
  two_week_wait: "They may be in the wait after ovulation.",
  possible_test_day: "They may be near a possible test day.",
  after_test_result: "They noted a negative or unclear test recently.",
  period_arrived: "They noted that their period arrived recently.",
};

export function buildTTCAskContext({
  stage,
  cycleDay,
  momentId,
  possibleTestDate,
  expectedPeriodDate,
  hasRecentUnclearOrNegativeTest,
  hasRecentPeriodStarted,
}: TTCAskContextInput): string {
  const parts: string[] = [
    "The person is reading their private trying to conceive journey page.",
  ];

  if (stage) parts.push(`Stage from the dates they saved: ${stageLabel(stage)}.`);
  if (typeof cycleDay === "number" && cycleDay > 0 && cycleDay < 400) {
    parts.push(`Around day ${Math.round(cycleDay)} of this cycle.`);
  }
  if (possibleTestDate) {
    const label = dayMonth(possibleTestDate);
    if (label) parts.push(`Possible test day around ${label}.`);
  }
  if (expectedPeriodDate) {
    const label = dayMonth(expectedPeriodDate);
    if (label) parts.push(`Period expected around ${label}.`);
  }
  if (hasRecentUnclearOrNegativeTest) {
    parts.push("A recent pregnancy test was negative or unclear.");
  }
  if (hasRecentPeriodStarted) parts.push("A recent note says their period started.");
  if (momentId) parts.push(MOMENT_HINT[momentId]);

  parts.push("All dates are estimates from the cycle details they saved.");

  return parts.join(" ").slice(0, TTC_ASK_CONTEXT_MAX_LENGTH).trimEnd();
}

export interface TTCAskChip {
  label: string;
  question: string;
  topic: TTCAskTopic;
}

/** Every chip this surface may offer. Safe, non-diagnostic prompts only. */
export const TTC_ASK_CHIPS: TTCAskChip[] = [
  {
    label: "Help me through the wait",
    question: "How can I look after myself while I wait to test?",
    topic: "two-week-wait",
  },
  {
    label: "Help me not overthink today",
    question: "How can I stop overthinking this part of my cycle?",
    topic: "two-week-wait",
  },
  {
    label: "Testing timing",
    question: "When may it be worth taking a pregnancy test?",
    topic: "pregnancy-tests",
  },
  {
    label: "My test was negative",
    question:
      "My pregnancy test was negative. What may help me think about timing from here?",
    topic: "pregnancy-tests",
  },
  {
    label: "My period arrived",
    question: "My period has arrived. What may help me at the start of a new cycle?",
    topic: "cycle-tracking",
  },
  {
    label: "What can I note today?",
    question: "What may be worth noting today in my cycle notes?",
    topic: "cycle-tracking",
  },
  {
    label: "What could I ask a GP?",
    question: "What may be worth asking a GP or clinician about trying to conceive?",
    topic: "when-to-ask-help",
  },
];

const CHIP_BY_LABEL = new Map(TTC_ASK_CHIPS.map((c) => [c.label, c]));

const MOMENT_CHIP_ORDER: Record<TTCSupportMomentId, string[]> = {
  two_week_wait: ["Help me through the wait", "Help me not overthink today"],
  possible_test_day: ["Testing timing", "What can I note today?"],
  after_test_result: ["My test was negative", "Testing timing"],
  period_arrived: ["My period arrived", "What can I note today?"],
};

const STAGE_CHIP_ORDER: Partial<Record<TTCStage, string[]>> = {
  before_ovulation: ["What can I note today?"],
  fertile_window: ["What can I note today?"],
  likely_ovulation: ["What can I note today?"],
  two_week_wait: ["Help me through the wait"],
  test_window: ["Testing timing"],
  expected_period: ["Testing timing"],
};

/**
 * Returns the chips in a supportive order for the current moment or stage.
 * The set never changes, only the order, so no unsafe prompt can appear.
 */
export const ttcAskChipsFor = (
  stage: TTCStage | null,
  momentId?: TTCSupportMomentId | null,
  limit = 4,
): TTCAskChip[] => {
  const leadLabels = momentId
    ? MOMENT_CHIP_ORDER[momentId]
    : (stage && STAGE_CHIP_ORDER[stage]) || [];
  const lead = leadLabels
    .map((label) => CHIP_BY_LABEL.get(label))
    .filter((c): c is TTCAskChip => Boolean(c));
  const rest = TTC_ASK_CHIPS.filter((c) => !lead.includes(c));
  return [...lead, ...rest].slice(0, limit);
};

/** The topic used for the link into the full Ask page. */
export const ttcAskTopicFor = (
  stage: TTCStage | null,
  momentId?: TTCSupportMomentId | null,
): TTCAskTopic => {
  if (momentId === "after_test_result" || momentId === "possible_test_day") {
    return "pregnancy-tests";
  }
  if (momentId === "period_arrived") return "cycle-tracking";
  if (momentId === "two_week_wait") return "two-week-wait";
  if (stage === "fertile_window" || stage === "likely_ovulation") return "fertile-window";
  if (stage === "two_week_wait") return "two-week-wait";
  if (stage === "test_window" || stage === "expected_period") return "pregnancy-tests";
  return "cycle-tracking";
};

/** Display-only companion naming. The name never leaves the browser. */
export const askHeadingFor = (name: string | null): string =>
  name ? `Ask ${name} about this part` : "Ask about this part";

export const askButtonLabelFor = (name: string | null): string =>
  name ? `Ask ${name}` : "Ask your companion";
