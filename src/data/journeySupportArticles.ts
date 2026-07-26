import type { PregnancyJourneyStatus } from "@/lib/savedJourney";

/**
 * Curated internal-only article list for /journey-support.
 * Every entry points to an existing article route in this project.
 * No external URLs.
 */
export type JourneySupportGroupKey = "gentle" | "heavier" | "later";

export type SupportStatus = Extract<
  PregnancyJourneyStatus,
  "pregnancy_loss" | "paused" | "no_longer_pregnant"
>;

export type SupportArticle = {
  slug: string;
  href: string;
  title: string;
  caption: string;
  group: JourneySupportGroupKey;
  showFor: SupportStatus[];
};

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    slug: "when-the-joy-doesnt-arrive-yet",
    href: "/articles/when-the-joy-doesnt-arrive-yet",
    title: "When the joy doesn't arrive yet",
    caption:
      "On absent, delayed or mixed feelings, and why they are more common than they sound.",
    group: "gentle",
    showFor: ["pregnancy_loss", "paused", "no_longer_pregnant"],
  },
  {
    slug: "perinatal-anxiety",
    href: "/articles/perinatal-anxiety",
    title: "Perinatal anxiety",
    caption: "When worry becomes more than worry, and where to find support.",
    group: "gentle",
    showFor: ["pregnancy_loss", "paused", "no_longer_pregnant"],
  },
  {
    slug: "emotional-wellbeing-pregnancy",
    href: "/articles/emotional-wellbeing-pregnancy",
    title: "Emotional wellbeing",
    caption:
      "Includes a section on difficult experiences and where support exists.",
    group: "heavier",
    showFor: ["pregnancy_loss", "paused", "no_longer_pregnant"],
  },
  {
    slug: "anxiety-in-pregnancy",
    href: "/articles/anxiety-in-pregnancy",
    title: "Anxiety, in your own time",
    caption: "A calm read for when anxious thoughts return.",
    group: "heavier",
    showFor: ["paused", "no_longer_pregnant"],
  },
  {
    slug: "pregnancy-after-loss",
    href: "/articles/pregnancy-after-loss",
    title: "Pregnancy after loss",
    caption:
      "Written for a future pregnancy after loss. Only open this if and when it feels useful.",
    group: "later",
    showFor: ["pregnancy_loss", "paused", "no_longer_pregnant"],
  },
];

export const GROUP_HEADINGS: Record<JourneySupportGroupKey, string> = {
  gentle: "When you want something gentle to read",
  heavier: "When heavier feelings need somewhere to go",
  later: "For later, only if it helps",
};

export const GROUP_ORDER: JourneySupportGroupKey[] = [
  "gentle",
  "heavier",
  "later",
];

export const isSupportStatus = (
  status: PregnancyJourneyStatus | null | undefined,
): status is SupportStatus =>
  status === "pregnancy_loss" ||
  status === "paused" ||
  status === "no_longer_pregnant";
