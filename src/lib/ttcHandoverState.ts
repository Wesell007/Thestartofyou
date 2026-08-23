import { parseDateOnly } from "@/lib/dateOnly";
import type { TTCLog } from "@/lib/ttcLogs";

/**
 * Phase 28G — the pregnancy handover state for the signed-in TTC journey.
 *
 * Pure and deterministic. It reads only what the page already holds: the
 * pregnancy pointer the page has already resolved, the saved cycle start and
 * the type, value and date of existing logs. No note text, no identifiers and
 * no log rows leave this module, nothing is written and nothing is diagnosed.
 */

export type TTCHandoverState =
  | "neutral"
  | "positive_test_logged"
  | "active_pregnancy_exists";

type Input = {
  /** Already resolved by the page from the existing journeys pointer. */
  hasActivePregnancy: boolean;
  logs: TTCLog[];
  /** The cycle start saved during TTC setup, as yyyy-MM-dd. */
  cycleStart?: string | null;
};

/**
 * True only when a pregnancy test log with a positive value sits on or after
 * the saved cycle start. Without a saved cycle start we cannot tell which
 * cycle an older log belongs to, so it is never treated as current evidence.
 */
export const hasCurrentCyclePositiveTest = ({
  logs,
  cycleStart,
}: {
  logs: TTCLog[];
  cycleStart?: string | null;
}): boolean => {
  const start = parseDateOnly(cycleStart ?? null);
  if (!start) return false;
  return logs.some((log) => {
    if (log.log_type !== "pregnancy_test" || log.value !== "positive") return false;
    const logged = parseDateOnly(log.log_date);
    return Boolean(logged && logged.getTime() >= start.getTime());
  });
};

export const computeTTCHandoverState = ({
  hasActivePregnancy,
  logs,
  cycleStart,
}: Input): TTCHandoverState => {
  if (hasActivePregnancy) return "active_pregnancy_exists";
  if (hasCurrentCyclePositiveTest({ logs, cycleStart })) return "positive_test_logged";
  return "neutral";
};

export type TTCHandoverCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  supportLine: string;
  primary: string;
  secondary: string;
};

export const TTC_HANDOVER_COPY: Record<
  "neutral" | "positive_test_logged",
  TTCHandoverCopy
> = {
  positive_test_logged: {
    eyebrow: "A possible new chapter",
    heading: "Ready to move into pregnancy guidance?",
    body: "You logged a positive test. When you feel ready, we can help you start pregnancy guidance using the dates you saved.",
    supportLine: "Nothing will move automatically. Your TTC notes stay here.",
    primary: "Start pregnancy guidance",
    secondary: "Stay with TTC for now",
  },
  neutral: {
    eyebrow: "A new chapter, if it comes",
    heading: "Ready to move into pregnancy guidance?",
    body: "If you have a positive test and feel ready, we can help you move from TTC into pregnancy support.",
    supportLine: "Nothing moves automatically. Your TTC notes stay here.",
    primary: "Start pregnancy guidance",
    secondary: "Use due date calculator",
  },
};

export const TTC_HANDOVER_DIALOG = {
  title: "Move into pregnancy guidance?",
  body: "We will use the dates you saved to help start your pregnancy guidance. Your TTC notes will stay private and unchanged.",
  primary: "Continue",
  secondary: "Not yet",
};

export const TTC_HANDOVER_PAUSED = {
  eyebrow: "Pregnancy guidance active",
  heading: "You have moved into pregnancy guidance",
  body: "Your TTC journey can stay here as part of the story. You can return to these notes whenever you need to.",
  cta: "Go to pregnancy guidance",
};

/** Today card acknowledgement when the handover is raised. */
export const TTC_HANDOVER_TODAY = {
  headline: "You may be ready for a new step",
  support:
    "When you feel ready, you can move into pregnancy guidance. Nothing changes automatically.",
};

/** Every new user-facing string, for copy guard tests. */
export const ttcHandoverStrings = (): string[] => [
  ...Object.values(TTC_HANDOVER_COPY).flatMap((c) => Object.values(c)),
  ...Object.values(TTC_HANDOVER_DIALOG),
  ...Object.values(TTC_HANDOVER_PAUSED),
  ...Object.values(TTC_HANDOVER_TODAY),
];
