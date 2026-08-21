import { useEffect, type ReactNode } from "react";
import FirstYearBottomNav from "@/components/firstyear/navigation/FirstYearBottomNav";
import {
  FY_NAV_CLEARANCE,
  FY_NAV_INSET_VAR,
  FY_NAV_INSET_VALUE,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = { children: ReactNode };

/**
 * The shared shell for the signed-in First Year spaces. It only adds the
 * mobile bar and the clearance underneath it, so each page keeps its own
 * layout and spacing exactly as it was.
 *
 * While it is mounted it also publishes the height of the mobile bar as a
 * custom property, so anything else pinned to the bottom of the viewport
 * (the analytics consent banner) can sit above the bar instead of over it.
 */
const FirstYearAppShell = ({ children }: Props) => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(FY_NAV_INSET_VAR, FY_NAV_INSET_VALUE);
    return () => {
      root.style.removeProperty(FY_NAV_INSET_VAR);
    };
  }, []);

  return (
    <div className={FY_NAV_CLEARANCE}>
      {children}
      <FirstYearBottomNav />
    </div>
  );
};

export default FirstYearAppShell;
