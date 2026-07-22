export interface BabyMovementNote {
  id: string;
  user_id: string;
  noted_at: string;
  pattern_label: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BabyMovementDraft {
  noted_at: string; // ISO
  pattern_label: string | null;
  notes: string | null;
}

export const PATTERN_LABEL_SUGGESTIONS: readonly string[] = [
  "Usual pattern",
  "More active than earlier",
  "Quieter than earlier",
  "Different pattern today",
  "Not sure",
];

export const emptyDraft = (): BabyMovementDraft => ({
  noted_at: new Date().toISOString(),
  pattern_label: null,
  notes: null,
});

const trimOrNull = (value: string | null | undefined): string | null => {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

export const cleanDraft = (draft: BabyMovementDraft): BabyMovementDraft => ({
  noted_at:
    draft.noted_at && !Number.isNaN(new Date(draft.noted_at).getTime())
      ? new Date(draft.noted_at).toISOString()
      : new Date().toISOString(),
  pattern_label: trimOrNull(draft.pattern_label),
  notes: trimOrNull(draft.notes),
});

export const isDraftSaveable = (draft: BabyMovementDraft): boolean => {
  const cleaned = cleanDraft(draft);
  return Boolean(cleaned.pattern_label) || Boolean(cleaned.notes);
};

export const noteToDraft = (row: BabyMovementNote): BabyMovementDraft => ({
  noted_at: row.noted_at,
  pattern_label: row.pattern_label,
  notes: row.notes,
});

export const formatMovementDate = (value: string | null): string | null => {
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
