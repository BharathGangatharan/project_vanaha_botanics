import Hero from "@/components/hero/Hero";
import ProductSection from "@/components/ProductSection";
import RunningBanner from "@/components/RunningBanner";
import ReviewCarousel from "@/components/review/ReviewCarousel";
import SkinCareQuoteSection from "@/components/SkinCareQuoteSection";
import WhyVanahaBotanics from "@/components/WhyVanahaBotanics";


export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <RunningBanner />
      <Hero />
      <ProductSection />
      <SkinCareQuoteSection />
      <ReviewCarousel />
      <WhyVanahaBotanics />
    </div>
  );
}