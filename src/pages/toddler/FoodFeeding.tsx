import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const FoodFeeding = () => (
  <>
    <SeoHead
      title="Toddler Food and Feeding | The Start of You"
      description="Gentle guidance on picky eating, toddler mealtimes, food refusal and calmer feeding routines without pressure or shame."
      canonical="https://thestartofyou.com/toddler/food-feeding"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["food-feeding"]} />
  </>
);

export default FoodFeeding;
