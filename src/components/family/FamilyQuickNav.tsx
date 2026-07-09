import { Link } from "react-router-dom";

const links = [
  { label: "Growing families", to: "/family/growing-families" },
  { label: "Relationships", to: "/family/relationships" },
  { label: "Family basics", to: "/family/family-basics" },
  { label: "Health & safety", to: "/family/health-safety" },
  { label: "Travel & days out", to: "/family/travel-days-out" },
  { label: "Play & connection", to: "/family/play-connection" },
];

const FamilyQuickNav = () => {
  return (
    <section
      id="family-quicknav"
      className="relative py-16 md:py-20"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.55) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-8 md:mb-10">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.5)" }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-family-accent))" }}
          >
            Jump to
          </p>
          <h2
            className="font-serif text-[1.6rem] md:text-[2rem] leading-tight"
            style={{ color: "hsl(var(--stage-family-deep))" }}
          >
            Where would you like to start?
          </h2>
        </div>

        <div
          className="relative mx-auto rounded-[28px] border bg-parchment/85 backdrop-blur-sm px-5 py-5 md:px-7 md:py-6 overflow-hidden"
          style={{
            borderColor: "hsl(var(--stage-family-accent) / 0.22)",
            boxShadow:
              "0 22px 56px -34px rgba(70,50,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
          }}
        >
          <span
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-72 rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-family-soft) / 0.55)" }}
            aria-hidden
          />
          <div className="relative flex flex-wrap justify-center gap-2.5 md:gap-3">
            {links.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="group inline-flex items-center justify-center rounded-pill px-5 md:px-6 py-3 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-h-[44px] hover:-translate-y-[1px] hover:shadow-[0_14px_30px_-14px_rgba(70,50,20,0.45)] hover:bg-[hsl(var(--stage-family-deep))] hover:text-[hsl(var(--stage-family-soft))] hover:border-[hsl(var(--stage-family-deep))]"
                style={{
                  backgroundColor: "hsl(var(--stage-family-soft) / 0.85)",
                  color: "hsl(var(--stage-family-deep))",
                  borderColor: "hsl(var(--stage-family-accent) / 0.4)",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.7)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyQuickNav;
