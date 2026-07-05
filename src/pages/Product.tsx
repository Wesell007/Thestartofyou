import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductHero from "@/components/product/ProductHero";
import ProductGallery from "@/components/product/ProductGallery";
import ProductJournalAI from "@/components/product/ProductJournalAI";
import ProductInlineCTA from "@/components/product/ProductInlineCTA";
import ProductInside from "@/components/product/ProductInside";
import ProductDetailStrip from "@/components/product/ProductDetailStrip";
import ProductMoment from "@/components/product/ProductMoment";
import ProductWhoFor from "@/components/product/ProductWhoFor";
import ProductHowToUse from "@/components/product/ProductHowToUse";
import ProductEcosystem from "@/components/product/ProductEcosystem";
import ProductFinalCTA from "@/components/product/ProductFinalCTA";

const Product = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="flex flex-col">
        <ProductHero />
        <ProductGallery />
        <ProductJournalAI />
        <ProductInlineCTA />
        <ProductInside />
        <ProductDetailStrip />
        <ProductMoment />
        <ProductWhoFor />
        <ProductHowToUse />
        <ProductEcosystem />
        <ProductFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
