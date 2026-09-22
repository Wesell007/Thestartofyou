import heroSleepChanges from "@/assets/firstyear-hero-sleep-changes-safe.jpg";
import bodyNightWaking from "@/assets/firstyear-body-night-waking.jpg";
import bodyBedtimeWindDown from "@/assets/firstyear-body-bedtime-wind-down-approved.jpg";


import heroSupportiveMoment from "@/assets/article-hero-emotional-supportive-moment.jpg";
import bodyEmotionalSupport from "@/assets/guidance-card-emotional.jpg";

import heroTeething from "@/assets/firstyear-hero-teething.jpg";
import bodyTeething1 from "@/assets/firstyear-body-teething-1.jpg";
import bodyTeething2 from "@/assets/firstyear-body-teething-2.jpg";
import heroColicAndEveningCrying from "@/assets/firstyear-hero-colic-and-evening-crying.jpg";
import bodyColicAndEveningCrying1 from "@/assets/firstyear-body-colic-and-evening-crying-1.jpg";
import bodyColicAndEveningCrying2 from "@/assets/firstyear-body-colic-and-evening-crying-2.jpg";
import heroIntroducingSolidFoods from "@/assets/firstyear-hero-introducing-solid-foods.jpg";
import bodyIntroducingSolidFoods1 from "@/assets/firstyear-body-introducing-solid-foods-1.jpg";
import bodyIntroducingSolidFoods2 from "@/assets/firstyear-body-introducing-solid-foods-2.jpg";
import heroNewbornQuirksAndReflexes from "@/assets/firstyear-hero-newborn-quirks-and-reflexes.jpg";
import bodyNewbornQuirksAndReflexes2 from "@/assets/firstyear-body-newborn-quirks-and-reflexes-2.jpg";
import heroNewbornSkinSpotsAndMarks from "@/assets/firstyear-hero-newborn-skin-spots-and-marks.jpg";
import bodyNewbornSkinSpotsAndMarks1 from "@/assets/firstyear-body-newborn-skin-spots-and-marks-1.jpg";
import bodyNewbornSkinSpotsAndMarks2 from "@/assets/firstyear-body-newborn-skin-spots-and-marks-2.jpg";
import heroCommonIllnessesInTheFirstYear from "@/assets/firstyear-hero-common-illnesses-in-the-first-year.jpg";
import bodyCommonIllnessesInTheFirstYear1 from "@/assets/firstyear-body-common-illnesses-in-the-first-year-1.jpg";
import bodyCommonIllnessesInTheFirstYear2 from "@/assets/firstyear-body-common-illnesses-in-the-first-year-2.jpg";
import heroStitchesTearsAndPerinealHealing from "@/assets/firstyear-hero-stitches-tears-and-perineal-healing.jpg";
import bodyStitchesTearsAndPerinealHealing1 from "@/assets/firstyear-body-stitches-tears-and-perineal-healing-1.jpg";
import bodyStitchesTearsAndPerinealHealing2 from "@/assets/firstyear-body-stitches-tears-and-perineal-healing-2.jpg";
import heroSeparatedTummyMuscles from "@/assets/firstyear-hero-separated-tummy-muscles.jpg";
import bodySeparatedTummyMuscles1 from "@/assets/firstyear-body-separated-tummy-muscles-1.jpg";
import bodySeparatedTummyMuscles2 from "@/assets/firstyear-body-separated-tummy-muscles-2.jpg";
import heroSexAndIntimacyAfterBirth from "@/assets/firstyear-hero-sex-and-intimacy-after-birth.jpg";
import bodySexAndIntimacyAfterBirth1 from "@/assets/firstyear-body-sex-and-intimacy-after-birth-1.jpg";
import bodySexAndIntimacyAfterBirth2 from "@/assets/firstyear-body-sex-and-intimacy-after-birth-2.jpg";
import heroNewbornFeedingRhythms from "@/assets/firstyear-hero-newborn-feeding-rhythms.jpg";
import heroBottleAndBreastfeedingQuestions from "@/assets/firstyear-hero-bottle-and-breastfeeding-questions.jpg";
import heroNewbornSleepExpectations from "@/assets/firstyear-hero-newborn-sleep-expectations.jpg";
import heroHelpingYourBabySettle from "@/assets/firstyear-hero-helping-your-baby-settle.jpg";
import heroBabyDevelopmentInTheFirstYear from "@/assets/firstyear-hero-baby-development-in-the-first-year.jpg";
import heroWhenMilestonesFeelUneven from "@/assets/firstyear-hero-when-milestones-feel-uneven.jpg";
import heroBabyCareBasics from "@/assets/firstyear-hero-baby-care-basics-v2.jpg";
import heroSafeSleepAndHomeSafety from "@/assets/firstyear-hero-safe-sleep-and-home-safety.jpg";
import heroHealingAfterBirth from "@/assets/firstyear-hero-healing-after-birth.jpg";
import heroWhatRecoveryCanFeelLike from "@/assets/firstyear-hero-what-recovery-can-feel-like.jpg";
import heroFeelingLikeYourselfAgain from "@/assets/firstyear-hero-feeling-like-yourself-again.jpg";
import heroBodyChangesAfterBirth from "@/assets/firstyear-hero-body-changes-after-birth.jpg";
import heroHormonesSweatAndHairLoss from "@/assets/firstyear-hero-hormones-sweat-and-hair-loss.jpg";
import heroPostnatalChecksAndAppointments from "@/assets/firstyear-hero-postnatal-checks-and-appointments.jpg";
import heroWhenToAskForHelpAfterBirth from "@/assets/firstyear-hero-when-to-ask-for-help-after-birth.jpg";

export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface FirstYearArticleImages {
  hero?: { src: string; alt: string };
  body: HubBodyImage[];
}

export const firstYearArticleImageMap: Record<string, FirstYearArticleImages> = {
  "teething": {
    hero: { src: heroTeething, alt: 'A parent smiling and holding a baby of around six to nine months on their lap in a bright living room.' },
    body: [
      { afterSectionIndex: 1, src: bodyTeething1, alt: "A baby chewing on a chilled teething ring while sitting in a parent's lap." },
      { afterSectionIndex: 4, src: bodyTeething2, alt: "An adult's hand holding a small children's toothbrush and a tube of toothpaste next to a bathroom sink." },
    ],
  },
  "colic-and-evening-crying": {
    hero: { src: heroColicAndEveningCrying, alt: 'A parent standing in a dimly lit living room in the evening, gently holding and rocking a baby against their shoulder.' },
    body: [
      { afterSectionIndex: 3, src: bodyColicAndEveningCrying1, alt: 'A parent holding a baby upright on their chest while sitting in an armchair.' },
      { afterSectionIndex: 5, src: bodyColicAndEveningCrying2, alt: 'A parent gently rocking a pram back and forth in a quiet hallway at home.' },
    ],
  },
  "introducing-solid-foods": {
    hero: { src: heroIntroducingSolidFoods, alt: 'A baby sitting upright in a highchair at a kitchen table, with a parent nearby offering a spoon of food.' },
    body: [
      { afterSectionIndex: 3, src: bodyIntroducingSolidFoods1, alt: 'A baby in a highchair reaching for a piece of soft cooked vegetable on a tray, with an adult seated beside them.' },
      { afterSectionIndex: 7, src: bodyIntroducingSolidFoods2, alt: 'A parent sitting directly beside a baby in a highchair, watching closely while the baby eats.' },
    ],
  },
  "newborn-quirks-and-reflexes": {
    hero: { src: heroNewbornQuirksAndReflexes, alt: 'A parent holding a swaddled newborn close to their chest in a softly lit bedroom.' },
    body: [
      { afterSectionIndex: 4, src: bodyNewbornQuirksAndReflexes2, alt: "A parent gently resting a hand on a newborn's head while the baby lies calmly in a crib." },
    ],
  },
  "newborn-skin-spots-and-marks": {
    hero: { src: heroNewbornSkinSpotsAndMarks, alt: "A close, gentle view of a newborn's face and shoulder in soft natural light, skin smooth and calm." },
    body: [
      { afterSectionIndex: 0, src: bodyNewbornSkinSpotsAndMarks1, alt: 'A parent gently bathing a newborn in a small baby bath using plain water.' },
      { afterSectionIndex: 3, src: bodyNewbornSkinSpotsAndMarks2, alt: 'A parent applying a small amount of barrier cream during a nappy change on a changing mat.' },
    ],
  },
  "common-illnesses-in-the-first-year": {
    hero: { src: heroCommonIllnessesInTheFirstYear, alt: 'A parent holding a baby wrapped in a blanket on a sofa during a quiet moment at home.' },
    body: [
      { afterSectionIndex: 1, src: bodyCommonIllnessesInTheFirstYear1, alt: 'A parent offering a bottle of milk to a baby resting in their arms on a sofa.' },
      { afterSectionIndex: 4, src: bodyCommonIllnessesInTheFirstYear2, alt: 'A parent sitting close to a baby resting on a mat during a quiet afternoon.' },
    ],
  },
  "stitches-tears-and-perineal-healing": {
    hero: { src: heroStitchesTearsAndPerinealHealing, alt: 'A woman sitting carefully on a cushioned chair at home in a softly lit living room.' },
    body: [
      { afterSectionIndex: 2, src: bodyStitchesTearsAndPerinealHealing1, alt: 'A neatly folded towel and a fresh sanitary pad on a bathroom shelf beside a glass of water.' },
      { afterSectionIndex: 5, src: bodyStitchesTearsAndPerinealHealing2, alt: 'A woman resting on a sofa with her feet up and a wrapped cold pack on a nearby cushion.' },
    ],
  },
  "separated-tummy-muscles": {
    hero: { src: heroSeparatedTummyMuscles, alt: 'A woman standing in a kitchen holding her baby against her shoulder in comfortable clothing.' },
    body: [
      { afterSectionIndex: 1, src: bodySeparatedTummyMuscles1, alt: 'A woman sitting upright on a bed feeding her baby with a supportive cushion behind her back.' },
      { afterSectionIndex: 3, src: bodySeparatedTummyMuscles2, alt: 'A woman sitting in a GP waiting room with a folder of notes and a pram beside her.' },
    ],
  },
  "sex-and-intimacy-after-birth": {
    hero: { src: heroSexAndIntimacyAfterBirth, alt: 'A fully clothed couple sitting close together on a sofa at home, smiling softly.' },
    body: [
      { afterSectionIndex: 1, src: bodySexAndIntimacyAfterBirth1, alt: 'A fully clothed couple holding hands across a kitchen table over two mugs of tea.' },
      { afterSectionIndex: 3, src: bodySexAndIntimacyAfterBirth2, alt: 'A fully clothed couple cuddling on a sofa under a blanket, relaxed and at ease.' },
    ],
  },
  "newborn-sleep-expectations": {
    hero: { src: heroNewbornSleepExpectations, alt: "A newborn sleeping on their back in a clear cot with a firm flat mattress and fitted sheet." },
    body: [],
  },
  "helping-your-baby-settle": {
    hero: { src: heroHelpingYourBabySettle, alt: "A parent holding a wakeful baby upright against their chest during a quiet evening at home." },
    body: [],
  },
  "when-sleep-suddenly-changes": {
    hero: {
      src: heroSleepChanges,
      alt: "Baby lying on their back in a fitted sleep bag, in a clear wooden cot with a fitted sheet",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: bodyNightWaking,
        alt: "A parent holding an awake baby calmly at home in low evening light",
        caption: "A settled pattern can change for a while without anything being wrong.",
      },
      {
        afterSectionIndex: 3,
        src: bodyBedtimeWindDown,
        alt: "A parent sharing a quiet picture book with an awake baby before bedtime",
        caption: "A calm, familiar wind-down can help mark the move from daytime to night.",
      },
    ],
  },

  "safe-sleep-and-home-safety": {
    hero: { src: heroSafeSleepAndHomeSafety, alt: "A parent placing a baby on their back in a clear cot with a firm flat mattress and fitted sheet." },
    body: [],
  },
  "baby-care-basics": {
    hero: { src: heroBabyCareBasics, alt: "A parent supporting a young baby's head and neck while bathing them in a shallow baby bath on the floor." },
    body: [],
  },
  "healing-after-birth": {
    hero: { src: heroHealingAfterBirth, alt: "A new parent resting beside their baby's clear bedside cot at home." },
    body: [],
  },
  "what-recovery-can-feel-like": {
    hero: { src: heroWhatRecoveryCanFeelLike, alt: "Two parents sharing newborn care in a lived-in kitchen during the early weeks after birth." },
    body: [],
  },
  "body-changes-after-birth": {
    hero: { src: heroBodyChangesAfterBirth, alt: "A postpartum parent looking at their clothed body in a bedroom mirror at home." },
    body: [],
  },
  "hormones-sweat-and-hair-loss": {
    hero: { src: heroHormonesSweatAndHairLoss, alt: "A postpartum parent gently checking loose hair in a brush while looking in a bathroom mirror." },
    body: [],
  },
  "newborn-feeding-rhythms": {
    hero: { src: heroNewbornFeedingRhythms, alt: "A parent bottle feeding a newborn in a supported semi-upright position at home." },
    body: [],
  },
  "bottle-and-breastfeeding-questions": {
    hero: { src: heroBottleAndBreastfeedingQuestions, alt: "Two parents calmly discussing feeding while one holds and feeds their baby at home." },
    body: [],
  },
  "baby-development-in-the-first-year": {
    hero: { src: heroBabyDevelopmentInTheFirstYear, alt: "A parent watching closely as an older baby sits and explores stacking toys on a floor mat." },
    body: [],
  },
  "when-milestones-feel-uneven": {
    hero: { src: heroWhenMilestonesFeelUneven, alt: "A parent and older baby sharing a picture book during relaxed floor play at home." },
    body: [],
  },
  "postnatal-checks-and-appointments": {
    hero: { src: heroPostnatalChecksAndAppointments, alt: "A parent holding their newborn while speaking with a health professional in a clinic room." },
    body: [],
  },
  "when-to-ask-for-help-after-birth": {
    hero: { src: heroWhenToAskForHelpAfterBirth, alt: "A new parent holding their baby while speaking with a supportive health professional at home." },
    body: [],
  },
  "feeling-like-yourself-again": {
    hero: { src: heroFeelingLikeYourselfAgain, alt: "A new parent having a quiet cup of tea while their baby rests safely on a floor mat nearby." },
    body: [],
  },
  // bespoke future: calm supportive parent and baby moment after birth, emotionally honest but not crisis-led
  "when-parenthood-feels-heavy": {
    hero: {
      src: heroSupportiveMoment,
      alt: "A parent and baby in a calm supportive moment after birth",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyEmotionalSupport,
        alt: "A gentle support moment for a parent caring for their baby",
        caption: "Parenthood can feel heavy and still be full of love. Support is allowed before everything feels too much.",
      },
    ],
  },
};



export const getFirstYearArticleImages = (
  slug: string,
): FirstYearArticleImages | undefined => firstYearArticleImageMap[slug];
