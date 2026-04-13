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
        <ProductHero className="order-1" />
        <ProductFamiliar className="order-3 md:order-2" />
        <ProductGallery className="order-2 md:order-6" />
        <ProductWhatItIs className="order-4 md:order-3" />
        <ProductStages className="order-5 md:order-4" />
        <ProductInside className="order-6 md:order-5" />
        <ProductMoment className="order-7" />
        <ProductEcosystem className="order-8" />
        <ProductFinalCTA className="order-9" />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
