import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBirthPlanSummary } from "@/hooks/useBirthPlan";
import { statusFromCompletion, statusLabel as birthPlanStatusLabel } from "@/lib/birthPlanSchema";
import { useHospitalBagSummary } from "@/hooks/useHospitalBag";
import { useAppointmentsSummary } from "@/hooks/usePregnancyAppointments";
import { useBabyMovementNotesSummary } from "@/hooks/useBabyMovementNotes";
import { useContractionSessionsSummary } from "@/hooks/useContractionTimer";
import { usePregnancySymptomNotesSummary } from "@/hooks/usePregnancySymptomNotes";
import { useMidwifeQuestionsSummary } from "@/hooks/useMidwifeQuestions";
import type { PregnancyJourneyStatus } from "@/lib/savedJourney";

/**
 * ToolkitEntryPanel — live entry point into the Pregnancy Toolkit from
 * /my-journey. Read-only. Rows appear only when there is real data.
 *
 * `status` shapes the CTA label and adds a quiet subtitle for non-active
 * journeys. Data itself is never hidden here — the reveal-toggle for the
 * loss state lives on /pregnancy-toolkit, not in this side panel.
 */
const ToolkitEntryPanel = ({ status = "active" }: { status?: PregnancyJourneyStatus }) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";

  const { row: bpRow } = useBirthPlanSummary();
  const { progress: hbProgress, hasRows: hbHasRows } = useHospitalBagSummary();
  const { total: apTotal } = useAppointmentsSummary();
  const { total: bmTotal } = useBabyMovementNotesSummary();
  const { total: ctTotal } = useContractionSessionsSummary();
  const { total: snTotal } = usePregnancySymptomNotesSummary();
  const { total: mqTotal } = useMidwifeQuestionsSummary();

  const rows: { label: string; status: string; to: string }[] = [];

  if (bpRow && bpRow.completion > 0) {
    rows.push({
      label: "Birth plan",
      status: birthPlanStatusLabel(
        statusFromCompletion(bpRow.completion, true),
      ),
      to: "/pregnancy-toolkit/birth-plan",
    });
  }

  if (hbHasRows && hbProgress.packed > 0) {
    rows.push({
      label: "Hospital bag",
      status: `${hbProgress.packed} of ${hbProgress.total} packed`,
      to: "/pregnancy-toolkit/hospital-bag",
    });
  }

  if (apTotal > 0) {
    rows.push({
      label: "Appointment notes",
      status: apTotal === 1 ? "1 note saved" : `${apTotal} notes saved`,
      to: "/pregnancy-toolkit/appointments",
    });
  }

  if (bmTotal > 0) {
    rows.push({
      label: "Baby movement notes",
      status: bmTotal === 1 ? "1 note saved" : `${bmTotal} notes saved`,
      to: "/pregnancy-toolkit/baby-movements",
    });
  }

  if (ctTotal > 0) {
    rows.push({
      label: "Contraction timer",
      status: ctTotal === 1 ? "1 session saved" : `${ctTotal} sessions saved`,
      to: "/pregnancy-toolkit/contraction-timer",
    });
  }

  if (snTotal > 0) {
    rows.push({
      label: "Symptom notes",
      status: snTotal === 1 ? "1 note saved" : `${snTotal} notes saved`,
      to: "/pregnancy-toolkit/symptom-notes",
    });
  }

  if (mqTotal > 0) {
    rows.push({
      label: "Questions for midwife",
      status: mqTotal === 1 ? "1 question saved" : `${mqTotal} questions saved`,
      to: "/pregnancy-toolkit/questions-for-midwife",
    });
  }

  return (
    <section
      className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8 mt-2 mb-12"
      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.2)" }}
      aria-label="From your toolkit"
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: accent }}
      >
        From your toolkit
      </p>

      {rows.length === 0 ? (
        <p className="font-serif text-foreground/78 text-[15px] leading-[1.6] max-w-[46ch] mb-6">
          Your toolkit will appear here once you start planning.
        </p>
      ) : (
        <ul className="divide-y" style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}>
          {rows.slice(0, 4).map((r) => (
            <li key={r.label}>
              <Link
                to={r.to}
                className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
              >
                <span className="font-serif text-foreground text-[15px] sm:text-[15.5px] leading-[1.35]">
                  {r.label}
                </span>
                <span
                  className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase whitespace-nowrap transition-colors group-hover:text-foreground"
                  style={{ color: "hsl(var(--foreground) / 0.7)" }}
                >
                  {r.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div
        className="mt-6 pt-5 border-t"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.2)" }}
      >
        <Link
          to="/pregnancy-toolkit"
          className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.24em] uppercase transition-colors"
          style={{ color: accent }}
        >
          {status === "paused" || status === "no_longer_pregnant"
            ? "Open Pregnancy Toolkit"
            : status === "given_birth" || status === "pregnancy_loss"
              ? "Open Pregnancy Toolkit"
              : "Open your pregnancy toolkit"}
          <ArrowRight
            size={12}
            strokeWidth={1.8}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
};

export default ToolkitEntryPanel;
