import SeoHead from "@/components/seo/SeoHead";

interface PregnancyWeekSeoProps {
  weekNumber: number;
}

const PregnancyWeekSeo = ({ weekNumber }: PregnancyWeekSeoProps) => (
  <SeoHead
    title={`${weekNumber} Weeks Pregnant | Symptoms, Baby Development & Support`}
    description={`You are ${weekNumber} weeks pregnant. Learn what may be changing with your baby, your body, symptoms, appointments and gentle support for this stage of pregnancy.`}
    canonical={`https://thestartofyou.com/pregnancy/week/${weekNumber}`}
  />
);

export default PregnancyWeekSeo;
