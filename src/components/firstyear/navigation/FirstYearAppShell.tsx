import type { ReactNode } from "react";
import FirstYearBottomNav from "@/components/firstyear/navigation/FirstYearBottomNav";
import { FY_NAV_CLEARANCE } from "@/components/firstyear/journey/firstYearStyles";

type Props = { children: ReactNode };

/**
 * The shared shell for the signed-in First Year spaces. It only adds the
 * mobile bar and the clearance underneath it, so each page keeps its own
 * layout and spacing exactly as it was.
 */
const FirstYearAppShell = ({ children }: Props) => (
  <div className={FY_NAV_CLEARANCE}>
    {children}
    <FirstYearBottomNav />
  </div>
);

export default FirstYearAppShell;
