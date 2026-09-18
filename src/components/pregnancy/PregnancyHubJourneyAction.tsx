import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import journalFlatlay from "@/assets/journal-flatlay.jpg";
import { Button } from "@/components/ui/button";
import usePublicAccountLink from "@/hooks/usePublicAccountLink";

const PregnancyHubJourneyAction = () => {
  const { authed, accountLink } = usePublicAccountLink();
  const label = authed ? accountLink.label : "Start your journey";

  return (
    <section className="border-t border-border/50 bg-parchment-dark">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch md:grid-cols-2">
        <div className="relative min-h-64 overflow-hidden md:min-h-[390px]">
          <img
            src={journalFlatlay}
            alt="The Start of You pregnancy journal styled with natural accessories"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-parchment-dark/40 to-transparent" aria-hidden="true" />
        </div>
        <div className="flex items-center px-6 py-12 sm:px-10 md:px-14 md:py-16">
          <div className="max-w-md">
            <p className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-terracotta">
              Keep your journey
            </p>
            <h2 className="mb-4 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
              A quiet place to <span className="italic font-normal">keep what matters.</span>
            </h2>
            <Button asChild variant="cta" size="lg">
              <Link to={accountLink.href}>
                {label}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyHubJourneyAction;