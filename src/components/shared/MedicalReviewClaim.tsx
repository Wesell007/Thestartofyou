import { Shield } from "lucide-react";
import {
  getReviewClaim,
  type ReviewProvenance,
} from "@/lib/reviewClaims";

/**
 * Phase 33.5 — the sole authority for rendering a medical-review claim.
 *
 * Renders nothing unless `src/lib/reviewClaims.ts` holds genuine provenance for
 * this exact content surface. There is no fallback to `reviewedBy`,
 * `medicallyReviewed`, a hardcoded reviewer, or softer trust wording.
 */
interface Props {
  /** Exact surface key from `reviewSurfaceKey()`. */
  contentKey?: string | null;
  /** Visual treatment at the call site. */
  variant?: "inline" | "badge";
  className?: string;
  /** Isolated-test registry override. Never used by production callers. */
  registry?: readonly ReviewProvenance[];
}

const MedicalReviewClaim = ({
  contentKey,
  variant = "inline",
  className = "",
  registry,
}: Props) => {
  const claim = registry
    ? getReviewClaim(contentKey, registry)
    : getReviewClaim(contentKey);

  if (!claim) return null;

  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card font-sans text-[11.5px] font-light text-foreground/75 ${className}`}
      >
        <Shield className="w-3 h-3 text-sage/70" aria-hidden="true" />
        Medically reviewed by {claim.reviewer}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans text-[11px] font-light text-foreground/65 ${className}`}
    >
      <Shield className="w-3 h-3 text-sage/70" aria-hidden="true" />
      Medically reviewed by {claim.reviewer}
    </span>
  );
};

export default MedicalReviewClaim;
