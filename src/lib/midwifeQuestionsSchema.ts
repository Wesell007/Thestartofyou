export type MidwifeQuestionCategory =
  | "symptoms_body"
  | "baby_movements"
  | "scans_tests"
  | "birth_preferences"
  | "feeding"
  | "recovery"
  | "practical"
  | "other";

export interface MidwifeQuestion {
  id: string;
  user_id: string;
  question: string;
  category: MidwifeQuestionCategory;
  appointment_id: string | null;
  answered: boolean;
  answer_notes: string | null;
  follow_up: boolean;
  created_at: string;
  updated_at: string;
}

export interface MidwifeQuestionDraft {
  question: string;
  category: MidwifeQuestionCategory | null;
  appointment_id: string | null;
  answered: boolean;
  answer_notes: string | null;
  follow_up: boolean;
}

export const CATEGORIES: readonly {
  value: MidwifeQuestionCategory;
  label: string;
}[] = [
  { value: "symptoms_body", label: "Symptoms or body changes" },
  { value: "baby_movements", label: "Baby movements" },
  { value: "scans_tests", label: "Scans and tests" },
  { value: "birth_preferences", label: "Birth preferences" },
  { value: "feeding", label: "Feeding" },
  { value: "recovery", label: "Recovery after birth" },
  { value: "practical", label: "Practical planning" },
  { value: "other", label: "Other" },
];

export const categoryLabel = (
  value: MidwifeQuestionCategory | null | undefined,
): string | null => {
  if (!value) return null;
  return CATEGORIES.find((c) => c.value === value)?.label ?? null;
};

export const emptyDraft = (): MidwifeQuestionDraft => ({
  question: "",
  category: null,
  appointment_id: null,
  answered: false,
  answer_notes: null,
  follow_up: false,
});

const trimOrNull = (value: string | null | undefined): string | null => {
  if (value == null) return null;
  const t = value.trim();
  return t.length === 0 ? null : t;
};

export const cleanDraft = (draft: MidwifeQuestionDraft): MidwifeQuestionDraft => ({
  question: (draft.question ?? "").trim(),
  category: draft.category,
  appointment_id:
    draft.appointment_id && draft.appointment_id.trim() !== ""
      ? draft.appointment_id
      : null,
  answered: Boolean(draft.answered),
  answer_notes: trimOrNull(draft.answer_notes),
  follow_up: Boolean(draft.follow_up),
});

export const isDraftSaveable = (draft: MidwifeQuestionDraft): boolean => {
  const c = cleanDraft(draft);
  return c.question.length > 0 && c.category != null;
};

export const questionToDraft = (row: MidwifeQuestion): MidwifeQuestionDraft => ({
  question: row.question,
  category: row.category,
  appointment_id: row.appointment_id,
  answered: row.answered,
  answer_notes: row.answer_notes,
  follow_up: row.follow_up,
});

export const formatSavedDate = (value: string | null): string | null => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
