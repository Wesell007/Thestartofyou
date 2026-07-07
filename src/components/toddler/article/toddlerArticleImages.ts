import heroPlayTopicAsset from "@/assets/toddler-topic-play.jpg.asset.json";
import heroFoodTopicAsset from "@/assets/toddler-topic-food.jpg.asset.json";
import heroSleepTopicAsset from "@/assets/toddler-topic-sleep.jpg.asset.json";
import heroDevelopmentTopicAsset from "@/assets/toddler-topic-development.jpg.asset.json";
const heroPlayTopic = heroPlayTopicAsset.url;
const heroFoodTopic = heroFoodTopicAsset.url;
const heroSleepTopic = heroSleepTopicAsset.url;
const heroDevelopmentTopic = heroDevelopmentTopicAsset.url;
import heroConnection from "@/assets/toddler-article-connection-hero.jpg";
import heroCalmMealtime from "@/assets/toddler-article-calm-mealtime-hero.jpg";
import heroBedtime from "@/assets/toddler-article-bedtime-hero.jpg";
import heroMilestones from "@/assets/toddler-article-milestones-hero.jpg";

import bodySimplePlay from "@/assets/toddler-article-simple-play-body.jpg";
import bodyConnection from "@/assets/toddler-article-connection-body.jpg";
import bodyPickyEating from "@/assets/toddler-article-picky-eating-body.jpg";
import bodyCalmMealtime from "@/assets/toddler-article-calm-mealtime-body.jpg";
import bodySleepRhythms from "@/assets/toddler-article-sleep-rhythms-body.jpg";
import bodyBedtime from "@/assets/toddler-article-bedtime-body.jpg";
import bodyDevelopment from "@/assets/toddler-article-development-body.jpg";
import bodyMilestones from "@/assets/toddler-article-milestones-body.jpg";

export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface ToddlerArticleImages {
  hero: { src: string; alt: string };
  body: HubBodyImage[];
}

export const toddlerArticleImageMap: Record<string, ToddlerArticleImages> = {
  // bespoke future: toddler exploring simple play at home with a parent nearby in warm natural light
  "simple-play-ideas-for-toddlers": {
    hero: {
      src: heroPlayTopic,
      alt: "A toddler playing with simple toys in a calm home setting",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodySimplePlay,
        alt: "A parent and toddler sharing a simple everyday play moment",
        caption:
          "Simple play does not need to be complicated. Toddlers often learn most through repeated, ordinary moments.",
      },
    ],
  },
  // bespoke future: parent and toddler connecting through simple everyday play in a calm home setting
  "building-connection-through-everyday-play": {
    hero: {
      src: heroConnection,
      alt: "A parent and toddler sharing a gentle play moment at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyConnection,
        alt: "A toddler leading play while a parent joins in nearby",
        caption:
          "Connection is often built through small repeated moments, not perfect activities.",
      },
    ],
  },
  // bespoke future: calm toddler mealtime with simple food and no pressure in a warm home setting
  "picky-eating-in-toddlers": {
    hero: {
      src: heroFoodTopic,
      alt: "A toddler sitting calmly at the table during a simple mealtime",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyPickyEating,
        alt: "A small toddler meal served calmly without pressure",
        caption:
          "Picky eating can feel stressful, but calm repetition and low pressure can help mealtimes feel more manageable.",
      },
    ],
  },
  // bespoke future: relaxed parent and toddler mealtime at home, warm and realistic without pressure
  "making-mealtimes-feel-calmer": {
    hero: {
      src: heroCalmMealtime,
      alt: "A parent and toddler sharing a calm mealtime at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyCalmMealtime,
        alt: "A toddler exploring food during a relaxed family meal",
        caption:
          "A calmer mealtime is not about a perfect plate. It is about reducing pressure and finding a rhythm that works for your family.",
      },
    ],
  },
  // bespoke future: calm toddler bedtime routine in warm evening light, gentle and realistic
  "toddler-sleep-rhythms": {
    hero: {
      src: heroSleepTopic,
      alt: "A toddler settling calmly during a gentle bedtime routine",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodySleepRhythms,
        alt: "A quiet toddler bedroom prepared for sleep in soft evening light",
        caption:
          "Toddler sleep can change as development, naps, routines and reassurance needs shift.",
      },
    ],
  },
  // bespoke future: parent calmly reassuring toddler at bedtime, soft light and no distress
  "bedtime-battles-and-night-waking": {
    hero: {
      src: heroBedtime,
      alt: "A parent gently reassuring a toddler at bedtime",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyBedtime,
        alt: "A calm bedtime moment with a toddler and parent in soft light",
        caption:
          "Bedtime can feel hard when toddlers need reassurance, boundaries and rest all at once.",
      },
    ],
  },
  // bespoke future: toddler exploring movement and problem-solving through everyday play at home
  "what-toddler-development-can-look-like": {
    hero: {
      src: heroDevelopmentTopic,
      alt: "A toddler exploring through play in a calm home setting",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyDevelopment,
        alt: "A toddler practising everyday skills with a parent nearby",
        caption:
          "Toddler development often shows up through movement, play, communication, independence and everyday curiosity.",
      },
    ],
  },
  // bespoke future: parent calmly supporting toddler development through play, warm and non-clinical
  "when-milestones-feel-different": {
    hero: {
      src: heroMilestones,
      alt: "A parent calmly watching their toddler play at their own pace",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: bodyMilestones,
        alt: "A toddler playing quietly with support nearby",
        caption:
          "When milestones feel different, it can help to notice patterns over time and ask for advice if something worries you.",
      },
    ],
  },
};

export const getToddlerArticleImages = (
  slug: string,
): ToddlerArticleImages | undefined => toddlerArticleImageMap[slug];
