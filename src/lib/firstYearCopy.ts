import { getFirstYearAge } from "@/lib/firstYearDates";

/** The minimum shape the copy helpers need from a baby record. */
export type BabyForCopy = {
  date_of_birth: string;
  name?: string | null;
  birth_order?: number | null;
};

const ORDINALS = ["first", "second", "third", "fourth"];
const COUNT_WORDS = ["", "one", "two", "three", "four"];

const cleanName = (name: string | null | undefined): string | null => {
  const trimmed = (name ?? "").trim();
  return trimmed.length > 0 ? trimmed : null;
};

const sortBabies = (babies: BabyForCopy[]): BabyForCopy[] =>
  [...babies].sort((a, b) => (a.birth_order ?? 0) - (b.birth_order ?? 0));

const ordinalLabel = (baby: BabyForCopy, index: number): string => {
  const ordinal = ORDINALS[(baby.birth_order ?? index + 1) - 1] ?? "next";
  return `your ${ordinal} baby`;
};

const capitaliseFirst = (text: string): string =>
  text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text;

const joinNaturally = (parts: string[]): string => {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
};

/**
 * Describe the babies as a subject phrase, for example "Ada", "Ada and Mia"
 * or "your two babies" when no names were given.
 */
export const describeBabies = (babies: BabyForCopy[]): string => {
  const ordered = sortBabies(babies);
  if (ordered.length === 0) return "your baby";
  if (ordered.length === 1) return cleanName(ordered[0].name) ?? "your baby";

  const anyNamed = ordered.some((b) => cleanName(b.name));
  if (!anyNamed) return `your ${COUNT_WORDS[ordered.length] ?? "own"} babies`;

  return joinNaturally(ordered.map((b, i) => cleanName(b.name) ?? ordinalLabel(b, i)));
};

/**
 * Describe an age in the gentlest unit that is still accurate: today, days,
 * weeks, then completed calendar months.
 */
export const describeAge = (
  dateOfBirth: string,
  reference: Date = new Date(),
): string | null => {
  const age = getFirstYearAge(dateOfBirth, reference);
  if (!age) return null;

  if (age.ageInDays === 0) return "here today";
  if (age.ageInMonths >= 1) {
    return age.ageInMonths === 1 ? "1 month old" : `${age.ageInMonths} months old`;
  }
  if (age.ageInWeeks >= 1) {
    return age.ageInWeeks === 1 ? "1 week old" : `${age.ageInWeeks} weeks old`;
  }
  return age.ageInDays === 1 ? "1 day old" : `${age.ageInDays} days old`;
};

/** True when every baby resolves to the same age phrase. */
export const babiesShareAge = (
  babies: BabyForCopy[],
  reference: Date = new Date(),
): boolean => {
  const ages = babies.map((b) => describeAge(b.date_of_birth, reference));
  return ages.length > 0 && ages.every((a) => a !== null && a === ages[0]);
};

/**
 * One honest sentence about how old the babies are. Multiples only get a
 * shared age sentence when their ages actually match.
 */
export const babyAgeSentence = (
  babies: BabyForCopy[],
  reference: Date = new Date(),
): string => {
  const ordered = sortBabies(babies).filter((b) => describeAge(b.date_of_birth, reference));
  if (ordered.length === 0) return "";

  const subject = describeBabies(ordered);
  const plural = ordered.length > 1;

  if (babiesShareAge(ordered, reference)) {
    const age = describeAge(ordered[0].date_of_birth, reference)!;
    if (age === "here today")
      return capitaliseFirst(`${subject} ${plural ? "are" : "is"} here.`);
    return capitaliseFirst(`${subject} ${plural ? "are" : "is"} ${age}.`);
  }

  return capitaliseFirst(`${joinNaturally(
    ordered.map((b, i) => {
      const name = cleanName(b.name) ?? ordinalLabel(b, i);
      const age = describeAge(b.date_of_birth, reference)!;
      return age === "here today" ? `${name} is here` : `${name} is ${age}`;
    }),
  )}.`);
};

/** Hero support line: the age sentence plus a line for the parent. */
export const heroSupportLine = (
  babies: BabyForCopy[],
  reference: Date = new Date(),
): string => {
  const age = babyAgeSentence(babies, reference);
  return age ? `${age} You are in a new chapter too.` : "You are in a new chapter too.";
};

/** Public First Year month guide slug for a 0-11 month index. */
export const monthPageSlug = (monthIndex: number): string => {
  const index = Math.min(11, Math.max(0, Math.trunc(monthIndex) || 0));
  if (index === 0) return "newborn";
  return index === 1 ? "1-month" : `${index}-months`;
};

/** Full public route for the month guide. */
export const monthPagePath = (monthIndex: number): string =>
  `/first-year/${monthPageSlug(monthIndex)}`;

/** Reading CTA label for the month guide. */
export const monthPageLabel = (monthIndex: number): string => {
  const index = Math.min(11, Math.max(0, Math.trunc(monthIndex) || 0));
  if (index === 0) return "Read the newborn guide";
  return index === 1 ? "Read the 1 month guide" : `Read the ${index} months guide`;
};
