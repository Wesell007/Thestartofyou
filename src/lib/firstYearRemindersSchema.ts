/**
 * Shapes, validation and grouping for parent-set First Year reminders.
 *
 * Pure: no Supabase, no notifications, no scheduling. A reminder is only ever
 * something the parent chose themselves, at a time they chose. Nothing here
 * predicts, suggests or infers anything from logged care.
 *
 * Times are held as `Date` objects in the parent's local time and converted to
 * an ISO string only at the database boundary.
 */

export const REMINDER_TYPES = ["feed", "sleep", "nappy", "moment"] as const;
export type ReminderType = (typeof REMINDER_TYPES)[number];

export type ReminderStatus = "active" | "done";

export const REMINDER_LABEL_MAX_LENGTH = 140;

/** Human labels, matching the words already used on the Today page. */
export const REMINDER_TYPE_LABELS: Record<ReminderType, string> = {
  feed: "Feed",
  sleep: "Sleep",
  nappy: "Nappy",
  moment: "Moment",
};

/** Tint key so a reminder reads in the same colour language as its care type. */
export const REMINDER_TINT_KEY: Record<ReminderType, "feed" | "sleep" | "nappy" | "note"> = {
  feed: "feed",
  sleep: "sleep",
  nappy: "nappy",
  moment: "note",
};

export type Reminder = {
  id: string;
  baby_id: string | null;
  reminder_type: ReminderType;
  label: string | null;
  due_at: string;
  status: ReminderStatus;
  updated_at: string;
};

export type ReminderDraft = {
  reminderType: ReminderType | null;
  babyId: string | null;
  /** Local calendar date as `yyyy-MM-dd`. */
  date: string;
  /** Local wall clock time as `HH:mm`. */
  time: string;
  label: string;
};

export type ReminderPayload = {
  reminderType: ReminderType;
  babyId: string | null;
  dueAt: string;
  label: string | null;
};

export type ReminderValidation =
  | { ok: true; payload: ReminderPayload }
  | { ok: false; message: string };

export const isReminderType = (value: string): value is ReminderType =>
  (REMINDER_TYPES as readonly string[]).includes(value);

/** Combine a local date and a local time into a real local `Date`. */
export const localDueDate = (date: string, time: string): Date | null => {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!dateMatch || !timeMatch) return null;
  const [, year, month, day] = dateMatch;
  const [, hours, minutes] = timeMatch;
  const due = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    0,
    0,
  );
  return Number.isNaN(due.getTime()) ? null : due;
};

/** Validate what the parent chose. Nothing is assumed on their behalf. */
export const validateReminderDraft = (draft: ReminderDraft): ReminderValidation => {
  if (!draft.reminderType || !isReminderType(draft.reminderType)) {
    return { ok: false, message: "Choose what this reminder is for." };
  }
  const due = localDueDate(draft.date, draft.time);
  if (!due) {
    return { ok: false, message: "Choose a time for this reminder." };
  }
  const label = draft.label.trim();
  if (label.length > REMINDER_LABEL_MAX_LENGTH) {
    return {
      ok: false,
      message: `Please keep the note to ${REMINDER_LABEL_MAX_LENGTH} characters.`,
    };
  }
  return {
    ok: true,
    payload: {
      reminderType: draft.reminderType,
      babyId: draft.babyId,
      dueAt: due.toISOString(),
      label: label === "" ? null : label,
    },
  };
};

export type ReminderGroupKey = "due" | "today" | "tomorrow" | "later" | "done";

export const REMINDER_GROUP_LABELS: Record<ReminderGroupKey, string> = {
  due: "Due now",
  today: "Later today",
  tomorrow: "Tomorrow",
  later: "Later",
  done: "Done",
};

export const REMINDER_GROUP_ORDER: ReminderGroupKey[] = [
  "due",
  "today",
  "tomorrow",
  "later",
  "done",
];

const startOfLocalDay = (reference: Date): Date =>
  new Date(reference.getFullYear(), reference.getMonth(), reference.getDate(), 0, 0, 0, 0);

const addDays = (reference: Date, days: number): Date =>
  new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate() + days,
    0,
    0,
    0,
    0,
  );

/** Which group a reminder belongs to, in the parent's local time. */
export const reminderGroup = (reminder: Reminder, now: Date = new Date()): ReminderGroupKey => {
  if (reminder.status === "done") return "done";
  const due = new Date(reminder.due_at);
  if (due.getTime() <= now.getTime()) return "due";
  const tomorrow = addDays(startOfLocalDay(now), 1);
  const dayAfter = addDays(startOfLocalDay(now), 2);
  if (due < tomorrow) return "today";
  if (due < dayAfter) return "tomorrow";
  return "later";
};

export type ReminderGroup = { key: ReminderGroupKey; label: string; reminders: Reminder[] };

/**
 * Group reminders for display. Due first, then the rest of the day, then what
 * is still ahead, with anything already ticked off kept last.
 */
export const groupReminders = (
  reminders: Reminder[],
  now: Date = new Date(),
): ReminderGroup[] => {
  const buckets = new Map<ReminderGroupKey, Reminder[]>();
  for (const reminder of reminders) {
    const key = reminderGroup(reminder, now);
    const bucket = buckets.get(key) ?? [];
    bucket.push(reminder);
    buckets.set(key, bucket);
  }
  return REMINDER_GROUP_ORDER.flatMap((key) => {
    const bucket = buckets.get(key);
    if (!bucket || bucket.length === 0) return [];
    const sorted = [...bucket].sort((a, b) =>
      key === "done"
        ? new Date(b.due_at).getTime() - new Date(a.due_at).getTime()
        : new Date(a.due_at).getTime() - new Date(b.due_at).getTime(),
    );
    return [{ key, label: REMINDER_GROUP_LABELS[key], reminders: sorted }];
  });
};

/**
 * A calm relative line for a reminder time. Never a countdown to act on,
 * just enough for the parent to see where it sits in the day.
 */
export const describeDue = (reminder: Reminder, now: Date = new Date()): string => {
  const due = new Date(reminder.due_at);
  const diffMinutes = Math.round((due.getTime() - now.getTime()) / 60000);
  if (reminder.status === "done") return "Marked done";
  if (diffMinutes <= -60) return "Earlier";
  if (diffMinutes < 0) return "Due now";
  if (diffMinutes === 0) return "Due now";
  if (diffMinutes < 60) return `In ${diffMinutes} min`;
  const hours = Math.round(diffMinutes / 60);
  if (diffMinutes < 24 * 60) return hours === 1 ? "In about an hour" : `In about ${hours} hours`;
  const days = Math.round(diffMinutes / (60 * 24));
  return days === 1 ? "Tomorrow" : `In ${days} days`;
};
