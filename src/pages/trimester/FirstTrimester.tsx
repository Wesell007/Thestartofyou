import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StageGuidanceTrimester from "@/components/guidance/templates/StageGuidanceTrimester";
import { firstTrimester } from "@/data/trimesterData";

const FirstTrimester = () => {
  return <StageGuidanceTrimester data={firstTrimester} />;
};

export default FirstTrimester;
