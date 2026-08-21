import { PG_EYEBROW } from "./pregnancyStyles";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Phase 27D — one shared weekly section label: hairline lead-in dash plus a
 * small uppercase caption. Presentation only, so every section on the weekly
 * page shares the same rhythm instead of repeating inline styles.
 */
const SectionLabel = ({ children, className = "" }: Props) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span
      aria-hidden="true"
      className="block h-px w-5 shrink-0"
      style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
    />
    <p className={PG_EYEBROW}>{children}</p>
  </div>
);

export default SectionLabel;
