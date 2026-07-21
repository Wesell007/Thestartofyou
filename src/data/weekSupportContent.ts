/**
 * Week support content — shared references and question metadata used by
 * WeekSources and WeekCommonQuestions across the 42 pregnancy week pages.
 *
 * Sources: UK-only, verified hub URLs. No forum, no fabricated deep links.
 * Curated question overrides attach a live article link only where a
 * matching slug exists in articleData.ts.
 */

export type WeekSource = {
  label: string;
  publisher: string;
  url: string;
};

export type WeekQuestion = {
  q: string;
  answer: string;
  readMore?: { href: string; label: string };
  askTopic: string;
};

// ---------- Sources (verified UK hub URLs only) ----------

const NHS_WEEKLY: WeekSource = {
  label: "Pregnancy week by week",
  publisher: "NHS",
  url: "https://www.nhs.uk/pregnancy/week-by-week/",
};

const NHS_PREGNANCY: WeekSource = {
  label: "Your pregnancy and baby guide",
  publisher: "NHS",
  url: "https://www.nhs.uk/pregnancy/",
};

const TOMMYS: WeekSource = {
  label: "Pregnancy information",
  publisher: "Tommy's",
  url: "https://www.tommys.org/pregnancy-information",
};

const NICE_ANTENATAL: WeekSource = {
  label: "Antenatal care (NG201)",
  publisher: "NICE",
  url: "https://www.nice.org.uk/guidance/ng201",
};

const RCOG_PUBLIC: WeekSource = {
  label: "Patient information leaflets",
  publisher: "RCOG",
  url: "https://www.rcog.org.uk/for-the-public/browse-our-patient-information/",
};

const GOVUK_VACCINES: WeekSource = {
  label: "Vaccination during pregnancy",
  publisher: "GOV.UK",
  url: "https://www.gov.uk/government/collections/vaccination-during-pregnancy",
};

const T1_SOURCES: WeekSource[] = [NHS_WEEKLY, NHS_PREGNANCY, TOMMYS, NICE_ANTENATAL];
const T2_SOURCES: WeekSource[] = [NHS_WEEKLY, NHS_PREGNANCY, TOMMYS, RCOG_PUBLIC];
const T3_SOURCES: WeekSource[] = [NHS_WEEKLY, NHS_PREGNANCY, TOMMYS, RCOG_PUBLIC, GOVUK_VACCINES];

export const getWeekSources = (week: number): WeekSource[] => {
  if (week <= 12) return T1_SOURCES;
  if (week <= 27) return T2_SOURCES;
  return T3_SOURCES;
};

// ---------- Questions ----------

type QuestionOverride = {
  /** Case-insensitive substring match against the question text. */
  match: string;
  readMore?: { href: string; label: string };
  answer?: string;
};

const CURATED_QUESTION_OVERRIDES: Record<number, QuestionOverride[]> = {
  1: [
    { match: "folic acid", readMore: { href: "/articles/folic-acid-and-nutrition", label: "Read: folic acid and nutrition" } },
    { match: "ovulation", readMore: { href: "/articles/signs-of-ovulation", label: "Read: signs of ovulation" } },
    { match: "test", readMore: { href: "/articles/testing-too-early", label: "Read: testing too early" } },
  ],
  20: [
    { match: "anomaly", readMore: { href: "/articles/tests-and-scans-in-pregnancy", label: "Read: tests and scans in pregnancy" } },
    { match: "movement", readMore: { href: "/articles/baby-movement-in-pregnancy", label: "Read: baby movement in pregnancy" } },
    { match: "sleep", readMore: { href: "/articles/sleep-in-pregnancy", label: "Read: sleep in pregnancy" } },
  ],
  38: [
    { match: "labour", readMore: { href: "/articles/signs-of-labour", label: "Read: signs of labour" } },
    { match: "waters", readMore: { href: "/articles/waters-breaking", label: "Read: waters breaking" } },
    { match: "movement", readMore: { href: "/articles/baby-movement-in-pregnancy", label: "Read: baby movement in pregnancy" } },
  ],
};

export const slugifyTopic = (q: string): string =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "question";

export const buildWeekQuestions = (
  week: number,
  rawFaqs: Array<{ q: string; a: string }>
): WeekQuestion[] => {
  const overrides = CURATED_QUESTION_OVERRIDES[week] ?? [];
  return rawFaqs.map((f) => {
    const ov = overrides.find((o) => f.q.toLowerCase().includes(o.match.toLowerCase()));
    return {
      q: f.q,
      answer: ov?.answer ?? f.a,
      readMore: ov?.readMore,
      askTopic: slugifyTopic(f.q),
    };
  });
};
