import ToddlerAgePage from "@/components/toddler/age/ToddlerAgePage";
import { toddlerAgeConfigs } from "@/data/toddlerAgeData";

const ThirtyMonths = () => (
  <ToddlerAgePage config={toddlerAgeConfigs["30-months"]} />
);

export default ThirtyMonths;
