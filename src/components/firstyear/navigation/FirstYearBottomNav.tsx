import { Link, useLocation } from "react-router-dom";
import {
  FIRST_YEAR_NAV_ITEMS,
  isNavItemActive,
} from "@/components/firstyear/navigation/firstYearNavItems";
import {
  FY_FOCUS_RING,
  FY_NAV_ITEM,
  FY_NAV_SURFACE,
  FY_NAV_SURFACE_STYLE,
} from "@/components/firstyear/journey/firstYearStyles";

/**
 * The mobile bar for the signed-in First Year spaces. It sits below sheets,
 * the photo viewer and toasts, so nothing opened on purpose is ever covered.
 */
const FirstYearBottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav aria-label="First Year" className={FY_NAV_SURFACE} style={FY_NAV_SURFACE_STYLE}>
      <ul className="mx-auto flex w-full max-w-[520px] items-stretch justify-around px-2">
        {FIRST_YEAR_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(pathname, item);
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex-1">
              <Link
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={`${FY_NAV_ITEM} ${FY_FOCUS_RING}`}
                style={{
                  color: active
                    ? "hsl(var(--stage-firstyear-terracotta))"
                    : "hsl(var(--stage-firstyear-text-soft))",
                }}
              >
                <Icon size={19} strokeWidth={active ? 2 : 1.6} aria-hidden="true" />
                <span className={active ? "font-semibold" : "font-medium"}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FirstYearBottomNav;
