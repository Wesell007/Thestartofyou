import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StartJourneyOpening from "@/components/start-journey/StartJourneyOpening";
import StartJourneySection from "@/components/start-journey/StartJourneySection";
import StartJourneyDecisionGuide from "@/components/start-journey/StartJourneyDecisionGuide";
import StartJourneyGuidance from "@/components/start-journey/StartJourneyGuidance";
import StartJourneyCompanion from "@/components/start-journey/StartJourneyCompanion";
import StartJourneyFinalCta from "@/components/start-journey/StartJourneyFinalCta";
import {
  FirstYearPreview,
  PregnancyPreview,
  TtcPreview,
} from "@/components/home/journeyPreviews";
import { usePublicAccountLink } from "@/hooks/usePublicAccountLink";
import ttcImage from "@/assets/home-stage-ttc.jpg";
import pregnancyImage from "@/assets/home-stage-pregnancy.jpg";
import firstYearImage from "@/assets/home-stage-first-year.jpg";

/**
 * Public decision page for the three saved journeys.
 *
 * There are exactly three: Trying to Conceive, Pregnancy and First Year. IVF,
 * Toddler and Family are wider guidance hubs and are presented as reading, not
 * as a fourth lifecycle. The page selects nothing, saves nothing and reads no
 * private journey content: the only account awareness is the shared public
 * lifecycle pointer already used by the navbar.
 */

const StartYourJourney = () => {
  const { authed, lifecycle, accountLink } = usePublicAccountLink();

  return (
    <div className="min-h-screen font-sans">
      <SeoHead
        title="Start Your Journey | The Start of You"
        description="Choose the journey that fits where you are today: trying to conceive, pregnancy or your baby's first year, with calm guidance shaped around that stage."
        canonical="https://thestartofyou.com/start-your-journey"
      />
      <Navbar />
      <main className="flex flex-col">
        <StartJourneyOpening authed={authed} lifecycle={lifecycle} accountLink={accountLink} />

        <StartJourneySection
          id="ttc"
          surface="bg-background"
          eyebrow="Journey one"
          title="Trying to Conceive"
          positioning="For the months of hoping, noticing and waiting."
          body="Your saved dates become a soft path through the cycle, so you can see where you are without turning every day into a test. Guidance arrives when it is useful rather than all at once."
          expectations={[
            "A gentle view of the current cycle, based on the dates you save",
            "Private notes for symptoms, tests and how you are feeling",
            "Reading for the questions that often come with waiting",
          ]}
          supportLine="Cycle estimates are exactly that: estimates. They cannot confirm ovulation, fertility or a 'safe' time."
          image={ttcImage}
          imageAlt="A couple sitting quietly together at home"
          preview={<TtcPreview />}
          previewLabel="A glimpse of the TTC journey"
          primary={{ label: "Start my TTC journey", href: "/setup/trying-to-conceive" }}
          secondary={{ label: "Explore TTC guidance", href: "/trying-to-conceive" }}
          tertiary={{ label: "Having IVF? Read the IVF guidance", href: "/ivf" }}
        />

        <StartJourneySection
          id="pregnancy"
          surface="bg-parchment"
          eyebrow="Journey two"
          title="Pregnancy"
          positioning="For the weeks that change quickly, and the questions that come with them."
          body="Your own dates shape a calm weekly chapter: what is changing, what is coming and what is worth asking about, with a place to keep the moments you want to remember."
          expectations={[
            "A weekly view built around your dates",
            "What is happening now and what to expect next",
            "Somewhere to save a thought, a photograph or a question",
          ]}
          supportLine="Guidance supports your care, it never replaces your midwife, GP or maternity unit."
          image={pregnancyImage}
          imageAlt="A pregnant woman resting quietly by a window"
          preview={<PregnancyPreview />}
          previewLabel="A glimpse of the Pregnancy journey"
          primary={{ label: "Start my Pregnancy journey", href: "/due-date-calculator" }}
          secondary={{ label: "Explore pregnancy guidance", href: "/pregnancy" }}
          reverse
        />

        <StartJourneySection
          id="first-year"
          surface="bg-background"
          eyebrow="Journey three"
          title="First Year"
          positioning="For the first twelve months, for your baby and for you."
          body="An age aware home for the day: feeding, sleep, development and your own recovery, with a quiet place to hold onto the small moments."
          expectations={[
            "Orientation for your baby's age today",
            "Support for feeding, sleep and development",
            "Your recovery and wellbeing kept in view",
          ]}
          supportLine="Every baby develops differently. Nothing here is a milestone checklist or a clinical assessment."
          image={firstYearImage}
          imageAlt="A parent holding their young baby close"
          preview={<FirstYearPreview />}
          previewLabel="A glimpse of the First Year journey"
          primary={{ label: "Start my First Year journey", href: "/setup/first-year" }}
          secondary={{ label: "Explore first year guidance", href: "/first-year" }}
          tertiary={{ label: "Past the first year? Visit Toddler", href: "/toddler" }}
        />

        <StartJourneyDecisionGuide />
        <StartJourneyGuidance />
        <StartJourneyCompanion />
        <StartJourneyFinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default StartYourJourney;
