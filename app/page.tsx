import AboutPreview from "@/components/home/AboutPreview";
import CategoryPreview from "@/components/home/CategoryPreview";
import ContactCta from "@/components/home/ContactCta";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import TendersSection from "@/components/home/TendersSection";
import VideoPreview from "@/components/home/VideoPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutPreview />
        <WhyChooseUs />
        <CategoryPreview />
        <FeaturedProducts />
        <VideoPreview />
        <ContactCta />
        <TendersSection />
      </main>
      <Footer />
    </>
  );
}
