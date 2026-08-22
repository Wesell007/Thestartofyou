import { differenceInCalendarDays } from "date-fns";
import type { TTCLog, TTCLogType } from "@/lib/ttcLogs";
import type { TTCStage } from "@/lib/ttcDerived";
import { parseDateOnly } from "@/lib/dateOnly";

/**
 * Phase 28E — emotional support moments for the signed-in TTC journey.
 *
 * Pure and deterministic. Reads only the stage that has already been derived
 * and the logs the user has already saved. It never calculates cycle dates,
 * never writes anything, never diagnoses and never promises an outcome.
 */

export type TTCSupportAction =
  | { kind: "note"; label: string; logType: TTCLogType; value?: string }
  | { kind: "link"; label: string; href: string }
  | { kind: "ask"; label: string; topic: string };

export type TTCSupportMomentId =
  | "period_arrived"
  | "after_test_result"
  | "possible_test_day"
  | "two_week_wait";

export type TTCSupportMoment = {
  id: TTCSupportMomentId;
  eyebrow: string;
  heading: string;
  body: string;
  supportLine: string;
  /** Optional quiet clarification, used where wording must not overclaim. */
  note?: string;
  actions: TTCSupportAction[];
  /** Copy the Today card may use in place of its stage default. */
  today: { headline: string; support: string };
  /** Copy the "What may be useful today" card may use. */
  focus: {
    heading: string;
    body: string;
    primary: { label: string; href: string };
    ask: { label: string; topic: string };
  };
};

const PERIOD_WINDOW_DAYS = 7;
const TEST_RESULT_WINDOW_DAYS = 5;

const withinWindow = (iso: string, today: Date, window: number) => {
  const d = parseDateOnly(iso);
  if (!d) return false;
  const diff = differenceInCalendarDays(today, d);
  return diff >= 0 && diff <= window;
};

export const hasRecentPeriodStarted = (logs: TTCLog[], today = new Date()): boolean =>
  logs.some(
    (l) =>
      l.log_type === "period" &&
      l.value === "started" &&
      withinWindow(l.log_date, today, PERIOD_WINDOW_DAYS),
  );

export const hasPositivePregnancyTest = (logs: TTCLog[]): boolean =>
  logs.some((l) => l.log_type === "pregnancy_test" && l.value === "positive");

export const hasRecentUnhelpfulTest = (logs: TTCLog[], today = new Date()): boolean =>
  logs.some(
    (l) =>
      l.log_type === "pregnancy_test" &&
      (l.value === "negative" || l.value === "unclear") &&
      withinWindow(l.log_date, today, TEST_RESULT_WINDOW_DAYS),
  );

const TWO_WEEK_WAIT: TTCSupportMoment = {
  id: "two_week_wait",
  eyebrow: "Support for this part",
  heading: "Moving through the wait",
  body: "This part can feel slow. You do not need to read into every small change.",
  supportLine: "One note is enough if writing something down helps.",
  actions: [
    { kind: "note", label: "Add a note", logType: "note" },
    {
      kind: "link",
      label: "Read two-week wait guidance",
      href: "/trying-to-conceive/two-week-wait",
    },
    { kind: "ask", label: "Ask about the wait", topic: "two-week-wait" },
  ],
  today: {
    headline: "You may be moving through the wait",
    support: "You do not need to read into every small change.",
  },
  focus: {
    heading: "Getting through the wait",
    body: "What you notice may come and go. Keeping the days gentle can help more than watching for every sign.",
    primary: {
      label: "Read two-week wait guidance",
      href: "/trying-to-conceive/two-week-wait",
    },
    ask: { label: "Ask about the wait", topic: "two-week-wait" },
  },
};

const POSSIBLE_TEST_DAY: TTCSupportMoment = {
  id: "possible_test_day",
  eyebrow: "Support for this part",
  heading: "You may be near a possible test day",
  body: "If testing feels right, take it one step at a time. If you would rather wait, that is okay too.",
  supportLine: "There is no rush, and nothing you have to decide today.",
  actions: [
    {
      kind: "link",
      label: "Read test guidance",
      href: "/trying-to-conceive/pregnancy-tests",
    },
    { kind: "note", label: "Add a pregnancy test note", logType: "pregnancy_test" },
    { kind: "ask", label: "Ask what to do next", topic: "pregnancy-tests" },
  ],
  today: {
    headline: "You may be near a possible test day",
    support: "If testing feels right you can, and if you would rather wait, that is okay too.",
  },
  focus: {
    heading: "If testing is on your mind",
    body: "Testing around or after your expected period may give a clearer picture than testing very early.",
    primary: {
      label: "Read test guidance",
      href: "/trying-to-conceive/pregnancy-tests",
    },
    ask: { label: "Ask about testing", topic: "pregnancy-tests" },
  },
};

const AFTER_TEST_RESULT: TTCSupportMoment = {
  id: "after_test_result",
  eyebrow: "Support for this part",
  heading: "After a test result",
  body: "A negative or unclear result can feel heavy. Timing can matter, and you do not need to decide everything today.",
  supportLine: "Anything you write here is private to you.",
  actions: [
    {
      kind: "link",
      label: "Understand test timing",
      href: "/trying-to-conceive/pregnancy-tests",
    },
    { kind: "note", label: "Add how you feel", logType: "mood" },
    { kind: "ask", label: "Ask Cindy", topic: "pregnancy-tests" },
    { kind: "note", label: "My period arrived", logType: "period", value: "started" },
  ],
  note: "Adding a period note does not change your saved cycle start. Log it here, then update your TTC setup if you want this cycle to become the new starting point.",
  today: {
    headline: "You have noted a test result",
    support: "A negative or unclear result can feel heavy. Nothing needs deciding today.",
  },
  focus: {
    heading: "What may help after a test",
    body: "Test timing can change what a result shows. If your period does not arrive, or you feel worried, a GP or midwife can help.",
    primary: {
      label: "Understand test timing",
      href: "/trying-to-conceive/pregnancy-tests",
    },
    ask: { label: "Ask what to do next", topic: "when-to-ask-help" },
  },
};

const PERIOD_ARRIVED: TTCSupportMoment = {
  id: "period_arrived",
  eyebrow: "Support for this part",
  heading: "When your period arrives",
  body: "That can bring a lot with it. You can note what happened, then update your setup when you feel ready.",
  supportLine: "Only you can see what you write here.",
  actions: [
    { kind: "link", label: "Update this cycle", href: "/setup/trying-to-conceive" },
    { kind: "note", label: "Add a note", logType: "note" },
    {
      kind: "link",
      label: "Read cycle guidance",
      href: "/trying-to-conceive/cycle-tracking",
    },
    { kind: "ask", label: "Ask for support", topic: "cycle-tracking" },
  ],
  note: "Your saved cycle start stays as it is until you update your TTC setup.",
  today: {
    headline: "Your period may have arrived",
    support: "You can take this slowly and update your setup when you feel ready.",
  },
  focus: {
    heading: "Starting a new cycle",
    body: "When you feel ready, updating your cycle details keeps the dates on this page closer to what you are living.",
    primary: { label: "Update this cycle", href: "/setup/trying-to-conceive" },
    ask: { label: "Ask for support", topic: "cycle-tracking" },
  },
};

type Input = {
  stage: TTCStage | null;
  logs: TTCLog[];
  today?: Date;
};

/**
 * Returns at most one support moment, by priority. Suppressed entirely when a
 * positive pregnancy test has been noted so the existing pregnancy handover
 * keeps priority.
 */
export const computeTTCSupportMoment = ({
  stage,
  logs,
  today = new Date(),
}: Input): TTCSupportMoment | null => {
  if (hasPositivePregnancyTest(logs)) return null;
  if (hasRecentPeriodStarted(logs, today)) return PERIOD_ARRIVED;
  if (hasRecentUnhelpfulTest(logs, today)) return AFTER_TEST_RESULT;
  if (stage === "test_window" || stage === "expected_period") return POSSIBLE_TEST_DAY;
  if (stage === "two_week_wait") return TWO_WEEK_WAIT;
  return null;
};

/** Every user-facing string a moment can render. Used by copy guard tests. */
export const supportMomentStrings = (m: TTCSupportMoment): string[] => [
  m.eyebrow,
  m.heading,
  m.body,
  m.supportLine,
  ...(m.note ? [m.note] : []),
  ...m.actions.map((a) => a.label),
  m.today.headline,
  m.today.support,
  m.focus.heading,
  m.focus.body,
  m.focus.primary.label,
  m.focus.ask.label,
];

export const ALL_TTC_SUPPORT_MOMENTS: TTCSupportMoment[] = [
  PERIOD_ARRIVED,
  AFTER_TEST_RESULT,
  POSSIBLE_TEST_DAY,
  TWO_WEEK_WAIT,
];
