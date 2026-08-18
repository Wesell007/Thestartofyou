import { format } from "date-fns";
import type { AmountUnit, CareEvent } from "@/lib/firstYearCareEventsSchema";
import { CARE_EVENT_LABELS, describeEvent, isRunningBreastFeed } from "@/lib/firstYearCareEventsSchema";
import {
  FY_FOCUS_RING,
  FY_INNER_RADIUS,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  events: CareEvent[];
  babyName: (babyId: string) => string;
  showBabyName: boolean;
  unit: AmountUnit;
  onEdit: (event: CareEvent) => void;
  onDelete: (event: CareEvent) => void;
};

const ACTION_CLASS = `inline-flex min-h-11 items-center rounded-sm font-sans text-[12.5px] font-medium text-[hsl(var(--stage-firstyear-text-soft))] underline underline-offset-4 hover:text-foreground ${FY_FOCUS_RING}`;

/** Today's logged moments, newest first, each editable and removable. */
const RhythmTimeline = ({
  events,
  babyName,
  showBabyName,
  unit,
  onEdit,
  onDelete,
}: Props) => (
  <section aria-labelledby="fy-daily-rhythm" className="pb-8">
    <h2 id="fy-daily-rhythm" className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-3">
      Daily rhythm
    </h2>
    {events.length === 0 ? (
      <p className="font-sans text-[14px] leading-[1.7] text-[hsl(var(--stage-firstyear-text))] max-w-[54ch]">
        Nothing logged yet today. Add a moment whenever it suits you, and skip the days you would
        rather not.
      </p>
    ) : (
      <ol className="space-y-2.5">
        {events.map((event) => {
          const detail = describeEvent(event, unit);
          // A running feed is changed from its own card, never from a row.
          const editable = !isRunningBreastFeed(event);
          return (
            <li
              key={event.id}
              className={`${FY_INNER_RADIUS} border px-4 py-3.5`}
              style={{
                borderColor: "hsl(var(--stage-firstyear-accent) / 0.18)",
                backgroundColor: "hsl(var(--card))",
              }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-sans text-[13px] font-semibold tabular-nums text-foreground">
                  {format(new Date(event.occurred_at), "HH:mm")}
                </span>
                <span className="font-sans text-[14.5px] font-semibold text-foreground">
                  {CARE_EVENT_LABELS[event.event_type]}
                </span>
                {showBabyName && (
                  <span className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))]">
                    {babyName(event.baby_id)}
                  </span>
                )}
              </div>
              {detail && (
                <p className="font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mt-1 break-words">
                  {detail}
                </p>
              )}
              {event.note && (
                <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))] mt-1 break-words">
                  {event.note}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-1">
                {editable && (
                  <button type="button" className={ACTION_CLASS} onClick={() => onEdit(event)}>
                    Edit
                  </button>
                )}
                <button type="button" className={ACTION_CLASS} onClick={() => onDelete(event)}>
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    )}
  </section>
);

export default RhythmTimeline;
