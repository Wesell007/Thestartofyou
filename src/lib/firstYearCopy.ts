import { getFirstYearAge } from "@/lib/firstYearDates";

/**
 * Display copy for the signed-in First Year surfaces.
 *
 * Pure and multiples-aware. Each baby carries its own date of birth, so a
 * shared age sentence is only ever produced when every baby really is the same
 * age. Today's setup flow saves one shared date, but nothing here assumes it.
 */

export type BabyForCopy = {
  date_of_birth: string;
  name?: string | null;
  birth_order?: number;
};

const ORDINAL_FALLBACK = [
  "your first baby",
  "your second baby",
  "your third baby",
  "your fourth baby",
];

const COUNT_WORD = ["", "baby", "two babies", "three babies", "four babies"];

const cleanName = (name?: string | null): string | null => {
  const trimmed = name?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
};

/** Join a list into natural British prose: "a, b and c". */
export const joinWithAnd = (parts: string[]): string => {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
};

/** How the babies are referred to as a group, e.g. "Ada", "Ada and Mia". */
export const describeBabies = (babies: BabyForCopy[]): string => {
  if (babies.length === 0) return "your baby";
  const names = babies.map((b) => cleanName(b.name));
  const namedCount = names.filter(Boolean).length;

  if (babies.length === 1) {
    return names[0] ?? "your baby";
  }
  if (namedCount === 0) {
    return `your ${COUNT_WORD[Math.min(babies.length, 4)]}`;
  }
  const parts = babies.map((baby, index) => {
    const name = names[index];
    if (name) return name;
    const order = (baby.birth_order ?? index + 1) - 1;
    return ORDINAL_FALLBACK[Math.min(Math.max(order, 0), 3)];
  });
  return joinWithAnd(parts);
};

/** Sentence-case a subject that may start with a lower-case "your". */
const sentenceCase = (value: string): string =>
  value.length > 0 ? value[0].toUpperCase() + value.slice(1) : value;

/** Human age phrase, e.g. "4 days old", "3 weeks old", "5 months old". */
export const describeAge = (
  dateOfBirth: string,
  reference: Date = new Date(),
): string | null => {
  const age = getFirstYearAge(dateOfBirth, reference);
  if (!age) return null;
  if (age.ageInMonths >= 1) {
    return `${age.ageInMonths} ${age.ageInMonths === 1 ? "month" : "months"} old`;
  }
  if (age.ageInDays >= 7) {
    return `${age.ageInWeeks} ${age.ageInWeeks === 1 ? "week" : "weeks"} old`;
  }
  if (age.ageInDays === 0) return "here today";
  return `${age.ageInDays} ${age.ageInDays === 1 ? "day" : "days"} old`;
};

/** True when every baby resolves to the same age phrase. */
export const babiesShareAge = (
  babies: BabyForCopy[],
  reference: Date = new Date(),
): boolean => {
  if (babies.length < 2) return true;
  const first = describeAge(babies[0].date_of_birth, reference);
  return babies.every((b) => describeAge(b.date_of_birth, reference) === first);
};

/**
 * The main age line, e.g. "Ada is 3 weeks old." When babies have different
 * ages, each is stated separately rather than asserting a false shared age.
 */
export const babyAgeSentence = (
  babies: BabyForCopy[],
  reference: Date = new Date(),
): string => {
  if (babies.length === 0) return "";
  const subject = describeBabies(babies);

  if (babiesShareAge(babies, reference)) {
    const age = describeAge(babies[0].date_of_birth, reference);
    if (!age) return "";
    const verb = babies.length === 1 ? "is" : "are";
    if (age === "here today") {
      return `${sentenceCase(subject)} ${verb} here.`;
    }
    return `${sentenceCase(subject)} ${verb} ${age}.`;
  }

  const parts = babies
    .map((baby, index) => {
      const age = describeAge(baby.date_of_birth, reference);
      if (!age) return null;
      const name =
        cleanName(baby.name) ??
        ORDINAL_FALLBACK[Math.min(Math.max((baby.birth_order ?? index + 1) - 1, 0), 3)];
      return age === "here today" ? `${name} is here` : `${name} is ${age}`;
    })
    .filter((part): part is string => part !== null);
  if (parts.length === 0) return "";
  return `${sentenceCase(joinWithAnd(parts))}.`;
};

/** Supporting hero line that includes the parent. */
export const heroSupportLine = (
  babies: BabyForCopy[],
  reference: Date = new Date(),
): string => {
  const age = babyAgeSentence(babies, reference);
  return age ? `${age} You are in a new chapter too.` : "You are in a new chapter too.";
};

/** Public month page slug for a first-year month index (0-11). */
export const monthPageSlug = (monthIndex: number): string => {
  const index = Math.min(11, Math.max(0, Math.round(monthIndex)));
  if (index === 0) return "newborn";
  if (index === 1) return "1-month";
  return `${index}-months`;
};

/** Route for the public month guide matching a baby's age. */
export const monthPagePath = (monthIndex: number): string =>
  `/first-year/${monthPageSlug(monthIndex)}`;

/** Friendly label for the month guide link. */
export const monthPageLabel = (monthIndex: number): string => {
  const index = Math.min(11, Math.max(0, Math.round(monthIndex)));
  if (index === 0) return "Read the newborn guide";
  if (index === 1) return "Read the 1 month guide";
  return `Read the ${index} months guide`;
};
