import type { CareEventType } from "@/lib/firstYearCareEventsSchema";
import { CARE_EVENT_LABELS, CARE_EVENT_TYPES } from "@/lib/firstYearCareEventsSchema";
import { FY_FOCUS_RING, FY_INNER_RADIUS } from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  onAdd: (type: CareEventType) => void;
  disabled?: boolean;
};

const HINTS: Record<CareEventType, string> = {
  feed: "Breast, bottle or more",
  sleep: "Start now or add later",
  nappy: "Wet, dirty or both",
  pump: "Time and amount",
  note: "Anything else",
};

/**
 * Five warm quick-add buttons. Two taps to log a moment, one-handed.
 */
const QuickAddRow = ({ onAdd, disabled }: Props) => (
  <section aria-labelledby="fy-log-today" className="pb-8">
    <h2 id="fy-log-today" className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-3">
      Log today
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
      {CARE_EVENT_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          disabled={disabled}
          onClick={() => onAdd(type)}
          className={`${FY_INNER_RADIUS} ${FY_FOCUS_RING} flex min-h-[76px] flex-col items-start justify-center gap-1 border px-4 py-3 text-left transition-colors disabled:opacity-60`}
          style={{
            borderColor: "hsl(var(--stage-firstyear-accent) / 0.25)",
            backgroundColor: "hsl(var(--stage-firstyear) / 0.5)",
          }}
        >
          <span className="font-sans text-[14.5px] font-semibold text-foreground">
            {CARE_EVENT_LABELS[type]}
          </span>
          <span className="font-sans text-[12px] leading-[1.5] text-[hsl(var(--stage-firstyear-text-soft))]">
            {HINTS[type]}
          </span>
        </button>
      ))}
    </div>
  </section>
);

export default QuickAddRow;
