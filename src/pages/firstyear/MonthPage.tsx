import { Navigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import FirstYearMonthPage from "@/components/firstyear/month/FirstYearMonthPage";
import { getMonthGuide, type MonthSlug } from "@/data/firstYearMonthData";

type Props = { slug: MonthSlug };

const SITE = "https://thestartofyou.com";

const MonthPage = ({ slug }: Props) => {
  const guide = getMonthGuide(slug);
  if (!guide) return <Navigate to="/first-year" replace />;
  const canonical = `${SITE}/first-year/${guide.slug}`;
  return (
    <>
      <SeoHead
        title={guide.seo.title}
        description={guide.seo.description}
        canonical={canonical}
      />
      <FirstYearMonthPage guide={guide} />
    </>
  );
};

export default MonthPage;
