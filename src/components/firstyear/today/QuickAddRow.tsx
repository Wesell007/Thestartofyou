import { Baby, HeartHandshake, Milk, Moon } from "lucide-react";
import type { QuickAddType } from "@/lib/firstYearCareEventsSchema";
import { CARE_EVENT_LABELS, QUICK_ADD_TYPES } from "@/lib/firstYearCareEventsSchema";
import {
  FY_FOCUS_RING,
  FY_INNER_RADIUS,
  FY_TYPE_TINT,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  onAdd: (type: QuickAddType) => void;
  disabled?: boolean;
};

const HINTS: Record<QuickAddType, string> = {
  feed: "Breast or bottle",
  sleep: "Start now or add later",
  nappy: "Wee, poo, both or dry",
  note: "Anything else",
};

const ICONS: Record<QuickAddType, typeof Milk> = {
  feed: Milk,
  sleep: Moon,
  nappy: Baby,
  note: HeartHandshake,
};

/**
 * Four warm quick-add tiles. Two taps to log a moment, one-handed.
 */
const QuickAddRow = ({ onAdd, disabled }: Props) => (
  <section aria-labelledby="fy-log-today" className="pb-8">
    <h2 id="fy-log-today" className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-3">
      Log today
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {QUICK_ADD_TYPES.map((type) => {
        const Icon = ICONS[type];
        const tint = FY_TYPE_TINT[type];
        return (
          <button
            key={type}
            type="button"
            disabled={disabled}
            onClick={() => onAdd(type)}
            className={`${FY_INNER_RADIUS} ${FY_FOCUS_RING} flex min-h-[104px] flex-col items-center justify-center gap-1.5 border px-3 py-4 text-center transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0`}
            style={{ borderColor: tint.border, backgroundColor: tint.background }}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-6 w-6 text-[hsl(var(--stage-firstyear-text))]"
            />
            <span className="font-sans text-[15.5px] font-semibold leading-tight text-foreground">
              {CARE_EVENT_LABELS[type]}
            </span>
            <span className="font-sans text-[11.5px] leading-[1.45] text-[hsl(var(--stage-firstyear-text))]">
              {HINTS[type]}
            </span>
          </button>
        );
      })}
    </div>
  </section>
);

export default QuickAddRow;
