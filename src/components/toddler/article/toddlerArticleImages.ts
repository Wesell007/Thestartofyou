import heroPlayTopicAsset from "@/assets/toddler-topic-play.jpg.asset.json";
import heroFoodTopicAsset from "@/assets/toddler-topic-food.jpg.asset.json";
const heroPlayTopic = heroPlayTopicAsset.url;
const heroFoodTopic = heroFoodTopicAsset.url;
import heroConnection from "@/assets/toddler-article-connection-hero.jpg";
import heroCalmMealtime from "@/assets/toddler-article-calm-mealtime-hero.jpg";

import bodySimplePlay from "@/assets/toddler-article-simple-play-body.jpg";
import bodyConnection from "@/assets/toddler-article-connection-body.jpg";
import bodyPickyEating from "@/assets/toddler-article-picky-eating-body.jpg";
import bodyCalmMealtime from "@/assets/toddler-article-calm-mealtime-body.jpg";

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
};

export const getToddlerArticleImages = (
  slug: string,
): ToddlerArticleImages | undefined => toddlerArticleImageMap[slug];
