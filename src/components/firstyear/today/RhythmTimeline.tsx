import { format } from "date-fns";
import type { AmountUnit, CareEvent } from "@/lib/firstYearCareEventsSchema";
import { CARE_EVENT_LABELS, describeEvent, isRunningBreastFeed } from "@/lib/firstYearCareEventsSchema";
import {
  FY_FOCUS_RING,
  FY_TYPE_TINT,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  events: CareEvent[];
  babyName: (babyId: string) => string;
  showBabyName: boolean;
  unit: AmountUnit;
  onEdit: (event: CareEvent) => void;
  onDelete: (event: CareEvent) => void;
};

const ACTION_CLASS = `inline-flex min-h-11 items-center rounded-sm font-sans text-[12.5px] font-medium text-[hsl(var(--stage-firstyear-text))] underline underline-offset-4 hover:text-foreground ${FY_FOCUS_RING}`;

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
      <ol className="relative">
        {events.map((event, index) => {
          const detail = describeEvent(event, unit);
          // A running feed is changed from its own card, never from a row.
          const editable = !isRunningBreastFeed(event);
          const tint = FY_TYPE_TINT[event.event_type] ?? FY_TYPE_TINT.note;
          const last = index === events.length - 1;
          return (
            <li key={event.id} className="flex gap-3 sm:gap-4">
              <span className="w-[46px] shrink-0 pt-[3px] font-sans text-[13px] font-semibold tabular-nums text-foreground">
                {format(new Date(event.occurred_at), "HH:mm")}
              </span>
              <span
                aria-hidden="true"
                className="relative flex w-3 shrink-0 justify-center"
              >
                <span
                  className="absolute top-[7px] h-3 w-3 rounded-full"
                  style={{ backgroundColor: tint.dot }}
                />
                {!last && (
                  <span
                    className="absolute top-[22px] bottom-0 w-px"
                    style={{ backgroundColor: "hsl(var(--stage-firstyear-accent) / 0.22)" }}
                  />
                )}
              </span>
              <div className={`min-w-0 flex-1 ${last ? "pb-1" : "pb-5"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="font-sans text-[14.5px] font-semibold leading-snug text-foreground">
                    {CARE_EVENT_LABELS[event.event_type]}
                    {showBabyName && (
                      <span className="font-normal text-[hsl(var(--stage-firstyear-text))]">
                        {" "}
                        · {babyName(event.baby_id)}
                      </span>
                    )}
                  </p>
                  <span className="flex shrink-0 items-center gap-3">
                    {editable && (
                      <button type="button" className={ACTION_CLASS} onClick={() => onEdit(event)}>
                        Edit
                      </button>
                    )}
                    <button type="button" className={ACTION_CLASS} onClick={() => onDelete(event)}>
                      Remove
                    </button>
                  </span>
                </div>
                {detail && (
                  <p className="font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] break-words">
                    {detail}
                  </p>
                )}
                {event.note && (
                  <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))] mt-0.5 break-words">
                    {event.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    )}
  </section>
);

export default RhythmTimeline;
