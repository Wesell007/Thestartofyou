/**
 * Phase 29I — Memory settings UI prototype.
 *
 * Static, synthetic prototype data only. Nothing here is read from or written
 * to a database, a network call or browser storage. The examples are the three
 * low-risk items approved in `docs/ai/memory-design.md`: no health, fertility,
 * journal, date, child or emotional content of any kind.
 */

export const PROTOTYPE_NOTICE = "Prototype only";

export type PrototypeLevelId =
  | "off"
  | "basic-preferences"
  | "journey-context"
  | "saved-by-me"
  | "sensitive";

export interface PrototypeLevel {
  id: PrototypeLevelId;
  title: string;
  description: string;
  /** Sensitive memory has no switch at all in this prototype. */
  available: boolean;
}

export const PROTOTYPE_LEVELS: PrototypeLevel[] = [
  {
    id: "off",
    title: "Memory off",
    description:
      "Your companion starts fresh every time. This is how things work today, and it stays this way unless you change it.",
    available: true,
  },
  {
    id: "basic-preferences",
    title: "Basic preferences",
    description:
      "A few small preferences, such as how your companion sounds and whether you prefer shorter answers.",
    available: true,
  },
  {
    id: "journey-context",
    title: "Journey context",
    description:
      "The chapter you are in, so answers fit where you are. Your dates and your private writing stay out of it.",
    available: true,
  },
  {
    id: "saved-by-me",
    title: "Saved by me",
    description:
      "Only the things you deliberately choose to save, shown back to you in plain words.",
    available: true,
  },
  {
    id: "sensitive",
    title: "Sensitive memory",
    description:
      "Health, fertility and safety-sensitive information is not available for memory in this version. There is nothing to switch on here.",
    available: false,
  },
];

export interface PrototypeMemoryItem {
  id: string;
  label: string;
  category: string;
  note: string;
}

/** Synthetic examples only. See the allowlist in docs/ai/memory-design.md. */
export const PROTOTYPE_ITEMS: PrototypeMemoryItem[] = [
  {
    id: "item-shorter-answers",
    label: "Prefers shorter companion answers",
    category: "Basic preferences",
    note: "Example item",
  },
  {
    id: "item-practical-steps",
    label: "Likes practical next steps",
    category: "Basic preferences",
    note: "Example item",
  },
  {
    id: "item-gentle-reminders",
    label: "Prefers gentle reminders",
    category: "Saved by me",
    note: "Example item",
  },
];
