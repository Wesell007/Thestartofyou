import cycleTrackingImg from "@/assets/ttc-stage-cycle.jpg";
import twoWeekWaitImg from "@/assets/ttc-stage-waiting.jpg";
import pregnancyTestsImg from "@/assets/ttc-pregnancy-tests.jpg";
import conditionsImg from "@/assets/ttc-conditions.jpg";
import ageAndFertilityImg from "@/assets/ttc-age-and-fertility.jpg";
import maleFertilityImg from "@/assets/ttc-male-fertility.jpg";
import ivfTreatmentImg from "@/assets/ttc-ivf-treatment.jpg";

export type TTCExploreTopicSlug =
  | "cycle-tracking"
  | "two-week-wait"
  | "pregnancy-tests"
  | "conditions"
  | "age-and-fertility"
  | "male-fertility"
  | "ivf-and-treatment";

export const TTC_EXPLORE_TOPIC_CLUSTERS: { label: string; slugs: TTCExploreTopicSlug[] }[] = [
  { label: "Timing, testing and waiting", slugs: ["cycle-tracking", "two-week-wait", "pregnancy-tests"] },
  { label: "Health and preparation", slugs: ["conditions"] },
  { label: "Fertility support", slugs: ["age-and-fertility", "male-fertility", "ivf-and-treatment"] },
];

export const TTC_EXPLORE_TOPIC_IMAGES: Record<TTCExploreTopicSlug, string> = {
  "cycle-tracking": cycleTrackingImg,
  "two-week-wait": twoWeekWaitImg,
  "pregnancy-tests": pregnancyTestsImg,
  conditions: conditionsImg,
  "age-and-fertility": ageAndFertilityImg,
  "male-fertility": maleFertilityImg,
  "ivf-and-treatment": ivfTreatmentImg,
};

export const TTC_EXPLORE_ACTION_LABEL = "Explore topic";