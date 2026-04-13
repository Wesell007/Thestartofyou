import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductHero from "@/components/product/ProductHero";
import ProductFamiliar from "@/components/product/ProductFamiliar";
import ProductWhatItIs from "@/components/product/ProductWhatItIs";
import ProductStages from "@/components/product/ProductStages";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInside from "@/components/product/ProductInside";
import ProductMoment from "@/components/product/ProductMoment";
import ProductEcosystem from "@/components/product/ProductEcosystem";
import ProductFinalCTA from "@/components/product/ProductFinalCTA";

const Product = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="flex flex-col">
        <div className="order-1"><ProductHero /></div>
        <div className="order-3 md:order-2"><ProductFamiliar /></div>
        <div className="order-2 md:order-6"><ProductGallery /></div>
        <div className="order-4 md:order-3"><ProductWhatItIs /></div>
        <div className="order-5 md:order-4"><ProductStages /></div>
        <div className="order-6 md:order-5"><ProductInside /></div>
        <div className="order-7"><ProductMoment /></div>
        <div className="order-8"><ProductEcosystem /></div>
        <div className="order-9"><ProductFinalCTA /></div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
