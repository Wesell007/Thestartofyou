import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  FY_CARD_RADIUS,
  FY_FOCUS_RING,
  FY_SHADOW_SOFT,
  FY_TYPE_TINT,
} from "@/components/firstyear/journey/firstYearStyles";
import {
  REMINDER_TINT_KEY,
  REMINDER_TYPE_LABELS,
  describeDue,
  groupReminders,
  type Reminder,
} from "@/lib/firstYearRemindersSchema";

import type { ReminderNotificationState } from "@/lib/firstYearReminderNotifications";

const ACTION_CLASS = `inline-flex min-h-11 items-center rounded-sm font-sans text-[13px] text-[hsl(var(--stage-firstyear-text))] underline underline-offset-4 hover:text-foreground ${FY_FOCUS_RING}`;

const ADD_BUTTON_CLASS = `inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-5 py-2 font-sans text-[13.5px] font-medium text-foreground transition-colors hover:border-foreground/25 ${FY_FOCUS_RING}`;

const NOTIFY_BUTTON_CLASS = `inline-flex min-h-11 items-center rounded-pill border border-border/50 px-4 py-1.5 font-sans text-[13px] font-medium text-[hsl(var(--stage-firstyear-text))] transition-colors hover:border-foreground/20 disabled:opacity-70 ${FY_FOCUS_RING}`;

const NOTIFICATION_STATUS: Record<ReminderNotificationState, string> = {
  unsupported: "Notifications are not available in this browser.",
  off: "Notifications are off on this device.",
  requesting: "Turning notifications on…",
  on: "Notifications are on for this device.",
  blocked: "Notifications are blocked in this browser.",
};

type Props = {
  reminders: Reminder[];
  /** Name for a baby id, so a reminder can say who it is for. */
  babyName: (babyId: string) => string;
  showBabyName: boolean;
  busyId: string | null;
  notificationState: ReminderNotificationState;
  onEnableNotifications: () => void;
  onDisableNotifications: () => void;
  onAdd: () => void;
  onEdit: (reminder: Reminder) => void;
  onToggleDone: (reminder: Reminder) => void;
  onRemove: (reminder: Reminder) => void;
};


/**
 * Reminders the parent set for themselves.
 *
 * Nothing here is suggested, predicted or automatic. The only clock work is a
 * light interval that refreshes the visible "due" wording while the page is
 * open, and it is cleared on unmount.
 */
const RemindersCard = ({
  reminders,
  babyName,
  showBabyName,
  busyId,
  onAdd,
  onEdit,
  onToggleDone,
  onRemove,
}: Props) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const groups = groupReminders(reminders, now);

  return (
    <section className="pb-8" aria-labelledby="fy-reminders-heading">
      <div
        className={`${FY_CARD_RADIUS} border px-5 py-6 sm:px-6`}
        style={{
          borderColor: "hsl(var(--stage-firstyear-accent) / 0.18)",
          backgroundColor: "hsl(var(--card) / 0.86)",
          boxShadow: FY_SHADOW_SOFT,
        }}
      >
        <h2
          id="fy-reminders-heading"
          className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-2"
        >
          Gentle reminders
        </h2>
        <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))] mb-5 max-w-[54ch]">
          Choose what you want to be reminded about and when. You choose the time.
        </p>

        {groups.length === 0 ? (
          <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text-soft))] mb-5">
            No reminders set yet.
          </p>
        ) : (
          <div className="mb-5 space-y-5">
            {groups.map((group) => (
              <div key={group.key}>
                <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[hsl(var(--stage-firstyear-text-soft))] mb-2.5">
                  {group.label}
                </p>
                <ul className="space-y-2.5">
                  {group.reminders.map((reminder) => {
                    const tint = FY_TYPE_TINT[REMINDER_TINT_KEY[reminder.reminder_type]];
                    const done = reminder.status === "done";
                    return (
                      <li
                        key={reminder.id}
                        className="rounded-[18px] border px-4 py-3.5"
                        style={{
                          borderColor: tint.border,
                          backgroundColor: done ? "hsl(var(--card) / 0.6)" : tint.background,
                          opacity: done ? 0.75 : 1,
                        }}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          <span
                            aria-hidden="true"
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ backgroundColor: tint.dot }}
                          />
                          <span className="font-sans text-[14.5px] font-semibold text-foreground">
                            {REMINDER_TYPE_LABELS[reminder.reminder_type]}
                          </span>
                          <span className="font-sans text-[13.5px] text-[hsl(var(--stage-firstyear-text))]">
                            {format(new Date(reminder.due_at), "HH:mm, EEE d MMM")}
                          </span>
                          <span className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))]">
                            {describeDue(reminder, now)}
                          </span>
                          {showBabyName && reminder.baby_id && (
                            <span className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))]">
                              For {babyName(reminder.baby_id)}
                            </span>
                          )}
                        </div>
                        {reminder.label && (
                          <p className="mt-1.5 font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))]">
                            {reminder.label}
                          </p>
                        )}
                        <div className="mt-1 flex flex-wrap items-center gap-x-4">
                          <button
                            type="button"
                            className={ACTION_CLASS}
                            disabled={busyId === reminder.id}
                            onClick={() => onToggleDone(reminder)}
                          >
                            {done ? "Set as active" : "Mark done"}
                          </button>
                          <button
                            type="button"
                            className={ACTION_CLASS}
                            onClick={() => onEdit(reminder)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className={ACTION_CLASS}
                            onClick={() => onRemove(reminder)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        <button type="button" onClick={onAdd} className={ADD_BUTTON_CLASS}>
          Add reminder
        </button>
      </div>
    </section>
  );
};

export default RemindersCard;
