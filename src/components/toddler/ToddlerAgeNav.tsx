import { Link } from "react-router-dom";

const ages = [
  { label: "12–17 months", to: "/toddler/12-17-months" },
  { label: "18–23 months", to: "/toddler/18-23-months" },
  { label: "2 years", to: "/toddler/2-years" },
  { label: "30 months", to: "/toddler/30-months" },
  { label: "3 years", to: "/toddler/3-years" },
];

const ToddlerAgeNav = () => {
  return (
    <section
      id="toddler-age"
      className="relative py-20 md:py-24"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.55) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-10 md:mb-12">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            By age
          </p>
          <h2
            className="font-serif text-[1.75rem] md:text-[2.2rem] mb-3 leading-tight"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            Go to your toddler's age
          </h2>
          <p
            className="font-sans text-[15px] font-light max-w-md mx-auto leading-relaxed"
            style={{ color: "hsl(var(--stage-toddler-deep) / 0.7)" }}
          >
            Five steady waypoints, from the first birthday through the third year.
          </p>
        </div>

        <div
          className="relative mx-auto rounded-[28px] border bg-parchment/80 backdrop-blur-sm px-5 py-5 md:px-7 md:py-6 overflow-hidden"
          style={{
            borderColor: "hsl(var(--stage-toddler-accent) / 0.22)",
            boxShadow:
              "0 22px 56px -34px rgba(70,40,20,0.28), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
          }}
        >
          <span
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-72 rounded-full blur-3xl opacity-60"
            style={{ background: "hsl(var(--stage-toddler) / 0.4)" }}
            aria-hidden
          />
          <div className="relative flex flex-wrap justify-center gap-2.5 md:gap-3">
            {ages.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="group inline-flex items-center justify-center rounded-pill px-5 md:px-6 py-3 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-h-[44px] hover:-translate-y-[1px] hover:shadow-[0_14px_30px_-14px_rgba(70,40,20,0.5)] hover:bg-[hsl(var(--stage-toddler-deep))] hover:text-[hsl(var(--stage-toddler-soft))] hover:border-[hsl(var(--stage-toddler-deep))]"
                style={{
                  backgroundColor: "hsl(var(--stage-toddler-soft) / 0.85)",
                  color: "hsl(var(--stage-toddler-deep))",
                  borderColor: "hsl(var(--stage-toddler-accent) / 0.4)",
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

export default ToddlerAgeNav;
