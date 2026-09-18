import topicBabyHero from "@/assets/topic-baby-hero.jpg";
import topicBodyHero from "@/assets/topic-body-hero.jpg";
import topicDietHero from "@/assets/topic-diet-hero.jpg";
import topicFeelingsHero from "@/assets/topic-feelings-hero.jpg";
import topicHealthHero from "@/assets/topic-health-hero.jpg";
import topicPreparingHero from "@/assets/topic-preparing-hero.jpg";
import type { PregnancyTopicSlug } from "@/data/pregnancyTopicData";

export const PREGNANCY_TOPIC_IMAGES: Record<PregnancyTopicSlug, string> = {
  body: topicBodyHero,
  baby: topicBabyHero,
  feelings: topicFeelingsHero,
  "health-and-safety": topicHealthHero,
  "diet-and-exercise": topicDietHero,
  "preparing-for-baby": topicPreparingHero,
};