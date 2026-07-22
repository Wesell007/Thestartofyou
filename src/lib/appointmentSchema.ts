export interface Appointment {
  id: string;
  user_id: string;
  appointment_at: string | null;
  week: number | null;
  appointment_type: string | null;
  location: string | null;
  notes: string | null;
  questions: string | null;
  follow_up: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentDraft {
  appointment_at: string | null;
  week: number | null;
  appointment_type: string | null;
  location: string | null;
  notes: string | null;
  questions: string | null;
  follow_up: string | null;
}

export const APPOINTMENT_TYPE_SUGGESTIONS: readonly string[] = [
  "Midwife appointment",
  "Scan",
  "Consultant appointment",
  "GP appointment",
  "Blood test",
  "Other",
];

export const EMPTY_DRAFT: AppointmentDraft = {
  appointment_at: null,
  week: null,
  appointment_type: null,
  location: null,
  notes: null,
  questions: null,
  follow_up: null,
};

const trimOrNull = (value: string | null | undefined): string | null => {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

export const cleanDraft = (draft: AppointmentDraft): AppointmentDraft => ({
  appointment_at: draft.appointment_at && draft.appointment_at.trim() !== "" ? draft.appointment_at : null,
  week:
    draft.week == null || Number.isNaN(draft.week)
      ? null
      : Math.max(1, Math.min(42, Math.round(draft.week))),
  appointment_type: trimOrNull(draft.appointment_type),
  location: trimOrNull(draft.location),
  notes: trimOrNull(draft.notes),
  questions: trimOrNull(draft.questions),
  follow_up: trimOrNull(draft.follow_up),
});

export const isWeekValid = (week: number | null): boolean => {
  if (week == null) return true;
  return Number.isFinite(week) && week >= 1 && week <= 42;
};

export const appointmentToDraft = (a: Appointment): AppointmentDraft => ({
  appointment_at: a.appointment_at,
  week: a.week,
  appointment_type: a.appointment_type,
  location: a.location,
  notes: a.notes,
  questions: a.questions,
  follow_up: a.follow_up,
});

export interface GroupedAppointments {
  upcoming: Appointment[];
  past: Appointment[];
}

export const groupAppointments = (
  rows: Appointment[],
  now: Date = new Date()
): GroupedAppointments => {
  const upcoming: Appointment[] = [];
  const past: Appointment[] = [];
  const nowMs = now.getTime();
  for (const row of rows) {
    const t = row.appointment_at ? new Date(row.appointment_at).getTime() : NaN;
    if (Number.isFinite(t) && t >= nowMs) {
      upcoming.push(row);
    } else {
      past.push(row);
    }
  }
  upcoming.sort((a, b) => {
    const ta = a.appointment_at ? new Date(a.appointment_at).getTime() : Infinity;
    const tb = b.appointment_at ? new Date(b.appointment_at).getTime() : Infinity;
    return ta - tb;
  });
  past.sort((a, b) => {
    const ta = a.appointment_at ? new Date(a.appointment_at).getTime() : 0;
    const tb = b.appointment_at ? new Date(b.appointment_at).getTime() : 0;
    if (ta !== tb) return tb - ta;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
  return { upcoming, past };
};

export const nextUpcoming = (
  rows: Appointment[],
  now: Date = new Date()
): Appointment | null => {
  return groupAppointments(rows, now).upcoming[0] ?? null;
};

export const formatAppointmentDate = (value: string | null): string | null => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/** Convert stored ISO to <input type="datetime-local"> value in local time. */
export const toDatetimeLocalInput = (value: string | null): string => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Convert <input type="datetime-local"> value back to ISO string (or null). */
export const fromDatetimeLocalInput = (value: string): string | null => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
};

export const isDraftEmpty = (draft: AppointmentDraft): boolean => {
  const cleaned = cleanDraft(draft);
  return (
    !cleaned.appointment_at &&
    cleaned.week == null &&
    !cleaned.appointment_type &&
    !cleaned.location &&
    !cleaned.notes &&
    !cleaned.questions &&
    !cleaned.follow_up
  );
};
