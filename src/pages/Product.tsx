import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductHero from "@/components/product/ProductHero";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInlineCTA from "@/components/product/ProductInlineCTA";
import ProductInside from "@/components/product/ProductInside";
import ProductMoment from "@/components/product/ProductMoment";
import ProductEcosystem from "@/components/product/ProductEcosystem";
import ProductFinalCTA from "@/components/product/ProductFinalCTA";

const Product = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="flex flex-col">
        {/* 1. Hero video — the opening moment */}
        <ProductHero />

        {/* 2. Strong image-led product proof — early */}
        <ProductGallery />

        {/* 3. CTA after first major visual proof */}
        <ProductInlineCTA />

        {/* 4. What is inside / why it matters — tighter */}
        <ProductInside />

        {/* 5. Emotional value moment */}
        <ProductMoment />

        {/* 6. How it fits the wider Start of You journey */}
        <ProductEcosystem />

        {/* 7. Final CTA */}
        <ProductFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
