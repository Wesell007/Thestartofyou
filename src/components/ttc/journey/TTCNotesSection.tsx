import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import { splitTTCLogsByCycle, type TTCLog, type TTCLogType } from "@/lib/ttcLogs";
import TTCJourneyCalendar from "@/components/ttc/journey/TTCJourneyCalendar";
import TTCLogList from "@/components/ttc/journey/TTCLogList";
import { TTCBotanicalSprig } from "@/components/ttc/journey/TTCDecor";
import {
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_FOCUS_RING,
  TTC_HEADING,
  TTC_HELPER,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD_WARM,
  TTC_QUIET_LINK,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";

/**
 * Phase 28D — private cycle notes.
 *
 * Presentation only. Quick chips open the existing log panel with an existing
 * log type preselected, and grouping uses the log dates already saved.
 */

type QuickChip = { label: string; type: TTCLogType; value?: string };

const QUICK_CHIPS: QuickChip[] = [
  { label: "Period started", type: "period", value: "started" },
  { label: "Ovulation test", type: "ovulation_test" },
  { label: "Pregnancy test", type: "pregnancy_test" },
  { label: "Feeling", type: "mood" },
  { label: "Body note", type: "cramps" },
  { label: "Energy", type: "energy" },
  { label: "Note", type: "note" },
];

type Props = {
  journey: ActiveTTCJourney;
  logs: TTCLog[];
  logError: string | null;
  onRetry: () => void;
  onQuickAdd: (type: TTCLogType, value?: string) => void;
  onSelectDate: (dateIso: string) => void;
  onAddForToday: () => void;
  onEdit: (log: TTCLog) => void;
  onDeleted: () => void;
};

const TTCNotesSection = ({
  journey,
  logs,
  logError,
  onRetry,
  onQuickAdd,
  onSelectDate,
  onAddForToday,
  onEdit,
  onDeleted,
}: Props) => {
  const [showEarlier, setShowEarlier] = useState(false);

  const { thisCycle, earlier } = useMemo(
    () => splitTTCLogsByCycle(logs, journey.last_period_date ?? null),
    [logs, journey.last_period_date],
  );

  return (
    <div className="space-y-5">
      <div className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD}`}>
        <TTCBotanicalSprig className="-top-8 -right-8 w-[140px]" opacity={0.24} />
        <div className="relative">
          <p className={`${TTC_EYEBROW} mb-2`}>Only you can see this</p>
          <h2 className={`${TTC_HEADING} text-[22px] sm:text-[25px] mb-2`}>
            Your private cycle notes
          </h2>
          <p className={`${TTC_HELPER} max-w-[56ch]`}>
            Small notes for this cycle, kept private to you. Add what helps and
            leave the rest. Nothing here changes your cycle estimates.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => onQuickAdd(chip.type, chip.value)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-pill border border-[hsl(var(--stage-ttc-olive)/0.22)] bg-[hsl(var(--stage-ttc-sage)/0.7)] px-4 font-sans text-[13px] font-medium text-[hsl(var(--stage-ttc-olive))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage))] ${TTC_FOCUS_RING}`}
              >
                <Plus size={13} aria-hidden="true" />
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {logError && (
        <div role="alert" className="flex items-center gap-3 text-sm text-destructive">
          <span>{logError}</span>
          <button
            type="button"
            onClick={onRetry}
            className={`min-h-11 rounded-sm underline underline-offset-4 ${TTC_FOCUS_RING}`}
          >
            Refresh notes
          </button>
        </div>
      )}

      <div>
        <p className={`${TTC_EYEBROW} mb-3`}>This cycle</p>
        {thisCycle.length > 0 ? (
          <TTCLogList logs={thisCycle} onEdit={onEdit} onDeleted={onDeleted} />
        ) : (
          <div
            className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.6)] px-5 py-5`}
          >
            <p className="font-serif italic text-[15px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))]">
              No notes yet for this cycle. You can add one small note whenever
              it helps. You do not need to note everything.
            </p>
            <button
              type="button"
              onClick={onAddForToday}
              className={`${TTC_SOFT_PILL} mt-4`}
            >
              <Plus size={14} aria-hidden="true" /> Add a note
            </button>
          </div>
        )}
      </div>

      <div>
        <p className={`${TTC_EYEBROW} mb-3`}>Calendar</p>
        <TTCJourneyCalendar
          journey={journey}
          logs={logs}
          onSelectDate={onSelectDate}
          onAddForToday={onAddForToday}
        />
      </div>

      {earlier.length > 0 && (
        <div>
          <p className={`${TTC_EYEBROW} mb-3`}>Earlier notes</p>
          {showEarlier ? (
            <TTCLogList logs={earlier} onEdit={onEdit} onDeleted={onDeleted} />
          ) : (
            <button
              type="button"
              onClick={() => setShowEarlier(true)}
              className={TTC_QUIET_LINK}
            >
              Look back at {earlier.length} earlier{" "}
              {earlier.length === 1 ? "note" : "notes"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TTCNotesSection;
