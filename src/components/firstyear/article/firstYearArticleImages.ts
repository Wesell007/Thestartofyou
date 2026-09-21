import heroNewbornSleep from "@/assets/firstyear-stage-0-3.jpg";
import heroSafeSleep from "@/assets/guidance-card-nursery.jpg";
import heroBabyCare from "@/assets/firstyear-journey.jpg";

import bodyBonding from "@/assets/guidance-card-bonding.jpg";

import heroSleepChanges from "@/assets/firstyear-hero-sleep-changes-safe.jpg";
import bodyNightWaking from "@/assets/firstyear-body-night-waking.jpg";
import bodyBedtimeWindDown from "@/assets/firstyear-body-bedtime-wind-down-approved.jpg";

import bodyHealing from "@/assets/postpartum-scene.jpg";
import bodyRecoveryFeel from "@/assets/postpartum-journey.jpg";
import bodyBodyChanges from "@/assets/guidance-postpartum.jpg";

import heroDevelopment from "@/assets/firstyear-stage-6-9.jpg";
import heroMilestones from "@/assets/firstyear-stage-9-12.jpg";

import heroFeelingLikeYourself from "@/assets/article-hero-emotional-feeling-like-yourself.jpg";
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
import bodyNewbornQuirksAndReflexes1 from "@/assets/firstyear-body-newborn-quirks-and-reflexes-1.jpg";
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
      { afterSectionIndex: 0, src: bodyNewbornQuirksAndReflexes1, alt: "A close view of a newborn's hand gripping an adult's finger." },
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
  // bespoke future: newborn asleep in a soft, warm-lit family bedroom
  "newborn-sleep-expectations": {
    hero: {
      src: heroNewbornSleep,
      alt: "A newborn resting calmly in a soft first-year home setting",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodySleepCot,
        alt: "A quiet nursery cot in soft, warm light",
        caption: "Newborn sleep rarely follows a schedule, and that is normal.",
      },
    ],
  },
  // bespoke future: parent settling baby in warm evening light
  "helping-your-baby-settle": {
    hero: {
      src: heroSettle,
      alt: "A parent gently holding and settling a baby at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyComfort,
        alt: "A soothing evening moment with a baby",
        caption: "Settling is a slow rhythm you build together, not a single technique.",
      },
    ],
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

  // bespoke future: safe cot detail with breathable bedding
  "safe-sleep-and-home-safety": {
    hero: {
      src: heroSafeSleep,
      alt: "A calm, safe nursery prepared for a baby",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodySafety,
        alt: "A gentle home safety detail in a warm baby room",
        caption: "Small, consistent habits protect a baby more than any single product.",
      },
    ],
  },
  // bespoke future: parent bathing or changing baby in soft daylight
  "baby-care-basics": {
    hero: {
      src: heroBabyCare,
      alt: "An everyday first-year moment of a parent caring for a baby",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyBonding,
        alt: "A parent tending to a baby in a soft, unhurried moment",
        caption: "The basics become intuitive faster than most new parents expect.",
      },
    ],
  },
  // bespoke future: parent resting after birth in soft natural light
  "healing-after-birth": {
    hero: {
      src: heroHealing,
      alt: "A parent resting quietly at home in the early days after birth",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyHealing,
        alt: "A calm postpartum recovery moment at home",
        caption: "Healing after birth is gradual, and rest counts even when it comes in small pieces.",
      },
    ],
  },
  // bespoke future: new parent being supported during everyday recovery
  "what-recovery-can-feel-like": {
    hero: {
      src: heroRecoveryFeel,
      alt: "A new parent in a reflective home moment during early recovery",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyRecoveryFeel,
        alt: "A gentle support moment with baby nearby",
        caption: "Recovery is rarely a straight line, and support can make it easier to move through.",
      },
    ],
  },
  // bespoke future: respectful postpartum body-care moment without bounce-back framing
  "body-changes-after-birth": {
    hero: {
      src: heroBodyChanges,
      alt: "A soft postpartum moment at home, respectful and non-clinical",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyBodyChanges,
        alt: "A calm parent care detail after birth",
        caption: "Your body has been through a major change, and it deserves time and care.",
      },
    ],
  },
  // bespoke future: gentle postpartum self-care scene in warm morning light
  "hormones-sweat-and-hair-loss": {
    hero: {
      src: heroHormones,
      alt: "A calm parent in a quiet home moment after birth",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyHormones,
        alt: "A soft morning self-care moment",
        caption: "Hormonal changes after birth can feel intense, but many shifts settle with time.",
      },
    ],
  },
  // bespoke future: parent feeding newborn calmly in soft natural light
  "newborn-feeding-rhythms": {
    hero: {
      src: heroNewbornSleep,
      alt: "A calm early-days moment between a parent and newborn",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyComfort,
        alt: "A quiet moment of close, responsive care",
        caption: "Newborn feeding often finds its rhythm slowly, through small cues and repeated moments.",
      },
    ],
  },
  // bespoke future: inclusive feeding scene showing calm, non-judgemental support
  "bottle-and-breastfeeding-questions": {
    hero: {
      src: heroSettle,
      alt: "A calm, non-judgemental feeding moment at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyBonding,
        alt: "A parent and baby in a warm, unhurried feeding moment",
        caption: "Feeding can change over time, and support matters more than choosing a perfect path.",
      },
    ],
  },
  // bespoke future: baby exploring through play with a parent nearby in soft natural light
  "baby-development-in-the-first-year": {
    hero: {
      src: heroDevelopment,
      alt: "A baby exploring movement and play in a calm first-year home setting",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyDevelopment,
        alt: "A parent and baby sharing a warm play and connection moment",
        caption: "Development is not just milestones. It grows through movement, play, communication and connection.",
      },
    ],
  },
  // bespoke future: reassuring parent and baby development moment without clinical or comparison framing
  "when-milestones-feel-uneven": {
    hero: {
      src: heroMilestones,
      alt: "A baby in a gentle everyday development moment at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyMilestones,
        alt: "A calm parent and baby moment during the first year",
        caption: "Uneven development can feel worrying, but noticing patterns over time can help you know when to ask for advice.",
      },
    ],
  },
  // bespoke future: calm parent and baby preparing for an early postnatal appointment at home
  "postnatal-checks-and-appointments": {
    hero: {
      src: heroHealing,
      alt: "A calm parent and baby moment during early postnatal care",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyBonding,
        alt: "A parent keeping simple notes and questions during the first year",
        caption: "Early checks are there to support you and your baby, not to test whether you have everything figured out.",
      },
    ],
  },
  // bespoke future: reassuring parent and baby support moment after birth, calm and non-clinical
  "when-to-ask-for-help-after-birth": {
    hero: {
      src: heroRecoveryFeel,
      alt: "A parent holding their baby in a calm and supportive first-year moment",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyRecoveryFeel,
        alt: "A gentle parent and baby moment after birth",
        caption: "Asking for help after birth is part of being supported, not a sign that you have failed.",
      },
    ],
  },
  // bespoke future: quiet parent and baby moment at home, calm emotional recovery after birth
  "feeling-like-yourself-again": {
    hero: {
      src: heroFeelingLikeYourself,
      alt: "A parent holding their baby in a quiet first-year moment at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: heroBodyChanges,
        alt: "A calm parent and baby moment during emotional recovery after birth",
        caption: "Feeling like yourself again can happen slowly, through rest, support and small moments that help you feel grounded.",
      },
    ],
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
