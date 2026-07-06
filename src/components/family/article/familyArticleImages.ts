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
  // Bespoke future image: shared family screen moment, warm evening light,
  // not children isolated on devices.
  "screen-time-as-a-family": {
    hero: {
      src: heroFour.url,
      alt: "A family of four sharing a calm evening together at home",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicPlay.url,
        alt: "A parent and child sharing something on a screen together",
        caption: "Shared screens can still be shared time.",
      },
    ],
  },
  // Bespoke future image: parent and small child at a train window,
  // calm travel scene with warm natural light.
  "travelling-with-young-children": {
    hero: {
      src: heroEveryday.url,
      alt: "A parent and young child in a calm everyday travel moment",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicFamilyBasics.url,
        alt: "A family bag packed and ready by the door",
        caption: "Packing for needs, not every possible scenario.",
      },
    ],
  },
  // Bespoke future image: child in a car seat looking out of the window
  // with warm afternoon light through glass.
  "making-car-journeys-calmer": {
    hero: {
      src: heroParents.url,
      alt: "A parent settling a young child before a car journey",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicFamilyBasics.url,
        alt: "A calm car interior ready for a family journey",
        caption: "Small preparations before a journey often carry the whole trip.",
      },
    ],
  },
  // Bespoke future image: multigenerational family scene at a kitchen table,
  // calm and warm, grandparents and grandchildren together.
  "setting-boundaries-with-grandparents": {
    hero: {
      src: heroDiverse.url,
      alt: "A multigenerational family together in a warm home setting",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicRelationships.url,
        alt: "A calm conversation between adults in a family home",
        caption: "Clarity and kindness usually travel well together.",
      },
    ],
  },
  // Bespoke future image: parent with older child near baby items,

  // calm home setting.
  "preparing-for-another-baby": {
    hero: {
      src: heroDiverse.url,
      alt: "A parent with an older child in a calm home preparing for a new baby",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicGrowing.url,
        alt: "An older child near quiet baby items in a warm home",
        caption: "Preparing gently is usually more useful than preparing perfectly.",
      },
    ],
  },
  // Bespoke future image: parent planning childcare at a kitchen table
  // with notebook and calendar.
  "managing-childcare-costs": {
    hero: {
      src: heroParents.url,
      alt: "Two parents talking through childcare plans at home",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicFamilyBasics.url,
        alt: "A calm kitchen table with a notebook and a family calendar",
        caption: "A shared page often steadies a heavy conversation.",
      },
    ],
  },
  // Bespoke future image: calm home detail showing everyday family safety
  // without alarm.
  "making-your-home-safer": {
    hero: {
      src: heroEveryday.url,
      alt: "A calm, everyday family home scene",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicFamilyBasics.url,
        alt: "A warm home detail showing gentle everyday family safety",
        caption: "Small everyday habits often protect a family more than any single product.",
      },
    ],
  },
  // Bespoke future image: supportive adult conversation in a warm home setting.
  "when-to-ask-for-help": {
    hero: {
      src: heroFour.url,
      alt: "A family together in a warm, supportive home moment",
    },
    body: [
      {
        afterSectionIndex: 2,
        src: topicRelationships.url,
        alt: "A quiet, supportive conversation between adults at home",
        caption: "Asking early is usually gentler than waiting until things feel overwhelming.",
      },
    ],
  },
};
