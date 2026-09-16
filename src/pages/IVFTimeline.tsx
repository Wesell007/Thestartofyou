import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFTimelineResult from "@/components/ivf/IVFTimelineResult";
import IVFTimelineForm, {
  IVF_TIMELINE_ROUTE,
  type IVFTimelineNavState,
  type IVFTransferType,
} from "@/components/ivf/IVFTimelineForm";
import IVFTimelineSaveController from "@/components/ivf/IVFTimelineSaveController";
import { IVF_TIMELINE_SAVE_ENABLED } from "@/lib/ivfTimelineFlags";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { HOME_CRUMB, IVF_CRUMB } from "@/lib/seo/journeyCrumbs";
import { addDays, isAfter, isBefore, isValid, startOfDay } from "date-fns";

const TIMELINE_SEO = (
  <SeoHead
    title="IVF Timeline Guide | Steps, Transfer & Two-Week Wait"
    description="A calm guide to the IVF timeline, including treatment stages, transfer preparation, waiting after transfer and what may come next."
    canonical="https://thestartofyou.com/ivf-timeline"
  />
);

const isTransferType = (value: unknown): value is IVFTransferType =>
  value === "5day" || value === "3day";

/** Accept only a real, recent, non-future transfer date. */
const resolveTransferDate = (ms: unknown): Date | null => {
  const ts = Number(ms);
  if (!Number.isFinite(ts)) return null;
  const candidate = new Date(ts);
  const today = startOfDay(new Date());
  if (!isValid(candidate)) return null;
  if (isAfter(candidate, today)) return null;
  if (isBefore(candidate, addDays(today, -300))) return null;
  return candidate;
};

const readNavState = (state: unknown): { date: Date; type: IVFTransferType } | null => {
  if (!state || typeof state !== "object") return null;
  const candidate = state as Partial<IVFTimelineNavState>;
  const date = resolveTransferDate(candidate.transferMs);
  if (!date) return null;
  return { date, type: isTransferType(candidate.transferType) ? candidate.transferType : "5day" };
};

/**
 * Phase 34F — `/ivf-timeline` is a standalone tool.
 *
 * Resolution priority: ephemeral navigation state, then legacy `?date`/`?type`
 * links, then the calculator itself. Nothing is persisted, and no new URL ever
 * carries treatment information. Valid legacy values are reconstructed into
 * navigation state once and the parameters are then replaced out of the visible
 * address, so the treatment details stop being displayed.
 */
const IVFTimeline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navResolved = useMemo(() => readNavState(location.state), [location.state]);

  const legacyResolved = useMemo(() => {
    if (navResolved) return null;
    const date = resolveTransferDate(searchParams.get("date"));
    if (!date) return null;
    const typeParam = searchParams.get("type");
    return { date, type: isTransferType(typeParam) ? typeParam : ("5day" as IVFTransferType) };
  }, [navResolved, searchParams]);

  // Hold the reconstructed legacy values so the timeline survives the address
  // replacement below.
  const [carried, setCarried] = useState<{ date: Date; type: IVFTransferType } | null>(null);
  const strippedRef = useRef(false);

  useEffect(() => {
    if (!legacyResolved || strippedRef.current) return;
    strippedRef.current = true;
    setCarried(legacyResolved);
    const state: IVFTimelineNavState = {
      transferMs: legacyResolved.date.getTime(),
      transferType: legacyResolved.type,
    };
    // replace: one history entry, no loop, no duplicate calculation.
    navigate(IVF_TIMELINE_ROUTE, { replace: true, state });
  }, [legacyResolved, navigate]);

  const resolved = navResolved ?? legacyResolved ?? carried;

  const breadcrumbItems: BreadcrumbItem[] = [
    HOME_CRUMB,
    IVF_CRUMB,
    { label: "IVF timeline", href: "/ivf-timeline" },
  ];

  return (
    <div className="min-h-screen bg-parchment">
      {TIMELINE_SEO}
      <Navbar />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-24 md:pt-28">
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <Breadcrumbs tone="section" className="font-sans tracking-wide" items={breadcrumbItems} />
      </div>

      {resolved ? (
        <IVFTimelineResult transferDate={resolved.date} transferType={resolved.type} />
      ) : (
        <section className="pt-8 pb-10">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Your IVF timeline</h1>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-7">
              Add your embryo transfer date and transfer type to see where you are, day by day. No
              account needed, and nothing you enter is saved.
            </p>
            <IVFTimelineForm />
          </div>
        </section>
      )}

      {/* Phase 34H.1 — the save feature exists only while the flag is on. */}
      {IVF_TIMELINE_SAVE_ENABLED && (
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl pb-10">
          <IVFTimelineSaveController current={resolved} onRestore={setRestored} />
        </div>
      )}

      <div className="pb-14 md:pb-24" />


      <Footer />
    </div>
  );
};

export default IVFTimeline;
