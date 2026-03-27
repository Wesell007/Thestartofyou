import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="bg-parchment-dark relative overflow-hidden">
      {/* Wavy divider top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,0 L0,0 Z" fill="hsl(40,30%,96%)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-6xl pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src={logoSrc}
                alt="The Start of You"
                className="w-[140px] h-auto object-contain"
              />
            </Link>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
              Your trusted companion through pregnancy, offering calm guidance and space for reflection.
            </p>
          </div>

          {/* Journey */}
          <div>
            <h4 className="font-serif text-foreground text-base mb-5">Journey</h4>
            <ul className="space-y-3">
              <li><Link to="/trying-to-conceive" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Trying to Conceive</Link></li>
              <li><Link to="/ivf" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">IVF</Link></li>
              <li><Link to="/pregnancy" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Pregnancy</Link></li>
              <li><Link to="/postpartum" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Postpartum</Link></li>
              <li><Link to="/first-year" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">First Year</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-foreground text-base mb-5">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/explore" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Explore</Link></li>
              <li><Link to="/due-date-calculator" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Due Date Calculator</Link></li>
              <li><Link to="/ovulation-calculator" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Ovulation Calculator</Link></li>
              <li><Link to="/support" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
              <li><Link to="/product" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif text-foreground text-base mb-5">About</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Editorial Standards</Link></li>
              <li><Link to="/about" className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-7 border-t border-parchment-deeper flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-muted-foreground font-sans">
          <span>© 2026 The Start of You. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <span>♡</span> Made with care for expecting parents
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
