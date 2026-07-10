import heroFour from "@/assets/family-hero-family-four.jpg.asset.json";
import topicFamilyBasics from "@/assets/family-topic-family-basics.jpg.asset.json";
import topicGrowing from "@/assets/family-topic-growing-families.jpg.asset.json";
import topicHealth from "@/assets/family-topic-health-safety.jpg.asset.json";
import topicRelationships from "@/assets/family-topic-relationships.jpg.asset.json";
import topicPlay from "@/assets/family-topic-play-connection.jpg.asset.json";
import topicTravel from "@/assets/family-topic-travel-days-out.jpg.asset.json";

// Bespoke per-article hero images (Phase 9.2b.1 — unique image per ready article)
import artPreparing from "@/assets/family-article-preparing-for-another-baby.jpg.asset.json";
import artAdjust from "@/assets/family-article-helping-your-child-adjust-to-a-new-sibling.jpg.asset.json";
import artSecondTime from "@/assets/family-article-second-time-parenting.jpg.asset.json";
import artMentalLoad from "@/assets/family-article-sharing-the-mental-load.jpg.asset.json";
import artGrandparents from "@/assets/family-article-setting-boundaries-with-grandparents.jpg.asset.json";
import artStayingConnected from "@/assets/family-article-staying-connected-as-parents.jpg.asset.json";
import artRoutines from "@/assets/family-article-building-family-routines.jpg.asset.json";
import artChildcareCosts from "@/assets/family-article-managing-childcare-costs.jpg.asset.json";
import artCalmerEvenings from "@/assets/family-article-calmer-evenings-after-busy-days.jpg.asset.json";
import artHomeSafer from "@/assets/family-article-making-your-home-safer.jpg.asset.json";
import artAskForHelp from "@/assets/family-article-when-to-ask-for-help.jpg.asset.json";
import artSickDays from "@/assets/family-article-family-sick-days-at-home.jpg.asset.json";
import artTravelling from "@/assets/family-article-travelling-with-young-children.jpg.asset.json";
import artCarJourneys from "@/assets/family-article-making-car-journeys-calmer.jpg.asset.json";
import artDaysOut from "@/assets/family-article-planning-family-days-out.jpg.asset.json";
import artTraditions from "@/assets/family-article-building-family-traditions.jpg.asset.json";
import artScreenTime from "@/assets/family-article-screen-time-as-a-family.jpg.asset.json";
import artSimplePlay from "@/assets/family-article-simple-family-play-ideas.jpg.asset.json";

import type { FamilyArticle, FamilyArticleTopic } from "@/data/familyArticleData";

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

// Safety net for future draft articles that don't yet have a bespoke hero.
// All 18 currently-ready articles resolve via familyArticleImageMap below,
// so this fallback is not used at runtime for any live card.
export const familyTopicFallbackImage: Record<
  FamilyArticleTopic,
  { src: string; alt: string }
> = {
  "growing-families": {
    src: topicGrowing.url,
    alt: "A calm scene from a growing family",
  },
  relationships: {
    src: topicRelationships.url,
    alt: "A quiet moment between adults in a family home",
  },
  "family-basics": {
    src: topicFamilyBasics.url,
    alt: "A warm everyday family home moment",
  },
  "health-safety": {
    src: topicHealth.url,
    alt: "A gentle, everyday family health and safety scene",
  },
  "travel-days-out": {
    src: topicTravel.url,
    alt: "A family preparing for a day out together",
  },
  "play-connection": {
    src: topicPlay.url,
    alt: "A parent and child sharing simple play at home",
  },
};

export function getFamilyArticleCardImage(article: FamilyArticle) {
  const mapped = familyArticleImageMap[article.slug]?.hero;
  if (mapped) return mapped;
  return familyTopicFallbackImage[article.topic];
}

export const familyArticleImageMap: Record<string, FamilyArticleImages> = {
  // ─── Growing families ───────────────────────────────────────────────
  "preparing-for-another-baby": {
    hero: {
      src: artPreparing.url,
      alt: "Two adults preparing a softly lit nursery corner together",
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
  "helping-your-child-adjust-to-a-new-sibling": {
    hero: {
      src: artAdjust.url,
      alt: "A parent sitting on the floor speaking softly with an older child while cradling a newborn",
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
  "second-time-parenting": {
    hero: {
      src: artSecondTime.url,
      alt: "A reflective parent holding a baby while an older toddler plays quietly nearby",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicGrowing.url,
        alt: "A parent holding a baby while an older child plays nearby",
        caption: "Second-time parenting often means holding two very different needs in the same day.",
      },
    ],
  },

  // ─── Relationships ──────────────────────────────────────────────────
  "sharing-the-mental-load": {
    hero: {
      src: artMentalLoad.url,
      alt: "A couple at a kitchen table with a shared paper planner and two mugs, mid-conversation",
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
  "setting-boundaries-with-grandparents": {
    hero: {
      src: artGrandparents.url,
      alt: "A grandparent and adult child in respectful conversation on a warm living-room sofa",
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
  "staying-connected-as-parents": {
    hero: {
      src: artStayingConnected.url,
      alt: "A couple sharing coffee on a linen sofa in warm morning light",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicRelationships.url,
        alt: "A quiet, unhurried moment between two adults at home",
        caption: "Connection often lives in small moments, not big evenings out.",
      },
    ],
  },

  // ─── Family basics ──────────────────────────────────────────────────
  "building-family-routines": {
    hero: {
      src: artRoutines.url,
      alt: "A parent kneeling by the front door helping two young children with coats and shoes",
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
  "managing-childcare-costs": {
    hero: {
      src: artChildcareCosts.url,
      alt: "A parent at a kitchen table with a laptop, notebook and wall calendar, reviewing family admin",
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
  "calmer-evenings-after-busy-days": {
    hero: {
      src: artCalmerEvenings.url,
      alt: "A parent switching on a soft lamp as two young children settle into quiet evening play",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicFamilyBasics.url,
        alt: "A warm kitchen scene at the end of a family day",
        caption: "A soft landing point at the start of the evening changes the shape of the whole night.",
      },
    ],
  },

  // ─── Health & safety ────────────────────────────────────────────────
  "making-your-home-safer": {
    hero: {
      src: artHomeSafer.url,
      alt: "A parent fitting a small childproof latch on a low kitchen cupboard while a toddler watches",
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
  "when-to-ask-for-help": {
    hero: {
      src: artAskForHelp.url,
      alt: "Two adult friends at a wooden kitchen table with mugs of tea, in supportive conversation",
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
  "family-sick-days-at-home": {
    hero: {
      src: artSickDays.url,
      alt: "A parent tucking a knitted blanket around a young child resting on a linen sofa",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicFamilyBasics.url,
        alt: "A quiet home scene during a slow family day",
        caption: "Familiar comforts often help more than any new routine on a sick day.",
      },
    ],
  },

  // ─── Travel & days out ──────────────────────────────────────────────
  "travelling-with-young-children": {
    hero: {
      src: artTravelling.url,
      alt: "A parent and young toddler looking out of a train window in warm daylight",
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
  "making-car-journeys-calmer": {
    hero: {
      src: artCarJourneys.url,
      alt: "A young child in a car seat looking out of a window in warm late-afternoon light",
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
  "planning-family-days-out": {
    hero: {
      src: artDaysOut.url,
      alt: "A family lacing up shoes and putting on jackets by an open front door with a small daypack ready",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicGrowing.url,
        alt: "A family sharing a calm moment together outdoors",
        caption: "One clear anchor tends to make a day out easier to hold than a full itinerary.",
      },
    ],
  },

  // ─── Play & connection ──────────────────────────────────────────────
  "building-family-traditions": {
    hero: {
      src: artTraditions.url,
      alt: "A family rolling out dough together at a wooden kitchen counter in warm light",
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
  "screen-time-as-a-family": {
    hero: {
      src: artScreenTime.url,
      alt: "A parent and two children on a linen sofa watching a tablet together in warm evening light",
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
  "simple-family-play-ideas": {
    hero: {
      src: artSimplePlay.url,
      alt: "A parent and child on a soft rug arranging simple wooden blocks together",
    },
    body: [
      {
        afterSectionIndex: 1,
        src: topicPlay.url,
        alt: "A simple moment of shared play between parent and child",
        caption: "Small pockets of unhurried attention often become the play children remember.",
      },
    ],
  },
};

// Legacy exports retained for tree-shake safety; unused hero-* images
// still surface inside article body slots above.
void heroDiverse;
void heroEveryday;
void heroParents;
