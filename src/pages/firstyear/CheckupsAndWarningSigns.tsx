import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const CheckupsAndWarningSigns = () => (
  <>
    <SeoHead
      title="Postnatal Checks and When to Ask for Help | The Start of You"
      description="A calm guide to early postnatal checks, health visitor support, baby reviews and knowing when to ask for help after birth."
      canonical="https://thestartofyou.com/first-year/checkups-and-warning-signs"
    />
    {renderFirstYearTopic("checkups-and-warning-signs")}
  </>
);

export default CheckupsAndWarningSigns;
