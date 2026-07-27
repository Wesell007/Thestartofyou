import { getArticle, type ArticleData } from "@/data/articleData";

// ─── Asset imports ─────────────────────────────────────────────────────────
import heroNausea from "@/assets/article-hero-nausea.jpg";
import heroFatigue from "@/assets/article-hero-fatigue.jpg";
import heroImplantation from "@/assets/article-hero-implantation.jpg";
import heroImplantationBleed from "@/assets/article-hero-implantation-bleeding.jpg";
import heroSymptomsStopping from "@/assets/article-hero-symptoms-stopping.jpg";
import heroEarlySymptoms from "@/assets/article-hero-early-symptoms.jpg";
import heroFoodAversions from "@/assets/article-hero-food-aversions.jpg";
import heroLifestyle from "@/assets/article-hero-lifestyle.jpg";
import heroAnatomyScan from "@/assets/article-hero-second-anatomy-scan.jpg";
import heroSecondAnxiety from "@/assets/article-hero-second-anxiety.jpg";
import heroSecondBody from "@/assets/article-hero-second-body.jpg";
import heroSecondEating from "@/assets/article-hero-second-eating.jpg";
import heroSecondMovementExercise from "@/assets/article-hero-second-movement-exercise.jpg";
import heroSecondMovement from "@/assets/article-hero-second-movement.jpg";
import heroSecondSleep from "@/assets/article-hero-second-sleep.jpg";
import heroTestsScans from "@/assets/article-hero-tests-scans.jpg";
import heroThirdEmotional from "@/assets/article-hero-third-emotional.jpg";
import heroThirdHospitalBag from "@/assets/article-hero-third-hospital-bag.jpg";
import heroThirdMovement from "@/assets/article-hero-third-movement.jpg";
import heroThirdNursery from "@/assets/article-hero-third-nursery.jpg";
import heroThirdSignsOfLabour from "@/assets/article-hero-third-signs-of-labour.jpg";
import heroThirdSleep from "@/assets/article-hero-third-sleep.jpg";

// Topic-level fallback heroes
import topicBody from "@/assets/topic-body-hero.jpg";
import topicBaby from "@/assets/topic-baby-hero.jpg";
import topicFeelings from "@/assets/topic-feelings-hero.jpg";
import topicHealth from "@/assets/topic-health-hero.jpg";
import topicDiet from "@/assets/topic-diet-hero.jpg";
import topicPreparing from "@/assets/topic-preparing-hero.jpg";

// Stage / journey fallbacks
import pregnancyJourney from "@/assets/pregnancy-journey.jpg";
import pregnancyBump from "@/assets/pregnancy-bump.jpg";
import pregnancyHeroBooties from "@/assets/pregnancy-hero-booties.jpg";

export const heroImageMap: Record<string, string> = {
  // ── Early pregnancy / first trimester symptoms ──
  "nausea-in-early-pregnancy": heroNausea,
  "complete-guide-morning-sickness": heroNausea,
  "fatigue-in-early-pregnancy": heroFatigue,
  "implantation-bleeding": heroImplantationBleed,
  "early-pregnancy-symptoms-explained": heroEarlySymptoms,
  "symptoms-stopping-early-pregnancy": heroSymptomsStopping,
  "first-trimester-complete-guide": heroEarlySymptoms,
  "the-first-trimester-emotionally": heroSecondAnxiety,
  "when-the-joy-doesnt-arrive-yet": heroThirdEmotional,

  // ── Body & physical symptoms ──
  "pelvic-pain-in-pregnancy": heroSecondBody,
  "round-ligament-pain": heroSecondBody,
  "braxton-hicks-contractions": heroSecondBody,
  "shortness-of-breath-in-pregnancy": heroSecondBody,
  "swelling-in-pregnancy": heroSecondBody,
  "heartburn-in-pregnancy": heroSecondEating,
  "constipation-in-pregnancy": heroSecondEating,
  "back-pain-in-pregnancy": heroSecondMovementExercise,
  "weight-changes-in-pregnancy": heroSecondBody,
  "sleep-in-pregnancy": heroSecondSleep,

  // ── Tests, scans & monitoring ──
  "tests-and-scans-in-pregnancy": heroTestsScans,
  "vaccinations-in-pregnancy": heroLifestyle,
  "medicines-in-pregnancy": heroLifestyle,

  // ── Diet, food & nutrition ──
  "foods-to-avoid-in-pregnancy": heroSecondEating,
  "eating-well-in-pregnancy": heroSecondEating,
  "key-nutrients-in-pregnancy": heroSecondEating,
  "when-you-cant-face-food-in-pregnancy": heroFoodAversions,

  // ── Movement & exercise ──
  "moving-your-body-in-pregnancy": heroSecondMovementExercise,

  // ── Baby development, position, scans ──
  "how-your-baby-develops-in-pregnancy": heroAnatomyScan,
  "twins-and-multiples-in-pregnancy": heroAnatomyScan,
  "baby-movement-in-pregnancy": heroSecondMovement,
  "reduced-movements-in-pregnancy": heroThirdMovement,
  "baby-hiccups-in-the-womb": heroSecondMovement,
  "anterior-placenta": heroAnatomyScan,
  "low-lying-placenta-in-pregnancy": heroAnatomyScan,
  "breech-baby": heroAnatomyScan,
  "measuring-big-or-small-in-pregnancy": heroAnatomyScan,
  "growth-scans-in-pregnancy": heroTestsScans,
  "cord-around-the-neck-in-pregnancy": heroAnatomyScan,

  // ── Emotional & mental wellbeing ──
  "anxiety-in-pregnancy": heroSecondAnxiety,
  "perinatal-anxiety": heroSecondAnxiety,
  "emotional-wellbeing-pregnancy": heroSecondAnxiety,
  "pregnancy-after-loss": heroThirdEmotional,
  "preparing-emotionally-for-birth": heroThirdEmotional,
  "emotional-impact-of-ivf": heroSecondAnxiety,

  // ── Labour & birth ──
  "signs-of-labour": heroThirdSignsOfLabour,
  "stages-of-labour": heroThirdSignsOfLabour,
  "when-to-go-in-for-labour": heroThirdSignsOfLabour,
  "writing-a-birth-plan": heroThirdHospitalBag,

  // ── Preparing for baby ──
  "hospital-bag-and-what-to-pack": heroThirdHospitalBag,
  "the-space-your-baby-will-come-home-to": heroThirdNursery,
  "what-to-buy-for-a-new-baby": heroThirdNursery,
  "preparing-for-baby-complete-guide": heroThirdNursery,

  // ── Trimester guides ──
  "second-trimester-complete-guide": heroSecondBody,
  "third-trimester-complete-guide": heroThirdSleep,

  // ── Trying to conceive / IVF ──
  "trying-to-conceive-explained": pregnancyJourney,
  "ivf-timeline-what-to-expect": heroTestsScans,
  "signs-of-ovulation": pregnancyJourney,
  "two-week-wait": heroSecondAnxiety,

  // ── Postpartum / first year ──
  "postpartum-recovery-timeline": pregnancyHeroBooties,
  "your-body-after-birth": heroSecondBody,
  "baby-sleep-first-year": heroThirdSleep,
  "baby-milestones-first-year": pregnancyHeroBooties,
  "feeding-your-baby-complete-guide": pregnancyHeroBooties,
};

export const topicFallbackMap: Record<string, string> = {
  body: topicBody,
  baby: topicBaby,
  feelings: topicFeelings,
  "health-and-safety": topicHealth,
  "diet-and-exercise": topicDiet,
  "preparing-for-baby": topicPreparing,
};

export type ResolvedHero = { src: string; alt: string; credit?: string };

export const resolveArticleHero = (data: ArticleData): ResolvedHero => {
  if (data.hero?.src) {
    return { src: data.hero.src, alt: data.hero.alt, credit: data.hero.credit };
  }
  const mapped = heroImageMap[data.slug];
  if (mapped) return { src: mapped, alt: data.title };
  if (data.topic && topicFallbackMap[data.topic]) {
    return { src: topicFallbackMap[data.topic], alt: data.title };
  }
  return { src: pregnancyJourney, alt: data.title };
};

export const resolveArticleHeroBySlug = (
  slug: string,
): { src: string; alt: string } | null => {
  const article = getArticle(slug);
  if (!article) return null;
  const hero = resolveArticleHero(article);
  return { src: hero.src, alt: hero.alt };
};
