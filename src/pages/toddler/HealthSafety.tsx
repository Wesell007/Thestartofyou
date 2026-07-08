import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const HealthSafety = () => (
  <>
    <SeoHead
      title="Toddler Health and Safety | The Start of You"
      description="Practical toddler safety guidance, home safety support and calm advice on when to ask for help if your child seems unwell."
      canonical="https://thestartofyou.com/toddler/health-safety"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["health-safety"]} />
  </>
);

export default HealthSafety;
