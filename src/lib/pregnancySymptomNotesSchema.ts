export type PersonalNoteLevel = "a_little" | "noticeable" | "hard_to_ignore";

export interface PregnancySymptomNote {
  id: string;
  user_id: string;
  noted_at: string;
  symptom_label: string;
  personal_severity: PersonalNoteLevel | null;
  notes: string | null;
  mention_at_appointment: boolean;
  follow_up: string | null;
  created_at: string;
  updated_at: string;
}

export interface PregnancySymptomNoteDraft {
  noted_at: string;
  symptom_label: string;
  personal_severity: PersonalNoteLevel | null;
  notes: string | null;
  mention_at_appointment: boolean;
  follow_up: string | null;
}

export const SYMPTOM_LABEL_SUGGESTIONS: readonly string[] = [
  "Nausea",
  "Headache",
  "Back or pelvic discomfort",
  "Swelling",
  "Itching",
  "Breathlessness",
  "Sleep changes",
  "Mood or worry",
  "Other",
];

export const PERSONAL_NOTE_LEVELS: readonly {
  value: PersonalNoteLevel;
  label: string;
}[] = [
  { value: "a_little", label: "A little" },
  { value: "noticeable", label: "Noticeable" },
  { value: "hard_to_ignore", label: "Hard to ignore" },
];

export const PERSONAL_NOTE_LABEL =
  "How much it is affecting you. Personal note only.";

const PERSONAL_NOTE_TO_DATABASE: Record<PersonalNoteLevel, number> = {
  a_little: 1,
  noticeable: 2,
  hard_to_ignore: 3,
};

export const personalNoteLevelToDatabase = (
  value: PersonalNoteLevel | null,
): number | null => value === null ? null : PERSONAL_NOTE_TO_DATABASE[value];

export const personalNoteLevelFromDatabase = (
  value: number | null,
): PersonalNoteLevel | null => {
  if (value === 1) return "a_little";
  if (value === 2) return "noticeable";
  if (value === 3) return "hard_to_ignore";
  return null;
};

export const emptyDraft = (): PregnancySymptomNoteDraft => ({
  noted_at: new Date().toISOString(),
  symptom_label: "",
  personal_severity: null,
  notes: null,
  mention_at_appointment: false,
  follow_up: null,
});

const trimOrNull = (value: string | null | undefined): string | null => {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

export const cleanDraft = (
  draft: PregnancySymptomNoteDraft,
): PregnancySymptomNoteDraft => ({
  noted_at:
    draft.noted_at && !Number.isNaN(new Date(draft.noted_at).getTime())
      ? new Date(draft.noted_at).toISOString()
      : new Date().toISOString(),
  symptom_label: (draft.symptom_label ?? "").trim(),
  personal_severity: draft.personal_severity,
  notes: trimOrNull(draft.notes),
  mention_at_appointment: Boolean(draft.mention_at_appointment),
  follow_up: trimOrNull(draft.follow_up),
});

export const isDraftSaveable = (draft: PregnancySymptomNoteDraft): boolean => {
  const cleaned = cleanDraft(draft);
  return cleaned.symptom_label.length > 0;
};

export const noteToDraft = (
  row: PregnancySymptomNote,
): PregnancySymptomNoteDraft => ({
  noted_at: row.noted_at,
  symptom_label: row.symptom_label,
  personal_severity: row.personal_severity,
  notes: row.notes,
  mention_at_appointment: row.mention_at_appointment,
  follow_up: row.follow_up,
});

export const formatSymptomDate = (value: string | null): string | null => {
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

export const toDatetimeLocalInput = (value: string | null): string => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const fromDatetimeLocalInput = (value: string): string | null => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
};

export const personalLevelLabel = (
  value: PersonalNoteLevel | null,
): string | null => {
  if (!value) return null;
  return PERSONAL_NOTE_LEVELS.find((l) => l.value === value)?.label ?? null;
};
