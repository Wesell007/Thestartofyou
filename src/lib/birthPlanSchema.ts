export type BirthPlanSectionKey =
  | "environment"
  | "partner_support"
  | "pain_relief"
  | "monitoring"
  | "labour"
  | "birth"
  | "feeding"
  | "after_birth"
  | "midwife_notes";

export interface BirthPlanSectionAnswer {
  choices: string[];
  notes: string;
}

export type BirthPlanAnswers = Partial<Record<BirthPlanSectionKey, BirthPlanSectionAnswer>>;

export interface BirthPlanRow {
  id: string;
  user_id: string;
  answers: BirthPlanAnswers;
  notes: string | null;
  completion: number;
  created_at: string;
  updated_at: string;
}

export interface BirthPlanSection {
  key: BirthPlanSectionKey;
  title: string;
  intro: string;
  choices: string[];
  notesPlaceholder: string;
}

export const BIRTH_PLAN_SECTIONS: BirthPlanSection[] = [
  {
    key: "environment",
    title: "Birth environment",
    intro: "The atmosphere you would like around you, where possible.",
    choices: [
      "Calm lighting",
      "Music or quiet",
      "Minimal interruptions where possible",
      "Water birth if available",
      "Open to guidance on the day",
    ],
    notesPlaceholder: "Anything else about the room or atmosphere.",
  },
  {
    key: "partner_support",
    title: "Birth partner and support",
    intro: "Who you would like with you and how they can help.",
    choices: [
      "Birth partner present",
      "Support with breathing",
      "Help asking questions",
      "Time to discuss choices",
      "Open to staff guidance",
    ],
    notesPlaceholder: "Names or specific ways your partner can support you.",
  },
  {
    key: "pain_relief",
    title: "Pain relief preferences",
    intro: "Options you would like to consider. Your midwife can talk you through each on the day.",
    choices: [
      "Breathing and movement",
      "Gas and air",
      "Water",
      "Epidural",
      "I would like to discuss options",
    ],
    notesPlaceholder: "Anything you want your care team to know about pain relief.",
  },
  {
    key: "monitoring",
    title: "Monitoring and interventions",
    intro: "How you would like decisions to be shared with you.",
    choices: [
      "Explain options clearly",
      "Time to ask questions where possible",
      "Support with decisions",
      "Open to recommendations if needed",
    ],
    notesPlaceholder: "Anything about how you would like to be informed.",
  },
  {
    key: "labour",
    title: "Labour preferences",
    intro: "How you would like to move through labour where possible.",
    choices: [
      "Move around if possible",
      "Try different positions",
      "Use water if available",
      "Keep the room calm",
      "Follow my body where safe",
    ],
    notesPlaceholder: "Any preferences around movement, positions or pace.",
  },
  {
    key: "birth",
    title: "Birth preferences",
    intro: "How you would like the birth itself to be supported.",
    choices: [
      "Discuss assisted birth if needed",
      "Discuss caesarean birth if needed",
      "Explain changes to the plan",
      "Keep me informed",
    ],
    notesPlaceholder: "Anything you want your care team to know about the birth itself.",
  },
  {
    key: "feeding",
    title: "Feeding after birth",
    intro: "Your current feeding preferences. These can change.",
    choices: [
      "Skin to skin if possible",
      "Breastfeeding support",
      "Bottle feeding support",
      "Combination feeding support",
      "I am still deciding",
    ],
    notesPlaceholder: "Anything you would like feeding support with.",
  },
  {
    key: "after_birth",
    title: "After birth and skin to skin",
    intro: "The first hours after birth.",
    choices: [
      "Skin to skin where possible",
      "Delayed cord clamping if suitable",
      "Support with first feed",
      "Quiet time where possible",
    ],
    notesPlaceholder: "Anything about the first hour or two after birth.",
  },
  {
    key: "midwife_notes",
    title: "Notes for your midwife",
    intro: "Anything else you would like your midwife or care team to know.",
    choices: [],
    notesPlaceholder: "Previous experiences, worries, or things that would help you feel safe.",
  },
];

export const emptyAnswer = (): BirthPlanSectionAnswer => ({ choices: [], notes: "" });

export const isSectionAnswered = (answer?: BirthPlanSectionAnswer): boolean => {
  if (!answer) return false;
  if (answer.choices && answer.choices.length > 0) return true;
  if (answer.notes && answer.notes.trim().length > 0) return true;
  return false;
};

export const calculateCompletion = (answers: BirthPlanAnswers): number => {
  const total = BIRTH_PLAN_SECTIONS.length;
  const answered = BIRTH_PLAN_SECTIONS.reduce(
    (n, s) => n + (isSectionAnswered(answers[s.key]) ? 1 : 0),
    0
  );
  return Math.round((100 * answered) / total);
};

export type BirthPlanStatus =
  | "not_started"
  | "started"
  | "in_progress"
  | "almost_complete"
  | "ready_to_review";

export const statusFromCompletion = (
  completion: number,
  hasRow: boolean
): BirthPlanStatus => {
  if (!hasRow || completion === 0) return "not_started";
  if (completion < 25) return "started";
  if (completion < 70) return "in_progress";
  if (completion < 100) return "almost_complete";
  return "ready_to_review";
};

export const statusLabel = (status: BirthPlanStatus): string => {
  switch (status) {
    case "not_started":
      return "Not started";
    case "started":
      return "Started";
    case "in_progress":
      return "In progress";
    case "almost_complete":
      return "Almost complete";
    case "ready_to_review":
      return "Ready to review";
  }
};
