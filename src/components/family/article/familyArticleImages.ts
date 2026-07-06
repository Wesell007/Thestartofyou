import heroDiverse from "@/assets/family-hero-diverse-family.jpg.asset.json";
import heroEveryday from "@/assets/family-hero-everyday.jpg.asset.json";
import heroFour from "@/assets/family-hero-family-four.jpg.asset.json";
import heroParents from "@/assets/family-hero-parents.jpg.asset.json";
import topicFamilyBasics from "@/assets/family-topic-family-basics.jpg.asset.json";
import topicGrowing from "@/assets/family-topic-growing-families.jpg.asset.json";
import topicRelationships from "@/assets/family-topic-relationships.jpg.asset.json";
import topicPlay from "@/assets/family-topic-play-connection.jpg.asset.json";

export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface FamilyArticleImages {
  hero: { src: string; alt: string };
  body: HubBodyImage[];
}

export const familyArticleImageMap: Record<string, FamilyArticleImages> = {
  "building-family-routines": {
    hero: {
      src: heroEveryday.url,
      alt: "A parent and child sharing a calm everyday moment at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicFamilyBasics.url,
        alt: "A warm family kitchen scene during a daily routine",
        caption: "Small daily rhythms are what steady a family.",
      },
    ],
  },
  "building-family-traditions": {
    hero: {
      src: heroFour.url,
      alt: "A family of four together in a soft, warmly lit home moment",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicPlay.url,
        alt: "A gentle family ritual, parents and children together",
        caption: "The smallest rituals often become the ones children remember.",
      },
    ],
  },
  "sharing-the-mental-load": {
    hero: {
      src: heroParents.url,
      alt: "Two parents in a calm, shared moment of planning at home",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicRelationships.url,
        alt: "A quiet, shared conversation between partners at home",
        caption: "Making the invisible work visible is where sharing begins.",
      },
    ],
  },
  "helping-your-child-adjust-to-a-new-sibling": {
    hero: {
      src: heroDiverse.url,
      alt: "A parent with an older child and a new baby in a calm home setting",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicGrowing.url,
        alt: "An older sibling gently near a new baby",
        caption: "Adjustment is a slow, quiet process, not a single moment.",
      },
      {
        afterSectionIndex: 3,
        src: heroFour.url,
        alt: "A family of four sharing a soft, connected moment",
        caption: "Space for mixed feelings is part of becoming a sibling.",
      },
    ],
  },
};
