import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo-dark.png";
import botanicalTr from "@/assets/botanical-branch-tr.png";

const Footer = () => {
  return (
    <footer className="relative bg-parchment-dark overflow-hidden">
      {/* Soft divider */}
      <div className="section-divider" />

      {/* Botanical accent */}
      <img
        src={botanicalTr}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[150px] md:w-[230px] opacity-35 select-none"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl pt-16 sm:pt-24 pb-10 sm:pb-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.45fr_0.82fr_0.92fr_0.76fr] gap-x-10 gap-y-10 md:gap-x-14 md:gap-y-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 max-w-[23rem] md:pr-6">
            <Link to="/" className="inline-block mb-7 md:mb-8">
              <img
                src={logoSrc}
                alt="The Start of You"
                className="w-[185px] md:w-[238px] h-auto object-contain brightness-[0.78] contrast-[1.14] saturate-[0.84]"
              />
            </Link>
            <p className="font-sans text-[15px] md:text-[15.5px] font-light text-foreground/65 leading-[1.55] max-w-[21rem]">
              Your trusted companion through pregnancy, offering calm guidance and space for reflection.
            </p>
          </div>

          {/* Journey */}
          <div>
            <h4 className="font-serif text-[1.08rem] text-foreground mb-4 md:mb-6">Journey</h4>
            <ul className="space-y-3.5">
              {[
                { to: "/trying-to-conceive", label: "Trying to Conceive" },
                { to: "/ivf", label: "IVF" },
                { to: "/pregnancy", label: "Pregnancy" },
                { to: "/postpartum", label: "Postpartum" },
                { to: "/first-year", label: "First Year" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-[15px] font-normal text-foreground/72 hover:text-foreground transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-[1.08rem] text-foreground mb-4 md:mb-6">Resources</h4>
            <ul className="space-y-3.5">
              {[
                { to: "/explore", label: "Explore" },
                { to: "/due-date-calculator", label: "Due Date Calculator" },
                { to: "/ovulation-calculator", label: "Ovulation Calculator" },
                { to: "/support", label: "Support" },
                { to: "/product", label: "Journal" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-[15px] font-normal text-foreground/72 hover:text-foreground transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="hidden md:block">
            <h4 className="font-serif text-[1.08rem] text-foreground mb-6">About</h4>
            <ul className="space-y-3.5">
              {[
                { to: "/about", label: "Our Story" },
                { to: "/about", label: "Editorial Standards" },
                { to: "/about", label: "Contact" },
              ].map((l, i) => (
                <li key={i}><Link to={l.to} className="font-sans text-[15px] font-normal text-foreground/72 hover:text-foreground transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-parchment-deeper/60">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <span className="font-sans text-[11px] sm:text-xs font-light text-muted-foreground/70">
              © 2026 The Start of You. All rights reserved.
            </span>
            <span className="font-sans text-[11px] sm:text-xs font-light text-muted-foreground/50 flex items-center gap-1.5">
              <span className="text-sage">♡</span> Made with care for expecting parents
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
