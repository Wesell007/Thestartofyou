import heroNewbornSleep from "@/assets/firstyear-stage-0-3.jpg";
import heroSettle from "@/assets/firstyear-scene.jpg";
import heroSafeSleep from "@/assets/guidance-card-nursery.jpg";
import heroBabyCare from "@/assets/firstyear-journey.jpg";

import bodySleepCot from "@/assets/article-hero-third-sleep.jpg";
import bodyComfort from "@/assets/guidance-card-comfort.jpg";
import bodySafety from "@/assets/guidance-card-safety.jpg";
import bodyBonding from "@/assets/guidance-card-bonding.jpg";

import heroHealing from "@/assets/postpartum-stage-early-days.jpg";
import bodyHealing from "@/assets/postpartum-scene.jpg";
import heroRecoveryFeel from "@/assets/postpartum-stage-early-weeks.jpg";
import bodyRecoveryFeel from "@/assets/postpartum-journey.jpg";
import heroBodyChanges from "@/assets/postpartum-stage-adjustment.jpg";
import bodyBodyChanges from "@/assets/guidance-postpartum.jpg";
import heroHormones from "@/assets/guidance-postpartum.jpg";
import bodyHormones from "@/assets/home-emotional.jpg";

import heroDevelopment from "@/assets/firstyear-stage-6-9.jpg";
import bodyDevelopment from "@/assets/guidance-card-development.jpg";
import heroMilestones from "@/assets/firstyear-stage-9-12.jpg";
import bodyMilestones from "@/assets/guidance-card-milestones.jpg";

import heroFeelingLikeYourself from "@/assets/article-hero-emotional-feeling-like-yourself.jpg";
import heroSupportiveMoment from "@/assets/article-hero-emotional-supportive-moment.jpg";
import bodyEmotionalSupport from "@/assets/guidance-card-emotional.jpg";
// bodyEmotionalAdjustment reuses the already-imported `heroBodyChanges`
// asset (`postpartum-stage-adjustment.jpg`), used here as the body image
// for `feeling-like-yourself-again`.


export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface FirstYearArticleImages {
  hero: { src: string; alt: string };
  body: HubBodyImage[];
}

export const firstYearArticleImageMap: Record<string, FirstYearArticleImages> = {
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
