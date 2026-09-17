import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import usePublicAccountLink from "@/hooks/usePublicAccountLink";

const TTCHubJourneyAction = () => {
  const { authed, accountLink } = usePublicAccountLink();
  const label = authed ? accountLink.label : "Start your journey";

  return (
    <section className="border-t border-border/50 bg-parchment py-16 md:py-20">
      <div className="container mx-auto max-w-2xl px-5 text-center sm:px-6 md:px-10">
        <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-sage">
          Begin your journey
        </p>
        <h2 className="mb-4 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
          A small <span className="italic font-normal">reminder</span>
        </h2>
        <p className="mx-auto mb-7 max-w-xl font-sans text-[15px] font-light leading-relaxed text-muted-foreground">
          Trying to conceive can feel hopeful one day and overwhelming the next. You do not need
          to have everything perfectly figured out.
        </p>
        <Button asChild variant="cta" size="lg">
          <Link to={accountLink.href}>
            {label}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default TTCHubJourneyAction;