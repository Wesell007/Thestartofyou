import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo-dark.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import ConsentLink from "@/components/consent/ConsentLink";

const Footer = () => {
  return (
    <footer className="relative bg-[hsl(100_12%_90%)] overflow-hidden">
      {/* Soft divider */}
      <div className="section-divider" />

      {/* Botanical accent — bottom-right (designer reference position) */}
      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[180px] md:w-[280px] lg:w-[340px] opacity-25 select-none scale-x-[-1]"
      />

      {/* Secondary botanical — top-left, subtle */}
      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[100px] md:w-[160px] opacity-10 select-none rotate-180"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl pt-16 sm:pt-24 pb-10 sm:pb-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6 md:mb-8">
              <img
                src={logoSrc}
                alt="The Start of You"
                className="w-[140px] md:w-[190px] h-auto object-contain contrast-[1.1]"
              />
            </Link>
            <p className="font-sans text-[14px] font-light text-foreground/50 leading-relaxed max-w-xs">
              Calm, personal guidance through trying to conceive, Pregnancy and your baby's First Year, with space for reflection.
            </p>
          </div>

          {/* Journey */}
          <div>
            <h4 className="font-serif text-foreground/85 text-base mb-4 md:mb-6">Journey</h4>
            <ul className="space-y-3">
              {[
                { to: "/trying-to-conceive", label: "Trying to Conceive" },
                { to: "/ivf", label: "IVF" },
                { to: "/pregnancy", label: "Pregnancy" },
                { to: "/first-year", label: "First Year" },
                { to: "/toddler", label: "Toddler" },
                { to: "/family", label: "Family" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-foreground/85 text-base mb-4 md:mb-6">Resources</h4>
            <ul className="space-y-3">
              {[
                { to: "/due-date-calculator", label: "Due Date Calculator" },
                { to: "/ovulation-calculator", label: "Ovulation Calculator" },
                { to: "/ask", label: "Ask your companion" },
                { to: "/support", label: "Support" },
                { to: "/journal", label: "Journal" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif text-foreground/85 text-base mb-4 md:mb-6">About</h4>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "Our Story" },
                { to: "/privacy", label: "Privacy" },
                { to: "/terms", label: "Terms" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-foreground/8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <span className="font-sans text-[11px] sm:text-xs font-light text-foreground/40">
              © 2026 The Start of You. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <ConsentLink />
              <span className="font-sans text-[11px] sm:text-xs font-light text-foreground/35 flex items-center gap-1.5">
                <span className="text-sage">♡</span> Made with care for growing families
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
