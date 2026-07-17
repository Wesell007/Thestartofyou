import { addDays, differenceInCalendarDays, parseISO } from "date-fns";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import type { TTCLog } from "@/lib/ttcLogs";
import type { TTCStage } from "@/lib/ttcDerived";

/**
 * Gentle TTC insight descriptors (Phase 9.5f).
 *
 * Pure, deterministic. Never calls analytics, never mutates state.
 * The renderer decides how to act on `action` and emits analytics.
 * Copy is intentionally non-clinical, non-diagnostic and reads as
 * "may / might / could / when you are ready".
 */

export type TTCInsightAction =
  | { kind: "link"; href: string }
  | { kind: "open_log_panel" }
  | { kind: "scroll_to_handover" };

export type TTCInsightId =
  | "positive_pregnancy_test"
  | "period_started"
  | "repeated_negative_tests"
  | "fertile_window_approaching"
  | "no_logs_yet";

export type TTCInsight = {
  id: TTCInsightId;
  heading: string;
  copy: string;
  ctaLabel: string;
  action: TTCInsightAction;
};

type Input = {
  stage: TTCStage | null;
  journey: ActiveTTCJourney;
  logs: TTCLog[];
  today?: Date;
};

const parseDate = (s: string | null | undefined): Date | null => {
  if (!s) return null;
  try {
    const d = parseISO(s);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
};

export const computeTTCInsights = ({
  stage,
  journey,
  logs,
  today = new Date(),
}: Input): TTCInsight[] => {
  const out: TTCInsight[] = [];

  const pregTests = logs.filter((l) => l.log_type === "pregnancy_test");
  const positivePreg = pregTests.find((l) => l.value === "positive");
  const periodLogs = logs
    .filter((l) => l.log_type === "period")
    .sort((a, b) => (a.log_date < b.log_date ? 1 : -1));
  const mostRecentPeriod = periodLogs[0] ?? null;
  const expectedPeriod = parseDate(journey.expected_period_date);
  const fertileStart = parseDate(journey.fertile_window_start);

  // 1. Positive pregnancy test noted
  if (positivePreg) {
    out.push({
      id: "positive_pregnancy_test",
      heading: "You have noted a positive pregnancy test",
      copy:
        "When you are ready, you can move into pregnancy guidance and estimate your due date.",
      ctaLabel: "Start pregnancy handover",
      action: { kind: "scroll_to_handover" },
    });
  }

  // 2. Period started (near or past expected period)
  if (
    mostRecentPeriod &&
    mostRecentPeriod.value === "started" &&
    expectedPeriod
  ) {
    const logDate = parseDate(mostRecentPeriod.log_date);
    if (logDate && logDate.getTime() >= addDays(expectedPeriod, -2).getTime()) {
      out.push({
        id: "period_started",
        heading: "This may be the start of a new cycle",
        copy:
          "If this is your new cycle start, you can update your TTC setup when you are ready.",
        ctaLabel: "Update TTC setup",
        action: { kind: "link", href: "/setup/trying-to-conceive" },
      });
    }
  }

  // 3. Repeated negative or unclear tests in last 14 days
  const recentUnhelpful = pregTests.filter((l) => {
    if (l.value !== "negative" && l.value !== "unclear") return false;
    const d = parseDate(l.log_date);
    if (!d) return false;
    const diff = differenceInCalendarDays(today, d);
    return diff >= 0 && diff <= 14;
  });
  if (recentUnhelpful.length >= 2 && !positivePreg) {
    out.push({
      id: "repeated_negative_tests",
      heading: "Testing can feel confusing",
      copy:
        "Repeated testing can make the wait feel heavier. If your period does not arrive or you feel worried, you can ask a GP, midwife or local service for advice.",
      ctaLabel: "Ask what to do next",
      action: { kind: "link", href: "/ask?stage=ttc&topic=pregnancy-tests" },
    });
  }

  // 4. Stage-based card (anticipatory only — Today's focus owns current-stage guidance)
  if (stage) {
    if (stage === "before_ovulation" && fertileStart) {
      const daysToStart = differenceInCalendarDays(fertileStart, today);
      if (daysToStart >= 0 && daysToStart <= 3) {
        out.push({
          id: "fertile_window_approaching",
          heading: "Your fertile window may be coming up",
          copy:
            "This can be a good time to notice your cycle pattern without turning every day into a test.",
          ctaLabel: "Read about ovulation",
          action: { kind: "link", href: "/trying-to-conceive/ovulation" },
        });
      }
    }
  }

  // 5. No logs yet
  if (logs.length === 0) {
    out.push({
      id: "no_logs_yet",
      heading: "Start with what feels useful",
      copy:
        "You do not need to track everything. A period start, ovulation test or note can be enough to help you come back to this cycle later.",
      ctaLabel: "Add a note",
      action: { kind: "open_log_panel" },
    });
  }

  return out.slice(0, 4);
};
