import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="relative bg-parchment-dark overflow-hidden">
      {/* Soft divider */}
      <div className="section-divider" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl pt-14 sm:pt-20 pb-10 sm:pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-5 md:mb-6">
              <img
                src={logoSrc}
                alt="The Start of You"
                className="w-[110px] md:w-[130px] h-auto object-contain opacity-90"
              />
            </Link>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
              Your trusted companion through pregnancy, offering calm guidance and space for reflection.
            </p>
          </div>

          {/* Journey */}
          <div>
            <h4 className="font-serif text-foreground text-base mb-4 md:mb-6">Journey</h4>
            <ul className="space-y-3">
              {[
                { to: "/trying-to-conceive", label: "Trying to Conceive" },
                { to: "/ivf", label: "IVF" },
                { to: "/pregnancy", label: "Pregnancy" },
                { to: "/postpartum", label: "Postpartum" },
                { to: "/first-year", label: "First Year" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-foreground text-base mb-4 md:mb-6">Resources</h4>
            <ul className="space-y-3">
              {[
                { to: "/explore", label: "Explore" },
                { to: "/due-date-calculator", label: "Due Date Calculator" },
                { to: "/ovulation-calculator", label: "Ovulation Calculator" },
                { to: "/support", label: "Support" },
                { to: "/product", label: "Journal" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-200">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="hidden md:block">
            <h4 className="font-serif text-foreground text-base mb-6">About</h4>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "Our Story" },
                { to: "/about", label: "Editorial Standards" },
                { to: "/about", label: "Contact" },
              ].map((l, i) => (
                <li key={i}><Link to={l.to} className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-200">{l.label}</Link></li>
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
