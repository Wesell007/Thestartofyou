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
      <main>
        <ProductHero />
        <ProductFamiliar />
        <ProductWhatItIs />
        <ProductStages />
        <ProductInside />
        <ProductGallery />
        <ProductMoment />
        <ProductEcosystem />
        <ProductFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
