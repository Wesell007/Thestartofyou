import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SeoHead from "@/components/seo/SeoHead";

const Terms = () => (
  <div className="min-h-screen bg-parchment">
    <SeoHead
      title="Terms | The Start of You"
      description="Terms for using The Start of You guidance, calculators, saved journeys and AI features."
      canonical="https://thestartofyou.com/terms"
    />
    <Navbar />
    <main className="container mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-40">
      <p className="stage-label mb-4">Using the service</p>
      <h1 className="font-serif text-4xl text-foreground md:text-5xl">Terms</h1>
      <p className="mt-5 font-sans text-sm font-light leading-7 text-muted-foreground">
        Last updated 20 July 2026. By using the service, you agree to use it lawfully and to provide accurate information where a personalised estimate depends on it.
      </p>
      <div className="mt-12 space-y-10 font-sans text-sm font-light leading-7 text-muted-foreground">
        <section>
          <h2 className="font-serif text-2xl text-foreground">Guidance, not diagnosis</h2>
          <p className="mt-3">Content, calculators and AI responses are educational estimates. They do not diagnose a condition, confirm pregnancy or ovulation, replace professional care, or provide emergency services. Seek urgent local help for an emergency.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground">Your account and content</h2>
          <p className="mt-3">You are responsible for access to your email account and for content you save. You retain your rights in reflections and photos. You give the service permission to process them only as needed to provide the features you request.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground">AI limitations</h2>
          <p className="mt-3">AI output can be incomplete or wrong and is not individually medically reviewed. Check important health decisions with an appropriate qualified professional.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-foreground">Availability</h2>
          <p className="mt-3">We work to keep the service available and saved data consistent, but maintenance and provider failures can interrupt features. Error and retry states are provided where the service detects a failure.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
