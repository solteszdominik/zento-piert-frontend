import AboutPreview from "@/components/home/AboutPreview";
import ContactCta from "@/components/home/ContactCta";
import Hero from "@/components/home/Hero";
import SanoShowcase from "@/components/home/SanoShowcase";
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
        <SanoShowcase />
        <VideoPreview />
        <ContactCta />
        <TendersSection />
      </main>
      <Footer />
    </>
  );
}
