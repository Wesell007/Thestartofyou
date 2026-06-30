import ToddlerAgePage from "@/components/toddler/age/ToddlerAgePage";
import { toddlerAgeConfigs } from "@/data/toddlerAgeData";

const ThreeYears = () => (
  <ToddlerAgePage config={toddlerAgeConfigs["3-years"]} />
);

export default ThreeYears;
