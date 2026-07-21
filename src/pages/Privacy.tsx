import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SeoHead from "@/components/seo/SeoHead";

const sections = [
  {
    title: "Information you choose to share",
    body: "We store the account, journey, cycle, reflection and photo information you choose to save so that the service can provide your private journey views. You can use public guidance without creating a saved journey.",
  },
  {
    title: "AI features",
    body: "Questions and reflection text submitted to an AI feature are sent to our configured AI processing provider to generate the requested response. Do not include names, addresses or other information that is not needed for your question. AI output is generated, not individually reviewed medical advice.",
  },
  {
    title: "Analytics",
    body: "Optional analytics run only after consent. We do not intentionally send names, email addresses, dates, free-text questions, reflections, cycle details or photo contents as analytics properties. You can change your analytics choice from the consent controls in your browser.",
  },
  {
    title: "Your choices",
    body: "You can update or remove a saved journey, download a copy of your records, and permanently delete your account from Account settings while signed in.",
  },
  {
    title: "Safety and retention",
    body: "Saved records are protected by account-scoped database policies. We keep information only while it is needed to provide the service, meet legal obligations and protect the service. Signed photo links expire and are not public URLs.",
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-parchment">
    <SeoHead
      title="Privacy | The Start of You"
      description="How The Start of You handles saved journey information, optional analytics and AI features."
      canonical="https://thestartofyou.com/privacy"
    />
    <Navbar />
    <main className="container mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-40">
      <p className="stage-label mb-4">Your information</p>
      <h1 className="font-serif text-4xl text-foreground md:text-5xl">Privacy</h1>
      <p className="mt-5 font-sans text-sm font-light leading-7 text-muted-foreground">
        Last updated 20 July 2026. This page explains the data behaviour implemented by the current service.
      </p>
      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-serif text-2xl text-foreground">{section.title}</h2>
            <p className="mt-3 font-sans text-sm font-light leading-7 text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
